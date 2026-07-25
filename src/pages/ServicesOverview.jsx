import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  ArrowRight,
  Baby,
  Building2,
  Calendar,
  CheckCircle,
  Clock3,
  Gem,
  HeartHandshake,
  Home,
  Leaf,
  MapPin,
  ShieldCheck,
  Sofa,
  Sparkles,
  SprayCan,
  Star,
  Truck,
  UserRoundCheck,
} from "lucide-react";

const serviceData = {
  residential: {
    slug: "residential",
    title: "Residential Cleaning",
    subtitle: "Your home, perfectly maintained.",
    shortIntro:
      "Flexible home cleaning for apartments, villas, townhouses, and everyday household needs.",
    description:
      "Our residential cleaning service helps keep living spaces fresh, organized, and comfortable. We tailor each visit around your property size, preferred schedule, and the areas that need the most attention.",
    image:
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1f1?auto=format&fit=crop&w=1800&q=82",
    icon: Home,
    accent: "from-emerald-500 to-teal-700",
    features: [
      "Dusting all surfaces and fixtures",
      "Vacuuming carpets and rugs",
      "Mopping hard floors",
      "Kitchen appliance exteriors",
      "Bathroom sanitization",
      "Making beds",
      "Emptying trash bins",
    ],
    idealFor: [
      "Apartments and villas",
      "Busy families",
      "Weekly or recurring cleaning",
      "Tenants and homeowners",
    ],
    process: [
      "Confirm your property details and preferred schedule",
      "Prioritize rooms and specific cleaning requests",
      "Complete the agreed cleaning checklist",
      "Review the service before departure",
    ],
  },

  "deep-cleaning": {
    slug: "deep-cleaning",
    title: "Deep Cleaning",
    subtitle: "When your property needs extra attention.",
    shortIntro:
      "Detailed top-to-bottom cleaning for homes, offices, and spaces that need a more intensive reset.",
    description:
      "Deep cleaning targets hidden dust, grease, residue, buildup, and difficult-to-reach areas that routine cleaning may not cover. It is suitable for seasonal cleaning, special occasions, post-renovation care, and complete property refreshes.",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1800&q=82",
    icon: Sparkles,
    accent: "from-sky-500 to-blue-800",
    features: [
      "Inside oven and refrigerator cleaning",
      "Baseboard scrubbing",
      "Window sill and frame washing",
      "Ceiling fan dusting",
      "Grout scrubbing",
      "Light fixture cleaning",
      "Detailed wall spot cleaning",
    ],
    idealFor: [
      "Seasonal cleaning",
      "Post-renovation properties",
      "Move preparation",
      "Homes requiring a full reset",
    ],
    process: [
      "Assess property condition and high-priority areas",
      "Remove dust from high and hidden surfaces",
      "Deep clean kitchens, bathrooms, and living areas",
      "Complete final sanitization and inspection",
    ],
    detailPath: "/services/deep-cleaning",
  },

  "move-in-out": {
    slug: "move-in-out",
    title: "Move-In / Move-Out Cleaning",
    subtitle: "A fresh start in a spotless space.",
    shortIntro:
      "Complete empty-property cleaning designed for tenants, landlords, owners, and property managers.",
    description:
      "Moving is already demanding. Our move-in and move-out cleaning service prepares the property for handover, inspection, new tenants, or your own arrival by focusing on empty-room surfaces, storage areas, fixtures, and final presentation.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=82",
    icon: Truck,
    accent: "from-amber-500 to-orange-700",
    features: [
      "Complete empty-property cleaning",
      "Inside cabinet and drawer wiping",
      "Deep appliance cleaning",
      "Garage sweep-out",
      "Window cleaning",
      "Carpet vacuuming",
      "Final touch-up sanitization",
    ],
    idealFor: [
      "Tenant handovers",
      "New property arrivals",
      "Landlords and property managers",
      "Vacant apartments and villas",
    ],
    process: [
      "Review property condition and access details",
      "Clean rooms, storage, fixtures, and appliances",
      "Focus on handover-sensitive areas",
      "Complete a final walkthrough",
    ],
    detailPath: "/services/move-in-out",
  },

  commercial: {
    slug: "commercial",
    title: "Commercial Cleaning",
    subtitle: "Professional spaces deserve professional care.",
    shortIntro:
      "Cleaning plans for offices, shops, restaurants, clinics, and other business environments.",
    description:
      "Our commercial cleaning services support clean, presentable, and organized workplaces. Plans can be adapted around operating hours, property size, visitor traffic, hygiene priorities, and recurring service requirements.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=82",
    icon: Building2,
    accent: "from-violet-500 to-indigo-800",
    features: [
      "Office desk and workstation wiping",
      "Breakroom sanitization",
      "Restroom deep cleaning",
      "Glass door cleaning",
      "Floor care",
      "Trash removal and recycling",
      "Disinfecting high-touch areas",
    ],
    idealFor: [
      "Corporate offices",
      "Retail outlets",
      "Restaurants and cafés",
      "Clinics and commercial facilities",
    ],
    process: [
      "Assess the site and operating requirements",
      "Create a practical cleaning schedule",
      "Complete service using agreed checklists",
      "Review quality and recurring needs",
    ],
    detailPath: "/services/commercial",
  },

  furniture: {
    slug: "furniture",
    title: "Furniture Cleaning",
    subtitle: "Refresh upholstery and extend its usable life.",
    shortIntro:
      "Specialized care for sofas, mattresses, carpets, chairs, curtains, and other upholstered items.",
    description:
      "Furniture and soft furnishings collect dust, hair, oils, spills, residue, and odors over time. Our technicians assess fabric type, condition, and staining before selecting a suitable cleaning method.",
    image:
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1800&q=82",
    icon: Sofa,
    accent: "from-pink-500 to-rose-800",
    features: [
      "Deep sofa and couch extraction",
      "Stain and odor treatment",
      "Fabric-safe cleaning methods",
      "Selected leather cleaning",
      "Curtain and drape care",
      "Cushion deep cleaning",
      "Mattress and carpet cleaning",
    ],
    idealFor: [
      "Homes with pets or children",
      "Hotels and restaurants",
      "Office seating",
      "Frequently used upholstery",
    ],
    process: [
      "Inspect fabric and existing damage",
      "Vacuum and pre-treat suitable areas",
      "Clean using an appropriate method",
      "Review results and explain drying requirements",
    ],
    detailPath: "/services/furniture",
  },

  "maid-services": {
    slug: "maid-services",
    title: "Maid Services",
    subtitle: "Flexible household support built around your routine.",
    shortIntro:
      "Hourly or recurring maid assistance for housekeeping, organization, and everyday home tasks.",
    description:
      "Our maid services are designed for households that need reliable help with regular upkeep. Service plans can be adjusted around your schedule, preferred number of hours, household priorities, and recurring requirements.",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1800&q=82",
    icon: SprayCan,
    accent: "from-cyan-500 to-teal-800",
    features: [
      "General housekeeping",
      "Dusting and floor cleaning",
      "Kitchen tidying",
      "Bathroom cleaning",
      "Bed making",
      "Laundry assistance when agreed",
      "Flexible hourly scheduling",
    ],
    idealFor: [
      "Busy professionals",
      "Families requiring regular help",
      "Recurring weekly support",
      "Short hourly appointments",
    ],
    process: [
      "Select the required number of hours",
      "Share household priorities",
      "Complete tasks within the booked time",
      "Adjust future visits based on your needs",
    ],
    detailPath: "/services/maid-services",
  },

  babysitting: {
    slug: "babysitting",
    title: "Babysitting Services",
    subtitle: "Dependable support for families and children.",
    shortIntro:
      "Flexible family assistance with child supervision and agreed light household support.",
    description:
      "Our babysitting service helps families who need dependable assistance for a scheduled period. Requirements, routines, responsibilities, and safety expectations should be clearly discussed before the appointment.",
    image:
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1800&q=82",
    icon: Baby,
    accent: "from-fuchsia-500 to-purple-800",
    features: [
      "Child supervision",
      "Child meal preparation when agreed",
      "Light housekeeping",
      "Engaging age-appropriate activities",
      "Homework assistance",
      "Routine support",
      "Clear safety instructions",
    ],
    idealFor: [
      "Parents needing scheduled support",
      "Short appointments",
      "Family events",
      "Routine household assistance",
    ],
    process: [
      "Discuss the child's routine and requirements",
      "Confirm duties and emergency contacts",
      "Follow agreed safety and care instructions",
      "Provide clear handover at the end",
    ],
    detailPath: "/services/babysitting",
  },
};

