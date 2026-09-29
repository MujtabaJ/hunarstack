import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useLayoutEffect } from "react";
import Header from "./market/Header";
import Footer from "./market/Footer";
import WhatsAppButton from "./market/WhatsAppButton";
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
      <div className="site-layer hs-site">
        <Header />
        <Outlet />
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
}
