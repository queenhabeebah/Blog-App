const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

dotenv.config()

const app = express()

// Connect to MongoDB
connectDB()

// Middlewares
app.use(express.json())

// Test Route
app.get('/', (req, res) => {
    res.send('API is running...')
})

// Start Server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})