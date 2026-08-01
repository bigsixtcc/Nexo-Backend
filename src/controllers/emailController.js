import transporter from "../service/emailService.js";
import { enviarEmail } from "../service/emailService.js";
import userService from "../service/userService.js";
export const enviarEmailTeste = async(req,res) => {
    try{
        const emailUser = req.body.email
        console.log(emailUser)
        if(!emailUser){
            return res.status(400).json({message: "O email é obrigatório"});
        }
    await enviarEmail(emailUser,"Teste de envio","Parabens enjfshk");

    return res.status(200).json({message: "Sucesso ao enviar email"})
    }catch(error){
        console.error(error)
        return res.status(500).json({message:"Erro ao enviar email"});
    }   
}

export async function verificarEmail(req, res) {
    try {
        const { token } = req.query

        if (!token) {
            return res.status(400).json({ erro: "Token não informado" })
        }

        const user = await userService.findByVerificationToken(token)

        if (!user) {
            return res.status(400).json({ erro: "Token inválido" })
        }

        if (user.tokenVerificacaoExpira < new Date()) {
            return res.status(400).json({ erro: "Token expirado, solicite um novo" })
        }

        if (user.emailVerificado) {
            return res.status(200).json({ mensagem: "Email já verificado" })
        }

        await userService.marcarEmailVerificado(user.id)

        res.status(200).json({ mensagem: "Email verificado com sucesso!" })

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}