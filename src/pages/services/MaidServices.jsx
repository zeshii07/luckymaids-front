import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  Building,
  Calendar,
  CalendarCheck,
  CheckCircle,
  ChevronDown,
  Clock,
  Home,
  MapPin,
  Minus,
  Plus,
  Shirt,
  ShoppingCart,
  SprayCan,
  Sparkles,
  WashingMachine,
  XCircle,
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import RelatedServices from "../../components/RelatedServices";

const HERO_IMAGE =
  "https://plus.unsplash.com/premium_photo-1677234147127-36046f5fbe78?auto=format&fit=crop&w=1800&q=85";

const customizationOptions = [
  "Property type",
  "Number of rooms",
  "Number of bathrooms",
  "Property size",
  "Household occupancy",
  "Cleaning frequency",
  "Preferred days",
  "Required working hours",
  "Cleaning-material requirements",
  "Priority tasks",
  "Pets in the property",
  "Special access instructions",
];

const serviceTypes = [
  {
    icon: Clock,
    title: "Hourly Maid Services",
    desc: "Book a cleaner for a defined number of hours with a prioritized task list. Ideal for busy professionals and short-term needs.",
  },
  {
    icon: Calendar,
    title: "Part-Time & Weekly",
    desc: "Regular household support on selected days. Maintain your home consistently without a live-in arrangement.",
  },
  {
    icon: CalendarCheck,
    title: "One-Time Cleaning",
    desc: "Cleaning help whenever you need it. Perfect for before guests arrive, after travel, or during busy work periods.",
  },
];

const roomChecklists = [
  {
    title: "Living Room Cleaning",
    items: [
      "Dusting accessible furniture & TV units",
      "Wiping tables, shelves, and mirrors",
      "Vacuuming sofas externally & arranging cushions",
      "Vacuuming carpets & sweeping floors",
      "Mopping suitable flooring & emptying bins",
    ],
  },
  {
    title: "Bedroom Cleaning",
    items: [
      "Making beds & changing provided bed linen",
      "Dusting bedside tables & accessible furniture",
      "Wiping wardrobe exteriors & door handles",
      "Vacuuming & mopping suitable floors",
      "Light organization of visible items",
    ],
  },
  {
    title: "Kitchen Cleaning",
    items: [
      "Wiping countertops, sinks, and backsplash",
      "Polishing accessible faucets",
      "Wiping cooker & appliance exteriors",
      "Cleaning dining table & cabinet exteriors",
      "Loading/unloading dishwasher (if agreed)",
      "Sweeping & mopping flooring",
    ],
  },
  {
    title: "Bathroom Cleaning",
    items: [
      "Cleaning toilet, washbasin, and mirrors",
      "Wiping countertops & cleaning shower surfaces",
      "Cleaning the bathtub & wiping accessible tiles",
      "Cleaning faucets & emptying bins",
      "Sweeping or vacuuming",
      "Mopping the floor",
    ],
  },
];

const processSteps = [
  {
    title: "Select Your Service",
    desc: "Choose one-time, hourly, weekly, or recurring part-time cleaning, with or without materials.",
  },
  {
    title: "Share Property Details",
    desc: "Provide location, property type, bedrooms, bathrooms, preferred date/time, required hours, priority tasks, and pet information.",
  },
  {
    title: "Receive Booking Price",
    desc: "Quotation based on hours, cleaners, supplies, transportation, and frequency. Review total price and cancellation terms.",
  },
  {
    title: "Prepare the Home",
    desc: "Put away valuables, secure cash, provide building access, ensure utilities are on, prepare materials if required, and secure pets.",
  },
  {
    title: "Explain Priorities",
    desc: "Show rooms to clean, areas to avoid, products to use, laundry instructions, and expected completion order.",
  },
  {
    title: "Review the Service",
    desc: "Review completed areas before the cleaner leaves. Raise reasonable service concerns promptly.",
  },
];

