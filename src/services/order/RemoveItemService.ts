import prismaclient from "../../prisma";

interface ItemProps{
    item_id : string;
}

class RemoveItemService{
    async execute({ item_id }: ItemProps){

        try{
            const ItemAlreadyExist = await prismaclient.item.findFirst({
            where:{
                id: item_id
            }
        })

        if(!ItemAlreadyExist){
            throw new Error("Item não existe")
        }

         await prismaclient.item.delete({
            where:{
                id: item_id
            }
        })
        return {message:"Item removido com sucesso!"}

        }catch(err){
            console.log(err)
            throw new Error("Falha ao remover item do pedido")
        }
    }
}

export { RemoveItemService }