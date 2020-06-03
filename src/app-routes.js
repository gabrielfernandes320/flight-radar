import { RadarPage } from './pages';
import { withNavigationWatcher } from './contexts/navigation';

const routes = [
{
    path: '/radar',
    component: RadarPage
  }];

export default routes.map(route => {
  return {
    ...route,
    component: withNavigationWatcher(route.component)
  };
});
