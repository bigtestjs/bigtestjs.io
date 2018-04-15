import { $$, isVisible } from './utils';

export default function init() {
  // collect collapsable nav pieces
  let collapsableNavs = $$('.sidebar [data-collapsable]').map(($nav) => {
    let $toggle = $nav.querySelector('.sidebar-toggle');
    let $list = $nav.querySelector('.sidebar-list');
    let active = $nav.classList.contains('is-active');
    let visible = isVisible($toggle);

    return { $nav, $toggle, $list, active, visible };
  });

  // add listeners to toggle collapsing the list
  collapsableNavs.forEach(({ $nav, $toggle, $list, active, visible }) => {
    let collapseList = () => {
      $nav.classList.add('is-collapsed');
      $list.style.maxHeight = '0px';
    };

    // after the list is expanded the max height is removed to allow any
    // layout changes that may happen due to media queries
    $list.addEventListener('transitionend', () => {
      if (!$nav.classList.contains('is-collapsed')) {
        $list.style.maxHeight = 'none';
      }
    });

    // clicking the toggle expands or collapses the list
    $toggle.addEventListener('click', (e) => {
      e.preventDefault();

      // when collapsed, this animates the list open;
      // when expanded, sets an explicit height for animating later
      $list.style.maxHeight = `${$list.scrollHeight}px`;

      if ($nav.classList.contains('is-collapsed')) {
        $nav.classList.remove('is-collapsed');
      } else {
        // when collapsing, this allows the max-height to take affect;
        // without this it animates from 'none', which won't work
        window.setTimeout(collapseList, 1);
      }
    });

    // if the toggle is visible and not active, collapse by default
    if (visible && !active) {
      collapseList();
    }
  });

  // on window resize, toggles may become disabled or enabled and
  // their lists must be expanded or collapsed
  window.addEventListener('resize', () => {
    collapsableNavs.forEach(({ $nav, $toggle, $list, visible }, i) => {
      let nowVisible = isVisible($toggle);
      let isCollapsed = $nav.classList.contains('is-collapsed');

      if (!nowVisible && visible && isCollapsed) {
        $nav.classList.remove('is-collapsed');
        $list.style.maxHeight = 'none';
      } else if (nowVisible && !visible && !isCollapsed) {
        $nav.classList.add('is-collapsed');
        $list.style.maxHeight = '0px';
      }

      collapsableNavs[i].visible = nowVisible;
    });
  });
}
