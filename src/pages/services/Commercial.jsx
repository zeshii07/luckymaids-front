import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  ArrowRight,
  Building,
  CalendarCheck,
  CheckCircle,
  ChevronDown,
  Clock,
  Coffee,
  Dumbbell,
  GraduationCap,
  MapPin,
  Minus,
  Plus,
  Scissors,
  ShoppingCart,
  Sparkles,
  Store,
  Stethoscope,
  Utensils,
  Users,
  Warehouse,
  Briefcase,
  ClipboardList,
} from "lucide-react";
import { useCart } from "../../context/CartContext";

// --- Data Arrays ---
const businessTypes = ["Corporate Offices", "Small Offices", "Large Office Buildings", "Co-working Spaces", "Retail Shops", "Shopping Centres", "Restaurants", "Cafés", "Hotels", "Clinics", "Medical Centres", "Schools", "Nurseries", "Gyms", "Fitness Centres", "Salons", "Spas", "Warehouses", "Showrooms", "Commercial Buildings", "Property Management Companies", "Shared Building Areas"];

const solutions = ["Office cleaning", "Daily commercial cleaning", "Weekly cleaning", "Scheduled maintenance cleaning", "Reception cleaning", "Meeting room cleaning", "Washroom cleaning", "Pantry cleaning", "Floor cleaning", "Internal window cleaning", "Dusting", "Waste collection", "Vacuuming", "Mopping", "Surface wiping", "Common area cleaning"];

const officeAreas = [
  { icon: Briefcase, title: "Corporate Offices", desc: "Larger premises with multiple departments, conference rooms, executive offices, and employee facilities. May require multiple cleaners or staggered schedules." },
  { icon: Building, title: "Small Office Cleaning", desc: "Consistent maintenance for startups, consultants, law firms, and agencies. Includes dust removal, desk-area cleaning, reception, and washroom maintenance." },
  { icon: Users, title: "Co-working Spaces", desc: "Continuous movement throughout the day. Cleaning shared workstations, phone booths, meeting rooms, kitchens, coffee stations, and lounges." },
  { icon: ClipboardList, title: "Reception & Meeting Rooms", desc: "First impressions matter. Dusting reception desks, cleaning glass, maintaining waiting areas, and preparing meeting rooms for presentations." },
  { icon: Coffee, title: "Pantry & Break Rooms", desc: "Cleaning countertops, sinks, appliance exteriors, dining tables, and coffee preparation areas to keep employee facilities clean." }
];

const customerFacing = [
  { icon: Store, title: "Retail & Showrooms", desc: "Creating a clean shopping experience. Floor sweeping, vacuuming, dusting shelves, cleaning display units, and checkout counters." },
  { icon: Utensils, title: "Restaurants & Cafés", desc: "Maintaining clean dining environments. Dining area cleaning, table/chair wiping, floors, washrooms, and waste removal. (Kitchen cleaning separate)." },
  { icon: Building, title: "Hotels & Hospitality", desc: "Professional cleaning for hotel reception areas, lobbies, waiting lounges, corridors, public washrooms, and conference rooms." },
  { icon: Dumbbell, title: "Gyms & Fitness Centres", desc: "Supporting clean fitness environments. Floor cleaning, mirror cleaning, accessible equipment surface cleaning, washrooms, and changing rooms." },
  { icon: Scissors, title: "Salons & Spas", desc: "Professional cleaning for beauty businesses. Reception, styling stations, treatment room exteriors, floors, mirrors, and washrooms." },
  { icon: Users, title: "Event Venues", desc: "Preparing spaces before and after events. Floor cleaning, chair arrangement support, reception, washroom, and waste collection." }
];

