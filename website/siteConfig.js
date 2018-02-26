/* eslint-disable */

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

const siteConfig = {
  title: 'BigTest',
  tagline: 'Making your application work since 2017.',
  url: 'https://bigtest.js.org',
  baseUrl: '/',
  organizationName: 'thefrontside',
  projectName: 'bigtest.js.org',
  noIndex: false,
  headerLinks: [
    { doc: 'intro', label: 'Docs' },
    { search: true },
    { page: 'help', label: 'Help' }
  ],
  users,
  algolia: {
    apiKey: '93fbb17f31be6f6b9f4eff7b53a1582f',
    indexName: 'bigtest',
    inputSelector: '### REPLACE ME ####',
    debug: false
  },
  cname: 'bigtest.js.org',
  headerIcon: 'img/logo-white-square.svg',
  footerIcon: 'img/logo-square.svg',
  favicon: 'img/favicon/favicon-32x32.png',
  colors: {
    primaryColor: '#16325B',
    secondaryColor: '#7E8B9F'
  },
  copyright:
    'Copyright © ' +
    new Date().getFullYear() +
    'The Frontside',
  highlight: {
    theme: 'rainbow'
  },
  stylesheets: [
    'https://fonts.googleapis.com/css?family=Raleway',
    'https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.css'
  ],
  scripts: [
    'https://buttons.github.io/buttons.js',
    'https://use.fontawesome.com/releases/v5.0.6/js/all.js',
    'https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js'
  ],
  repoUrl: 'https://github.com/facebook/test-site'
}

module.exports = siteConfig
