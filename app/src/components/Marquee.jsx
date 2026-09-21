export default function Marquee({ children, reverse = false, speed = 36 }) {
  const list = Array.isArray(children) ? children : [children];
  return (
    <div className={`marquee ${reverse ? "is-reverse" : ""}`} style={{ "--marquee-s": `${speed}s` }}>
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div className="marquee-copy" key={copy} aria-hidden={copy === 1}>
            {list.map((child, i) => (
              <div className="marquee-item" key={`${copy}-${i}`}>{child}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
