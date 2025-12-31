import prismaclient from "../../prisma";

interface FinalyOrderProps{
    order_id: string;
}

class FinalyOrderService{
    async execute({ order_id }:FinalyOrderProps){

        const statusOrder = await prismaclient.order.findFirst({
            where:{
                id : order_id,
            }
        })
            if(!statusOrder){
                throw new Error("Falha ao finalizar o pedido")
            }

            const FinalyStatus = await prismaclient.order.update({
                where:{
                    id: order_id,
                },
                data:{
                status: true
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
            return FinalyStatus
    }
}
export { FinalyOrderService }