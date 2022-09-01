module.exports = {
    admincontroller: require('./product/admin'),
    shopcontroller: require('./product/shop'),
    registrationcontroller: require('./auth/register'),
    refreshController: require('../controllers/auth/refresh')
}