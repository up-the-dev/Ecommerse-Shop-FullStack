const path = require('path');
const express = require('express');
const router = express.Router();
const { admincontroller } = require('../controllers');

router.get('/add-product', admincontroller.getAddProduct);
router.get('/products', admincontroller.getProducts);
router.post('/add-product', admincontroller.postAddProduct);

module.exports = router;
