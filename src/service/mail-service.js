import nodemailer from 'nodemailer';
import config from '../config/index.js';

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: config.smtp.host,
            port: config.smtp.port,
            secure: false,
            auth: {
                user: config.smtp.user,
                pass: config.smtp.password,
            }
        })
    }

    async sendActivationMail(to, link) {
        try {
            await this.transporter.sendMail({
                from:config.smtp.user,
                to,
                subject: `Активация аккаунта на ${config.apiUrl}`,
                text: '',
                html:
                    `
                        <div>
                            <h1>Для активации перейдите по ссылке</h1>
                            <a href="${link}">${link}</a>
                        </div>
                    `
            })
        } catch (e) {
            console.error(e)
        }
    }
}

export default new MailService();