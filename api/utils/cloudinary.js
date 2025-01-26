import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
});

const uploadFile  = async(filePath)=>{
    try{
       const result = await cloudinary.uploader.upload(filePath);
       return result.secure_url;
    }
    catch(error)
    {
        console.log(error.message);
    }
}
export default uploadFile;