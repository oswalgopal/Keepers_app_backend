const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');

router.post('/login', (req, res) => {
    User.find({ email: req.body.email}).select('_id name email mobile password').exec().then(response => {
        if (response.length > 0) {
            bcrypt.compare(req.body.password, response[0].password, (error, result) => {
                if (result) {
                    const token =  jwt.sign({
                        email: response[0].email,
                        user_id: response[0]._id
                    },'oswalgopal_JWT_25052000',{
                        expiresIn: '1h'
                     })

                    res.status(200).json({
                        status: 200,
                        message: 'user logged successfully',
                        response: {
                            id: response[0]._id,
                            name: response[0].name,
                            email: response[0].email,
                            mobile: response[0].mobile,
                            token: token
                        }
                    });
                } else {
                    res.status(404).json({
                        status: 404,
                        message: 'Invalid Id or Password',
                        response: null,
                    });        
                }
            })
        } else {
            res.status(404).json({
                status: 404,
                message: 'Invalid Id or Password',
                response: null,
            });
        }
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: 'Internal Server Error',
            response: error,
        });
    });     
});

router.post('/Register', (req, res) => {
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
});


router.get('/user', checkAuth,  (req, res, next) => {
    res.status(200).json({
        message: 'success'
    });
});

module.exports = router;