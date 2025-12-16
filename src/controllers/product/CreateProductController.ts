import { Request,Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductSersvice";

class CreateProductController{
    async handle(req:Request,res:Response){
        const {name} = req.body
        const createProductService = new CreateProductService()

        const product = createProductService.execute({name})
    res.status(200).json(product)
    }
}

export { CreateProductController }