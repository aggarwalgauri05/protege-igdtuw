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

// Helper function to get numeric value for year
const getYearValue = (year) => {
  const years = {
    '1st Year': 1,
    '2nd Year': 2,
    '3rd Year': 3,
    '4th Year': 4,
    // Also support mentor format
    '2nd year': 2,
    '3rd year': 3,
    '4th year': 4
  };
  return years[year] || 0;
};

// Helper function to get max mentees as number
const getMaxMenteesNumber = (maxMentees) => {
  return parseInt(maxMentees) || 1;
};

// Automatic mentor allocation algorithm
const allocateMentor = async (menteeData) => {
  try {
    const menteeLevel = getDSALevelValue(menteeData.dsaLevel);
    const menteeYearValue = getYearValue(menteeData.year);
    
    // Find available mentors with higher or equal DSA level
    const availableMentors = await Mentor.find({
      isActive: true,
      domain: {
        $in: ['Intermediate', 'Advanced', 'Competitive Programming']
      }
    });

    // Filter mentors based on criteria
    const suitableMentors = availableMentors.filter(mentor => {
      const mentorLevel = getDSALevelValue(mentor.domain);
      const mentorYearValue = getYearValue(mentor.year);
      const maxMentees = getMaxMenteesNumber(mentor.maxMentees);
      
      // Check if mentor level is higher than mentee level
      const levelMatch = mentorLevel >= menteeLevel;
      
      // Check if mentor year is equal or higher than mentee year
      const yearMatch = mentorYearValue >= menteeYearValue;
      
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
      
      return levelMatch && yearMatch && hasSlots && commonPlatforms;
    });

    if (suitableMentors.length === 0) {
      // If no suitable mentors found with year match, relax year requirement but keep other criteria
      const relaxedYearMentors = availableMentors.filter(mentor => {
        const mentorLevel = getDSALevelValue(mentor.domain);
        const maxMentees = getMaxMenteesNumber(mentor.maxMentees);
        
        const levelMatch = mentorLevel >= menteeLevel;
        const hasSlots = mentor.currentMentees < maxMentees;
        
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
      
      if (relaxedYearMentors.length > 0) {
        return prioritizeMentors(relaxedYearMentors, menteeData)[0];
      }
      
      // If still no mentors, relax platform requirement but keep year and level
      const relaxedPlatformMentors = availableMentors.filter(mentor => {
        const mentorLevel = getDSALevelValue(mentor.domain);
        const mentorYearValue = getYearValue(mentor.year);
        const maxMentees = getMaxMenteesNumber(mentor.maxMentees);
        
        const levelMatch = mentorLevel >= menteeLevel;
        const yearMatch = mentorYearValue >= menteeYearValue;
        const hasSlots = mentor.currentMentees < maxMentees;
        
        return levelMatch && yearMatch && hasSlots;
      });
      
      if (relaxedPlatformMentors.length > 0) {
        return prioritizeMentors(relaxedPlatformMentors, menteeData)[0];
      }
      
      // If still no mentors, find any active mentor with available slots
      const anyAvailableMentor = availableMentors.find(mentor => {
        const maxMentees = getMaxMenteesNumber(mentor.maxMentees);
        return mentor.currentMentees < maxMentees;
      });
      
      if (anyAvailableMentor) {
        return anyAvailableMentor;
      }
      
      // Last resort: find mentor with least mentees
      const leastBusyMentor = availableMentors.sort((a, b) => a.currentMentees - b.currentMentees)[0];
      return leastBusyMentor || null;
    }

    // Prioritize mentors
    return prioritizeMentors(suitableMentors, menteeData)[0];
  } catch (error) {
    throw new Error(`Mentor allocation failed: ${error.message}`);
  }
};

// Helper function to prioritize mentors
const prioritizeMentors = (mentors, menteeData) => {
  return mentors.sort((a, b) => {
    // 1. Lower mentee count priority (MOST IMPORTANT - better distribution)
    if (a.currentMentees !== b.currentMentees) {
      return a.currentMentees - b.currentMentees;
    }
    
    // 2. Language match priority
    const aLangMatch = a.preferredLanguage === menteeData.preferredLanguage ? 1 : 0;
    const bLangMatch = b.preferredLanguage === menteeData.preferredLanguage ? 1 : 0;
    
    if (aLangMatch !== bLangMatch) {
      return bLangMatch - aLangMatch;
    }
    
    // 3. Higher DSA level priority
    const aLevel = getDSALevelValue(a.domain);
    const bLevel = getDSALevelValue(b.domain);
    return bLevel - aLevel;
  });
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
    
    if (!allocatedMentor) {
      return res.status(500).json({
        success: false,
        message: 'No mentors available in the system. Please contact admin.'
      });
    }

    // Update mentee with allocated mentor
    menteeData.allocatedMentor = allocatedMentor._id;
    menteeData.allocatedMentorName = allocatedMentor.name;
    menteeData.allocationDate = new Date();
    
    // Save mentee
    await menteeData.save();
    
    // Update mentor's current mentee count and add mentee to their list
    const maxMentees = getMaxMenteesNumber(allocatedMentor.maxMentees);
    const newMenteeCount = allocatedMentor.currentMentees + 1;
    
    // Add mentee name to mentor's allocatedMentees array
    const updatedAllocatedMentees = [...(allocatedMentor.allocatedMentees || []), menteeData.fullName];
    
    await Mentor.findByIdAndUpdate(
      allocatedMentor._id,
      {
        currentMentees: newMenteeCount,
        isAvailable: newMenteeCount < maxMentees,
        allocatedMentees: updatedAllocatedMentees
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

module.exports = router;