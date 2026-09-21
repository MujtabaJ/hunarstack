import { Link, Navigate, useParams } from "react-router-dom";
import { useData } from "../context/DataContext";
import { PageHero } from "../components/CourseCard";
import Crumbs, { Trail } from "../components/Crumbs";
import CourseCard from "../components/CourseCard";

export default function SectionDetail() {
  const { sectionId, itemId } = useParams();
  const { site, skillCourses, platformCourses, getCourse } = useData();
  const section = (site.sections || []).find((s) => s.id === sectionId);

  if (!section || section.visible === false) return <Navigate to="/" replace />;

  const item = itemId ? (section.items || []).find((it) => it.id === itemId) : null;
  if (itemId && !item) return <Navigate to={`/explore/${section.id}`} replace />;

  const related = [...skillCourses, ...platformCourses].filter((c) => {
    const hay = `${c.id} ${c.name} ${c.query}`.toLowerCase();
    const needle = (item?.id || section.id).toLowerCase();
    return hay.includes(needle) || (item?.to || "").includes(c.id);
  });

  return (
    <>
      <PageHero kicker={section.kicker || "From the homepage"} title={item?.title || section.title} text={item?.text || section.text} />
      <main id="main">
        <div className="wrap">
          <Crumbs
            items={[
              { label: "Home", to: "/" },
              { label: section.title, to: item ? `/explore/${section.id}` : undefined },
              item ? { label: item.title } : null,
            ]}
          />
          <Trail
            backTo={item ? `/explore/${section.id}` : "/"}
            backLabel={item ? "Back to this section" : "Back to home"}
            extra={
              <>
                <Link className="btn btn-ghost" to="/">Change section</Link>
                {item && <Link className="btn btn-ghost" to={`/explore/${section.id}`}>Change selection</Link>}
              </>
            }
          />

          {(item?.image || section.image) && (
            <figure className="detail-photo">
              <img src={item?.image || section.image} alt={item?.imageAlt || section.imageAlt || ""} />
            </figure>
          )}

          {item?.steps?.length ? (
            <ol className="flow-chain">
              {item.steps.map((s) => <li key={s}>{s}</li>)}
            </ol>
          ) : null}

          {!item && section.items?.length ? (
            <>
              <h2>Choose a part of this story</h2>
              <div className="grid grid-2">
                {section.items.map((it) => (
                  <Link className="card block-link" key={it.id} to={it.to || `/explore/${section.id}/${it.id}`}>
                    {it.image && <img src={it.image} alt="" style={{ width: "100%", borderRadius: 12, marginBottom: 12 }} />}
                    <h3>{it.mark ? `${it.mark} · ` : ""}{it.title}</h3>
                    <p>{it.text || it.tags}</p>
                  </Link>
                ))}
              </div>
            </>
          ) : null}

          {item && (
            <div className="chip-row" style={{ margin: "22px 0" }}>
              {(section.items || []).map((it) => (
                <Link key={it.id} className="btn btn-ghost" to={it.to || `/explore/${section.id}/${it.id}`}>{it.title}</Link>
              ))}
            </div>
          )}

          {related.length > 0 && (
            <>
              <h2>Related tracks</h2>
              <div className="grid grid-2">
                {related.slice(0, 4).map((c) => <CourseCard key={c.id} course={c} />)}
              </div>
            </>
          )}

          {item?.to && getCourse(item.to.replace("/courses/", "")) && (
            <p className="btns">
              <Link className="btn btn-main" to={item.to}>Open this course</Link>
            </p>
          )}

          {section.note && <p className="note">{section.note}</p>}
        </div>
      </main>
    </>
  );
}
