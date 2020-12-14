var express = require('express');
var router = express.Router();
const Blog = require('./../models/blogs');
router.post
/**New blog api */
router.post('/newBlog', (req, res) => {
    const {name, user_id, description, comments} = req.body;
    const blog = new Blog({
        name: name,
        user_id: user_id,
        description: description,
        comments: []
    })
    blog.save((err, data) => {
        if (err) {
            res.status(404).send({'message': 'Please try again'})
        } else {
            console.log('new blog data', data);
            res.status(200).send({'message': 'Sucessfully inserted'});
        }
    });
});
/**Get all blogs */
router.get('/allBlogs', (req, res) => {
    Blog.find().then((blogs) => {
        res.json(blogs);
    }).catch(err => res.status(400).res.json(`Error:${err}`))
});
module.exports = router