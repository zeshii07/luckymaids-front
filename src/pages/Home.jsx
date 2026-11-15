import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Baby,
  Building2,
  Check,
  Home as HomeIcon,
  MapPin,
  Quote,
  ShieldCheck,
  Sofa,
  Sparkles,
  Star,
  Truck,
  UserCheck,
} from "lucide-react";
import Hero from "../components/Hero";
import {
  Reveal,
  Eyebrow,
  SectionContainer,
  PrimaryButton,
  TextLink,
  Marquee,
  ServiceIndex,
  BentoFeature,
  ProcessTimeline,
  QuoteSpotlight,
  MetricCallout,
  FAQAccordion,
} from "../components/primitives";

// ---------------------------------------------------------------------------
// Business content (preserved from previous version — real services & FAQs).
// ---------------------------------------------------------------------------
const services = [
  {
    icon: Sparkles,
    eyebrow: "Most requested",
    title: "Deep Cleaning",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Professional cleaner working in a bright modern home",
    description:
      "A detailed top-to-bottom service for homes and workplaces that need more than routine upkeep.",
    link: "/deep-cleaning-services-dubai",
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
    image:
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Cleaning tools prepared for professional housekeeping",
    description:
      "Reliable household support for busy professionals, families and anyone who values a consistently tidy home.",
    link: "/maid-services-dubai",
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
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Clean contemporary residential interior",
    description:
      "Custom cleaning plans for apartments, villas, townhouses, studios and holiday homes across Dubai.",
    link: "/residential-cleaning-services-dubai",
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
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Bright modern commercial office interior",
    description:
      "Professional cleaning support that helps offices, stores and customer-facing spaces stay welcoming.",
    link: "/commercial-cleaning-services-dubai",
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
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Modern sofa in a clean living room",
    description:
      "Specialized care for frequently used soft furnishings in residential and commercial properties.",
    link: "/furniture-cleaning-dubai",
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
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Freshly prepared empty apartment interior",
    description:
      "Prepare a property for occupancy or handover with focused cleaning across the rooms that matter most.",
    link: "/move-in-move-out-cleaning-dubai",
    features: [
      "Before occupancy",
      "Before property handover",
      "Kitchen and bathroom focus",
      "Agreed room-by-room scope",
    ],
  },
];

const trustProof = [
  { metric: "7", suffix: "+", label: "Specialist services" },
  { metric: "20", suffix: "+", label: "Dubai communities served" },
  { metric: "2", suffix: " min", label: "Average quote response" },
  { metric: "100", suffix: "%", label: "Agreed-scope delivery" },
];

const testimonials = [
  {
    body: "The team transformed my apartment before guests arrived. Punctual, thorough and genuinely kind — every surface was spotless.",
    author: "Ayesha R.",
    role: "Apartment owner, Dubai Marina",
  },
  {
    body: "We booked a deep clean for our office and the difference was immediate. Professional communication from quote to completion.",
    author: "Marcus L.",
    role: "Office manager, Business Bay",
  },
  {
    body: "Their maid service has been reliable for over a year. Same cleaner each week, and the standard never slips.",
    author: "Priya S.",
    role: "Villa resident, Arabian Ranches",
  },
];

const processSteps = [
  {
    title: "Tell us what you need",
    detail: "Share your property type, preferred service and location.",
    icon: MapPin,
  },
  {
    title: "Get a recommendation",
    detail: "We suggest a suitable service and scope for your requirements.",
    icon: Sparkles,
  },
  {
    title: "Choose your schedule",
    detail: "Select a convenient date and time, subject to availability.",
    icon: ShieldCheck,
  },
  {
    title: "Enjoy a cleaner space",
    detail: "Our team completes the agreed work with care and attention.",
    icon: Star,
  },
];

const areasServed = [
  "Downtown Dubai", "Business Bay", "Dubai Marina", "Jumeirah",
  "Palm Jumeirah", "JVC", "JLT", "Arabian Ranches",
  "Dubai Hills Estate", "Al Barsha", "Mirdif", "Dubai Silicon Oasis",
];

