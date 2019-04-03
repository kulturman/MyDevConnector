const router = require('express').Router();
const Post = require('../../models/post');
const authMiddleware = require('../../middlewares/auth');
const User = require('../../models/user');
const _ = require('lodash');
const newPostValidator = require('../../validation/post');
const { getApiErrorsFormat } = require('../../validation/util');
const { validationResult } = require('express-validator/check');

router.get('/' , async (req , res) => {
    const posts = await Post.find();
    return res.send(posts);
})

router.post('/' , [authMiddleware , newPostValidator()] , async (req , res) => {
    const errors = validationResult(req).formatWith(getApiErrorsFormat);
    if(!errors.isEmpty())
        return res.send({errors: errors.array()});
    const user = await User.findOne({_id : req.payload._id});
    const newPost = new Post({
        user : user._id,
        name : user.name,
        avatar : user.avatar,
        text : req.body.text
    });
    await newPost.save();
    return res.send(newPost);
})

router.get('/:id' , async (req , res) => {
    const post = await Post.findOne({_id: req.params.id});
    if(post)
        return res.send(post);
    return res.status(404).send('Post not found');
})

router.delete('/:id' , authMiddleware , async (req , res) => {
    const post = await Post.findOne({_id: req.params.id});
    if(!post) {
        return res.status(404).send('Post not found');
    }

    if(post.user != req.payload._id) {
        return res.status(401).send('Permission denied, this post is not yours');
    }
    await post.delete();
    return res.send(post);
    
})

router.post('/like/:id' , authMiddleware , async (req , res) => {
    const post = await Post.findOne({_id: req.params.id});
    if(!post) {
        return res.status(404).send('Post not found');
    }
    if(post.likes.findIndex(like => like.user.toString() === req.payload._id) > 0) {
        return res.status(400).send('User already liked post');
    }

    post.likes.push({user: req.payload._id});
    await post.save();
    return res.send(post.likes);
    
})

router.post('/unlike/:id' , authMiddleware , async (req , res) => {
    const post = await Post.findOne({_id: req.params.id});
    if(!post) {
        return res.status(404).send('Post not found');
    }
    if(post.likes.findIndex(like => like.user.toString() === req.payload._id) < 0) {
        return res.status(400).send('Cannot unlike this post');
    }

    const removeIndex = post.likes.findIndex(like => like.user.toString());
    post.likes.splice(removeIndex , 1);
    await post.save();
    return res.send(post.likes);
})

module.exports = router;