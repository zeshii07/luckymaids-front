import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Clock3,
  Home,
  Leaf,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Tag,
  UserCheck,
  Wrench,
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import RelatedServices from "../../components/RelatedServices";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=1800&q=85";
const RESIDENTIAL_IMAGE =
  "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80";
const COMMERCIAL_IMAGE =
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80";

const villaFurnished = [
  { id: "vf1", name: "1 Bedroom Villa", price: 400, original: 450 },
  { id: "vf2", name: "2 Bedroom Villa", price: 500, original: 550 },
  { id: "vf3", name: "3 Bedroom Villa", price: 600, original: 700, popular: true },
  { id: "vf4", name: "4 Bedroom Villa", price: 700, original: 800 },
  { id: "vf5", name: "5 Bedroom Villa", price: 800, original: 950 },
];

const villaUnfurnished = [
  { id: "vu1", name: "1 Bedroom Villa", price: 350, original: 400 },
  { id: "vu2", name: "2 Bedroom Villa", price: 450, original: 500 },
  { id: "vu3", name: "3 Bedroom Villa", price: 550, original: 650, popular: true },
  { id: "vu4", name: "4 Bedroom Villa", price: 650, original: 750 },
  { id: "vu5", name: "5 Bedroom Villa", price: 750, original: 900 },
];

const apartments = [
  { id: "ap0", name: "Studio Apartment", price: 250, original: 300 },
  { id: "ap1", name: "1 Bedroom Apartment", price: 300, original: 350, popular: true },
  { id: "ap2", name: "2 Bedroom Apartment", price: 350, original: 400 },
  { id: "ap3", name: "3 Bedroom Apartment", price: 400, original: 450 },
];

const trustItems = [
  { icon: UserCheck, label: "Trained professionals" },
  { icon: Leaf, label: "Eco-conscious products" },
  { icon: ShieldCheck, label: "Careful and reliable" },
  { icon: Clock3, label: "Flexible scheduling" },
];

const recommendedFor = [
  "New homes and apartments",
  "Seasonal villa cleaning",
  "Post-renovation properties",
  "Before or after special events",
  "End-of-tenancy cleaning",
  "Commercial offices",
  "Restaurants and cafés",
  "Clinics and medical spaces",
  "Schools and nurseries",
  "Hotels and holiday homes",
  "Property management companies",
  "Retail and hospitality spaces",
];

const whyChooseFeatures = [
  {
    icon: UserCheck,
    title: "Experienced professionals",
    desc: "Trained cleaners follow detailed checklists to deliver consistent results across residential and commercial properties.",
  },
  {
    icon: Leaf,
    title: "Thoughtful product selection",
    desc: "We choose effective cleaning solutions with household safety and surface compatibility in mind.",
  },
  {
    icon: Wrench,
    title: "Professional equipment",
    desc: "Specialized vacuums, steam tools, scrubbers, and extraction equipment help reach beyond routine cleaning.",
  },
  {
    icon: ClipboardList,
    title: "Customized cleaning plans",
    desc: "The scope is adapted to your property type, layout, condition, priorities, and requested areas.",
  },
  {
    icon: Tag,
    title: "Clear package pricing",
    desc: "Package prices are shown upfront, while custom requirements can be confirmed before work begins.",
  },
  {
    icon: BadgeCheck,
    title: "Quality-focused service",
    desc: "We combine systematic workflows with careful finishing to create a cleaner, fresher environment.",
  },
];

const processSteps = [
  { title: "Property assessment", desc: "We identify high-priority areas and confirm the cleaning scope." },
  { title: "High-level dust removal", desc: "Ceilings, vents, corners, fixtures, shelves, and hidden surfaces are addressed." },
  { title: "Kitchen detailing", desc: "Worktops, sinks, cabinet exteriors, backsplash, appliances, switches, and grout are cleaned." },
  { title: "Bathroom sanitization", desc: "Fixtures, glass, tiles, grout, basins, showers, and ventilation areas receive detailed care." },
  { title: "Bedrooms and living areas", desc: "Furniture, wardrobes, mirrors, accessible windows, floors, and frequently used surfaces are cleaned." },
  { title: "Floor care", desc: "Appropriate methods are selected for marble, tile, wood, vinyl, laminate, and other flooring." },
];

