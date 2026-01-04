const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

// Test mentee data
const testMentees = [
  {
    fullName: "Rahul Kumar",
    email: "rahul.kumar@gmail.com",
    currentRole: "Student",
    dsaLevel: "Intermediate",
    preferredLanguage: "C++",
    interestedTopics: ["Arrays & Strings", "Dynamic Programming"],
    platforms: ["LeetCode", "Codeforces"],
    goals: "Want to improve problem-solving skills for placements"
  },
  {
    fullName: "Isha Malhotra",
    email: "isha.malhotra@gmail.com",
    currentRole: "Student",
    dsaLevel: "Beginner",
    preferredLanguage: "Python",
    interestedTopics: ["Arrays & Strings", "Recursion & Backtracking"],
    platforms: ["LeetCode"],
    goals: "Starting DSA journey, need guidance on basics"
  },
  {
    fullName: "Vikram Singh",
    email: "vikram.singh@gmail.com",
    currentRole: "Working Professional",
    dsaLevel: "Strong Intermediate",
    preferredLanguage: "Java",
    interestedTopics: ["Trees & BST", "Graphs"],
    platforms: ["LeetCode", "CodeChef"],
    goals: "Preparing for senior developer interviews"
  }
];

const testMentorAllocation = async () => {
  console.log('🧪 Testing Mentor Allocation System\n');
  
  for (let i = 0; i < testMentees.length; i++) {
    const mentee = testMentees[i];
    console.log(`${i + 1}. Testing registration for: ${mentee.fullName}`);
    console.log(`   DSA Level: ${mentee.dsaLevel}`);
    console.log(`   Language: ${mentee.preferredLanguage}`);
    console.log(`   Platforms: ${mentee.platforms.join(', ')}\n`);
    
    try {
      const response = await axios.post(`${API_BASE}/mentees/register`, mentee);
      
      if (response.data.success) {
        if (response.data.data.mentor) {
          console.log(`   ✅ SUCCESS: Mentor allocated!`);
          console.log(`   👨‍🏫 Mentor: ${response.data.data.mentor.name}`);
          console.log(`   🎯 Expertise: ${response.data.data.mentor.expertise}`);
          console.log(`   💻 Language: ${response.data.data.mentor.language}`);
          console.log(`   🔗 Profile: ${response.data.data.mentor.profileUrl}\n`);
        } else {
          console.log(`   ⏳ Added to waiting list - No suitable mentor available\n`);
        }
      }
    } catch (error) {
      console.log(`   ❌ ERROR: ${error.response?.data?.message || error.message}\n`);
    }
    
    // Wait 1 second between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // Show current mentor availability
  try {
    console.log('📊 Current Mentor Availability:');
    const mentorsResponse = await axios.get(`${API_BASE}/mentors`);
    const mentors = mentorsResponse.data.data;
    
    mentors.forEach(mentor => {
      const maxMentees = mentor.maxMentees;
      const available = mentor.currentMentees < maxMentees;
      console.log(`   ${mentor.name}: ${mentor.currentMentees}/${mentor.maxMentees} mentees ${available ? '✅' : '❌'}`);
    });
    
  } catch (error) {
    console.log('Error fetching mentor data:', error.message);
  }
};

// Run the test
testMentorAllocation().catch(console.error);