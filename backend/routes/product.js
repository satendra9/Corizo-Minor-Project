const express = require('express')
const router = express.Router()

const { isAuthenticatedUser, authorizeRole } = require('../middlewares/auth')

const { getProducts, newProducts, getSingleProduct, updateProduct, deleteProduct } = require('../controllers/productController')

router.route('/products').get(getProducts)

router.route('/products/new').post(newProducts)

router.route('/products/:id').get(getSingleProduct)

router.route('/admin/products/:id').put(isAuthenticatedUser, updateProduct)

router.route('/admin/products/:id').delete(isAuthenticatedUser, deleteProduct)

module.exports = router