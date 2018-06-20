---
title: Guides | Interactors | Introduction
next_guide:
  title: Custom Interactors
  url: /guides/interactors/custom-interactors.html
---

# Interactors

In biology, an interactor is defined as part of an organism that
natural selection acts upon. A BigTest interactor defines part of an
app that tests act upon. You can think of interactors as composable
[page objects](https://martinfowler.com/bliki/PageObject.html) for
modern components.

``` javascript
import { Interactor } from '@bigtest/interactor';

// an interactor can be scoped directly to an element
let input = new Interactor('[data-test-input]');
let submit = new Interactor('[data-test-submit]');
```

## Interactor Properties

Interactor properties are lazy, and do not look up the element or
property until accessed. If the element cannot be found, an error is
thrown. This can be more useful than typical expectation failures
because we know _why_ the expectation is failing instead of just
knowing that the expectation failed with an incorrect value.

``` javascript
// when the elements do not exist in the DOM
input.value //=> Error: unable to find "[data-test-input]"
submit.text //=> Error: unable to find "[data-test-submit]"

// when the elements do exist in the DOM
input.value //=> "foo"
submit.text //=> "Submit"
```

## Immutable Methods

Interactors are immutable. Methods return new instances of the
interactor with an additional interaction appended to it's queue. You
can then run all of the interactions in an interactor's queue by
calling the `#run()` method.

``` javascript
// this does not actually focus the input yet
let focusInput = input.focus();

// chaining additional interactions will add to the new instance queue
let focusAndFill = focusInput.fill('some value');

// an interactor will wait until the element exists before interacting with it
focusAndFill.run()
  .then(...)  // the input was succesfully focused and filled with "some value"
  .catch(...) // something went wrong, likely the input was not found
```

Interactors can also be combined with each other to produce more
complex interactions. And since they're immutable, they can be reused
over and over again.

``` javascript
// remember, this does not actually interact with the elements yet
let fillInput = input.focus().fill('some value').blur();
let submitForm = submit.click();

// when this is run, it will focus, fill, and blur the input
// before finally clicking on the submit button
let fillAndSubmit = fillInput.append(submitForm);

// in one test...
fillAndSubmit.run()
// ... in another
fillAndSubmit.run()
```

The default interaction methods optionally accept a selector as their
first argument so that you may interact with elements within the
scoped interactor. Interactors are also thennable, which immediately
invokes `#run()`, allowing interactors to work with the
`async`/`await` syntax.

``` javascript
await new Interactor('[data-test-form]')
  .fill('[data-test-input]', 'some value')
  .click('[data-test-submit]');
```

For available default properties and methods, see [Available
Interactions](/guides/interactors/available-interactions/). You may
overwrite or define your own interactions by creating a [custom
interactor](/guides/interactors/custom-interactors/). This can be done
either by extending the `Interactor` class directly, or by using the
`@interactor` class decorator and interaction creators.
