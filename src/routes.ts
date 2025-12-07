import { Router } from "express";
import { CreateUserControlller } from "./controllers/user/CreateUserController";
import { validateSchema } from "./middlewares/validateSchema";
import { createUserSchema } from "./schemas/userSchema";

const router = Router();

router.post("/users", validateSchema(createUserSchema) , new CreateUserControlller().handle)

export {router}