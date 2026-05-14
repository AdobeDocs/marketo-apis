---
title: MCP Server
description: "Learn how to connect an AI assistant to Marketo using the MCP server. Configure Claude Desktop, Cursor, Claude Code, or VS Code with your Marketo credentials."
---

# Marketo MCP Server

<InlineAlert slots="text" variant="info" />

The MCP server is currently in a closed beta release. It is not available to all users at this time. 

Model Context Protocol (MCP) is an open standard that enables AI tools to communicate with external services. The Marketo MCP server acts as a bridge between your AI assistant and Marketo. It exposes more than 100 operations across forms, programs, smart campaigns, leads, emails, snippets, lists, and folders.

When your AI tool calls the MCP server, the server executes the corresponding REST API call on your behalf, using the credentials you provide in each request. You do not need to install, deploy, or run any server-side software.

<InlineAlert slots="text" variant="warning" />

The Model Context Protocol (MCP) is an emerging open-source standard and may present security or reliability risks. Adobe MCP server integrations and related documentation are provided "as is," without warranties of any kind. Connecting MCP clients or servers to Adobe products is a customer-elected configuration, and customers are responsible for evaluating the security and suitability of any MCP integration. Adobe is not responsible for issues arising from misconfiguration, misuse of the MCP, vulnerabilities in third-party implementations, or unintended actions performed through MCP-enabled workflows. To reduce risk, Adobe encourages testing integrations in a sandbox environment prior to productive use and carefully reviewing and validating all MCP-initiated actions and responses before confirming or relying on them.

## MCP basics

