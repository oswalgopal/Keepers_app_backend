const User = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

exports.register_controller = (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                status: 500, 
                message: 'Error while hashing password',
                response: err
            });
        } else {
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                email: req.body.email,
                password: hash,
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
                    status: 201,
                    response: temp,
                    message: 'user added successfully'
                });
            }).catch(error => {
                console.log(error);
                res.status(500).json({
                    status:500,
                    response: error,
                    message: 'Internal Server Error'
                });
            });
        }
    });
};