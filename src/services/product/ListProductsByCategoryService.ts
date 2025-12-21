import prismaclient from "../../prisma";

interface ListProductsBCategoryServiceProps {
    category_id:string;
}

class ListProductsByCategoryService{
    async execute({category_id}: ListProductsBCategoryServiceProps){

        try{ // verificação da CATEGORIA existe
            const category = await prismaclient.category.findUnique({
                where:{
                    id:category_id
                }
            })

            if(!category){
                throw new Error("Categoria não encontrada!")
            }

            //filtragem de todas as categorias com id e disabled igual false..

            const products = await prismaclient.product.findMany({
                where:{
                    category_id:category_id,
                    disabled:false
                },
                select:{
                    id:true,
                    name:true,
                    price:true,
                    description:true,
                    banner:true,
                    disabled:true,
                    category_id:true,
                    category:{
                        select:{
                            id:true,
                            name:true
                        }
                    }
                },
                orderBy:{
                    createdAt:"desc"
                }
            })

            return products

        }catch(err){
           if(err instanceof Error){
            throw new Error(err.message)
           }
            throw new Error("Falha ao buscar produtos:" + err)
        }
 

    }
}

export { ListProductsByCategoryService }