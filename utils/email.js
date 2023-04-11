const nodemailer = require('nodemailer');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Nikita Lavro <${process.env.EMAIL_FROM}>`;
  }

  createTransport() {
    if (process.env.NODE_ENV === 'production') {
      //Sendgrid
      return 1;
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }
};

const sendEmail = async (options) => {
  //2) Define the email options
  const mailOptions = {
    from: 'Nikita Lavro <lavronikita.dev@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  //3) Actually send the email
  await transporter.sendMail(mailOptions);
};
