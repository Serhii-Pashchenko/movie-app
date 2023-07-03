import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

class MailService {
  transport: any;
  constructor() {
    dotenv.config({ path: `.${process.env.NODE_ENV}.env` });
    this.transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  async sendActivationMail(to, link) {
    await this.transport.sendMail(
      {
        from: process.env.SMTP_USER,
        to,
        subject: 'Email activation from ' + process.env.API_URL,
        text: '',
        html: `
            <div>
                <h1>Activate your account, please</h1>
                <a href="${link}">${link} </a>
            </div>
            `,
      },
      (error, info) => {
        if (error) console.log(error);
        else console.log('Email sent: ' + info.response);
      }
    );
  }
}

export default new MailService();
