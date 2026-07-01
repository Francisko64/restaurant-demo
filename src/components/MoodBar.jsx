import { ORIGINS, VIBES, ORIGIN_COLORS, VIBE_COLORS, ORIGIN_ICONS, VIBE_ICONS } from "../data";

function Chip({ icon, label, active, color, onClick }) {
  return (
    <button
      type="button"
      className="mood-chip"
      style={active ? { background: color, borderColor: color, color: "#fff" } : undefined}
      onClick={onClick}
    >
      <span aria-hidden="true">{icon}</span> {label}
    </button>
  );
}

export default function MoodBar({ selectedOrigins, selectedVibes, onToggleOrigin, onToggleVibe }) {
  return (
    <div className="mood-bar">
      <div className="mood-row">
        {ORIGINS.map((origin) => (
          <Chip
            key={origin}
            icon={ORIGIN_ICONS[origin]}
            label={origin}
            color={ORIGIN_COLORS[origin]}
            active={selectedOrigins.includes(origin)}
            onClick={() => onToggleOrigin(origin)}
          />
        ))}
      </div>
      <div className="mood-row">
        {VIBES.map((vibe) => (
          <Chip
            key={vibe}
            icon={VIBE_ICONS[vibe]}
            label={vibe}
            color={VIBE_COLORS[vibe]}
            active={selectedVibes.includes(vibe)}
            onClick={() => onToggleVibe(vibe)}
          />
        ))}
      </div>
    </div>
  );
}
