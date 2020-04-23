const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');

router.post('/login', (req, res) => {
    User.find({ email: req.body.email, password: req.body.password }).select('_id name email mobile').exec().then(response => {
        console.log(response);
        if (response.length > 0) {
            res.status(200).json({
                message: 'user logged successfully',
                response: response[0],
            });
        } else {
            res.status(404).json({
                message: 'Invalid Id or Password',
                response: null,
            });
        }
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            message: error
        });
    });
});

router.post('/Register', (req, res) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        mobile: req.body.mobile,
    });
    const temp = {
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
    };
    user.save().then(result => {
        console.log(result);
        res.status(201).json({
            response: temp,
            message: 'user added successfully'
        });
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            response: error,
            message: 'Something went wrong'
        });
    });

});

module.exports = router;