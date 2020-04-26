const express = require('express');
const router = express.Router();
const login_controller = require('../../controllers/login_controller');
const register_controller = require('../../controllers/register_controller');

router.post('/login', login_controller.login_controller);

router.post('/Register', register_controller.register_controller);

module.exports = router;