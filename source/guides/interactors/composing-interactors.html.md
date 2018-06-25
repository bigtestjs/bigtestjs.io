---
title: Guides | Interactors | Composing Interactors
prev_guide:
  title: Custom Interactors
  url: /guides/interactors/custom-interactors.html
next_guide:
  title: Available Interactions
  url: /guides/interactors/available-interactions.html
---

# Composing Interactors

When defining custom interactors, you may create more complicated
interactors by composing smaller ones. By default, nested interactors
_are not_ scoped to their parent interactor. This is because there can
be situations, like a modal or popover, where the element has been
appended to a different part of the document.

``` javascript
@interactor class ModalInteractor {
  // ...
}

@interactor class SignUpFormInteractor {
  // the default scope is used when a new instance's selector is omitted
  static defaultScope = '[data-test-sign-up-form]';

  // the modal element exists outside of the form
  confirmation = new ModalInteractor('[data-test-modal]');

  // ...
}
```

## Scoped Interactors

With the `scoped` property creator, you can create nested interactors
that are scoped _within the parent interactor_. The second argument
allows us to specify additional nested properties or even another
interactor class entirely.

``` javascript
@interactor class SignUpFormInteractor {
  // ...

  // scoped interactors look for an element within the parent element
  submit = scoped('[data-test-submit]');

  // a hash of other properties may be provided as the second argument
  email = scoped('[data-test-email-field] input', {
    placeholder: property('placeholder')
  });

  // using a class is preferred for maximum composability
  password = scoped('[data-test-password-field]', FieldInteractor);
}
```

The `collection` property creator returns a function that accepts an
index and will return a nested interactor for an element at that
index. This interactor is lazy just like normal interactors and will
not attempt to find the element at the index until interactions run or
properties are accessed. When given no arguments, the collection
function will return an array of interactors; one for every matching
element found at the time it was invoked.

``` javascript
@interactor class SignUpFormInteractor {
  // ...

  // collections also accept additional properties or a class as the second argument
  interests = collection('[data-test-interests-item]"]', {
    toggle: click('input[type="checkbox"]'),
    label: text('[data-test-label]')
  });
}
```

## Nested Methods and Properties

Nested interactor methods, scoped or not, return instances of the root
interactor for additional chaining. Nested properties are still lazily
evaluated at the time they're accessed.

``` javascript
let signUp = new SignUpFormInteractor();

// `await` will immediately invoke `#run()`, we could also save a reference
// to this specific interaction to re-use elsewhere
await signUp
  .email.fill('foo@bar.baz')
  .password.fillIn('53cr3t')
  .interests(3).toggle()
  .submit();

// nested interactors may be broken from the parent chain using `#only()`
await signUp.email.only()
  .focus()
  .fill('foo@bar')
  .blur();

// nested properties may throw one of a few "element not found" errors
signUp.interests(10).label
// => Error: unable to find "[data-test-label]"
// => Error: unable to find "[data-test-interest-item]" at index 10
// => Error: unable to find "[data-test-sign-up-form]"
```
