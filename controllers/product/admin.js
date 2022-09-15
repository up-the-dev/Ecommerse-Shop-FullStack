const Product = require('../../models/product');
const { productSchema } = require('../../validators/productValidator');
const productController = {
  getAddProduct: (req, res, next) => {
    try {
      res.render('admin/add-product', {
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
        return next(error)
      }
      const { title, imageUrl, price, description } = req.body
      const product = new Product({
        title, imageUrl, description, price
      });
      await product.save();
      res.redirect('/');
    } catch (err) {
      return next(err)
    }

  },
  getProducts: async (req, res, next) => {
    try {
      const products = await Product.find()
      res.render('admin/products', {
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
      res.render('admin/edit-product', {
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
      const { error } = await productSchema.validate(req.body)
      if (error) {
        return next(error)
      }
      const productId = req.params.productId
      const { title, imageUrl,
        price,
        description } = req.body
      const result = await Product.updateOne({ _id: productId }, {
        title, imageUrl, price, description
      })
      res.redirect('/admin/products')
    } catch (error) {
      return next(err)
    }
  },
  deleteProduct: async (req, res, next) => {
    try {
      const productId = req.params.productId
      const result = await Product.findOneAndRemove({ _id: productId })
      console.log(result)
      res.redirect('/admin/products')
    } catch (error) {
      return next(error)
    }
  }
}
module.exports = productController




