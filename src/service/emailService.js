import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
export default transporter;

export async function enviarEmail(destinatario,assunto,texto){
    console.log(destinatario);
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: destinatario,
        subject: assunto,
        text: texto
    });
}