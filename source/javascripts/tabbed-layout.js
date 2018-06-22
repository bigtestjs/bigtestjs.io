import { $$ } from './utils';

export default class TabbedLayoutComponent {
  static uuid = 0;

  static init(selector) {
    return $$(selector).map($el => new this($el));
  }

  constructor($root) {
    let id = this.constructor.uuid++;

    this.$root = $root;
    this.$list = $root.querySelector('.tabbed-layout-nav');
    this.$list.setAttribute('role', 'tablist');

    // add accessible tab attributes
    this.$tabs = $$('.tabbed-layout-nav button', $root).map(($tab, i) => {
      $tab.setAttribute('role', 'tab');
      $tab.setAttribute('id', `tl${id}t${i}`);
      $tab.setAttribute('aria-controls', `tl${id}p${i}`);
      return $tab;
    });

    // add accessible panel attributes
    this.$panels = $$('.tabbed-layout-panel', $root).map(($panel, i) => {
      $panel.setAttribute('role', 'tabpanel');
      $panel.setAttribute('id', `tl${id}p${i}`);
      $panel.setAttribute('aria-labelledby', `tl${id}t${i}`);
      $panel.setAttribute('hidden', '');
      return $panel;
    });

    // handlers for switching tabs
    this.$list.addEventListener('click', this.handleClick.bind(this));
    this.$list.addEventListener('keydown', this.handleKeyDown.bind(this));

    // on hashchange maybe auto-switch tabs
    window.addEventListener('hashchange', this.autodetect.bind(this));

    // activate the first tab if one wasn't auto-detected
    if (!this.autodetect()) {
      this.activate(0);
    }
  }

  get activeIndex() {
    return parseInt(this.$root.dataset.activeIndex, 10);
  }

  activate(index, shouldFocus) {
    let current = this.activeIndex;

    if (current > -1) {
      this.$tabs[current].removeAttribute('aria-selected');
      this.$panels[current].setAttribute('hidden', '');
    }

    this.$root.dataset.activeIndex = index;
    this.$tabs[index].setAttribute('aria-selected', true);
    this.$panels[index].removeAttribute('hidden');

    if (shouldFocus) {
      this.$tabs[index].focus();
    }
  }

  autodetect() {
    if (!location.hash) return false;

    let id = location.hash.substr(1).replace(/[\/\.#]/g, '\\$&');
    let $target = this.$root.querySelector(`#${id}`);
    let index = this.$panels.findIndex($p => $p.contains($target));

    if ($target && index > -1) {
      this.activate(index);
      $target.scrollIntoView();
      return true;
    }

    return false;
  }

  handleClick(event) {
    let index = this.$tabs.indexOf(event.target);

    if (index > -1) {
      event.preventDefault();
      this.activate(index)
    }
  }

  handleKeyDown(event) {
    let index = this.$tabs.indexOf(event.target);

    if (index > -1) {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        this.activate(index > 0 ? index - 1 : this.$tabs.length - 1, true);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        this.activate(index < this.$tabs.length - 1 ? index + 1 : 0, true);
      }
    }
  }

}
