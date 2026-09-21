import { createContext, useContext, useMemo, useState } from "react";
import {
  addApplication,
  addMessage,
  addSubmission,
  deleteApplication as removeApplication,
  deleteCourse as removeCourse,
  deleteInvoice as removeInvoice,
  deleteMessage as removeMessage,
  deletePhoto as removePhoto,
  deleteSection as removeSection,
  deleteSubmission as removeSubmission,
  deleteUser as removeUser,
  enrolUser,
  getState,
  markNotificationsRead,
  matchCourse,
  patchContact as writeContact,
  patchHero as writeHero,
  patchSection as writeSection,
  patchSectionItem as writeSectionItem,
  noteApplication as writeAppNote,
  recordPayment as writePayment,
  resetDemo,
  reviewSubmission,
  saveApplication as writeApplication,
  saveCourse as writeCourse,
  saveInvoice as writeInvoice,
  saveMessage as writeMessage,
  saveSection as writeSaveSection,
  saveSite as persistSite,
  saveSubmission as writeSubmission,
  saveUser as writeUser,
  setApplicationStatus,
  setCoursePublished as writeCoursePublished,
  setInvoiceStatus as writeInvoiceStatus,
  setKitItem,
  setMessageStatus as writeMessageStatus,
  setPhoto as writePhoto,
  setSectionVisible as writeSectionVisible,
  toggleWeek,
  unenrolUser,
  updateUser,
  withdrawApplication as retractApplication,
} from "../lib/store";
import { collectPhotos } from "../data/siteDefault";
import { useAuth } from "./AuthContext";

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const { user, refresh: refreshAuth } = useAuth();
  const [rev, setRev] = useState(0);
  const refresh = () => {
    setRev((n) => n + 1);
    refreshAuth();
  };

  const state = useMemo(() => getState(), [rev]);

  const value = useMemo(() => {
    const enrollments = user ? state.enrollments.filter((e) => e.userId === user.id && e.status === "active") : [];
    const progress = user ? state.progress[user.id] || {} : {};
    const kit = user ? state.freelanceKit[user.id] || {} : {};
    const notifications = user ? state.notifications.filter((n) => n.userId === user.id) : [];
    const submissions = user?.role === "student" ? state.submissions.filter((s) => s.userId === user.id) : state.submissions;
    const applications = state.applications || [];
    const myApplications = user
      ? applications.filter((a) => a.userId === user.id || String(a.email).toLowerCase() === String(user.email).toLowerCase())
      : [];
    const pendingApplications = applications.filter((a) => a.status === "pending");
    const newMessages = (state.messages || []).filter((m) => (m.status || "new") === "new");
    const invoices = state.invoices || [];
    const myInvoices = user ? invoices.filter((i) => i.userId === user.id && i.status !== "cancelled") : [];
    const courses = state.courses || [];
    const liveCourses = courses.filter((c) => c.published !== false);

    return {
      users: state.users.map(({ password, ...u }) => u),
      enrollments: state.enrollments,
      myEnrollments: enrollments,
      progress,
      allProgress: state.progress,
      kit,
      notifications,
      unread: notifications.filter((n) => !n.read).length,
      submissions,
      allSubmissions: state.submissions,
      applications,
      myApplications,
      pendingApplications,
      pendingCount: pendingApplications.length,
      reviewCount: (state.submissions || []).filter((s) => s.status === "review").length,
      newMessageCount: newMessages.length,
      invoices,
      myInvoices,
      dueFees: myInvoices.filter((i) => i.status === "due" || i.status === "partial").reduce((s, i) => s + Math.max(0, Number(i.amount) - Number(i.paid || 0)), 0),
      messages: state.messages || [],
      site: state.site,
      courses,
      liveCourses,
      skillCourses: liveCourses.filter((c) => c.group === "skill"),
      platformCourses: liveCourses.filter((c) => c.group === "platform"),
      photos: collectPhotos(state.site || { hero: {}, sections: [] }),
      getCourse(id) {
        return matchCourse(liveCourses, id) || matchCourse(courses, id);
      },
      apply(payload) {
        const app = addApplication({ ...payload, userId: payload.userId || user?.id });
        refresh();
        return app;
      },
      enrol(userId, courseId) {
        enrolUser(userId, courseId);
        refresh();
      },
      unenrol(userId, courseId) {
        unenrolUser(userId, courseId);
        refresh();
      },
      toggleWeek(courseId, week) {
        if (!user) return;
        toggleWeek(user.id, courseId, week);
        refresh();
      },
      submitWork(row) {
        if (!user) return;
        addSubmission({ ...row, userId: user.id, studentName: user.name });
        refresh();
      },
      review(id, status, feedback) {
        reviewSubmission(id, status, feedback);
        refresh();
      },
      saveSubmission(row) {
        writeSubmission(row);
        refresh();
      },
      deleteSubmission(id) {
        removeSubmission(id);
        refresh();
      },
      decideApplication(id, status, courseId, note) {
        setApplicationStatus(id, status, courseId, note);
        refresh();
      },
      noteApplication(id, note) {
        writeAppNote(id, note);
        refresh();
      },
      setMessageStatus(id, status) {
        writeMessageStatus(id, status);
        refresh();
      },
      sendMessage(payload) {
        addMessage(payload);
        refresh();
      },
      setKit(key, value) {
        if (!user) return;
        setKitItem(user.id, key, value);
        refresh();
      },
      readNotes() {
        if (!user) return;
        markNotificationsRead(user.id);
        refresh();
      },
      changeRole(id, role) {
        updateUser(id, { role });
        refresh();
      },
      saveUser(user) {
        const next = writeUser(user);
        refresh();
        return next;
      },
      deleteUser(id) {
        removeUser(id);
        refresh();
      },
      saveSection(section) {
        writeSaveSection(section);
        refresh();
      },
      deleteSection(id) {
        removeSection(id);
        refresh();
      },
      saveApplication(app) {
        writeApplication(app);
        refresh();
      },
      deleteApplication(id) {
        removeApplication(id);
        refresh();
      },
      withdrawApplication(id) {
        retractApplication(id, user);
        refresh();
      },
      saveMessage(msg) {
        writeMessage(msg);
        refresh();
      },
      deleteMessage(id) {
        removeMessage(id);
        refresh();
      },
      deletePhoto(key) {
        removePhoto(key);
        refresh();
      },
      saveInvoice(inv) {
        writeInvoice(inv);
        refresh();
      },
      deleteInvoice(id) {
        removeInvoice(id);
        refresh();
      },
      reset() {
        resetDemo();
        refresh();
      },
      saveSite(next) {
        persistSite(next);
        refresh();
      },
      patchHero(patch) {
        writeHero(patch);
        refresh();
      },
      patchContact(patch) {
        writeContact(patch);
        refresh();
      },
      patchSection(id, patch) {
        writeSection(id, patch);
        refresh();
      },
      setSectionVisible(id, visible) {
        writeSectionVisible(id, visible);
        refresh();
      },
      patchSectionItem(sectionId, itemId, patch) {
        writeSectionItem(sectionId, itemId, patch);
        refresh();
      },
      setPhoto(key, src, alt) {
        writePhoto(key, src, alt);
        refresh();
      },
      saveCourse(course) {
        writeCourse(course);
        refresh();
      },
      deleteCourse(id) {
        removeCourse(id);
        refresh();
      },
      setCoursePublished(id, published) {
        writeCoursePublished(id, published);
        refresh();
      },
      recordPayment(id, amount, method, note) {
        writePayment(id, amount, method, note);
        refresh();
      },
      setInvoiceStatus(id, status, note) {
        writeInvoiceStatus(id, status, note);
        refresh();
      },
    };
  }, [state, user]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used inside DataProvider");
  return ctx;
}
