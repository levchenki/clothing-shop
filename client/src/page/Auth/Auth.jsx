import React, {useContext, useState} from 'react';
import style from './Auth.module.scss'
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from '../../utils/consts';
import {NavLink, useLocation} from 'react-router-dom';
import {login, registration} from '../../http/userAPI';
import {observer} from 'mobx-react-lite';
import {Context} from '../../index';
import {useNavigate} from 'react-router';

const Auth = observer(() => {
  const {user} = useContext(Context);
  const location = useLocation()
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [patronymic, setPatronymic] = useState('');
  const [phone, setPhone] = useState('');


  const signIn = async () => {
    try{
      let data
      data = await registration(name, lastname, patronymic, email, password, phone)
      user.setUser(data);
      user.setIsAuth(true);
      return navigate(SHOP_ROUTE);
    } catch (e) {
      alert(e.response.data.message)
    }
  }

  const logIn = async () => {
    try {
      let data
      data = await login(email, password);
      user.setIsAuth(true);
      console.log(data)
      // return navigate(SHOP_ROUTE);
    } catch (e) {
      console.log(e)
      alert(e.response.data.message)
    }
  }

  return (
      <div className={style.auth}>
        <h2>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
        {
            isLogin && <form>
              <input type='email' placeholder={'Email'} value={email} onChange={event => setEmail(event.target.value)}/>
              <input type='password' placeholder={'Пароль'} value={password}
                     onChange={event => setPassword(event.target.value)}/>
              <button onClick={logIn}>Войти</button>
              <div>
                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрироваться</NavLink>
              </div>
            </form>
        }
        {
            !isLogin && <form>
              <input type='text' value={name} onChange={event => setName(event.target.value)} placeholder={'Имя'}/>

              <input type='text' value={lastname} onChange={event => setLastname(event.target.value)}
                     placeholder={'Фамилия'}/>

              <input type='text' value={patronymic} onChange={event => setPatronymic(event.target.value)}
                     placeholder={'Отчество'}/>

              <input type='email' value={email} onChange={event => setEmail(event.target.value)} placeholder={'Email'}/>

              <input type='password' value={password} onChange={event => setPassword(event.target.value)}
                     placeholder={'Пароль'}/>

              <input type='text' value={phone} onChange={event => setPhone(event.target.value)} placeholder={'Телефон'}/>

              <button onClick={signIn}>Подтвердить</button>
              <div>
                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войти</NavLink>
              </div>
            </form>
        }

      </div>
  );
});

export default Auth;