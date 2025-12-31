import prismaclient from "../../prisma";

interface DeleteProductServiceProps{
    product_id : string
}

class DeleteProductService{
    async execute({product_id}: DeleteProductServiceProps){
try{
 await prismaclient.product.update({
    where:{
        id: product_id,
    },
    data:{
        disabled:true
    }
})
return {message:"Produto arquivado com sucesso"} 
}catch(error){
    console.log(error)
throw new Error("Error ao deletar produto")
}
    }
}

export { DeleteProductService }