import { Request,Response } from "express";
import { ListCategoryService } from "../../services/category/ListCategoryService";

class ListCategoryController{
    async handle(req:Request,res:Response){
        const listCategoryService = new ListCategoryService()

        const listCategory = await listCategoryService.execute()

        res.status(200).json(listCategory)
    }
}

export { ListCategoryController }