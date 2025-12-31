import prismaclient from "../../prisma";

interface ListProductServiceProps{
    disabled?:string;
}

class  ListProductService{
    async execute({ disabled }: ListProductServiceProps){
try{
    // Se disabled não é passado, lista TODOS; se passado, filtra por true/false
    const listProduct = await prismaclient.product.findMany({
        where:{ 
            disabled : disabled === "true" ? true : false
        },// where :{ disabled === "true" : {}}
        select:{
            id: true,
            name:true,
            price:true,
            description:true,
            banner:true,
            disabled:true,
            category_id:true,

            category:{
                select:{
                    id:true,
                    name:true,
                }
            }
        },
        orderBy:{
            createdAt: "desc"
        }
})
return listProduct
}catch(erro){
    throw new Error("Falha ao listar produto" + "ERROR: " + erro)
}

    }
}

export { ListProductService }