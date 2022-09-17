const { default: mongoose } = require('mongoose');
const Product = require('../../models/product');
const User = require('../../models/user');
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../../config')
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
  getCart: async (req, res, next) => {
    try {
      let user = await User.findOne({ _id: req.user._id }).populate('cartItems._id')
      if (!user) {
        return next(CustomErrorHandler.unauthorized())
      }
      const cartProducts = user.cartItems
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Cart',
        cartProducts
      });
    } catch (err) {
      return next(err)
    }
  },
  postCart: async (req, res, next) => {
    try {
      const productId = req.body.productId
      //checking if product already in cart
      const userId = req.user._id
      const exist = await User.findOne({
        _id: userId,
        cartItems: {
          _id: productId
        }
      })
      console.log(exist)
      if (exist) {
        return next(CustomErrorHandler.alreadyExist('Product already in cart!'))
      }

      //add productId to cart
      const added = await User.updateOne({ _id: req.user._id }, { $push: { cartItems: { _id: productId } } })

      if (!added) {
        return next(CustomErrorHandler.unauthorized())
      }
      //redirect to cart page
      res.redirect('/cart')
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
      return next(err)
    }
  },
}

module.exports = shopController