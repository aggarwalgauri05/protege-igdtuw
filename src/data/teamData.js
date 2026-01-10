// src/data/teamData.js

// Helper to categorize roles for sorting
const getRolePriority = (role) => {
  if (role.toLowerCase().includes('associate')) return 1;
  if (role.toLowerCase().includes('head')) return 2;
  return 3; 
};

export const teamSections = [
  {
    id: "core",
    title: "Core Team",
    members: [
      { 
        name: "Ananya Bajpai", 
        role: "President", 
        image: "/team/Ananya_Bajpai.jpeg",
        branch: "CSE-AI",
        linkedin: "https://www.linkedin.com/in/ananya-bajpai-251711203/",
        description: "I lead Protégé, turning “I’m not sure” into “I’ve got this.”"
      },
      { 
        name: "Archi Goyal", 
        role: "Vice President", 
        image: "/team/Archi_Goyal.jpg",
        branch: "CSE-AI",
        linkedin: "https://www.linkedin.com/in/archi-goyal-a55034286/",
        description: "Got your back as your vice president, always."
      },
      { 
        name: "Disha Malhotra", 
        role: "Tech Lead", 
        image: "/team/Disha_Malhotra.png",
        branch: "CSE-AI",
        linkedin: "https://www.linkedin.com/in/disha-malhotra-b72162285/",
        description: "Designing the backbone behind the vision."
      },
      { 
        name: "Gauri Aggarwal", 
        role: "Tech Lead", 
        image: "/team/Gauri_Aggarwal.jpg",
        branch: "CSE-AI",
        linkedin: "https://www.linkedin.com/in/gauri-aggarwal-925761285/",
        description: "Turning coffee into code and chaos into clarity."
      },
      { 
        name: "Anjali Gupta", 
        role: "Research Lead", 
        image: "/team/Anjali_Gupta.jpeg",
        branch: "ECE-AI",
        linkedin: "https://www.linkedin.com/in/anjali-gupta-7985b2288?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        description: "Curious, caffeinated, and trying my best.  "
      },
      { 
        name: "Avwal Kaur", 
        role: "Research Lead", 
        image: "/team/Avwal_Kaur.jpeg",
        branch: "CSE",
        linkedin: "https://www.linkedin.com/in/avwal-kaur/",
        description: "Trying to become better than yesterday..."
      },
      { 
        name: "Ananya Dwivedi", 
        role: "Management Lead", 
        image: "/team/Ananya_Diwedi.jpg",
        branch: "CSE-AI",
        linkedin: "https://www.linkedin.com/in/ananya-dwivedi-826b20294/",
        description: "I make sure the vision doesn’t stay an idea, it becomes reality."
      },
      { 
        name: "Diya Gahlot", 
        role: "Media & PR Lead", 
        image: "/team/Diya_Gahlot.jpeg",
        branch: "CSE",
        linkedin: "https://www.linkedin.com/",
        description: "Curating our brand voice and expanding outreach."
      },
    ]
  },
  {
    id: "tech",
    title: "Technical Team",
    members: [
      // Associates
      { name: "Annie Mathew", role: "Associate", image: "/team/Annie_Mathew.jpg" },
      // Head Coordinators
      { name: "Ishika Manchanda", role: "Head Coordinator", image: "/team/Ishika_Manchanda.jpg" },
      { name: "Situ Kumari", role: "Head Coordinator", image: "/team/Situ_Kumari.jpg" },
      { name: "Vaibhavi Srivastava", role: "Head Coordinator", image: "/team/Vaibhavi_Srivastava.jpg" },
      // Coordinators
      { name: "Reeva", role: "Coordinator", image: "/team/Reeva.jpg" },
      { name: "Tavleen Kaur", role: "Coordinator", image: "/team/Tavleen_Kaur.png" },
      { name: "Yashvi", role: "Coordinator", image: "/team/Yashvi.jpg" },
      { name: "Yasha Singh", role: "Coordinator", image: "/team/Yasha_Singh.jpeg" },
    ].sort((a, b) => getRolePriority(a.role) - getRolePriority(b.role)) 
  },
  {
    id: "research",
    title: "Research Team",
    members: [
       { name: "Anya Goyal", role: "Associate", image: "/team/Anya_Goyal.jpeg" },
       { name: "Tanishka Arora", role: "Associate", image: "/team/Tanishka_Arora.jpg" },
       { name: "Avanie Sharma", role: "Head Coordinator", image: "/team/Avanie_Sharma.jpg" },
       { name: "Vaibhavi Srivastava", role: "Head Coordinator", image: "/team/Vaibhavi_Srivastava.jpg" },
       { name: "Aayushi Johri", role: "Coordinator", image: "/team/Aayushi_Johri.jpg" },
       { name: "Ananya Singh", role: "Coordinator", image: "/team/Ananya_Singh.jpg" },
       { name: "Aviral", role: "Coordinator", image: "/team/Aviral.jpg" },
       { name: "Harshita Purohit", role: "Coordinator", image: "/team/Harshita_Purohit.jpg" },
       { name: "Palak Mishra", role: "Coordinator", image: "/team/Palak_Mishra.jpg" },
       { name: "Prachi", role: "Coordinator", image: "/team/Prachi.jpeg" },
       { name: "Risha Rastogi", role: "Coordinator", image: "/team/Risha_Rastogi.jpeg" },
       { name: "Swarnima Arora", role: "Coordinator", image: "/team/Swarnima_Arora.jpeg" },
    ].sort((a, b) => getRolePriority(a.role) - getRolePriority(b.role))
  },
  {
    id: "management",
    title: "Management Team",
    members: [
      { name: "Ananya Pal", role: "Associate", image: "/team/Ananya_Pal.jpeg" },
      { name: "Ariza Wasim", role: "Associate", image: "/team/Ariza_Wazim.jpg" },
      { name: "Mehak Devgan", role: "Associate", image: "/team/Mehak_Devgan.jpg" },
      { name: "Anjali Singh", role: "Head Coordinator", image: "/team/Anjali_Singh.jpg" },
      { name: "Ashima Kaushik", role: "Head Coordinator", image: "/team/Ashima_Kaushik.jpg" },
      { name: "Navya", role: "Head Coordinator", image: "/team/Navya.jpg" },
      { name: "Shalu Kumari", role: "Head Coordinator", image: "/team/Shalu_Kumari.jpg" },
      { name: "Akshita", role: "Coordinator", image: "/team/Akshita.jpg" },
      { name: "Angel Gautam", role: "Coordinator", image: "/team/Angel_Gautam.jpeg" },
      { name: "Khushi Kumari", role: "Coordinator", image: "/team/Khushi_Kumari.jpg" },
      { name: "Mansi", role: "Coordinator", image: "/team/Mansi.jpeg" },
      { name: "Meghna Chauhan", role: "Coordinator", image: "/team/Meghna_Chauhan.jpeg" },
      { name: "Neha Gupta", role: "Coordinator", image: "/team/Neha_Gupta.jpeg" },
      { name: "Rishika", role: "Coordinator", image: "/team/Rishika.jpeg" },
      { name: "Ritika Yadav", role: "Coordinator", image: "/team/Ritika_Yadav.jpeg" },
      { name: "Shivani Meena", role: "Coordinator", image: "/team/Shivani_Meena.jpg" },
      { name: "Shreya Pandey", role: "Coordinator", image: "/team/Shreya_Pandey.jpg" },
      { name: "Sonakshi Jaiswal", role: "Coordinator", image: "/team/Sonakshi_Jaiswal.jpeg" }
    ].sort((a, b) => getRolePriority(a.role) - getRolePriority(b.role))
  },
  {
    id: "media",
    title: "Media & PR",
    members: [
       { name: "Arya Chaturvedi", role: "Head Coordinator", image: "/team/Arya_Chaturvedi.jpg" },
       { name: "Rakshita", role: "Head Coordinator", image: "/team/Rakshita.jpg" },
       { name: "Mishti Jain", role: "Coordinator", image: "/team/Mishti_Jain.jpeg" },
       { name: "Neha Gupta", role: "Coordinator", image: "/team/Neha_Gupta.jpeg" },
       { name: "Prachi Mann", role: "Coordinator", image: "/team/Prachi.jpeg" },
    ].sort((a, b) => getRolePriority(a.role) - getRolePriority(b.role))
  }
];