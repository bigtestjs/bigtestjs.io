---
title: Guides | Getting Started | Introduction
next_guide:
  title: Quick Start
  url: /guides/getting-started/quick-start.html
---

# Introduction

BigTest is a framework that aims to make it easy and fast to
acceptance test _all_ single page apps (SPAs) regardless of framework
or library.

When we build applications on the web, we want to be able to test them
as close to where our users will be. A real person using your app is
going to use a real browser; do your tests test your app in a real
browser? And not everybody uses the same browser; do your tests test
your app across multiple, different browsers and devices? What about
the network? Chances are your app talks to the network, and your tests
should account for this too, right? Not to mention a person isn’t
going to interact with your app on a component level. They’re
consuming the entire app, using all of it together. All of your
components working with each other to create an experience.

If your tests don’t test the app in the same way a person would use
it, how confident can you really be in them?

If you prefer video format, Robert DeLuca gave a talk at Byteconf
introducting BigTest:

<div class="video-wrapper">
  <iframe width="560" height="315"
  src="https://www.youtube.com/embed/w8a7Km9b6UI?start=107"
  frameborder="0" allow="autoplay; encrypted-media"
  allowfullscreen></iframe>
</div>


## Why BigTest?

We had a few requirements when setting out to find a testing tool
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
webdriver](https://github.com/cypress-io/cypress/issues/310)) and
wasn't written with components in mind.

**[TODO, insert comparison table]**

Most of the existing frameworks check a few of those boxes (or
partially check them), but not all of them. With mobile browsing being
so prevalent in todays world we needed something that could easily run
tests on any device we had on hand (by visiting a URL). So, we decided
to build what we wanted to see in the ecosystem!


## Testing philosophy

- test like a user
- test the _result_ of the action in the app, not stubbing or setting
  test specific attributes to check

When writing tests with BigTest it's important to write tests like a
user will be using your app. For example, if you have tests where you
reach into a components or controllers state, that's not a proper
BigTest. All interactions should come from a user.

## Packages that make up BigTest

The BigTest framework is comprised of a few small packages that can be
used invidually too. It's helpful to know of these packages and what
their role is in the BigTest framework.

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

In biology, an [interactor](/docs/interactor/) is defined as part of
an organism that natural selection acts upon. A BigTest interactor
defines part of an app that tests act upon. You can think of
interactors as composable page objects for modern components.

Interactors are the heart and soul of BigTest. In simple terms,
we render the application into the browser and interactors _drive_ the
application around. They use covergences to make sure the element
exits and can be interacted with before performing the interaction you
want.

Interactors also match the composibility you get with modern
componets. This means you can compose your tests in a similar way you
compose your UI.


### CLI

The [BigTest CLI](https://github.com/bigtestjs/cli) aims to make
setting up acceptance testing in SPAs easy. Things like setup, build
tool integration, and browser launching simple.

You can think of the CLI as a [Karma](https://karma-runner.github.io/2.0/index.html) or
[Testem](https://github.com/testem/testem) but easier to setup and
contains other helful CLI commands to work with the BigTest framework
(like `bigtest init`).

**Without using the CLI**

Interactors and convergences can be used without BigTest CLI. The
trade off is you will need to bring your own browser launcher
(like [Karma](https://karma-runner.github.io/2.0/index.html) or
[Testem](https://github.com/testem/testem)). If your application is
already running tests in the browser with Karma/testem, you can easily plug
convergence/interactor into your existing setup.
