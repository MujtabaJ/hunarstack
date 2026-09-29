import { SITE } from "../../data/site";

export default function AcademyMap() {
  return (
    <div className="hs-map-frame">
      <iframe
        title="HunarStack on the map, A-132 Phase 1, Society, Jamshoro"
        src={SITE.mapEmbed}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