const specializedFacilities = [
  { icon: Stethoscope, title: "Clinics & Medical Centres", desc: "Routine cleaning for reception, waiting areas, consultation rooms, offices, and washrooms. (Medical waste and sterilization excluded)." },
  { icon: GraduationCap, title: "Schools & Nurseries", desc: "Organized cleaning schedules fitting around teaching hours. Classrooms, staff rooms, libraries, corridors, and common areas." },
  { icon: Warehouse, title: "Warehouses & Logistics", desc: "Floor sweeping, dust removal, office cleaning, staff facilities, and washrooms. Coordinated to avoid interfering with operations." },
  { icon: Building, title: "Building Common Areas", desc: "Cleaning shared business properties. Entrance lobbies, corridors, lift lobbies, staircases, shared washrooms, and handrails." },
  { icon: ClipboardList, title: "Property Management", desc: "Support for vacant commercial units, leasing offices, property inspection cleaning, and turnover cleaning." },
  { icon: Sparkles, title: "Post-Construction", desc: "Cleaning after renovation or fit-out projects. Dust removal, floor cleaning, internal window cleaning, and surface wiping." }
];

const processSteps = [
  { title: "Initial Site Assessment", desc: "We review property type, industry, building size, operating hours, employee numbers, customer traffic, cleaning priorities, and security procedures." },
  { title: "Developing a Cleaning Plan", desc: "Based on the assessment, we outline cleaning frequency, service areas, priority tasks, number of cleaners, required materials, and preferred times." },
  { title: "Routine Cleaning Operations", desc: "Cleaning is carried out according to the agreed schedule and checklist, including dusting, vacuuming, mopping, washrooms, reception, and waste collection." },
  { title: "Ongoing Communication", desc: "As business needs change, cleaning priorities adjust. Regular communication ensures new areas, schedule tweaks, and temporary requirements are met." },
  { title: "Service Review", desc: "Businesses are encouraged to periodically review the cleaning schedule and provide feedback to improve efficiency as the workplace evolves." }
];

const dubaiAreas = [
  "Business Bay", "Downtown Dubai", "DIFC", "Dubai Design District (d3)", "Dubai Internet City", "Dubai Media City", "Dubai Knowledge Park", "Dubai Healthcare City", "Dubai Marina", "JLT", "JBR", "Dubai Hills Estate", "Al Barsha", "Barsha Heights (Tecom)", "Palm Jumeirah", "Bluewaters Island", "City Walk", "Dubai Creek Harbour", "Al Quoz", "Ras Al Khor", "Dubai Investment Park (DIP)", "Jebel Ali", "Dubai South", "Dubai Silicon Oasis", "International City", "Nad Al Hamar", "Mirdif", "Deira", "Bur Dubai", "Al Karama", "Al Nahda", "Motor City", "Dubai Sports City", "Town Square Dubai"
];

const pricingFactors = ["Property size", "Number of rooms", "Number of washrooms", "Building layout", "Cleaning frequency", "Daily occupancy", "Business type", "Required working hours", "Number of cleaners", "Cleaning materials", "Specialist equipment", "Evening or weekend scheduling"];
const pricingTransparency = ["Pricing structure", "Minimum booking requirements", "Service inclusions", "Additional charges", "Cancellation policy", "Rescheduling policy", "Payment terms", "VAT treatment where applicable"];

const preparationChecklist = ["Securing confidential documents", "Informing staff of scheduled cleaning", "Providing building access instructions", "Identifying restricted areas", "Confirming parking arrangements", "Explaining security procedures", "Listing priority tasks", "Identifying delicate equipment", "Advising of after-hours access requirements"];

const businessBenefits = ["Consistent workplace presentation", "Cleaner shared facilities", "Organized customer areas", "Better preparation for meetings", "Flexible cleaning schedules", "Ongoing facility maintenance", "Workplace comfort", "Business continuity"];

