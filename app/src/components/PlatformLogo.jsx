function Frame({ color, children, size, title }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} role="img" aria-label={title}>
      <rect width="32" height="32" rx="9" fill={color} />
      {children}
    </svg>
  );
}

function Word({ children, size = 12 }) {
  return (
    <text x="16" y="21" textAnchor="middle" fill="#fff" fontFamily="Outfit, Nunito, sans-serif" fontSize={size} fontWeight="800">
      {children}
    </text>
  );
}

const MARKS = {
  upwork: (s) => (
    <Frame color="#14A800" size={s} title="Upwork">
      <Word size="11">Up</Word>
    </Frame>
  ),
  fiverr: (s) => (
    <Frame color="#1DBF73" size={s} title="Fiverr">
      <Word>fi</Word>
    </Frame>
  ),
  freelancer: (s) => (
    <Frame color="#0E1724" size={s} title="Freelancer.com">
      <path fill="#29B2FE" d="M8 23 16.6 8h3.6L12.2 23H8zm8.8 0 4.6-7.6h3.6L20.6 23h-3.8z" />
    </Frame>
  ),
  linkedin: (s) => (
    <Frame color="#0A66C2" size={s} title="LinkedIn">
      <Word size="13">in</Word>
    </Frame>
  ),
  tiktok: (s) => (
    <Frame color="#111" size={s} title="TikTok">
      <path fill="#25F4EE" d="M18.2 8.4c.8 2 2.4 3.5 4.4 4.1v2.6c-1.5-.1-2.9-.6-4.1-1.4v6.2c0 3.5-2.9 6.3-6.5 6.3-1.3 0-2.5-.4-3.5-1 1.7 1.7 4.4 2.2 6.7 1.1 2.4-1.1 3.9-3.5 3.9-6.1V8.4h-.9z" />
      <path fill="#fff" d="M16.2 12.4v2.7c-2.5.2-4.5 2.2-4.5 4.7 0 .8.2 1.5.6 2.2-1.7-.7-2.8-2.4-2.8-4.3 0-2.7 2.1-4.9 4.8-5.2.6-.1 1.3 0 1.9.2z" />
    </Frame>
  ),
  youtube: (s) => (
    <Frame color="#FF0000" size={s} title="YouTube">
      <path fill="#fff" d="M13 11.2 20.6 16 13 20.8V11.2z" />
    </Frame>
  ),
  facebook: (s) => (
    <Frame color="#1877F2" size={s} title="Facebook">
      <Word size="16">f</Word>
    </Frame>
  ),
  peopleperhour: (s) => (
    <Frame color="#FF7A00" size={s} title="PeoplePerHour">
      <Word size="11">PP</Word>
    </Frame>
  ),
  toptal: (s) => (
    <Frame color="#204ECF" size={s} title="Toptal">
      <Word size="14">T</Word>
    </Frame>
  ),
  remote: (s) => (
    <Frame color="#0B7A52" size={s} title="Remote platforms">
      <circle cx="16" cy="16" r="7" fill="none" stroke="#fff" strokeWidth="2" />
      <ellipse cx="16" cy="16" rx="3.2" ry="7" fill="none" stroke="#fff" strokeWidth="1.6" />
      <path fill="none" stroke="#fff" strokeWidth="1.6" d="M9 16h14" />
    </Frame>
  ),
};

export function hasPlatformLogo(id) {
  return Boolean(MARKS[id]);
}

export default function PlatformLogo({ id, size = 32, className = "" }) {
  const render = MARKS[id];
  if (!render) return null;
  return <span className={`platform-logo ${className}`}>{render(size)}</span>;
}
