import { MailAdapter, SendMailData } from "../mailAdapter";
import nodemailer from 'nodemailer';

//Adicionado o Mailtrap
const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "a1ddad2795fce8",
        pass: "454d429b2a6161"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData) {

        //Parte do envio de email.
        await transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'Tester <tester.@gmail.com>',
            subject,
            html: body,
        })
    };
}
