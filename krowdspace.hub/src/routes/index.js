import Loadable from 'react-loadable';
import Loading from '../components/common/Loading';

export const LandingWrapper = Loadable({
  loader: () => import('./../components/hub/HubWrapper'),
  loading: Loading,
  delay: 200
});
