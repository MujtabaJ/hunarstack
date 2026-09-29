import { useParams } from "react-router-dom";
import { getCourse } from "../data/courses";
import MarketingCourse from "./MarketingCourse";
import CourseDetail from "./CourseDetail";

export default function CourseRouter() {
  const { id } = useParams();
  const course = getCourse(id);
  if (course) return <MarketingCourse course={course} />;
  return <CourseDetail />;
}
