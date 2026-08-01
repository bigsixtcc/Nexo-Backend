import prisma from "../database/prismaClient.js";


const userService = {
    async createUser(data){
        return await prisma.user.create({
            data
        })
    },
    async deleteUser(email){
        return await prisma.user.delete({
            where: {email}
        })
    },
    async resetPassword(id,data){
        return await prisma.user.update({
            where:{id},
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
    async findByEmail(email){
        return await prisma.user.findUnique({
            where:{email: email}
        })
    },
    async findByVerificationToken(token) {
    return prisma.user.findUnique({
        where: { tokenVerificacao: token }
    })
    },

 async marcarEmailVerificado(userId) {
    return prisma.user.update({
        where: { id: userId },
        data: {
            emailVerificado: true,
            tokenVerificacao: null,
            tokenVerificacaoExpira: null
        }
    })
    },

 async salvarTokenVerificacao(userId, token, expira) {
    return prisma.user.update({
        where: { id: userId },
        data: {
            tokenVerificacao: token,
            tokenVerificacaoExpira: expira
        }
    })
    }
}
export default userService;

 