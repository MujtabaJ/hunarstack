import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useLayoutEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import AmbientField from "./AmbientField";
import { useReveal } from "../hooks/useReveal";

export default function Layout() {
  const loc = useLocation();
  useReveal(loc.pathname + loc.hash);

  useLayoutEffect(() => {
    document.body.classList.toggle("home", loc.pathname === "/");
  }, [loc.pathname]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [loc.pathname]);

  return (
    <>
      <AmbientField />
      <div className="site-layer">
        <a className="skip" href="#main">Skip to content</a>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}
