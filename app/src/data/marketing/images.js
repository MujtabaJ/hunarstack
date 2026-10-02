import logo from "../../assets/logo/HunarStack_Logo.svg";
import founder from "../../assets/web/founder_sitting.png";
import founderStanding from "../../assets/founder/founder_standing.png";
import founderStanding2 from "../../assets/web/founder_standing2.png";
import journey from "../../assets/web/freelancing-journey.jpg";
import realProjects from "../../assets/web/real-projects-real-earnings.jpg";
import proposals from "../../assets/web/proposals-to-payments.jpg";
import struggles from "../../assets/web/struggles-to-success.jpg";
import youtube from "../../assets/web/youtube-earning.jpg";
import chatgpt from "../../assets/web/chatgpt-ai.jpg";
import mobile from "../../assets/web/mobile-app-development.jpg";
import graphic from "../../assets/web/graphic-design.jpg";
import web from "../../assets/web/web-development.jpg";
import aiFreelance from "../../assets/web/ai-freelancing.jpg";
import video from "../../assets/web/video-editing.jpg";
import ecommerce from "../../assets/web/ecommerce.jpg";
import freelance from "../../assets/web/freelancing-mastery.jpg";

export const IMAGES = {
  logo,
  founder,
  founderStanding,
  founderStanding2,
  journey,
  realProjects,
  proposals,
  struggles,
  youtube,
  chatgpt,
  mobile,
  graphic,
  web,
  aiFreelance,
  video,
  ecommerce,
  freelance,
};

export const CATEGORY_IMAGE = {
  programming: mobile,
  freelancing: freelance,
  ai: chatgpt,
  creator: youtube,
  digital: ecommerce,
  design: graphic,
  stock: graphic,
};

export const COURSE_IMAGE = {
  "web-development": web,
  "backend-apis": web,
  "database-firebase": web,
  "ai-for-freelancers": aiFreelance,
  "ai-freelancing": aiFreelance,
  "video-editing": video,
  "content-creation": video,
  "graphic-design": graphic,
  "ui-ux-design": graphic,
  "figma": graphic,
  "canva": graphic,
  ecommerce,
  shopify: ecommerce,
  dropshipping: ecommerce,
  daraz: ecommerce,
  "freelancing-mastery": freelance,
  "upwork-freelancing": freelance,
  "proposal-writing": proposals,
  "youtube-earning": youtube,
  "youtube-thumbnail-design": youtube,
  chatgpt,
  "ai-tools-mastery": chatgpt,
  "prompt-engineering": chatgpt,
};

export function imageForCourse(course) {
  return COURSE_IMAGE[course.slug] || CATEGORY_IMAGE[course.category] || freelance;
}