const limitations = [
  "Childcare or unsupervised babysitting",
  "Elderly medical care or nursing",
  "Pest control or mold remediation",
  "High-rise exterior window cleaning",
  "Heavy furniture moving",
  "Maintenance, electrical, or plumbing work",
  "Garden maintenance or pool cleaning",
  "Exterior pressure washing or AC-duct cleaning",
  "Marble restoration or driving",
  "Unapproved cooking or work outside confirmed address",
];

const areasServed = [
  "Downtown Dubai",
  "Business Bay",
  "Dubai Marina",
  "Jumeirah Beach Residence",
  "Jumeirah Lake Towers",
  "Palm Jumeirah",
  "Dubai Harbour",
  "Bluewaters Island",
  "Jumeirah",
  "Umm Suqeim",
  "Al Safa",
  "Al Wasl",
  "Al Barsha",
  "Barsha Heights",
  "The Greens",
  "The Views",
  "Dubai Hills Estate",
  "Arabian Ranches",
  "Emirates Hills",
  "The Springs",
  "The Meadows",
  "The Lakes",
  "Jumeirah Village Circle",
  "Jumeirah Village Triangle",
  "Dubai Sports City",
  "Motor City",
  "Damac Hills",
  "Damac Hills 2",
  "Mudon",
  "Town Square Dubai",
  "Tilal Al Ghaf",
  "Dubai Silicon Oasis",
  "International City",
  "Mirdif",
  "Nad Al Sheba",
  "Meydan",
  "Mohammed Bin Rashid City",
  "Dubai Creek Harbour",
  "Dubai Festival City",
  "Al Furjan",
  "Discovery Gardens",
  "The Gardens",
  "Dubai South",
  "Al Nahda",
  "Deira",
  "Bur Dubai",
  "Al Karama",
];

