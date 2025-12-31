import prismaclient from "../../prisma";

interface OrderProps{
    order_id:string
}

class DeleteOrderService {
    async execute({order_id}:OrderProps){
        try{
        const order = await prismaclient.order.findFirst({
            where:{
                id:order_id
            }
        })
        if(!order){
            throw new Error("Falha ao encontrar ordem")
        }

         await prismaclient.order.delete({
            where:{
                id:order_id
            },
            select:{
                id:true,
                name:true,
                table:true,
                status:true,
                draft:true,
                createdAt:true,
                items:{
                    select:{
                        id:true,
                        amount:true,
                        product:{
                            select:{
                                id:true,
                                name:true,
                                price:true,
                                description:true,
                                banner:true,

                            }}}}}
                        })
                 return {message: "Pedido deletado com sucesso!"}
       }catch(err){
        throw new Error("Falha ao deletar ordem")
       }
    }
}
export { DeleteOrderService }