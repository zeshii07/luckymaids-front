import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  Baby,
  Building2,
  CalendarCheck,
  Check,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Clock3,
  Home as HomeIcon,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Sofa,
  Sparkles,
  Star,
  Truck,
  UserCheck,
} from "lucide-react";
import Hero from "../components/Hero";

const coreServices = [
  { name: "Deep Cleaning", link: "/services/deep-cleaning" },
  { name: "Maid Services", link: "/services/maid-services" },
  { name: "Residential Cleaning", link: "/services/residential" },
  { name: "Commercial Cleaning", link: "/services/commercial" },
  { name: "Move-In / Move-Out", link: "/services/move-in-out" },
  { name: "Furniture Cleaning", link: "/services/furniture" },
  { name: "Babysitting", link: "/services/babysitting" },
];

const services = [
  {
    icon: Sparkles,
    eyebrow: "Most requested",
    title: "Deep Cleaning",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Professional cleaner working in a bright modern home",
    imageCredit: "Unsplash",
    description:
      "A detailed top-to-bottom service for homes and workplaces that need more than routine upkeep.",
    link: "/services/deep-cleaning",
    features: [
      "Kitchen and bathroom detailing",
      "Hard-to-reach dust removal",
      "Floors, doors and frames",
      "Interior glass and fixtures",
    ],
  },
  {
    icon: UserCheck,
    eyebrow: "Flexible schedules",
    title: "Maid Services",
    image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Cleaning tools prepared for professional housekeeping",
    imageCredit: "Unsplash",
    description:
      "Reliable household support for busy professionals, families and anyone who values a consistently tidy home.",
    link: "/services/maid-services",
    features: [
      "One-time or recurring visits",
      "Weekly and bi-weekly plans",
      "Cleaning and light tidying",
      "Laundry and ironing support",
    ],
  },
  {
    icon: HomeIcon,
    eyebrow: "Made for your home",
    title: "Residential Cleaning",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Clean contemporary residential interior",
    imageCredit: "Unsplash",
    description:
      "Custom cleaning plans for apartments, villas, townhouses, studios and holiday homes across Dubai.",
    link: "/services/residential",
    features: [
      "Apartment and villa cleaning",
      "Recurring housekeeping",
      "One-time refresh services",
      "Plans tailored to your space",
    ],
  },
  {
    icon: Building2,
    eyebrow: "Business-ready spaces",
    title: "Commercial Cleaning",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Bright modern commercial office interior",
    imageCredit: "Unsplash",
    description:
      "Professional cleaning support that helps offices, stores and customer-facing spaces stay welcoming.",
    link: "/services/commercial",
    features: [
      "Offices and workspaces",
      "Retail and hospitality",
      "Clinics, salons and gyms",
      "Flexible service schedules",
    ],
  },
  {
    icon: Sofa,
    eyebrow: "Refresh your interiors",
    title: "Furniture Cleaning",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Modern sofa in a clean living room",
    imageCredit: "Unsplash",
    description:
      "Specialized care for frequently used soft furnishings in residential and commercial properties.",
    link: "/services/furniture",
    features: [
      "Sofas and upholstery",
      "Carpets and mattresses",
      "Curtains and fabric surfaces",
      "Home and office furniture",
    ],
  },
  {
    icon: Truck,
    eyebrow: "Smooth transitions",
    title: "Move-In & Move-Out",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Freshly prepared empty apartment interior",
    imageCredit: "Unsplash",
    description:
      "Prepare a property for occupancy or handover with focused cleaning across the rooms that matter most.",
    link: "/services/move-in-out",
    features: [
      "Before occupancy",
      "Before property handover",
      "Kitchen and bathroom focus",
      "Agreed room-by-room scope",
    ],
  },
  {
    icon: Baby,
    eyebrow: "Dependable family support",
    title: "Babysitting Services",
    image: "https://images.pexels.com/photos/6986435/pexels-photo-6986435.jpeg?auto=compress&cs=tinysrgb&w=1400",
    imageAlt: "Caregiver helping a child with a learning activity",
    imageCredit: "Pexels / cottonbro studio",
    description:
      "Flexible childcare assistance for families who need occasional or recurring support around their schedule.",
    link: "/services/babysitting",
    features: [
      "Occasional babysitting",
      "Recurring arrangements",
      "Flexible scheduling",
      "Support tailored to your family",
    ],
  },
];

