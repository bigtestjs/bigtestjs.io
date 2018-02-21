# https://bigtest.js.org
[![CircleCI](https://circleci.com/gh/thefrontside/bigtest.js.org.svg?style=svg&circle-token=94d17c090c600ca3486dde52b7d7ff536dca28a2)](https://circleci.com/gh/thefrontside/bigtest.js.org)

This is the source code for the all new BigTest website. It is a [Docusaurus](https://docusaurus.io/)
application that statically generates the webpages and (future) blog.

### Prerequisites

1. Git
2. Node: install version 8.4 or greater
3. Yarn: See [Yarn website](https://yarnpkg.com/lang/en/docs/install/) for installation instructions
4. A fork of the repo (for any contributions)
5. A clone of the bigtest.js.org repo on your local machine

### Installation

1. `cd bigtest.js.org/website`
2. `yarn` to install the websites dependencies

### Run Locally

Use `yarn start` to fire up a local server at `http://localhost:3000`

### Getting Started

The structure of this project looks similar to this:

```
root-of-repo
├── docs
└── website
│   └── blog
│   └── core
│       └── Footer.js
│   └── node_modules
│   └── package.json
│   └── pages
│   └── sidebars.json
│   └── siteConfig.js
│   └── static
```
1. All documentation files go in the `docs` folder and must be `.md` files.
2. Sidebar items can be found and added to under `sidebars.json`.
3. All assets (images, css) live in the `website/static` directory.

### Deploying

The website is deployed to Github pages through [CircleCi](https://circleci.com/). To implement your changes, open an pull request. Once merged with `master`, your changes will be visible in a few minutes.
