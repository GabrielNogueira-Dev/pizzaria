"use client"

import { use, useActionState, useEffect } from "react"
import { Button } from "../ui/button"
import { Card,CardAction, CardContent,CardDescription,CardFooter,CardHeader,CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import Link from "next/link"
import { loginAction } from "@/actions/auth"
import { useRouter } from "next/navigation"


export function LoginForm(){
    const [state, formAction, isPending] = useActionState(loginAction, null)
    const router = useRouter()

    useEffect(()=>{
        if(state?.success && state?.redirectTo)
            router.push(state.redirectTo)
    },[state,router])

    return(
      <Card className="bg-app-card border border-app-border w-full max-w-md mx-auto">
        <CardHeader>
            <CardTitle className="text-gray-400 text-center text-3xl sm:text-4xl font-bold">NaP<span className="text-brand-primary">'izza </span> </CardTitle>
        </CardHeader>
        <CardContent>
            <form className=" space-y-4" action={formAction}>
             
                 <div>
                    <Label htmlFor="email" className="text-white mb-2">Email</Label>
                    <Input type="email" id="email" name="email" placeholder="Digite seu e-mail"
                        required  className="text-white bg-app-card border border-app-border"
                    />
                </div>

                 <div>
                    <Label htmlFor="password" className="text-white mb-2">Senha</Label>
                    <Input type="password" id="password" name="password" placeholder="Digite sua senha"
                           required minLength = {3}  className="text-white bg-app-card border border-app-border"
                    />
                </div>

                <Button type="submit" className="w-full bg-brand-primary text-white hover:bg-brand-primary">{isPending ? "Acessando conta.." : "Acessar"} </Button>
                 {state?.error && (
                    <div className="bg-red-500 text-white p-3 rounded text-sm">
                        {state.error}
                    </div>
                )}
                <p className="text-center text-sm text-gray-100">Ainda não possui conta?
                 <Link className="text-brand-primary font-semibold" href={"/register"}> Crie uma conta</Link></p>
            
            </form>
        </CardContent>
      </Card>
    )
}