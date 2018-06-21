import initSidebar from './sidebar';
import TabbedLayoutComponent from './tabbed-layout';

const { hljs } = window;

hljs.initHighlighting();
initSidebar();
TabbedLayoutComponent.init('.tabbed-layout');
