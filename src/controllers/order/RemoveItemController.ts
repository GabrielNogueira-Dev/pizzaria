import { Request, Response } from "express";
import { RemoveItemService } from "../../services/order/RemoveItemService";

class RemoveItemController{
    async handle(req:Request, res:Response){
        const {item_id} = req.query 

        const itemService = new RemoveItemService()

        const Item = await itemService.execute({ item_id: item_id as string })

        return res.status(200).json(Item)

    }
}

export { RemoveItemController }