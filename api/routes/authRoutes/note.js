const express = require('express');
const router = express.Router();
const checkAuth = require('../../middleware/check-auth');
const get_note_controller  = require('../../controllers/show_note_controller');
const add_note_controller  = require('../../controllers/add_note_controller');
const delete_note_controller = require('../../controllers/delete_note_controller');

router.get('/show_note/user_id=:user_id', checkAuth,  get_note_controller.get_note_controller);

router.post('/add_note', checkAuth, add_note_controller.add_note_controller);

// router.delete('/delete_note', checkAuth, delete_note_controller);

module.exports = router;