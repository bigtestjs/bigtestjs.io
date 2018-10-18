---
title: Guides | Quick Start
next_guide:
  title: Interactors Introduction
  url: /guides/interactors/introduction
---

# Quick Start

This guide will get you up and running with BigTest in a React
application. By the end you will have all of the BigTest structure
setup and one passing test! We highly recommend reading the
[introduction](/guides/getting-started/introduction) before getting
started. It briefly explains the different parts that make up
BigTest and how they work.

At a high level we're going to cover:

- [Installing BigTest dependencies](#install-dependencies)
- [Initializing BigTest](#initializing-bigtest)
- [Importing your app](#importing-your-app)
- [Launching and serving your app](#launch-and-serve)
  - [`bigtest run`](#bigtest-run)
  - [`bigtest.opts`](#bigtestopts)
- [Running the tests!](#run-the-tests)

This guide assumes your application is using the following
technologies:

- [React](https://reactjs.org)
- [Mocha](https://mochajs.org/)
- [Webpack](https://webpack.js.org) or [Parcel](https://parceljs.org)
(or a build tool you can change the entry point to).

## Installing Dependencies

First, install the packages you'll to need to bigtest:

```bash
 yarn add --dev @bigtest/cli @bigtest/interactor @bigtest/react
```

- [@bigtest/cli](https://github.com/bigtestjs/cli) will give you
access to the `bigtest` commands that we'll be using throughout the
guide.

- [@bigtest/interactor](https://github.com/bigtestjs/interactor)
allows your tests to interact with your app the way your users
will. They will wait for elements to appear before interacting with
them, which means that you don’t have to worry about timing your tests
correctly to sync up with any run loops. (Who even has time for that?)

- [@bigtest/react](https://github.com/bigtestjs/react) React DOM
helpers that setup your application for acceptance testing.

## Initializing BigTest

Now that all of the dependencies are installed go to your project root
and run `npx bigtest init`. This will create a new `bigtest`
directory:

```
bigtest/
├── bigtest.opts
├── index.js
├── helpers/
│   └── setup-app.js
├── interactors/
│   └── app.js
└── tests/
    └── app-test.js
```

## Importing your App

You need to import the applications root component into the
`bigtest/helpers/setup-app.js` file. Importing your root component
will look something like this:

```javascript
import { setupAppForTesting } from '@bigtest/react';

// Import your applications root.
// This is typically what you pass to ReactDOM.render
import YourApp from '../../src/YourApp';

export async function setupApplicationForTesting() {
  await setupAppForTesting(YourApp, {
    mountId: 'bigtesting-container'
  });
}
```

## Launch and Serve

BigTest works by bundling your app with the tests files that you've
written. So, any tests that are created will need to be imported to
`bigtest/index.js`.
You need to tell your bundler how to bundle the tests with the app by
changing your bundler's entry point to `bigtest/index.js`.

The `bigtest` CLI sets the `NODE_ENV` to `test` for you. So with
webpack you can check to the `NOD_ENV` and change the entry point as
needed:

```javascript
// webpack.config.js
let isTesting = process.env.NODE_ENV === 'test'

module.exports = {
  entry: isTesting ? ".bigtest/index.js" : "./src/index.js"
};
```

### `bigtest run`

`bigtest run` handles launching the different browsers and actually
running the tests. Add a test script to your `package.json`

```javascript
// ..
"scripts": {
  "test": "bigtest run"
}
```

### `bigtest.opts`

The `bigtest.opts` file lets the launcher (`bigtest run`) know:

- How to start your apps server (**`--serve`**)
- Where your app is served (**`--serve-url`**)
- What test framework you're using (**`--adapter`**)
  - The bigtest launcher currently only works with mocha, but we are
working on adding more adapters.

Your `bigtest.opts` should look something like this:

```javascript
--serve "yarn start"
--serve-url "http://localhost:3000"
--adapter mocha
```

## Run the tests!

Now that everything is setup, if your applications root url has an
`h1` tag (it should!), you will have a passing test. You can check by
running the test command we setup earlier:

```bash
yarn test
```

That look like this:

![Gif of BigTest running](https://i.imgur.com/1yBTPgC.gif)
