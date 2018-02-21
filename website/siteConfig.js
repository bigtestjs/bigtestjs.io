/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const users = [
  {
    caption: 'Frontside',
    image: 'img/frontside-icon-transparent.png',
    infoLink: 'https://frontside.io',
    pinned: true
  }
]

/* List of projects/orgs using your project for the users page */
const siteConfig = {
  title: 'BigTest' /* title for your website */,
  tagline: 'Making your application work since 2017.',
  url: 'https://bigtest.js.org',
  baseUrl: '/',
  organizationName: 'thefrontside',
  projectName: 'bigtest.js.org',
  noIndex: false,
  headerLinks: [
    { doc: 'intro', label: 'Docs' },
    { page: 'help', label: 'Help' },
    { blog: false }
  ],
  users,
  cname: 'bigtest.js.org',
  /* path to images for header/footer */
  headerIcon: 'img/ghost-logo.png',
  footerIcon: 'img/ghost-logo.png',
  favicon: 'img/favicon/ghost-favicon.png',
  /* colors for website */
  colors: {
    primaryColor: '#16325B',
    secondaryColor: '#7E8B9F'
  },
  // This copyright info is used in /core/Footer.js and blog rss/atom feeds.
  copyright:
    'Copyright © ' +
    new Date().getFullYear() +
    'The Frontside',
  // organizationName: 'deltice', // or set an env variable ORGANIZATION_NAME
  // projectName: 'test-site', // or set an env variable PROJECT_NAME
  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks
    theme: 'rainbow'
  },
  stylesheets: ['https://fonts.googleapis.com/css?family=Raleway'],
  scripts: [
    'https://buttons.github.io/buttons.js',
    'https://use.fontawesome.com/releases/v5.0.6/js/all.js'
  ],
  // You may provide arbitrary config keys to be used as needed by your template.
  repoUrl: 'https://github.com/facebook/test-site'
}

module.exports = siteConfig
