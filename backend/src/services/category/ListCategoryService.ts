import prismaclient from "../../prisma"

class ListCategoryService{
    async execute(){
try{
     const categories = prismaclient.category.findMany({
    select:{
        id: true,
        name:true,
        createdAt:true
    },
    orderBy:{
        createdAt: "desc"
    }
})
return categories
}catch(err){
    throw new Error("Falha ao buscar categoria")
}
    }
}

export { ListCategoryService }