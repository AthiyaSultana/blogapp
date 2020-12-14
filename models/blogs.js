const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const blogSchema = new Schema({
    name: {type: String, required: true},
    user_id: {type: String, required: true},
    description: {type: String, required: true},
    comments: [{type: Schema.Types.ObjectId, ref: 'Comments'}]
});
const Blog = mongoose.model('Blogs', blogSchema);
module.exports = Blog;