const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const replySchema = new Schema({
    comment_id: {type: String, required: true},
    user_id: {type: String, required: true},
    reply: {type: String, required: true},

});
const Replies = mongoose.model('Replies', replySchema);
module.exports = Replies;