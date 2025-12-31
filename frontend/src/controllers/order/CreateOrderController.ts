import { Request,Response } from "express";
import { CreateOrderService } from "../../services/order/CreateOrderService";

class CreateOrderController{
    async handle(req:Request,res:Response){

       const {table,name} = req.body

         const orderService = new CreateOrderService()

         const createOrderService = await orderService.execute({table:Number(table),name})

        return res.status(200).json(createOrderService)

    }
}

export { CreateOrderController }