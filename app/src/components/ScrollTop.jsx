import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollTop() {
  const [show, setShow] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    setShow(false);
  }, [loc.pathname]);

  useEffect(() => {
    function onScroll() {
      setShow(window.scrollY > 360);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function goTop() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <button
      type="button"
      className={`scroll-top${show ? " is-on" : ""}`}
      onClick={goTop}
      aria-label="Back to top"
      title="Back to top"
      tabIndex={show ? 0 : -1}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 5v14M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
