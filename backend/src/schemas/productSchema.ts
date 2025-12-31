import { z } from "zod"

export const createProductSchema = z.object({
    body: z.object({
        name: z.string().min(1,{message: "O nome do produto é obrigatório"}),
        price: z.string().min(1,{message: "Valor do produto é obrigatório"}),
        description: z.string().min(1,{message: "Descriçºao do produto é obrigatória"}),
        category_id: z.string().min(1,{message: "Categoria do produto é obrigatória"}),
    })
})


export const listProductSchema = z.object({
    query: z.object({
        disabled: z.string().optional()
    })
})

export const listProductbyCategorySchema = z.object({
    query: z.object({
        category_id: z.string({message:("Categoria_id é obrigatória!")})
    })
})