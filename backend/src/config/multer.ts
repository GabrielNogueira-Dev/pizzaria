import multer from "multer";

// Usar memorystorage para manter o arquivo em memoria e enviar diretamente pro cloudinary..

export default {
    storage: multer.memoryStorage(),
    limits:{
        fileSize: 4* 1024 * 1024 // 4Mb
    },
    fileFilter: (_req:any, file: Express.Multer.File, cb: any) => {
        const allowerdMimes = ["image/jpeg", "image/jpg", "image/png"]
    
        if(allowerdMimes.includes(file.mimetype)) {
            cb(null,true)
        }else{
            cb(new Error("Formato de arquivo invalido, use apenas JPG,JPEG,PNG"))
        }
    
    }
}