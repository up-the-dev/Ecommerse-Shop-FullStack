const path = require('path');
const express = require('express');
const router = express.Router();
const auth= require('../middlewares/auth')
const admin=require('../middlewares/admin')
const { admincontroller } = require('../controllers');

router.get('/products', admincontroller.getProducts);
router.get('/add-product',admincontroller.getAddProduct);
router.post('/add-product', admincontroller.postAddProduct);
router.get('/edit-product/:productId', admincontroller.getEditProduct);
router.post('/edit-product/:productId', admincontroller.updateProduct);
router.post('/delete-product/:productId',admincontroller.deleteProduct)

module.exports = router;
