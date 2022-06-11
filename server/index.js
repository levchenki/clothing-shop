const client = require('./connection.js');
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const path = require('path');


const PORT = process.env.PORT;


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}))
app.use('/api', router);
// Обработка ошибок, последним всегда идёт Middleware
app.use(errorHandler);

//
// app.get('/', (req, res) => {
//   res.status(200).json({message: 'It\'s finally working!  :)'})
// })

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Sever is now listening at port ${PORT}`);
    })
    client.connect();
  } catch (e) {
    throw e;
  }
}

start();


// app.get('/users', (req, res) => {
//   client.query(`Select *
//                 from users`, (err, result) => {
//     try {
//       res.send(result.rows);
//     } catch (e) {
//       console.log(e)
//     }
//   });
// })
