const express = require('express');
const router = express.Router();
const { registrationcontroller, logincontroller, shopcontroller } = require('../controllers');


router.post('/auth/registration', registrationcontroller.registration)
router.post('/auth/login', logincontroller.login)
router.get('/auth/login', logincontroller.getLogin)
router.get('/', shopcontroller.getIndex);
router.get('/products', shopcontroller.getProducts);
router.get('/products/:productId', shopcontroller.getProductDetails)

module.exports = router;