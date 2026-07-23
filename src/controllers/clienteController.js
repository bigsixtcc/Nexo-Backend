import clienteService from "../service/clienteService.js";

export const me = async (req, res) => {

    try {

        const user = await clienteService.findByUserId(req.user.userId);

        if (!user) {
            return res.status(404).json({
                erro: "Usuário não encontrado"
            });
        }

        res.json(user);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            erro: "Erro interno do servidor"
        });

    }

};

export const update = async (req, res) => {

    try {

        const { nome, email } = req.body;

        const user = await clienteService.update(req.user.userId, {
            nome,
            email
        });

        res.json(user);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            erro: "Erro interno do servidor"
        });

    }

};

export const remove = async (req, res) => {

    try {

        await clienteService.delete(req.user.userId);

        res.json({
            mensagem: "Conta removida com sucesso"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            erro: "Erro interno do servidor"
        });

    }

};
