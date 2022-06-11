import React, {useContext} from 'react';
import {Navigate, Route, Routes} from 'react-router';
import {authRoutes, publicRoutes} from '../routes';
import Auth from '../page/Auth/Auth';
import {LOGIN_ROUTE, SHOP_ROUTE} from '../utils/consts';
import {BrowserRouter} from 'react-router-dom';
import NotFoundPage from '../page/NotFoundPage';
import {Context} from '../index';
import Layout from './layout/Layout';

const AppRouter = () => {
  const {user} = useContext(Context)
  console.log(user)

  return (
        <Routes>
          <Route path={SHOP_ROUTE} element={<Layout/>}>
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route element={Component} key={path} path={path} exact/>)}

            {publicRoutes.map(({path, Component}) =>
                <Route element={Component} key={path} path={path} exact/>)}
            <Route path={'*'} element={<Navigate to={SHOP_ROUTE}/>}/>
          </Route>
        </Routes>
  );
};

export default AppRouter;