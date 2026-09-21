const LABELS = {
  pending: "Pending",
  waitlist: "Waitlist",
  accepted: "Accepted",
  declined: "Declined",
  new: "New",
  read: "Read",
  done: "Done",
  review: "In review",
  approved: "Approved",
  paid: "Paid",
  due: "Due",
  partial: "Partial",
  waived: "Waived",
  cancelled: "Cancelled",
};

export default function StatusPill({ status }) {
  const key = String(status || "pending").toLowerCase();
  return <span className={`status-pill ${key.replace(/\s+/g, "-")}`}>{LABELS[key] || status}</span>;
}

export function initials(name) {
  return String(name || "?")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join("");
}
