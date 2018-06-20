export function $$(selector, ctx = document.body) {
  return [].slice.call(ctx.querySelectorAll(selector));
}

export function isVisible($el) {
  return !!$el.getClientRects().length;
}

export function elementMatches($el, selector) {
  if (!$el.matches) {
    return $el.msMatchesSelector(selector);
  } else {
    return $el.matches(selector);
  }
}

export function closest($el, selector) {
  if (!$el) return null;
  while (($el = $el.parentElement) && !elementMatches($el, selector));
  return $el;
}
