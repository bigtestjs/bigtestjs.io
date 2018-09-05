---
title: Guides | Convergences | Introduction
next_guide:
  title: Convergence introduction
  url: /guides/convergences/introduction.html
---

# Convergences

What's the problem that convergences solve?
Asyncrony. There's nothing more asyncrynous and unpredictable as the actions that a user will make on your UI.
The way most people tend to understand various state changes in their app is as a simple cause and effect.
e.g., Cause: A user clicks on a nav link. Effect: The application transitions to a new page.

## Why Convergence?

Let's say you want to write an assertion to verify a simple cause and
effect: when a certain button is clicked, a dialog appears containing
some text that gets loaded from the network.

In order to do this, you have to make sure that your assertion runs
_after_ the effect you're testing has been realized.

![Image of assertion after an effect](https://raw.githubusercontent.com/thefrontside/bigtest/master/packages/convergence/images/assertion-after.png)

If not, then you could end up with a false negative, or "flaky test"
because you ran the assertion too early. If you'd only waited a little
bit longer, then your test would have passed. So sad!

![Image of false negative test](https://raw.githubusercontent.com/thefrontside/bigtest/master/packages/convergence/images/false-negative.png)

In fact, test flakiness is the reason most people shy away from
writing big tests in JavaScript in the first place. It seems almost
impossible to write robust tests without having visibility into the
internals of your runtime so that you can manually synchronize on
things like rendering and data loading. Unfortunately, those can be a
moving target, and worse, they couple you to your framework.

But what if instead of trying to run our assertions at just the right
time, we ran them _many_ times until they either pass or we decide to
give up?

![Image of convergent assertion](https://raw.githubusercontent.com/thefrontside/bigtest/master/packages/convergence/images/convergent-assertion.png)

This is the essence of what `@bigtest/convergence` provides:
repeatedly testing for a condition and then allowing code to run when
that condition has been met.

And it isn't just for assertions either. Because it is a general
mechanism for synchronizing on any observed state, It can be used to
properly time test setup and teardown as well.
