import React, {useState} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {adminRoutes, authRoutes, publicRoutes, SHOP_ROUTE} from '../routes/routes';
import Layout from '../layout/Layout';

const AppRouter: React.FC = () => {

  // TODO: Сделать авторизацию через хранилище
  const [isLogin, setIsLogin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={SHOP_ROUTE} element={<Layout/>}>
          {
            isAdmin && adminRoutes.map(({path, component}) =>
              <Route element={component} key={path} path={path}/>)
          }
          {
            isLogin && authRoutes.map(({path, component}) =>
              <Route element={component} key={path} path={path}/>)
          }
          {
            publicRoutes.map(({path, component}) =>
              <Route element={component} key={path} path={path}/>)
          }
          <Route path={'*'} element={<Navigate to={SHOP_ROUTE}/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;