const faqs = [
  { q: "What is included in commercial cleaning?", a: "Commercial cleaning typically includes routine cleaning of workspaces, reception areas, washrooms, floors, kitchens or pantries, meeting rooms, and other agreed business areas. The exact tasks depend on the service plan." },
  { q: "Do you clean offices of all sizes?", a: "Yes. Commercial cleaning can be tailored for small offices, corporate headquarters, shared workspaces, and multi-floor office buildings." },
  { q: "Can you clean outside business hours?", a: "Cleaning outside normal operating hours may be available depending on staffing, building access, and scheduling." },
  { q: "Do you provide daily commercial cleaning?", a: "Yes, recurring daily cleaning may be arranged where appropriate." },
  { q: "Do you provide weekly cleaning?", a: "Many businesses choose weekly or multiple weekly cleaning schedules." },
  { q: "Do you clean retail stores?", a: "Yes. Retail cleaning can be arranged for boutiques, shops, showrooms, and other customer-facing businesses." },
  { q: "Do you clean restaurants?", a: "Yes. Dining areas, customer spaces, washrooms, and agreed common areas can be included. Commercial kitchen cleaning should be discussed separately if required." },
  { q: "Do you clean hotels?", a: "Commercial cleaning can support hotel public areas, administrative offices, and shared facilities. Housekeeping services should only be promoted if they are genuinely offered." },
  { q: "Do you clean clinics?", a: "Routine commercial cleaning may be provided for clinics and medical centres. Medical waste handling and clinical cleaning procedures are separate services." },
  { q: "Do you clean schools and nurseries?", a: "Yes, where these services are offered. Cleaning schedules should fit around school operations and access arrangements." },
  { q: "Do you clean warehouses?", a: "Yes. Warehouse cleaning may include offices, staff facilities, floors, and accessible operational areas." },
  { q: "Can I combine multiple commercial services?", a: "Yes. Businesses often combine routine cleaning with deep cleaning, carpet cleaning, upholstery cleaning, or post-construction cleaning." },
  { q: "Are cleaning materials included?", a: "This depends on the selected package. Some businesses prefer to use their own approved products, while others request a service that includes standard cleaning materials." },
  { q: "Can I request specific cleaning tasks?", a: "Yes. Cleaning checklists can be customized according to your workplace priorities." },
  { q: "How many cleaners will I need?", a: "The recommended team size depends on the property's size, cleaning frequency, and required scope of work." },
  { q: "Do you move office furniture?", a: "Routine cleaning generally does not include moving heavy furniture unless agreed beforehand and it can be completed safely." },
  { q: "Do you clean carpets?", a: "Routine vacuuming may be included. Specialist carpet shampooing or extraction should be booked separately." },
  { q: "Do you clean windows?", a: "Routine commercial cleaning generally includes accessible interior glass. Exterior high-rise window cleaning requires specialist equipment." },
  { q: "Do you provide emergency commercial cleaning?", a: "Availability depends on staffing and scheduling. Contact the team to discuss urgent requirements." },
  { q: "Can I schedule weekend cleaning?", a: "Weekend appointments may be available subject to availability." },
  { q: "Can I schedule evening cleaning?", a: "Evening cleaning may be arranged depending on building access and operational requirements." },
  { q: "What if my business operates 24 hours?", a: "Cleaning schedules can often be planned around quieter periods where operationally practical." },
  { q: "Can the cleaning checklist change over time?", a: "Yes. Cleaning plans can be reviewed and adjusted as your business requirements evolve." },
  { q: "Do you supply cleaning equipment?", a: "This depends on the service agreement and package selected." },
  { q: "Are your cleaning staff insured or trained?", a: "Only publish specific claims about insurance, certifications, background checks, training, or compliance if they can be supported by current documentation." },
  { q: "Do you guarantee every stain will be removed?", a: "No. Permanent stains, material damage, or wear cannot be guaranteed to improve through cleaning." },
  { q: "How do I request a quotation?", a: "Share your property type, location, approximate size, preferred schedule, and required cleaning frequency so an appropriate quotation can be prepared." }
];


