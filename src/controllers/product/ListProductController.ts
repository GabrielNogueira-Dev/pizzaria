import { Request, Response } from "express";
import { ListProductService } from "../../services/product/ListProductService";

class ListProductController{
    async handle(req:Request,res:Response){
        try{
            const disabled = req.query.disabled as string;
            const listProductService = new ListProductService();
            
            const Products = await listProductService.execute({ disabled });
            
            return res.json(Products);
        }catch(err:any){
            return res.status(400).json({ error: err.message || "Erro ao listar produtos" });
        }
    }
}

export { ListProductController }