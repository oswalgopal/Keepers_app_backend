const express = require('express');
const router = express.Router();
const login_controller = require('../../controllers/login_controller');
const register_controller = require('../../controllers/register_controller');
const forgot_password_controller = require('../../controllers/forgot_password_controller');

router.post('/login', login_controller.login_controller);

router.post('/Register', register_controller.register_controller);

router.post('/forgot_password', forgot_password_controller.forgot_password_controller);

module.exports = router;