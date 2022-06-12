const ApiError = require('../error/ApiError')
const client = require('../connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {log} = require('async');

const generateJwt = (id, email) => {
  return jwt.sign({id: id, email},
      process.env.SECRET_KEY,
      {expiresIn: '24h'});
}

class UserController {
  async registration(req, res, next) {
    const {name, lastname, patronymic, email, password, phone} = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest('Некорректный email или пароль'))
    }

    const getUserQuery = `select *
                          from users
                          where email = $1;`;
    const emailValues = [email]
    console.log(email)
    try {
      const checkUsersEmail = (await client.query(getUserQuery, emailValues)).rows[0];
      console.log(checkUsersEmail)
      console.log(checkUsersEmail);
      // Если email уже зарегистрирован, то возвращаем ошибку
      if (checkUsersEmail) {
        console.log('find')
        return next(ApiError.badRequest('Пользователь уже существует'));
      }
      console.log('Пользователя ещё нет в базе данных')
      // Добавляем пользователя, если email свободен
      const hashPassword = await bcrypt.hash(password, 5);
      const insertUser = `insert into users (name, lastname, patronymic, email, password, phone_number)
                          values ($1, $2, $3, $4, $5, $6);`;
      const values = [name, lastname, patronymic, email, hashPassword, phone]
      await client.query(insertUser, values);
      console.log('user was inserted');

      // Получаем jst токен пользователя;
      const user = (await client.query(getUserQuery, emailValues)).rows[0];
      console.log(user);
      const token = generateJwt(user.id_user, email);

      return res.json({token});
    } catch (err) {
      console.log(err.message);
    }
  }

  async login(req, res, next) {
    const {email, password} = req.body;
    const values = [email]
    const getUserQuery = `select *
                          from users
                          where email = $1;`;
    const user = (await client.query(getUserQuery, values)).rows[0];
    if (!user) {
      return next(ApiError.internal('Пользователь с таким именем не найден'));
    }
    console.log(user)

    const comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal('Указан неверный пароль'));
    }
    const token = generateJwt(user.id_user, user.email);
    return res.json({token});
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email);
    return res.json({token});
  }
}

module.exports = new UserController()