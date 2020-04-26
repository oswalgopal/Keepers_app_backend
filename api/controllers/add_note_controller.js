const mongoose  = require('mongoose');
const Note_Model = require('../models/note');
const User_Model = require('../models/user');

exports.add_note_controller = (req, res, next) => {
    User_Model.find({_id: req.body.user_id}).exec().then(response => {
        if(response.length > 0) {
            const note = new Note_Model({
                _id: new mongoose.Types.ObjectId(),
                user_id: req.body.user_id,
                title: req.body.title,
                body: req.body.body
            });
            note.save().then(response_1 => {
                res.status(200).json({
                    status: 200,
                    message: 'Note Added SuccessFully',
                    response: response_1,
                })
            }).catch(error => {
                res.status(500).json({
                    status: 500,
                    message: 'Internal Server Error!',
                    response: error,
                });
            });
        } else {
            res.status(404).json({
                status: 404,
                message: 'User_Id Doesnot Exist',
                response: response,
            });    
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            status: 500,
            message: 'Internal Server Error!!',
            response: err,
        })
    })
}