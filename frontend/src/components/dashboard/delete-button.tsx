"use client"

import { Trash } from "lucide-react"
import { Button } from "../ui/button"
import { deleteProductAction } from "@/actions/products"
import { useRouter } from "next/navigation"

interface DeleteButtonProps{
    productId:string
}

export function DeleteButtonProduct({productId}:DeleteButtonProps){
    const router = useRouter()
    
    async function handleDeleteProduct(){
        const result = await deleteProductAction(productId)
        
        if(result.success){
            router.refresh()
              return
        }

    }

    return(
        <Button onClick={handleDeleteProduct}
         className="bg-red-600 w-8 h-8 flex items-center justify-center p-0 text-white">
            <Trash className="w-5 h-5 "/>
        </Button>
    )
}