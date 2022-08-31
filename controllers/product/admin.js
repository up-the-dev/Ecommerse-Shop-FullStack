const Product = require('../../models/product');
const productController = {
  getAddProduct: (req, res, next) => {
    try{
    res.render('admin/add-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true
    });
  }catch(err){
    return next(err)
  }
  },
  postAddProduct:async (req, res, next) => {
    try{
      const { title, imageUrl, price, description } = req.body
    const product = new Product({
      title, imageUrl, description, price
    });
    await product.save();
    res.redirect('/');
    }catch(err){
      return next(err)
    }
   
  },
  getProducts: async (req, res, next) => {
    try{
      const products = await Product.find()
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      })
    }catch(err){
      return next(err)
    }
  
  }
}
module.exports = productController




