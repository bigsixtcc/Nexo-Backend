import prisma from "../database/prismaClient.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import userService from "../service/userService.js";

export const register = async (req, res) => {
    try {
        const { nome, email, senha, role } = req.body

        const userExist = await prisma.user.findUnique({
            where: { email }
        })

        if (userExist) {
            return res.status(400).json({
                erro: "Email já cadastrado"
            })
        }

        const senhaHash = await bcrypt.hash(senha, 10)

        const user = await userService.createUser({
            nome,email,senha:senhaHash,role
        })
        res.status(201).json(user)

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

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

const token = jwt.sign(
    {userId: user.id},
    process.env.JWT_SECRET,
    {expiresIn: "7d"} 
);

res.json({token});

}