const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login_controller = (req, res) => {
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
};

