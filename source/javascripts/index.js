import initSidebar from './sidebar';
import initTabbedLayout from './tabbed-layout';

const { hljs } = window;

hljs.initHighlighting();
initSidebar();
initTabbedLayout();