const routeAliases = {
  deep: "deep-cleaning",
  move: "move-in-out",
  "move-in": "move-in-out",
  "move-out": "move-in-out",
  maid: "maid-services",
};

const serviceOrder = [
  "residential",
  "deep-cleaning",
  "move-in-out",
  "commercial",
  "furniture",
  "maid-services",
  "babysitting",
];

const trustPoints = [
  {
    icon: UserRoundCheck,
    title: "Professional support",
    text: "Services are planned around the property, schedule, and customer requirements.",
  },
  {
    icon: Leaf,
    title: "Considered products",
    text: "Suitable cleaning products and methods are selected for the surfaces being treated.",
  },
  {
    icon: Calendar,
    title: "Flexible scheduling",
    text: "One-time and recurring appointments may be arranged subject to availability.",
  },
  {
    icon: ShieldCheck,
    title: "Clear communication",
    text: "Scope, access, timing, and special requirements are discussed before service.",
  },
];

function resolveServiceId(id) {
  if (!id) return "residential";
  return routeAliases[id] || id;
}

export default function ServiceDetail() {
  const { id } = useParams();
  const prefersReducedMotion = useReducedMotion();

  const resolvedId = resolveServiceId(id);
  const service = serviceData[resolvedId];
  const allServices = useMemo(
    () => serviceOrder.map((serviceId) => serviceData[serviceId]),
    [],
  );

  if (!service) {
    return <UnknownService services={allServices} />;
  }

  const ServiceIcon = service.icon;

  const revealProps = {
    initial: prefersReducedMotion ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.16 },
    transition: { duration: prefersReducedMotion ? 0 : 0.45 },
  };

  return (
    <div className="min-h-screen overflow-hidden bg-white pb-24 pt-20">
      <Helmet>
        <title>{service.title} Dubai | Lucky Crystal Maids</title>
        <meta
          name="description"
          content={`${service.shortIntro} Explore what is included and request a booking or personalized quotation from Lucky Crystal Maids.`}
        />
      </Helmet>

      <section className="relative isolate min-h-[610px] overflow-hidden bg-gray-950">
        <img
          src={service.image}
          alt={service.title}
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/85 to-gray-950/25" />
        <div className={`absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t ${service.accent} opacity-30`} />

        <div className="container relative mx-auto flex min-h-[610px] items-end px-5 pb-14 pt-28 sm:px-6 md:items-center md:pb-20">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.55 }}
            className="max-w-4xl"
          >
            <Link
              to="/services"
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ArrowLeft className="h-4 w-4" />
              All Services
            </Link>

            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white backdrop-blur">
              <ServiceIcon className="h-7 w-7" />
            </div>

            <span className="block text-sm font-bold uppercase tracking-[0.24em] text-crystal-300">
              Lucky Crystal Maids
            </span>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
              {service.title}
            </h1>
            <p className="mt-4 text-xl font-medium text-crystal-200">
              {service.subtitle}
            </p>
            <p className="mt-6 max-w-3xl text-base leading-7 text-gray-200 sm:text-lg">
              {service.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                to="/booking"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-crystal-500 px-6 py-3.5 font-bold text-white shadow-lg shadow-crystal-950/30 transition hover:-translate-y-0.5 hover:bg-crystal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Book This Service
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/quote"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3.5 font-bold text-white backdrop-blur transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Request a Free Quote
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 -mt-7 px-5 sm:px-6">
        <div className="container mx-auto grid max-w-6xl gap-4 rounded-3xl border border-gray-100 bg-white p-4 shadow-xl sm:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map((point) => {
            const Icon = point.icon;
            return (
              <article key={point.title} className="rounded-2xl bg-gray-50 p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-crystal-100 text-crystal-600">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-4 font-bold text-gray-900">{point.title}</h2>
                <p className="mt-2 text-sm leading-6 text-gray-600">{point.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container mx-auto grid max-w-6xl gap-10 px-5 sm:px-6 lg:grid-cols-[1.45fr_0.75fr]">
          <motion.div {...revealProps}>
            <SectionEyebrow>Service overview</SectionEyebrow>
            <h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">
              What&apos;s Included
            </h2>
            <p className="mt-4 max-w-3xl leading-7 text-gray-600">
              The exact scope can be adjusted according to property condition,
              available time, access, and any special requests discussed before
              the appointment.
            </p>

            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              {service.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4 transition hover:border-crystal-200 hover:bg-white hover:shadow-md"
                >
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-crystal-500" />
                  <span className="text-sm font-medium leading-6 text-gray-700">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.aside {...revealProps} className="space-y-5">
            <div className="rounded-3xl border border-crystal-100 bg-crystal-50 p-6">
              <SectionEyebrow>Best suited for</SectionEyebrow>
              <div className="mt-4 space-y-3">
                {service.idealFor.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Star className="mt-0.5 h-4 w-4 shrink-0 fill-crystal-500 text-crystal-500" />
                    <span className="text-sm font-medium leading-6 text-gray-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-gray-900 p-6 text-white shadow-xl">
              <HeartHandshake className="h-8 w-8 text-crystal-300" />
              <h3 className="mt-5 text-xl font-bold">Need a custom plan?</h3>
              <p className="mt-3 text-sm leading-6 text-gray-400">
                Share your property type, location, preferred date, and any
                special requirements. Our team can recommend a suitable option.
              </p>
              <Link
                to="/contact"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-crystal-300 transition hover:text-white"
              >
                Contact our team
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.aside>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="container mx-auto max-w-6xl px-5 sm:px-6">
          <motion.div {...revealProps} className="text-center">
            <SectionEyebrow>Simple booking journey</SectionEyebrow>
            <h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">
              How This Service Works
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, index) => (
              <motion.article
                key={step}
                {...revealProps}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.4,
                  delay: prefersReducedMotion ? 0 : index * 0.05,
                }}
                className="relative rounded-3xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-crystal-500 font-bold text-white">
                  {index + 1}
                </span>
                <p className="mt-5 text-sm font-semibold leading-6 text-gray-800">
                  {step}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container mx-auto max-w-6xl px-5 sm:px-6">
          <motion.div {...revealProps} className="text-center">
            <SectionEyebrow>Explore everything we offer</SectionEyebrow>
            <h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">
              All Cleaning and Support Services
            </h2>
            <p className="mx-auto mt-4 max-w-3xl leading-7 text-gray-600">
              Compare our services below and open any option to review its
              included tasks, ideal use cases, and booking information.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {allServices.map((item, index) => (
              <ServiceCard
                key={item.slug}
                service={item}
                active={item.slug === service.slug}
                index={index}
                reducedMotion={prefersReducedMotion}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="container mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr]">
            <motion.div {...revealProps} className="rounded-[2rem] bg-gray-900 p-8 text-white md:p-10">
              <MapPin className="h-8 w-8 text-crystal-300" />
              <h2 className="mt-5 font-display text-3xl font-bold">
                Serving Homes and Businesses Across Dubai
              </h2>
              <p className="mt-5 leading-7 text-gray-400">
                Service availability depends on your location, required service,
                property size, booking date, and team schedule. Share your area
                when requesting a quotation or booking.
              </p>
              <Link
                to="/contact"
                className="mt-7 inline-flex items-center gap-2 font-bold text-crystal-300 transition hover:text-white"
              >
                Confirm service availability
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div {...revealProps} className="rounded-[2rem] border border-gray-100 bg-white p-8 md:p-10">
              <SectionEyebrow>Why customers choose us</SectionEyebrow>
              <h2 className="font-display text-3xl font-bold text-gray-900">
                Flexible Service Without Unnecessary Complexity
              </h2>
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {[
                  ["Clear booking options", "Choose a service, package, or custom request."],
                  ["Residential and commercial", "Support for homes, offices, and managed properties."],
                  ["One-time or recurring", "Select the schedule that fits your needs."],
                  ["Personalized quotations", "Complex requirements can be reviewed individually."],
                ].map(([title, text]) => (
                  <article key={title} className="rounded-2xl bg-gray-50 p-5">
                    <Gem className="h-5 w-5 text-crystal-500" />
                    <h3 className="mt-4 font-bold text-gray-900">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-600">{text}</p>
                  </article>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-10 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className={`relative overflow-hidden rounded-[2.25rem] bg-gradient-to-br ${service.accent} px-6 py-12 text-center shadow-2xl sm:px-10 md:py-16`}>
            <ServiceIcon className="absolute -bottom-14 -right-10 h-64 w-64 rotate-12 text-white/[0.07]" />
            <div className="relative mx-auto max-w-3xl">
              <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
                Ready to Arrange {service.title}?
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
                Select your preferred service, provide your address and
                schedule, or request a personalized quotation for more detailed
                requirements.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  to="/booking"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-bold text-gray-900 shadow-lg transition hover:-translate-y-0.5 hover:bg-gray-50"
                >
                  Book This Service
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/quote"
                  className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-7 py-3.5 font-bold text-white backdrop-blur transition hover:bg-white/15"
                >
                  Get a Free Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ServiceCard({ service, active, index, reducedMotion }) {
  const Icon = service.icon;
  const targetPath = `/services/${service.slug}`;

  return (
    <motion.article
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: reducedMotion ? 0 : 0.4,
        delay: reducedMotion ? 0 : Math.min(index * 0.04, 0.2),
      }}
      className={[
        "group overflow-hidden rounded-3xl border bg-white transition",
        active
          ? "border-crystal-300 shadow-xl shadow-crystal-500/10"
          : "border-gray-100 hover:-translate-y-1 hover:border-crystal-200 hover:shadow-xl",
      ].join(" ")}
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={service.image}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/20 to-transparent" />
        <div className="absolute bottom-4 left-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur">
          <Icon className="h-5 w-5" />
        </div>
        {active && (
          <span className="absolute right-4 top-4 rounded-full bg-crystal-500 px-3 py-1 text-xs font-bold text-white">
            Viewing now
          </span>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
        <p className="mt-3 text-sm leading-6 text-gray-600">
          {service.shortIntro}
        </p>
        <Link
          to={targetPath}
          className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-crystal-600 transition group-hover:text-crystal-700"
          aria-current={active ? "page" : undefined}
        >
          View service details
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.article>
  );
}

function SectionEyebrow({ children }) {
  return (
    <span className="mb-3 block text-xs font-bold uppercase tracking-[0.22em] text-crystal-600">
      {children}
    </span>
  );
}

function UnknownService({ services }) {
  return (
    <div className="min-h-screen bg-gray-50 px-5 pb-20 pt-36 sm:px-6">
      <Helmet>
        <title>Service Not Found | Lucky Crystal Maids</title>
      </Helmet>

      <div className="container mx-auto max-w-5xl text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-crystal-100 text-crystal-600">
          <Gem className="h-8 w-8" />
        </div>
        <h1 className="mt-6 font-display text-4xl font-bold text-gray-900">
          Service Not Found
        </h1>
        <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
          The requested service page is unavailable. Choose one of the services
          below or return to the main services page.
        </p>

        <Link
          to="/services"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-crystal-500 px-6 py-3 font-bold text-white transition hover:bg-crystal-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to All Services
        </Link>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 text-left shadow-sm transition hover:border-crystal-200 hover:shadow-md"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-crystal-100 text-crystal-600">
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-bold text-gray-900">
                    {service.title}
                  </span>
                  <span className="mt-1 block text-xs text-gray-500">
                    View service
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}