const trustPoints = [
  { icon: ShieldCheck, title: "Reliable service", text: "Clear communication from enquiry to completion." },
  { icon: ClipboardCheck, title: "Tailored plans", text: "Cleaning scopes shaped around your property and priorities." },
  { icon: CalendarCheck, title: "Flexible booking", text: "Convenient appointments based on location and availability." },
  { icon: UserCheck, title: "Experienced team", text: "Professional support for homes and commercial spaces." },
];

const processSteps = [
  {
    number: "01",
    title: "Tell us what you need",
    text: "Share your property type, preferred service and location.",
  },
  {
    number: "02",
    title: "Get a recommendation",
    text: "We suggest a suitable service and scope for your requirements.",
  },
  {
    number: "03",
    title: "Choose your schedule",
    text: "Select a convenient date and time, subject to availability.",
  },
  {
    number: "04",
    title: "Enjoy a cleaner space",
    text: "Our team completes the agreed work with care and attention.",
  },
];

const areasServed = [
  "Downtown Dubai",
  "Business Bay",
  "Dubai Marina",
  "Jumeirah",
  "Palm Jumeirah",
  "JVC",
  "JLT",
  "Arabian Ranches",
  "Dubai Hills Estate",
  "Al Barsha",
  "Mirdif",
  "Dubai Silicon Oasis",
  "Dubai South",
  "Deira",
  "Bur Dubai",
  "Al Nahda",
  "Dubai Sports City",
  "Motor City",
  "Town Square Dubai",
  "DAMAC Hills",
];

const faqs = [
  {
    question: "What cleaning services do you provide?",
    answer:
      "We offer deep cleaning, maid services, residential cleaning, commercial cleaning, furniture cleaning, move-in and move-out cleaning, plus babysitting services.",
  },
  {
    question: "Can I book a one-time cleaning?",
    answer:
      "Yes. One-time appointments are available for many services, depending on your location, preferred date and the required scope.",
  },
  {
    question: "Do you offer recurring maid services?",
    answer:
      "Yes. Weekly, bi-weekly and monthly arrangements can be discussed based on your household needs and availability.",
  },
  {
    question: "Do you clean offices and commercial spaces?",
    answer:
      "Yes. We support offices, retail spaces, clinics, salons, gyms and other commercial premises with flexible cleaning plans.",
  },
  {
    question: "Which areas of Dubai do you cover?",
    answer:
      "We serve many residential and commercial communities across Dubai. Contact our team to confirm availability for your exact location.",
  },
  {
    question: "How can I request a quotation?",
    answer:
      "Send us your property type, preferred service, location and ideal schedule. We will recommend a suitable option and explain the next steps.",
  },
];

const ease = [0.22, 1, 0.36, 1];

function SectionHeading({ eyebrow, title, text, align = "center" }) {
  const centered = align === "center";

  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <span className="inline-flex items-center gap-2 rounded-full border border-crystal-200 bg-crystal-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-crystal-700">
        <Sparkles className="h-3.5 w-3.5" />
        {eyebrow}
      </span>
      <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {text && (
        <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
          {text}
        </p>
      )}
    </div>
  );
}

