import { Request,Response } from "express";
import { SendOrderService } from "../../services/order/SendOrderService";

class SendOrderController{
    async handle(req:Request, res:Response){

        const { order_id, name } = req.body 

        const orderService = new SendOrderService()

        const updateOrder = await orderService.execute({
            order_id: order_id,
            name: name 
        })
        
        return res.status(200).json(updateOrder)
    }
}

export { SendOrderController }