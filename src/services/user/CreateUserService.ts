import prismaclient from "../../prisma";
import bcrypt from "bcryptjs";

interface CreateUserProps{
    name:string;
    email:string;
    password:string
}

class CreateUserService{
    async execute({ name, email, password }: CreateUserProps) {
        
        const userAlreadyExists = await prismaclient.user.findFirst({
            where:{
                email:email
            }
        })
        if(userAlreadyExists){
            throw new Error("usuario existente")
        }

const passwordHash = await bcrypt.hash(password, 8);

                const user = await prismaclient.user.create({
          data:{
            name:name,
            email:email,
            password:passwordHash
          },
          select:{
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
          }
        })
                return user
    }

}

export { CreateUserService }