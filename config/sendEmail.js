require('dotenv').config();
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (to, subject, html) => {
  const msg = {
    to: 'faizanmehmoodx@gmail.com', 
    from: 'possbly@comtechradix.com', 
    subject,
    html ,
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Error sending email');
  }
};

module.exports = sendEmail;
