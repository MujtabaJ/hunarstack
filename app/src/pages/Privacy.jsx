import { PageHero } from "../components/CourseCard";
import { useData } from "../context/DataContext";

export default function Privacy() {
  const { site } = useData();
  const email = site?.contact?.email || "hello@hunarstack.com";
  return (
    <>
      <PageHero kicker="Legal" title="Privacy Policy" text="How we collect, use and protect your information. Have a lawyer review before publishing." />
      <main id="main">
        <div className="wrap narrow legal">
          <p className="upd">Last updated: 21 September 2026</p>
          <p>This policy explains how HunarStack collects and uses your personal information when you use this product, apply for or attend courses, or hire us for software services.</p>
          <h2>1. Information we collect</h2>
          <ul>
            <li>Details you give us: name, email, phone, city, course choices and messages.</li>
            <li>Learning records: progress, assignments and feedback.</li>
            <li>This demo stores data in your browser only (localStorage). A live academy would use a secured server.</li>
          </ul>
          <h2>2. How we use it</h2>
          <p>To run classes, process applications, respond to enquiries and improve the academy. We do not sell personal information.</p>
          <h2>3. Your rights</h2>
          <p>Ask to see, correct or delete your information by emailing {email}.</p>
        </div>
      </main>
    </>
  );
}
