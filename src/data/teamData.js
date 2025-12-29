// Helper to categorize roles for sorting
// 1 = Associate, 2 = Head Coordinator, 3 = Coordinator
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
      // Associates (First)
      { name: "Annie Mathew", role: "Associate", image: "/team/Annie_Mathew.jpg" },
      // Head Coordinators (Second)
      { name: "Vaibhavi Srivastava", role: "Head Coordinator", image: "/team/Vaibhavi_Srivastava.jpg" },
      { name: "Ishika Manchanda", role: "Head Coordinator", image: "/team/Ishika_Manchanda.jpg" },
      { name: "Situ Kumari", role: "Head Coordinator", image: "/team/Situ_Kumari.jpg" },
      // Coordinators (Third)
      { name: "Reeva", role: "Coordinator", image: "/team/Reeva.jpg" },
      { name: "Yashvi", role: "Coordinator", image: "/team/Yashvi.jpg" },
      { name: "Tavleen Kaur", role: "Coordinator", image: "/team/Tavleen_Kaur.png" },
    ].sort((a, b) => getRolePriority(a.role) - getRolePriority(b.role)) 
    // ^ This .sort() automatically puts Associates first, then Head Coords, then Coords
  },
  {
    id: "research",
    title: "Research Team",
    members: [
       { name: "Rakshita", role: "Head Coordinator", image: "/team/rakshita.jpg" },
       { name: "Arya Chaturvedi", role: "Head Coordinator", image: "/team/arya.jpg" },
       { name: "Mishti Jain", role: "Coordinator", image: "/team/mishti.jpg" },
       { name: "Prachi Mann", role: "Coordinator", image: "/team/prachi.jpg" },
    ].sort((a, b) => getRolePriority(a.role) - getRolePriority(b.role))
  },
  {
    id: "management",
    title: "Management Team",
    members: [
      { name: "Ananya Pal", role: "Associate", image: "/team/ananya-pal.jpg" },
      { name: "Mehak Devgan", role: "Associate", image: "/team/mehak.jpg" },
      { name: "Shalu Kumari", role: "Head Coordinator", image: "/team/shalu.jpg" },
      { name: "Navya", role: "Head Coordinator", image: "/team/navya.jpg" },
      { name: "Meghna Chauhan", role: "Coordinator", image: "/team/meghna.jpg" },
    ].sort((a, b) => getRolePriority(a.role) - getRolePriority(b.role))
  }
];