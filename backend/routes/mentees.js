const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Mentee = require('../models/Mentee');
const Mentor = require('../models/Mentor');
const sendEmail = require('../mails/sendEmail');
const {
  menteeEmailTemplate,
  mentorEmailTemplate
} = require('../mails/emailTemplates');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/sponsorship-screenshots';
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Create unique filename: timestamp-originalname
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'screenshot-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    // Accept images only
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  }
});

// ✅ UPDATED: Helper function to get numeric value for DSA levels
const getDSALevelValue = (level) => {
  const levels = {
    // Mentee levels (3 levels)
    'Beginner': 1,
    'Intermediate': 2,
    'Advanced': 3,
    
    // Mentor levels (4 levels)
    'Basic': 1,
    'Intermediate': 2,
    'Advanced': 3,
    'Competitive Programming': 4
  };
  return levels[level] || 0;
};

// ✅ NEW: Helper to get HIGHEST domain level from mentor's domain string
const getHighestDomainLevel = (domainString) => {
  // Domain string examples:
  // "Basic  ( Arrays, String, Stacks, Queues and Linked-list)"
  // "Basic + Intermediate + Advanced"
  // "Intermediate (Sorting, Hashing, Trees,Greedy algo, BST and Heaps)"
  
  if (!domainString) return 0;
  
  const domainLower = domainString.toLowerCase();
  
  // Check from highest to lowest
  if (domainLower.includes('competitive programming') || domainLower.includes('competitive')) {
    return 4; // Competitive Programming
  }
  if (domainLower.includes('advanced')) {
    return 3; // Advanced
  }
  if (domainLower.includes('intermediate')) {
    return 2; // Intermediate
  }
  if (domainLower.includes('basic')) {
    return 1; // Basic
  }
  
  return 0;
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

// ✅ COMPLETELY REWRITTEN: Automatic mentor allocation algorithm
const allocateMentor = async (menteeData) => {
  try {
    const menteeLevel = getDSALevelValue(menteeData.dsaLevel);
    const menteeYearValue = getYearValue(menteeData.year);
    
    console.log(`\n🎯 Finding mentor for: ${menteeData.fullName}`);
    console.log(`   Year: ${menteeData.year} (${menteeYearValue})`);
    console.log(`   Level: ${menteeData.dsaLevel} (${menteeLevel})`);
    console.log(`   Platforms: ${menteeData.platforms.join(', ')}`);
    console.log(`   Language: ${menteeData.preferredLanguage}`);
    
    // Find all available mentors
    const availableMentors = await Mentor.find({ isActive: true });
    
    console.log(`\n📊 Total active mentors: ${availableMentors.length}`);

    // ✅ STRATEGY 1: STRICT MATCHING (Prefer senior mentors, exact level match)
    console.log('\n🔍 STRATEGY 1: Strict matching with senior mentors...');
    
    const strictMatches = availableMentors.filter(mentor => {
      const mentorLevel = getHighestDomainLevel(mentor.domain);
      const mentorYearValue = getYearValue(mentor.year);
      const maxMentees = getMaxMenteesNumber(mentor.maxMentees);
      
      // ✅ NEW: Prefer mentors from HIGHER years (3rd/4th year for 2nd year mentee)
      const yearMatch = mentorYearValue > menteeYearValue;
      
      // ✅ UPDATED: Mentor level should be >= mentee level
      const levelMatch = mentorLevel >= menteeLevel;
      
      // Has available slots
      const hasSlots = mentor.currentMentees < maxMentees;
      
      // Common platform check
      const commonPlatforms = mentor.platforms.some(platform => {
        return menteeData.platforms.some(menteePlatform => {
          return platform.toLowerCase() === menteePlatform.toLowerCase();
        });
      });
      
      const match = yearMatch && levelMatch && hasSlots && commonPlatforms;
      
      if (match) {
        console.log(`   ✓ ${mentor.name} (Year: ${mentor.year}, Level: ${mentorLevel}, Slots: ${mentor.currentMentees}/${maxMentees})`);
      }
      
      return match;
    });

    if (strictMatches.length > 0) {
      console.log(`✅ Found ${strictMatches.length} strict matches`);
      return prioritizeMentors(strictMatches, menteeData)[0];
    }

    // ✅ STRATEGY 2: ALLOW SAME YEAR (if no senior mentor found)
    console.log('\n🔍 STRATEGY 2: Including same-year mentors...');
    
    const sameYearMatches = availableMentors.filter(mentor => {
      const mentorLevel = getHighestDomainLevel(mentor.domain);
      const mentorYearValue = getYearValue(mentor.year);
      const maxMentees = getMaxMenteesNumber(mentor.maxMentees);
      
      // ✅ RELAXED: Same year OR higher
      const yearMatch = mentorYearValue >= menteeYearValue;
      
      const levelMatch = mentorLevel >= menteeLevel;
      const hasSlots = mentor.currentMentees < maxMentees;
      
      const commonPlatforms = mentor.platforms.some(platform => {
        return menteeData.platforms.some(menteePlatform => {
          return platform.toLowerCase() === menteePlatform.toLowerCase();
        });
      });
      
      const match = yearMatch && levelMatch && hasSlots && commonPlatforms;
      
      if (match) {
        console.log(`   ✓ ${mentor.name} (Year: ${mentor.year}, Level: ${mentorLevel}, Slots: ${mentor.currentMentees}/${maxMentees})`);
      }
      
      return match;
    });

    if (sameYearMatches.length > 0) {
      console.log(`✅ Found ${sameYearMatches.length} same-year matches`);
      return prioritizeMentors(sameYearMatches, menteeData)[0];
    }

    // ✅ STRATEGY 3: RELAX PLATFORM REQUIREMENT (keep year preference and level)
    console.log('\n🔍 STRATEGY 3: Relaxing platform requirement...');
    
    const relaxedPlatformMatches = availableMentors.filter(mentor => {
      const mentorLevel = getHighestDomainLevel(mentor.domain);
      const mentorYearValue = getYearValue(mentor.year);
      const maxMentees = getMaxMenteesNumber(mentor.maxMentees);
      
      const yearMatch = mentorYearValue >= menteeYearValue;
      const levelMatch = mentorLevel >= menteeLevel;
      const hasSlots = mentor.currentMentees < maxMentees;
      
      const match = yearMatch && levelMatch && hasSlots;
      
      if (match) {
        console.log(`   ✓ ${mentor.name} (Year: ${mentor.year}, Level: ${mentorLevel}, Slots: ${mentor.currentMentees}/${maxMentees})`);
      }
      
      return match;
    });

    if (relaxedPlatformMatches.length > 0) {
      console.log(`✅ Found ${relaxedPlatformMatches.length} matches (platform-relaxed)`);
      return prioritizeMentors(relaxedPlatformMatches, menteeData)[0];
    }

    // ✅ STRATEGY 4: RELAX YEAR REQUIREMENT (keep level)
    console.log('\n🔍 STRATEGY 4: Relaxing year requirement...');
    
    const relaxedYearMatches = availableMentors.filter(mentor => {
      const mentorLevel = getHighestDomainLevel(mentor.domain);
      const maxMentees = getMaxMenteesNumber(mentor.maxMentees);
      
      const levelMatch = mentorLevel >= menteeLevel;
      const hasSlots = mentor.currentMentees < maxMentees;
      
      const match = levelMatch && hasSlots;
      
      if (match) {
        console.log(`   ✓ ${mentor.name} (Year: ${mentor.year}, Level: ${mentorLevel}, Slots: ${mentor.currentMentees}/${maxMentees})`);
      }
      
      return match;
    });

    if (relaxedYearMatches.length > 0) {
      console.log(`✅ Found ${relaxedYearMatches.length} matches (year-relaxed)`);
      return prioritizeMentors(relaxedYearMatches, menteeData)[0];
    }

    // ✅ STRATEGY 5: FIND BEST AVAILABLE (highest level with slots)
    console.log('\n🔍 STRATEGY 5: Finding best available mentor...');
    
    const availableWithSlots = availableMentors.filter(mentor => {
      const maxMentees = getMaxMenteesNumber(mentor.maxMentees);
      return mentor.currentMentees < maxMentees;
    });

    if (availableWithSlots.length > 0) {
      // ✅ Sort by HIGHEST level first, then by fewest mentees
      const bestAvailable = availableWithSlots.sort((a, b) => {
        const aLevel = getHighestDomainLevel(a.domain);
        const bLevel = getHighestDomainLevel(b.domain);
        
        // Higher level first
        if (bLevel !== aLevel) {
          return bLevel - aLevel;
        }
        
        // Then fewer mentees
        return a.currentMentees - b.currentMentees;
      })[0];
      
      console.log(`✅ Best available: ${bestAvailable.name} (Level: ${getHighestDomainLevel(bestAvailable.domain)}, Slots: ${bestAvailable.currentMentees}/${getMaxMenteesNumber(bestAvailable.maxMentees)})`);
      return bestAvailable;
    }

    // ✅ STRATEGY 6: LAST RESORT - Least busy mentor (even if at capacity)
    console.log('\n🔍 STRATEGY 6: Last resort - least busy mentor...');
    
    const leastBusy = availableMentors.sort((a, b) => {
      // First by highest level
      const aLevel = getHighestDomainLevel(a.domain);
      const bLevel = getHighestDomainLevel(b.domain);
      
      if (bLevel !== aLevel) {
        return bLevel - aLevel;
      }
      
      // Then by fewest mentees
      return a.currentMentees - b.currentMentees;
    })[0];
    
    if (leastBusy) {
      console.log(`⚠️  Assigning to full mentor: ${leastBusy.name} (${leastBusy.currentMentees} mentees)`);
      return leastBusy;
    }

    console.log('❌ No mentors available in the system!');
    return null;
    
  } catch (error) {
    console.error('❌ Allocation error:', error);
    throw new Error(`Mentor allocation failed: ${error.message}`);
  }
};

// ✅ UPDATED: Helper function to prioritize mentors
const prioritizeMentors = (mentors, menteeData) => {
  const menteeLevelValue = getDSALevelValue(menteeData.dsaLevel);
  const menteeYearValue = getYearValue(menteeData.year);
  
  return mentors.sort((a, b) => {
    // 1. ✅ Prefer HIGHER year mentors (3rd/4th year over 2nd year)
    const aYearValue = getYearValue(a.year);
    const bYearValue = getYearValue(b.year);
    
    if (aYearValue !== bYearValue) {
      return bYearValue - aYearValue; // Higher year first
    }
    
    // 2. Lower mentee count (better distribution)
    if (a.currentMentees !== b.currentMentees) {
      return a.currentMentees - b.currentMentees;
    }
    
    // 3. ✅ Exact DSA level match (same level preferred over higher)
    const aLevel = getHighestDomainLevel(a.domain);
    const bLevel = getHighestDomainLevel(b.domain);
    const aLevelDiff = Math.abs(aLevel - menteeLevelValue);
    const bLevelDiff = Math.abs(bLevel - menteeLevelValue);
    
    if (aLevelDiff !== bLevelDiff) {
      return aLevelDiff - bLevelDiff; // Closer level first
    }
    
    // 4. Language match
    const aLangMatch = a.preferredLanguage === menteeData.preferredLanguage ? 1 : 0;
    const bLangMatch = b.preferredLanguage === menteeData.preferredLanguage ? 1 : 0;
    
    if (aLangMatch !== bLangMatch) {
      return bLangMatch - aLangMatch;
    }
    
    // 5. If all else equal, prefer slightly lower level (avoid over-qualification)
    return aLevel - bLevel;
  });
};

// POST - Register mentee and allocate mentor (with file upload)
router.post('/register', upload.single('sponsorshipScreenshot'), async (req, res) => {
  try {
    console.log('📥 Received registration request');
    console.log('Body:', req.body);
    console.log('File:', req.file);

    // Check if mentee already exists
    const existingMentee = await Mentee.findOne({ email: req.body.email });
    if (existingMentee) {
      return res.status(400).json({
        success: false,
        message: 'Mentee with this email already exists'
      });
    }

    // Parse JSON fields from FormData
    const interestedTopics = req.body.interestedTopics ? JSON.parse(req.body.interestedTopics) : [];
    const platforms = req.body.platforms ? JSON.parse(req.body.platforms) : [];

    // Prepare mentee data
    const menteeData = {
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      college: req.body.college,
      branch: req.body.branch,
      linkedin: req.body.linkedin || '',
      year: req.body.year,
      currentRole: req.body.currentRole || 'Student',
      dsaLevel: req.body.dsaLevel,
      preferredLanguage: req.body.preferredLanguage,
      interestedTopics: interestedTopics,
      platforms: platforms,
      goals: req.body.goals || '',
      sponsorshipTaskCompleted: req.body.sponsorshipTaskCompleted === 'true',
      sponsorshipScreenshot: req.file ? req.file.path : ''
    };

    console.log('📝 Prepared mentee data:', menteeData);

    // Create new mentee
    const newMentee = new Mentee(menteeData);
    
    // Allocate mentor
    const allocatedMentor = await allocateMentor(menteeData);
    
    if (!allocatedMentor) {
      return res.status(500).json({
        success: false,
        message: 'No mentors available in the system. Please contact admin.'
      });
    }

    console.log(`\n🎉 ALLOCATED: ${allocatedMentor.name} → ${menteeData.fullName}\n`);

    // Update mentee with allocated mentor
    newMentee.allocatedMentor = allocatedMentor._id;
    newMentee.allocatedMentorName = allocatedMentor.name;
    newMentee.allocationDate = new Date();
    
    // Save mentee
    const savedMentee = await newMentee.save();
    console.log('✅ Mentee saved successfully');
    
    // Update mentor's current mentee count and add mentee to their list
    const maxMentees = getMaxMenteesNumber(allocatedMentor.maxMentees);
    const newMenteeCount = allocatedMentor.currentMentees + 1;
    
    const updatedMentor = await Mentor.findByIdAndUpdate(
      allocatedMentor._id,
      {
        $inc: { currentMentees: 1 },
        $push: { allocatedMentees: savedMentee.fullName },
        $set: { isAvailable: newMenteeCount < maxMentees }
      },
      { new: true }
    );

    console.log('✅ Mentor updated successfully');

    // Populate mentor details for response
    await savedMentee.populate('allocatedMentor');

    // 📧 Send emails (NON-BLOCKING)
    sendEmail({
      to: savedMentee.email,
      subject: '🌱 Welcome to XSEED Mentorship Program!',
      html: menteeEmailTemplate(savedMentee, updatedMentor)
    }).catch(err => {
      console.error('❌ Failed to send mentee email:', err);
    });

    sendEmail({
      to: updatedMentor.collegeEmail,
      subject: '🌟 You have been assigned a mentee – XSEED',
      html: mentorEmailTemplate(updatedMentor, savedMentee)
    }).catch(err => {
      console.error('❌ Failed to send mentor email:', err);
    });

    console.log('✅ Registration complete!');

    res.status(201).json({
      success: true,
      message: 'Mentee registered and mentor allocated successfully!',
      data: {
        mentee: savedMentee,
        mentor: {
          name: updatedMentor.name,
          email: updatedMentor.personalEmail,
          expertise: updatedMentor.domain,
          language: updatedMentor.preferredLanguage,
          platforms: updatedMentor.platforms,
          profileUrl: updatedMentor.linkedInProfile
        }
      }
    });
  } catch (error) {
    console.error('❌ Registration error:', error);
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