import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  Building2,
  CheckCircle,
  ChevronDown,
  Clock3,
  Home,
  MapPin,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
  Store,
} from "lucide-react";

const residentialPropertyTypes = [
  "Studio Apartments",
  "Apartments",
  "Villas",
  "Townhouses",
  "Duplex Homes",
  "Penthouses",
  "Holiday Homes",
  "Residential Buildings",
  "Family Villas",
];

const residentialServices = [
  "Maid Services",
  "Deep Cleaning",
  "Residential Cleaning",
  "Move-In Cleaning",
  "Move-Out Cleaning",
  "Sofa Cleaning",
  "Carpet Cleaning",
  "Mattress Cleaning",
  "Curtain Cleaning",
];

const commercialPropertyTypes = [
  "Corporate Offices",
  "Business Centres",
  "Retail Stores",
  "Restaurants",
  "Cafés",
  "Hotels",
  "Clinics",
  "Schools",
  "Nurseries",
  "Warehouses",
  "Showrooms",
  "Gyms",
  "Salons",
  "Spas",
];

const communities = [
  {
    name: "Downtown Dubai",
    description: "Professional cleaning services for luxury apartments, penthouses, offices, retail stores, and commercial spaces.",
    services: ["Deep Cleaning", "Maid Services", "Office Cleaning", "Apartment Cleaning", "Furniture Cleaning"],
  },
  {
    name: "Business Bay",
    description: "Supporting residential towers, offices, restaurants, and commercial properties throughout Business Bay.",
  },
  {
    name: "Dubai Marina",
    description: "Providing apartment cleaning, villa cleaning, office cleaning, and recurring maid services for one of Dubai's busiest waterfront communities.",
  },
  {
    name: "Palm Jumeirah",
    description: "Professional cleaning solutions for luxury villas, apartments, holiday homes, and hospitality properties.",
  },
  {
    name: "Dubai Hills Estate",
    description: "Residential cleaning solutions tailored for villas, townhouses, and modern apartments.",
  },
  {
    name: "Arabian Ranches",
    description: "Home cleaning and recurring maid services for family villas and residential communities.",
  },
  {
    name: "Jumeirah Village Circle (JVC)",
    description: "Flexible residential and commercial cleaning services for apartments, villas, retail outlets, and offices.",
  },
  {
    name: "Jumeirah Lake Towers (JLT)",
    description: "Supporting offices, residential towers, restaurants, and retail businesses.",
  },
  {
    name: "Al Barsha",
    description: "Cleaning services for homes, apartments, hotels, clinics, and offices.",
  },
  {
    name: "Mirdif",
    description: "Routine home cleaning, deep cleaning, and furniture cleaning for villas and apartments.",
  },
  {
    name: "Dubai Silicon Oasis",
    description: "Residential and commercial cleaning for family communities and technology businesses.",
  },
  {
    name: "Motor City",
    description: "Professional cleaning solutions for apartments, villas, retail businesses, and offices.",
  },
  {
    name: "Town Square Dubai",
    description: "Routine maid services and deep cleaning for growing residential communities.",
  },
  {
    name: "DAMAC Hills",
    description: "Residential cleaning tailored for villas, luxury homes, and family communities.",
  },
  {
    name: "Dubai South",
    description: "Cleaning support for residential developments, offices, warehouses, and commercial facilities.",
  },
  {
    name: "Deira",
    description: "Professional cleaning services for apartments, retail stores, offices, restaurants, and commercial buildings.",
  },
  {
    name: "Bur Dubai",
    description: "Residential and commercial cleaning for one of Dubai's longest-established business districts.",
  },
  {
    name: "Al Nahda",
    description: "Apartment cleaning, maid services, and routine residential housekeeping.",
  },
];

const customerReasons = [
  "Flexible appointment scheduling",
  "Residential and commercial cleaning",
  "Customized cleaning plans",
  "Friendly customer support",
  "Wide service coverage",
  "One-time and recurring cleaning options",
];

const requestedServices = [
  "Deep Cleaning Services",
  "Maid Services",
  "Residential Cleaning",
  "Commercial Cleaning",
  "Move-In Cleaning",
  "Move-Out Cleaning",
  "Sofa Cleaning",
  "Carpet Cleaning",
  "Curtain Cleaning",
  "Mattress Cleaning",
  "Babysitting Services",
];

