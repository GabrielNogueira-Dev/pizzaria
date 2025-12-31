import prismaclient from "../../prisma";

interface ItemProps{
    order_id: string;
    product_id: string;
    amount: number;
}

class AddItemOrderService{
    async execute({ order_id,product_id,amount }: ItemProps){

        try{

            const orderExists = await prismaclient.order.findFirst({
                where: {
                    id: order_id
                }
            })
            if(!orderExists){
                throw new Error("Ordem não foi encontrada!")
            }

             const productExists = await prismaclient.product.findFirst({
                where:{
                    id: product_id,
                    disabled:false
                }
             })  
             if(!productExists){
                throw new Error("Produto não foi encontrado!")
             } 

             const item = await prismaclient.item.create({
                data:{
                    order_id: order_id,
                    product_id:product_id,
                    amount:amount
                },
                 select:{
                    id:true,
                    amount:true,
                    order_id:true,
                    product_id:true,
                    createdAt:true,
                    product:{
                        select:{
                            id:true,
                            name:true,
                            price:true,
                            description:true,
                            banner:true
                        }
                    }
                 }
             })

             return item
        }catch(err){
            console.log(err)
            throw new Error("Falha ao tentar adicionar item" + err)
        }

    }
}

export { AddItemOrderService }