const path = require('path');
const express = require('express');
const router = express.Router();
const auth=require('../middlewares/auth')
const { registrationcontroller, shopcontroller,refreshController,logincontroller } = require('../controllers');

router.post('/registration', registrationcontroller.registration)
router.post('/login',logincontroller.login)
router.post('/refresh',refreshController.refresh)
router.get('/', shopcontroller.getIndex);
router.get('/products', shopcontroller.getProducts);
router.get('/products/:productId', shopcontroller.getProductDetails)
router.get('/cart',auth, shopcontroller.getCart);
router.post('/cart',auth, shopcontroller.postCart)
router.get('/orders', auth,shopcontroller.getOrders);
router.get('/checkout',auth, shopcontroller.getCheckout);

module.exports = router;