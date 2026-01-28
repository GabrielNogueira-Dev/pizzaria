"use client"

import { useState } from "react"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

import { createCategoryAction } from "@/actions/categories"

export function CategoryForm(){
    const [open, setOpen] = useState(false)
    const router =  useRouter()

    async function handlecreateCategoryAction(e: React.FormEvent<HTMLFormElement>){
       e.preventDefault();
         const formData = new FormData(e.currentTarget);
          const result = await createCategoryAction(formData)
    
         if(result.success){
            setOpen(false)//fecha o modal
            router.refresh()//atualiza a pagina
         }
        }

    return(
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-brand-primary hover:bg-brand-primary font-semibold">
            <Plus className="w-5 h-5 mr-2"/>
            Nova Categoria
          </Button>
        </DialogTrigger>

          <DialogContent className="p-6 bg-app-card text-white">
           <DialogHeader className="flex justify-center items-center">
            <DialogTitle>Nova Categoria</DialogTitle>
            <DialogDescription>
                Formulário 
            </DialogDescription>
           </DialogHeader>

              <form className="space-y-4" onSubmit= { handlecreateCategoryAction }>

                <div>
                    <Label htmlFor="category" className="mb-2 ml-2">
                        Nome da Categoria
                    </Label>
                    <Input
                        id="name"
                        name="name"
                        required
                        placeholder="Digite o nome da categoria.."
                        className="border-app-border bg-app-background text-white"
                    />
                </div>
                   <Button 
                   type="submit"
                   className="w-full bg-brand-primary text-white hover:bg-brand-primary"       
                   >
                    Adicionar Categoria
                   </Button>
              </form>

          </DialogContent>
        </Dialog>
    )
}