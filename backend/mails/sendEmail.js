const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail({ to, subject, html }) {
  try {
    console.log(`🔵 Attempting to send email to: ${to}`);
    
    const data = await resend.emails.send({
      from: 'XSEED Mentorship <noreply@protege-igdtuw.in>', // ⬅️ YOUR DOMAIN
      to: [to],
      subject,
      html
    });

    console.log(`✅ Email successfully sent to ${to}`, data);
    return data;
  } catch (error) {
    console.error(`❌ Email error for ${to}:`, error.message);
    console.error('Full error:', error);
    throw error;
  }
}

module.exports = sendEmail;