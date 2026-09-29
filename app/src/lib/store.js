import { getCourses, defaultFeeFor } from "../data/catalog";
import { DEFAULT_SITE, collectPhotos } from "../data/siteDefault";
import { matchCourse } from "./media";

const KEY = "hunarstack_product_v1";

const DEMO = {
  users: [
    { id: "u_admin", name: "HunarStack Admin", email: "admin@hunarstack.com", password: "admin123", role: "admin", city: "Lahore, Pakistan", bio: "Academy operations." },
    { id: "u_instructor", name: "Amina Khan", email: "instructor@hunarstack.com", password: "teach123", role: "instructor", city: "Karachi, Pakistan", bio: "Teaches Web and UI/UX tracks." },
    { id: "u_student", name: "Sara Ali", email: "student@hunarstack.com", password: "student123", role: "student", city: "Islamabad, Pakistan", bio: "Learning AI and web development." },
  ],
  enrollments: [
    { id: "e1", userId: "u_student", courseId: "ai", status: "active", startedAt: "2026-08-10" },
    { id: "e2", userId: "u_student", courseId: "web", status: "active", startedAt: "2026-08-24" },
  ],
  progress: {
    u_student: {
      ai: [1, 2, 3, 4],
      web: [1, 2],
    },
  },
  submissions: [
    { id: "s1", userId: "u_student", courseId: "ai", week: 4, title: "Model report with charts", note: "First pass of the evaluation report.", status: "review", studentName: "Sara Ali", createdAt: "2026-09-12" },
  ],
  applications: [
    { id: "a1", userId: "u_student", name: "Sara Ali", email: "student@hunarstack.com", phone: "+92 300 0000000", city: "Islamabad, Pakistan", track: "AI & Generative AI", courseId: "ai", level: "Complete beginner", goal: "Build an AI demo I can show.", source: "Friend", status: "accepted", createdAt: "2026-08-08", createdAtFull: "2026-08-08T09:00:00.000Z", note: "" },
    { id: "a2", userId: "", name: "Hassan Raza", email: "hassan@example.com", phone: "+92 321 1111111", city: "Faisalabad, Pakistan", track: "Web Development", courseId: "web", level: "I know some basics", goal: "A freelance web offer I can show on my phone.", source: "Instagram", status: "pending", createdAt: "2026-09-20", createdAtFull: "2026-09-20T14:20:00.000Z", note: "" },
    { id: "a3", userId: "u_student", name: "Sara Ali", email: "student@hunarstack.com", phone: "+92 300 0000000", city: "Islamabad, Pakistan", track: "Upwork", courseId: "upwork", level: "I know some basics", goal: "Practice bidding on a platform after the web track.", source: "Classroom", status: "pending", createdAt: "2026-09-21", createdAtFull: "2026-09-21T08:00:00.000Z", note: "" },
  ],
  messages: [
    { id: "m1", name: "Nadia Sheikh", email: "nadia@example.com", phone: "+92 300 2222222", topic: "Course question", message: "Do you run evening batches for the web track? I work during the day.", createdAt: "2026-09-18", createdAtFull: "2026-09-18T11:00:00.000Z", read: false, status: "new" },
  ],
  notifications: [
    { id: "n1", userId: "u_student", text: "Welcome to HunarStack. Your AI track is live — start with Week 1.", read: false, createdAt: "2026-08-10" },
    { id: "n2", userId: "u_instructor", text: "Sara Ali submitted Week 4 of AI & Generative AI.", read: false, createdAt: "2026-09-12" },
    { id: "n3", userId: "u_admin", text: "New applications appear here when students apply for a seat.", read: true, createdAt: "2026-08-01" },
  ],
  freelanceKit: {
    u_student: { niche: true, profiles: false, proposals: false, pricing: false, delivery: false, plan: false },
  },
  invoices: [
    { id: "inv1", userId: "u_student", courseId: "ai", amount: 45000, paid: 45000, currency: "PKR", status: "paid", createdAt: "2026-08-08", method: "bank", note: "Seat fee for AI & Generative AI" },
    { id: "inv2", userId: "u_student", courseId: "web", amount: 45000, paid: 15000, currency: "PKR", status: "partial", createdAt: "2026-08-24", method: "jazzcash", note: "Seat fee for Web Development" },
  ],
};

