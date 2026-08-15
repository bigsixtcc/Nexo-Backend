import prisma from "../database/prismaClient.js"

const servicoService = {
    async create(data, userId){

        const prestador = await prisma.prestador.findUnique({
            where:{
                userId
            }
        })

        return await prisma.servico.create({
            data:{
            titulo: data.titulo,
            descricao: data.descricao,
            preco: data.preco,
            categoria:data.categoria,
            imagem:data.imagem,
            prestadorId: prestador.id
            }
        }) ;
    },
    async findById(data, servicoId){
        return await prisma.servico.findUnique({
            where:{servicoId}
        }) 
    }
}

export default servicoService;