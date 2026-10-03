import { Link, Navigate, useParams } from "react-router-dom";
import Seo from "../components/market/Seo";
import { getPost, POSTS } from "../data/blog";
import { imageForPost } from "../data/marketing/images";

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPost(slug);
  if (!post) return <Navigate to="/blog" replace />;
  const more = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <Seo title={`${post.title} | HunarStack`} description={post.excerpt} path={`/blog/${post.slug}`} />
      <main id="main" className="hs-page">
        <article className="hs-wrap hs-prose">
          <p className="hs-crumbs"><Link to="/">Home</Link> <span>/</span> <Link to="/blog">Blog</Link> <span>/</span> <span>{post.title}</span></p>
          <p className="hs-kicker">{post.category} · {post.date}</p>
          <h1>{post.title}</h1>
          <img className="hs-cover" src={imageForPost(post.slug)} alt="" width="1200" height="675" />
          {post.paragraphs.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
          <p className="hs-actions">
            <Link className="hs-btn hs-btn-primary" to="/courses">View Courses</Link>
            <Link className="hs-btn hs-btn-ghost" to="/enrol">Enroll Now →</Link>
          </p>
        </article>
        <div className="hs-wrap" style={{ marginTop: 28 }}>
          <h2>More from the journal</h2>
          <div className="hs-grid-3">
            {more.map((item) => (
              <Link className="hs-card" key={item.slug} to={`/blog/${item.slug}`}>
                <img className="hs-thumb" src={imageForPost(item.slug)} alt="" width="640" height="360" loading="lazy" />
                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