>Think of MCP like a USB-C port for AI applications. Just as USB-C provides a standardized way to connect your devices to various peripherals and accessories, MCP provides a standardized way to connect AI models to different data sources and tools. — [Model Context Protocol](https://modelcontextprotocol.io/docs/getting-started/intro)

MCP allows an AI tool to connect to multiple external services at the same time. For example, an AI assistant could:

* Connect to a word processor for AI-assisted document generation
* Connect to 3D modeling apps such as Blender to build animations
* Connect to After Effects for video editing

MCP is a communication protocol — an open standard that any application can implement to expose its data and actions to AI tools.

## What Marketo MCP does and does not do

Understanding the scope of MCP helps set expectations before you connect your AI tool.

**MCP does:**

* Provide access to Marketo data and capabilities through standard REST APIs
* Execute API calls on your behalf using credentials you supply with each request
* Support multiple simultaneous users, each connected with their own credentials
* Handle OAuth token refresh automatically — you do not need to manage token expiration
* Operate within tenant-isolated environments so your data never intersects with another user's session

**MCP does not:**

* Use, host, or run any AI or machine learning models — all AI processing happens in your AI tool, not in MCP
* Train on or learn from any data, including your customer data
* Generate predictions, recommendations, or decisions — decision-making is the responsibility of the downstream AI tool or user
* Store or retain credentials, request data, or session state between requests
* Require you to install, deploy, or manage any server-side software

## Prerequisites

* A Marketo instance with REST API access enabled
* Admin access to create API credentials in Marketo LaunchPoint
* One of the following AI tools: Claude Desktop, Cursor, Claude Code (CLI), or VS Code with GitHub Copilot
* Network access to the MCP server URL: `https://marketo-mcp.adobe.io/mcp`

## Get Marketo credentials

You need the following values from your Marketo instance:

* **Client ID**
* **Client Secret**
* **Munchkin Account ID**

If you already have them, skip to [Configure your AI tool](#configure-your-ai-tool).

### Client ID and Client Secret

1. Go to **Admin** > **LaunchPoint**.
1. Select your API service. If you do not have one, select **New** > **New Service**, choose **Custom** as the service type, and assign a dedicated API user.
1. Select **View Details** and copy the **Client ID** and **Client Secret** values.

### Munchkin Account ID

1. Go to **Admin** > **Munchkin**.
1. Copy the **Munchkin Account ID**. The format is `XXX-XXX-XXX` and matches the prefix of your instance URL.

## Configure your AI tool

Each AI tool reads MCP server configuration from a different location. Find your tool below and follow the steps to add the Marketo MCP server.

<InlineAlert slots="text" variant="help" />

To connect to multiple Marketo instances, add separate entries in your MCP configuration with unique names — for example, `marketo-prod` and `marketo-staging` — each with the corresponding credentials.

### Claude Desktop

The configuration file is `claude_desktop_config.json`. Open it from one of these locations:

* **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
* **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

If the file already contains other MCP servers, add the `marketo` entry under `mcpServers`. The following example shows the complete `mcpServers` block:

```json
{
  "mcpServers": {
    "marketo": {
      "type": "http",
      "url": "https://marketo-mcp.adobe.io/mcp",
      "headers": {
        "X-Marketo-Client-Id": "YOUR-CLIENT-ID",
        "X-Marketo-Client-Secret": "YOUR-CLIENT-SECRET",
        "X-Marketo-Munchkin-Id": "YOUR-MUNCHKIN-ID"
      }
    }
  }
}
```

Save the file, quit Claude Desktop, and reopen it.

### Cursor

If your Cursor MCP configuration already contains other servers, add the `marketo` entry under `mcpServers`. The following example shows the complete `mcpServers` block in **Settings** > **MCP** or `.cursor/mcp.json` in your project directory:

```json
{
  "mcpServers": {
    "marketo": {
      "type": "http",
      "url": "https://marketo-mcp.adobe.io/mcp",
      "headers": {
        "X-Marketo-Client-Id": "YOUR-CLIENT-ID",
        "X-Marketo-Client-Secret": "YOUR-CLIENT-SECRET",
        "X-Marketo-Munchkin-Id": "YOUR-MUNCHKIN-ID"
      }
    }
  }
}
```

Restart Cursor.

### Claude Code (CLI)

Run the following command in your terminal, substituting your credentials:

```bash
claude mcp add --transport http marketo \
  https://marketo-mcp.adobe.io/mcp \
  --header "X-Marketo-Client-Id: YOUR-CLIENT-ID" \
  --header "X-Marketo-Client-Secret: YOUR-CLIENT-SECRET" \
  --header "X-Marketo-Munchkin-Id: YOUR-MUNCHKIN-ID"
```

### VS Code with GitHub Copilot

Press **Ctrl+Shift+P** (or **Cmd+Shift+P** on macOS), type **MCP: Open User Configuration**, and press Enter. This opens `mcp.json`. Add the `marketo` entry inside the `servers` object:

```json
{
  "servers": {
    "marketo": {
      "type": "http",
      "url": "https://marketo-mcp.adobe.io/mcp",
      "headers": {
        "X-Marketo-Client-Id": "YOUR-CLIENT-ID",
        "X-Marketo-Client-Secret": "YOUR-CLIENT-SECRET",
        "X-Marketo-Munchkin-Id": "YOUR-MUNCHKIN-ID"
      }
    }
  }
}
```

<InlineAlert slots="text" variant="info" />

For security purposes, use environment variable interpolation in configuration files instead of pasting credentials directly. You can reference variables using syntax like `${MARKETO_CLIENT_SECRET}` and set them in your environment. This prevents credentials from being stored in plain text in files that may be committed to version control.

## Available operations

Once connected, you can ask your AI assistant to perform operations across the following categories.

### Forms

Browse, create, clone, and approve forms. Add or remove fields, configure field visibility rules, and identify where forms are embedded.

Example prompts:

* "Show me all approved forms"
* "Clone the Contact Us form into the Q2 Campaign folder"
* "Add a Company field to the Demo Request form"

### Smart campaigns

Create smart campaigns, configure smart list filters, add flow steps, and activate or deactivate campaigns.

Example prompts:

* "What smart campaigns are active right now?"
* "Create a new smart campaign called Lead Scoring Update in the Operations folder"
* "Show me the flow steps in the Welcome Email campaign"

### Leads and lists

Find leads by email address, create or update lead records, and manage static list membership.

Example prompts:

* "Find the lead with email jane@example.com"
* "Add lead ID 12345 to the Q2 MQL list"
* "Create a new static list called Summer Event Attendees"

### Programs

Create, clone, and tag programs. Browse programs by type, channel, or date range.

Example prompts:

* "Clone the Q4 Webinar program into the 2026 Events folder"
* "Create a new email program called Summer Sale in the Campaigns folder"
* "Show me all programs tagged as Webinar"

### Emails and snippets

Browse emails, create emails from templates, update content sections, and manage reusable snippets.

Example prompts:

* "Show me all draft emails"
* "Update the header section of the Welcome Email"
* "What assets use the Holiday Promo snippet?"

### Instance structure

Browse folders, channels, tag types, and activity types to understand your Marketo configuration.

Example prompts:

* "List all folders in Marketo"
* "Show me all available channels"
* "What tag types are configured?"

### Bulk operations

Export lead data in bulk and check import or export job status.

Example prompts:

* "Create a bulk export of leads created in the last 30 days"
* "Check the status of export job xx"

## Troubleshooting

| Error | Cause | Fix |
| ------- | ------- | ----- |
| "Marketo credentials not provided" | One or more of `X-Marketo-Client-Id`, `X-Marketo-Client-Secret`, or `X-Marketo-Munchkin-Id` is missing. | Verify all four headers are present in your configuration. |
| "Authentication Error" | Your credentials are invalid or expired. | Re-check your Client ID and Client Secret in **Admin** > **LaunchPoint**. |
| "403 Forbidden" | Your Munchkin ID is not on the server allowlist. | Contact your Marketo MCP administrator to add your Munchkin ID. |
| Connection timeout or refused | The MCP server is unreachable from your network. | Confirm you can reach the server URL from your environment. Check VPN requirements if applicable. |
| Tool calls return empty results | The API user lacks permissions for the requested asset type. | Ask your Marketo admin to review the API user role and permissions. |

## Security considerations

<InlineAlert slots="text" variant="warning" />

Use a dedicated API user in Marketo with only the permissions required for your work. Do not reuse admin credentials for API access.

* **Per-request credentials.** Client ID, Client Secret, Munchkin ID, and the REST API endpoint are transmitted in HTTP headers with each request. The server does not store or cache them.
* **Multi-tenant isolation.** Each request uses its own set of credentials. Your data does not intersect with any other user's session.
* **Munchkin ID allowlist.** The server only accepts requests for approved Marketo instances. Requests using an unauthorized Munchkin ID are rejected with a 403 error.
* **API rate limits.** The MCP server inherits the API rate limits of your Marketo instance. Use a dedicated API user to track and manage quota consumption.
* **Keep credentials out of version control.** Use environment variable interpolation (`${MARKETO_CLIENT_SECRET}`) if your AI tool supports it, so credentials are not stored in plain text in files committed to a repository.
