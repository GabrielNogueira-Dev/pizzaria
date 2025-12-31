import { Router } from "express";
import multer from "multer";
import uploadConfig from "./config/multer"
import { CreateUserController } from "./controllers/user/CreateUserController";
import { validateSchema, } from "./middlewares/validateSchema";
import { authUserSchema, createUserSchema } from "./schemas/userSchema";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { isAdmin } from "./middlewares/isAdmin";
import { createCategorySchema } from "./schemas/categorySchema";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import { createProductSchema, listProductbyCategorySchema, listProductSchema } from "./schemas/productSchema";
import { ListProductController } from "./controllers/product/ListProductController";
import { DeleteProductController } from "./controllers/product/DeleteProductController";
import { ListProductsByCategoryController } from "./controllers/product/ListProductsByCategoryController";
import { addItemSchema, createOrderSchema, deleteOrderSchema, finalyOrderStatusSchema, orderDetailSchema, removeItemSchema, sendOrderSchema } from "./schemas/order.Schema";
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { ListOrderController } from "./controllers/order/ListOrderController";
import { AddItemController } from "./controllers/order/AddItemOrderController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";
import { DetailOrderController } from "./controllers/order/DetailOrderController";
import { SendOrderController } from "./controllers/order/SendOrderController";
import { FinallyOrderController } from "./controllers/order/FinalyOrderController";
import { DeleteOrderController } from "./controllers/order/DeleteOrderController";


const router = Router();

const upload = multer(uploadConfig)

// Rotas Users
router.post("/users", validateSchema(createUserSchema), new CreateUserController().handle);

router.post("/session", validateSchema(authUserSchema), new AuthUserController().handle)

router.get("/me", isAuthenticated ,new DetailUserController().handle)

// Rotas Categories       autenticacao    role=ADMIN       Zod com name
router.post("/category", isAuthenticated , isAdmin , validateSchema(createCategorySchema), new CreateCategoryController().handle)

router.get("/category",isAuthenticated, new ListCategoryController().handle)

// Rotas Produtos
router.post("/product",isAuthenticated,isAdmin,upload.single("file"),validateSchema(createProductSchema), new CreateProductController().handle)

router.get("/products",isAuthenticated,validateSchema(listProductSchema),new ListProductController().handle)

router.delete("/product",isAuthenticated,isAdmin, new DeleteProductController().handle)

router.get("/category/product",isAuthenticated,validateSchema(listProductbyCategorySchema), new ListProductsByCategoryController().handle)

//Rotas Order
router.post("/order",isAuthenticated,validateSchema(createOrderSchema), new CreateOrderController().handle)

router.get("/orders",isAuthenticated,new ListOrderController().handle)

router.post("/order/add", isAuthenticated, validateSchema(addItemSchema) ,new AddItemController().handle)

router.delete("/order/remove", isAuthenticated,validateSchema(removeItemSchema) , new RemoveItemController().handle)

router.get("/order/detail",isAuthenticated,validateSchema(orderDetailSchema), new DetailOrderController().handle)

router.put("/order/send",isAuthenticated,validateSchema(sendOrderSchema), new SendOrderController().handle)

router.put("/order/finish", isAuthenticated,validateSchema(finalyOrderStatusSchema), new FinallyOrderController().handle)

router.delete("/order",isAuthenticated,validateSchema(deleteOrderSchema), new DeleteOrderController().handle)

export {router}