---
title: Guides | Convergences | Introduction
next_guide:
  title: Introduction to Interactors
  url: /guides/interactors/introduction.html
---

# Convergences

Convergences are the foundation of BigTest and are what makes BigTest
reiliable. But what specifically is the problem that convergences solve?

Asyncrony. There's nothing more asyncrynous and unpredictable as the
actions that a user will make on your UI. The way most people tend to
understand various state changes in their app is as a simple cause and
effect. e.g., Cause: A user clicks on a nav link. Effect: The
application transitions to a new page.

## Why Convergence?

Let's say you want to write an assertion to verify a simple cause and
effect: when a certain button is clicked, a dialog appears containing
some text that gets loaded from the network.

In order to do this, you have to make sure that your assertion runs
_after_ the effect you're testing has been realized.

![Image of assertion after an effect](/guides/convergences/introduction/images/assertion-after.png)

If not, then you could end up with a false negative, or "flaky test"
because you ran the assertion too early. If you'd only waited a little
bit longer, then your test would have passed. So sad!

![Image of false negative test](/guides/convergences/introduction/images/false-negative.png)

In fact, test flakiness is the reason most people shy away from
writing big tests in JavaScript in the first place. It seems almost
impossible to write robust tests without having visibility into the
internals of your runtime so that you can manually synchronize on
things like rendering and data loading. Unfortunately, those can be a
moving target, and worse, they couple you to your framework.

But what if instead of trying to run our assertions at just the right
time, we ran them _many_ times until they either pass or we decide to
give up?

![Image of convergent assertion](/guides/convergences/introduction/images/convergent-assertion.png)

This is the essence of what `@bigtest/convergence` provides:
repeatedly testing for a condition and then allowing code to run when
that condition has been met.

And it isn't just for assertions either. Because it is a general
mechanism for synchronizing on any observed state, It can be used to
properly time test setup and teardown as well.

## Creating a Convergence

A convergent function is a function that runs repeatedly until it no
longer returns false or throws an error. When the function is finally
successfully executed, it is considered to be passing and a converging
promise will resolve. However, if the converging function does not pass
within the provided timeout period the promise will reject with the
last error thrown from the function.

### Using `Convergence`

The `Convergence` class allows you to create a convergence, add
assertions to converge on, and execute the convergent assertions all
within a single timeout period.

``` javascript
import Convergence from '@bigtest/convergence';

// starts a new queue
new Convergence()
  // adds a convergent function to the queue
  .when(() => expect($el).to.exist)
  // called when the previous function converges
  .do(() => $el.get(0).click())
  // adds a convergent function that resolves when it is true
  // for the remaining timeout period
  .always(() => expect($el).to.have.prop('disabled', true))
  // starts converging and returns a promise that resolves
  // when all convergences have been met
  .run();
```

### Immutability

`Convergence` has an immutable interface, so it's methods will
return new instances.

``` javascript
// will converge when the total equals 5
let convergeWhen = new Convergence()
  .when(() => total === 5);

// will log the total after the first convergence
let convergeAndLog = convergeWhen
  .do(() => console.log(total));

// after logging the total, will converge when it remains 5 for the
// duration of the remaining timeout
let convergeAlways = convergeAndLog
  .always(() => total === 5);

// all three convergences can be ran in parallel
convergeWhen.run();
convergeAndLog.run();
convergeAlways.run();
```

_Note: `.run()` does not return a new instance, instead it returns a promise._

This is a breif overview of what convergence is, what problem it
solves, and how to use it. If you would like to see the entire API for
convergence, [check out the API docs](/docs/convergence)
