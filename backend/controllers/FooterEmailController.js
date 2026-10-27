const nodemailer = require("nodemailer");
require("dotenv").config();

const sendNewsletterEmail = async (req, res) => {
  const { email } = req.body;

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "onedegreeeyewear@gmail.com",
      pass: "wcwi bots xzwt cpvc",
    },
  });

  const mailOptions = {
    from: "onedegreeeyewear@gmail.com",
    to: "info@optimedcorp.com",
    subject: "Newsletter Emails Query",
    html: `
      <h2>Email Newsletter </h2>
      <h3><strong> Customer Email For Newsletter :- ${email}</strong></h3>
      <hr/> 
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Newsletter sent successfully!" });
  } catch (error) {
    console.error("Email Error:", error);
    res.status(500).json({ message: "Failed to send Newsletter" });
  }
};

module.exports = { sendNewsletterEmail };
