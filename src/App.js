import { BrowserRouter } from 'react-router-dom';
import { Router } from './route/Router';

export const App = () => {
  return(
    <>
      <BrowserRouter basename='/shift_mobile/'>
        <Router />
      </BrowserRouter>
    </>
  );
}