const mongoose = require('mongoose');
/**
 * created the schema for user
 */
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_id: { type: String,
                require:true, ref: 'User'},
    title: {
        type:String,
        require:true},
    body: {
        type:String, 
        require:true
    },
});

module.exports = mongoose.model('Note', userSchema);