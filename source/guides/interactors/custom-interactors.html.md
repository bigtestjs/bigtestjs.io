---
title: Guides | Interactors | Custom Interactors
prev_guide:
  title: Introduction
  url: /guides/interactors/introduction.html
next_guide:
  title: Composing Interactors
  url: /guides/interactors/composing-interactors.html
---

# Custom Interactors

While using the default Interactor can be fine for simple and smaller
components, custom interactors are easy to create using the class
decorator and interaction creators. Custom interactors allow us to
keep all of our selectors in one place, and have the benefit of being
composable with other interactors to interact with more complex
structures.

``` javascript
import {
  interactor,
  text,
  value,
  property,
  fillable,
  focusable,
  blurrable
} from '@bigtest/interactor';

@interactor class FieldInteractor {
  // custom properties are lazy like the default properties
  label = text('[data-test-label]');
  value = value('[data-test-input]');
  type = property('[data-test-input]', 'type');

  // `*able` property creators create chainable interactor methods
  fill = focusable('[data-test-input]');
  focus = focusable('[data-test-input]');
  blur = blurrable('[data-test-input]');
}
```

The default set of properties and methods have corresponding
interaction creators. There are also several other [available
interaction creators](/guides/interactors/available-interactions/#property-creators)
to choose from as well.

## Custom Methods And Properties

Additional methods and property getters can also be defined directly
on the decorated class. However, be careful with property initializers
and using `this`, as it will reference the undecorated class instance
and **not** the interactor instance you might expect.

``` javascript
@interactor class FieldInteractor {
  // ...

  // methods that return new instances of itself will be chainable with other methods
  fillIn(value) {
    return this.focus().fill(value).blur()
  }

  // using getters ensures that properties will not be invoked until necessary
  get isPassword() {
    return this.type === 'password';
  }

  // the following will not work because `this` references the undecorated class
  // foo = () => this.doesntWork()
}
```

## Custom Interaction Creators

For commonly used custom properties and methods, two helpers exist
which allow you to define your own reusable interaction creators:
`computed`, for properties, and `action`, for methods.

In addition to the default methods, interactors also have a few of
their own helper methods.

- `this.$(selector)` uses the interactor's root element and
  `querySelector` to look up nested elements. When the element cannot
  be found, an error is thrown; when `selector` is not defined, the
  root element is returned instead.

- `this.$$(selector)` also uses the interactor's root element, but uses
  `querySelectorAll` and returns an array of matching elements. An
  error will only be thrown if the root element cannot be found.

``` javascript
import { computed } from '@bigtest/interactor';

// returns a specific data attribute of an element
export function data(selector, key) {
  // to align with other interaction creators, `selector` is optional
  if (!key) {
    key = selector;
    selector = null;
  }

  // the `computed` helper creates a getter
  return computed(function() {
    return this.$(selector).dataset[key];
  });
}
```

Interactor methods `#find(selector)` and `#findAll(selector)` behave
just like their aforementioned counterparts, except that they return
new instances for chaining. The found element(s) are passed along to
the next function in the chain.

``` javascript
import { action } from '@bigtest/interactor';

// triggers a keypress event for each character in a given string
export function typeable(selector) {
  // the `action` helper returns an interactor method
  return action(function(string) {
    return this.find(selector)
    // `#do` executes a callback within the queue
      .do(($node) => {
        for (let char of string) {
          $node.dispatchEvent(
            new Event('keypress', {
              charChode: char.charCodeAt(),
              cancelable: true,
              bubbles: true
            })
          );
        }
      });
  });
}
```

## Using Custom Interactors

Custom interactors can be used just like normal interactors would be.

``` javascript
let username = new FieldInteractor('[data-test-username-field]');
let password = new FieldInteractor('[data-test-password-field]');

// focuses, fills, and blurs the field input
await username.fillIn('bigtester');

// property access could trigger "element not found" errors like default properties
expect(username.type).to.equal('text');
expect(password.isPassword).to.be.true;
```

If an interactor typically only ever belongs to one element, defining
a static `defaultScope` property prevents us from having to initialize
the interactor with a scope selector every time.

``` javascript
@interactor class HomePageInteractor() {
  static defaultScope = '[data-test-home-page]';
  // ...
}

// defaults scope to "[data-test-home-page]"
let homePage = new HomePageInteractor();
```

Custom Interactors can also be used to [compose other
interactors](/guides/interactors/composing-interactors/) by nesting
them within each other. Helpers like `scoped` and `collection` also
allow you to scope an interactor or group of interactors to specific
elements within the parent interactor.