const faqs = [
  {
    q: "Do you provide cleaning throughout Dubai?",
    a: "We serve many residential and commercial communities across Dubai. Contact us to confirm availability in your area.",
  },
  {
    q: "Is there an additional travel charge?",
    a: "Any travel or transportation charges will be explained before confirming your booking.",
  },
  {
    q: "Can I book same-day cleaning?",
    a: "Availability depends on staffing, scheduling, and your location.",
  },
  {
    q: "Can recurring cleaning be arranged?",
    a: "Yes. Weekly, fortnightly, and monthly schedules may be available depending on the service.",
  },
];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function AreasWeServe() {
  const [openFaq, setOpenFaq] = useState(null);
  const reducedMotion = useReducedMotion();

  const revealProps = {
    initial: reducedMotion ? false : "hidden",
    whileInView: "visible",
    viewport: { once: true, amount: 0.15 },
    variants: reveal,
    transition: { duration: reducedMotion ? 0 : 0.45 },
  };

  return (
    <main className="min-h-screen overflow-hidden bg-white pb-24 pt-20">
      <Helmet>
        <title>Cleaning Services Across Dubai | Areas We Serve | Lucky Crystal Maids</title>
        <meta
          name="description"
          content="Lucky Crystal Maids provides professional cleaning services across Dubai, including apartments, villas, offices, retail stores, and commercial properties. Check service availability in your area today."
        />
        <link rel="canonical" href="https://www.luckycrystalmaids.com/areas-we-serve/" />
      </Helmet>

      <section className="relative isolate overflow-hidden bg-gray-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.10),transparent_34%)]" />
        <MapPin className="absolute -bottom-24 -right-12 h-80 w-80 rotate-12 text-white/[0.035]" />

        <div className="container relative mx-auto px-5 py-24 sm:px-6 md:py-32">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.55 }}
            className="mx-auto max-w-4xl text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-crystal-300 backdrop-blur">
              <MapPin className="h-4 w-4" />
              Mobile cleaning teams across Dubai
            </span>

            <h1 className="mt-6 font-display text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
              Cleaning Services Across Dubai
            </h1>
            <p className="mt-5 text-xl font-semibold text-crystal-200">
              Professional Cleaning Services Near You
            </p>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-gray-300 sm:text-lg">
              Lucky Crystal Maids provides professional residential and
              commercial cleaning services across many of Dubai&apos;s popular
              residential communities, business districts, and commercial
              developments.
            </p>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-gray-400">
              Whether you need routine maid services, deep cleaning, office
              cleaning, furniture cleaning, or move-in and move-out cleaning,
              our team is committed to delivering flexible solutions that fit
              your schedule and property requirements.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-crystal-500 px-7 py-3.5 font-bold text-white transition hover:-translate-y-0.5 hover:bg-crystal-600"
              >
                Check Availability
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/quote"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-7 py-3.5 font-bold text-white backdrop-blur transition hover:bg-white/15"
              >
                Request a Free Quote
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 -mt-8 px-5 sm:px-6">
        <div className="container mx-auto grid max-w-6xl gap-4 rounded-3xl border border-gray-100 bg-white p-4 shadow-xl md:grid-cols-3">
          {[
            [Home, "Homes of every size", "Studios, apartments, villas, townhouses, and holiday homes."],
            [Building2, "Business properties", "Offices, retail stores, hospitality, clinics, and commercial sites."],
            [Clock3, "Flexible appointments", "One-time and recurring schedules may be arranged."],
          ].map(([Icon, title, text]) => (
            <article key={title} className="rounded-2xl bg-gray-50 p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-crystal-100 text-crystal-600">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="mt-4 font-bold text-gray-900">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container mx-auto grid max-w-6xl gap-6 px-5 sm:px-6 lg:grid-cols-2">
          <ServiceAudience
            icon={Home}
            title="Residential Areas We Serve"
            description="We provide home cleaning services for:"
            propertyTypes={residentialPropertyTypes}
            secondaryTitle="Residential services include:"
            services={residentialServices}
          />

          <ServiceAudience
            icon={Store}
            title="Commercial Areas We Serve"
            description="We support businesses throughout Dubai, including:"
            propertyTypes={commercialPropertyTypes}
            secondaryTitle="Flexible business schedules"
            services={[
              "Commercial cleaning schedules can often be arranged according to business operating hours.",
              "Site requirements can be reviewed before confirming the quotation.",
            ]}
          />
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="container mx-auto max-w-6xl px-5 sm:px-6">
          <motion.div {...revealProps} className="text-center">
            <Eyebrow>Community coverage</Eyebrow>
            <h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">
              Dubai Communities We Serve
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-7 text-gray-600">
              Browse some of our most frequently requested locations. Service
              remains subject to team availability and your selected date.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {communities.map((community, index) => (
              <motion.article
                key={community.name}
                {...revealProps}
                transition={{
                  duration: reducedMotion ? 0 : 0.4,
                  delay: reducedMotion ? 0 : Math.min(index * 0.035, 0.2),
                }}
                className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-crystal-200 hover:shadow-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-crystal-100 text-crystal-600">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-gray-900">{community.name}</h3>
                <p className="mt-3 text-sm leading-6 text-gray-600">{community.description}</p>
                {community.services && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {community.services.map((service) => (
                      <span key={service} className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-600">
                        {service}
                      </span>
                    ))}
                  </div>
                )}
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container mx-auto grid max-w-6xl gap-6 px-5 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div {...revealProps} className="rounded-[2rem] bg-gray-950 p-8 text-white">
            <Search className="h-8 w-8 text-crystal-300" />
            <h2 className="mt-5 font-display text-3xl font-bold">
              Don&apos;t See Your Area?
            </h2>
            <p className="mt-5 leading-7 text-gray-400">
              If your community is not listed above, contact our team. We
              regularly serve additional areas throughout Dubai and will be
              happy to confirm service availability for your location.
            </p>
            <Link
              to="/contact"
              className="mt-7 inline-flex items-center gap-2 font-bold text-crystal-300 transition hover:text-white"
            >
              Confirm your location
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div {...revealProps} className="rounded-[2rem] border border-gray-100 bg-gray-50 p-8">
            <Eyebrow>Why customers choose us</Eyebrow>
            <h2 className="font-display text-3xl font-bold text-gray-900">
              Flexible Cleaning Across Dubai
            </h2>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {customerReasons.map((reason) => (
                <div key={reason} className="flex items-start gap-3 rounded-2xl bg-white p-4">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-crystal-500" />
                  <span className="text-sm font-medium leading-6 text-gray-700">{reason}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="container mx-auto max-w-6xl px-5 sm:px-6">
          <div className="text-center">
            <Eyebrow>Popular bookings</Eyebrow>
            <h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">
              Frequently Requested Services
            </h2>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {requestedServices.map((service) => (
              <span
                key={service}
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm"
              >
                <Sparkles className="h-4 w-4 text-crystal-500" />
                {service}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container mx-auto max-w-3xl px-5 sm:px-6">
          <div className="text-center">
            <Eyebrow>Availability questions</Eyebrow>
            <h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="mt-10 space-y-3">
            {faqs.map((faq, index) => {
              const open = openFaq === index;
              const panelId = `areas-faq-panel-${index}`;
              const buttonId = `areas-faq-button-${index}`;

              return (
                <article key={faq.q} className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                  <button
                    id={buttonId}
                    type="button"
                    onClick={() => setOpenFaq(open ? null : index)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left font-semibold text-gray-900 transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-crystal-500"
                    aria-expanded={open}
                    aria-controls={panelId}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`h-5 w-5 shrink-0 text-crystal-500 transition-transform ${open ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={reducedMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={{ duration: reducedMotion ? 0 : 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-sm leading-6 text-gray-600">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-10 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-crystal-600 via-crystal-700 to-gray-950 px-6 py-12 text-center shadow-2xl sm:px-10 md:py-16">
            <MapPin className="absolute -bottom-16 -right-10 h-64 w-64 rotate-12 text-white/[0.05]" />
            <div className="relative mx-auto max-w-3xl">
              <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
                Book Cleaning Services Near You
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-crystal-100 sm:text-lg">
                Whether you need professional cleaning for your home or
                business, Lucky Crystal Maids is ready to help.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
                <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-bold text-crystal-700 transition hover:-translate-y-0.5 hover:bg-crystal-50">
                  Check Availability
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/quote" className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-7 py-3.5 font-bold text-white transition hover:bg-white/15">
                  Request a Free Quote
                </Link>
                <a
                  href="https://wa.me/971552488588"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-3.5 font-bold text-white transition hover:bg-white/15"
                >
                  <MessageCircle className="h-5 w-5" />
                  Send Your Location
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Eyebrow({ children }) {
  return (
    <span className="mb-3 block text-xs font-bold uppercase tracking-[0.22em] text-crystal-600">
      {children}
    </span>
  );
}

function ServiceAudience({
  icon: Icon,
  title,
  description,
  propertyTypes,
  secondaryTitle,
  services,
}) {
  return (
    <article className="rounded-[2rem] border border-gray-100 bg-gray-50 p-7 sm:p-8">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-crystal-100 text-crystal-600">
        <Icon className="h-7 w-7" />
      </div>
      <h2 className="mt-6 font-display text-3xl font-bold text-gray-900">{title}</h2>
      <p className="mt-4 leading-7 text-gray-600">{description}</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {propertyTypes.map((item) => (
          <div key={item} className="flex items-start gap-2 text-sm leading-6 text-gray-700">
            <CheckCircle className="mt-1 h-4 w-4 shrink-0 text-crystal-500" />
            {item}
          </div>
        ))}
      </div>
      <h3 className="mt-8 text-lg font-bold text-gray-900">{secondaryTitle}</h3>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {services.map((item) => (
          <div key={item} className="rounded-xl bg-white p-3 text-sm font-medium leading-6 text-gray-700">
            {item}
          </div>
        ))}
      </div>
    </article>
  );
}