function hydrateSitePhotos(site) {
  const next = structuredClone(site);
  const def = DEFAULT_SITE;
  const broken = (src) => !src || String(src).startsWith("/photos/");
  if (broken(next.hero?.image)) next.hero.image = def.hero.image;
  (next.sections || []).forEach((s) => {
    const ds = def.sections.find((x) => x.id === s.id);
    if (!ds) return;
    if (broken(s.image) && ds.image) s.image = ds.image;
    (s.items || []).forEach((item) => {
      const di = (ds.items || []).find((x) => x.id === item.id);
      if (broken(item.image) && di?.image) item.image = di.image;
    });
  });
  return next;
}

function ensureInvoices(state) {
  state.invoices ||= [];
  (state.enrollments || [])
    .filter((e) => e.status === "active")
    .forEach((e) => openInvoice(state, e.userId, e.courseId));
}

function openInvoice(state, userId, courseId, create = true) {
  if (!userId || !courseId) return null;
  state.invoices ||= [];
  const existing = state.invoices.find(
    (i) => i.userId === userId && i.courseId === courseId && i.status !== "cancelled"
  );
  if (existing) return existing;
  if (!create) return null;
  const course = findCourse(state, courseId);
  const inv = {
    id: uid("inv"),
    userId,
    courseId,
    amount: Number(course?.fee) || 0,
    paid: 0,
    currency: course?.currency || "PKR",
    status: "due",
    createdAt: new Date().toISOString().slice(0, 10),
    method: "",
    note: `Seat fee for ${course?.name || courseId}`,
  };
  state.invoices.unshift(inv);
  return inv;
}

function withDefaults(parsed) {
  const courses = Array.isArray(parsed.courses) && parsed.courses.length
    ? parsed.courses
    : getCourses().map((c) => ({ ...c, published: c.published !== false }));
  const site = hydrateSitePhotos(
    parsed.site?.hero && Array.isArray(parsed.site.sections)
      ? parsed.site
      : structuredClone(DEFAULT_SITE)
  );
  const merged = { ...DEMO, ...parsed, courses, site };
  merged.courses = (merged.courses || []).map((c) => ({
    ...c,
    fee: c.fee != null && c.fee !== "" ? Number(c.fee) : defaultFeeFor(c),
    currency: c.currency || "PKR",
    billing: c.billing || (c.group === "platform" ? "one-time" : "cohort"),
  }));
  merged.site.contact = { ...DEFAULT_SITE.contact, ...(merged.site.contact || {}) };
  if (!merged.site.contact.email || merged.site.contact.email === "hello@hunarstack.com") {
    merged.site.contact.email = DEFAULT_SITE.contact.email;
  }
  if (!merged.site.contact.phone || /0000000/.test(merged.site.contact.phone)) {
    merged.site.contact.phone = DEFAULT_SITE.contact.phone;
  }
  if (!merged.site.contact.name) merged.site.contact.name = DEFAULT_SITE.contact.name;
  if (!merged.site.contact.address || merged.site.contact.address === "Lahore, Pakistan") {
    merged.site.contact.address = DEFAULT_SITE.contact.address;
  }
  merged.invoices = Array.isArray(merged.invoices) ? merged.invoices : structuredClone(DEMO.invoices);
  merged.applications = (merged.applications || []).map((a) => {
    const course = matchCourse(merged.courses, a.courseId || a.track);
    return {
      ...a,
      courseId: a.courseId || course?.id || "",
      track: a.track || course?.name || "",
      note: a.note || "",
      status: a.status || "pending",
    };
  });
  merged.messages = (merged.messages || []).map((m) => ({
    ...m,
    status: m.status || (m.read ? "read" : "new"),
    read: Boolean(m.read),
  }));
  ensureInvoices(merged);
  return merged;
}

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      const next = withDefaults(parsed);
      if (!parsed.site || !parsed.courses?.length || String(parsed.site?.hero?.image || "").startsWith("/photos/") || !Array.isArray(parsed.invoices)) save(next);
      return next;
    }
  } catch {
    /* ignore */
  }
  const initial = withDefaults({ ...structuredClone(DEMO) });
  localStorage.setItem(KEY, JSON.stringify(initial));
  return initial;
}

function save(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
  return state;
}

