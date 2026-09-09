// Stock placeholders are not BLINK inventory. Replace with approved product photography.
const photo = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1000&q=80`;
export const images = {
  hero: '/images/hero.webp',
  street: photo('photo-1536243298747-ea8874136d64'),
  black: photo('photo-1577394580379-0b59ce5e1f01'),
  denim: photo('photo-1588050072892-e557e9a21f8d'),
  shirt: photo('photo-1623756598261-2092cc878b63'),
  stripe: photo('photo-1565366896067-3e7b52d395e2'),
  tee: photo('photo-1499713907394-43c9d094ac2e'),
  pants: photo('photo-1624378439575-d8705ad7ae80'),
  cap: photo('photo-1591818343198-4ff334074580'),
  shoes: photo('photo-1622760806530-3cb6301c087d'),
  sneaker: photo('photo-1587673680532-3f73c67c4abd'),
};
