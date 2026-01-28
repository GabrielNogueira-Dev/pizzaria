"use client"

import { ShoppingCart, Package, Tags, LogOut,Menu  } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { logoutAction } from "@/actions/auth";
import { Sheet,SheetClose,SheetContent,SheetDescription,SheetFooter,SheetHeader,SheetTitle,SheetTrigger } from "../ui/sheet";
import { useState } from "react";



const menuItems = [
   { title: "Pedidos",
     href: "/dashboard",
     icon: ShoppingCart},

   { title: "Produtos",
     href: "/dashboard/products",
     icon: Package},

     {title: "Categorias",
      href: "/dashboard/categories",
      icon: Tags
     }
]

interface MobileSidebarProps{
    UserName: string;
}

export function MobileSidebar({UserName}: MobileSidebarProps){
    const pathname = usePathname()
    const [open,setOpen] = useState(false)

    return(
        <div className="lg:hidden">
            <header className="sticky top-0 z-50 border-b border-app-border bg-app-card">
                <div className="flex h-16 items-center justify-between px-4">
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size={"icon"}>
                               <Menu className=" w-6 h-6"/>
                            </Button>
                        </SheetTrigger>

                        <SheetContent side="left" className="w-72 p-0 bg-app-sidebar border-app-border">
                            <SheetHeader className="border-b border-app-border p-6">
                                <SheetTitle className="text-xl text-white font-bold">Menu</SheetTitle>
                                <SheetDescription className="text-sm text-gray-400">Olá, {UserName}</SheetDescription>
                            </SheetHeader>

                                    {/* Navegação do menu */}
                             <nav className="flex flex-col p-4 space-y-4">
                              {menuItems.map((menu) => {
                                const Icon = menu.icon;
                                const isActive = pathname === menu.href

                                 return (
                                 <Link key={menu.title} href={menu.href} className={cn("flex items-center gap-3 px-3 py-2 text-sm rounded-md font-medium text-white", isActive ?  "bg-brand-primary text-white" : "hover:bg-gray-700")}>
                                 <Icon className={cn("w-5 h-5 ",isActive ? "text-gray-200" : "text-gray-500")} />
                                {menu.title} 
                                </Link>
                                 )   
                                 })}
                              </nav>

                                     {/*FOOTER*/}
                              <div className="absolute bottom-0 border-t border-app-border w-full p-4 ">
                              <form action={logoutAction}>
                              <Button type="submit" variant="ghost" className=" w-full justify-start gap-3 text-white hover:bg-transparent hover:text-brand-primary ">
                              <LogOut className=" w-5 h-5"/>
                                 Sair
                             </Button>
                                </form>
                            </div>

                        </SheetContent>
                        
                    </Sheet>

                         <h1 className="flex mx-auto text-xl font-bold text-gray-400">NaP<span className="text-brand-primary">'izza </span></h1>

                </div>
            </header>
        </div>
    )
}