import nodemailer from 'nodemailer'
import type { Transporter } from 'nodemailer'


export interface SendEmailOptions {
    to: string | string[]
    subject: string,
    htmlBody: string,
    attachments?: Attachment
}

interface Attachment {
    filename: string,
    path: string,
}

export class EmailService {
    private transporter: Transporter;
    constructor(
        mailerService: string,
        mailerEmail: string,
        sendEmailPassword: string,
        private readonly postToProvider: boolean,
    ){
        this.transporter = nodemailer.createTransport({
            service: mailerService,
            auth: {
                user: mailerEmail,
                pass: sendEmailPassword,
            }
        })
    }

    async sendEmail(options: SendEmailOptions) {
        const {to, subject, htmlBody, attachments = []} = options;
        try {
            await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                //attachments: attachments
            })
        } catch(err) {
            console.log(err)
        }
    }
}