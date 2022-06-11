import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import App from './App';
import UserStore from './store/UserStore';
import ProductStore from './store/ProductStore';
import {BrowserRouter} from 'react-router-dom';

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <Context.Provider value={{
        user: new UserStore(),
        product: new ProductStore(),
      }}>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </Context.Provider>
    </React.StrictMode>
);