function ServiceCard({ service, index, reduceMotion }) {
  const Icon = service.icon;

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 34, scale: 0.98 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.07, 0.28), ease }}
      whileHover={reduceMotion ? undefined : { y: -10 }}
      className="group relative min-h-[500px] overflow-hidden rounded-[2rem] border border-white/15 bg-slate-900 shadow-[0_24px_70px_-30px_rgba(15,23,42,0.65)]"
    >
      <img
        src={service.image}
        alt={service.imageAlt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/55 to-slate-950/95" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,.22),transparent_34%)] opacity-80" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-70" />

      <div className="relative flex min-h-[500px] flex-col justify-between p-7 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/15 text-white shadow-xl backdrop-blur-md">
            <Icon className="h-7 w-7" />
          </div>
          <span className="max-w-[58%] rounded-full border border-white/20 bg-slate-950/35 px-3 py-1.5 text-right text-[10px] font-bold uppercase tracking-[0.16em] text-white/90 backdrop-blur-md">
            {service.eyebrow}
          </span>
        </div>

        <div className="mt-24">
          <h3 className="text-3xl font-bold tracking-tight text-white">
            {service.title}
          </h3>
          <p className="mt-3 text-sm leading-7 text-slate-200">
            {service.description}
          </p>

          <div className="mt-6 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-xs leading-5 text-white/90">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-300/15 text-cyan-200">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-7 flex items-end justify-between gap-4">
            <Link
              to={service.link}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-900 transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-50"
            >
              Explore service
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <span className="text-[10px] font-medium text-white/55">
              Photo: {service.imageCredit}
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState(0);
  const reduceMotion = useReducedMotion();

  const reveal = {
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    whileInView: reduceMotion ? undefined : { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6, ease },
  };

  return (
    <>
      <Helmet>
        <title>
          Professional Cleaning & Maid Services in Dubai | Lucky Crystal Maids
        </title>
        <meta
          name="description"
          content="Trusted deep cleaning, maid services and professional home or commercial cleaning solutions across Dubai. Request a quote today."
        />
      </Helmet>

      <main className="overflow-hidden bg-slate-50 text-slate-900">
        <Hero />

        <section className="relative border-y border-slate-200/70 bg-white py-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.08),transparent_60%)]" />
          <div className="container relative mx-auto max-w-7xl px-6">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {coreServices.map((service, index) => (
                <motion.div
                  key={service.name}
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
                  animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                >
                  <Link
                    to={service.link}
                    className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-crystal-300 hover:text-crystal-700 hover:shadow-md"
                  >
                    {service.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-24 sm:py-28">
          <div className="pointer-events-none absolute left-0 top-20 h-72 w-72 rounded-full bg-crystal-200/30 blur-3xl" />
          <div className="pointer-events-none absolute right-0 top-1/2 h-80 w-80 rounded-full bg-cyan-200/30 blur-3xl" />

          <div className="container relative mx-auto max-w-7xl px-6">
            <motion.div {...reveal}>
              <SectionHeading
                eyebrow="Complete property care"
                title="Professional services designed around your space"
                text="From everyday housekeeping to detailed deep cleaning, choose a flexible service for your home, workplace or move."
              />
            </motion.div>

            <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {services.map((service, index) => (
                <ServiceCard
                  key={service.title}
                  service={service}
                  index={index}
                  reduceMotion={reduceMotion}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="relative bg-slate-950 py-24 text-white sm:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.2),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.14),transparent_35%)]" />
          <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)] [background-size:42px_42px]" />

          <div className="container relative mx-auto max-w-7xl px-6">
            <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <motion.div {...reveal}>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-200 backdrop-blur">
                  <Star className="h-3.5 w-3.5" />
                  Why Lucky Crystal Maids
                </span>
                <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                  A smoother cleaning experience from first message to final result
                </h2>
                <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
                  We focus on clear communication, practical recommendations and a service plan that fits your property, schedule and priorities.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    to="/quote"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-50"
                  >
                    Get a free quote
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href="https://wa.me/971501234567"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 font-bold text-white backdrop-blur transition hover:bg-white/15"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Chat with our team
                  </a>
                </div>
              </motion.div>

              <div className="grid gap-4 sm:grid-cols-2">
                {trustPoints.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.title}
                      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.5, delay: index * 0.08, ease }}
                      whileHover={reduceMotion ? undefined : { y: -6 }}
                      className="rounded-[1.75rem] border border-white/10 bg-white/[0.07] p-6 backdrop-blur-md"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-300/10 text-cyan-300">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mt-5 text-xl font-bold">{item.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-300">
                        {item.text}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-24 sm:py-28">
          <div className="container mx-auto max-w-7xl px-6">
            <motion.div {...reveal}>
              <SectionHeading
                eyebrow="Simple booking"
                title="From enquiry to a cleaner space in four clear steps"
                text="A straightforward process keeps your booking easy, transparent and tailored to what you actually need."
              />
            </motion.div>

            <div className="relative mt-16 grid gap-6 lg:grid-cols-4">
              <div className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-px bg-gradient-to-r from-transparent via-crystal-300 to-transparent lg:block" />
              {processSteps.map((step, index) => (
                <motion.article
                  key={step.number}
                  initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease }}
                  className="relative rounded-[1.75rem] border border-slate-200 bg-slate-50 p-7 text-center"
                >
                  <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-crystal-500 to-crystal-700 text-lg font-black text-white shadow-lg shadow-crystal-500/20">
                    {step.number}
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {step.text}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-24 sm:py-28">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-[0_30px_100px_-55px_rgba(15,23,42,0.45)]">
              <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
                <motion.div
                  {...reveal}
                  className="relative overflow-hidden bg-gradient-to-br from-crystal-600 to-cyan-600 p-8 text-white sm:p-12"
                >
                  <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[40px] border-white/10" />
                  <div className="relative">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                      <MapPin className="h-7 w-7" />
                    </div>
                    <h2 className="mt-7 text-3xl font-bold tracking-tight sm:text-4xl">
                      Serving homes and businesses across Dubai
                    </h2>
                    <p className="mt-5 text-base leading-8 text-cyan-50">
                      Coverage and appointment availability can vary, so contact us to confirm service in your community.
                    </p>
                    <Link
                      to="/quote"
                      className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-bold text-crystal-700 transition hover:-translate-y-0.5 hover:bg-cyan-50"
                    >
                      Check availability
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>

                <div className="p-8 sm:p-12">
                  <div className="flex flex-wrap gap-3">
                    {areasServed.map((area, index) => (
                      <motion.span
                        key={area}
                        initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
                        whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: Math.min(index * 0.025, 0.3) }}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700"
                      >
                        <MapPin className="h-3.5 w-3.5 text-crystal-600" />
                        {area}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-24 sm:py-28">
          <div className="container mx-auto max-w-5xl px-6">
            <motion.div {...reveal}>
              <SectionHeading
                eyebrow="Helpful answers"
                title="Frequently asked questions"
                text="Everything you need to know before requesting a quote or booking a service."
              />
            </motion.div>

            <div className="mt-14 space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <motion.div
                    key={faq.question}
                    initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                    whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className={`overflow-hidden rounded-2xl border transition-colors ${
                      isOpen
                        ? "border-crystal-200 bg-crystal-50/60"
                        : "border-slate-200 bg-white"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-6 p-6 text-left sm:p-7"
                    >
                      <span className="text-base font-bold text-slate-900 sm:text-lg">
                        {faq.question}
                      </span>
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition ${
                          isOpen
                            ? "bg-crystal-600 text-white"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        <ChevronDown
                          className={`h-5 w-5 transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease }}
                        >
                          <p className="px-6 pb-7 pr-16 text-sm leading-7 text-slate-600 sm:px-7 sm:pb-8 sm:pr-20 sm:text-base">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="relative px-6 pb-24 pt-4 sm:pb-28">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.98 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, ease }}
              className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 px-7 py-14 text-center text-white shadow-2xl sm:px-12 sm:py-16"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,.34),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,.2),transparent_35%)]" />
              <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />

              <div className="relative mx-auto max-w-3xl">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-cyan-300 backdrop-blur">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                  Ready for a cleaner, more comfortable space?
                </h2>
                <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">
                  Tell us what you need and we will help you choose a practical service for your home or business.
                </p>

                <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
                  <Link
                    to="/quote"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-50"
                  >
                    Get a free quote
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/booking"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-4 font-bold text-white backdrop-blur transition hover:bg-white/15"
                  >
                    <Clock3 className="h-4 w-4" />
                    Book a service
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
