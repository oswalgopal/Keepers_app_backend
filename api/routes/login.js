const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const login_controller = require('../controllers/login_controller');
const register_controller = require('../controllers/register_controller');

router.post('/login', login_controller.login_controller);

router.post('/Register', register_controller.register_controller);

router.get('/user', checkAuth,  (req, res, next) => {
    res.status(200).json({
        message: 'success'
    });
});

module.exports = router;