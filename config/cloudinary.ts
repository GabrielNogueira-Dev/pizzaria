import { v2 as claudinary } from "cloudinary";

claudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
    api_key: process.env.CLOUDINARY_CLOUD_KEY as string,
    api_secret: process.env.CLOUDINARY_CLOUD_SECRETY as string
})

export default claudinary