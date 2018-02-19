/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

 const users = [
   {
     caption: "User1",
     image: "/test-site/img/docusaurus.svg",
     infoLink: "https://www.example.com",
     pinned: true
   }
 ];

/* List of projects/orgs using your project for the users page */
const siteConfig = {
  title: 'BigTest Site' /* title for your website */,
  tagline: 'A website about BigTest and testing big for all projects',
  url: 'https://bigtest.js.org',
  baseUrl: "/",
  organizationName: 'thefrontside',
  projectName: 'bigtest.js.org',
  noIndex: false,
  headerLinks: [
    {doc: 'intro', label: 'About'},
    {doc: 'installation', label: 'Docs'},
    {page: 'help', label: 'Help'},
    { blog: false },
  ],
  users,
  cname: 'bigtest.js.org',
  /* path to images for header/footer */
  headerIcon: '',
  footerIcon: '',
  favicon: '',
  /* colors for website */
  colors: {
    primaryColor: '#16325B',
    secondaryColor: '#7E8B9F',
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
    theme: 'default',
  },
  scripts: ['https://buttons.github.io/buttons.js'],
  // You may provide arbitrary config keys to be used as needed by your template.
  repoUrl: 'https://github.com/facebook/test-site',
};

module.exports = siteConfig;
