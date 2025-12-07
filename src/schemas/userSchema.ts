import { z } from "zod"

export const createUserSchema = z.object({
    body: z.object({
        name: z.string({ message: "O nome precisa ser um texto"}).min(3,{message:"minimo 3 letras"}),
        email: z.email({message: "email valido"}),
        password: z.string({message:"senha obrigatoria"}).min(6,{message:"minimo 6 caracteres"})
    })
})