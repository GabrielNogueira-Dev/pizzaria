import prismaclient from "../../prisma";

interface OrderProps{
    table:number;
    name:string
}

class CreateOrderService{
    async execute({ table,name }:OrderProps){

        try{
            const orderClient = await prismaclient.order.create({
    data:{
        table: table,
        name: name ?? ""
    },
    select: {
        id:true,
        table:true,
        name:true,
        status:true,
        draft:true,
        createdAt:true
    }
})
return orderClient

        }catch(error){
            throw new Error("Não foi possível criar a ordem" + error)
        }

    }
}

export{ CreateOrderService }