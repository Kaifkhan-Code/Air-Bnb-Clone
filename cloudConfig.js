if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const cloudinary = require("cloudinary").v2;

// ✅ IMPORTANT FIX
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "wanderlust_DEV",
    allowed_formats: ["jpeg", "png", "jpg"],
  },
});

module.exports = {
  cloudinary,
  storage,
};