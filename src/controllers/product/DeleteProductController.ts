import { Request,Response } from "express";
import { DeleteProductService } from "../../services/product/DeleteProductService";

class DeleteProductController{
    async handle(req:Request,res:Response){
        const {product_id} = req.query as any

     const deleteProductService = new DeleteProductService()

     const deleted = await deleteProductService.execute({ product_id })
console.log (typeof product_id )
     return res.status(200).json(deleted)

    }
}

export { DeleteProductController }