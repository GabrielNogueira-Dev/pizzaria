"use server"

import { apiClient } from "@/lib/api";
import { AuthResponse, User } from "@/lib/types";
import { setToken, removeToken } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function registerAction(
    prevState: {success: boolean, error:string, redirectTo?:string} | null,
    formData: FormData
){
  try{
    
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const name = formData.get("name") as string
    
    console.log("Registrando usuário:", {email, name})
    
 
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return {success: false, error: "Email inválido"}
    }
    
    // Validar senha
    if (password.length < 6) {
      return {success: false, error: "Senha deve ter no mínimo 6 caracteres"}
    }

const data = {
        email: email,
        password:password,
        name:name
}

    console.log("Enviando dados:", data)
    console.log("API_URL:", process.env.NEXT_PUBLIC_API_URL)

  const user = await apiClient<User>("/users",{
        method: "POST",
        body: JSON.stringify(data)
    })

        return {success:true, error : "", redirectTo: "/login"}

  }catch(error){
    if(error instanceof Error){
        return {success:false, error: error.message}
    }
        return {success:false, error: "Error ao criar conta"}
  }
}

export async function loginAction(
    prevState: {success:boolean; error: string; redirectTo?:string} | null,
    formData: FormData
) {
try{
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    
        const data = { email:email, password:password }

    const response = await apiClient<AuthResponse>("/session",{
            method:"POST",
            body: JSON.stringify(data)
        })
    
            await setToken(response.token) //salva o token pelo cookie

     return {success:true, error:"", redirectTo: "/dashboard"}
}catch(error){console.log(error)
if(error instanceof Error){
    return {success:false, error:  error.message ||"Error ao tentar fazer o login"}
}
    return {success:false, error: "Error ao tentar fazer o login"}
}
      
}

export async function logoutAction(){
await removeToken()
redirect("/login")
}