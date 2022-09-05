const { default: mongoose } = require('mongoose');
const Product = require('../../models/product');
const User = require('../../models/user');
const CustomErrorHandler = require('../../services/CustomErrorHandler');

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
      const CartProducts=await
      
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'cart',
        cartProducts
      });
    } catch (err) {
      return next(err)
    }
  },
  postCart: async (req, res, next) => {
    try {
      const productId = req.body.productId
      console.log(productId)
      const added = await User.updateOne({ _id: req.user._id }, { $push: { cartItems: productId } })
      if (!added) {
        return next(CustomErrorHandler.unauthorized())
      }
      res.render('/cart')
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