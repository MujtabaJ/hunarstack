export const SITE = {
  name: "HunarStack",
  tagline: "Learn · Build · Earn",
  url: "https://www.hunarstack.com",
  title: "HunarStack | Learn Skills, Build Projects & Earn Online",
  description:
    "HunarStack in Jamshoro helps students and professionals learn programming, AI, freelancing, mobile app development, digital marketing and practical online skills.",
  email: "gm@hunarstack.com",
  phone: "0300 3740708",
  phoneTel: "+923003740708",
  whatsapp: "https://wa.me/923003740708?text=Hi%20HunarStack%2C%20I%20would%20like%20to%20talk%20about%20courses.",
  address: "A-132 Phase 1, Society, Jamshoro, Sindh, Pakistan",
  city: "Jamshoro",
  region: "Sindh",
  country: "Pakistan",
  lat: 25.41039590815831,
  lng: 68.27155917214675,
  maps: "https://www.google.com/maps/dir/?api=1&destination=25.41039590815831,68.27155917214675",
  mapEmbed: "https://maps.google.com/maps?q=25.41039590815831,68.27155917214675&z=16&output=embed",
  hours: "Mon to Sat, 10:00 to 18:00 PKT",
};

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "Courses" },
  { to: "/journey", label: "Freelancing Journey" },
  { to: "/stories", label: "Success Stories" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export const FOOTER_COURSES = [
  { to: "/courses?category=programming", label: "Programming" },
  { to: "/courses?category=programming", label: "Mobile Development" },
  { to: "/courses?category=ai", label: "AI" },
  { to: "/courses?category=freelancing", label: "Freelancing" },
  { to: "/courses?category=digital", label: "Digital Marketing" },
  { to: "/courses?category=design", label: "Design" },
];

export const SOCIAL = [
  { id: "whatsapp", label: "WhatsApp", href: SITE.whatsapp },
  { id: "email", label: "Email", href: `mailto:${SITE.email}` },
];

export const TRUST = [
  { value: "70+", label: "Apps Delivered" },
  { value: "10+ Years", label: "Professional Experience" },
  { value: "100%", label: "Upwork Job Success" },
  { value: "$20K+", label: "Freelancing Earnings" },
  { value: "Global", label: "Client Experience" },
];

export const DIFFERENCE = [
  { title: "Practical Learning", text: "Learn by doing, not memorizing." },
  { title: "Real Projects", text: "Build portfolio-ready projects." },
  { title: "Freelancing Guidance", text: "Learn profiles, proposals, communication and client workflows." },
  { title: "AI Skills", text: "Use modern AI tools to work smarter." },
  { title: "Career Guidance", text: "Understand the path from learning to opportunity." },
  { title: "Lifetime Support", text: "Keep learning and improving beyond the classroom." },
];

export const PATHS = [
  { id: "primary", title: "Primary students", text: "A calm start with computers, creative tools and digital awareness.", href: "/courses?category=design" },
  { id: "matric", title: "Matric students", text: "Build confidence with practical computer and creative skills alongside school.", href: "/courses?category=design" },
  { id: "college", title: "College students", text: "Add digital skills, AI basics and a first project before university decisions.", href: "/courses?category=programming" },
  { id: "university", title: "University students", text: "Turn a degree into projects, a portfolio and a clearer career path.", href: "/courses?category=programming" },
  { id: "beginners", title: "Freelancing beginners", text: "Start with one skill, a profile and the habit of writing clear proposals.", href: "/courses?category=freelancing" },
  { id: "freelancers", title: "Existing freelancers", text: "Improve proposals, client calls and the way you deliver work.", href: "/courses/proposal-writing" },
  { id: "professionals", title: "Working professionals", text: "Add a modern skill you can use in your job or alongside it.", href: "/courses?category=ai" },
  { id: "developers", title: "Aspiring developers", text: "Learn web, mobile and backend skills by shipping small products.", href: "/courses?category=programming" },
  { id: "creators", title: "Content creators", text: "Learn editing, publishing and how creator platforms actually work.", href: "/courses?category=creator" },
  { id: "women", title: "Women and girls", text: "Technology, freelancing and AI, with female instructor support available.", href: "/#everyone" },
  { id: "business", title: "Small business owners", text: "Use AI, design and online selling tools for a real business.", href: "/courses?category=digital" },
  { id: "ai", title: "AI tool learners", text: "Use ChatGPT and automation tools with judgment, not shortcuts.", href: "/courses?category=ai" },
  { id: "remote", title: "Remote work skills", text: "Learn how distributed teams communicate, deliver and stay reliable.", href: "/courses/remote-work" },
];

export const JOURNEY = [
  { n: "01", title: "Learning Skills", text: "Pick one useful skill and practise it until you can explain it in plain language." },
  { n: "02", title: "Building Real Projects", text: "Turn lessons into something you can open, click and show." },
  { n: "03", title: "Creating Profiles", text: "Write a profile that says what you do, who it helps and what you have built." },
  { n: "04", title: "Writing Proposals", text: "Answer a real brief with a clear plan, questions and a realistic scope." },
  { n: "05", title: "Getting Responses", text: "Learn why some messages get replies and others are ignored. Replies are never guaranteed." },
  { n: "06", title: "Talking to Clients", text: "Practise discovery calls: listen, confirm the problem and explain how you would work." },
  { n: "07", title: "Winning Projects", text: "Understand offers, scope and next steps. Winning work depends on skill, timing and the client." },
  { n: "08", title: "Delivering Successfully", text: "Ship the work, ask for feedback and fix what you promised to fix." },
  { n: "09", title: "Receiving Payments", text: "Learn how freelance platforms and payment services are used. This is education, not proof of a payout." },
  { n: "10", title: "Building Long-Term Relationships", text: "Repeat clients come from clear communication and work that matches the brief." },
  { n: "11", title: "Working With International Clients", text: "See how time zones, English updates and professional delivery fit together." },
  { n: "12", title: "Helping Others Learn", text: "HunarStack exists so more people in Jamshoro can walk this path with guidance." },
];

export const PROPOSAL_FLOW = [
  "Find the right job",
  "Understand the requirements",
  "Write a customized proposal",
  "Get viewed",
  "Interview / discovery call",
  "Win project",
  "Deliver quality work",
  "Receive payment",
  "Build long-term relationship",
];

export const PLATFORMS = [
  {
    id: "upwork",
    name: "Upwork",
    what: "A global marketplace where clients post projects and freelancers send proposals.",
    who: "People with a skill and at least one project they can show.",
    skills: "Development, design, writing, AI workflows and other digital services.",
    prepare: "A clear profile, a portfolio piece and practice proposals. A profile does not guarantee invites or income.",
    href: "/courses/upwork-freelancing",
  },
  {
    id: "fiverr",
    name: "Fiverr",
    what: "A marketplace where you publish a defined service and buyers can order it.",
    who: "Beginners who can describe one specific service clearly.",
    skills: "Design, video, writing, simple websites and AI-assisted services.",
    prepare: "One offer, sample work and honest delivery times. Orders are not guaranteed.",
    href: "/courses/fiverr-freelancing",
  },
  {
    id: "freelancer",
    name: "Freelancer",
    what: "A project marketplace where freelancers bid on posted work.",
    who: "Students learning how contests and project bids are structured.",
    skills: "Web, mobile, design and writing services.",
    prepare: "Learn to read a brief before you bid. Bidding is practice, not a promise of a win.",
    href: "/courses/freelancer-com",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    what: "A professional network for identity, conversations and inbound opportunities.",
    who: "Students, freelancers and professionals who want to be findable.",
    skills: "Any skill you can explain with projects and a clear headline.",
    prepare: "A profile, a few posts about real work and polite outreach. Visibility is not the same as paid work.",
    href: "/courses/linkedin-freelancing",
  },
  {
    id: "peopleperhour",
    name: "PeoplePerHour",
    what: "A freelance marketplace used for hourly and fixed project work.",
    who: "Freelancers who want a second place to present an offer.",
    skills: "Design, development, marketing and business support.",
    prepare: "Reuse a strong portfolio and a service description. Extra profiles do not create income by themselves.",
    href: "/courses?category=freelancing",
  },
  {
    id: "contra",
    name: "Contra",
    what: "An independent-work network focused on portfolios and commission-free projects.",
    who: "Designers, developers and marketers building a public body of work.",
    skills: "Product design, development and marketing projects.",
    prepare: "A portfolio that shows process, not only final pictures.",
    href: "/courses?category=design",
  },
  {
    id: "guru",
    name: "Guru",
    what: "A freelance marketplace with job posts, quotes and work agreements.",
    who: "People comparing how different platforms handle quotes and agreements.",
    skills: "Technical and creative services you can scope.",
    prepare: "Practise writing a quote with scope, timeline and what is not included.",
    href: "/courses?category=freelancing",
  },
];

export const AI_TOOLS = ["ChatGPT", "Claude", "Gemini", "Midjourney", "DALL·E", "Canva AI", "Zapier", "Make", "n8n", "AI coding tools"];

export const AI_USES = [
  { title: "AI for content", text: "Outline, draft and edit, then check every fact yourself." },
  { title: "AI for freelancing", text: "Prepare proposals and checklists faster. You still do the client work." },
  { title: "AI for design", text: "Explore directions, then refine them in a real design tool." },
  { title: "AI for research", text: "Scan a topic quickly, then verify the sources that matter." },
  { title: "AI for coding", text: "Ask for explanations and drafts. You still read, test and own the code." },
  { title: "AI automation", text: "Connect repeated steps so your time goes to judgment and delivery." },
  { title: "AI business workflows", text: "Map a small business process before you automate any part of it." },
];

export const EARN_CARDS = [
  { title: "Learn a Skill", text: "Choose one path and practise it until the work is yours." },
  { title: "Build a Portfolio", text: "Collect projects someone else can open and understand." },
  { title: "Find Opportunities", text: "Learn where digital work is posted and how to read a brief." },
  { title: "Work With Clients", text: "Practise calls, updates and delivery. Clients are not assigned." },
  { title: "Grow Your Experience", text: "Each finished project teaches you more than another playlist." },
  { title: "Build Your Career", text: "Skills, proof and reputation compound. Shortcuts do not." },
];

export const FAQS = [
  { q: "Who can join?", a: "Primary students, matric and college students, university students, beginners, freelancers, working professionals and small business owners can all start. The right path depends on age, goals and current skill." },
  { q: "Are beginners allowed?", a: "Yes. HunarStack is suitable for beginners and for people who already have some technical knowledge. Beginners start with foundations. Experienced students move faster into projects." },
  { q: "Do I need a laptop?", a: "A laptop makes practice much easier, especially for programming and freelancing. Ask us on WhatsApp if you are not sure what you need for the course you want." },
  { q: "Are classes practical?", a: "Yes. Classes are built around exercises, projects and portfolio pieces, not only lectures." },
  { q: "Do you teach freelancing?", a: "Yes. Freelancing courses cover profiles, proposals, communication, portfolios and how major platforms work. They do not guarantee clients or income." },
  { q: "Do you teach programming?", a: "Yes. Tracks include web, iOS, Android, Flutter, React Native, backend, APIs and Firebase." },
  { q: "Do you teach AI?", a: "Yes. You can learn AI tools, prompting, content, image and video workflows, and automation with tools such as Zapier, Make and n8n." },
  { q: "Do you help with portfolios?", a: "Yes. Projects are shaped so you can show them later. A portfolio still has to be your own work." },
  { q: "Do you teach Upwork?", a: "Yes. The Upwork course explains profiles, proposals and client workflows. It does not promise jobs, invites or earnings." },
  { q: "What are the fees?", a: "School pathways are PKR 500/month for Primary, PKR 1,000/month for Matric and PKR 1,500/month for Higher Secondary. Freelancing and professional courses are PKR 2,000–3,000/month." },
  { q: "Where is HunarStack located?", a: "A-132 Phase 1, Society, Jamshoro, Sindh, Pakistan. You can visit the academy or talk on WhatsApp first." },
  { q: "Is there support for girls?", a: "Yes. Girls and women are welcome. Separate female instructor or support can be available for girls." },
  { q: "How can I enroll?", a: "Choose a course, send an enrollment request, or talk on WhatsApp at 0300 3740708. You can also visit HunarStack in Jamshoro." },
];

export const SCHOOL_PLANS = [
  { name: "Primary", price: "PKR 500", period: "/month", items: ["Computer skills", "Creative skills", "AI introduction", "Digital awareness", "Career guidance"] },
  { name: "Matric", price: "PKR 1,000", period: "/month", items: ["Computer skills", "Creative skills", "AI introduction", "Digital awareness", "Career guidance"] },
  { name: "Higher Secondary", price: "PKR 1,500", period: "/month", items: ["Computer skills", "Creative skills", "AI introduction", "Digital awareness", "Career guidance"] },
];

export const PRO_PLAN = {
  name: "Freelancing & professional",
  price: "PKR 2,000–3,000",
  period: "/month",
  items: ["Freelancing", "Programming", "AI tools", "Real projects", "Portfolio", "Client communication", "Proposal writing", "Online platforms", "Career guidance"],
};

export const FOUNDER = {
  name: "Ghulam Mujtaba",
  role: "Software engineer and mobile application developer",
  points: [
    "Software Engineer / Computer Science background",
    "University of Sindh",
    "10+ years professional software development experience",
    "Top Rated on Upwork",
    "100% Job Success",
    "$20K+ Upwork/freelancing earnings",
    "17 total Upwork jobs",
    "781 total Upwork hours",
    "70+ apps delivered",
    "Experience with international clients",
  ],
  skills: ["iOS", "Android", "Flutter", "React Native", "AI/ML", "Firebase", "APIs", "AWS", "App Store", "Google Play", "RevenueCat"],
};

export const PROOF_STATS = [
  ["Top Rated", "on Upwork"],
  ["100%", "Job Success"],
  ["$20K+", "Freelancing Earnings"],
  ["70+", "Apps Delivered"],
];

export function waLink(text) {
  return `https://wa.me/923003740708?text=${encodeURIComponent(text)}`;
}
