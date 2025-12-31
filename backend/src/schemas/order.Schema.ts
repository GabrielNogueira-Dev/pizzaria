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

export const removeItemSchema = z.object({
    query: z.object({
        item_id : z.string({message: "ID deve ser string"}).min(1,"O item_id é obrigatório")
    })
})

export const orderDetailSchema = z.object({
    query: z.object({
        order_id: z.string({message: "Obrigatório parrar uma order_id"}).min(1, "order_id obrigatória")
    })
})

export const sendOrderSchema = z.object({
    body: z.object({
        order_id : z.string({message: "Obrigatório colocar o order_id"}).min(1, "Order_id obrigatório"),
        name: z.string({message: "Nome obrigatório"}).min(1,"Nome obrigatório")
    })
})

export const finalyOrderStatusSchema = z.object({
    body: z.object({
        order_id: z.string({message: "Order_id Obrigatório"}).min(1,"Mais de uma letra")
    })
})

export const deleteOrderSchema = z.object({
    query: z.object({
        order_id: z.string({message: "Order_id Obrigatório"}).min(1,"Mais de uma letra")
    })
})