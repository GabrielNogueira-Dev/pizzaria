import { Request,Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";

class CreateUserController{
    async handle(req:Request,res:Response){
        const {name,email,password} = req.body

        const createUserSersvice = new CreateUserService()

        const user = await createUserSersvice.execute({name,email,password})
        res.json(user)
    }
}
export { CreateUserController }