// 🌱 XSEED – Mentee Email (Professional Version)
const menteeEmailTemplate = (mentee, mentor) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    
    <h2>🌟 Welcome to the XSEED Mentorship Program!</h2>

    <p>Hi <b>${mentee.fullName}</b>,</p>

    <p>
      We’re excited to share that your mentor has been successfully allocated
      under <b>XSEED</b> — the mentorship initiative by <b>Protege</b>, designed
      to support your learning and growth.
    </p>

    <h3>👨‍🏫 Your Mentor Details</h3>
    <ul>
      <li><b>Name:</b> ${mentor.name}</li>
      <li><b>Email:</b> ${mentor.personalEmail}</li>
      <li><b>Phone:</b> ${mentor.contactNumber}</li>
      <li>
        <b>LinkedIn:</b>
        <a href="${mentor.linkedInProfile}" target="_blank">
          ${mentor.linkedInProfile}
        </a>
      </li>
    </ul>

    <h3>💬 XSEED Mentees WhatsApp Community</h3>
    <p>
      This community is for all XSEED mentees — to stay informed, connect with
      peers, and receive important updates.
    </p>
    <p>
      👉 <a href="https://chat.whatsapp.com/DUMMY_XSEED_LINK" target="_blank">
        Join WhatsApp Community
      </a>
    </p>

    <p>
      We encourage you to take the first step by reaching out to your mentor,
      introducing yourself, and discussing how you’d like to begin.
    </p>

    <p>
      Approach this journey with consistency, curiosity, and openness to
      learning — it’s okay to ask questions and make mistakes along the way.
    </p>

    <p>
      Wishing you a meaningful mentorship experience.<br/><br/>
      Warm regards,<br/>
      <b>Team Protege</b><br/>
      <span style="color:#6b7280;">XSEED Mentorship Program</span>
    </p>
  </div>
`;

// 🌱 XSEED – Mentor Email (Professional Version)
const mentorEmailTemplate = (mentor, mentee) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    
    <h2>🌟 XSEED Mentorship Program – Mentee Allocation</h2>

    <p>Hi <b>${mentor.name}</b>,</p>

    <p>
      Thank you for being a part of <b>XSEED</b>, the mentorship initiative by
      <b>Protege</b>. We truly appreciate your willingness to mentor and guide
      fellow students.
    </p>

    <p>
      A mentee has been assigned to you. Below are their details:
    </p>

    <h3>👩‍🎓 Mentee Details</h3>
    <ul>
      <li><b>Name:</b> ${mentee.fullName}</li>
      <li><b>Email:</b> ${mentee.email}</li>
      <li><b>Phone:</b> ${mentee.phone || '—'}</li>
      <li><b>Year:</b> ${mentee.year}</li>
      <li><b>Branch:</b> ${mentee.branch === 'MC' ? 'Mathematics and Computing' : mentee.branch}</li>
    </ul>

    <p>
      We request you to initiate the first interaction and guide the mentee
      regarding expectations, communication preferences, and next steps.
    </p>

    <p>
      Your mentorship can make a lasting impact — thank you for contributing
      your time and experience.
    </p>

    <p>
      With appreciation,<br/>
      <b>Team Protege</b><br/>
      <span style="color:#6b7280;">XSEED Mentorship Program</span>
    </p>
  </div>
`;

module.exports = {
  menteeEmailTemplate,
  mentorEmailTemplate
};
