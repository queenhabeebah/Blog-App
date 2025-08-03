const cloudinary = require('cloudinary')
const fs =  require('fs')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const uploadToCloudinary = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: "blog-app",
        })
        fs.unlinkSync(filePath)
        return result
    } catch (error) {
        throw error
    }
}

module.exports = { uploadToCloudinary}