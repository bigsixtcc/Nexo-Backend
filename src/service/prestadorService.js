import prisma from "../database/prismaClient.js"

const prestadorService = {
    async create(data) {
        return await prisma.prestador.create({
            data
        })
    },

    async findByUserId(userId) {
        return await prisma.prestador.findUnique({
            where: {
                userId
            },
            include:{
                user: true
            }
        })
    }
}

export default prestadorService