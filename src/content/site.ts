// All copy for the fictional "VERNE N°7" residence. Line arrays are rendered
// with explicit breaks so headings keep the reference's typographic rhythm.

export const brand = {
  name: "VERNE N°7",
  tagline: ["The art of", "private living"],
  cta: "Choose an apartment",
};

export const nav = [
  { label: "Location", href: "#location" },
  { label: "Architecture", href: "#architecture" },
  { label: "Infrastructure", href: "#infrastructure" },
  { label: "Amenities", href: "#advantages" },
  { label: "Apartments", href: "#apartments" },
  { label: "Services", href: "#services" },
  { label: "Penthouses", href: "#penthouses" },
];

export const intro = {
  title: ["Private residence —", "a statement", "of who you are"],
  bg: { dusk: "/images/hero/towers-dusk.webp", night: "/images/hero/towers-night.webp" },
  cutout: "/images/hero/woman-cutout.webp",
};

export const about = {
  title: ["Life on", "your own terms"],
  image: "/images/about/facade.webp",
  video: "About the project",
  offer: { label: ["Payment plans", "& mortgage"], title: ["Current", "offers"], link: "View" },
};

export const location = {
  image: "/images/about/car.webp",
  label: "Location advantage",
  text: "Landmark towers and the city’s grandest boulevards are within reach. The capital opens up around you like a gallery of endless possibilities.",
  title: "Location",
  cards: [
    { title: "Riverside park", image: "/images/location/park.webp" },
    { title: "Private school", image: "/images/location/school.webp" },
    { title: "Sports centre", image: "/images/location/sport.webp" },
    { title: "Embankment", image: "/images/location/embankment.webp" },
    { title: "Restaurants", image: "/images/location/restaurants.webp" },
  ],
};

export const panorama = {
  label: ["A world that", "adapts to you"],
  text: "More than three elegant towers with the service of a grand hotel. It is a home where every detail bends to your rhythm and follows your wishes.",
  image: "/images/panorama/couple.webp",
};

export const architecture = {
  label: "Architecture",
  text: "Three towers in the spirit of classic Manhattan high-rises combine refined proportions with a thoroughly modern way of life.",
  wide: "/images/architecture/wide.webp",
  lightingTitle: ["Panoramic windows", "and facade", "lighting"],
  lightingSmall: "/images/architecture/lights-b.webp",
  lightingLarge: "/images/architecture/lights-a.webp",
  materialsTitle: ["Premium", "materials"],
  materials: "/images/architecture/materials.webp",
  materialsText:
    "Luxury lives in every finish: in the veining of natural stone, in the brass of the window frames, in the crystal cascade of the chandeliers.",
  interiorA: "/images/architecture/chandelier.webp",
  interiorB: "/images/architecture/sconces.webp",
};

export const gallery = {
  title: "Gallery",
  count: "/12 photos",
  images: [
    "/images/gallery/winter.webp",
    "/images/gallery/autumn.webp",
    "/images/gallery/playground.webp",
    "/images/gallery/bouquet.webp",
    "/images/gallery/family.webp",
  ],
};

export const schedule = {
  label: "Daily rhythm",
  items: [
    { time: "07:00", image: "/images/schedule/dawn.webp", text: "Wake to the first light of dawn as the city unfolds beyond panoramic windows, filling your home with calm and clarity." },
    { time: "08:00", image: "/images/schedule/yoga.webp", text: "Begin the morning with open-air yoga on the terrace: fresh air, soft sun and unhurried movement before the day begins." },
    { time: "11:00", image: "/images/schedule/concierge.webp", text: "Attentive service from the first step into the lobby — transport, reservations and the small daily tasks are handled for you." },
    { time: "14:00", image: "/images/schedule/cowork.webp", text: "Focus in a private co-working lounge with meeting rooms, quiet booths and long views across the skyline." },
    { time: "21:00", image: "/images/schedule/dinner.webp", text: "End the day with candlelight and city lights, in a home designed for slow evenings and good company." },
  ],
};

export const lobby = {
  image: "/images/lobby/woman.webp",
  text: "The lobby draws on the great hotels of the world: two-metre mirrors, glossy dark stone walls and cascading crystal chandeliers.",
  title: ["The luxury", "of arrival"],
};

export const advantages = {
  label: "Amenities",
  items: [
    { title: ["Lobby"], image: "/images/advantages/lobby.webp", text: "Generous lobbies welcome residents with impeccable interiors and a quiet lounge — understated luxury in the manner of the finest hotels." },
    { title: ["Concierge", "service"], image: "/images/advantages/concierge.webp", text: "A personal assistant who looks after your time: transport, tickets and everyday errands, handled with care and discretion." },
    { title: ["Community", "lounge"], image: "/images/advantages/community.webp", text: "A library lounge for conversation and reading, where neighbours meet over coffee and the afternoon slows down." },
    { title: ["Co-working", "space"], image: "/images/schedule/cowork.webp", text: "When a big idea arrives, bring it downstairs: meeting rooms with panoramic windows present your plans in the best light." },
    { title: ["Courtyard lounge", "with fireplace", "and fountain"], image: "/images/advantages/courtyard.webp", text: "A secluded corner at the heart of the complex. Greenery, an open fire and soft seating create an atmosphere of calm." },
  ],
};

