export function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    if (!file) return reject(new Error("No file selected."));
    if (file.size > 1800000) return reject(new Error("Please keep images under 1.8MB so they fit in this browser demo."));
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Could not read that file."));
    reader.readAsDataURL(file);
  });
}

export function matchCourse(list, id) {
  const key = String(id || "").toLowerCase();
  return (list || []).find(
    (c) =>
      c.id === key ||
      String(c.query || "").toLowerCase() === key ||
      String(c.name || "").toLowerCase() === key ||
      String(c.name || "").toLowerCase().replace(/&/g, "and") === key
  );
}
