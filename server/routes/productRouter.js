const Router = require('express');
const router = new Router();
const productController = require('../controllers/productController')

router.post('/',productController.create);
router.get('/',productController.getAll);
router.get('/:id',productController.getOne);
router.delete('/:id',productController.delete);
router.put('/:id', productController.update)

module.exports = router;