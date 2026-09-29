import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import Layout from "./components/Layout";
import AppShell from "./components/AppShell";
import Protected, { Role } from "./components/Protected";
import ScrollTop from "./components/ScrollTop";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseRouter from "./pages/CourseRouter";
import Syllabi from "./pages/Syllabi";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Enrol from "./pages/Enrol";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Thanks from "./pages/Thanks";
import StudentHome from "./pages/student/Dashboard";
import StudentApplications from "./pages/student/Applications";
import Learn from "./pages/student/Learn";
import Projects from "./pages/student/Projects";
import FreelanceKit from "./pages/student/FreelanceKit";
import Profile from "./pages/student/Profile";
import Classroom from "./pages/instructor/Classroom";
import Reviews from "./pages/instructor/Reviews";
import ReviewForm from "./pages/instructor/ReviewForm";
import AdminHome from "./pages/admin/Overview";
import Users from "./pages/admin/Users";
import Applications from "./pages/admin/Applications";
import Inbox from "./pages/admin/Inbox";
import SiteEditor from "./pages/admin/Site";
import SectionForm from "./pages/admin/SectionForm";
import CatalogEditor from "./pages/admin/Catalog";
import CourseForm from "./pages/admin/CourseForm";
import Fees from "./pages/admin/Fees";
import InvoiceForm from "./pages/admin/InvoiceForm";
import Photos from "./pages/admin/Photos";
import PhotoForm from "./pages/admin/PhotoForm";
import UserForm from "./pages/admin/UserForm";
import ApplicationForm from "./pages/admin/ApplicationForm";
import MessageForm from "./pages/admin/MessageForm";
import SectionDetail from "./pages/SectionDetail";
import NotFound from "./pages/NotFound";
import Journey from "./pages/Journey";
import Stories from "./pages/Stories";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Faq from "./pages/Faq";

function ApplicationsPage() {
  const { user } = useAuth();
  return user?.role === "admin" ? <Applications /> : <StudentApplications />;
}

function AppHome() {
  const { user } = useAuth();
  if (user?.role === "instructor") return <Classroom />;
  if (user?.role === "admin") return <AdminHome />;
  return <StudentHome />;
}

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <BrowserRouter>
          <ScrollTop />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:id" element={<CourseRouter />} />
              <Route path="/journey" element={<Journey />} />
              <Route path="/stories" element={<Stories />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/syllabi" element={<Syllabi />} />
              <Route path="/syllabi/:id" element={<Syllabi />} />
              <Route path="/explore/:sectionId" element={<SectionDetail />} />
              <Route path="/explore/:sectionId/:itemId" element={<SectionDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/enrol" element={<Enrol />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/thanks" element={<Thanks />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route element={<Protected />}>
              <Route path="/app" element={<AppShell />}>
                <Route index element={<AppHome />} />
                <Route path="learn" element={<Role allow={["student", "admin"]}><Learn /></Role>} />
                <Route path="learn/:courseId" element={<Role allow={["student", "admin"]}><Learn /></Role>} />
                <Route path="projects" element={<Role allow={["student", "admin"]}><Projects /></Role>} />
                <Route path="freelance" element={<Role allow={["student", "admin"]}><FreelanceKit /></Role>} />
                <Route path="profile" element={<Profile />} />
                <Route path="reviews" element={<Role allow={["instructor", "admin"]}><Reviews /></Role>} />
                <Route path="reviews/:id" element={<Role allow={["instructor", "admin"]}><ReviewForm /></Role>} />
                <Route path="users" element={<Role allow={["admin"]}><Users /></Role>} />
                <Route path="users/:id" element={<Role allow={["admin"]}><UserForm /></Role>} />
                <Route path="site" element={<Role allow={["admin"]}><SiteEditor /></Role>} />
                <Route path="site/:id" element={<Role allow={["admin"]}><SectionForm /></Role>} />
                <Route path="photos" element={<Role allow={["admin"]}><Photos /></Role>} />
                <Route path="photos/:key" element={<Role allow={["admin"]}><PhotoForm /></Role>} />
                <Route path="catalog" element={<Role allow={["admin"]}><CatalogEditor /></Role>} />
                <Route path="catalog/:id" element={<Role allow={["admin"]}><CourseForm /></Role>} />
                <Route path="fees" element={<Role allow={["student", "admin"]}><Fees /></Role>} />
                <Route path="fees/:id" element={<Role allow={["admin"]}><InvoiceForm /></Role>} />
                <Route path="applications" element={<Role allow={["student", "admin"]}><ApplicationsPage /></Role>} />
                <Route path="applications/:id" element={<Role allow={["admin"]}><ApplicationForm /></Role>} />
                <Route path="inbox" element={<Role allow={["admin"]}><Inbox /></Role>} />
                <Route path="inbox/:id" element={<Role allow={["admin"]}><MessageForm /></Role>} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </AuthProvider>
  );
}
