import { requiredAdmin } from "@/lib/auth"

export default async function Layout({children}: {children:React.ReactNode}){

 const user = await requiredAdmin()

   console.log("Usuário no Dashboard:", user)
   

    return(
        <div>
            {children}
        </div>
    )
}