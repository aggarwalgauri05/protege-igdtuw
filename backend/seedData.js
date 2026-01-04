const mongoose = require('mongoose');
const Mentor = require('./models/Mentor');
require('dotenv').config();

const dummyMentors = [
  {
    name: "Arjun Sharma",
    collegeEmail: "arjun.sharma@igdtuw.ac.in",
    personalEmail: "arjun.sharma@gmail.com",
    contactNumber: "+91-9876543210",
    enrollmentNumber: "02-03-2021-10-001",
    year: "4th year",
    branch: "CSE",
    domain: "Advanced",
    preferredLanguage: "C++",
    platforms: ["Leetcode", "Codeforces"],
    commitmentLevel: "Yes, fully committed",
    maxMentees: 3,
    linkedInProfile: "https://linkedin.com/in/arjunsharma",
    resumeLink: "https://drive.google.com/file/d/arjun-resume",
    codingProfileLink: "https://leetcode.com/arjunsharma",
    currentPlacement: "SDE-2 @ Google",
    mentorMotivation: "I want to help juniors navigate their DSA journey and share my experience in competitive programming.",
    confirmation: true
  },
  {
    name: "Priya Singh",
    collegeEmail: "priya.singh@igdtuw.ac.in",
    personalEmail: "priya.singh@gmail.com",
    contactNumber: "+91-9876543211",
    enrollmentNumber: "02-03-2020-10-045",
    year: "4th year",
    branch: "CSE-AI",
    domain: "Competitive Programming",
    preferredLanguage: "Python",
    platforms: ["Leetcode", "Codechef"],
    commitmentLevel: "Yes, fully committed",
    maxMentees: 2,
    linkedInProfile: "https://linkedin.com/in/priyasingh",
    resumeLink: "https://drive.google.com/file/d/priya-resume",
    codingProfileLink: "https://leetcode.com/priyasingh",
    currentPlacement: "ML Lead @ Microsoft",
    mentorMotivation: "Passionate about helping students excel in algorithmic thinking and problem-solving.",
    confirmation: true
  },
  {
    name: "Rohan Gupta",
    collegeEmail: "rohan.gupta@igdtuw.ac.in",
    personalEmail: "rohan.gupta@gmail.com",
    contactNumber: "+91-9876543212",
    enrollmentNumber: "02-03-2022-10-033",
    year: "3rd year",
    branch: "IT",
    domain: "Intermediate",
    preferredLanguage: "Java",
    platforms: ["Leetcode", "GFG"],
    commitmentLevel: "I will try my best",
    maxMentees: 1,
    linkedInProfile: "https://linkedin.com/in/rohangupta",
    resumeLink: "https://drive.google.com/file/d/rohan-resume",
    codingProfileLink: "https://leetcode.com/rohangupta",
    mentorMotivation: "Want to share my learning experience and help peers understand DSA concepts better.",
    confirmation: true
  },
  {
    name: "Ananya Das",
    collegeEmail: "ananya.das@igdtuw.ac.in",
    personalEmail: "ananya.das@gmail.com",
    contactNumber: "+91-9876543213",
    enrollmentNumber: "02-03-2021-10-067",
    year: "4th year",
    branch: "ECE-AI",
    domain: "Advanced",
    preferredLanguage: "C++",
    platforms: ["Codeforces", "Codechef"],
    commitmentLevel: "Yes, fully committed",
    maxMentees: 4,
    linkedInProfile: "https://linkedin.com/in/ananyadas",
    resumeLink: "https://drive.google.com/file/d/ananya-resume",
    codingProfileLink: "https://codeforces.com/profile/ananyadas",
    currentPlacement: "DevOps @ AWS",
    mentorMotivation: "Love teaching and helping students build strong problem-solving foundations.",
    confirmation: true
  },
  {
    name: "Karan Mehta",
    collegeEmail: "karan.mehta@igdtuw.ac.in",
    personalEmail: "karan.mehta@gmail.com",
    contactNumber: "+91-9876543214",
    enrollmentNumber: "02-03-2020-10-089",
    year: "4th year",
    branch: "AI-ML",
    domain: "Competitive Programming",
    preferredLanguage: "Python",
    platforms: ["Leetcode", "Codeforces", "Codechef"],
    commitmentLevel: "Yes, fully committed",
    maxMentees: 3,
    linkedInProfile: "https://linkedin.com/in/karanmehta",
    resumeLink: "https://drive.google.com/file/d/karan-resume",
    codingProfileLink: "https://leetcode.com/karanmehta",
    currentPlacement: "DS @ Netflix",
    mentorMotivation: "Excited to guide students through advanced algorithms and competitive programming strategies.",
    confirmation: true
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/protege-mentorship');
    console.log('✅ Connected to MongoDB');

    // Clear existing data and indexes
    await Mentor.collection.drop().catch(() => console.log('Collection did not exist'));
    console.log('🗑️ Cleared existing mentor data and indexes');

    // Insert dummy data
    const mentors = await Mentor.insertMany(dummyMentors);
    console.log(`🚀 Successfully seeded ${mentors.length} mentors!`);

    // Display seeded data
    console.log('\n📋 Seeded Mentors:');
    mentors.forEach((mentor, index) => {
      console.log(`${index + 1}. ${mentor.name} - ${mentor.year} ${mentor.branch} (${mentor.domain})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDatabase();