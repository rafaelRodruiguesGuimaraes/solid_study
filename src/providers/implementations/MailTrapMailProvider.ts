import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'

import { IMailProvider, IMessage } from '../IMailProvider';

export class MailTrapMailProvider implements IMailProvider {
    private transporter: Mail;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.mailtrap.io',
            port: 2525,
            auth: {
                user: '0ca7d768877694',
                pass: 'ecf3b822c52e6b'
            }
        });
    };

    async sendMail(message: IMessage): Promise<void> {
        await this.transporter.sendMail({
            to: {
                name: message.to.name,
                address: message.to.address
            },
            from: {
                name: message.from.name,
                address: message.from.address
            },
            subject: message.subject,
            html: message.body,
        });
    };
};
