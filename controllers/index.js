module.exports = {
    admincontroller: require('./product/admin'),
    shopcontroller: require('./product/shop'),
    registrationcontroller: require('./auth/register'),
    refreshController: require('../controllers/auth/refresh'),
    logincontroller:require('../controllers/auth/login'),
    profileController:require('../controllers/profile'),
    logOutController:require('./auth/logout')
}