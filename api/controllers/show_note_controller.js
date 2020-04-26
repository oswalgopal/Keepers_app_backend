const mongoose = require('mongoose');
const Note_Model = require('../models/note');


exports.get_note_controller = (req, res, next) => {
    
    Note_Model.find({user_id: req.params.user_id}).exec().then(response => {
        if (response.length > 0) {
            res.status(200).json({
                status: 200,
                message: "Notes found success",
                response: response
            });
        } else {
            res.status(200).json({
                status: 200,
                message: "No Notes found",
                response: []
            });
        }
    }).catch(error => {
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            response: error
        });
    })
}