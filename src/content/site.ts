// All copy for the fictional "VERNE N°7" residence. Display lines are arrays so
// headings keep their set breaks; `*word*` marks an italic accent in serif headings.

export const brand = {
  name: "VERNE N°7",
  word: "VERNE",
  number: "N°7",
  tagline: "Private residences above the old city",
  coords: ["48.8566° N", "2.3522° E"],
  year: "MMXXVI",
  cta: "Private viewing",
};

export const chapters = [
  { id: "top", n: "01", title: "Prologue" },
  { id: "manifesto", n: "02", title: "Manifesto" },
  { id: "place", n: "03", title: "Place" },
  { id: "architecture", n: "04", title: "Architecture" },
  { id: "day", n: "05", title: "A day at N°7" },
  { id: "amenities", n: "06", title: "Amenities" },
  { id: "neighbourhood", n: "07", title: "Neighbourhood" },
  { id: "residences", n: "08", title: "Residences" },
  { id: "epilogue", n: "09", title: "Epilogue" },
] as const;

export const nav = [
  { label: "Place", href: "#place", image: "/images/v2/panorama.webp" },
  { label: "Architecture", href: "#architecture", image: "/images/v2/arch-facade.webp" },
  { label: "A day at N°7", href: "#day", image: "/images/v2/day-dusk.webp" },
  { label: "Amenities", href: "#amenities", image: "/images/v2/gal-pool.webp" },
  { label: "Residences", href: "#residences", image: "/images/v2/gal-bedroom.webp" },
  { label: "Penthouses", href: "#epilogue", image: "/images/v2/pent-glass.webp" },
];

export const contact = {
  address: ["12 Quai des Tanneurs", "Sales gallery, by appointment"],
  phone: "+33 1 00 00 07 07",
  email: "hello@verne-n7.example",
  social: ["Instagram", "Journal", "Press"],
};

export const hero = {
  title: ["Live above", "*the city’s*", "noise."],
  images: ["/images/v2/hero-day.webp", "/images/v2/hero-night.webp"],
  states: ["Golden hour", "Blue hour"],
  intro: "Twenty-four storeys of limestone and bronze, rising quietly over the rooftops of the old city.",
};

export const manifesto = {
  label: "Manifesto",
  // Inline image pills sit between words; each `{pill}` is rendered as a small rounded photograph.
  parts: [
    "We built N°7 for people who measure luxury in",
    { pill: "/images/v2/pill-stone.webp" },
    "quiet. In stone that warms to the touch,",
    { pill: "/images/v2/pill-brass.webp" },
    "in bronze that darkens with the years, in light that moves through",
    { pill: "/images/v2/pill-linen.webp" },
    "linen, in mornings that begin",
    { pill: "/images/v2/pill-coffee.webp" },
    "slowly — high above the city’s noise.",
  ] as const,
  stats: [
    { value: "3", label: "Towers" },
    { value: "142", label: "Residences" },
    { value: "24", label: "Storeys" },
    { value: "4.2", label: "Metre ceilings" },
  ],
  offer: { label: "Current offers", text: "Payment plans, 0% instalments & private mortgage", link: "Read the terms" },
};

export const place = {
  label: "Place",
  title: ["At the centre,", "*never* in", "the middle."],
  text: "The grand boulevards are a short walk away, the river closer still. Yet behind the gates of N°7 the city falls silent, like a gallery after closing.",
  places: [
    { name: "Riverside park", time: "4 min", mode: "walk", image: "/images/location/park.webp", x: 18, y: 30 },
    { name: "Lycée Montaigne", time: "7 min", mode: "walk", image: "/images/location/school.webp", x: 70, y: 22 },
    { name: "Racquet club", time: "6 min", mode: "drive", image: "/images/location/sport.webp", x: 82, y: 62 },
    { name: "The embankment", time: "3 min", mode: "walk", image: "/images/location/embankment.webp", x: 30, y: 74 },
    { name: "Rue des Grands Chefs", time: "9 min", mode: "walk", image: "/images/location/restaurants.webp", x: 58, y: 84 },
  ],
  home: { x: 46, y: 50 },
};

export const panorama = {
  left: "A world",
  right: "*that bends*",
  last: "to your rhythm.",
  image: "/images/v2/panorama.webp",
  caption: "Floor-to-ceiling glass on every residence. The city becomes a painting that changes with the hour.",
};

export const architecture = {
  label: "Architecture",
  title: ["Stone,", "bronze", "& *light*."],
  text: "Three slender towers in pale Tivoli travertine, wrapped in hand-patinated bronze fins that catch the low sun and glow at night. Proportion first, ornament never.",
  facade: "/images/v2/arch-facade.webp",
  stair: "/images/v2/arch-stair.webp",
  materials: "/images/v2/arch-materials.webp",
  lobby: "/images/v2/arch-lobby.webp",
  colophon: [
    ["Facade", "Travertine, Tivoli"],
    ["Fins", "Bronze, hand-patinated"],
    ["Floors", "Smoked European oak"],
    ["Lobby", "Verde Alpi marble"],
    ["Architect", "Atelier Fictif"],
  ],
  lobbyCaption: "The lobby — double height, green marble, a single bronze desk.",
};

