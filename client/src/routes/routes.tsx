import React from 'react';
import ShopPage from '../pages/ShopPage/ShopPage';
import ProductPage from '../pages/ProductPage/ProductPage';
import CartPage from '../pages/CartPage/CartPage';
import AdminPanelPage from '../pages/AdminPanelPage/AdminPanelPage';

export const SHOP_ROUTE = '/'
export const CART_ROUTE = '/cart'
export const PRODUCT_ROUTE = '/product'
export const ADMIN_ROUTE = '/admin'

type TRoutes = {
  path: string,
  component: JSX.Element
}

export const publicRoutes: readonly TRoutes[] = [
  {
    path: SHOP_ROUTE,
    component: <ShopPage/>
  },
  {
    path: `${PRODUCT_ROUTE}/:id`,
    component: <ProductPage/>
  }
] as const

export const authRoutes: readonly TRoutes[] = [
  {
    path: CART_ROUTE,
    component: <CartPage/>
  },
] as const

export const adminRoutes: readonly TRoutes[] = [
  {
    path: ADMIN_ROUTE,
    component: <AdminPanelPage/>
  },
]