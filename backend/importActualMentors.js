const mongoose = require('mongoose');
const XLSX = require('xlsx');
const Mentor = require('./models/Mentor');
require('dotenv').config();

async function importMentorsFromExcel() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Read Excel file
    const workbook = XLSX.readFile('Final XSEED Mentor List.xlsx');
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);

    console.log(`📊 Found ${data.length} mentors in Excel file`);

    const mentors = [];

    for (const row of data) {
      // Map Excel columns to mentor schema
      const mentor = {
        name: row['name'] || '',
        collegeEmail: row['collegeEmail'] || '',
        personalEmail: row['personalEmail'] || row['collegeEmail'] || '',
        contactNumber: String(row['contactNumber'] || ''),
        enrollmentNumber: String(row['enrollmentNumber'] || ''),
        year: row['year'] || '',
        branch: row['branch'] || '',
        domain: mapDomain(row['domain']),
        preferredLanguage: mapPreferredLanguage(row['preferredLanguage']),
        platforms: parsePlatforms(row['platforms'] || 'LeetCode'),
        commitmentLevel: mapCommitmentLevel(row['commitmentLevel']),
        maxMentees: parseInt(row['maxMentees'] || 3),
        linkedInProfile: row['linkedInProfile'] || '',
        resumeLink: row['resumeLink'] || '',
        codingProfileLink: row['codingProfileLink'] || '',
        mentorMotivation: row['mentorMotivation'] || 'Want to help juniors',
        confirmation: true
      };

      // Validate required fields
      if (mentor.name && mentor.collegeEmail) {
        mentors.push(mentor);
      } else {
        console.log(`⚠️  Skipping invalid row: ${JSON.stringify(row)}`);
      }
    }

    console.log(`✅ Processed ${mentors.length} valid mentors`);

    // Insert mentors in batches to handle duplicates
    let successCount = 0;
    let errorCount = 0;

    for (const mentor of mentors) {
      try {
        await Mentor.create(mentor);
        successCount++;
        console.log(`✅ Added: ${mentor.name}`);
      } catch (error) {
        if (error.code === 11000) {
          console.log(`⚠️  Duplicate: ${mentor.name} (${mentor.collegeEmail})`);
        } else {
          console.log(`❌ Error adding ${mentor.name}: ${error.message}`);
        }
        errorCount++;
      }
    }

    console.log(`\n📊 Import Summary:`);
    console.log(`   ✅ Successfully added: ${successCount}`);
    console.log(`   ⚠️  Errors/Duplicates: ${errorCount}`);
    console.log(`   📝 Total processed: ${mentors.length}`);

  } catch (error) {
    console.error('❌ Import failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

function mapDomain(domainStr) {
  if (!domainStr) return 'Basic';
  const str = domainStr.toLowerCase();
  if (str.includes('advanced') || str.includes('dynamic programming') || str.includes('graph')) {
    return 'Advanced';
  }
  if (str.includes('intermediate') || str.includes('trees') || str.includes('hashing')) {
    return 'Intermediate';
  }
  return 'Basic';
}

function mapCommitmentLevel(commitmentStr) {
  if (!commitmentStr) return 'Yes, fully committed';
  return 'Yes, fully committed'; // Normalize all to valid enum value
}

function mapPreferredLanguage(langStr) {
  if (!langStr) return 'Python';
  const str = langStr.toLowerCase();
  if (str.includes('c++')) return 'C++';
  if (str.includes('java')) return 'Java';
  return 'Python';
}

function parsePlatforms(platformsStr) {
  if (!platformsStr) return ['LeetCode'];
  
  const platforms = [];
  const str = String(platformsStr).toLowerCase();
  
  if (str.includes('leetcode')) platforms.push('LeetCode');
  if (str.includes('codeforces')) platforms.push('Codeforces');
  if (str.includes('codechef')) platforms.push('CodeChef');
  if (str.includes('gfg') || str.includes('geeksforgeeks')) platforms.push('GFG');
  
  return platforms.length > 0 ? platforms : ['LeetCode'];
}

importMentorsFromExcel();