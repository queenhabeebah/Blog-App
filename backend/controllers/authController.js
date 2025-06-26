const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Register user
exports.registerUser = async (req, res) => {
    const {username, email, password} = req.body

    try{
        // check if the user already exists
        const userExists = await User.findOne({email})
        if (userExists) return res.status(400).json({
            message: 'Email already exists'
        })

        // Hash pasword
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // create user
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        })

        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        })
    } catch(error){
        res.status(500).json({message: 'Server error'})
    }
}

// Login User
exports.loginUser = async (req, res) => {
    const {email, password} = req.body

    try{
        //Find user
        const user = await User.findOne({email})
        if(!user) return res.status(400).json({ message: 'Invalid login details'})
        
        // Compare password
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(400).json({message: 'Invalid login details'})

        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        })
    } catch(error){
        res.status(500).json({message: 'Server error'})
    }
}

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({id}), process.env.JWT_SECRET, {
        expiresIn: '7d'
    }
}