import prismaclient from "../../prisma";

interface OrderProps{
    draft?:string;
}

class ListOrderService{
    async execute({ draft }: OrderProps){

        const orders = await prismaclient.order.findMany({
            where:{
                draft: draft === "true" ? true : false,
            },
            select:{
                id:true,
                name: true,
                table:true,
                draft:true,
                status:true,
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
                                banner:true
                            }
                        }
                    }
                },

            }
        })

        return orders

    }
}

export { ListOrderService }