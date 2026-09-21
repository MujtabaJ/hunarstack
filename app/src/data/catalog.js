import { COURSES } from "./raw-courses.js";
import { SYLLABI } from "./raw-syllabi.js";

const PLATFORM_IDS = COURSES.filter((c) => c.g === "platform").map((c) => c.id);

export function defaultFeeFor(course) {
  if (course.group === "platform") return 12000;
  const weeks = Number(String(course.duration || "").replace(/\D/g, "")) || course.weeks?.length || 8;
  if (weeks >= 16) return 60000;
  if (weeks >= 12) return 45000;
  if (weeks >= 10) return 40000;
  if (weeks >= 8) return 35000;
  if (weeks >= 6) return 25000;
  return 18000;
}

export function money(amount, currency = "PKR") {
  const n = Number(amount) || 0;
  return `${currency} ${n.toLocaleString("en-PK")}`;
}

export function isPlatform(id) {
  return PLATFORM_IDS.includes(id);
}

export function getCourses() {
  return COURSES.map((c) => {
    const syllabus = SYLLABI.find((s) => s.id === c.id);
    const weeks = (syllabus?.w || []).map((row, i) => {
      const parts = String(row).split("|");
      return {
        week: i + 1,
        title: parts[0] || `Week ${i + 1}`,
        learn: parts[1] || "",
        build: parts[2] || "",
      };
    });
    return {
      id: c.id,
      icon: c.i,
      name: c.n,
      query: c.q,
      group: c.g === "platform" ? "platform" : "skill",
      blurb: c.d,
      meta: c.m || [],
      learn: c.learn,
      path: c.path,
      build: c.b,
      modules: (c.s || []).map((row) => ({
        title: row[0],
        text: row[1],
        build: row[2] || "",
      })),
      ai: c.ai || syllabus?.ai || "",
      earn: c.earn || syllabus?.earn || "",
      duration: syllabus?.dur || (c.m && c.m[0]) || "",
      format: syllabus?.fmt || "",
      prereq: syllabus?.pre || "",
      tools: syllabus?.tools || "",
      outcomes: syllabus?.out || [],
      assessment: syllabus?.a || "",
      weeks,
      fee: defaultFeeFor({ group: c.g === "platform" ? "platform" : "skill", duration: syllabus?.dur || (c.m && c.m[0]) || "", weeks }),
      currency: "PKR",
      billing: c.g === "platform" ? "one-time" : "cohort",
    };
  });
}

export const COURSES_LIST = getCourses();
export const SKILL_COURSES = COURSES_LIST.filter((c) => c.group === "skill");
export const PLATFORM_COURSES = COURSES_LIST.filter((c) => c.group === "platform");

export function getCourse(id) {
  const key = String(id || "").toLowerCase();
  return COURSES_LIST.find(
    (c) =>
      c.id === key ||
      c.query.toLowerCase() === key ||
      c.name.toLowerCase() === key ||
      c.name.toLowerCase().replace(/&/g, "and") === key
  );
}

export function courseIdFromTrack(track) {
  return getCourse(track)?.id || "";
}

export const PATHS = [
  { title: "Freelance web developer", text: "Web Development, then Freelancing, then Remote Work and Global Clients, with Real-world Projects alongside." },
  { title: "AI builder", text: "AI and Generative AI, then Cloud and APIs, then AI Tools and Automation to sell as a service." },
  { title: "Mobile developer", text: "Software Development basics, then Mobile App Development, with UI/UX to design what you build." },
  { title: "Career starter", text: "Software Development, then Web Development, then Real-world Projects to build a portfolio employers trust." },
  { title: "Marketplace freelancer", text: "A skill track (Web, Design or Automation), then Upwork or Fiverr, then Freelancer.com if you want a second marketplace." },
  { title: "Digital platforms", text: "LinkedIn for professional inbound, then YouTube or TikTok for public content, with Facebook for local and community offers." },
];
