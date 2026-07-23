import prisma from "../database/prismaClient.js";


const userService = {
    async createUser(data){
        return await prisma.user.create({
            data
        })
    },
    async findByEmail(email){
        return await prisma.user.findUnique({
            where:{email}
        })
    },
    async findById(Id){
        return await prisma.user.findUnique({
            where:{id}
        })
    },
}

export default userService;