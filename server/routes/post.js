const express = require('express')
const router = express.Router()

const Post = require('../models/Post')
const verifyToken = require('../middleware/auth')

// // @route GET api/posts
// // @desc Get all post
// // @access Public
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('user', ['username'])
            .sort({ _id: -1 })

        res.json({ success: true, data: posts })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
})

// // @route GET api/posts
// // @desc Get detail post
// // @access Public
router.get('/detail/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.json({
                success: false,
                message: 'post_not_found',
                data: null,
            })
        }
        res.json({ success: true, message: 'successfully', data: post })
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
    console.log('hereee')
    try {
        const posts = await Post.find({ user: req.userId })
            .populate('user', ['username'])
            .sort({ _id: -1 })

        res.json({ success: true, message: 'successfully', data: posts })
    } catch (err) {
        console.log('err', err)
        res.status(500).json({
            success: false,
            message: '123',
            err: err,
        })
    }
})

// @route POST api/posts
// @desc Create post
// @access Private

router.post('/', verifyToken, async (req, res) => {
    const { title, description, status, image, category, body } = req.body

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
            // url: url.startsWith('https://') ? url : `https://${url}`,
            status: status || 'TO LEARN',
            user: req.userId,
            category,
            body,
        })
        await newPost.save()

        res.json({
            success: true,
            message: 'post_crete_succefully',
            data: newPost,
        })
    } catch (error) {
        console.log('req.error', error)
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
    const { title, description, image, status, category } = req.body
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
            // url: url.startsWith('https://') ? url : `https://${url}`,
            image,
            category,
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
            err: error,
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
