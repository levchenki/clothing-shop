require('dotenv').config()
const {Client, Pool} = require('pg')

const client = new Client({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

module.exports = client