export const lobby = {
  quote: ["Arrival should", "feel like being", "*expected.*"],
  text: "A doorman who knows your name. A lobby that smells of cedar and stone. The world outside stays outside.",
  image: "/images/lobby/woman.webp",
};

export const gallery = {
  title: "Interiors",
  images: [
    { src: "/images/v2/gal-bedroom.webp", w: 4, h: 5, caption: "Master bedroom, dawn" },
    { src: "/images/v2/gal-terrace.webp", w: 3, h: 2, caption: "Roof terrace, dusk" },
    { src: "/images/v2/gal-bath.webp", w: 3, h: 4, caption: "Travertine bath" },
    { src: "/images/v2/gal-library.webp", w: 4, h: 5, caption: "Residents’ library" },
    { src: "/images/v2/gal-pool.webp", w: 3, h: 2, caption: "Lap pool, after hours" },
    { src: "/images/v2/gal-cellar.webp", w: 4, h: 5, caption: "Private cellar" },
  ],
};

export const day = {
  label: "A day at N°7",
  steps: [
    { time: "07:00", hour: 7, name: "Dawn", image: "/images/v2/day-dawn.webp", text: "First light on the rooftops. Coffee on cold stone, the city still asleep below." },
    { time: "13:00", hour: 13, name: "Noon", image: "/images/v2/day-noon.webp", text: "Lunch on the terrace under the pergola. The concierge has already booked tonight." },
    { time: "19:30", hour: 19.5, name: "Dusk", image: "/images/v2/day-dusk.webp", text: "Twenty lengths in a pool the colour of copper, as the sun goes down behind the domes." },
    { time: "23:00", hour: 23, name: "Night", image: "/images/v2/day-night.webp", text: "A last glass in the residents’ bar. Amber light, low voices, the city glittering." },
  ],
  // html background / foreground for each step
  palette: [
    ["#E4D6C3", "#1A1512"],
    ["#EDE6DA", "#0E0C0A"],
    ["#B4683E", "#120D0A"],
    ["#0E0C0A", "#EDE6DA"],
  ],
};

export const amenities = {
  label: "Amenities",
  items: [
    { title: "The lobby lounge", image: "/images/advantages/lobby.webp", text: "A hotel-grade lounge with a fireplace and a quiet bar, for guests you would rather not invite upstairs just yet." },
    { title: "Concierge", image: "/images/advantages/concierge.webp", text: "Tickets, tables, tailors and the small daily tasks — handled with discretion, around the clock." },
    { title: "The library", image: "/images/advantages/community.webp", text: "Walnut shelves, deep chairs and a neighbour’s recommendation. The afternoon slows down here." },
    { title: "Studio & salons", image: "/images/schedule/cowork.webp", text: "Private meeting salons with panoramic glass, for the ideas that arrive before breakfast." },
    { title: "The courtyard", image: "/images/advantages/courtyard.webp", text: "A walled garden at the heart of the towers: an open fire, a fountain and the sound of leaves." },
  ],
};

export const wellness = {
  title: ["Water,", "*stone*,", "breath."],
  blocks: [
    { kind: "image", src: "/images/fitness/pool.webp", w: 36, h: 66, top: 12, caption: "25 m lap pool" },
    { kind: "text", text: "Three lanes of still water under a stone vault. Train hard at seven, drift at ten — the light dissolves the edges either way.", top: 58 },
    { kind: "image", src: "/images/fitness/spa.webp", w: 20, h: 42, top: 6 },
    { kind: "image", src: "/images/fitness/sauna.webp", w: 20, h: 42, top: 50, caption: "Cedar sauna" },
    { kind: "text", text: "Cable stations, racks, free weights and trainers with built-in coaching — strength, balance, flexibility.", top: 18, large: true },
    { kind: "image", src: "/images/fitness/gym.webp", w: 34, h: 62, top: 22 },
    { kind: "image", src: "/images/fitness/boxing.webp", w: 26, h: 40, top: 8, caption: "Boxing studio" },
    { kind: "image", src: "/images/fitness/yoga.webp", w: 36, h: 66, top: 18, caption: "Yoga & breath" },
  ],
} as const;

export const neighbourhood = {
  label: "Neighbourhood",
  marquee: ["Restaurant", "Wine bar", "Atelier", "Salon", "Pâtisserie", "Spa", "Florist", "Gallery"],
  title: ["Everything,", "*downstairs*."],
  street: "/images/infrastructure/street.webp",
  items: [
    { title: "Restaurant & bar", image: "/images/infrastructure/restaurant.webp", text: "A dining room with a short menu and a long cellar." },
    { title: "Beauty salon", image: "/images/infrastructure/beauty.webp", text: "Colour, cut and skin care by appointment." },
    { title: "Pet spa", image: "/images/infrastructure/grooming.webp", text: "Grooming and day care, steps from your door." },
  ],
};

