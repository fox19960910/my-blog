const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const verifyToken = require('../middleware/auth')

// @route GET api/auth
// @desc Check if user log in
// @access Public
router.get('/', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password')

        if (!user) {
            return res
                .status(400)
                .json({ success: false, message: 'user_not_found' })
        }
        res.json({ success: true, message: 'Successfully', data: user })
    } catch (error) {
        console.log('error', error)
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
})

// @route POST api/auth/register
// @desc Register user
// @access Public
router.post('/register', async (req, res) => {
    const { username, password } = req.body

    // Simple validation
    if (!username || !password)
        return res.status(400).json({
            success: false,
            message: 'missing_user_password',
        })

    try {
        // Check for existing user
        const user = await User.findOne({ username })

        if (user)
            return res
                .status(400)
                .json({ success: false, message: 'user_already_taken' })

        // All good
        const hashedPassword = await argon2.hash(password)
        const newUser = new User({ username, password: hashedPassword })
        await newUser.save()

        // Return token
        const accessToken = jwt.sign(
            { userId: newUser._id },
            process.env.ACCESS_TOKEN_SECRET
        )

        res.json({
            success: true,
            message: 'user_crete_succefully',
            accessToken,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
})

// @route POST api/auth/login
// @desc User login
// @access Public

router.post('/login', async (req, res) => {
    const { username, password } = req.body
    // Simple validation
    if (!username || !password)
        return res.status(400).json({
            success: false,
            message: 'missing_user_password',
        })

    try {
        const user = await User.findOne({ username })

        if (!user || (user && !argon2.verify(user.password, password)))
            return res.status(400).json({
                success: false,
                message: 'incorrect_user_password',
            })
        // all good
        const access_token = jwt.sign(
            { userId: user._id },
            process.env.ACCESS_TOKEN_SECRET
        )
        res.json({
            success: true,
            message: 'login_succesfully ',
            access_token,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
})

module.exports = router
