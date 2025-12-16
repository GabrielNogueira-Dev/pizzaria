import { Readable } from "node:stream";
import prismaclient from "../../prisma";
import cloudinary from "../../config/cloudinary"
import { rejects } from "node:assert";

interface ProductRequest{
    name:string;
    price:number;
    description:string;
    category_id:string;
    imageBuffer: Buffer;
    imageName:string;
}

class CreateProductService{
    async execute({name,price,description,category_id,imageBuffer,imageName}:ProductRequest){
       
const categoryExists = await prismaclient.category.findFirst({
    where:{
        id:category_id
    }
})

    if(!categoryExists) {
       throw new Error("Categoria não existe/não encontrada") 
    }

// ENVIAR PRO CLOUDINARY SALVAR A IMAGEM E PEGAR A URL

let bannerUrl = ""

try{
    const result = await new Promise<any>((resolve,reject)=>{
        const uploadStream = cloudinary.uploader.upload_stream({
            folder:"products",
            resource_type:"image",
            public_id:`${Date.now()}-${imageName.split(".")[0]}`
        },(error,result) => {
            if(error) reject(error)
            else resolve(result)
    })

    //CRIAR O STREAM DO BUFFER E FAZER PIPE PARA O CLAUDINARY >>>
     const bufferStream = Readable.from(imageBuffer)
     bufferStream.pipe(uploadStream)

})
console.log(result)

}catch(error){
    console.log(error)
    throw new Error("Erro ao fazer upload da imagem")
}

//SALVAR A URL DA IMAGEM E OS DADOS NO BANCO COMO UM NOVO PRODUTO

    }
}
export {CreateProductService}