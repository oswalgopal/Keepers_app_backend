const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.forgot_password_controller = (req, res) => {
    bcrypt.hash(req.body.new_password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                status: 500, 
                message: 'Error while hashing password',
                response: err
            });
        } else {
            User.findOneAndUpdate({email: req.body.email}, {password: hash}).exec().then(response => {
                res.status(200).json({
                    status: 200,
                    message: 'Password Updated Successfully',
                    response: response
                });
            }).catch(error => {
                res.status(500).json({
                    status: 500,
                    message: 'Cannot Update Password',
                    response: error
                });
            })
       }
    })
}