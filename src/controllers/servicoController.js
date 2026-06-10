import servicoService from "../service/servicoService.js"

const servicoController = {
    async create(req,res){
        try{
            console.log(req.user.userId);
            const servico = await servicoService.create(req.body, req.user.userId);
            
            return res.status(201).json(servico);

        } catch(error){
            res.status(500).json({
                erro: error.message
            });
        }
    }
}

export default servicoController;