const mongoose = require('mongoose');
const Mentor = require('./models/Mentor');
require('dotenv').config();

async function addDummyMentors() {
  await mongoose.connect(process.env.MONGODB_URI);

  const dummyMentors = [
    {
      name: "Gauri Test Mentor 1",
      collegeEmail: "malhotradisha2710@gmail.com",
      personalEmail: "malhotradisha2710@gmail.com",
      contactNumber: "9999999999",
      enrollmentNumber: "TEST001",
      year: "4th year",
      branch: "CSE",
      domain: "Advanced",
      preferredLanguage: "Java",
      platforms: ["LeetCode", "Codeforces"],
      commitmentLevel: "Yes, fully committed",
      maxMentees: 5,
      linkedInProfile: "https://linkedin.com/in/test",
      resumeLink: "https://example.com/resume",
      codingProfileLink: "https://leetcode.com/",
      mentorMotivation: "Dummy mentor for email testing",
      confirmation: true
    },
    {
      name: "Gauri Test Mentor 2",
      collegeEmail: "aggarwalgauri05@gmail.com",
      personalEmail: "aggarwalgauri05@gmail.com",
      contactNumber: "8888888888",
      enrollmentNumber: "TEST002",
      year: "4th year",
      branch: "CSE",
      domain: "Advanced",
      preferredLanguage: "Java",
      platforms: ["LeetCode", "Codeforces"],
      commitmentLevel: "Yes, fully committed",
      maxMentees: 5,
      linkedInProfile: "https://linkedin.com/in/test",
      resumeLink: "https://example.com/resume",
      codingProfileLink: "https://leetcode.com/",
      mentorMotivation: "Dummy mentor for email testing",
      confirmation: true
    }
  ];

  await Mentor.insertMany(dummyMentors);
  console.log("✅ Dummy mentors added");

  await mongoose.disconnect();
}

addDummyMentors();
