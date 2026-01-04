"use server"

import { apiClient } from "@/lib/api";

export async function registerAction(
    prevState: {sucess: boolean; error:string} | null,
    formData: FormData
){
    console.log("voce clicou")
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const name = formData.get("name") as string
    
const data = {
        email: email,
        password:password,
        name:name
}

    await apiClient("/users",{
        method: "POST",
        body: JSON.stringify(data)
    })


    return {sucess:true,error : ""}
}