import agendamentoService from "../service/agendamentoService.js"

const agendamentoController = {
    async create(req,res){
        try {
            const clienteId = req.user.userId;
            console.log("Id do cliente" + clienteId)
            const {servicoId,data,horario,status} = req.body;
            const agendamneto = await agendamentoService.create({
                servicoId,clienteId,data,horario,status
            })
            return await res.status(201).json(agendamneto)
        } catch (error) {
            console.error(error)
            return res.status(500).json({erro: error.message})
        }
        
    }
}

export default agendamentoController