const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

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

  //Send the actual email
  send(template, subject) {
    // 1) Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/..views/emails/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text: htmlToText.fromString(html),
      html,
    };
    // 3) Create a transport and send email
  }

  sendWelcome() {
    this.send('welcome', 'Welcome to the Natours family');
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
