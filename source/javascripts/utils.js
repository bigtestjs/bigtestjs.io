export function $$(selector, ctx = document.body) {
  return [].slice.call(ctx.querySelectorAll(selector));
}

export function isVisible($el) {
  return !!$el.getClientRects().length;
}
