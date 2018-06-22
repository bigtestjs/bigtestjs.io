import SidebarComponent from './sidebar';
import TabbedLayoutComponent from './tabbed-layout';

const { hljs } = window;

hljs.initHighlighting();
SidebarComponent.init('.sidebar');
TabbedLayoutComponent.init('.tabbed-layout');
