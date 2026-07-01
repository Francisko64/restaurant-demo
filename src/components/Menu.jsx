import { ORIGIN_PASTELS, VIBE_PASTELS } from "../data";

const CREAM = "#f8f4ef";

function computeBackground(selectedOrigins, selectedVibes) {
  const pastels =
    selectedOrigins.length > 0
      ? selectedOrigins.map((origin) => ORIGIN_PASTELS[origin])
      : selectedVibes.length > 0
        ? selectedVibes.map((vibe) => VIBE_PASTELS[vibe])
        : [];

  if (pastels.length === 0) return CREAM;
  if (pastels.length === 1) return pastels[0];
  if (pastels.length === 2) return `linear-gradient(135deg, ${pastels[0]}, ${CREAM} 50%, ${pastels[1]})`;
  return CREAM;
}

export default function Menu({ dishes, selectedOrigins, selectedVibes, onAddToCart }) {
  const hasFilters = selectedOrigins.length > 0 || selectedVibes.length > 0;

  function matchesStrict(dish) {
    const originMatch = selectedOrigins.length === 0 || selectedOrigins.includes(dish.origin);
    const vibeMatch = selectedVibes.length === 0 || dish.moods.some((mood) => selectedVibes.includes(mood));
    return originMatch && vibeMatch;
  }

  function matchesAny(dish) {
    return selectedOrigins.includes(dish.origin) || dish.moods.some((mood) => selectedVibes.includes(mood));
  }

  const strictMatches = dishes.filter(matchesStrict);
  const isClosestMatch = hasFilters && strictMatches.length === 0;
  const filteredDishes = isClosestMatch ? dishes.filter(matchesAny) : strictMatches;

  return (
    <section className="menu" style={{ background: computeBackground(selectedOrigins, selectedVibes) }}>
      <h2>{isClosestMatch ? "Closest matches" : "Menu"}</h2>

      <div className="dish-grid">
        {filteredDishes.map((dish) => (
          <div key={dish.id} className="dish-card">
            <span className="dish-emoji">{dish.emoji}</span>
            <div className="dish-info">
              <h3>{dish.name}</h3>
              <p>{dish.description}</p>
              <div className="dish-footer">
                <span className="dish-price">€{dish.price.toFixed(2)}</span>
                <button className="add-btn" onClick={() => onAddToCart(dish)}>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
