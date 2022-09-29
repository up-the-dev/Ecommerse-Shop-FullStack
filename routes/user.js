const express = require('express');
const router = express.Router();
const { logOutController, registrationcontroller, logincontroller, shopcontroller, refreshController, profileController } = require('../controllers');
const auth = require('../middlewares/auth');


router.get('/home', auth, shopcontroller.getIndex);
router.get('/products', auth, shopcontroller.getProducts);
router.get('/product/:productId', auth, shopcontroller.getProductDetails)

router.post('/auth/logOut', auth, logOutController.logout)
router.get('/profile', auth, profileController.getProfile)
router.get('/edit-profile', auth, profileController.geteditProfile)
router.post('/edit-profile', auth, profileController.editProfile)
router.post('/auth/refresh', auth, refreshController.refresh)
router.get('/cart', auth, shopcontroller.getCart);
router.post('/cart', auth, shopcontroller.postCart)
router.post('/delete-cart-product/:productId', auth, shopcontroller.deleteCart)
router.get('/orders', auth, shopcontroller.getOrders);
router.get('/checkout', auth, shopcontroller.getCheckout);

module.exports = router;