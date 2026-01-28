console.log("MAIL CONFIG:", {
  user: process.env.EMAIL_USER ? "SET" : "MISSING",
  pass: process.env.EMAIL_PASS ? "SET" : "MISSING"
});

const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendEmail({ to, subject, html }) {
  try {
    await transporter.sendMail({
      from: `"XSEED Mentorship" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    });

    console.log(`📧 Email queued for ${to}`);
  } catch (error) {
    console.error("❌ Email error:", error.message);
  }
}

module.exports = sendEmail;
