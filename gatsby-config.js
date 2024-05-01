/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

module.exports = {
  pathPrefix: process.env.PATH_PREFIX || '/marketo-apis/',
  siteMetadata: {
    pages: [
      {
        title: 'Marketo APIs',
        path: '/'
      },
      {
        title: 'Marketo Documentation',
        path: 'https://experienceleague.adobe.com/en/docs/marketo-engage'
      },
      {
        title: 'API Reference',
        menu: [
          {
            title: 'Marketo Asset API',
            description: 'API documentation for Marketo Asset',
            path: '/api/asset.md'
          },
          {
            title: 'Marketo Identity API',
            description: 'API documentation for Marketo Identity',
            path: '/api/identity.md'
          },
          {
            title: 'Marketo Lead Database API',
            description: 'API documentation for the Marketo Lead database',
            path: '/api/mapi.md'
          }
        ]
      },
      {
        title: 'Support',
        path: 'https://experienceleague.adobe.com/en/docs/marketo/using/getting-started-with-marketo/help-center'
      }
    ],
  },
  plugins: [`@adobe/gatsby-theme-aio`]
};
