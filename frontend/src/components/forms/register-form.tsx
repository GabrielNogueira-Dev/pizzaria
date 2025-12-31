import { Button } from "../ui/button"
import { 
    Card,CardAction,
    CardContent,CardDescription,
    CardFooter,CardHeader,CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

export function RegisterForm(){

    return(
      <Card className="bg-app-card border border-app-border w-full max-w-md mx-auto">
        <CardHeader>
            <CardTitle className="text-gray-400 text-center text-3xl sm:text-4xl font-bold">NaP<span className="text-brand-primary">'izza </span> </CardTitle>
        </CardHeader>
        <CardContent>
            <form className=" space-y-4">
                <div>
                    <Label htmlFor="name" className="text-white">Nome</Label>
                    <Input type="text" id="name" placeholder="Digite seu nome"
                           required minLength = {3}  className="text-white bg-app-card border border-app-border"
                    />
                </div>

                 <div>
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input type="text" id="email" placeholder="Digite seu e-mail"
                          className="text-white bg-app-card border border-app-border"
                    />
                </div>

                 <div>
                    <Label htmlFor="password" className="text-white">Senha</Label>
                    <Input type="password" id="senha" placeholder="Digite sua senha"
                           required minLength = {3}  className="text-white bg-app-card border border-app-border"
                    />
                </div>

                <Button type="submit" className="w-full bg-brand-primary text-white hover:bg-brand-primary">Cadastrar</Button>

            </form>
        </CardContent>
      </Card>
    )
}