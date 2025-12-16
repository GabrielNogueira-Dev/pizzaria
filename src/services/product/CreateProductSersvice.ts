import prismaclient from "../../prisma";

interface ProductRequest{
    name:string
}

class CreateProductService{
    async execute({name}:ProductRequest){
        const product = await prismaclient.product.create({
            data:{
                name: name
            }
        })
        return product
    }
}
export {CreateProductService}