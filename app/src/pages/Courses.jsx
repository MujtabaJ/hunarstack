import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useData } from "../context/DataContext";
import CourseCard from "../components/CourseCard";
import { PageHero } from "../components/CourseCard";
import Crumbs, { Trail } from "../components/Crumbs";
import PlatformLogo from "../components/PlatformLogo";
import { PLATFORM_META } from "../data/visuals";

export default function Courses() {
  const { skillCourses, platformCourses, liveCourses } = useData();
  const [params, setParams] = useSearchParams();
  const group = params.get("group") || "";
  const q = params.get("q") || "";

  const list = useMemo(() => {
    const pool = group === "skill" ? skillCourses : group === "platform" ? platformCourses : liveCourses;
    const needle = q.toLowerCase();
    return pool.filter((c) => `${c.name} ${c.blurb} ${c.learn}`.toLowerCase().includes(needle));
  }, [group, q, skillCourses, platformCourses, liveCourses]);

  function setGroup(next) {
    const nextParams = new URLSearchParams(params);
    if (next) nextParams.set("group", next);
    else nextParams.delete("group");
    nextParams.delete("q");
    setParams(nextParams);
  }

  const picking = !group;

  return (
    <>
      <PageHero
        kicker="Academy catalogue"
        title={picking ? "First, choose a path." : group === "skill" ? "Skill tracks" : group === "platform" ? "Platform courses" : "All courses"}
        text={picking
          ? "Narrow the catalogue, then pick a track. You can always go back and change this selection."
          : "Open a course for the weekly plan, or change your path if this is not the right list."}
      />
      <main id="main">
        <div className="wrap">
          <Crumbs
            items={[
              { label: "Home", to: "/" },
              { label: "Courses", to: picking ? undefined : "/courses" },
              !picking && { label: group === "skill" ? "Skill tracks" : group === "platform" ? "Platform courses" : "All courses" },
            ]}
          />
          {!picking && (
            <Trail
              backTo="/courses"
              backLabel="← Back to path choice"
              extra={
                <>
                  <button className="btn btn-ghost" type="button" onClick={() => setGroup("skill")}>Skill tracks</button>
                  <button className="btn btn-ghost" type="button" onClick={() => setGroup("platform")}>Platforms</button>
                  <button className="btn btn-ghost" type="button" onClick={() => setGroup("all")}>Show all</button>
                </>
              }
            />
          )}

          {picking ? (
            <div className="path-pick">
              <button type="button" className="pick-card" onClick={() => setGroup("skill")}>
                <span className="kicker">Step 1</span>
                <h2>Skill tracks</h2>
                <p>AI, software, web, mobile, design, cloud, automation, freelancing, remote work and real projects. {skillCourses.length} tracks.</p>
              </button>
              <button type="button" className="pick-card" onClick={() => setGroup("platform")}>
                <span className="kicker">Step 1</span>
                <h2>Platform courses</h2>
                <p>Upwork, Fiverr, Freelancer.com, LinkedIn, TikTok, YouTube and Facebook. {platformCourses.length} courses. Income is not guaranteed.</p>
                <div className="logo-row compact">
                  {PLATFORM_META.map((p) => <PlatformLogo key={p.id} id={p.id} size={28} />)}
                </div>
              </button>
              <button type="button" className="pick-card muted" onClick={() => setGroup("all")}>
                <span className="kicker">Or</span>
                <h2>Browse everything</h2>
                <p>See the full catalogue in one list, then filter.</p>
              </button>
            </div>
          ) : (
            <>
              <div className="filter-bar">
                <input
                  value={q}
                  onChange={(e) => {
                    const next = new URLSearchParams(params);
                    if (e.target.value) next.set("q", e.target.value);
                    else next.delete("q");
                    setParams(next);
                  }}
                  placeholder="Search inside this selection"
                />
              </div>
              <div className="grid grid-2">
                {list.map((c) => <CourseCard key={c.id} course={c} />)}
              </div>
              {list.length === 0 && <p className="note">No courses match. Change your selection or clear the search.</p>}
            </>
          )}
        </div>
      </main>
    </>
  );
}
