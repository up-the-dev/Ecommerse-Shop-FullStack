const { default: mongoose } = require('mongoose');
const Product = require('../../models/product');

const shopController = {
  getProducts: async (req, res, next) => {
    try {
      const products = await Product.find()
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    } catch (err) {
      return next(err)
    }
  },
  getIndex: async (req, res, next) => {
    try {
      const products = await Product.find()
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    } catch (err) {
      return next(err)
    }
  },
  getCart: (req, res, next) => {
    try {
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart'
      });
    } catch (err) {
      return next(err)
    }
  },
  postCart: async (req, res, next) => {
    try {
      const productId = req.body.productId
      const result = await CartProduct.updateOne({},
        { $push: { products: [productId] } })
      console.log(result)
      const cartproduct = await CartProduct.find({})
      cartproduct.forEach(productid => {
        console.log("HII")
      })
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'cart',
        cartProducts

      })


    } catch (err) {
      return next(err)
    }
  },
  getOrders: (req, res, next) => {
    try {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders'
      });
    } catch (err) {
      return next(err)
    }
  },
  getCheckout: (req, res, next) => {
    try {
      res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
      });
    } catch (err) {
      return next(err)
    }

  },
  getProductDetails: async (req, res, next) => {
    try {
      const product = await Product.findOne({ _id: req.params.productId })
      res.render('shop/product-detail', {
        path: '/product-detail',
        pageTitle: 'product-details',
        product
      })
    } catch (err) {
      console.log(err)
      return err
    }
  },
  
}

module.exports = shopController