import { z } from "zod"

export const createUserSchema = z.object({
    body: z.object({
        name: z.string({ message: "O nome precisa ser um texto"}).min(3,{message:"minimo 3 letras"}),
        email: z.email({message: "Precisa ser um email válido"}),
        password: z.string({message:"A senha é obrigatória"}).min(6,{message:"minimo 6 caracteres"})
    })
})

export const authUserSchema = z.object({
    body: z.object({
        email: z.string({ message: "Precisa ser um email válido" }).email("Email inválido"),
        password: z.string({message: "A senha é obrigatória"}).min(1,"A senha é obrigatória")
    })
})