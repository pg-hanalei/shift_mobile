import { HashRouter } from 'react-router-dom';
import { Router } from './route/Router';

export const App = () => {
  return(
    <>
      <HashRouter basename='/shift_mobile/'>
        <Router />
      </HashRouter>
    </>
  );
}