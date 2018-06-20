import { $$, closest } from './utils';

export default function init() {
  let findTargetTab = () => {
    let id = location.hash.substr(1);
    let $target = document.getElementById(id);
    let $panel = closest($target, '.tabbed-layout-panel');
    let $layout = closest($panel, '.tabbed-layout');

    if ($target && $panel && $layout) {
      let index = $$('.tabbed-layout-panel', $layout).indexOf($panel);
      $layout.setAttribute('data-active-tab', index);
      $target.scrollIntoView();
    }
  };

  if (location.hash) findTargetTab();
  window.addEventListener('hashchange', findTargetTab);

  $$('.tabbed-layout').forEach(($layout) => {
    if (!$layout.hasAttribute('data-active-tab')) {
      $layout.setAttribute('data-active-tab', 0);
    }

    $$('nav a', $layout).forEach(($tab, i) => {
      $tab.addEventListener('click', (e) => {
        $layout.setAttribute('data-active-tab', i);
        e.preventDefault();
      });
    });
  });
}
