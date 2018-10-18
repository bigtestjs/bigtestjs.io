---
title: Introduction
next_guide:
  title: Quick Start
  url: /guides/getting-started/quick-start.html
---

## Introduction

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

**Without using the CLI**

Interactors and convergences can be used without BigTest CLI. The
trade off is you will need to bring your own browser launcher
(like [Karma](https://karma-runner.github.io/2.0/index.html) or
[testem](https://github.com/testem/testem)). If your application is
already running tests in the browser with Karma/testem, you can easily plug
convergence/interactor into your existing setup.
