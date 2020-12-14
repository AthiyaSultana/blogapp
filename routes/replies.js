var express = require('express');
var router = express.Router();
const Comments = require('./../models/comments');
const Reply = require('./../models/replies');
router.post
/**New comment api */
router.post('/addReplyToComment', (req, res) => {
    const {comment_id, user_id, reply} = req.body;
    const newreply = new Reply({
        comment_id: comment_id,
        user_id: user_id,
        reply: reply
    })
    newreply.save(async (err, data) => {
        if (err) {
            res.status(404).send({'message': 'Please try again'})
        } else {
            console.log('data', data);
            //update the blog with commentid 
            await Comments.updateOne(
                {_id: comment_id},
                {$push: {replies: data._id}}
            );
            res.status(200).send({'message': 'Sucessfully inserted'});
        }
    });
});
module.exports = router