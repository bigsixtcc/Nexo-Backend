import prisma from "../database/prismaClient.js"
import bcrypt from "bcrypt"
import crypto from "crypto"
import jwt from "jsonwebtoken"
import userService from "../service/userService.js";
import { enviarEmail } from "../service/emailService.js";

export async function login(req,res){
    const {email,senha} = req.body;

    const user = await userService.findByEmail(email);

    if(!user){
        return res.status(401).json({
            error: "Email inválido"
        })
    }

    const passwordMatch = await bcrypt.compare(
        senha,user.senha
    );

    if(!passwordMatch){
        return res.status(401).json({
            error: "Senha inválida"
        })
    }

    if(!user.emailVerificado){
        return res.status(401).json({
            error: "Primeiro verifique o seu email"
        })
    }
const token = jwt.sign(
    {userId: user.id},
    process.env.JWT_SECRET,
    {expiresIn: "7d"} 
);

res.json({token});

}

export const register = async (req, res) => {
    try {
        const { nome, email, senha, role } = req.body

        const userExist = await prisma.user.findUnique({
            where: { email }
        })
        console.log(userExist)
        if (userExist) {
            return res.status(400).json({
                erro: "Email já cadastrado"
            })
        }

        const senhaHash = await bcrypt.hash(senha, 10)

        const user = await userService.createUser({
            nome, email, senha: senhaHash, role
        })

        // gera token de verificação
        const token = crypto.randomBytes(32).toString("hex")
        console.log(token)
        const expira = new Date(Date.now() + 1000 * 60 * 60) // 1h

        await userService.salvarTokenVerificacao(user.id, token, expira)

        const link = `${process.env.FRONTEND_URL}/verificar-email?token=${token}`

        await enviarEmail(
            email,
            "Confirme seu email - Nexo",
            `Olá ${nome}, confirme seu cadastro clicando no link: ${link}\n\nEsse link expira em 1 hora.`
        )

        res.status(201).json({
            ...user,
            mensagem: "Cadastro realizado. Verifique seu email para ativar a conta."
        })

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

export const refreshAutentification = async (req,res) =>{
    try{
    const {email} = req.body;
    const userExits = await prisma.user.findUnique({where:{email}});
    if(!userExits){
        return res.status(400).json({erro:"Usuário não existe"})
    }

    const token = crypto.randomBytes(32).toString("hex")
    console.log(token)
    const expira = new Date(Date.now() + 1000 * 60 * 60) // 1h

    await userService.salvarTokenVerificacao(userExits.id, token, expira);
    const link = `${process.env.FRONTEND_URL}/verificar-email?token=${token}`

    await enviarEmail(email,"Confirme seu email - Nexo",`Olá, confirme seu cadastro clicando no link: ${link}\n\nEsse link expira em 1 hora.`)
    return res.status(200).json({message:"Email enviado com sucesso"})

    }catch(erro){
        console.error(erro);
        return res.status(500).json({message:"Não foi possivel enviar o email de autentificação"})
    }
    
}

export const deleteUser = async (req,res)=>{
    try{
        const {email} = req.body;
        console.log(email);
        const user = await userService.findByEmail(email);
        console.log(user);
        
        if(!user){
            return res.status(400).json({
             error: "Email não cadastrado"
            })
        }
        userService.deleteUser(email);

        return res.status(201).json({message: "Usuário deletado com sucesso"})
    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}

export const resetPasswordEmail = async(req,res) =>{
    try{
        const email = req.body.email
        const userExits = await prisma.user.findUnique({where:{email}});
        if(!userExits){
            return res.status(400).json({erro:"Usuário não existe"})
        }

        const pin = crypto.randomInt(100000, 1000000).toString();
        console.log(pin)
        const expira = new Date(Date.now() + 1000 * 60 * 60) // 1h

        await userService.salvarTokenVerificacao(userExits.id, pin, expira);
        const link = `${process.env.FRONTEND_URL}/verificar-email?token=${pin}`

        await enviarEmail(email,"Confirme seu email - Nexo",`Olá, confirme seu cadastro clicando no link: ${link}\n\nEsse link expira em 1 hora.`)
        return res.status(200).json({message:"Email enviado com sucesso"})


    }catch(erro){
        console.error(erro)
        return res.status(500).json({message:"Erro ao enviar email para resetar a senha"})
    }
}
//CRIAR METODO QUE PEGA O PIN E POSSIBILITA O RESET DA SENHA
