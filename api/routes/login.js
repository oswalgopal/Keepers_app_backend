const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');

router.post('/login', (req, res) => {
    console.log(req);
    res.status(200).json({
        message: 'user logged successfully'
    })
})

router.post('/Register', (req, res) => {
    console.log(req);
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
        password: req.body.password,
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