export const fitness = {
  title: ["Fitness club", "with a 25 m", "swimming pool"],
  blocks: [
    { kind: "image", src: "/images/fitness/pool.webp", w: 520, h: 640, top: 70 },
    { kind: "text", text: "Sport and luxury meet in a 25-metre, three-lane pool. Clear water, soft loungers, light that dissolves the edges — train hard, or simply drift.", top: 470 },
    { kind: "image", src: "/images/fitness/spa.webp", w: 300, h: 400, top: 40 },
    { kind: "image", src: "/images/fitness/sauna.webp", w: 300, h: 400, top: 40, caption: "The scent of cedar and the hiss of hot stones in the sauna restore your energy any day of the week." },
    { kind: "text", text: "Smart trainers with built-in coaching help you keep strength, balance and flexibility — cable stations, racks and free weights, all premium.", top: 130, large: true },
    { kind: "image", src: "/images/fitness/gym.webp", w: 520, h: 640, top: 70 },
    { kind: "image", src: "/images/fitness/boxing.webp", w: 420, h: 440, top: 270 },
    { kind: "text", text: "Feel unshakeable confidence in the boxing studio: balanced leather bags, Thai pads and modern equipment for speed and coordination.", top: 520 },
    { kind: "image", src: "/images/fitness/aerial.webp", w: 300, h: 360, top: 40 },
    { kind: "image", src: "/images/fitness/yoga.webp", w: 560, h: 640, top: 70 },
    { kind: "text", text: "The yoga studio offers an easy passage to stillness: soft light, a calm voice and the rhythm of breath bring body and mind back into balance.", top: 470 },
  ],
} as const;

export const infrastructure = {
  title: "Infrastructure",
  hero: "/images/infrastructure/street.webp",
  items: [
    { title: ["Restaurant", "and bar"], image: "/images/infrastructure/restaurant.webp", text: "A captivating dining room with signature dishes and a carefully curated cellar. Here time slows, so every sense can take its turn." },
    { title: ["Beauty salon"], image: "/images/infrastructure/beauty.webp", text: "New classics and bold trends, soft waves and precise colour, manicure and skin care — the salon’s masters do it all, and more." },
    { title: ["Spa & pet", "grooming"], image: "/images/infrastructure/grooming.webp", text: "Treat your four-legged friend to a fresh cut or a spa day. Professional grooming, steps from your door." },
  ],
};

export const park = {
  intro: "Rustling crowns, flower beds and a sculptural fountain that cools the hottest days with sunlit spray. A quiet place to rest among trees from the finest nurseries.",
  title: ["Private", "two-acre park"],
  text: "Fresh air and birdsong lead you to a park of your own, where maples rustle and birch branches sway. Free time takes the shape of your plans.",
  small: "/images/park/sculpture.webp",
  large: "/images/park/fountain.webp",
  wide: "/images/park/courtyard.webp",
};

export const apartments = {
  title: ["Splendid", "apartments"],
  text: "Refined finishes, neoclassical furniture and beauty in every detail. Wide views of the capital turn into a watercolour on the wall of your living room.",
  image: "/images/apartments/portrait.webp",
  tabs: [
    { label: "Studios", area: "26–30" },
    { label: "1BR", area: "36–65" },
    { label: "2BR", area: "56–67" },
    { label: "3BR", area: "64–80" },
    { label: "With terraces", area: "67–81" },
    { label: "Penthouse", area: "60–150" },
  ],
  conditionsLabel: "Purchase conditions:",
  conditions: "Mortgage, 0% instalment plan, trade-in",
};

export const services = {
  title: ["Technologies", "and services"],
  items: [
    { title: "Smart elevator", image: "/images/services/elevator.webp", text: "The building recognises when a resident is arriving and calls the lift to the right floor before you reach the door." },
    { title: "Control centre", image: "/images/services/control.webp", text: "Cameras across the grounds report to one control room, while the building platform monitors every engineering system around the clock." },
    { title: "Doorman service", image: "/images/services/doorman.webp", text: "Step into your new home with ease. We accompany you through registration and every formality, at every stage." },
  ],
};

export const penthouses = {
  title: ["Penthouses", "with glass roofs"],
  intro: "Rise to the top, look at a sky that has come much closer and take your place among the stars. Height, breadth and distance — every dimension is yours.",
  hero: "/images/penthouses/living.webp",
  woman: "/images/penthouses/woman.webp",
  text: "Sunlight pours through the glass above your head and returns the colours of the sunset. With soaring ceilings and refined decor, the penthouses feel like flight over a landscape of your own.",
  stats: [
    { value: "4.2 m", label: "Ceiling height", image: "/images/penthouses/bedroom.webp" },
    { value: "3.6 m", label: "Window height", image: "/images/penthouses/fireplace.webp" },
  ],
  terraceTitle: ["Private", "terraces"],
  terrace: "/images/penthouses/terrace.webp",
  terraceText:
    "Not just a place to unwind but an extension of your home — a garden in the sky, a stage for evening gatherings or a quiet spot under the stars.",
};

export const menu = {
  image: "/images/apartments/portrait.webp",
  card: ["Gallery of completed", "residences"],
};

export const footer = {
  copyright: "© 2026 VERNE N°7",
  credit: "Concept build — not a real development",
};
