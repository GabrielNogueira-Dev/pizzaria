import {z} from "zod"

export const createOrderSchema = z.object({
    body: z.object({
        name: z.string({message:"Name obrigatório"}).optional(),
        table: z.number({message:"Número da mesa obrigatório"}).min(1)
                 .int({message:"Número da mesa é obrigatório ser inteiro"})
                 .positive({message:"Número da mesa deve ser positivo"})
    })
})

export const addItemSchema = z.object({
    body: z.object({
        order_id: z.string({message: "Order deve ser uma string"}).min(1),
        product_id: z.string({message: "Product deve ser uma string"}).min(1),
        amount: z.number().int("Quantidade deve ser número inteiro").positive("Quantidade deve ser número positivo")
    })
})