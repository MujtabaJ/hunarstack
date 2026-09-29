import { useEffect } from "react";

export default function Seo({ title, description, path = "/", jsonLd }) {
  const serialized = jsonLd ? JSON.stringify(jsonLd) : "";
  useEffect(() => {
    const prev = document.title;
    document.title = title;
    setMeta("description", description);
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("og:url", `https://www.hunarstack.com${path}`, "property");
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `https://www.hunarstack.com${path}`;

    let script;
    if (serialized) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.hs = "ld";
      script.textContent = serialized;
      document.head.appendChild(script);
    }
    return () => {
      document.title = prev;
      if (script) script.remove();
    };
  }, [title, description, path, serialized]);
  return null;
}

function setMeta(name, content, attr = "name") {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}
