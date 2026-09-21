import { Link } from "react-router-dom";
import { useData } from "../../context/DataContext";
import PlatformLogo from "../../components/PlatformLogo";
import { PLATFORM_META } from "../../data/visuals";

const ITEMS = [
  ["niche", "Choose a niche", "Pick two services you can actually deliver. Vague offers do not win work."],
  ["profiles", "Draft profiles", "Upwork, Fiverr or LinkedIn — rewrite AI drafts in your voice."],
  ["proposals", "Practice proposals", "Write against real briefs. Do not spray bids."],
  ["pricing", "Price and scope", "Fixed price or hourly, milestones, and what is out of scope."],
  ["delivery", "Delivery kit", "Updates, files, revisions. Reviews come from work, not slogans."],
  ["plan", "90-day plan", "A weekly routine. Clients are not provided."],
];

export default function FreelanceKit() {
  const { kit, setKit } = useData();

  return (
    <>
      <div className="dash-top">
        <div>
          <p className="kicker">Freelance readiness</p>
          <h1>A kit, not a shortcut.</h1>
          <p>Tick these as you complete them. This does not create clients, Job Success Score or income.</p>
        </div>
      </div>
      <div className="panel">
        <p className="kicker">Practice platforms</p>
        <div className="logo-row">
          {PLATFORM_META.map((p) => (
            <Link className="logo-chip" to={`/courses/${p.id}`} key={p.id}>
              <PlatformLogo id={p.id} size={28} />
              <span>{p.name}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="panel">
        {ITEMS.map(([key, title, text]) => (
          <label className="kit-item" key={key}>
            <input type="checkbox" checked={Boolean(kit[key])} onChange={(e) => setKit(key, e.target.checked)} />
            <span>
              <b>{title}</b>
              <p>{text}</p>
            </span>
          </label>
        ))}
      </div>
    </>
  );
}
