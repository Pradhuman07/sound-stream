import dotenv from 'dotenv';

dotenv.config();

const config = {
    PORT: process.env.PORT,
    MONGODB_URL: process.env.MONGODB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    IMAGEKIT_PUBLIC_KEY: process.env.IMAGEKIT_PUBLIC_KEY,
    IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY,
    IMAGEKIT_ENDPOINT_URL: process.env.IMAGEKIT_ENDPOINT_URL,
    FRONTEND_URL: process.env.FRONTEND_URL,
    JWT_EXPIRY: process.env.JWT_EXPIRY, // JWT token expiry time
    COOKIE_EXPIRY: process.env.COOKIE_EXPIRY, // Cookie expiry time in milliseconds (7 days)
    UPLOAD_SECURITY_PIN: process.env.UPLOAD_SECURITY_PIN // Security pin for song uploads
};

export default config;