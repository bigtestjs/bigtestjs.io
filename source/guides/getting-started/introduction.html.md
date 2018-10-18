---
title: Introduction
next_guide:
  title: Quick Start
  url: /guides/getting-started/quick-start.html
---

# Introduction

BigTest is a framework that aims to make it easy and fast to
acceptance test _all_ single page apps (SPAs) regardless of framework
or library.

When we build applications on the web, we want to be able to test them
as close to where our users will be. This means running the
application in a real browser and firing real events. We want to make
sure our application works together as a whole, not indivudiually.

A real person using your app is going to use a real browser; do your
tests test your app in a real browser? And not everybody uses the same
browser; do your tests test your app across multiple, different
browsers and devices? What about the network? Chances are your app
talks to the network, and your tests should account for this too,
right? Not to mention a person isn’t going to interact with your app
on a component level. They’re consuming the entire app , using all of
it together. All of your components working with each other to create
an experience.

If your tests don’t test the app in the same way a person would use
it, how confident can you really be in them?


## Why BigTest?

We had a few hard requirements when setting out to find a testing tool
that would be ideal for SPAs:

- Built with components in mind
- Cross browser (Firefox, IE, Safari, etc)
- Cross device (Windows, macOS, iOS, Android, etc)
- Cross framework (React, Vue, Ember, Angular, etc)
- Cross test framework (Mocha, Jasmine, etc)

There are tools like [Jest](https://jestjs.io), but those tests don’t
run in a real browser. There’s also [Cypress](https://cypress.io), but
as of this writing, you currently can’t use it outside of Chrome
([others coming soon through
webdriver](https://github.com/cypress-io/cypress/issues/310)).


## Testing philosophy

## Packages that make up BigTest



### Convergence

[Convergences](/docs/convergence/) are powerful, immutable, reusable,
and composable assertions that allow you to know immediately when a
desired state is achieved. Put in simple terms: it checks the DOM
every 10ms (for 2s by default) to see if the state you're checking for
is there.

Convergence is the underpinning of everything in BigTest. It's what
makes interactors reliable. Convergence is even used in the CLI for
waiting on browser connected state.

### Interactor

[Interactors](/docs/interactor/)

### CLI

The [BigTest CLI](https://github.com/bigtestjs/cli) aims to make
setting up acceptance testing in SPAs easy. It aims to make things
like setup, build tool integration, and browser launching simple.

You can think of the CLI as a [Karma](https://karma-runner.github.io/2.0/index.html) or
[Testem](https://github.com/testem/testem) but easier to setup and
built for BigTest specifically.

**Without using the CLI**

Interactors and convergences can be used without BigTest CLI. The
trade off is you will need to bring your own browser launcher
(like [Karma](https://karma-runner.github.io/2.0/index.html) or
[Testem](https://github.com/testem/testem)). If your application is
already running tests in the browser with Karma/testem, you can easily plug
convergence/interactor into your existing setup.
