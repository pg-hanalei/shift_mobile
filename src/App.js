import { BrowserRouter } from 'react-router-dom';
import { Router } from './route/Router';

import 'bootstrap/dist/css/bootstrap.min.css';


export const App = () => {
  return(
    <>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  );
}