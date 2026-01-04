const express = require('express');
const router = express.Router();
const Mentee = require('../models/Mentee');
const Mentor = require('../models/Mentor');

// Helper function to get numeric value for DSA levels
const getDSALevelValue = (level) => {
  const levels = {
    'Beginner': 1,
    'Intermediate': 2,
    'Strong Intermediate': 3,
    'Advanced': 4,
    'Competitive Programmer': 5,
    // New schema mappings
    'Basic': 1,
    'Intermediate': 2,
    'Advanced': 3,
    'Competitive Programming': 4
  };
  return levels[level] || 0;
};

// Helper function to get max mentees as number
const getMaxMenteesNumber = (maxMentees) => {
  return parseInt(maxMentees) || 1;
};

// Automatic mentor allocation algorithm
const allocateMentor = async (menteeData) => {
  try {
    const menteeLevel = getDSALevelValue(menteeData.dsaLevel);
    
    // Find available mentors with higher or equal DSA level
    const availableMentors = await Mentor.find({
      isActive: true,
      isAvailable: true,
      domain: {
        $in: ['Intermediate', 'Advanced', 'Competitive Programming']
      }
    });

    // Filter mentors based on criteria
    const suitableMentors = availableMentors.filter(mentor => {
      const mentorLevel = getDSALevelValue(mentor.domain);
      const maxMentees = getMaxMenteesNumber(mentor.maxMentees);
      
      // Check if mentor level is higher than mentee level
      const levelMatch = mentorLevel >= menteeLevel;
      
      // Check if mentor has available slots
      const hasSlots = mentor.currentMentees < maxMentees;
      
      // Check for common platforms (normalize platform names)
      const commonPlatforms = mentor.platforms.some(platform => {
        const normalizedMentorPlatform = platform.toLowerCase().replace('leetcode', 'leetcode');
        return menteeData.platforms.some(menteePlatform => {
          const normalizedMenteePlatform = menteePlatform.toLowerCase();
          return normalizedMentorPlatform === normalizedMenteePlatform ||
                 (normalizedMentorPlatform === 'leetcode' && normalizedMenteePlatform === 'leetcode') ||
                 (normalizedMentorPlatform === 'codeforces' && normalizedMenteePlatform === 'codeforces') ||
                 (normalizedMentorPlatform === 'codechef' && normalizedMenteePlatform === 'codechef');
        });
      });
      
      return levelMatch && hasSlots && commonPlatforms;
    });

    if (suitableMentors.length === 0) {
      return null; // No suitable mentor found
    }

    // Prioritize mentors by:
    // 1. Preferred language match
    // 2. Lower current mentee count (less busy)
    // 3. Higher DSA level
    const prioritizedMentors = suitableMentors.sort((a, b) => {
      // Language match priority
      const aLangMatch = a.preferredLanguage === menteeData.preferredLanguage ? 1 : 0;
      const bLangMatch = b.preferredLanguage === menteeData.preferredLanguage ? 1 : 0;
      
      if (aLangMatch !== bLangMatch) {
        return bLangMatch - aLangMatch; // Higher language match first
      }
      
      // Lower mentee count priority (less busy mentor)
      if (a.currentMentees !== b.currentMentees) {
        return a.currentMentees - b.currentMentees;
      }
      
      // Higher DSA level priority
      const aLevel = getDSALevelValue(a.domain);
      const bLevel = getDSALevelValue(b.domain);
      return bLevel - aLevel;
    });

    return prioritizedMentors[0]; // Return best match
  } catch (error) {
    throw new Error(`Mentor allocation failed: ${error.message}`);
  }
};

// POST - Register mentee and allocate mentor
router.post('/register', async (req, res) => {
  try {
    // Check if mentee already exists
    const existingMentee = await Mentee.findOne({ email: req.body.email });
    if (existingMentee) {
      return res.status(400).json({
        success: false,
        message: 'Mentee with this email already exists'
      });
    }

    // Create new mentee
    const menteeData = new Mentee(req.body);
    
    // Allocate mentor
    const allocatedMentor = await allocateMentor(req.body);
    
    if (allocatedMentor) {
      // Update mentee with allocated mentor
      menteeData.allocatedMentor = allocatedMentor._id;
      menteeData.allocationDate = new Date();
      
      // Save mentee
      await menteeData.save();
      
      // Update mentor's current mentee count
      const maxMentees = getMaxMenteesNumber(allocatedMentor.maxMentees);
      const newMenteeCount = allocatedMentor.currentMentees + 1;
      
      await Mentor.findByIdAndUpdate(
        allocatedMentor._id,
        {
          currentMentees: newMenteeCount,
          isAvailable: newMenteeCount < maxMentees // Mark unavailable if slots full
        }
      );

      // Populate mentor details for response
      await menteeData.populate('allocatedMentor');
      
      res.status(201).json({
        success: true,
        message: 'Mentee registered and mentor allocated successfully!',
        data: {
          mentee: menteeData,
          mentor: {
            name: allocatedMentor.name,
            email: allocatedMentor.personalEmail,
            expertise: allocatedMentor.domain,
            language: allocatedMentor.preferredLanguage,
            platforms: allocatedMentor.platforms,
            profileUrl: allocatedMentor.linkedInProfile
          }
        }
      });
    } else {
      // No mentor available - still save mentee
      await menteeData.save();
      
      res.status(201).json({
        success: true,
        message: 'Mentee registered successfully. You have been added to the waiting list. We will allocate a mentor as soon as one becomes available.',
        data: {
          mentee: menteeData,
          mentor: null,
          waitingList: true
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
      error: error.message
    });
  }
});

// GET all mentees
router.get('/', async (req, res) => {
  try {
    const mentees = await Mentee.find({ isActive: true }).populate('allocatedMentor');
    res.json({
      success: true,
      count: mentees.length,
      data: mentees
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching mentees',
      error: error.message
    });
  }
});

// GET mentee by ID
router.get('/:id', async (req, res) => {
  try {
    const mentee = await Mentee.findById(req.params.id).populate('allocatedMentor');
    if (!mentee) {
      return res.status(404).json({
        success: false,
        message: 'Mentee not found'
      });
    }
    res.json({
      success: true,
      data: mentee
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching mentee',
      error: error.message
    });
  }
});

// GET mentees without mentors (waiting list)
router.get('/waiting-list', async (req, res) => {
  try {
    const waitingMentees = await Mentee.find({ 
      isActive: true, 
      allocatedMentor: null 
    });
    res.json({
      success: true,
      count: waitingMentees.length,
      data: waitingMentees
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching waiting list',
      error: error.message
    });
  }
});

module.exports = router;