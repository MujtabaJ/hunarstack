import { FAQS } from "../../data/site";

export default function FaqList({ items = FAQS }) {
  return (
    <div className="hs-faq">
      {items.map((item) => (
        <details key={item.q}>
          <summary>{item.q}</summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  );
}
