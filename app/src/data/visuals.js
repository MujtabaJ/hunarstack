const u = (id, extra = "") =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=80${extra}`;

export const PHOTOS = {
  hero: u("photo-1522202176988-66273c2fd55f"),
  storyLearn: u("photo-1523240795612-9a054b0db644"),
  storyBuild: u("photo-1517694712202-14dd9538aa97"),
  storyFreelance: u("photo-1600880292203-757bb62b4baf"),
  storyGrow: u("photo-1531482615713-2afd69097998"),
  student1: u("photo-1522071820081-009f0129c71c"),
  student2: u("photo-1454165804606-c3d57bc86b40"),
  student3: u("photo-1573496359142-b8d87734a5a2"),
  freelance1: u("photo-1600880292089-90a7e086ee0c"),
  freelance2: u("photo-1486312338219-ce68d2c6f44d"),
  freelance3: u("photo-1516321318423-f06f85e504b3"),
  laptop: u("photo-1498050108023-c5249f4df085"),
};

export const PROJECT_MOCKUPS = [
  { id: "ai", title: "Document chatbot", course: "AI & Generative AI", device: "laptop", image: u("photo-1677442136019-21780ecad995") },
  { id: "web", title: "Live portfolio site", course: "Web Development", device: "laptop", image: u("photo-1467232004584-a241de8bcf5d") },
  { id: "mobile", title: "Ordering app", course: "Mobile App Development", device: "phone", image: u("photo-1512941937669-90a1b58e7e9c") },
  { id: "uiux", title: "App design case study", course: "UI/UX", device: "tablet", image: u("photo-1561070791-2526d30994b5") },
  { id: "cloud", title: "API dashboard", course: "Cloud & APIs", device: "laptop", image: u("photo-1551288049-bebda4e38f71") },
  { id: "automation", title: "Lead-capture flow", course: "AI Tools & Automation", device: "laptop", image: u("photo-1553877522-43269d4ea809") },
  { id: "software", title: "Inventory system", course: "Software Development", device: "laptop", image: u("photo-1519389950473-47ba0277781c") },
  { id: "projects", title: "Shipped product demo", course: "Real-world Projects", device: "laptop", image: u("photo-1551434678-e076c223a692") },
  { id: "freelance", title: "Profile + proposals", course: "Freelancing", device: "tablet", image: u("photo-1454165804606-c3d57bc86b40") },
  { id: "remote", title: "Client workshop", course: "Remote Work", device: "laptop", image: u("photo-1551836022-d5d88e9218df") },
];

export const MOCK_KIND = {
  ai: "chat",
  mobile: "phone",
  web: "web",
  uiux: "design",
  automation: "flow",
  cloud: "api",
  software: "web",
  freelance: "design",
  remote: "flow",
  projects: "chat",
};

export const PLATFORM_META = [
  { id: "upwork", name: "Upwork", color: "#14A800" },
  { id: "fiverr", name: "Fiverr", color: "#1DBF73" },
  { id: "freelancer", name: "Freelancer.com", color: "#29B2FE" },
  { id: "linkedin", name: "LinkedIn", color: "#0A66C2" },
  { id: "tiktok", name: "TikTok", color: "#111111" },
  { id: "youtube", name: "YouTube", color: "#FF0000" },
  { id: "facebook", name: "Facebook", color: "#1877F2" },
];

export function coverFor(courseId) {
  return PROJECT_MOCKUPS.find((m) => m.id === courseId)?.image || PHOTOS.laptop;
}
