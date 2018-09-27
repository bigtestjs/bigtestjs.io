---
title: Guides | Quick Start
next_guide:
  title: Interactors Introduction
  url: /guides/interactors/introduction.html
---

# Quick Start

This guide will teach you how to add BigTest to your React application.

We'll cover:
- Installing BigTest
- Generating support files
- Set Up
- Writing some basic tests

The steps outlined in this guide assume that you are using:

- [ Mocha ](https://mochajs.org/)
- Either Webpack or Parcel as your bundler.

## Install Dependencies

In your terminal, type in the following commands:

```bash
 yarn add --dev @bigtest/cli
```

```bash
 yarn add --dev @bigtest/interactor
```

```bash
 yarn add --dev @bigtest/react
```

- [ @bigtest/cli ](https://github.com/bigtestjs/cli) will give you access to the `bigtest` commands that we'll be using throughout the guide.

- [ @bigtest/interactor ](https://github.com/bigtestjs/interactor) allows your tests to interact with your app the way your users will. They will wait for elements to exist before interacting with them, which means that you don’t have to worry about timing your tests correctly to sync up with any run loops. (Who even has time for that?)

- [ @bigtest/react ](https://github.com/bigtestjs/react) React DOM helpers.

## Set Up

### Initializing BigTest

Once the BigTest CLI is installed, you will have access to the `bigtest` commands.
To test that out, let's generate the BigTest support files you'll need buy using the `bigtest init` command.

This command will create a new `bigtest` directory that includes:

* A helpers folder with a `setup-app.js` file in it which is how we set up and render our app in the DOM.
* An interactors folder where our interactors will live.
* A test folder that will house all of your tests. You'll see and `app-test.js` file in there, but you can have as many tests as you want here.

### Launch and Serve

BigTest works by bundling your app with the tests files that you've written. So, any tests that add will need to be added to the index.

But, before you can launch your app with, we need to tell your bundler how to serve up that sweet app by changing your bundlers entry point to the *bigtest folder*.  

For the purpose of this guide, we'll be using Parcel. Parcel demands that you have an index file, so go ahead and create an `index.html` in your bigtest folder.

Now we'll need to point our entry to that index we just created. So, if we look at our `package.json scripts`, it should look something like this:

```bash
"scripts": {
  "start": "parcel ./src/index.html",
  "start:test": "parcel ./bigtest/index.html", //your entry point should look like this
  "build": "NODE_ENV=production parcel build ./src/index.html"
}
```
If you're using WebPack as your bundler, CLI will have set the node.env to test for you. So, if your node.env is test, you can change the entry point to the bigtest index file. It might look something like this:

```bash
// webpack.config.js
const appEntry = isTest ? ".bigtest/index.js" : "./src/index.js"
```

### `bigtest run`

Once all of that bundling set up is completed, we'll want to set up `bigtest run`.

We'll start by adding a test script to our `package.json`

```bash
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
  - The bigtest launcher currently only works with mocha, but we are actively working on adding more options.

Your `bigtest.ops` should look like this now:

```bash
--serve "yarn start:test"
--serve-url "http://localhost:1234" //for parcel
--adapter mocha
```


```
A bunch of unorganized notes

- Import your root application component to `bigtest/helpers/setup-app.js` and pass it to the `setupAppForTesting` helper.
	- Usually what you pass to `React.DOM` to render
	- React helpers hook up to `React Router` so that you can visit routes in your test.
	- [ Example ](https://github.com/Robdel12/bigtest-todomvc/blob/master/bigtest/helpers/setup-app.js#L11)

- Run it and see your tests go!

# Writing Your First BigTest

Now that you’re all set up and ready to go, let’s write some tests!

## Interactors

- Interactor properties are lazy, composable, and chainable.
	-  Also super powerful.
[ BigTest - Guides | Interactors | Introduction ](https://bigtestjs.io/guides/interactors/introduction/)

You can create your own custom interactors or use the ones that come right [ out of the box ](https://bigtestjs.io/guides/interactors/available-interactions/) with BigTest.
```
