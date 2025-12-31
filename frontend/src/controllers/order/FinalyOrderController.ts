import { Request,Response } from "express";
import { FinalyOrderService } from "../../services/order/FinalyOrderService";

class FinallyOrderController{
    async handle(req: Request, res: Response){

        const { order_id } = req.body 

        const service = new FinalyOrderService();

        const finalyStatus = await service.execute({ order_id: order_id })

        res.status(200).json(finalyStatus)

    }
}

export { FinallyOrderController }