export function getState() {
  return load();
}

export function uid(prefix) {
  return prefix + "_" + Math.random().toString(36).slice(2, 9);
}

export function findUser(email) {
  return load().users.find((u) => u.email.toLowerCase() === String(email).toLowerCase());
}

export function registerUser({ name, email, password, role = "student", city = "", bio = "" }) {
  const state = load();
  if (state.users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    throw new Error("An account with this email already exists.");
  }
  const user = { id: uid("u"), name, email, password, role, city, bio };
  state.users.push(user);
  (state.applications || []).forEach((a) => {
    if (String(a.email).toLowerCase() !== email.toLowerCase()) return;
    a.userId = user.id;
    if (a.status === "accepted" && a.courseId) {
      if (!state.enrollments.some((e) => e.userId === user.id && e.courseId === a.courseId && e.status === "active")) {
        state.enrollments.push({
          id: uid("e"),
          userId: user.id,
          courseId: a.courseId,
          status: "active",
          startedAt: new Date().toISOString().slice(0, 10),
        });
      }
    }
  });
  state.notifications.push({
    id: uid("n"),
    userId: user.id,
    text: "Account created. Apply for a seat to join a track — or wait for an admin to enrol you.",
    read: false,
    createdAt: new Date().toISOString().slice(0, 10),
  });
  save(state);
  return user;
}

export function updateUser(id, patch) {
  const state = load();
  const i = state.users.findIndex((u) => u.id === id);
  if (i < 0) throw new Error("User not found.");
  const next = { ...patch };
  if (!next.password) delete next.password;
  state.users[i] = { ...state.users[i], ...next };
  save(state);
  return state.users[i];
}

function findCourse(state, needle) {
  return matchCourse(state.courses || [], needle);
}

function findUserByEmail(state, email) {
  return state.users.find((u) => u.email.toLowerCase() === String(email || "").toLowerCase());
}

function notify(state, userId, text) {
  if (!userId) return;
  state.notifications.push({
    id: uid("n"),
    userId,
    text,
    read: false,
    createdAt: new Date().toISOString().slice(0, 10),
  });
}

export function addApplication(payload) {
  const state = load();
  state.applications ||= [];
  const now = new Date().toISOString();
  const course = findCourse(state, payload.courseId || payload.track);
  const user = payload.userId
    ? state.users.find((u) => u.id === payload.userId)
    : findUserByEmail(state, payload.email);
  const courseId = course?.id || payload.courseId || "";
  const track = course?.name || payload.track || "";
  const email = payload.email;

  const existing = state.applications.find(
    (a) =>
      a.status === "pending" &&
      String(a.email).toLowerCase() === String(email).toLowerCase() &&
      (a.courseId || "") === courseId
  );
  if (existing) {
    Object.assign(existing, {
      name: payload.name || existing.name,
      phone: payload.phone || existing.phone,
      city: payload.city || existing.city,
      level: payload.level || existing.level,
      goal: payload.goal || existing.goal,
      source: payload.source || existing.source,
      userId: user?.id || existing.userId || "",
      track,
      courseId,
      updatedAt: now,
    });
    notify(state, state.users.find((u) => u.role === "admin")?.id, `${existing.name} updated their application for ${track}.`);
    if (user) notify(state, user.id, `Your application for ${track} was updated and is still pending.`);
    save(state);
    return existing;
  }

  const app = {
    id: uid("a"),
    status: "pending",
    createdAt: now.slice(0, 10),
    createdAtFull: now,
    name: payload.name,
    email,
    phone: payload.phone || "",
    city: payload.city || "",
    track,
    courseId,
    level: payload.level || "",
    goal: payload.goal || "",
    source: payload.source || "",
    userId: user?.id || "",
    note: "",
  };
  state.applications.unshift(app);
  notify(state, state.users.find((u) => u.role === "admin")?.id, `${app.name} applied for ${track || "a seat"}.`);
  if (user) notify(state, user.id, `Application received for ${track}. A seat is not confirmed until an admin accepts it.`);
  save(state);
  return app;
}

