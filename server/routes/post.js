const express = require('express')
const router = express.Router()

const Post = require('../models/Post')
const verifyToken = require('../middleware/auth')

// @route GET api/posts
// @desc Get all post
// @access Private
router.get('/', async (req, res) => {
    const postsl = await Post.find({ user: req.userId })
    console.log(postsl)
    try {
        const posts = await Post.find().populate('user', ['username'])

        res.json({ success: true, data: posts })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
})

// @route GET api/posts
// @desc Get post by user
// @access Private
router.get('/my-post', verifyToken, async (req, res) => {
    const postsl = await Post.find({ user: req.userId })
    console.log(postsl)
    try {
        const posts = await Post.find({ user: req.userId }).populate('user', [
            'username',
        ])

        res.json({ success: true, data: posts })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
})

// @route POST api/posts
// @desc Create post
// @access Private

router.post('/', verifyToken, async (req, res) => {
    const { title, description, url, status, image, category } = req.body
    //Validation1
    if (!title) {
        return res
            .status(400)
            .json({ success: false, message: 'Title is require!!' })
    }
    try {
        const newPost = new Post({
            title,
            description,
            image,
            url: url.startsWith('https://') ? url : `https://${url}`,
            status: status || 'TO LEARN',
            user: req.userId,
            category,
        })
        await newPost.save()

        res.json({ success: true, message: 'successfully', post: newPost })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
})

// @route PUT api/posts
// @desc Update post
// @access Private

router.put('/:id', verifyToken, async (req, res) => {
    const { title, description, url, status } = req.body
    //Validation
    if (!title) {
        return res
            .status(400)
            .json({ success: false, message: 'Title is require' })
    }
    try {
        let updatePost = {
            title,
            description,
            url: url.startsWith('https://') ? url : `https://${url}`,
            status: status || 'TO LEARN',
            user: req.userId,
        }
        const postUpdateCondition = { _id: req.params.id, user: req.userId }
        updatePost = await Post.findOneAndUpdate(
            postUpdateCondition,
            updatePost,
            { new: true }
        )
        //user not authorised to update post or post not found
        if (!updatePost)
            return res
                .status(401)
                .json({ success: false, message: 'Post not found' })

        res.json({ success: true, message: 'successfully', post: updatePost })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
})

// @route DELETE api/posts
// @desc Delete post
// @access Private

router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const postDeleteCondition = { _id: req.params.id, user: req.userId }
        deletePost = await Post.findOneAndDelete(postDeleteCondition)
        //user not authorised to update post or post not found
        if (!deletePost)
            return res
                .status(401)
                .json({ success: false, message: 'Post not found' })

        res.json({ success: true, message: 'successfully' })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
})

module.exports = router
