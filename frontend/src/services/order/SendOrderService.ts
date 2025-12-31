import prismaclient from "../../prisma";

interface OrderIdProps{
    order_id:string;
    name:string;
}

class SendOrderService {
    async execute({ order_id, name }: OrderIdProps){

        try{
            const order = await prismaclient.order.findFirst({
            where:{
                id: order_id,
                name: name
            }
        })
            if(!order){
                throw new Error("Error ao buscar ordem")
            }

            const updatedOrder = await prismaclient.order.update({
                where:{
                    id:order_id
                },
                data:{
                    draft: false,
                },
                select:{
                    id:true,
                    name:true,
                    table:true,
                    draft:true,
                    status:true,
                    createdAt:true,
                }
            })
            return updatedOrder

    }catch(err){
        console.log(err)
        throw new Error("Falha ao enviar pedido")
    }
        }
}

export { SendOrderService }