export function setApplicationStatus(id, status, courseId, note) {
  const state = load();
  const app = state.applications.find((a) => a.id === id);
  if (!app) throw new Error("Application not found.");
  app.status = status;
  app.decidedAt = new Date().toISOString();
  if (note != null) app.note = note;
  const resolvedCourseId = courseId || app.courseId || findCourse(state, app.track)?.id || "";
  app.courseId = resolvedCourseId;
  const user = findUserByEmail(state, app.email) || state.users.find((u) => u.id === app.userId);

  if (status === "accepted") {
    if (user && resolvedCourseId) {
      if (!state.enrollments.some((e) => e.userId === user.id && e.courseId === resolvedCourseId && e.status === "active")) {
        state.enrollments.push({
          id: uid("e"),
          userId: user.id,
          courseId: resolvedCourseId,
          status: "active",
          startedAt: new Date().toISOString().slice(0, 10),
        });
      }
      openInvoice(state, user.id, resolvedCourseId);
      notify(state, user.id, `Your application for ${app.track} was accepted. Open Learn to start. A seat fee is now due in Fees.`);
    } else if (user) {
      notify(state, user.id, `Your application for ${app.track} was accepted.`);
    }
  } else if (status === "waitlist" && user) {
    notify(state, user.id, `Your application for ${app.track} is on the waitlist.${note ? " " + note : ""}`);
  } else if (status === "declined" && user) {
    notify(state, user.id, `Your application for ${app.track} was not accepted this round.${note ? " " + note : ""}`);
  }
  save(state);
  return app;
}

export function noteApplication(id, note) {
  const state = load();
  const app = state.applications.find((a) => a.id === id);
  if (!app) throw new Error("Application not found.");
  app.note = note;
  save(state);
  return app;
}

export function enrolUser(userId, courseId) {
  const state = load();
  if (state.enrollments.some((e) => e.userId === userId && e.courseId === courseId && e.status === "active")) {
    return state.enrollments.find((e) => e.userId === userId && e.courseId === courseId);
  }
  const row = { id: uid("e"), userId, courseId, status: "active", startedAt: new Date().toISOString().slice(0, 10) };
  state.enrollments.push(row);
  openInvoice(state, userId, courseId);
  state.notifications.push({
    id: uid("n"),
    userId,
    text: "You were enrolled in a new track. Open Learn to start the first week. A seat fee is due until an admin records payment.",
    read: false,
    createdAt: row.startedAt,
  });
  save(state);
  return row;
}

export function unenrolUser(userId, courseId) {
  const state = load();
  let found = false;
  (state.enrollments || []).forEach((e) => {
    if (e.userId === userId && e.courseId === courseId && e.status === "active") {
      e.status = "cancelled";
      found = true;
    }
  });
  if (!found) throw new Error("Enrolment not found.");
  (state.invoices || []).forEach((inv) => {
    if (inv.userId === userId && inv.courseId === courseId && inv.status !== "paid") inv.status = "cancelled";
  });
  const course = findCourse(state, courseId);
  notify(state, userId, `${course?.name || "A track"} was removed from your classroom.`);
  save(state);
  return state.enrollments;
}

export function toggleWeek(userId, courseId, week) {
  const state = load();
  state.progress[userId] ||= {};
  state.progress[userId][courseId] ||= [];
  const list = state.progress[userId][courseId];
  const i = list.indexOf(week);
  if (i >= 0) list.splice(i, 1);
  else list.push(week);
  save(state);
  return list;
}

export function addSubmission(row) {
  const state = load();
  const item = { id: uid("s"), status: "review", createdAt: new Date().toISOString().slice(0, 10), ...row };
  state.submissions.unshift(item);
  state.users
    .filter((u) => u.role === "instructor" || u.role === "admin")
    .forEach((u) => {
      state.notifications.push({
        id: uid("n"),
        userId: u.id,
        text: `${row.studentName || "A student"} submitted ${row.title}.`,
        read: false,
        createdAt: item.createdAt,
      });
    });
  save(state);
  return item;
}

export function reviewSubmission(id, status, feedback) {
  const state = load();
  const item = state.submissions.find((s) => s.id === id);
  if (!item) throw new Error("Submission not found.");
  item.status = status;
  item.feedback = feedback;
  state.notifications.push({
    id: uid("n"),
    userId: item.userId,
    text: `Your submission “${item.title}” was marked ${status}.`,
    read: false,
    createdAt: new Date().toISOString().slice(0, 10),
  });
  save(state);
  return item;
}

