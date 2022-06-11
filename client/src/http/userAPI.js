import {$authHost, $host} from './index';
import jwtDecode from 'jwt-decode';

export const registration = async (name, lastname, patronymic, email, password, phone) => {
  const {data} = await $host.post('api/user/registration', {
    name,
    lastname,
    patronymic,
    email,
    password,
    phone
  })
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
}

export const login = async (email, password) => {
  const {data} = await $host.post('api/user/login', {
    email,
    password
  })
  console.log(123)
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
}

// TODO: какая-то проблема....
export const check = async () => {
  const {data} = await $authHost.get('api/user/auth')
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
}
