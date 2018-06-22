import { $$, isVisible } from './utils';

class SidebarItemComponent {
  constructor($root) {
    this.$root = $root;
    this.$toggle = $root.querySelector('.sidebar-toggle');
    this.$list = $root.querySelector('.sidebar-list');

    // add accessible attributes
    this.$toggle.setAttribute('aria-expanded', true);

    // add event listeners
    this.$toggle.addEventListener('click', this.handleToggle.bind(this));
    this.$list.addEventListener('transitionend', this.handleTransitionEnd.bind(this));

    // collapse any non-active item
    if (!this.isActive && this.isTogglable) {
      this.collapse(true);
    }
  }

  get isActive() {
    return this.$root.classList.contains('is-active');
  }

  get isCollapsed() {
    return this.$toggle.getAttribute('aria-expanded') === 'false';
  }

  get isTogglable() {
    return isVisible(this.$toggle);
  }

  expand() {
    this.$list.style.display = '';
    this.$list.removeAttribute('hidden');

    // waits for a redraw
    window.setTimeout(() => {
      this.$toggle.setAttribute('aria-expanded', true);
      this.$list.style.maxHeight = `${this.$list.scrollHeight}px`;
    }, 1);
  }

  collapse(noAnimate) {
    if (!noAnimate) {
      this.$list.style.maxHeight = `${this.$list.scrollHeight}px`;
    }

    // waits for a redraw
    window.setTimeout(() => {
      this.$toggle.setAttribute('aria-expanded', false);
      this.$list.style.maxHeight = '0px';

      // when animating, this is done on transitionend
      if (noAnimate) {
        this.$list.style.display = 'none';
      }
    }, 1);
  }

  toggle() {
    if (this.isCollapsed) {
      this.expand();
    } else {
      this.collapse();
    }
  }

  // clicking the toggle expands or collapses the list
  handleToggle(event) {
    event.preventDefault();
    this.toggle();
  }

  // after the list is collapsed, it is hidden; after it is expanded,
  // the max height is removed
  handleTransitionEnd() {
    if (this.isCollapsed) {
      this.$list.setAttribute('hidden', '');
      this.$list.style.display = 'none';
    } else {
      this.$list.style.maxHeight = 'none';
    }
  };
}

export default class SidebarComponent {
  static init(selector) {
    return $$(selector).map($el => new this($el));
  }

  constructor($root) {
    this.$root = $root;

    // the sidebar itself is a collapsable item when mobile
    this.nav = new SidebarItemComponent($root.firstElementChild);

    // collect sidebar nav lists
    this.items = $$('[data-collapsable]', $root).map($root => {
      return new SidebarItemComponent($root);
    });

    // on window resize, the nav toggle might need to be reset
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  // smaller screens can toggle the sidebar
  get isTogglable() {
    return this.nav.isTogglable;
  }

  handleResize() {
    // init last togglable state
    if (typeof this.wasTogglable === 'undefined') {
      this.wasTogglable = this.isTogglable;
    }

    // no longer togglable, is collapsed: expand
    if (this.wasTogglable && !this.isTogglable && this.nav.isCollapsed) {
      this.nav.expand();

    // now visible, is not collapsed, collapse
    } else if (!this.wasTogglable && this.isTogglable && !this.nav.isCollapsed) {
      this.nav.collapse(true);
    }

    // remember last togglable state
    this.wasTogglable = this.isTogglable;
  }
}
