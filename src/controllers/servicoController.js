import servicoService from "../service/servicoService.js"

const servicoController = {
    async create(req,res){
        console.log(req.user.userId)
        try{
    const {titulo,descricao,preco,categoria,} = req.body;
    const imagem = req.file? `/uploads/${req.file.filename}`: null;

    const servico = await servicoService.create({
      titulo,
      descricao,
      preco: Number(preco),
      categoria,
      imagem,
      prestadorId: req.user.userId,
    },req.user.userId);

    res.status(201).json(servico);
        } catch(error){
            res.status(500).json({
                erro: error.message
            });
        }
    }
}

export default servicoController;