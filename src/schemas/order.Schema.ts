import {z} from "zod"

export const createOrderSchema = z.object({
    body: z.object({
        name: z.string({message:"Name obrigatório"}).optional(),
        table: z.number({message:"Número da mesa obrigatório"}).min(1)
                 .int({message:"Número da mesa é obrigatório ser inteiro"})
                 .positive({message:"Número da mesa deve ser positivo"})
    })
})