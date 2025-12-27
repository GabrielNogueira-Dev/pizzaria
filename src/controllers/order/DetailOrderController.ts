import { Request,Response } from "express";
import { DetailOrderService } from "../../services/order/DetailOrderService";



class DetailOrderController{
    async handle( req:Request, res: Response ){
        const {order_id} = req.query 

        const service = new DetailOrderService()
        
        const order = await service.execute({ order_id: order_id as string })

            return res.status(200).json(order)

    }
}
export { DetailOrderController }