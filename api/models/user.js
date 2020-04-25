const mongoose = require('mongoose');
/**
 * created the schema for user
 */
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type:String, require:true},
    email: {type:String, require:true, unique: true},
    password: {type:String, require:true},
    mobile: {type: Number, require: true, unique: true},
});

module.exports = mongoose.model('User', userSchema);