export function saveSubmission(row) {
  const state = load();
  state.submissions ||= [];
  const i = state.submissions.findIndex((s) => s.id === row.id);
  if (i < 0) {
    const item = { id: uid("s"), status: "review", createdAt: new Date().toISOString().slice(0, 10), ...row };
    state.submissions.unshift(item);
    save(state);
    return item;
  }
  state.submissions[i] = { ...state.submissions[i], ...row };
  save(state);
  return state.submissions[i];
}

export function deleteSubmission(id) {
  const state = load();
  if (!(state.submissions || []).some((s) => s.id === id)) throw new Error("Submission not found.");
  state.submissions = state.submissions.filter((s) => s.id !== id);
  save(state);
  return state.submissions;
}

export function addMessage(payload) {
  const state = load();
  state.messages ||= [];
  const now = new Date().toISOString();
  const msg = {
    id: uid("m"),
    createdAt: now.slice(0, 10),
    createdAtFull: now,
    read: false,
    status: "new",
    ...payload,
  };
  state.messages.unshift(msg);
  notify(state, state.users.find((u) => u.role === "admin")?.id, `New contact message from ${payload.name}.`);
  save(state);
  return msg;
}

export function setMessageStatus(id, status) {
  const state = load();
  const msg = state.messages.find((m) => m.id === id);
  if (!msg) throw new Error("Message not found.");
  msg.status = status;
  msg.read = status !== "new";
  save(state);
  return msg;
}

export function markNotificationsRead(userId) {
  const state = load();
  state.notifications.forEach((n) => {
    if (n.userId === userId) n.read = true;
  });
  save(state);
}

export function setKitItem(userId, key, value) {
  const state = load();
  state.freelanceKit[userId] ||= { niche: false, profiles: false, proposals: false, pricing: false, delivery: false, plan: false };
  state.freelanceKit[userId][key] = value;
  save(state);
  return state.freelanceKit[userId];
}

export function resetDemo() {
  localStorage.removeItem(KEY);
  return load();
}

export function saveSite(site) {
  const state = load();
  state.site = site;
  save(state);
  return state.site;
}

export function patchHero(patch) {
  const state = load();
  state.site.hero = { ...state.site.hero, ...patch };
  save(state);
  return state.site;
}

export function patchContact(patch) {
  const state = load();
  state.site.contact = { ...DEFAULT_SITE.contact, ...(state.site.contact || {}), ...patch };
  save(state);
  return state.site.contact;
}

export function patchSection(id, patch) {
  const state = load();
  const i = state.site.sections.findIndex((s) => s.id === id);
  if (i < 0) throw new Error("Section not found.");
  state.site.sections[i] = { ...state.site.sections[i], ...patch };
  save(state);
  return state.site.sections[i];
}

export function setSectionVisible(id, visible) {
  return patchSection(id, { visible });
}

export function patchSectionItem(sectionId, itemId, patch) {
  const state = load();
  const section = state.site.sections.find((s) => s.id === sectionId);
  if (!section) throw new Error("Section not found.");
  const i = (section.items || []).findIndex((it) => it.id === itemId);
  if (i < 0) throw new Error("Item not found.");
  section.items[i] = { ...section.items[i], ...patch };
  save(state);
  return section.items[i];
}

export function setPhoto(key, src, alt) {
  const state = load();
  if (key === "hero.image") {
    state.site.hero.image = src;
    if (alt != null) state.site.hero.imageAlt = alt;
  } else if (key.startsWith("section:")) {
    const [, id] = key.split(":");
    const section = state.site.sections.find((s) => s.id === id);
    if (section) {
      section.image = src;
      if (alt != null) section.imageAlt = alt;
    }
  } else if (key.startsWith("item:")) {
    const [, sectionId, itemId] = key.split(":");
    const section = state.site.sections.find((s) => s.id === sectionId);
    const item = section?.items?.find((it) => it.id === itemId);
    if (item) {
      item.image = src;
      if (alt != null) item.imageAlt = alt;
    }
  }
  save(state);
  return state.site;
}

