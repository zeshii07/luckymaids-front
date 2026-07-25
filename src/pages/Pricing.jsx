import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  Building2,
  Calculator,
  Camera,
  CheckCircle,
  ChevronDown,
  Clock3,
  FileCheck2,
  Home,
  MessageCircle,
  ShieldCheck,
  Sofa,
  Sparkles,
  SprayCan,
} from "lucide-react";

const priceFactors = [
  "Property type",
  "Apartment, villa, office, or commercial premises",
  "Property size",
  "Number of bedrooms",
  "Number of bathrooms",
  "Cleaning frequency",
  "One-time or recurring service",
  "Number of cleaners required",
  "Estimated cleaning hours",
  "Cleaning materials",
  "Specialist equipment",
  "Property condition",
  "Building access",
  "Weekend or public holiday scheduling",
];

const pricingSections = [
  {
    icon: Home,
    title: "Residential Cleaning Pricing",
    description: "Residential cleaning prices vary according to the property and selected service.",
    items: [
      "Studio apartment",
      "One-bedroom apartment",
      "Two-bedroom apartment",
      "Three-bedroom apartment",
      "Villa",
      "Townhouse",
      "Penthouse",
      "Routine cleaning",
      "Deep cleaning",
      "Furniture cleaning",
      "Move-in cleaning",
      "Move-out cleaning",
    ],
  },
  {
    icon: SprayCan,
    title: "Maid Service Pricing",
    description: "Maid services are generally calculated using the selected duration and service frequency.",
    items: [
      "Number of hours",
      "Cleaning frequency",
      "Number of cleaners",
      "Materials included or excluded",
      "Weekly appointments",
      "Fortnightly appointments",
      "Monthly appointments",
    ],
  },
  {
    icon: Sparkles,
    title: "Deep Cleaning Pricing",
    description: "Deep cleaning needs additional time because it focuses on detailed cleaning throughout the property.",
    items: [
      "Property size",
      "Number of rooms",
      "Kitchens",
      "Bathrooms",
      "Property condition",
      "Additional services requested",
    ],
  },
  {
    icon: Building2,
    title: "Commercial Cleaning Pricing",
    description: "Commercial quotations are planned around business operations and site requirements.",
    items: [
      "Office size",
      "Retail premises",
      "Number of employees",
      "Operating hours",
      "Cleaning schedule",
      "Daily or weekly visits",
      "Building layout",
      "Industry requirements",
      "Site visit for larger properties",
    ],
  },
  {
    icon: Sofa,
    title: "Furniture Cleaning Pricing",
    description: "Furniture-cleaning quotations depend on item size, quantity, fabric, and cleaning method.",
    items: [
      "Number of sofas",
      "Mattress size",
      "Carpet size",
      "Curtain quantity",
      "Upholstery type",
      "Fabric material",
      "Cleaning method",
    ],
  },
];

const quoteIncludes = [
  "Scope of work",
  "Estimated duration",
  "Number of cleaners",
  "Materials, if included",
  "Equipment, if included",
  "Pricing",
  "Applicable taxes, if any",
];

const quoteDetails = [
  "Property location",
  "Property type",
  "Number of bedrooms",
  "Number of bathrooms",
  "Required service",
  "Preferred date",
  "Preferred cleaning schedule",
  "Photographs, where helpful",
];

