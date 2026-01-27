const mongoose = require('mongoose');
const XLSX = require('xlsx');
const Mentor = require('./models/Mentor');
require('dotenv').config();

async function importMentorsFromExcel(filePath) {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Read Excel file
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);

    console.log(`Found ${data.length} mentors in Excel file`);

    // Process each row
    for (const row of data) {
      try {
        // Map domain values
        let domain = row.domain || row.Domain || '';
        if (domain.includes('Basic')) domain = 'Basic';
        else if (domain.includes('Intermediate')) domain = 'Intermediate';
        else if (domain.includes('Advanced')) domain = 'Advanced';
        else if (domain.includes('Competitive')) domain = 'Competitive Programming';
        
        // Map commitment level
        let commitmentLevel = row.commitmentLevel || row['Commitment Level'] || '';
        if (commitmentLevel.includes('fully comitted') || commitmentLevel.includes('fully committed')) {
          commitmentLevel = 'Yes, fully committed';
        } else if (commitmentLevel.includes('try my best')) {
          commitmentLevel = 'I will try my best';
        } else if (commitmentLevel.includes('Not sure')) {
          commitmentLevel = 'Not sure yet';
        }
        
        // Handle preferred language (take first if multiple)
        let preferredLanguage = row.preferredLanguage || row['Preferred Language'] || '';
        if (preferredLanguage.includes(',')) {
          preferredLanguage = preferredLanguage.split(',')[0].trim();
        }
        
        // Clean platforms
        let platforms = Array.isArray(row.platforms) ? row.platforms : 
                       (row.platforms || row.Platforms || '').split(',').map(p => p.trim()).filter(p => p);
        platforms = platforms.map(p => {
          if (p.toLowerCase().includes('leetcode')) return 'Leetcode';
          if (p.toLowerCase().includes('codeforces')) return 'Codeforces';
          if (p.toLowerCase().includes('codechef')) return 'Codechef';
          if (p.toLowerCase().includes('gfg') || p.toLowerCase().includes('geeksforgeeks')) return 'GFG';
          return 'Other';
        }).filter(p => ['Leetcode', 'Codeforces', 'Codechef', 'GFG', 'Other'].includes(p));

        const mentorData = {
          name: row.name || row.Name,
          collegeEmail: row.collegeEmail || row['College Email'],
          personalEmail: row.personalEmail || row['Personal Email'],
          contactNumber: String(row.contactNumber || row['Contact Number']),
          enrollmentNumber: String(row.enrollmentNumber || row['Enrollment Number']),
          year: row.year || row.Year,
          branch: row.branch || row.Branch,
          domain,
          preferredLanguage,
          platforms,
          commitmentLevel,
          maxMentees: parseInt(row.maxMentees || row['Max Mentees']) || 3,
          linkedInProfile: row.linkedInProfile || row['LinkedIn Profile'],
          resumeLink: row.resumeLink || row['Resume Link'],
          codingProfileLink: row.codingProfileLink || row['Coding Profile Link'],
          currentPlacement: row.currentPlacement || row['Current Placement'],
          mentorMotivation: row.mentorMotivation || row['Mentor Motivation'],
          confirmation: Boolean(row.confirmation || row.Confirmation),
          questionsForUs: row.questionsForUs || row['Questions For Us']
        };

        // Check if mentor already exists
        const existingMentor = await Mentor.findOne({ 
          collegeEmail: mentorData.collegeEmail 
        });

        if (existingMentor) {
          console.log(`Mentor ${mentorData.name} already exists, skipping...`);
          continue;
        }

        // Create new mentor
        const mentor = new Mentor(mentorData);
        await mentor.save();
        console.log(`✓ Added mentor: ${mentorData.name}`);

      } catch (error) {
        console.error(`Error processing mentor ${row.name}:`, error.message);
      }
    }

    console.log('Import completed successfully!');
    
  } catch (error) {
    console.error('Import failed:', error);
  } finally {
    await mongoose.disconnect();
  }
}

// Usage: node importMentors.js path/to/your/excel/file.xlsx
const filePath = process.argv[2];
if (!filePath) {
  console.error('Please provide Excel file path: node importMentors.js <file-path>');
  process.exit(1);
}

importMentorsFromExcel(filePath);