export function saveCourse(course) {
  const state = load();
  const i = state.courses.findIndex((c) => c.id === course.id);
  const next = {
    ...course,
    published: course.published !== false,
    fee: Number(course.fee) || 0,
    currency: course.currency || "PKR",
    billing: course.billing || "cohort",
  };
  if (i < 0) state.courses.push(next);
  else state.courses[i] = { ...state.courses[i], ...next };
  save(state);
  return state.courses;
}

export function deleteCourse(id) {
  const state = load();
  const course = state.courses.find((c) => c.id === id);
  if (!course) throw new Error("Course not found.");
  state.courses = state.courses.filter((c) => c.id !== id);
  state.enrollments = (state.enrollments || []).filter((e) => e.courseId !== id);
  (state.invoices || []).forEach((inv) => {
    if (inv.courseId === id && inv.status !== "paid") inv.status = "cancelled";
  });
  save(state);
  return state.courses;
}

export function setCoursePublished(id, published) {
  const state = load();
  const course = state.courses.find((c) => c.id === id);
  if (course) course.published = published;
  save(state);
  return course;
}

export function recordPayment(id, amount, method, note) {
  const state = load();
  const inv = (state.invoices || []).find((i) => i.id === id);
  if (!inv) throw new Error("Invoice not found.");
  const add = Number(amount);
  if (!(add > 0)) throw new Error("Enter a payment amount.");
  inv.paid = Number(inv.paid || 0) + add;
  inv.method = method || inv.method || "";
  if (note) inv.note = note;
  inv.updatedAt = new Date().toISOString();
  if (inv.paid >= Number(inv.amount)) inv.status = "paid";
  else inv.status = "partial";
  const course = findCourse(state, inv.courseId);
  notify(state, inv.userId, `A payment of ${inv.currency} ${add.toLocaleString("en-PK")} was recorded for ${course?.name || "your seat"}.`);
  save(state);
  return inv;
}

export function setInvoiceStatus(id, status, note) {
  const state = load();
  const inv = (state.invoices || []).find((i) => i.id === id);
  if (!inv) throw new Error("Invoice not found.");
  inv.status = status;
  if (note != null) inv.note = note;
  if (status === "paid") inv.paid = Number(inv.amount) || inv.paid;
  if (status === "waived") inv.paid = Number(inv.amount) || 0;
  inv.updatedAt = new Date().toISOString();
  const course = findCourse(state, inv.courseId);
  notify(state, inv.userId, `Your ${course?.name || "course"} fee was marked ${status}.`);
  save(state);
  return inv;
}

export function saveSection(section) {
  const state = load();
  state.site.sections ||= [];
  const next = {
    ...section,
    id: section.id,
    visible: section.visible !== false,
    items: Array.isArray(section.items) ? section.items : [],
  };
  const i = state.site.sections.findIndex((s) => s.id === next.id);
  if (i < 0) state.site.sections.push(next);
  else state.site.sections[i] = { ...state.site.sections[i], ...next };
  save(state);
  return next;
}

export function deleteSection(id) {
  const state = load();
  if (!state.site.sections.some((s) => s.id === id)) throw new Error("Section not found.");
  state.site.sections = state.site.sections.filter((s) => s.id !== id);
  save(state);
  return state.site.sections;
}

export function saveUser(user) {
  const state = load();
  const email = String(user.email || "").trim().toLowerCase();
  if (!user.name || !email) throw new Error("Name and email are required.");
  const i = user.id ? state.users.findIndex((u) => u.id === user.id) : -1;
  if (state.users.some((u, idx) => u.email.toLowerCase() === email && idx !== i)) {
    throw new Error("An account with this email already exists.");
  }
  if (i < 0) {
    if (!user.password) throw new Error("Password is required for a new user.");
    const next = {
      id: uid("u"),
      name: user.name,
      email,
      password: user.password,
      role: user.role || "student",
      city: user.city || "",
      bio: user.bio || "",
    };
    state.users.push(next);
    save(state);
    return next;
  }
  const prev = state.users[i];
  const next = {
    ...prev,
    name: user.name,
    email,
    role: user.role || prev.role,
    city: user.city ?? prev.city,
    bio: user.bio ?? prev.bio,
  };
  if (user.password) next.password = user.password;
  state.users[i] = next;
  save(state);
  return next;
}

