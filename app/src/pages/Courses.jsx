import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Seo from "../components/market/Seo";
import CourseCard from "../components/market/CourseCard";
import { CATEGORIES, searchCourses } from "../data/courses";
import { SITE } from "../data/site";

export default function Courses() {
  const [params, setParams] = useSearchParams();
  const category = params.get("category") || "";
  const q = params.get("q") || "";

  const list = useMemo(() => {
    const found = searchCourses(q);
    if (!category) return found;
    return found.filter((c) => c.category === category || c.also === category);
  }, [category, q]);

  const active = CATEGORIES.find((c) => c.id === category);

  function setCategory(id) {
    const next = new URLSearchParams(params);
    if (id) next.set("category", id);
    else next.delete("category");
    setParams(next);
  }

  return (
    <>
      <Seo
        title={active ? `${active.title} Courses | HunarStack Jamshoro` : "Courses | HunarStack Jamshoro"}
        description="Practical courses in programming, freelancing, AI, design, digital business and the creator economy at HunarStack, Jamshoro."
        path="/courses"
      />
      <header className="hs-hero-mini">
        <div className="hs-wrap">
          <p className="hs-crumbs"><Link to="/">Home</Link> <span>/</span> <span>Courses</span></p>
          <p className="hs-kicker">Course catalog</p>
          <h1>{active ? active.title : "Choose a skill. Then build with it."}</h1>
          <p className="hs-lead">{active ? active.text : "HunarStack is for beginners and for people who already know some technology. Professional courses are PKR 2,000–3,000/month. School pathways are priced separately."}</p>
        </div>
      </header>
      <main id="main" className="hs-page">
        <div className="hs-wrap">
          <div className="hs-tabs" aria-label="Categories">
            <button type="button" className={!category ? "is-on" : ""} onClick={() => setCategory("")}>All</button>
            {CATEGORIES.map((cat) => (
              <button key={cat.id} type="button" className={category === cat.id ? "is-on" : ""} onClick={() => setCategory(cat.id)}>
                {cat.title}
              </button>
            ))}
          </div>
          <form className="hs-form" style={{ marginBottom: 16, maxWidth: 480 }} onSubmit={(e) => {
            e.preventDefault();
            const next = new URLSearchParams(params);
            const value = new FormData(e.target).get("q");
            if (value) next.set("q", value);
            else next.delete("q");
            setParams(next);
          }}>
            <label>Search
              <input name="q" defaultValue={q} placeholder="Search courses" />
            </label>
          </form>
          <p className="hs-ph">{list.length} courses. Fees shown are the freelancing and professional monthly range. Income is not guaranteed.</p>
          <div className="hs-grid-3" style={{ marginTop: 14 }}>
            {list.map((course) => <CourseCard key={course.slug} course={course} />)}
          </div>
          {list.length === 0 && <p>No course matches that search. <Link to="/contact">Ask about a course</Link>.</p>}
          <p className="hs-actions" style={{ marginTop: 22 }}>
            <Link className="hs-btn hs-btn-primary" to="/enrol">Enroll Now →</Link>
            <a className="hs-btn hs-btn-green" href={SITE.whatsapp}>Talk on WhatsApp</a>
          </p>
        </div>
      </main>
    </>
  );
}
