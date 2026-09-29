import { Link } from "react-router-dom";
import Seo from "../components/market/Seo";
import FaqList from "../components/market/FaqList";

export default function Faq() {
  return (
    <>
      <Seo title="FAQ | HunarStack Jamshoro" description="Fees, location, beginners, laptops, freelancing and AI at HunarStack in Jamshoro." path="/faq" />
      <header className="hs-hero-mini">
        <div className="hs-wrap">
          <p className="hs-crumbs"><Link to="/">Home</Link> <span>/</span> <span>FAQ</span></p>
          <h1>Questions before you join.</h1>
        </div>
      </header>
      <main id="main" className="hs-page">
        <div className="hs-wrap">
          <FaqList />
          <p className="hs-actions" style={{ marginTop: 18 }}>
            <Link className="hs-btn hs-btn-primary" to="/contact">Ask About a Course</Link>
            <Link className="hs-btn hs-btn-ghost" to="/enrol">Enroll Now →</Link>
          </p>
        </div>
      </main>
    </>
  );
}
