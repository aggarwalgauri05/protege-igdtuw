const mongoose = require('mongoose');

const menteeSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  phone: {
    type: String,
    required: true,
    trim: true
  },

  college: {
    type: String,
    required: true,
    trim: true
  },

  branch: {
    type: String,
    required: true,
    trim: true
  },

  linkedin: {
    type: String,
    trim: true
  },

  year: {
    type: String,
    required: true,
    enum: ['1st Year', '2nd Year', '3rd Year', '4th Year']
  },

  currentRole: {
    type: String,
    required: true,
    enum: ['Student', 'Working Professional', 'Alumni']
  },

  dsaLevel: {
    type: String,
    required: true,
    // ✅ FIXED: Only 3 levels to match your form
    enum: ['Beginner', 'Intermediate', 'Advanced']
  },

  preferredLanguage: {
    type: String,
    required: true,
    enum: ['C++', 'Java', 'Python']
  },

  interestedTopics: [{
    type: String,
    required: false, // ✅ FIXED: Made optional since you're removing hardcoded mapping
    enum: [
      'Arrays & Strings',
      'Recursion & Backtracking',
      'Linked Lists & Stacks',
      'Trees & BST',
      'Graphs',
      'Dynamic Programming',
      'Greedy & Sliding Window'
    ]
  }],

  platforms: [{
    type: String,
    enum: ['LeetCode', 'Codeforces', 'CodeChef']
  }],

  goals: {
    type: String,
    trim: true
  },

  // Sponsorship Task Fields
  sponsorshipTaskCompleted: {
    type: Boolean,
    required: true,
    default: false
  },

  sponsorshipScreenshot: {
    type: String, // URL or path to the uploaded screenshot
    required: true,
    trim: true
  },

  allocatedMentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mentor',
    default: null
  },

  allocatedMentorName: {
    type: String,
    trim: true,
    default: null
  },

  allocationDate: {
    type: Date,
    default: null
  },

  isActive: {
    type: Boolean,
    default: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Mentee', menteeSchema);