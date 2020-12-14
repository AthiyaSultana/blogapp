const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const commentSchema = new Schema({
    comment: {type: String, required: true},
    user_id: {type: String, required: true},
    blog_id: {type: String, required: true},
    replies: [{type: Schema.Types.ObjectId, ref: 'Replies'}]

});
const Comment = mongoose.model('Comments', commentSchema);
module.exports = Comment;