
interface Requesdt{
    name:string;
    email:string;
    password:string;
}

class CreateUserService {
    async execute({name,email,password}:Requesdt){
console.log(name,email,password)
}
}

export {CreateUserService}