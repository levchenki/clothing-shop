import React, {useContext} from 'react';
import {Context} from '../../../index';
import style from './Header.module.scss'
import {NavLink} from 'react-router-dom';
import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from '../../../utils/consts';
import {observer} from 'mobx-react-lite';

const Header = observer(() => {
  const {user} = useContext(Context);

  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false);
    localStorage.clear();
  }

  return (
      <header className={`${style.header}`}>
        <div className={'container'}>
          <NavLink to={SHOP_ROUTE}>Flopper Shopper</NavLink>
          {user.isAuth
              ?
              <ul>
                <NavLink to={ADMIN_ROUTE}>Панель администратора</NavLink>
                <NavLink to={LOGIN_ROUTE} onClick={()=>logOut()}>Выйти</NavLink>
              </ul>
              :
              <ul>
                <NavLink to={LOGIN_ROUTE}>Войти</NavLink>
              </ul>
          }
        </div>
      </header>
  );
});

export default Header;