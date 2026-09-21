import { Link } from "react-router-dom";
import { PROJECT_MOCKUPS } from "../data/visuals";
import Marquee from "./Marquee";

export default function MockupStrip({ items = PROJECT_MOCKUPS, toBase = "/courses" }) {
  return (
    <div className="mockup-strip">
      <Marquee speed={42}>
        {items.map((item, i) => (
          <Link className={`device-mock ${item.device}`} to={`${toBase}/${item.id}`} key={`${item.id}-${i}`}>
            <div className="device-chrome">
              <span className="device-dots" aria-hidden="true"><i /><i /><i /></span>
              <img src={item.image} alt="" width="720" height="480" loading="lazy" />
            </div>
            <p className="device-cap"><b>{item.title}</b> · {item.course}</p>
          </Link>
        ))}
      </Marquee>
    </div>
  );
}
