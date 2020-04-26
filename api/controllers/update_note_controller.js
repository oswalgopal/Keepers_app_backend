const mongoose = require('mongoose');
const Note_Model = require('../models/note');


exports.update_note_controller = (req, res, next) => {
    Note_Model.find({_id: req.body.note_id}).exec().then(resp => {
        if (resp.length > 0) {
            Note_Model.update({_id: req.body.note_id},{ $set: {
                title: req.body.title,
                body: req.body.body
            }}).exec().then(Response => {
                res.status(200).json({
                    status: 200,
                    message: 'Note Updated Successfully',
                    response: Response
                });
            }).catch(error => {
                res.status(500).json({
                    status: 500,
                    message: 'Internal Server Error',
                    response: error
                });
            })
        } else {
            res.status(404).json({
                status: 404,
                message: 'No note found',
                response: null
            });
        }
    }).catch(err => {
        res.status(500).json({
            status: 500,
            message: 'Internal Server Error',
            response: err
        });
    });
}