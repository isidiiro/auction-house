const nodemailer = require("nodemailer");

const config = {
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: `${process.env.SENDER_EMAIL}`,
    pass: `${process.env.SENDER_PASS}`,
  },
};

const send = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const transporter = nodemailer.createTransport(config);
      transporter.sendMail(data, (err, info) => {
        if (err) {
          console.error(err);
          resolve({
            error: err,
            status_code: 400,
          });
        } else {
          resolve({
            data: info.response,
            status_code: 200,
          });
        }
      });
    } catch (err) {
      console.error(err);
      reject({
        error: err,
        status_code: 500,
      });
    }
  });
};

module.exports = send;
