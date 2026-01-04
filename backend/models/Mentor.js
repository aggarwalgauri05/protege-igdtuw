const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema({
  // Basic Identity
  name: {
    type: String,
    required: true,
    trim: true
  },

  collegeEmail: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  personalEmail: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },

  contactNumber: {
    type: String,
    required: true,
    trim: true
  },

  enrollmentNumber: {
    type: String,
    required: true,
    trim: true
  },

  // Academic Details
  year: {
    type: String,
    required: true,
    enum: ["2nd year", "3rd year", "4th year"]
  },

  branch: {
    type: String,
    required: true,
    enum: [
      "CSE-AI",
      "CSE",
      "IT",
      "ECE-AI",
      "ECE",
      "AI-ML",
      "MAE",
      "DMAM",
      "Other"
    ]
  },

  // DSA Mentorship Details
  domain: {
    type: String,
    required: true,
    enum: [
      "Basic",
      "Intermediate",
      "Advanced",
      "Competitive Programming"
    ]
  },

  preferredLanguage: {
    type: String,
    required: true,
    enum: ["C++", "Java", "Python"]
  },

  platforms: {
    type: [String],
    required: true,
    enum: ["Leetcode", "Codeforces", "Codechef", "GFG", "Other"]
  },

  commitmentLevel: {
    type: String,
    required: true,
    enum: [
      "Yes, fully committed",
      "I will try my best",
      "Not sure yet"
    ]
  },

  // Mentorship Capacity
  maxMentees: {
    type: Number,
    required: true,
    min: 1
  },

  currentMentees: {
    type: Number,
    default: 0
  },

  isAvailable: {
    type: Boolean,
    default: true
  },

  // Links
  linkedInProfile: {
    type: String,
    required: true,
    trim: true
  },

  resumeLink: {
    type: String,
    required: true,
    trim: true
  },

  codingProfileLink: {
    type: String,
    required: true,
    trim: true
  },

  // Placement Info
  currentPlacement: {
    type: String,
    trim: true
  },

  // Motivation & Confirmation
  mentorMotivation: {
    type: String,
    required: true,
    trim: true
  },

  confirmation: {
    type: Boolean,
    required: true
  },

  questionsForUs: {
    type: String,
    trim: true
  },

  // System Fields
  isActive: {
    type: Boolean,
    default: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Mentor", mentorSchema);
