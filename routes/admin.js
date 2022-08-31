const path = require('path');

const express = require('express');

const { admincontroller } = require('../controllers');

const router = express.Router();

router.get('/add-product', admincontroller.getAddProduct);

router.get('/products', admincontroller.getProducts);

router.post('/add-product', admincontroller.postAddProduct);

module.exports = router;
