import prismaclient from "../../prisma";

interface CreateCategoryProps{
    name:string;
}

class CreateCategoryService{
    async execute({ name }:CreateCategoryProps){
try{
    const category = await prismaclient.category.create({
        data:{
            name: name
        },
        select:{
            id:true,
            name:true,
            createdAt:true
        }
    })

    return category

}catch(err){
    throw new Error("Falha ao tentar criar categoria:" + err)
}
    }
}

export {  CreateCategoryService}