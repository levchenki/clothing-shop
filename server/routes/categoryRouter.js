const Router = require('express');
const router = new Router();
const categoryController = require('../controllers/categoryController')

router.post('/', categoryController.create);
router.get('/', categoryController.getAll);
router.get('/:id', categoryController.getOne);
router.delete('/', categoryController.delete);
router.put('/', categoryController.update);

module.exports = router;