const faqs = [
  { q: "What is included in an hourly maid service?", a: "Hourly service may include routine dusting, kitchen cleaning, bathroom cleaning, vacuuming, mopping, bed-making, and other approved household tasks. The work completed depends on the booked duration and priorities." },
  { q: "Can I book a maid for only a few hours?", a: "Yes, subject to the company’s minimum booking duration and service availability." },
  { q: "Do you provide part-time maid services?", a: "Recurring part-time cleaning may be available on selected days and times." },
  { q: "Can I book the same cleaner every week?", a: "You may request the same cleaner, but continuity depends on availability, scheduling, leave, transport, and company policy. Do not promise the same worker unless formally confirmed." },
  { q: "Do you provide cleaning materials?", a: "Packages may be available with or without cleaning materials. Confirm the selected option before booking." },
  { q: "What should I provide when booking without materials?", a: "Provide suitable cleaning products, cloths, a mop, bucket, vacuum cleaner, rubbish bags, gloves, and any task-specific equipment." },
  { q: "Can the maid do laundry?", a: "Routine laundry assistance may be included when requested and when enough booking time is available." },
  { q: "Can the maid provide ironing services?", a: "Yes, ironing may be selected as a priority task. The customer should provide suitable equipment." },
  { q: "Can the maid cook?", a: "Cooking is not automatically included in routine cleaning. It should only be advertised or accepted when the company’s service model and assigned worker support it." },
  { q: "Can the maid look after children?", a: "Standard cleaning staff should not be assumed to provide childcare. Book a separate babysitting service when child supervision is required." },
  { q: "Do you provide full-time or live-in maids?", a: "Only advertise full-time placement, sponsorship, recruitment, or live-in domestic-worker services when the company holds the required authorization and follows the applicable employment process." },
  { q: "Can I privately hire a cleaner sent by the company?", a: "Customers should not arrange unapproved direct work with company staff. Any additional or recurring booking should be made through the company’s authorized process." },
  { q: "How many hours do I need?", a: "The required duration depends on property size, condition, number of rooms, selected tasks, and cleaning frequency. Share your priorities for a recommendation." },
  { q: "Can one cleaner finish a large villa in a short booking?", a: "A large villa may require more hours, several cleaners, or multiple appointments. A short booking may cover only priority rooms." },
  { q: "Is deep cleaning included?", a: "No. Routine maid service is intended for regular home maintenance. Deep cleaning includes more detailed work, specialist products, equipment, and additional time." },
  { q: "Do you clean inside ovens and refrigerators?", a: "Internal appliance cleaning may require advance booking, sufficient time, and an additional charge." },
  { q: "Can you remove every stain?", a: "No. Permanent discoloration, damage, burns, bleach marks, old grout staining, rust, and material deterioration may remain after cleaning." },
  { q: "Can I book same-day maid service?", a: "Same-day service may be available depending on location, timing, staffing, and required duration. Advance booking is recommended." },
  { q: "Are weekend bookings available?", a: "Weekend appointments may be available, subject to the schedule and applicable rates." },
  { q: "Do I need to be home?", a: "You may provide authorized access, but customers remain responsible for securing valuables and giving clear instructions. Follow the company’s key-access policy." },
  { q: "What happens if I need more time?", a: "Contact the booking team as early as possible. Extensions depend on the cleaner’s next appointment and may involve additional charges." },
  { q: "What happens if the cleaner is late?", a: "Traffic, building access, or transportation issues may occasionally cause delays. The company should notify customers and apply its scheduling policy." },
  { q: "Can I cancel or reschedule?", a: "Yes, according to the stated cancellation and rescheduling terms. Late cancellation fees may apply." },
  { q: "Do you clean offices?", a: "Routine office cleaning should be booked through the commercial-cleaning service so staffing, equipment, timing, and pricing can be planned properly." },
];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function MaidServices() {
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
      id: `maid-${hours}-${crew}-${materials ? "materials" : "no-materials"}`,
      service: "Maid Services",
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
    <div className="min-h-screen overflow-hidden bg-white pb-28 pt-20">
      <Helmet>
        <title>Maid Services Dubai | Hourly & Part-Time Cleaners</title>
        <meta
          name="description"
          content="Book professional maid services in Dubai for hourly, part-time, weekly, and recurring home cleaning. Flexible housekeeping for apartments and villas, with or without cleaning materials."
        />
      </Helmet>

      <section className="relative isolate min-h-[640px] overflow-hidden bg-cyan-50">
        <img
          src={HERO_IMAGE}
          alt="Professional maid services in Dubai"
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/55 via-slate-900/20 to-transparent" />

        <div className="container relative mx-auto flex min-h-[640px] items-end px-5 pb-14 pt-28 sm:px-6 md:items-center md:pb-20">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.55 }}
            className="max-w-4xl"
          >
            <Link
              to="/services"
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/40 bg-black/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-black/20"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Services
            </Link>

            <span className="mb-4 block text-sm font-bold uppercase tracking-[0.24em] text-crystal-200">
              Flexible household support
            </span>

            <h1 className="max-w-3xl font-display text-4xl font-bold leading-tight text-white drop-shadow-sm sm:text-5xl md:text-6xl">
              Professional Maid Services in Dubai
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-7 text-white drop-shadow-sm sm:text-lg">
              Managing a clean and organized home takes time, energy, and
              consistent attention. Our professional maid services in Dubai
              provide flexible household cleaning support for apartments,
              villas, townhouses, penthouses, and holiday homes. Whether you
              need a maid for a few hours, a weekly home-cleaning appointment,
              or recurring housekeeping, our service can be arranged around
              your schedule.
            </p>

            <button
              type="button"
              onClick={scrollToPicker}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-crystal-500 px-6 py-3.5 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-crystal-600"
            >
              <CalendarCheck className="h-5 w-5" />
              Book a Maid
            </button>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container mx-auto max-w-6xl px-5 sm:px-6">
          <motion.div {...animation} className="mx-auto max-w-4xl text-center">
            <SectionEyebrow>Built around your routine</SectionEyebrow>
            <h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">
              Flexible Maid and Housekeeping Services
            </h2>
            <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg">
              Every household has a different schedule, layout, and cleaning
              routine. Rather than providing an identical service to every
              customer, we allow you to customize the service according to:
            </p>
          </motion.div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {customizationOptions.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4"
              >
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-crystal-500" />
                <span className="text-sm font-medium leading-6 text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="container mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {serviceTypes.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.article
                  key={service.title}
                  {...animation}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.4,
                    delay: prefersReducedMotion ? 0 : index * 0.06,
                  }}
                  className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-crystal-200 hover:shadow-xl"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-crystal-100 text-crystal-600">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-gray-900">{service.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-gray-600">{service.desc}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container mx-auto grid max-w-6xl gap-8 px-5 sm:px-6 md:grid-cols-2">
          <PropertyCard
            icon={Building}
            title="Apartment Maid Services"
            paragraphs={[
              "We provide maid services for studios, 1 to 4-bedroom apartments, duplexes, penthouses, and serviced apartments. Cleaning includes routine care for bedrooms, living areas, bathrooms, kitchens, and balconies.",
              "Customers should provide necessary building access approvals, visitor registration, parking instructions, and service-elevator details to avoid delays.",
            ]}
          />
          <PropertyCard
            icon={Home}
            title="Villa Maid Services"
            paragraphs={[
              "Villas normally require more time due to multiple bedrooms, several bathrooms, large kitchens, staircases, and outdoor patios. Depending on size, we may recommend a longer appointment or multiple cleaners.",
              "Routine maid service does not automatically include garden maintenance, swimming-pool cleaning, or exterior pressure washing.",
            ]}
          />
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="container mx-auto max-w-6xl px-5 sm:px-6">
          <motion.div {...animation} className="text-center">
            <SectionEyebrow>Room-by-room coverage</SectionEyebrow>
            <h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">
              What Is Included in Maid Services?
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-gray-600 sm:text-lg">
              The following tasks may be completed during a standard
              maid-service appointment, depending on the booked time and
              customer priorities.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {roomChecklists.map((room) => (
              <article
                key={room.title}
                className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm"
              >
                <h3 className="text-xl font-bold text-gray-900">{room.title}</h3>
                <ul className="mt-6 space-y-3">
                  {room.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-6 text-gray-700">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-crystal-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container mx-auto grid max-w-6xl gap-6 px-5 sm:px-6 md:grid-cols-2">
          <FeaturePanel
            icon={WashingMachine}
            title="Laundry & Ironing"
            body={[
              "Where agreed, a maid may help with sorting clothing, loading the washing machine, hanging clothes to dry, and folding laundry.",
              "Ironing may be included as a priority task. Customers should provide:",
            ]}
            bullets={[
              "A functioning iron and safe ironing board",
              "Hangers and clear garment instructions",
              "A designated place for finished clothing",
            ]}
            bulletIcon={Shirt}
          />
          <FeaturePanel
            icon={SprayCan}
            title="Materials Options"
            body={[
              "Customers may choose a package that includes standard cleaning materials and tools, or request the cleaner to use supplies already available in the home.",
              "With Materials: We provide multipurpose cleaner, glass cleaner, bathroom cleaner, microfiber cloths, mop, and vacuum where included.",
              "Special products for marble, wood, or delicate surfaces may not be included in a standard kit.",
            ]}
          />
        </div>
      </section>

      <section id="booking-picker" className="scroll-mt-24 bg-gray-950 py-20">
        <div className="container mx-auto grid max-w-6xl gap-8 px-5 sm:px-6 lg:grid-cols-[1.35fr_0.65fr]">
          <motion.div {...animation} className="rounded-[2rem] bg-white p-6 sm:p-8">
            <SectionEyebrow>Build your booking</SectionEyebrow>
            <h2 className="font-display text-3xl font-bold text-gray-900">
              Book Your Maid Service
            </h2>
            <p className="mt-4 text-gray-600">
              Select the number of hours and cleaners required. Minimum booking is 2 hours.
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
                <ChoiceButton
                  selected={materials}
                  onClick={() => setMaterials(true)}
                  label="Yes, Bring Materials"
                />
                <ChoiceButton
                  selected={!materials}
                  onClick={() => setMaterials(false)}
                  label="No, I Have Them"
                />
              </div>
            </fieldset>
          </motion.div>

          <motion.aside {...animation}>
            <div className="sticky top-24 rounded-[2rem] border border-white/10 bg-white/10 p-6 text-white backdrop-blur-xl">
              <Sparkles className="h-7 w-7 text-crystal-300" />
              <h3 className="mt-5 text-2xl font-bold">Booking Summary</h3>

              <dl className="mt-6 space-y-3 text-sm">
                <SummaryRow label="Rate" value={`${ratePerHour} AED/hour`} />
                <SummaryRow label="Hours" value={`${hours}`} />
                <SummaryRow label="Cleaners" value={`${crew}`} />
                <SummaryRow label="Service" value={`${serviceSubtotal} AED`} />
                <SummaryRow
                  label="Materials"
                  value={materials ? "+20 AED" : "Not included"}
                />
              </dl>

              <div className="mt-6 border-t border-white/10 pt-6">
                <div className="flex items-end justify-between gap-4">
                  <span className="text-sm text-gray-300">Estimated total</span>
                  <span className="text-3xl font-bold text-crystal-300">
                    {totalAmount} AED
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={added}
                className={`mt-7 flex w-full items-center justify-center gap-2 rounded-xl py-4 font-bold transition ${
                  added
                    ? "cursor-default bg-emerald-500 text-white"
                    : "bg-crystal-500 text-white hover:bg-crystal-600"
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

      <section className="bg-gray-50 py-20">
        <div className="container mx-auto grid max-w-6xl gap-10 px-5 sm:px-6 lg:grid-cols-2">
          <div>
            <SectionEyebrow>Six clear stages</SectionEyebrow>
            <h2 className="font-display text-3xl font-bold text-gray-900">
              Our Booking Process
            </h2>
            <div className="mt-8 space-y-4">
              {processSteps.map((step, index) => (
                <article
                  key={step.title}
                  className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-crystal-500 text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-bold text-gray-900">{step.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-gray-600">{step.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div>
            <SectionEyebrow>Clear service boundaries</SectionEyebrow>
            <h2 className="font-display text-3xl font-bold text-gray-900">
              Important Service Limitations
            </h2>
            <p className="mt-5 leading-7 text-gray-600">
              Unless specifically agreed and legally available, routine maid
              service may not include:
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {limitations.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-red-100 bg-white p-3"
                >
                  <XCircle className="h-4 w-4 shrink-0 text-red-500" />
                  <span className="text-xs font-semibold leading-5 text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5 text-sm leading-6 text-blue-800">
              For intensive detail, book our{" "}
              <Link to="/deep-cleaning-services-dubai" className="font-bold underline">
                Deep Cleaning
              </Link>
              . For upholstery, book{" "}
              <Link to="/furniture-cleaning-dubai" className="font-bold underline">
                Furniture Cleaning
              </Link>
              . For childcare, book our{" "}
              <Link to="/babysitting-services-dubai" className="font-bold underline">
                Babysitting Services
              </Link>
              .
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container mx-auto max-w-5xl px-5 text-center sm:px-6">
          <motion.div {...animation}>
            <SectionEyebrow>Service coverage</SectionEyebrow>
            <h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">
              Maid Services Near You in Dubai
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-gray-600 sm:text-lg">
              Subject to booking availability, we serve customers in communities including:
            </p>
          </motion.div>

          <div className="mt-9 flex flex-wrap justify-center gap-2.5">
            {areasServed.map((area) => (
              <span
                key={area}
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700"
              >
                <MapPin className="h-3.5 w-3.5 text-crystal-500" />
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="container mx-auto max-w-3xl px-5 sm:px-6">
          <motion.div {...animation} className="text-center">
            <SectionEyebrow>Helpful answers</SectionEyebrow>
            <h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">
              Maid Services Dubai FAQs
            </h2>
          </motion.div>

          <div className="mt-10 space-y-3">
            {faqs.map((faq, index) => {
              const open = openFaq === index;
              const panelId = `maid-faq-panel-${index}`;
              const buttonId = `maid-faq-button-${index}`;

              return (
                <article
                  key={faq.q}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
                >
                  <button
                    id={buttonId}
                    type="button"
                    onClick={() => setOpenFaq(open ? null : index)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left font-semibold text-gray-900 transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-crystal-500"
                    aria-expanded={open}
                    aria-controls={panelId}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-crystal-500 transition-transform ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={
                          prefersReducedMotion
                            ? { opacity: 1 }
                            : { height: 0, opacity: 0 }
                        }
                        animate={{ height: "auto", opacity: 1 }}
                        exit={
                          prefersReducedMotion
                            ? { opacity: 0 }
                            : { height: 0, opacity: 0 }
                        }
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

      <RelatedServices intro="Choose a broader home-cleaning plan, or combine household help with childcare when your family needs both." services={[
        { title: "Residential Cleaning", description: "Explore structured cleaning for apartments, villas, and recurring household schedules.", to: "/residential-cleaning-services-dubai", linkText: "Visit residential cleaning" },
        { title: "Babysitting Maid Services", description: "Arrange combined childcare and light household support through one suitable service.", to: "/babysitting-maid-services-dubai", linkText: "Visit babysitting maid services" },
      ]} />

      <section className="bg-white px-5 py-10 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-crystal-600 via-crystal-700 to-gray-950 px-6 py-12 text-center shadow-2xl sm:px-10 md:py-16">
            <Home className="absolute -bottom-16 -right-10 h-64 w-64 rotate-12 text-white/[0.05]" />
            <div className="relative mx-auto max-w-3xl">
              <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
                Need Reliable Home-Cleaning Help in Dubai?
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-crystal-100 sm:text-lg">
                Book flexible hourly, weekly, or part-time maid services for
                your apartment or villa. Spend less time cleaning and more time
                on what matters.
              </p>
              <button
                type="button"
                onClick={scrollToPicker}
                className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 font-bold text-crystal-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-crystal-50"
              >
                Book a Maid Service
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionEyebrow({ children }) {
  return (
    <span className="mb-3 block text-xs font-bold uppercase tracking-[0.22em] text-crystal-600">
      {children}
    </span>
  );
}

function PropertyCard({ icon: Icon, title, paragraphs }) {
  return (
    <article className="rounded-3xl border border-gray-100 bg-gray-50 p-7">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-crystal-100 text-crystal-600">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="mt-6 text-2xl font-bold text-gray-900">{title}</h3>
      {paragraphs.map((paragraph) => (
        <p key={paragraph} className="mt-4 leading-7 text-gray-600">
          {paragraph}
        </p>
      ))}
    </article>
  );
}

function FeaturePanel({ icon: Icon, title, body, bullets = [], bulletIcon: BulletIcon }) {
  return (
    <article className="rounded-3xl border border-gray-100 bg-gray-50 p-7">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-crystal-100 text-crystal-600">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
      </div>

      {body.map((paragraph) => (
        <p key={paragraph} className="mt-4 leading-7 text-gray-600">
          {paragraph}
        </p>
      ))}

      {bullets.length > 0 && (
        <ul className="mt-5 space-y-3">
          {bullets.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
              {BulletIcon ? (
                <BulletIcon className="mt-0.5 h-4 w-4 shrink-0 text-crystal-500" />
              ) : (
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-crystal-500" />
              )}
              {item}
            </li>
          ))}
        </ul>
      )}
    </article>
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

function ChoiceButton({ selected, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`rounded-xl border-2 p-3 text-sm font-bold transition ${
        selected
          ? "border-crystal-500 bg-crystal-50 text-crystal-700"
          : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
      }`}
    >
      {label}
    </button>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-gray-300">{label}</dt>
      <dd className="font-semibold text-white">{value}</dd>
    </div>
  );
}
