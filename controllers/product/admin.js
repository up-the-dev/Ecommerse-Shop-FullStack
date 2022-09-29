const Product = require('../../models/product');
const User = require('../../models/user');
const { productSchema } = require('../../validators');
const productController = {
  getAddProduct: (req, res, next) => {
    try {
      return res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
      });
    } catch (err) {
      return next(err)
    }
  },
  postAddProduct: async (req, res, next) => {
    try {
      const { error } = await productSchema.validate(req.body)
      if (error) {

        req.flash('error', `${error.message}`)
        return res.redirect('add-product');

      }
      const { title, imageUrl, price, description } = req.body
      const product = new Product({
        title, imageUrl, description, price,
        admin: req.user._id
      });
      await product.save();
      return res.redirect('/admin/products');
    } catch (err) {
      return next(err)
    }

  },
  getProducts: async (req, res, next) => {
    try {
      const products = await Product.find({ admin: req.user._id })
      return res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      })
    } catch (err) {
      return next(err)
    }
  },
  getEditProduct: async (req, res, next) => {
    try {
      const productId = req.params.productId
      const product = await Product.findOne({ _id: productId })
      return res.render('admin/edit-product', {
        path: '/admin/edit-product',
        pageTitle: 'Edit Products',
        product
      })
    } catch (err) {
      return next(err)
    }
  },
  updateProduct: async (req, res, next) => {
    try {
      //validation
      const productId = req.params.productId
      const { error } = await productSchema.validate(req.body)
      if (error) {
        req.flash('error', `${error.message}`)
        return res.redirect(`${productId}`);

      }

      const { title, imageUrl,
        price,
        description } = req.body
      const result = await Product.updateOne({ _id: productId, admin: req.user._id }, {
        title, imageUrl, price, description
      })
      return res.redirect('/admin/products')
    } catch (error) {
      return next(err)
    }
  },
  deleteProduct: async (req, res, next) => {
    try {
      const productId = req.params.productId

      await Product.findOneAndRemove({ _id: productId, admin: req.user._id })
      await User.updateMany({
        cartItems: {
          _id: productId
        }
      }, { $pull: { cartItems: { _id: productId } } })

      return res.redirect('/admin/products')
    } catch (error) {
      return next(error)
    }
  }
}
module.exports = productController




