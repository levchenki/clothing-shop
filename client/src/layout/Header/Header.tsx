import React, {useState} from 'react';
import style from './Header.module.scss'
import {NavLink} from 'react-router-dom';
import {ADMIN_ROUTE, CART_ROUTE, SHOP_ROUTE} from '../../routes/routes';

const Header: React.FC = () => {

  // TODO: Сделать авторизацию через хранилище
  const [isLogin, setIsLogin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true);

  return (
    <header className={style.header}>
      <div className='container'>
        <NavLink to={SHOP_ROUTE}>Flopper Shopper</NavLink>
        {
          isLogin
            ?
            <ul>
              {
                isAdmin && <NavLink to={ADMIN_ROUTE}>Панель администратора</NavLink>
              }
              <NavLink to={CART_ROUTE}>Корзина</NavLink>
              <NavLink to={SHOP_ROUTE}>Выйти</NavLink>
            </ul>
            :
            <ul>
              <NavLink to={SHOP_ROUTE}>Войти</NavLink>
            </ul>
        }
      </div>
    </header>
  );
};

export default Header;