export function deleteUser(id) {
  const state = load();
  const user = state.users.find((u) => u.id === id);
  if (!user) throw new Error("User not found.");
  if (user.role === "admin" && state.users.filter((u) => u.role === "admin").length <= 1) {
    throw new Error("Keep at least one admin account.");
  }
  state.users = state.users.filter((u) => u.id !== id);
  state.enrollments = (state.enrollments || []).filter((e) => e.userId !== id);
  (state.invoices || []).forEach((inv) => {
    if (inv.userId === id && inv.status !== "paid") inv.status = "cancelled";
  });
  save(state);
  return state.users;
}

export function saveApplication(app) {
  const state = load();
  state.applications ||= [];
  const i = state.applications.findIndex((a) => a.id === app.id);
  const course = findCourse(state, app.courseId || app.track);
  const next = {
    ...app,
    courseId: course?.id || app.courseId || "",
    track: course?.name || app.track || "",
    note: app.note || "",
    status: app.status || "pending",
  };
  if (i < 0) {
    const now = new Date().toISOString();
    state.applications.unshift({
      ...next,
      id: uid("a"),
      createdAt: now.slice(0, 10),
      createdAtFull: now,
    });
  } else {
    state.applications[i] = { ...state.applications[i], ...next };
  }
  save(state);
  return i < 0 ? state.applications[0] : state.applications[i];
}

export function deleteApplication(id) {
  const state = load();
  if (!(state.applications || []).some((a) => a.id === id)) throw new Error("Application not found.");
  state.applications = state.applications.filter((a) => a.id !== id);
  save(state);
  return state.applications;
}

export function withdrawApplication(id, actor) {
  const state = load();
  const app = (state.applications || []).find((a) => a.id === id);
  if (!app) throw new Error("Application not found.");
  const owns =
    (actor?.id && app.userId === actor.id) ||
    String(app.email).toLowerCase() === String(actor?.email || "").toLowerCase();
  if (!owns) throw new Error("You can only withdraw your own application.");
  if (app.status !== "pending" && app.status !== "waitlist") {
    throw new Error("Only pending or waitlisted applications can be withdrawn.");
  }
  state.applications = state.applications.filter((a) => a.id !== id);
  notify(state, state.users.find((u) => u.role === "admin")?.id, `${app.name} withdrew their application for ${app.track}.`);
  save(state);
  return state.applications;
}

export function saveMessage(msg) {
  const state = load();
  state.messages ||= [];
  const i = state.messages.findIndex((m) => m.id === msg.id);
  const next = { ...msg, status: msg.status || "new", read: (msg.status || "new") !== "new" };
  if (i < 0) {
    const now = new Date().toISOString();
    state.messages.unshift({
      ...next,
      id: uid("m"),
      createdAt: now.slice(0, 10),
      createdAtFull: now,
    });
  } else {
    state.messages[i] = { ...state.messages[i], ...next };
  }
  save(state);
  return i < 0 ? state.messages[0] : state.messages[i];
}

export function deleteMessage(id) {
  const state = load();
  if (!(state.messages || []).some((m) => m.id === id)) throw new Error("Message not found.");
  state.messages = state.messages.filter((m) => m.id !== id);
  save(state);
  return state.messages;
}

export function deletePhoto(key) {
  return setPhoto(key, "", "");
}

export function saveInvoice(inv) {
  const state = load();
  state.invoices ||= [];
  const i = state.invoices.findIndex((row) => row.id === inv.id);
  const amount = Number(inv.amount) || 0;
  const paid = Number(inv.paid) || 0;
  const next = {
    ...inv,
    amount,
    paid,
    currency: inv.currency || "PKR",
    status: inv.status || "due",
  };
  if (i < 0) {
    state.invoices.unshift({
      ...next,
      id: uid("inv"),
      createdAt: new Date().toISOString().slice(0, 10),
    });
  } else {
    state.invoices[i] = { ...state.invoices[i], ...next };
  }
  save(state);
  return i < 0 ? state.invoices[0] : state.invoices[i];
}

export function deleteInvoice(id) {
  const state = load();
  if (!(state.invoices || []).some((i) => i.id === id)) throw new Error("Invoice not found.");
  state.invoices = state.invoices.filter((i) => i.id !== id);
  save(state);
  return state.invoices;
}

export function listPhotos() {
  return collectPhotos(load().site);
}

export { matchCourse, collectPhotos };
