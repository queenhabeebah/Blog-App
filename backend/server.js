const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

const authRoutes = require('./routes/authRoutes')
const postRoutes = require('./routes/postRoutes')

dotenv.config()

const app = express()

// Connect to MongoDB
connectDB()

// Middlewares
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/post', postRoutes)

app.get('/', (req, res) => {
    res.send('API is running...')
})

// Start Server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})