const HERO_IMAGE =
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=82";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Commercial() {
  const { addToCart } = useCart();
  const prefersReducedMotion = useReducedMotion();
  const timeoutRef = useRef(null);

  const [hours, setHours] = useState(2);
  const [crew, setCrew] = useState(1);
  const [materials, setMaterials] = useState(false);
  const [added, setAdded] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(
    () => () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    },
    [],
  );

  const ratePerHour = useMemo(() => {
    if (hours === 2) return 40;
    if (hours > 2 && hours < 4) return 35;
    return 30;
  }, [hours]);

  const materialsFee = materials ? 20 : 0;
  const serviceSubtotal = hours * crew * ratePerHour;
  const totalAmount = serviceSubtotal + materialsFee;

  const animation = {
    initial: prefersReducedMotion ? false : "hidden",
    whileInView: "visible",
    viewport: { once: true, amount: 0.15 },
    variants: reveal,
    transition: { duration: prefersReducedMotion ? 0 : 0.45 },
  };

  const handleAddToCart = () => {
    addToCart({
      id: `commercial-${hours}-${crew}-${materials ? "materials" : "no-materials"}`,
      service: "Commercial Cleaning",
      hours,
      crew,
      ratePerHour,
      materials,
      totalAmount,
      quantity: 1,
    });

    setAdded(true);
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setAdded(false), 1800);
  };

  const scrollToPicker = () => {
    document.getElementById("booking-picker")?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "center",
    });
  };

  return (
    <main className="min-h-screen overflow-hidden bg-white pb-28 pt-20">
      <Helmet>
        <title>Commercial Cleaning Services Dubai | Office & Business Cleaning</title>
        <meta
          name="description"
          content="Professional commercial cleaning services in Dubai for offices, retail stores, clinics, schools, warehouses, restaurants, hotels, gyms, and business premises."
        />
      </Helmet>

      <section className="relative isolate min-h-[650px] overflow-hidden bg-gray-950">
        <img
          src={HERO_IMAGE}
          alt="Commercial cleaning services for offices and businesses in Dubai"
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/85 to-orange-950/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-gray-950/20" />

        <div className="container relative mx-auto flex min-h-[650px] items-end px-5 pb-14 pt-28 sm:px-6 md:items-center md:pb-20">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.55 }}
            className="max-w-4xl"
          >
            <Link
              to="/services"
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-orange-100 backdrop-blur transition hover:bg-white/15"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Services
            </Link>

            <span className="mb-4 block text-sm font-bold uppercase tracking-[0.24em] text-orange-300">
              Flexible workplace cleaning
            </span>

            <h1 className="max-w-4xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
              Professional Cleaning Solutions for Offices, Retail & Businesses in Dubai
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-7 text-gray-200 sm:text-lg">
              A clean commercial environment creates a positive first
              impression, supports daily business operations, and helps maintain
              a comfortable workplace for employees, customers, visitors, and
              tenants. Our commercial cleaning services are tailored to your
              premises, operating hours, and business requirements.
            </p>

            <button
              type="button"
              onClick={scrollToPicker}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-3.5 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-orange-600"
            >
              <CalendarCheck className="h-5 w-5" />
              Build Your Cleaning Plan
            </button>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 -mt-7 px-5 sm:px-6">
        <div className="container mx-auto grid max-w-6xl gap-4 rounded-3xl border border-gray-100 bg-white p-4 shadow-xl sm:grid-cols-2 lg:grid-cols-4">
          {[
            [Building, "Office and business cleaning", "Plans for workplaces, retail, hospitality, and commercial facilities."],
            [Clock, "Flexible schedules", "Daily, weekly, evening, and weekend appointments may be available."],
            [Users, "Scalable team sizes", "Cleaner numbers can be adjusted to suit the site and time available."],
            [Sparkles, "Custom checklists", "Cleaning priorities can be adapted as your business changes."],
          ].map(([Icon, title, text]) => (
            <article key={title} className="rounded-2xl bg-gray-50 p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
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
          <motion.div {...animation} className="mx-auto max-w-4xl text-center">
            <Eyebrow>Business types supported</Eyebrow>
            <h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">
              Commercial Cleaning for Different Industries
            </h2>
            <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg">
              Dubai&apos;s fast-paced business environment creates constant
              foot traffic, meetings, deliveries, and shared workspace use.
              Structured cleaning helps maintain a professional and organized
              workplace.
            </p>
          </motion.div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {businessTypes.map((type) => (
              <span
                key={type}
                className="rounded-full border border-orange-100 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-800"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="container mx-auto max-w-6xl px-5 sm:px-6">
          <motion.div {...animation} className="text-center">
            <Eyebrow>Flexible service plans</Eyebrow>
            <h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">
              Complete Commercial Cleaning Solutions
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-7 text-gray-600">
              Different industries require different schedules, procedures, and
              priorities. We customize plans instead of relying on one standard
              checklist.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {solutions.map((solution) => (
              <div key={solution} className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-4">
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
                <span className="text-sm font-medium leading-6 text-gray-700">{solution}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-8 rounded-[2rem] border border-gray-100 bg-white p-7 lg:grid-cols-2 lg:p-9">
            <div>
              <h3 className="font-display text-3xl font-bold text-gray-900">
                Why Professional Commercial Cleaning Matters
              </h3>
              <p className="mt-5 leading-7 text-gray-600">
                A commercial property is often the first physical interaction
                customers have with a business. Clean surroundings contribute
                to a more professional appearance and support a pleasant
                experience for employees and visitors.
              </p>
              <p className="mt-4 leading-7 text-gray-600">
                The cleaning schedule should reflect occupancy levels, business
                activity, and operational requirements.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {businessBenefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3 rounded-xl bg-orange-50 p-4">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                  <span className="text-sm font-semibold leading-6 text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FacilitySection
        eyebrow="Office environments"
        title="Office Cleaning Services Dubai"
        description="Routine office cleaning helps maintain an organized and welcoming workplace while supporting day-to-day operations."
        items={officeAreas}
        background="bg-white"
      />

      <FacilitySection
        eyebrow="Customer-facing spaces"
        title="Customer-Facing & Hospitality Cleaning"
        description="Businesses that welcome customers benefit from consistent cleaning because visitors immediately notice the condition of the premises."
        items={customerFacing}
        background="bg-gray-50"
      />

      <FacilitySection
        eyebrow="Specialist commercial facilities"
        title="Healthcare, Education & Warehouse Cleaning"
        description="Different industries require different priorities. We adapt our approach to fit your facility."
        items={specializedFacilities}
        background="bg-white"
      />

      <section className="bg-gray-50 py-20">
        <div className="container mx-auto max-w-5xl px-5 sm:px-6">
          <motion.div {...animation} className="text-center">
            <Eyebrow>Structured service delivery</Eyebrow>
            <h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">
              Our Commercial Cleaning Process
            </h2>
          </motion.div>

          <div className="mt-12 space-y-4">
            {processSteps.map((step, index) => (
              <article key={step.title} className="grid gap-4 rounded-3xl border border-gray-100 bg-white p-6 sm:grid-cols-[auto_1fr]">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 font-bold text-white">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{step.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="booking-picker" className="scroll-mt-24 bg-gray-950 py-20">
        <div className="container mx-auto grid max-w-6xl gap-8 px-5 sm:px-6 lg:grid-cols-[1.35fr_0.65fr]">
          <motion.div {...animation} className="rounded-[2rem] bg-white p-6 sm:p-8">
            <Eyebrow>Build your estimate</Eyebrow>
            <h2 className="font-display text-3xl font-bold text-gray-900">
              Build Your Commercial Cleaning Plan
            </h2>
            <p className="mt-4 leading-7 text-gray-600">
              Select the number of hours and cleaners required. Minimum booking
              is 2 hours. Choose whether cleaning materials should be included.
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <CounterControl
                label="Hours"
                help="Minimum 2, maximum 8"
                value={`${hours} Hours`}
                onDecrease={() => setHours((value) => Math.max(2, value - 1))}
                onIncrease={() => setHours((value) => Math.min(8, value + 1))}
                decreaseDisabled={hours === 2}
                increaseDisabled={hours === 8}
              />
              <CounterControl
                label="Cleaners"
                help="Maximum 10"
                value={`${crew} Cleaner${crew > 1 ? "s" : ""}`}
                onDecrease={() => setCrew((value) => Math.max(1, value - 1))}
                onIncrease={() => setCrew((value) => Math.min(10, value + 1))}
                decreaseDisabled={crew === 1}
                increaseDisabled={crew === 10}
              />
            </div>

            <fieldset className="mt-7">
              <legend className="text-sm font-bold text-gray-800">
                Bring Cleaning Materials? (+20 AED)
              </legend>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <ChoiceButton selected={materials} onClick={() => setMaterials(true)}>
                  Yes, Bring Materials
                </ChoiceButton>
                <ChoiceButton selected={!materials} onClick={() => setMaterials(false)}>
                  No, I Have Them
                </ChoiceButton>
              </div>
            </fieldset>
          </motion.div>

          <motion.aside {...animation}>
            <div className="sticky top-24 rounded-[2rem] border border-white/10 bg-white/10 p-6 text-white backdrop-blur-xl">
              <Building className="h-7 w-7 text-orange-300" />
              <h3 className="mt-5 text-2xl font-bold">Booking Summary</h3>

              <dl className="mt-6 space-y-3 text-sm">
                <SummaryRow label="Rate" value={`${ratePerHour} AED/hour`} />
                <SummaryRow label="Hours" value={`${hours}`} />
                <SummaryRow label="Cleaners" value={`${crew}`} />
                <SummaryRow label="Service" value={`${serviceSubtotal} AED`} />
                <SummaryRow label="Materials" value={materials ? "+20 AED" : "Not included"} />
              </dl>

              <div className="mt-6 border-t border-white/10 pt-6">
                <div className="flex items-end justify-between gap-4">
                  <span className="text-sm text-gray-300">Estimated total</span>
                  <span className="text-3xl font-bold text-orange-300">{totalAmount} AED</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={added}
                className={`mt-7 flex w-full items-center justify-center gap-2 rounded-xl py-4 font-bold transition ${
                  added
                    ? "cursor-default bg-emerald-500 text-white"
                    : "bg-orange-500 text-white hover:bg-orange-600"
                }`}
              >
                {added ? (
                  <>
                    <CheckCircle className="h-5 w-5" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5" />
                    Add to Cart
                  </>
                )}
              </button>
            </div>
          </motion.aside>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container mx-auto max-w-5xl px-5 text-center sm:px-6">
          <motion.div {...animation}>
            <Eyebrow>Commercial coverage</Eyebrow>
            <h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">
              Commercial Cleaning Across Dubai
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-7 text-gray-600">
              We serve major business districts, retail centres, industrial
              zones, and mixed-use communities across Dubai.
            </p>
          </motion.div>

          <div className="mt-9 flex flex-wrap justify-center gap-2.5">
            {dubaiAreas.map((area) => (
              <span key={area} className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700">
                <MapPin className="h-3.5 w-3.5 text-orange-500" />
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="container mx-auto grid max-w-6xl gap-8 px-5 sm:px-6 lg:grid-cols-2">
          <InfoList
            title="Commercial Cleaning Pricing Guide"
            intro="Commercial cleaning costs depend on several factors rather than a single fixed rate."
            subtitle="What influences the cost?"
            items={pricingFactors}
            secondSubtitle="Transparent pricing"
            secondItems={pricingTransparency}
          />
          <InfoList
            title="Preparing Your Business Before Cleaning"
            intro="Advance preparation reduces delays and allows more time for cleaning."
            subtitle="Businesses can prepare by:"
            items={preparationChecklist}
          />
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container mx-auto max-w-3xl px-5 sm:px-6">
          <div className="text-center">
            <Eyebrow>Helpful answers</Eyebrow>
            <h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">
              Commercial Cleaning FAQs
            </h2>
          </div>

          <div className="mt-10 space-y-3">
            {faqs.map((faq, index) => {
              const open = openFaq === index;
              const panelId = `commercial-faq-panel-${index}`;
              const buttonId = `commercial-faq-button-${index}`;

              return (
                <article key={faq.q} className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                  <button
                    id={buttonId}
                    type="button"
                    onClick={() => setOpenFaq(open ? null : index)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left font-semibold text-gray-900 transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange-500"
                    aria-expanded={open}
                    aria-controls={panelId}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`h-5 w-5 shrink-0 text-orange-500 transition-transform ${open ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={prefersReducedMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
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
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-orange-600 via-orange-700 to-gray-950 px-6 py-12 text-center shadow-2xl sm:px-10 md:py-16">
            <Building className="absolute -bottom-16 -right-10 h-64 w-64 rotate-12 text-white/[0.05]" />
            <div className="relative mx-auto max-w-3xl">
              <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
                Professional Commercial Cleaning Solutions Across Dubai
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-orange-100 sm:text-lg">
                Share your business location, property details, cleaning
                frequency, and service priorities, and we&apos;ll recommend a
                plan that supports your workplace.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link to="/quote" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-bold text-orange-700 transition hover:-translate-y-0.5 hover:bg-orange-50">
                  Request a Commercial Quote
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/contact" className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-7 py-3.5 font-bold text-white transition hover:bg-white/15">
                  Schedule a Site Visit
                </Link>
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
    <span className="mb-3 block text-xs font-bold uppercase tracking-[0.22em] text-orange-600">
      {children}
    </span>
  );
}

function FacilitySection({ eyebrow, title, description, items, background }) {
  return (
    <section className={`${background} py-20`}>
      <div className="container mx-auto max-w-6xl px-5 sm:px-6">
        <div className="text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">{title}</h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-7 text-gray-600">{description}</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-gray-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-gray-600">{item.desc}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CounterControl({
  label,
  help,
  value,
  onDecrease,
  onIncrease,
  decreaseDisabled,
  increaseDisabled,
}) {
  return (
    <div>
      <div className="mb-2">
        <p className="text-sm font-bold text-gray-800">{label}</p>
        <p className="text-xs text-gray-500">{help}</p>
      </div>
      <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 p-3">
        <button
          type="button"
          onClick={onDecrease}
          disabled={decreaseDisabled}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-gray-700 shadow-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label={`Decrease ${label.toLowerCase()}`}
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="font-bold text-gray-900">{value}</span>
        <button
          type="button"
          onClick={onIncrease}
          disabled={increaseDisabled}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-gray-700 shadow-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label={`Increase ${label.toLowerCase()}`}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function ChoiceButton({ selected, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`rounded-xl border-2 p-3 text-sm font-bold transition ${
        selected
          ? "border-orange-500 bg-orange-50 text-orange-700"
          : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
      }`}
    >
      {children}
    </button>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-gray-300">{label}</dt>
      <dd className="text-right font-semibold text-white">{value}</dd>
    </div>
  );
}

function InfoList({
  title,
  intro,
  subtitle,
  items,
  secondSubtitle,
  secondItems = [],
}) {
  return (
    <article className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm">
      <h2 className="font-display text-3xl font-bold text-gray-900">{title}</h2>
      <p className="mt-4 leading-7 text-gray-600">{intro}</p>
      <h3 className="mt-7 text-lg font-bold text-gray-900">{subtitle}</h3>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3 text-sm leading-6 text-gray-700">
            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
            {item}
          </div>
        ))}
      </div>

      {secondSubtitle && (
        <>
          <h3 className="mt-8 text-lg font-bold text-gray-900">{secondSubtitle}</h3>
          <div className="mt-4 space-y-3">
            {secondItems.map((item) => (
              <div key={item} className="flex items-start gap-3 text-sm leading-6 text-gray-700">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                {item}
              </div>
            ))}
          </div>
        </>
      )}
    </article>
  );
}