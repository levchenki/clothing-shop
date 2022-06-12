const Router = require('express');
const router = new Router();

const brandRouter = require('./brandRouter')
const categoryRouter = require('./categoryRouter')
const productRouter = require('./productRouter')
const userRouter = require('./userRouter')
const employeeRouter = require('./employeeRouter')

router.use('/user', userRouter);
router.use('/product', productRouter);
router.use('/brand', brandRouter);
router.use('/category', categoryRouter);
router.use('/employee', employeeRouter)

module.exports = router;