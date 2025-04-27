import cloudinary from "cloudinary";
import {getEnvVariable} from "./getEnvVariable.js";

cloudinary.config({
    cloud_name: getEnvVariable("CLOUDINARY_CLOUD_NAME"),
    api_key: getEnvVariable("CLOUDINARY_API_KEY"),
    api_secret: getEnvVariable("CLOUDINARY_SECRET_KEY"),
});

export const saveToCloudinary = async (file) => {
    const response = await cloudinary.v2.uploader.upload(file.path);
    return response.secure_url
}