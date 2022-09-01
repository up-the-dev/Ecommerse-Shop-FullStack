const path = require('path');
const express = require('express');
const router = express.Router();
const { registrationcontroller, shopcontroller,refreshController } = require('../controllers');

router.post('/registration', registrationcontroller.registration)
router.post('/refresh',refreshController.refresh)
router.get('/', shopcontroller.getIndex);
router.get('/products', shopcontroller.getProducts);
router.get('/products/:productId', shopcontroller.getProductDetails)
router.get('/cart', shopcontroller.getCart);
router.post('/cart', shopcontroller.postCart)
router.get('/orders', shopcontroller.getOrders);
router.get('/checkout', shopcontroller.getCheckout);

module.exports = router;