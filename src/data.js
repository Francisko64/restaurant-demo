export const deliveryInfo = {
  etaMin: 25,
  etaMax: 35, // average delivery estimate, in minutes
};

export const ORIGINS = ["Italian", "French", "American", "Indian", "Asian"];
export const VIBES = ["Comforting", "Fresh & Light", "Bold & Spicy", "Treat Yourself", "Healthy-ish"];

export const ORIGIN_COLORS = {
  Italian: "#D9603B",
  Indian: "#E0952B",
  Asian: "#3E8E7E",
  American: "#4A87A3",
  French: "#4E4A7A",
};

export const ORIGIN_PASTELS = {
  Italian: "#F3DED4",
  Indian: "#F4E6D2",
  Asian: "#DCE5DE",
  American: "#DEE4E4",
  French: "#DFDBDD",
};

export const VIBE_COLORS = {
  "Comforting": "#E0A930",
  "Fresh & Light": "#6BB08A",
  "Bold & Spicy": "#C1443C",
  "Treat Yourself": "#A6467E",
  "Healthy-ish": "#4FA69C",
};

export const VIBE_PASTELS = {
  "Comforting": "#F4E7D3",
  "Fresh & Light": "#E1EDE5",
  "Bold & Spicy": "#F1DAD8",
  "Treat Yourself": "#EEDCE7",
  "Healthy-ish": "#DDECEA",
};

export const ORIGIN_ICONS = {
  Italian: "🍝",
  French: "🥐",
  American: "🍔",
  Indian: "🍛",
  Asian: "🍜",
};

export const VIBE_ICONS = {
  "Comforting": "🔥",
  "Fresh & Light": "🥗",
  "Bold & Spicy": "🌶️",
  "Treat Yourself": "🎉",
  "Healthy-ish": "🍃",
};

export const dishes = [
  { id: 1, name: "Bruschetta", description: "Toasted bread with tomatoes, garlic and fresh basil", price: 6.5, category: "Starters", emoji: "🍞", origin: "Italian", moods: ["Fresh & Light"] },
  { id: 2, name: "Soup of the Day", description: "Ask your waiter for today's homemade soup", price: 5.0, category: "Starters", emoji: "🍲", origin: null, moods: ["Comforting"] },
  { id: 3, name: "Garlic Prawns", description: "Sautéed king prawns in garlic butter and white wine", price: 9.5, category: "Starters", emoji: "🦐", origin: "French", moods: ["Bold & Spicy"] },
  { id: 4, name: "Caesar Salad", description: "Romaine lettuce, parmesan, croutons and Caesar dressing", price: 7.0, category: "Starters", emoji: "🥗", origin: "American", moods: ["Fresh & Light"] },
  { id: 5, name: "Classic Burger", description: "Beef patty, cheddar, lettuce, tomato and pickles", price: 14.0, category: "Mains", emoji: "🍔", origin: "American", moods: ["Comforting"] },
  { id: 6, name: "Grilled Salmon", description: "Atlantic salmon with lemon butter sauce and seasonal vegetables", price: 18.5, category: "Mains", emoji: "🐟", origin: null, moods: ["Healthy-ish"] },
  { id: 7, name: "Margherita Pizza", description: "San Marzano tomato sauce, fresh mozzarella and basil", price: 13.0, category: "Mains", emoji: "🍕", origin: "Italian", moods: ["Comforting"] },
  { id: 8, name: "Mushroom Risotto", description: "Arborio rice with wild mushrooms, white wine and parmesan", price: 15.0, category: "Mains", emoji: "🍚", origin: "Italian", moods: ["Comforting"] },
  { id: 9, name: "Chicken Tikka Masala", description: "Tender chicken in a rich tomato and cream sauce with rice", price: 16.0, category: "Mains", emoji: "🍛", origin: "Indian", moods: ["Bold & Spicy"] },
  { id: 10, name: "Chocolate Lava Cake", description: "Warm chocolate cake with a molten centre and vanilla ice cream", price: 7.5, category: "Desserts", emoji: "🍫", origin: "French", moods: ["Treat Yourself"] },
  { id: 11, name: "Crème Brûlée", description: "Classic French vanilla custard with a caramelised sugar crust", price: 6.5, category: "Desserts", emoji: "🍮", origin: "French", moods: ["Treat Yourself"] },
  { id: 12, name: "Tiramisu", description: "Italian coffee-soaked ladyfingers with mascarpone cream", price: 7.0, category: "Desserts", emoji: "☕", origin: "Italian", moods: ["Treat Yourself"] },
  { id: 13, name: "Vietnamese Spring Rolls", description: "Fresh rice-paper rolls with prawns, herbs and vermicelli, served with a peanut dipping sauce", price: 6.5, category: "Starters", emoji: "🌯", origin: "Asian", moods: ["Fresh & Light"] },
  { id: 14, name: "Pad Thai", description: "Stir-fried rice noodles with prawns, egg, beansprouts and crushed peanuts in a tangy tamarind sauce", price: 14.5, category: "Mains", emoji: "🍜", origin: "Asian", moods: ["Bold & Spicy"] },
];
