import { PrismaClient } from "@prisma/client";
import prismaclient from "../../prisma";

interface DetailOrderProps{
    order_id:string;
}

class DetailOrderService{
    async execute({order_id}:DetailOrderProps){
        
   try{

const order = await prismaclient.order.findFirst({
    where:{
        id: order_id 
    },
    select:{
        id:true,
        name:true,
        table:true,
        draft:true,
        status:true,
        createdAt:true,
        updatedAt:true,
        items:{
            select:{
                id:true,
                amount:true,
                createdAt:true,

                product:{
                    select:{
                        id:true,
                        price:true,
                        description:true,
                        banner:true,
                        }
                    }
            }},    

    }
})
if(!order){
    throw new Error("Ordem não encontrada")
}

return order

   }catch(err){
    throw new Error("Error ao buscar detalhes")
   }

    }
}

export { DetailOrderService }