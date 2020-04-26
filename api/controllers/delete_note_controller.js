const Note_Model = require('../models/note');

exports.delete_note_controller = (req, res, next) => {
    Note_Model.deleteOne({_id: req.params.note_id}).exec().then(response => {
        res.status(200).json({
            status: 200,
            message: 'Note Deleted Successfully',
            response: response
        });
    }).catch(error => {
        res.status(500).json({
            status: 500,
            message: 'Internal Server Error',
            response: error
        });
    });
}