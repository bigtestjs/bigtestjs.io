---
title: Guides | Interactors | Available Interactions
prev_guide:
  title: Composing Interactors
  url: /guides/interactors/composing-interactors.html
---

# Available Interactions

Below is a brief description of the various interactions available
out-of-the-box with interactors. Clicking the name of an interaction
will take you to the corresponding API docs which include more details
and examples.

## Default Interactions

These default interaction properties and methods are available on all
[interactors](/guides/interactors/introduction/), but may be safely
overwritten when defining your own, custom, interactors.

### Properties

All properties, with the exception of `isPresent`, will throw an error
if the element cannot be located within the interactor's root element.

- **[`#text`](/docs/interactor/#/Interactor#text)** <br/>
  Returns the trimmed `textContent` property of an element.

- **[`#value`](/docs/interactor/#/Interactor#value)** <br/>
  Returns the `value` property of an element.

- **[`#isVisible`](/docs/interactor/#/Interactor#isVisible)** <br/>
  Returns `true` or `false` if an element is visible in the document.

- **[`#isHidden`](/docs/interactor/#/Interactor#isHidden)** <br/>
  Returns `true` or `false` if an element _exists_ in the document but
  is visually hidden.

- **[`#isPresent`](/docs/interactor/#/Interactor#isPresent)** <br/>
  Returns `true` or `false` if an element can be found within the
  document.

### Methods

All default interactor methods accept an optional selector as the
first argument. Given a selector, the interaction will be made on the
matching element within the parent interactor's root element.

_Note: Interaction methods return new instances of the interactor and
do not preform any interactions until the `#run()` method is invoked
on the new instance._

- **[`#click([selector])`](/docs/interactor/#/Interactor#click)** <br/>
  Triggers a `click` event on an element.

- **[`#fill([selector], value)`](/docs/interactor/#/Interactor#fill)** <br/>
  Changes the `value` of an element and triggers `input` and `change`
  events.

- **[`#select([selector], option)`](/docs/interactor/#/Interactor#select)** <br/>
  Selects an option by it's `text` value and triggers `input` and
  `change` events.

- **[`#focus([selector])`](/docs/interactor/#/Interactor#focus)** <br/>
  Triggers a `focus` event on an element.

- **[`#blur([selector])`](/docs/interactor/#/Interactor#blur)** <br/>
  Triggers a `blur` event on an element.

- **[`#scroll([selector], { top, left })`](/docs/interactor/#/Interactor#scroll)** <br/>
  Sets an element's `scrollTop` and `scrollLeft` properties and
  triggers a `scroll` event. The `top` and `left` values specify how
  many pixels in that direction to scroll to; at least one direction
  must be specified.

- **[`#trigger([selector], name[, options])`](/docs/interactor/#/Interactor#trigger)** <br/>
  Triggers an arbitrary event, `name`, on an element with any
  specified event `options`. By default, the `bubbles` and
  `cancelable` options are set to `true`.

## Property Creators

Property creators can be utilized when [creating your own custom
interactors](/guides/interactors/custom-interactors/) using the
`@interactor` class decorator. The creator functions accept an
optional selector just like the default methods do. However, the
resulting instance methods _do not_ have an optional selector
argument.

### Properties

Creators for interactor properties return getters that are lazily
evaluated. Just like the default properties, with the exception of
`isPresent`, all properties will throw an error if the element cannot
be located within the interactor's root element.

- **[`text([selector])`](/docs/interactor/#/text)** <br/>
  Returns the trimmed `textContent` property of an element.

- **[`value([selector])`](/docs/interactor/#/value)** <br/>
  Returns the `value` property of an element.

- **[`isVisible([selector])`](/docs/interactor/#/isVisible)** <br/>
  Returns `true` or `false` if an element is visible in the document.

- **[`isHidden([selector])`](/docs/interactor/#/isHidden)** <br/>
  Returns `true` or `false` if an element _exists_ in the document but
  is visually hidden.

- **[`isPresent([selector])`](/docs/interactor/#/isPresent)** <br/>
  Returns `true` or `false` if an element can be found within the
  document.

- **[`attribute([selector], attr)`](/docs/interactor/#/attribute)** <br/>
  Returns the specified attribute of an element via `getAttribute`.

- **[`property([selector], prop)`](/docs/interactor/#/property)** <br/>
  Returns the specified property value of an element.

- **[`hasClass([selector], className)`](/docs/interactor/#/hasClass)** <br/>
  Returns `true` or `false` if an element's `classList` contains
  the specified classname.

- **[`is([selector], match)`](/docs/interactor/#/is)** <br/>
  Returns `true` or `false` if an element can be selected by the
  specified matching selector via `Element.matches()`.

### Methods

Creators for interactor methods return chainable functions that then
return new instances with the specific interaction added to it's
queue. The interactions are not run until the interactor's `#run()`
method is invoked, or when using the `async`/`await` syntax.

- **[`clickable([selector]) => click()`](/docs/interactor/#/clickable)** <br/>
  Triggers a `click` event on an element.

- **[`fillable([selector]) => fill(value)`](/docs/interactor/#/fillable)** <br/>
  Changes the `value` of an element and triggers `input` and `change`
  events.

- **[`selectable([selector]) => select(option)`](/docs/interactor/#/selectable)** <br/>
  Selects an option by it's `text` value and triggers `input` and
  `change` events.

- **[`focusable([selector]) => focus()`](/docs/interactor/#/focusable)** <br/>
  Triggers a `focus` event on an element.

- **[`blurrable([selector]) => blur()`](/docs/interactor/#/blurrable)** <br/>
  Triggers a `blur` event on an element.

- **[`scrollable([selector]) => scroll({ top, left })`](/docs/interactor/#/scrollable)** <br/>
  Sets an element's `scrollTop` and `scrollLeft` properties and
  triggers a `scroll` event. The `top` and `left` values specify how
  many pixels in that direction to scroll to; at least one direction
  must be specified.

- **[`triggerable([selector], name[, options]) => trigger([options])`](/docs/interactor/#/triggerable)** <br/>
  Triggers an arbitrary event, `name`, on an element with any
  specified event `options`. By default, the `bubbles` and
  `cancelable` options are set to `true`. The two `options` arguments
  are merged when the interactor is run.

### Interactors

[Nested interactor](/guides/interactors/composing-interactors/)
creators return interactor instances scoped to the parent interactor's
root element. The second argument is an optional hash of additional
interactor properties to add to the returned interactor. The second
argument may also be an interactor class with it's own methods and
properties used when creating the nested, scoped, interactor.

- **[`scoped(selector[, properties])`](/docs/interactor/#/scoped)** <br/>
  Interactor creator for a single nested interactor.

- **[`collection(selector[, properties]) => fn([index])`](/docs/interactor/#/collection)** <br/>
  Interaction creator for a collection of nested interactors. A
  collection interaction takes an index as it’s argument and returns
  an interactor scoped to that element. Without an index, an array of
  corresponding interactors are returned

### Helpers

Property creator helpers may be used to define your own [custom
interactions](/guides/interactors/custom-interactors/#custom-interaction-creators).
Defining methods and getters directly on an interactor class is
supported. However, using these helpers allows you to create reusable
property creators like the above interactions.

- **[`computed(getter)`](/docs/interactor/#/computed)** <br/>
  Returns a property descriptor for an interactor property.

- **[`action(method)`](/docs/interactor/#/action)** <br/>
  Returns a property descriptor for an interactor method.