export const park = {
  title: ["Two acres", "of *private*", "green."],
  text: "Maples from the finest nurseries, a sculptural fountain, gravel paths that crunch underfoot. A park with one entrance — yours.",
  small: "/images/park/sculpture.webp",
  large: "/images/park/fountain.webp",
  wide: "/images/park/courtyard.webp",
};

type Room = { name: string; area: number; r: [number, number, number, number] };
export type Plan = { label: string; area: string; rooms: Room[] };

// Floor plans on a 100 × 70 grid: r = [x, y, w, h].
export const residences = {
  label: "Residences",
  title: ["Rooms with", "*a view* of", "everything."],
  text: "Herringbone oak, plaster walls, bronze ironmongery. Every plan is drawn around the windows, so the city becomes the largest painting in the house.",
  plans: [
    { label: "Studio", area: "26–30", rooms: [
      { name: "Living & sleeping", area: 18.4, r: [0, 0, 64, 70] },
      { name: "Kitchen", area: 5.2, r: [64, 0, 36, 30] },
      { name: "Bath", area: 4.1, r: [64, 30, 36, 40] },
    ] },
    { label: "One bed", area: "36–65", rooms: [
      { name: "Living", area: 22.6, r: [0, 0, 56, 44] },
      { name: "Kitchen", area: 8.1, r: [0, 44, 30, 26] },
      { name: "Bedroom", area: 14.2, r: [56, 0, 44, 44] },
      { name: "Bath", area: 5.4, r: [30, 44, 26, 26] },
      { name: "Dressing", area: 4.0, r: [56, 44, 44, 26] },
    ] },
    { label: "Two bed", area: "56–67", rooms: [
      { name: "Living", area: 26.1, r: [0, 0, 48, 42] },
      { name: "Kitchen", area: 9.0, r: [0, 42, 30, 28] },
      { name: "Master", area: 15.3, r: [48, 0, 52, 36] },
      { name: "Bedroom", area: 11.2, r: [62, 36, 38, 34] },
      { name: "Bath", area: 5.6, r: [30, 42, 32, 28] },
    ] },
    { label: "Three bed", area: "64–80", rooms: [
      { name: "Living", area: 28.4, r: [0, 0, 44, 40] },
      { name: "Kitchen", area: 9.6, r: [0, 40, 26, 30] },
      { name: "Master", area: 16.0, r: [44, 0, 30, 40] },
      { name: "Bedroom", area: 10.8, r: [74, 0, 26, 40] },
      { name: "Bedroom", area: 10.1, r: [62, 40, 38, 30] },
      { name: "Bath", area: 6.2, r: [26, 40, 36, 30] },
    ] },
    { label: "Terrace", area: "67–81", rooms: [
      { name: "Living", area: 30.2, r: [0, 0, 52, 46] },
      { name: "Terrace", area: 18.5, r: [52, 0, 48, 30] },
      { name: "Bedroom", area: 14.4, r: [52, 30, 48, 40] },
      { name: "Kitchen", area: 8.2, r: [0, 46, 30, 24] },
      { name: "Bath", area: 5.9, r: [30, 46, 22, 24] },
    ] },
    { label: "Penthouse", area: "60–150", rooms: [
      { name: "Salon", area: 48.0, r: [0, 0, 60, 44] },
      { name: "Glass room", area: 22.5, r: [60, 0, 40, 44] },
      { name: "Master suite", area: 26.0, r: [36, 44, 64, 26] },
      { name: "Kitchen", area: 14.8, r: [0, 44, 36, 26] },
    ] },
  ] satisfies Plan[],
  conditions: "Private mortgage · 0% instalments · Part exchange",
  cta: "Request the full plans",
};

export const services = {
  label: "Services",
  title: ["The house", "*thinks* ahead."],
  items: [
    { title: "Smart lift", image: "/images/services/elevator.webp", text: "The building recognises you at the gate and sends the lift to your floor before you reach the door." },
    { title: "Control room", image: "/images/services/control.webp", text: "Every camera, every system, watched over in one quiet room — day and night, without you ever noticing." },
    { title: "Doorman", image: "/images/services/doorman.webp", text: "Deliveries, guests, keys and formalities. From the day you move in, someone is always at the door." },
  ],
};

export const epilogue = {
  title: ["Penthouses", "under *glass*", "skies."],
  hero: "/images/v2/pent-glass.webp",
  text: "Glass roofs that return the colour of every sunset. Ceilings that rise like a held breath. The last four residences of N°7, and the closest to the sky.",
  stats: [
    { value: "4.2", unit: "m", label: "Ceiling height" },
    { value: "3.6", unit: "m", label: "Window height" },
    { value: "150", unit: "m²", label: "Up to" },
  ],
  terrace: "/images/v2/pent-terrace.webp",
  terraceText: "A garden in the sky for long dinners, or a quiet chair under the stars.",
  cta: { title: ["Arrange a", "*private*", "viewing."], button: "Enquire", image: "/images/v2/cta-door.webp" },
};

export const menu = {
  image: "/images/v2/menu-portrait.webp",
};

export const footer = {
  copyright: "© 2026 VERNE N°7",
  credit: "A concept — not a real development",
};
