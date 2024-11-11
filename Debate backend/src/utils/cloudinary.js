import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'


cloudinary.config({
    cloud_name: "dyb2s17gx",
    api_key: "435184189463976",
    api_secret: "g7yctJHovK5ZTGdSLGVkFILq3MA"
});


export const uploadOnCloudinary = async (filePath) => {

    try {

        if (!filePath) return null;

        const response = await cloudinary.uploader.upload(filePath, { resource_type: "auto" });

        console.log('response', response)

        fs.unlinkSync(filePath);

        return response;

    } catch (error) {
        console.log('error', error)
        fs.unlinkSync(filePath);
        return null;
    }

}