// ──────────────────────────────────────────────────────────────
// GTA Cars Dubai — central master data. All marketing copy is VERBATIM
// from gtacars.ae (scraped 2026-06). Inventory lives in the content
// collection (src/content/cars). NOTHING about the business is invented;
// gaps are flagged in JUDGEMENT_CALLS.md.
// ──────────────────────────────────────────────────────────────

export const site = {
  name: 'GTA Cars',
  legalName: 'GTA CARS', // trade licence / exact legal entity = Operator-TODO
  domain: 'gtacars.ae',
  city: 'Dubai',
  country: 'United Arab Emirates',
  // verbatim "About" one-liner used across the site
  about:
    'GTA Cars is a Dubai based leading car dealership that specializes in selling and buying quality pre-owned automobiles and provides world-class service to all customers.',
  tagline: 'Buy. Sell. All under one roof.',
};

export const contact = {
  // Primary showroom line (WhatsApp + call) — verbatim from the site header
  phonePrimary: '+971 58 512 1860',
  phonePrimaryHref: 'tel:+971585121860',
  landline: '+971 4 3233 216',
  landlineHref: 'tel:+97143233216',
  whatsapp: 'https://wa.me/971585121860',
  whatsappNumber: '+971 58 512 1860',
  email: 'info@gtacars.ae',
  emailHref: 'mailto:info@gtacars.ae',
  // CORRECT profiles — do NOT use the old footer's "BlacklineMotorCompany" links
  instagram: 'https://www.instagram.com/gtacars.ae',
  facebook: 'https://www.facebook.com/gtacars.ae',
  hours: 'Every day · 10 AM – 8 PM', // verbatim "EVERY DAY, 10 AM TO 8 PM"
  // Exact showroom address(es) are NOT published on gtacars.ae. Third-party
  // listings place GTA Cars in Al Quoz, Dubai (multiple showrooms). Shown as
  // area only until the operator confirms the exact unit — see JUDGEMENT_CALLS.md.
  area: 'Al Quoz, Dubai',
  addressNote: 'Al Quoz, Dubai · United Arab Emirates',
  mapQuery: 'GTA Cars, Al Quoz, Dubai',
};

