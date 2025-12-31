import { Request,Response } from "express";
import { AddItemOrderService } from "../../services/order/AddItemOrderService";

class AddItemController {
    async handle(req:Request,res:Response){
        const {order_id,product_id,amount} = req.body;

        const additemservice = new AddItemOrderService()

        const newItem = await additemservice.execute({ order_id, product_id, amount })
       
          res.status(200).json(newItem)
    }

}

export { AddItemController }