const faqs = [
  {
    q: "What cleaning services do you provide?",
    a: "We offer deep cleaning, maid services, residential cleaning, commercial cleaning, furniture cleaning, move-in and move-out cleaning, plus babysitting services.",
  },
  {
    q: "Can I book a one-time cleaning?",
    a: "Yes. One-time appointments are available for many services, depending on your location, preferred date and the required scope.",
  },
  {
    q: "Do you offer recurring maid services?",
    a: "Yes. Weekly, bi-weekly and monthly arrangements can be discussed based on your household needs and availability.",
  },
  {
    q: "Do you clean offices and commercial spaces?",
    a: "Yes. We support offices, retail spaces, clinics, salons, gyms and other commercial premises with flexible cleaning plans.",
  },
  {
    q: "Which areas of Dubai do you cover?",
    a: "We serve many residential and commercial communities across Dubai. Contact our team to confirm availability for your exact location.",
  },
  {
    q: "How can I request a quotation?",
    a: "Send us your property type, preferred service, location and ideal schedule. We will recommend a suitable option and explain the next steps.",
  },
];

export default function Home() {
  // Map services into the ServiceIndex shape.
  const indexServices = services.map((s, i) => ({
    number: String(i + 1).padStart(2, "0"),
    title: s.title,
    benefit: s.description,
    href: s.link,
    image: s.image,
    imageAlt: s.imageAlt,
  }));

  return (
    <>
      <Helmet>
        <title>
          Professional Cleaning &amp; Maid Services in Dubai | Byt Cleaning Services
        </title>
        <meta
          name="description"
          content="Trusted deep cleaning, maid services and professional home or commercial cleaning solutions across Dubai. Request a quote today."
        />
      </Helmet>

      <main className="overflow-hidden bg-paper text-ink">
        {/* Section 1 — Hero (asymmetric editorial split, built in Hero.jsx) */}
        <Hero />

        {/* Section 2 — Trust strip: horizontal proof rail (NOT cards) */}
        <SectionContainer tone="violet-soft" numeral={2}>
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center lg:justify-between">
            <div>
              <Eyebrow tone="coral">Why Byt Cleaning Services</Eyebrow>
              <p className="mt-3 max-w-xl font-display text-2xl font-bold tracking-tight sm:text-3xl">
                Trusted cleaning across Dubai, delivered with care and clear communication.
              </p>
            </div>
            <PrimaryButton to="/request-a-quote" variant="outline" withArrow>
              Get a free quote
            </PrimaryButton>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-8 border-t border-violet/20 pt-10 sm:grid-cols-4">
            {trustProof.map((item) => (
              <MetricCallout
                key={item.label}
                value={item.metric}
                suffix={item.suffix}
                label={item.label}
              />
            ))}
          </div>
        </SectionContainer>

        {/* Section 3 — Services preview: numbered editorial directory (NOT a card grid) */}
        <SectionContainer tone="white" numeral={3}>
          <div className="mb-12 max-w-2xl">
            <Eyebrow>Our services</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              A full range of cleaning and household support.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
              Browse our services by what you need. Each one has its own scope,
              process and dedicated detail page.
            </p>
          </div>
          <ServiceIndex services={indexServices} />
        </SectionContainer>

        {/* Section 4 — Signature benefit: asymmetric bento (one time, varied panels) */}
        <SectionContainer tone="white" numeral={4}>
          <div className="mb-12 max-w-2xl">
            <Eyebrow tone="indigo">Why teams &amp; families choose us</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Differentiators that make a real difference.
            </h2>
          </div>
          <BentoFeature
            proposition={
              <>
                <Eyebrow tone="coral">The Byt standard</Eyebrow>
                <h3 className="mt-3 font-display text-2xl font-bold leading-tight sm:text-3xl">
                  Every clean is delivered to an agreed, written scope — not a guess.
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-white/75">
                  We confirm what is included before we start, so you know exactly what to expect on the day.
                </p>
              </>
            }
            metric={
              <>
                <Eyebrow tone="indigo">Coverage</Eyebrow>
                <p className="section-numeral mt-3 text-4xl font-bold text-ink sm:text-5xl">
                  20<span className="text-coral">+</span>
                </p>
                <p className="mt-2 text-sm text-ink-muted">
                  Dubai communities served, from Marina to Silicon Oasis.
                </p>
              </>
            }
            feature={
              <>
                <Eyebrow tone="indigo">What is included</Eyebrow>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Trained, reliable cleaning team", "Clear before-and-after scope", "Flexible scheduling options", "Friendly support from first message"].map((f, i) => (
                    <motion.span
                      key={f}
                      initial={false}
                      whileHover={{ y: -2 }}
                      className="inline-flex items-center gap-2 rounded-full border border-mint/60 bg-mint-soft/80 px-3.5 py-2 text-sm font-semibold text-ink shadow-sm"
                      style={{ animationDelay: `${i * 60}ms` }}
                    >
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-mint-deep text-ink">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      {f}
                    </motion.span>
                  ))}
                </div>
              </>
            }
            quote={
              <>
                <Quote className="h-8 w-8 text-mint" />
                <p className="mt-3 font-display text-lg font-semibold leading-snug text-white">
                  &ldquo;The standard never slips. Same cleaner, same care, every single week.&rdquo;
                </p>
                <p className="mt-3 text-sm text-white/70">— Priya S., Arabian Ranches</p>
              </>
            }
          />
        </SectionContainer>

        {/* Section 5 — Process: timeline with line draw */}
        <SectionContainer tone="mint" numeral={5}>
          <div className="mb-12 max-w-2xl">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              A simple path from first message to a cleaner space.
            </h2>
          </div>
          <ProcessTimeline steps={processSteps} />
        </SectionContainer>

        {/* Section 6 — Testimonial: editorial quote spotlight */}
        <SectionContainer tone="ink" numeral={6} className="text-white">
          <div className="mb-12 max-w-2xl">
            <Eyebrow tone="white">From our clients</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Real experiences from Dubai homes and offices.
            </h2>
          </div>
          <QuoteSpotlight quotes={testimonials} />
        </SectionContainer>

        {/* Section 7 — Areas served: marquee rail (real, scannable list) */}
        <SectionContainer tone="coral-soft" numeral={7}>
          <div className="mb-10 max-w-2xl">
            <Eyebrow tone="indigo">Areas we serve</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Cleaning teams across Dubai.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              We cover many communities across the city. If yours is not listed,
              ask us — we may still be able to help.
            </p>
          </div>
          <Marquee speed={38} className="py-4">
            {areasServed.map((area) => (
              <span
                key={area}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-paper px-5 py-2.5 text-sm font-semibold text-ink"
              >
                <MapPin className="h-4 w-4 text-coral" aria-hidden="true" />
                {area}
              </span>
            ))}
          </Marquee>
        </SectionContainer>

        {/* Section 8 — FAQ: two-column accordion with dividers */}
        <SectionContainer tone="paper" numeral={8}>
          <Reveal>
            <FAQAccordion
              title="Answers before you ask."
              intro="The questions we hear most often. If yours is not here, our team is one message away."
              items={faqs}
            />
          </Reveal>
        </SectionContainer>

        {/* Section 9 — Final CTA: high-contrast conversion close */}
        <section className="relative overflow-hidden bg-ink px-6 py-20 text-white sm:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,110,87,.26),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(93,80,232,.22),transparent_40%)]" aria-hidden="true" />
          <div className="relative container mx-auto max-w-3xl text-center">
            <Eyebrow tone="coral" className="justify-center">
              <span className="inline-flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5" />
                Ready when you are
              </span>
            </Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Ready for a cleaner, more comfortable space?
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/75 sm:text-lg">
              Tell us what you need and we will help you choose a practical
              service for your home or business.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <PrimaryButton to="/request-a-quote" variant="coral" size="lg" withArrow>
                Get a free quote
              </PrimaryButton>
              <PrimaryButton to="/book-cleaning-service" variant="ghost" size="lg">
                Book a service
              </PrimaryButton>
            </div>
            <p className="mt-8 text-sm text-white/55">
              Serving Dubai · Same-day enquiries answered during working hours
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
