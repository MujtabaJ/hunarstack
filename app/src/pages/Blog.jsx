import { Link, useSearchParams } from "react-router-dom";
import Seo from "../components/market/Seo";
import { BLOG_CATEGORIES, postsIn } from "../data/blog";

export default function Blog() {
  const [params, setParams] = useSearchParams();
  const category = params.get("category") || "";
  const posts = postsIn(category);

  return (
    <>
      <Seo title="Blog | HunarStack" description="Practical writing on freelancing, AI, programming and student careers from HunarStack in Jamshoro." path="/blog" />
      <header className="hs-hero-mini">
        <div className="hs-wrap">
          <p className="hs-crumbs"><Link to="/">Home</Link> <span>/</span> <span>Blog</span></p>
          <p className="hs-kicker">Journal</p>
          <h1>Learn the ideas before the class.</h1>
        </div>
      </header>
      <main id="main" className="hs-page">
        <div className="hs-wrap">
          <div className="hs-tabs">
            <button type="button" className={!category ? "is-on" : ""} onClick={() => setParams({})}>All</button>
            {BLOG_CATEGORIES.map((cat) => (
              <button key={cat} type="button" className={category === cat ? "is-on" : ""} onClick={() => setParams({ category: cat })}>{cat}</button>
            ))}
          </div>
          <div className="hs-grid-3">
            {posts.map((post) => (
              <article className="hs-card" key={post.slug}>
                <p className="hs-kicker">{post.category}</p>
                <h2 style={{ fontSize: "1.3rem", maxWidth: "none" }}><Link to={`/blog/${post.slug}`}>{post.title}</Link></h2>
                <p>{post.excerpt}</p>
                <p className="hs-ph">{post.date}</p>
                <Link to={`/blog/${post.slug}`}>Read article →</Link>
              </article>
            ))}
          </div>
          {posts.length === 0 && <p>No articles in this category yet.</p>}
        </div>
      </main>
    </>
  );
}
