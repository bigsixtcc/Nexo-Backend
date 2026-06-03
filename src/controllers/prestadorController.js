import prestadorService from "../service/prestadorService.js"

export const createPrestador = async (req, res) => {
    try {
        const { descricao, precoHora, experiencia } = req.body
        console.log('Body: ',req.body);
        const prestadorExist = await prestadorService.findByUserId(
            req.user.userId
        )

        if (prestadorExist) {
            return res.status(400).json({
                erro: "Usuário já possui perfil prestador"
            })
        }

        const prestador = await prestadorService.create({

            descricao,
            precoHora,
            experiencia,

            userId: req.user.userId
        })

        res.status(201).json(prestador)

    } catch (error) {

        console.log(error)

        res.status(500).json(error)
    }
}