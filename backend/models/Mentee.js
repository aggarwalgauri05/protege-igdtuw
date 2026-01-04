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
  currentRole: {
    type: String,
    required: true,
    enum: ['Student', 'Working Professional', 'Alumni']
  },
  dsaLevel: {
    type: String,
    required: true,
    enum: ['Beginner', 'Intermediate', 'Strong Intermediate', 'Advanced']
  },
  preferredLanguage: {
    type: String,
    required: true,
    enum: ['C++', 'Java', 'Python']
  },
  interestedTopics: [{
    type: String,
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
  allocatedMentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mentor',
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