const faqs = [
  {
    q: "Can I get a free quotation?",
    a: "Yes. We provide quotations based on the information you provide.",
  },
  {
    q: "Do you charge by the hour?",
    a: "Some services may be priced hourly, while others are quoted per project depending on the scope of work.",
  },
  {
    q: "Are cleaning materials included?",
    a: "This depends on the package selected. Your quotation will clearly explain what is included.",
  },
  {
    q: "Can I receive a quotation through WhatsApp?",
    a: "Yes. You can send your property details and photographs, where helpful, through WhatsApp for an initial assessment.",
  },
  {
    q: "Are there additional charges?",
    a: "If additional work is requested beyond the agreed scope, any changes will be discussed before proceeding.",
  },
];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Pricing() {
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
        <title>Cleaning Service Prices Dubai | Lucky Crystal Maids</title>
        <meta
          name="description"
          content="Learn how cleaning service prices are calculated at Lucky Crystal Maids. Request a personalized quotation for residential, commercial, deep cleaning, maid services, and more."
        />
        <link rel="canonical" href="https://www.luckycrystalmaids.com/pricing/" />
      </Helmet>

      <section className="relative isolate overflow-hidden bg-gray-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.20),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.12),transparent_35%)]" />
        <Calculator className="absolute -bottom-20 -right-16 h-80 w-80 rotate-12 text-white/[0.035]" />

        <div className="container relative mx-auto px-5 py-24 sm:px-6 md:py-32">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.55 }}
            className="mx-auto max-w-4xl text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-crystal-300 backdrop-blur">
              <FileCheck2 className="h-4 w-4" />
              Clear, personalized quotations
            </span>

            <h1 className="mt-6 font-display text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
              Cleaning Service Pricing
            </h1>
            <p className="mt-5 text-xl font-semibold text-crystal-200">
              Transparent Pricing for Every Property
            </p>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-gray-300 sm:text-lg">
              Every home and business is different. Rather than offering one
              fixed price for every customer, Lucky Crystal Maids provides
              quotations based on the property&apos;s size, cleaning
              requirements, service type, and preferred schedule.
            </p>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-gray-400">
              This approach helps ensure you receive a cleaning plan that
              matches your needs without paying for unnecessary services.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/quote"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-crystal-500 px-7 py-3.5 font-bold text-white transition hover:-translate-y-0.5 hover:bg-crystal-600"
              >
                Request Your Free Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-7 py-3.5 font-bold text-white backdrop-blur transition hover:bg-white/15"
              >
                Contact Our Team
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 -mt-8 px-5 sm:px-6">
        <div className="container mx-auto grid max-w-6xl gap-4 rounded-3xl border border-gray-100 bg-white p-4 shadow-xl md:grid-cols-3">
          {[
            [ShieldCheck, "No unclear starting prices", "Your quote explains the agreed scope before booking."],
            [Clock3, "Time and team considered", "Hours and cleaner requirements are included in the estimate."],
            [Camera, "Photos can improve accuracy", "Property photos may help with the initial assessment."],
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
        <div className="container mx-auto max-w-6xl px-5 sm:px-6">
          <motion.div {...revealProps} className="mx-auto max-w-4xl text-center">
            <Eyebrow>Quotation factors</Eyebrow>
            <h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">
              How Cleaning Prices Are Calculated
            </h2>
            <p className="mt-5 text-lg leading-7 text-gray-600">
              Several factors influence the cost of a cleaning service. The more
              information you provide, the more accurate your quotation will be.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {priceFactors.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-crystal-500" />
                <span className="text-sm font-medium leading-6 text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="container mx-auto max-w-6xl px-5 sm:px-6">
          <motion.div {...revealProps} className="text-center">
            <Eyebrow>Pricing by service</Eyebrow>
            <h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">
              What Affects Each Service Quote?
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {pricingSections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.article
                  key={section.title}
                  {...revealProps}
                  transition={{
                    duration: reducedMotion ? 0 : 0.4,
                    delay: reducedMotion ? 0 : Math.min(index * 0.05, 0.2),
                  }}
                  className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-crystal-100 text-crystal-600">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 text-2xl font-bold text-gray-900">{section.title}</h3>
                  <p className="mt-3 leading-7 text-gray-600">{section.description}</p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {section.items.map((item) => (
                      <div key={item} className="flex items-start gap-2 text-sm leading-6 text-gray-700">
                        <CheckCircle className="mt-1 h-4 w-4 shrink-0 text-crystal-500" />
                        {item}
                      </div>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container mx-auto grid max-w-6xl gap-6 px-5 sm:px-6 lg:grid-cols-2">
          <InfoPanel
            title="What's Included?"
            description="Every quotation clearly explains:"
            items={quoteIncludes}
            icon={FileCheck2}
          />
          <InfoPanel
            title="Requesting a Quote"
            description="To help us prepare an accurate quotation, please provide:"
            items={quoteDetails}
            icon={Camera}
          />
        </div>
      </section>

      <section className="bg-gray-950 py-20 text-white">
        <div className="container mx-auto grid max-w-6xl gap-8 px-5 sm:px-6 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <Eyebrow light>Honest quotation approach</Eyebrow>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Why We Don&apos;t Publish One Fixed Price
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-7 text-gray-300 sm:text-lg">
              Many cleaning companies advertise low starting prices that do not
              reflect the final cost. We prefer to provide quotations based on
              the actual property and cleaning requirements so customers know
              exactly what is included before confirming their booking.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur">
            <Sparkles className="h-8 w-8 text-crystal-300" />
            <h3 className="mt-5 text-xl font-bold">A more useful quotation</h3>
            <p className="mt-3 text-sm leading-6 text-gray-400">
              Your estimate can reflect property size, condition, working time,
              materials, equipment, access, and any specialist requirements.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container mx-auto max-w-3xl px-5 sm:px-6">
          <div className="text-center">
            <Eyebrow>Pricing questions</Eyebrow>
            <h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="mt-10 space-y-3">
            {faqs.map((faq, index) => {
              const open = openFaq === index;
              const panelId = `pricing-faq-panel-${index}`;
              const buttonId = `pricing-faq-button-${index}`;

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
            <Calculator className="absolute -bottom-16 -right-10 h-64 w-64 rotate-12 text-white/[0.05]" />
            <div className="relative mx-auto max-w-3xl">
              <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
                Ready for Your Personalized Quote?
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-crystal-100 sm:text-lg">
                Tell us about your property and cleaning requirements, and our
                team will recommend a service plan tailored to your home or
                business.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
                <Link to="/quote" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-bold text-crystal-700 transition hover:-translate-y-0.5 hover:bg-crystal-50">
                  Request Your Free Quote
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/contact" className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-7 py-3.5 font-bold text-white transition hover:bg-white/15">
                  Contact Our Team
                </Link>
                <a
                  href="https://wa.me/971552488588"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-3.5 font-bold text-white transition hover:bg-white/15"
                >
                  <MessageCircle className="h-5 w-5" />
                  Get a Quote on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Eyebrow({ children, light = false }) {
  return (
    <span className={`mb-3 block text-xs font-bold uppercase tracking-[0.22em] ${light ? "text-crystal-300" : "text-crystal-600"}`}>
      {children}
    </span>
  );
}

function InfoPanel({ title, description, items, icon: Icon }) {
  return (
    <article className="rounded-[2rem] border border-gray-100 bg-gray-50 p-7 sm:p-8">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-crystal-100 text-crystal-600">
        <Icon className="h-7 w-7" />
      </div>
      <h2 className="mt-6 font-display text-3xl font-bold text-gray-900">{title}</h2>
      <p className="mt-3 leading-7 text-gray-600">{description}</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3 text-sm leading-6 text-gray-700">
            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-crystal-500" />
            {item}
          </div>
        ))}
      </div>
    </article>
  );}