const benefits = [
  { title: "Fresher indoor spaces", desc: "Removing accumulated dust and residue helps rooms feel cleaner and more comfortable." },
  { title: "Detailed sanitization", desc: "High-touch and frequently used areas receive more attention than in routine housekeeping." },
  { title: "Better surface care", desc: "Suitable cleaning methods help protect furniture, fixtures, and flooring from avoidable wear." },
  { title: "Improved presentation", desc: "A detailed clean can make homes and workplaces feel brighter and more welcoming." },
  { title: "Less hidden buildup", desc: "Hard-to-reach areas are included to reduce dust and grime that ordinary cleaning may miss." },
  { title: "More free time", desc: "A professional team handles the demanding work so you can focus on other priorities." },
];

const faqs = [
  {
    q: "How often should I schedule deep cleaning?",
    a: "Many homes schedule deep cleaning every three to six months. Properties with pets, frequent visitors, renovation dust, or heavier daily use may need it more often.",
  },
  {
    q: "How long does deep cleaning take?",
    a: "Timing depends on the property size, condition, team size, and selected scope. We can provide a more accurate estimate after reviewing your requirements.",
  },
  {
    q: "Do I need to provide cleaning materials?",
    a: "No. The team can arrive with the agreed cleaning products, tools, and equipment. Mention any product or surface restrictions before the appointment.",
  },
  {
    q: "Are your products suitable for homes with children or pets?",
    a: "We can select suitable products based on your household requirements. Tell us about children, pets, allergies, or sensitive surfaces when booking.",
  },
  {
    q: "Can I book a weekend appointment?",
    a: "Weekend and public-holiday appointments may be available depending on the schedule. Confirm your preferred date when requesting a booking.",
  },
];

const sectionReveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function SectionHeading({ eyebrow, title, description, align = "center" }) {
  const alignment = align === "left" ? "text-left" : "text-center mx-auto";

  return (
    <div className={`max-w-3xl ${alignment}`}>
      {eyebrow && (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-crystal-600">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-display font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

function PackageCard({ pkg, type, tone, added, onAdd, reduceMotion }) {
  const isBlue = tone === "blue";
  const accent = isBlue ? "text-blue-700" : "text-crystal-700";
  const soft = isBlue ? "bg-blue-50" : "bg-crystal-50";
  const button = isBlue
    ? "bg-blue-600 hover:bg-blue-700 focus-visible:ring-blue-500"
    : "bg-crystal-600 hover:bg-crystal-700 focus-visible:ring-crystal-500";
  const savings = pkg.original - pkg.price;

  return (
    <motion.article
      variants={sectionReveal}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
      whileHover={reduceMotion ? undefined : { y: -6 }}
      className={`relative flex h-full flex-col overflow-hidden rounded-3xl border bg-white shadow-sm transition-shadow hover:shadow-xl ${
        pkg.popular ? "border-crystal-300 ring-1 ring-crystal-200" : "border-slate-200"
      }`}
    >
      {pkg.popular && (
        <div className="absolute right-4 top-4 z-10 rounded-full bg-slate-900 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
          Popular
        </div>
      )}

      <div className={`flex flex-1 flex-col p-6 ${soft}`}>
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
          {type === "Apartment" ? (
            <Building2 className={`h-6 w-6 ${accent}`} />
          ) : (
            <Home className={`h-6 w-6 ${accent}`} />
          )}
        </div>

        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
          {type}
        </p>
        <h3 className="mt-2 text-xl font-bold text-slate-900">{pkg.name}</h3>

        <div className="mt-6 flex flex-wrap items-end gap-x-3 gap-y-1">
          <span className={`text-4xl font-black tracking-tight ${accent}`}>
            {pkg.price}
          </span>
          <span className="pb-1 text-sm font-bold text-slate-500">AED</span>
          <span className="pb-1 text-sm text-slate-400 line-through">
            {pkg.original} AED
          </span>
        </div>

        <div className="mt-4 inline-flex w-fit items-center rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-700">
          <Tag className="mr-1.5 h-3.5 w-3.5" /> Save {savings} AED
        </div>

        <ul className="mt-6 space-y-2 text-sm text-slate-600">
          <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> Detailed cleaning workflow</li>
          <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> Equipment included</li>
          <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-600" /> Booking confirmation required</li>
        </ul>
      </div>

      <div className="p-4">
        <button
          type="button"
          onClick={() => onAdd(pkg, type)}
          disabled={added}
          aria-live="polite"
          className={`inline-flex w-full items-center justify-center rounded-2xl px-4 py-3.5 text-sm font-bold text-white shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-default ${
            added ? "bg-emerald-600" : button
          }`}
        >
          {added ? (
            <><CheckCircle2 className="mr-2 h-4 w-4" /> Added to cart</>
          ) : (
            <><ShoppingCart className="mr-2 h-4 w-4" /> Add package</>
          )}
        </button>
      </div>
    </motion.article>
  );
}

export default function DeepCleaning() {
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const resetTimer = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  const handleAddPackage = (pkg, type) => {
    addToCart({
      id: pkg.id,
      service: `Deep Clean: ${pkg.name} (${type})`,
      totalAmount: pkg.price,
      isPackage: true,
      quantity: 1,
    });

    setAddedId(pkg.id);
    clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setAddedId(null), 1800);
  };

  const scrollToSection = (id) => {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <main className="min-h-screen overflow-hidden bg-white pt-20 text-slate-900">
      <Helmet>
        <title>Deep Cleaning Services Dubai | Lucky Crystal Maids</title>
        <meta
          name="description"
          content="Book professional deep cleaning in Dubai for apartments, villas, offices, and commercial properties. View packages and choose a convenient service option."
        />
        <link rel="preconnect" href="https://images.unsplash.com" />
      </Helmet>

      <section className="relative isolate min-h-[680px] overflow-hidden bg-cyan-50 sm:min-h-[720px] lg:min-h-[760px]">
        <img
          src={HERO_IMAGE}
          alt="Professional cleaner preparing a bright modern room"
          className="absolute inset-0 h-full w-full object-cover object-center"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/55 via-slate-900/20 to-transparent" />

        <div className="relative mx-auto flex min-h-[680px] max-w-7xl items-center px-5 py-20 sm:min-h-[720px] sm:px-8 lg:min-h-[760px] lg:px-10">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="max-w-4xl"
          >
            <Link
              to="/services"
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/40 bg-black/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-black/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ArrowLeft className="h-4 w-4" /> Back to services
            </Link>

            <div className="mb-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-crystal-500/90 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-white">
                Deep cleaning in Dubai
              </span>
              <span className="rounded-full border border-white/40 bg-black/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                Homes · Villas · Offices
              </span>
            </div>

            <h1 className="max-w-4xl text-4xl font-display font-black leading-[1.05] tracking-tight text-white drop-shadow-sm sm:text-5xl lg:text-7xl">
              A deeper clean for spaces that deserve extra attention.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-7 text-white drop-shadow-sm sm:text-lg lg:text-xl lg:leading-8">
              Detailed cleaning for apartments, villas, and workplaces, with flexible packages and a systematic top-to-bottom approach.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => scrollToSection("villa-section")}
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 font-bold text-slate-900 shadow-xl transition hover:-translate-y-0.5 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              >
                <Home className="mr-2 h-5 w-5 text-crystal-600" /> Villa packages
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("apartment-section")}
                className="inline-flex items-center justify-center rounded-full bg-crystal-600 px-6 py-3.5 font-bold text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-crystal-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-crystal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              >
                <Building2 className="mr-2 h-5 w-5" /> Apartment packages
              </button>
            </div>

            <div className="mt-10 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
              {trustItems.map(({ icon: Icon, label }) => (
                <div key={label} className="rounded-2xl border border-white/40 bg-black/10 p-3 text-sm font-semibold text-white shadow-sm backdrop-blur-md">
                  <Icon className="mb-2 h-5 w-5 text-crystal-200" />
                  {label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 -mt-8 px-5 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-xl sm:grid-cols-3 sm:p-6">
          {[
            ["From 250 AED", "Apartment packages"],
            ["Clear options", "Furnished and unfurnished"],
            ["Flexible booking", "Subject to availability"],
          ].map(([value, label]) => (
            <div key={label} className="rounded-2xl bg-slate-50 p-5 text-center">
              <p className="text-xl font-black text-slate-900">{value}</p>
              <p className="mt-1 text-sm text-slate-500">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow="More than routine cleaning"
            title="Detailed care for the places ordinary cleaning can miss"
            description="Deep cleaning focuses on accumulated dust, residue, grease, and difficult-to-reach areas. The service scope can be adjusted to suit your property and priorities."
          />

          <motion.div
            variants={sectionReveal}
            initial={reduceMotion ? false : "hidden"}
            whileInView={reduceMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
          >
            {recommendedFor.map((item) => (
              <div key={item} className="group flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-crystal-200 hover:shadow-md">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-crystal-600" />
                <span className="text-sm font-semibold leading-6 text-slate-700">{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-slate-50 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow="Why choose us"
            title="A professional process, presented clearly"
            description="The page now communicates the service in shorter, easier-to-scan sections without losing the useful details customers need."
          />

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {whyChooseFeatures.map(({ icon: Icon, title, desc }, index) => (
              <motion.article
                key={title}
                variants={sectionReveal}
                initial={reduceMotion ? false : "hidden"}
                whileInView={reduceMotion ? undefined : "visible"}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: reduceMotion ? 0 : Math.min(index * 0.05, 0.2) }}
                className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-crystal-50">
                  <Icon className="h-7 w-7 text-crystal-700" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-slate-900">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{desc}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                align="left"
                eyebrow="Our process"
                title="A clear top-to-bottom workflow"
                description="Each appointment is adapted to the selected package and the actual condition of the property."
              />
              <button
                type="button"
                onClick={() => scrollToSection("villa-section")}
                className="mt-8 inline-flex items-center font-bold text-crystal-700 transition hover:text-crystal-800"
              >
                Explore packages <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>

            <ol className="space-y-4">
              {processSteps.map((step, index) => (
                <motion.li
                  key={step.title}
                  variants={sectionReveal}
                  initial={reduceMotion ? false : "hidden"}
                  whileInView={reduceMotion ? undefined : "visible"}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-[auto_1fr] gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:gap-6 sm:p-7"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-sm font-black text-white">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{step.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-24 text-white sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow="Residential and commercial"
            title="One service, adapted to different spaces"
            description="Choose a package for your property type, then share any special priorities when confirming the booking."
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {[
              {
                image: RESIDENTIAL_IMAGE,
                icon: Home,
                title: "Residential deep cleaning",
                desc: "For apartments, villas, townhouses, studios, and occupied or vacant homes.",
                points: ["Kitchens and bathrooms", "Bedrooms and living areas", "Accessible windows and floors"],
              },
              {
                image: COMMERCIAL_IMAGE,
                icon: Building2,
                title: "Commercial deep cleaning",
                desc: "For offices, retail spaces, restaurants, clinics, gyms, and other business environments.",
                points: ["Workspaces and reception areas", "High-touch surfaces", "Shared facilities and floors"],
              },
            ].map(({ image, icon: Icon, title, desc, points }) => (
              <motion.article
                key={title}
                variants={sectionReveal}
                initial={reduceMotion ? false : "hidden"}
                whileInView={reduceMotion ? undefined : "visible"}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
                className="group relative min-h-[460px] overflow-hidden rounded-[2rem] border border-white/10"
              >
                <img src={image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-900/10" />
                <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md">
                    <Icon className="h-7 w-7 text-crystal-300" />
                  </div>
                  <h3 className="mt-6 text-3xl font-bold">{title}</h3>
                  <p className="mt-3 max-w-xl leading-7 text-slate-300">{desc}</p>
                  <ul className="mt-6 grid gap-2 text-sm font-semibold text-white sm:grid-cols-2">
                    {points.map((point) => (
                      <li key={point} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-crystal-300" /> {point}</li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="villa-section" className="scroll-mt-24 bg-white py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow="Villa pricing"
            title="Choose a villa deep-cleaning package"
            description="Prices are shown in AED. Confirm the final scope, access details, property condition, and availability before the appointment."
          />

          <div className="mt-14">
            <div className="mb-7 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-crystal-50"><Home className="h-5 w-5 text-crystal-700" /></div>
              <div><h3 className="text-2xl font-bold">Furnished villas</h3><p className="text-sm text-slate-500">For occupied or furnished properties</p></div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {villaFurnished.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} type="Furnished" tone="crystal" added={addedId === pkg.id} onAdd={handleAddPackage} reduceMotion={reduceMotion} />
              ))}
            </div>
          </div>

          <div className="mt-16">
            <div className="mb-7 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100"><Home className="h-5 w-5 text-slate-600" /></div>
              <div><h3 className="text-2xl font-bold">Unfurnished villas</h3><p className="text-sm text-slate-500">For vacant, move-in, or move-out properties</p></div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {villaUnfurnished.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} type="Unfurnished" tone="crystal" added={addedId === pkg.id} onAdd={handleAddPackage} reduceMotion={reduceMotion} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="apartment-section" className="scroll-mt-24 bg-slate-50 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <SectionHeading
            eyebrow="Apartment pricing"
            title="Apartment and studio packages"
            description="A straightforward starting point for annual deep cleans, move-in preparation, or move-out cleaning."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {apartments.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} type="Apartment" tone="blue" added={addedId === pkg.id} onAdd={handleAddPackage} reduceMotion={reduceMotion} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <SectionHeading eyebrow="Benefits" title="What a professional deep clean can improve" />
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <motion.article
                key={benefit.title}
                variants={sectionReveal}
                initial={reduceMotion ? false : "hidden"}
                whileInView={reduceMotion ? undefined : "visible"}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: reduceMotion ? 0 : Math.min(index * 0.04, 0.16) }}
                className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"
              >
                <Sparkles className="h-7 w-7 text-crystal-600" />
                <h3 className="mt-5 text-xl font-bold">{benefit.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{benefit.desc}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-24 sm:py-28">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <SectionHeading eyebrow="Questions" title="Frequently asked questions" />
          <div className="mt-12 space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              const panelId = `faq-panel-${index}`;
              const buttonId = `faq-button-${index}`;

              return (
                <div key={faq.q} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-5 p-5 text-left font-bold text-slate-900 transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-crystal-500 sm:p-6"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`h-5 w-5 shrink-0 text-crystal-600 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    initial={false}
                    animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-6 leading-7 text-slate-600 sm:px-6">{faq.a}</p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <RelatedServices intro="Complete your detailed clean with specialist fabric care or an empty-property service." services={[
        { title: "Furniture Cleaning", description: "Refresh sofas, mattresses, carpets, and other upholstered surfaces after your deep clean.", to: "/furniture-cleaning-dubai", linkText: "Visit furniture cleaning" },
        { title: "Move-In & Move-Out Cleaning", description: "Prepare an empty home for handover, a new tenant, or your arrival.", to: "/move-in-move-out-cleaning-dubai", linkText: "Visit move-in and move-out cleaning" },
      ]} />

      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-14 text-center shadow-2xl sm:px-10 sm:py-20">
          <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-crystal-500/20 blur-3xl" />
          <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="relative mx-auto max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-crystal-300">Ready to book?</p>
            <h2 className="mt-4 text-3xl font-display font-black text-white sm:text-5xl">Choose a package and start your booking.</h2>
            <p className="mt-5 text-base leading-7 text-slate-300 sm:text-lg">Select the closest property size. Your team can confirm the final details before the appointment.</p>
            <button
              type="button"
              onClick={() => scrollToSection("villa-section")}
              className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-7 py-4 font-bold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              View packages <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
