const path = require('path');
const express = require('express');
const router = express.Router();
const auth=require('../middlewares/auth')
const { registrationcontroller, logOutController,shopcontroller,refreshController,logincontroller,profileController } = require('../controllers');

router.post('/auth/registration', registrationcontroller.registration)
router.post('/auth/login',logincontroller.login)
//router.post('/auth/logOut',auth,logOutController.logOut)
router.get('/auth/login',logincontroller.getLogin)
router.get('/profile',auth,profileController.getProfile)
router.get('/edit-profile',auth,profileController.geteditProfile)
router.post('/edit-profile',auth,profileController.editProfile)
router.post('/auth/refresh',refreshController.refresh)
router.get('/', shopcontroller.getIndex);
router.get('/products', shopcontroller.getProducts);
router.get('/products/:productId', shopcontroller.getProductDetails)
router.get('/cart',auth, shopcontroller.getCart);
router.post('/cart',auth, shopcontroller.postCart)
router.post('/delete-cart-product/:productId',auth,shopcontroller.deleteCart)
router.get('/orders', auth,shopcontroller.getOrders);
router.get('/checkout',auth, shopcontroller.getCheckout);

module.exports = router;