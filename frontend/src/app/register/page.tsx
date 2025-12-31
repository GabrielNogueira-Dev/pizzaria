import { RegisterForm } from "@/components/forms/register-form";

export default function Register(){

    return(
        <div className="bg-app-background min-h-screen flex items-center justify-center px-47 py-8">
            <div className="w-full">
                <RegisterForm/>
            </div>
        </div>
    )
}