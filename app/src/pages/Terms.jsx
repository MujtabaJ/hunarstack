import { PageHero } from "../components/CourseCard";

export default function Terms() {
  return (
    <>
      <PageHero kicker="Legal" title="Terms and Conditions" text="The rules that apply when you study or work with us. Have a lawyer review before publishing." />
      <main id="main">
        <div className="wrap narrow legal">
          <p className="upd">Last updated: 21 September 2026</p>
          <p>By creating an account, applying or paying, you accept these terms.</p>
          <h2>1. No guarantee of results</h2>
          <p>We teach practical skills and support your job or freelance search, but we do not guarantee employment, clients or income. Results depend on your effort and the market.</p>
          <h2>2. Conduct</h2>
          <p>Treat teachers and classmates with respect. Sharing login details or class recordings is not allowed.</p>
          <h2>3. Your work</h2>
          <p>You own the projects you create. Course materials belong to HunarStack and are for your personal use only.</p>
          <h2>4. Demo product</h2>
          <p>This version stores data locally in your browser. Demo passwords are for exploration, not production security.</p>
        </div>
      </main>
    </>
  );
}
