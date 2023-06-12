const express = require('express')
const router = express.Router()
const { isAuthenticatedUser, authorizeRole } = require('../middlewares/auth')

const { registerUser, loginUser, logoutUser, getUserProfile, updatePassword, updateProfile, allUsers, getUserDetails, deleteUser } = require('../controllers/authController')

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)
router.route('/me').get(isAuthenticatedUser, getUserProfile)
router.route('/password/update').put(isAuthenticatedUser, updatePassword)
router.route('/me/update').put(isAuthenticatedUser, updateProfile)
router.route('/admin/users').get(isAuthenticatedUser, authorizeRole('admin'), allUsers)
router.route('/admin/user/:id').get(isAuthenticatedUser, authorizeRole('admin'), getUserDetails)
                                .delete(isAuthenticatedUser, authorizeRole('admin'), deleteUser)

module.exports = router