export type NavItem = { label: string; href: string };
export const nav: NavItem[] = [
  { label: 'Buy', href: '/our-cars' },
  { label: 'Sell', href: '/sell-your-car' },
  { label: 'Services', href: '/about#services' },
  { label: 'Financing', href: '/finance' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

// Sell mega-menu (the three sell routes) — verbatim labels
export const sellMenu: NavItem[] = [
  { label: 'Sell Your Car', href: '/sell-your-car' },
  { label: 'Consign Your Car', href: '/consignment' },
  { label: 'Part Exchange', href: '/part-exchange' },
];

// ── The five purchasing specialists — verbatim (Sell Your Car page) ──
export type Specialist = { name: string; phone: string; tel: string; wa: string };
export const sellSpecialists: Specialist[] = [
  { name: 'Alex', phone: '+971 56 965 1606', tel: 'tel:+971569651606', wa: 'https://wa.me/971569651606' },
  { name: 'Talat', phone: '+971 50 154 0433', tel: 'tel:+971501540433', wa: 'https://wa.me/971501540433' },
  { name: 'Aqeel', phone: '+971 50 435 3324', tel: 'tel:+971504353324', wa: 'https://wa.me/971504353324' },
  { name: 'Levan', phone: '+971 56 951 0559', tel: 'tel:+971569510559', wa: 'https://wa.me/971569510559' },
  { name: 'Mina', phone: '+971 54 751 6249', tel: 'tel:+971547516249', wa: 'https://wa.me/971547516249' },
];

// ── Body-type filter set — verbatim from the /our-cars filter UI ──
export const bodyTypes: string[] = [
  'SUV', 'Coupe', 'Sedan', 'Crossover', 'Convertible', 'Pick Up Truck', 'Hatchback', 'Van', 'Wagon',
];

// ── Services — verbatim from /about (the six things GTA does) ──
export type Service = { slug: string; title: string; icon: string; href: string; body: string };
export const services: Service[] = [
  { slug: 'buy', title: 'Buy a car', icon: 'Car', href: '/our-cars',
    body: 'Certified pre-owned vehicles from all manufacturers, inspected and ready to drive.' },
  { slug: 'sell', title: 'Sell a car', icon: 'Tag', href: '/sell-your-car',
    body: 'Professional appraisals and competitive offers — we buy any car.' },
  { slug: 'consignment', title: 'Consignments', icon: 'Handshake', href: '/consignment',
    body: 'Retain ownership while the dealership handles the sale on your behalf.' },
  { slug: 'part-exchange', title: 'Part Exchange', icon: 'ArrowLeftRight', href: '/part-exchange',
    body: 'Trade in your current car and apply its value to your next one.' },
  { slug: 'finance', title: 'Car Finance', icon: 'Landmark', href: '/finance',
    body: 'Customized financing solutions, bank-approved through the UAE’s leading banks.' },
  { slug: 'registration', title: 'Registration & Renewal', icon: 'ClipboardCheck', href: '/contact',
    body: 'RTA ownership transfer, registration and annual renewals handled for you.' },
];

// ── SELL YOUR CAR — all copy verbatim ──
export const sell = {
  heroTitle: 'Sell Your Car Today',
  heroBody:
    'We buy any car and would love to buy yours. We pride ourselves on being fair, friendly and efficient. There’s no hassle with no hidden or unexpected fees and your sale will be dealt with professionally.',
  bullets: [
    'Fair and Competitive Market Price.',
    'Provide a Hassle Free Process.',
    'Complimentary Vehicle Inspection.',
    'We Settle Existing Auto Loans with the Bank.',
  ],
  // Sell form fields — verbatim labels
  formFields: ['Name', 'Phone Number', 'Email', 'Car Make', 'Car Model', 'Year', 'KM (Mileage)', 'Asking Price'],
  process: [
    'Fill in your vehicle details in the form above.',
    'A member of our purchasing team will contact you to book an appointment.',
    'Get a free no-obligation inspection and evaluation, followed by an offer of the buying price',
    'If you accept the offer, cash or wire transfer will be paid immediately! GTA Cars will handle all the RTA and required paperwork.',
  ],
  why: [
    'GTA Cars is one of the fastest-growing showrooms in the UAE.',
    'Our reputable team has over hundreds of years of combined automotive experience.',
    'You will eliminate the hassle of dealing with anonymous people or the costly upkeep and advertising of your car.',
    'You are under no obligation to sell your car to us. Selling your car to us is completely free and entirely up to you.',
    'Our reputation in quality of customer service is second to none.',
    'Complete and extensive market knowledge of the automotive market.',
    'We handle the inspection, ownership transfer and payment all under one roof. You will receive your secure payment directly by bank transfer from us.',
    'We will assist you with closing any outstanding loans directly with the bank, saving you all the hassle',
  ],
  closer: 'Creating a 5-Star Customer Experience',
  closerSub: 'So what are you waiting for? Sell your car now!',
};

// ── CONSIGNMENT — verbatim ──
export const consignment = {
  heroTitle: 'Consign Your Car',
  heroBody:
    'Would you like to sell your car from the comfort of your home, hassle-free and with no hidden costs and fees at all? Car consignment allows you to retain ownership of your car while we sell it on your behalf.',
  why: [
    'One of the fastest-growing showrooms in the UAE.',
    'Specializes in 0% down payment finance options.',
    'Professional sales team manages viewings and test drives.',
    'Display in three luxury showrooms.',
    'Extensive customer base and multi-platform promotion.',
    'Handles negotiations on behalf of owners.',
    'Daily car maintenance and cleaning.',
    'Flexible payment methods — cash, cheque, online transfer.',
    'Over 100 years combined sales experience.',
    'Multilingual staff (10+ languages).',
    'Thousands of active social media followers.',
  ],
};

// ── PART EXCHANGE — verbatim ──
export const partExchange = {
  heroTitle: 'Upgrade your drive, trade in your car today',
  body: [
    'Looking to upgrade your vehicle? At GTA Cars, we make part exchanging your current car simple, fast, and fair. Whether you’re eyeing a luxury SUV, a performance coupe, or a daily driver from our premium stock, we’ll offer you a competitive market value for your existing vehicle.',
    'Our expert team will inspect your car and provide a transparent valuation based on current market trends. The value of your old vehicle can then be directly applied toward purchasing your next car, reducing the hassle, saving you time, and cutting down the cost.',
    'No obligation. No hidden charges. Just a smart, streamlined way to move into your next car with ease.',
  ],
  why: [
    'Competitive and accurate valuations',
    'Instant appraisal and same-day decision',
    'Apply your car’s value directly to your next purchase',
    'All makes and models accepted',
    'Hassle-free and professional process',
  ],
};

// ── FINANCE — verbatim ──
export const finance = {
  heroTitle: 'Finance Your Car Today',
  body: [
    'Financing your next vehicle should be as smooth as the drive itself. That’s why we’ve partnered with all leading banks in the UAE to bring you straightforward, secure, and bank-approved car finance solutions.',
    'Our in-house team takes care of the entire process, from document collection to bank coordination, so you don’t have to worry about a thing.',
    'Just trusted, transparent financing through the UAE’s most reliable banks.',
  ],
  formFields: ['Name', 'Phone Number', 'Email', 'Employment Status', 'Car Make', 'Car Model'],
  benefits: [
    'Fast and easy approval process',
    'Low down payment options available',
    'Flexible repayment terms up to 5 years',
    'We handle all bank coordination and documentation',
    'Competitive rates from trusted UAE banks',
  ],
  note: 'Contact our finance team to explore the best car finance plans tailored for you. Exact rates and terms are confirmed by the bank on application — Operator-TODO.',
};

// ── ABOUT — verbatim ──
export const about = {
  intro:
    'GTA Cars, located in the heart of Dubai, is a premier car dealership known for offering exceptional service to all customers. We specialize in buying and selling quality pre-owned vehicles at competitive prices.',
  experience:
    'Our team brings over 100 years of combined automotive experience from the UAE and internationally. Beyond vehicle sales, we assist with purchasing, selling, and exchanging cars, plus financial services and car registration support.',
  // verbatim team first-names from the About page (no fabricated titles/photos)
  team: ['Amgad', 'Jack', 'Talaat', 'Youness', 'Ken', 'Hicham', 'Saif', 'Osama', 'Walid', 'Reda', 'Aqeel', 'Touqeer', 'Taz', 'Anwar', 'Tito', 'Huseyin', 'Liam', 'Michael', 'Arthur', 'Ayush', 'Nabeel'],
};

// Shared closer used across sell-flow pages — verbatim
export const letsTalk = {
  title: 'Let’s talk',
  body: 'One of our experts will be delighted to answer any questions you may have. So please get in touch.',
};

export const SITE_URL = 'https://demo-gtacars.pages.dev';
