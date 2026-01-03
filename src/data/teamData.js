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
      { name: "Ananya Bajpai", role: "President", image: "/team/Ananya_Bajpai.jpeg" },
      { name: "Archi Goyal", role: "Vice President", image: "/team/Archi_Goyal.jpg" },
      { name: "Ananya Dwivedi", role: "Management Lead", image: "/team/Ananya_Diwedi.jpg" },
      { name: "Gauri Aggarwal", role: "Tech Lead", image: "/team/Gauri_Aggarwal.jpg" },
      { name: "Disha Malhotra", role: "Tech Lead", image: "/team/Disha_Malhotra.png" },
      { name: "Diya Gahlot", role: "Media & PR Lead", image: "/team/Diya_Gahlot.jpg" },
      { name: "Avwal Kaur", role: "Research Lead", image: "/team/Avwal_Kaur.jpg" },
      { name: "Anjali Gupta", role: "Research Lead", image: "/team/Anjali_Gupta.jpeg" },
    ]
  },
  {
    id: "tech",
    title: "Technical Team",
    members: [
      // REMOVED LEADS FROM HERE TO PREVENT DUPLICATION
      
      // Associates
      { name: "Annie Mathew", role: "Associate", image: "/team/Annie_Mathew.jpg" },
      // Head Coordinators
      { name: "Vaibhavi Srivastava", role: "Head Coordinator", image: "/team/Vaibhavi_Srivastava.jpg" },
      { name: "Ishika Manchanda", role: "Head Coordinator", image: "/team/Ishika_Manchanda.jpg" },
      { name: "Situ Kumari", role: "Head Coordinator", image: "/team/Situ_Kumari.jpg" },
      // Coordinators
      { name: "Reeva", role: "Coordinator", image: "/team/Reeva.jpg" },
      { name: "Yashvi", role: "Coordinator", image: "/team/Yashvi.jpg" },
      { name: "Tavleen Kaur", role: "Coordinator", image: "/team/Tavleen_Kaur.png" },
      { name: "Yasha Singh", role: "Coordinator", image: "/team/Yasha_Singh.jpeg" },
    ].sort((a, b) => getRolePriority(a.role) - getRolePriority(b.role)) 
  },
  {
    id: "research",
    title: "Research Team",
    members: [
       // Research leads were already missing here, which is why research looked fine
       { name: "Anya Goyal", role: "Associate", image: "/team/Anya_Goyal.HEIC" },
       { name: "Tanishka Arora", role: "Associate", image: "/team/Tanishka_Arora.jpg" },
       { name: "Vaibhavi Srivastava", role: "Head Coordinator", image: "/team/Vaibhavi_Srivastava.jpg" },
       { name: "Avanie Sharma", role: "Head Coordinator", image: "/team/Avanie_Sharma.jpg" },
       { name: "Ananya Singh", role: "Coordinator", image: "/team/Ananya_Singh.jpg" },
       { name: "Aviral", role: "Coordinator", image: "/team/Aviral.jpg" },
       { name: "Swarnima Arora", role: "Coordinator", image: "/team/Swarnima_Arora.jpeg" },
       { name: "Risha Rastogi", role: "Coordinator", image: "/team/Risha_Rastogi.jpeg" },
       { name: "Palak Mishra", role: "Coordinator", image: "/team/Palak_Mishra.jpg" },
       { name: "Prachi", role: "Coordinator", image: "/team/Prachi.jpeg" },
       { name: "Aayushi Johri", role: "Coordinator", image: "/team/Aayushi_Johri.jpg" },
       { name: "Harshita Purohit", role: "Coordinator", image: "/team/Harshita_Purohit.jpg" }
    ].sort((a, b) => getRolePriority(a.role) - getRolePriority(b.role))
  },
  {
    id: "management",
    title: "Management Team",
    members: [
      // REMOVED LEAD FROM HERE
      { name: "Ananya Pal", role: "Associate", image: "/team/Ananya_Pal.HEIC" },
      { name: "Mehak Devgan", role: "Associate", image: "/team/Mehak_Devgan.jpg" },
      { name: "Shalu Kumari", role: "Head Coordinator", image: "/team/Shalu_Kumari.jpg" },
      { name: "Navya", role: "Head Coordinator", image: "/team/Navya.jpg" },
      { name: "Meghna Chauhan", role: "Coordinator", image: "/team/Meghna_Chauhan.jpg" },
    ].sort((a, b) => getRolePriority(a.role) - getRolePriority(b.role))
  },
  {
    id: "media",
    title: "Media & PR",
    members: [
       // REMOVED LEAD FROM HERE
       { name: "Rakshita", role: "Head Coordinator", image: "/team/Rakshita.jpg" },
       { name: "Arya Chaturvedi", role: "Head Coordinator", image: "/team/Arya_Chaturvedi.jpg" },
       { name: "Mishti Jain", role: "Coordinator", image: "/team/mishti.jpg" },
       { name: "Prachi Mann", role: "Coordinator", image: "/team/prachi.jpg" },
    ].sort((a, b) => getRolePriority(a.role) - getRolePriority(b.role))
  }
];