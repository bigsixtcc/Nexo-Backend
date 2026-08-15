import prisma from "../database/prismaClient.js";

const agendamentoService = {
    async create({servicoId,data,horario,clienteId}){
        return await prisma.agendamento.create({
            data : {
                data: new Date(data),
                horario,
                status : "marcado",

                servico: {
                    connect: {
                        id : Number(servicoId)
                    }
                },
                cliente:{
                    connect:{
                        id : Number(clienteId)
                    }
                }
            }
        });
    }
}

export default agendamentoService;