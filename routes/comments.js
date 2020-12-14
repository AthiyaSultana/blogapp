var express = require('express');
var router = express.Router();
const Comments = require('./../models/comments');
const Blog = require('./../models/blogs');
router.post
/**New comment api */
router.post('/addCommentToBlog', (req, res) => {
    const {comment, user_id, blog_id} = req.body;
    const newcomment = new Comments({
        comment: comment,
        user_id: user_id,
        blog_id: blog_id,
        replies: []
    })
    newcomment.save(async (err, data) => {
        if (err) {
            res.status(404).send({'message': 'Please try again'})
        } else {
            console.log('data', data);
            //update the blog with commentid 
            await Blog.updateOne(
                {_id: blog_id},
                {$push: {comments: data._id}}
            );
            res.status(200).send({'message': 'Sucessfully inserted'});
        }
    });
});
module.exports = router