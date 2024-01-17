const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateUser,authorizeUser,authorizeAdmin}=require('../middlewares/authMiddleware')
// User registration route
router.post('/register', authController.registerUser);

// User login route
router.post('/login', authController.loginUser);

router.get('/userdashboard',authenticateUser,authorizeUser,authController.dashboardcontent);

router.get('/admindashboard',authenticateUser,authorizeAdmin,authController.dashboardcontent);

module.exports = router;