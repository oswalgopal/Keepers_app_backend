const mongoose = require('mongoose');
/**
 * created the schema for user
 */
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
    password: String,
    mobile: String,
});

module.exports = mongoose.model('User', userSchema);