import AdminPanel from './page/Admin/AdminPanel';
import {ADMIN_ROUTE, BASKET_ROUTE, PRODUCT_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from './utils/consts';
import Basket from './page/Basket';
import Shop from './page/Shop/Shop';
import Auth from './page/Auth/Auth';
import ProductPage from './page/ProductPage/ProductPage';

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: <AdminPanel/>
  },
  {
    path: BASKET_ROUTE,
    Component: <Basket/>
  },
]

export const publicRoutes = [
  {
    path: SHOP_ROUTE,
    Component: <Shop/>
  },
  {
    path: LOGIN_ROUTE,
    Component: <Auth/>
  },
  {
    path: REGISTRATION_ROUTE,
    Component: <Auth/>
  },
  {
    path: PRODUCT_ROUTE + '/:id',
    Component: <ProductPage/>
  },
]