---
title: Guides | Quick Start
next_guide:
  title: Interactors Introduction
  url: /guides/interactors/introduction
---

# Quick Start

This guide will get you up and running with BigTest in a React
application. By the end you will have all of the BigTest structure
setup and one passing test!

At a high level we're going to cover:

- [Installing BigTest dependencies](#install-dependencies)
- [Generating the needed files with BigTest CLI](#initializing-bigtest)
- [Launching browsers and general set up](#launch-and-serve)

This guide assumes your application is using the following
technologies:

- React.js
- [Mocha](https://mochajs.org/)
- Webpack or Parcel (or a build tool you can change the entry point
to).

## Introduction

Before we jump right into getting setup, I want to briefly explain the
different pieces of BigTest and what role they play. This will draw
the outlines for the rest of the guide to color in.

BigTest is a collection of packages that aim to make it easy and fast to
acceptance test single page apps (SPAs). The packages that make up
BigTest are:

- [Convergence](/docs/convergence/)
- [Interactor](/docs/interactor/)
- [CLI](https://github.com/bigtestjs/cli)

### Convergence

Convergences are powerful, immutable, reusable, and composable
assertions that allow you to know immediately when a desired state is
achieved. Put in simple terms: it checks the DOM every 10ms (for 2s by
default) to see if the state you're checking for is there.

Convergence is the underpinning of everything in BigTest. It's what
makes interactors reliable. Convergence is even used in the CLI for
waiting on browser connected state.

### Interactor

[TODO]

### CLI

The BigTest CLI aims to make setting up acceptance testing in SPAs
easy. It aims to make things like setup, build tool integration, and browser
launching simple.

You can think of the CLI as a [Karma](https://karma-runner.github.io/2.0/index.html) or
[testem](https://github.com/testem/testem) but easier to setup and
built for BigTest specifically.

### Without using the CLI

Interactors and convergences can be used without BigTest CLI. The
trade off is you will need to bring your own browser launcher
(like [Karma](https://karma-runner.github.io/2.0/index.html) or
[testem](https://github.com/testem/testem)). If your application is
already running tests in the browser with Karma/testem, you can easily plug
convergence/interactor into your existing setup.

## Install Dependencies

First we'll start by installing all of the packages you're going to
need to use bigtest. In your terminal, type in the following command:

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
helpers that hook up to `React Router` so that you can visit routes in
your test.

## Set Up

### Initializing BigTest

Once the BigTest CLI is installed, you will have access to the
`bigtest` commands. To test that out, let's generate the BigTest
support files you'll need by using the `bigtest init` command.

This command will create a new `bigtest` directory that includes:

* A helpers folder with a `setup-app.js` file in it which is how we
set up and render our app in the DOM.
* An interactors folder where our interactors will live.
* A test folder that will house all of our tests. You'll see and
`app-test.js` file in there, but you can have as many tests as you
want here.

### Launch and Serve

BigTest works by bundling your app with the tests files that you've
written. So, any tests that add will need to be added to the index.

But, before you can launch your app with, we need to tell your bundler
how to serve up that sweet app by changing your bundler's entry point
to the *bigtest folder*.

For the purpose of this guide, we'll be using Parcel. Parcel starts
bundling everything from an index file, so go ahead and create an
`index.html` in your bigtest folder.

Now we'll need to point our entry to that index we just created. So,
if we look at our `package.json scripts`, it should look something
like this:

```javascript
"scripts": {
  "start": "parcel ./src/index.html",
  "start:test": "parcel ./bigtest/index.html", //your entry point should look like this
  "build": "NODE_ENV=production parcel build ./src/index.html"
}
```
If you're using WebPack as your bundler, CLI will have set the
node.env to test for you. So, if your node.env is test, you can change
the entry point to the bigtest index file. It might look something
like this:

```javascript
// webpack.config.js
const appEntry = isTest ? ".bigtest/index.js" : "./src/index.js"
```

### `bigtest run`

Once all of that bundling set up is completed, we'll want to set up
`bigtest run`.

We'll start by adding a test script to our `package.json`

```javascript
"scripts": {
  "start": "parcel ./src/index.html",
  "start:test": "parcel ./bigtest/index.html",
  "test": "bigtest run", // here it is
  "build": "NODE_ENV=production parcel build ./src/index.html"
}
```

Now we'll need to edit our `bigtest.ops` to let the launcher know:

- How to serve our app
- Where to serve our app
- What framework you're using for the adapter
  - The bigtest launcher currently only works with mocha, but we are
actively working on adding more options.

Your `bigtest.ops` should look like this now:

```javascript
--serve "yarn start:test"
--serve-url "http://localhost:1234" //for parcel
--adapter mocha
```

### Import your App

The final step of getting your app ready for some big tests is
importing it into the `bigtest/helpers/setup-app.js` that was created
when you ran `bigtest init`. So, importing your app will look
something like this:

```javascript
import { setupAppForTesting } from '@bigtest/react';

// Import your applications root.
// This is typically what you pass to ReactDOM.render

import YourApp from '../../src/components/YourApp';

export async function setupApplicationForTesting() {
  await setupAppForTesting(YourApp, {
    mountId: 'bigtesting-container'
  });
}
```

Now run your tests and watch them go!
