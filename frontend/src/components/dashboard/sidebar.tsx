"use client"

import { ShoppingCart, Package, Tags, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { logoutAction } from "@/actions/auth";


interface SidebarProps{
    UserName: string;
}

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

export default function Sidebar({UserName}: SidebarProps){
const pathname = usePathname();

    return(
        <aside className="hidden lg:flex flex-col h-screen w-64 border-r border-app-border bg-app-sidebar p-6">
            {/*HEADER*/}
         <div className=" border-b border-app-border p-6">
            <h1 className="text-xl font-bold text-gray-400">NaP<span className="text-brand-primary">'izza </span></h1>
            <p className="text-sm text-gray-300 mt-1">Olá, {UserName}</p>
         </div>
            {/*MENU*/}
            <nav className="flex-1 p-4 space-y-4">
                {menuItems.map((menu) => {
                    const Icon = menu.icon;
                    const isActive = pathname === menu.href

                return (
                    <Link key={menu.title} href={menu.href} className={cn("flex items-center gap-3 px-3 py-2 text-sm rounded-md font-medium", isActive ?  "bg-brand-primary text-white" : "hover:bg-gray-700")}>
                        <Icon className={cn("w-5 h-5 ",isActive ? "text-gray-200" : "text-gray-500")} />
                         {menu.title} 
                    </Link>
                )   
                })}
            </nav>

            {/*FOOTER*/}
            <div className="border-t border-app-border pt-4">
                <form action={logoutAction}>
                    <Button type="submit" variant="ghost" className=" w-full justify-start gap-3 text-white hover:bg-transparent hover:text-brand-primary ">
                        <LogOut className=" w-5 h-5"/>
                        Sair
                    </Button>
                </form>
            </div>

        </aside>
    )
}