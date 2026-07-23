import prisma from "../database/prismaClient.js"

const clienteService = {
async findByUserId(id) {
        return await prisma.user.findUnique({
            where: {
                id
           } })
        },
async update(id,data) {
    return await prisma.user.update({
        where: { id },
        data
    })
 }, 

 async delete(id) {
    return await prisma.user.delete({
        where: {id}
    })
 }
}

export default clienteService