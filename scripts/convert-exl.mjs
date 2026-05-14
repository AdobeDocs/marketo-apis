#!/usr/bin/env node
/**
 * Converts marketo-developer.en EXL markdown files to ADP DevSite format
 * and writes them into marketo-apis/src/pages/.
 *
 * Usage: node scripts/convert-exl.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'fs';
import { readdirSync, statSync } from 'fs';
import { join, dirname, relative, extname, basename } from 'path';

const SOURCE_ROOT = '/Users/dobooth/projects/marketo-developer.en/help';
const TARGET_ROOT = '/Users/dobooth/projects/marketo-apis/src/pages';

const SKIP_FILES = new Set(['TOC.md', 'home.md']);
const IMAGE_EXTS = new Set(['.png', '.svg', '.jpg', '.jpeg', '.gif', '.webp']);

const ALERT_VARIANTS = {
  NOTE: 'info',
  TIP: 'help',
  IMPORTANT: 'warning',
  WARNING: 'warning',
  CAUTION: 'warning',
  INFO: 'info',
  SUCCESS: 'success',
  ERROR: 'error',
  ADMIN: 'neutral',
  AVAILABILITY: 'neutral',
  PREREQUISITES: 'neutral',
};

const SOAP_DEPRECATION =
  '<InlineAlert slots="text" variant="warning" />\n\n' +
  'The SOAP API is deprecated and will reach end of life on July 31, 2026. ' +
  'All new integrations should be developed using the [Marketo REST API](../rest-api/rest-api.md), ' +
  'and existing integrations should be migrated before that date.\n\n';

const stats = { converted: 0, copied: 0, skipped: 0, warnings: [] };

// ---------------------------------------------------------------------------
// Frontmatter
// ---------------------------------------------------------------------------

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) {
    return { title: '', description: '', body: content };
  }

  const raw = match[1];
  const body = content.slice(match[0].length).replace(/^\n+/, '');

  const titleMatch = raw.match(/^title:\s*(.+)$/m);
  const descMatch = raw.match(/^description:\s*(.+)$/m);

  const clean = (s) => (s || '').trim().replace(/^["']|["']$/g, '');

  return {
    title: clean(titleMatch?.[1]),
    description: clean(descMatch?.[1]),
    body,
  };
}

function buildFrontmatter(title, description) {
  // Quote if value contains special YAML characters
  const quoteIfNeeded = (s) =>
    /[:#\[\]{}|>&*!,?]/.test(s) || s.startsWith('"') ? `"${s.replace(/"/g, '\\"')}"` : s;

  return `---\ntitle: ${quoteIfNeeded(title)}\ndescription: ${quoteIfNeeded(description)}\n---\n\n`;
}

// ---------------------------------------------------------------------------
// Macro transformations
// ---------------------------------------------------------------------------

function stripDNL(content) {
  return content.replace(/\[!DNL ([^\]]+)\]/g, '$1');
}

function convertUIControl(content) {
  // [!UICONTROL text] → **text**; then collapse **text** that ended up as ****text****
  let out = content.replace(/\[!UICONTROL ([^\]]+)\]/g, '**$1**');
  out = out.replace(/\*{4}([^*\n]+)\*{4}/g, '**$1**');
  return out;
}

// ---------------------------------------------------------------------------
// Alert blocks  >[!TYPE] ... → <InlineAlert />
// ---------------------------------------------------------------------------

const ALERT_TYPE_RE = /^>\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION|INFO|SUCCESS|ERROR|ADMIN|AVAILABILITY|PREREQUISITES)\]$/;
const MORELIKETHIS_RE = /^>\[!MORELIKETHIS\]/;

function transformAlerts(content) {
  const lines = content.split('\n');
  const out = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Remove MORELIKETHIS blocks entirely
    if (MORELIKETHIS_RE.test(line)) {
      i++;
      while (i < lines.length && lines[i].startsWith('>')) i++;
      continue;
    }

    // BEGINTABS/TAB/ENDTABS — pass through untouched (handled by transformTabs)
    if (/^>\[!(BEGINTABS|TAB |ENDTABS)\]/.test(line)) {
      out.push(line);
      i++;
      continue;
    }

    const alertMatch = line.match(ALERT_TYPE_RE);
    if (alertMatch) {
      const variant = ALERT_VARIANTS[alertMatch[1]];
      i++;

      // Collect consecutive lines starting with '>'
      const rawLines = [];
      while (i < lines.length && lines[i].startsWith('>')) {
        rawLines.push(lines[i]);
        i++;
      }

      // Group into paragraphs (blank '>' lines are separators)
      const paragraphs = [];
      let para = [];
      for (const raw of rawLines) {
        const stripped = raw === '>' ? '' : raw.replace(/^> ?/, '');
        if (stripped === '') {
          if (para.length) { paragraphs.push(para.join(' ')); para = []; }
        } else {
          para.push(stripped);
        }
      }
      if (para.length) paragraphs.push(para.join(' '));

      if (!paragraphs.length) continue;

      const slots =
        paragraphs.length === 1
          ? 'text'
          : paragraphs.map((_, k) => `text${k + 1}`).join(', ');

      out.push(`<InlineAlert slots="${slots}" variant="${variant}" />`);
      out.push('');
      paragraphs.forEach((p, k) => {
        out.push(p);
        if (k < paragraphs.length - 1) out.push('');
      });

      continue;
    }

    out.push(line);
    i++;
  }

  return out.join('\n');
}

// ---------------------------------------------------------------------------
// Tab blocks  >[!BEGINTABS] … >[!ENDTABS] → <Tab />
// ---------------------------------------------------------------------------

function transformTabs(content) {
  return content.replace(
    />\[!BEGINTABS\]([\s\S]*?)>\[!ENDTABS\]/g,
    (_match, inner) => {
      // Split on >[!TAB ...] boundaries (keep the delimiter via lookahead)
      const sections = inner.split(/(?=>\[!TAB )/);
      const tabs = [];

      for (const sec of sections) {
        const m = sec.match(/^>\[!TAB ([^\]]+)\]\n?([\s\S]*)/);
        if (!m) continue;
        tabs.push({ name: m[1].trim(), content: m[2].trim() });
      }

      if (!tabs.length) return _match;

      const lines = [
        `<Tab orientation="horizontal" slots="heading, content" repeat="${tabs.length}" />`,
      ];
      for (const tab of tabs) {
        lines.push('', `### ${tab.name}`, '', tab.content);
      }
      return lines.join('\n');
    }
  );
}

// ---------------------------------------------------------------------------
// Image & link attribute cleanup
// ---------------------------------------------------------------------------

function stripImageAttrs(content) {
  // ![alt](src){...} → ![alt](src)
  return content.replace(/!\[([^\]]*)\]\(([^)]+)\)\{[^}]+\}/g, '![$1]($2)');
}

function stripLinkAttrs(content) {
  // [text](url){target="_blank"} → [text](url)
  let out = content.replace(/(\]\([^)]+\))\{target="_blank"\}/g, '$1');
  // orphaned {target="_blank"} not immediately following )
  out = out.replace(/(?<!\))\{target="_blank"\}/g, '');
  return out;
}

// ---------------------------------------------------------------------------
// Full file transformation
// ---------------------------------------------------------------------------

function transformFile(rawContent, relPath) {
  const isSoap = relPath.startsWith('soap-api/');

  const { title, description, body } = parseFrontmatter(rawContent);

  if (!title) stats.warnings.push(`Missing title: ${relPath}`);

  let b = body;
  b = stripDNL(b);
  b = convertUIControl(b);
  b = transformAlerts(b);
  b = transformTabs(b);
  b = stripImageAttrs(b);
  b = stripLinkAttrs(b);

  const fm = buildFrontmatter(
    stripDNL(title || basename(relPath, '.md')),
    stripDNL(description || '')
  );

  return fm + (isSoap ? SOAP_DEPRECATION : '') + b;
}

// ---------------------------------------------------------------------------
// Directory walker
// ---------------------------------------------------------------------------

function walk(dir, cb) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full, cb);
    else cb(full);
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

console.log(`Source: ${SOURCE_ROOT}`);
console.log(`Target: ${TARGET_ROOT}\n`);

walk(SOURCE_ROOT, (srcPath) => {
  const rel = relative(SOURCE_ROOT, srcPath);
  const name = basename(srcPath);
  const ext = extname(srcPath).toLowerCase();

  if (SKIP_FILES.has(name)) {
    stats.skipped++;
    return;
  }

  const targetPath = join(TARGET_ROOT, rel);
  mkdirSync(dirname(targetPath), { recursive: true });

  if (ext === '.md') {
    const raw = readFileSync(srcPath, 'utf8');
    const out = transformFile(raw, rel);
    writeFileSync(targetPath, out, 'utf8');
    stats.converted++;
    console.log(`  OK    ${rel}`);
  } else if (IMAGE_EXTS.has(ext)) {
    copyFileSync(srcPath, targetPath);
    stats.copied++;
    console.log(`  COPY  ${rel}`);
  } else {
    stats.skipped++;
    console.log(`  SKIP  ${rel}`);
  }
});

console.log(`\n${'='.repeat(50)}`);
console.log(`Converted : ${stats.converted} markdown files`);
console.log(`Copied    : ${stats.copied} image files`);
console.log(`Skipped   : ${stats.skipped} files`);
if (stats.warnings.length) {
  console.log(`\nWarnings:`);
  stats.warnings.forEach((w) => console.log(`  ⚠  ${w}`));
}
console.log('Done.');
