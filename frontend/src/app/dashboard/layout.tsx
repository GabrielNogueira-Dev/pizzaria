import { MobileSidebar } from "@/components/dashboard/mobilesidebar"
import Sidebar from "@/components/dashboard/sidebar"
import { requiredAdmin } from "@/lib/auth"

export default async function Layout({children}: {children:React.ReactNode}){

 const user = await requiredAdmin()

   console.log("Usuário no Dashboard:", user)
   

    return(
        <div className="flex h-screen overflow-hidden text-white">
        {/*Sidebar do DESKTOP*/}
         <Sidebar UserName={user.name} />
     
        {/*Conteúdo principal*/}

          <div className="flex flex-col flex-1  overflow-hidden">
            {/*Header Mobile*/}
            <MobileSidebar  UserName={user.name} />
            <main className=" flex-1 overflow-y-auto bg-app-background">
                <div className=" max-w-full px-4 py-6">{children}</div>
            </main>
          </div>

        </div>
    )
}