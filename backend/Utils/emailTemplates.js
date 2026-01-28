// 🌱 XSEED – Mentee Email
const menteeEmailTemplate = (mentee, mentor) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.6;">
    <h2>🌟 Welcome to XSEED Mentorship Program!</h2>

    <p>Hi <b>${mentee.fullName}</b> 💖,</p>

    <p>
      We’re super excited to tell you that your mentor has been successfully
      allocated under <b>XSEED</b> – our mentorship initiative designed to help
      you grow, learn, and shine 🌱✨
    </p>

    <h3>👨‍🏫 Your Mentor Details</h3>
    <ul>
      <li><b>Name:</b> ${mentor.name}</li>
      <li><b>Email:</b> ${mentor.personalEmail}</li>
      <li><b>LinkedIn:</b> <a href="${mentor.linkedInProfile}" target="_blank">
        ${mentor.linkedInProfile}
      </a></li>
    </ul>

    <h3>💬 Join the XSEED Mentees WhatsApp Community</h3>
    <p>
      Connect with fellow mentees, stay updated, and be part of the XSEED vibe 🚀
    </p>
    <p>
      👉 <a href="https://chat.whatsapp.com/DUMMY_XSEED_LINK" target="_blank">
      Join WhatsApp Community
      </a>
    </p>

    <p>
      This journey is all about consistency, curiosity, and confidence 💪🌸  
      Don’t hesitate to ask questions, make mistakes, and learn together.
    </p>

    <p>
      We’re rooting for you all the way 💙<br/>
      <b>Team XSEED</b>
    </p>
  </div>
`;


// 🌱 XSEED – Mentor Email
const mentorEmailTemplate = (mentor, mentee) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.6;">
    <h2>🌟 Welcome to XSEED Mentorship!</h2>

    <p>Hi <b>${mentor.name}</b> 🌼,</p>

    <p>
      Thank you for being a part of <b>XSEED</b> 💙  
      You’ve been assigned a mentee, and we’re excited to see the impact you’ll create!
    </p>

    <h3>👩‍🎓 Mentee Details</h3>
    <ul>
      <li><b>Name:</b> ${mentee.fullName}</li>
      <li><b>Email:</b> ${mentee.email}</li>
      <li><b>Year:</b> ${mentee.year}</li>
      <li><b>Branch:</b> ${mentee.branch || '—'}</li>
      <li><b>Phone:</b> ${mentee.phone || '—'}</li>
    </ul>

    <p>
      Your guidance can truly shape someone’s journey 🌱✨  
      Thank you for taking out time and sharing your experience.
    </p>

    <p>
      With gratitude ❤️<br/>
      <b>Team XSEED</b>
    </p>
  </div>
`;

module.exports = {
  menteeEmailTemplate,
  mentorEmailTemplate
};
