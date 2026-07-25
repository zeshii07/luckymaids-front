import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  Baby,
  CalendarCheck,
  CheckCircle,
  ChevronDown,
  Clock,
  Heart,
  Hotel,
  MapPin,
  Minus,
  Moon,
  PartyPopper,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Sun,
  UserCheck,
  XCircle,
} from "lucide-react";
import { useCart } from "../../context/CartContext";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1800&q=82";

const useCases = [
  "Childcare during working hours",
  "Support while working from home",
  "Evening babysitting",
  "Weekend childcare",
  "Care during appointments",
  "Help during family events",
  "Child supervision at a hotel",
  "Support during school holidays",
  "Temporary assistance when a regular nanny is unavailable",
  "Extra help when caring for more than one child",
  "Assistance while settling into Dubai",
  "Recurring part-time childcare",
  "A parent helper while a parent remains at home",
];

const careOptions = [
  { icon: Clock, title: "Hourly & Part-Time", desc: "Ideal for parents who need childcare for a defined period, regular assistance, or recurring weekly support." },
  { icon: Sun, title: "Daytime Care", desc: "Support during morning or afternoon hours, including play, feeding routines, and homework monitoring." },
  { icon: Moon, title: "Evening & Weekend", desc: "Flexible childcare for dinners, events, appointments, or weekend commitments." },
  { icon: Baby, title: "Infants & Toddlers", desc: "Caregivers matched with suitable experience for baby routines, diaper changing, and active toddler supervision." },
];

const specialistOptions = [
  { icon: Hotel, title: "Hotel Babysitting", desc: "Families visiting Dubai may need childcare while attending business meetings, weddings, or events. Hotel babysitting is provided in your room or approved location, subject to hotel policies." },
  { icon: PartyPopper, title: "Event Babysitting", desc: "Childcare for weddings, parties, and corporate events. We help plan designated spaces, check-in procedures, and appropriate caregiver-to-child ratios for safe event care." },
  { icon: Heart, title: "Parent Helper", desc: "An extra pair of hands while you remain at home. Perfect for working from home, caring for a newborn, hosting guests, or managing household tasks while children are supervised." },
];

const bookingProcess = [
  { title: "Tell Us About Your Childcare Needs", desc: "Provide accurate information about the number of children, ages, location, date, time, required activities, feeding needs, allergies, and preferred caregiver experience." },
  { title: "Review Caregiver Availability", desc: "We review available caregivers according to your requested date, hours, location, child age, required experience, and duties." },
  { title: "Confirm the Service Details", desc: "Review the booking date, time, address, number of children, agreed duties, total price, minimum hours, and cancellation terms before final confirmation." },
  { title: "Provide a Family Care Brief", desc: "Prepare a written or digital care brief containing parent contacts, child details, allergies, medical considerations, meal instructions, and bedtime routines." },
  { title: "Meet the Babysitter", desc: "Allow enough time to introduce the caregiver, show important rooms, explain routines, point out emergency exits, and discuss food and allergies." },
  { title: "Stay Contactable", desc: "Parents should remain reachable throughout the booking. Nominate a trusted adult who can make decisions in an emergency if you cannot answer directly." },
];

const includedDuties = [
  "Child supervision", "Age-appropriate play", "Reading", "Serving prepared food",
  "Basic meal preparation for children", "Bottle feeding according to instructions",
  "Diaper changing", "Nap supervision", "Bedtime routines", "Homework monitoring",
  "Organizing children’s toys", "Cleaning up after child-related activities", "Sharing updates with parents",
];

const excludedDuties = [
  "General house cleaning", "Full-family meal preparation", "Driving children", "School transportation",
  "Swimming supervision", "Taking children to public locations", "Giving medication", "Medical care",
  "Nursing duties", "Overnight stays", "Pet care", "Shopping", "Tutoring",
  "Laundry for the whole household", "Care for unregistered additional children",
];

const whyChooseUs = [
  { icon: UserCheck, title: "Care Matched to Your Requirements", desc: "We consider the child’s age, booking schedule, location, and requested duties when reviewing caregiver availability." },
  { icon: CheckCircle, title: "Clear Booking Information", desc: "We confirm the agreed hours, location, number of children, requested responsibilities, and price before the appointment." },
  { icon: Clock, title: "Flexible Childcare Options", desc: "Subject to availability, families may request hourly, daytime, evening, weekend, recurring, hotel, and event babysitting." },
  { icon: Heart, title: "Child-Focused Support", desc: "The caregiver’s primary responsibility during the booking is the care and supervision of the registered child or children." },
  { icon: Hotel, title: "Residential and Visitor Services", desc: "We assist Dubai residents as well as families staying in hotels, serviced apartments, and holiday homes." },
  { icon: ShieldCheck, title: "Customer Support", desc: "Customers receive a company contact for booking questions, changes, or service concerns according to our operating hours." },
];

const areasServed = [
  "Downtown Dubai", "Business Bay", "Dubai Marina", "Jumeirah Beach Residence", "Jumeirah Lake Towers",
  "Palm Jumeirah", "Dubai Harbour", "Bluewaters Island", "Jumeirah", "Umm Suqeim", "Al Safa",
  "Al Wasl", "Al Barsha", "Barsha Heights", "Dubai Hills Estate", "Arabian Ranches", "Emirates Hills",
  "The Springs", "The Meadows", "The Lakes", "The Greens", "The Views", "Jumeirah Village Circle",
  "Jumeirah Village Triangle", "Dubai Sports City", "Motor City", "Damac Hills", "Mudon",
  "Town Square Dubai", "Tilal Al Ghaf", "Dubai Silicon Oasis", "Mirdif", "Nad Al Sheba", "Meydan",
  "Mohammed Bin Rashid City", "Dubai Creek Harbour", "Dubai Festival City", "Al Furjan",
  "Discovery Gardens", "The Gardens", "Dubai South", "Deira", "Bur Dubai", "Al Karama", "Al Nahda",
];

const faqs = [
  { q: "What is included in a babysitting service?", a: "Babysitting normally includes child supervision and agreed child-related duties such as playtime, feeding assistance, nap monitoring, bedtime routines, and cleaning up after children’s activities. Exact duties should be confirmed before booking." },
  { q: "Can I book a babysitter by the hour?", a: "Hourly babysitting may be available, usually with a minimum booking duration. The minimum hours should be confirmed when requesting a quote." },
  { q: "Do you offer part-time babysitters?", a: "Part-time or recurring childcare may be available for selected days and hours, subject to caregiver schedules and the company’s service model." },
  { q: "Can I request the same babysitter again?", a: "You may request a previous caregiver, but availability cannot always be guaranteed unless a recurring arrangement is formally confirmed." },
  { q: "Do you provide babysitters for babies?", a: "Infant babysitting may be available when a caregiver with suitable stated experience is available. Parents must disclose the baby’s age and complete care requirements before booking." },
  { q: "Do you provide newborn care?", a: "Basic newborn support may be available through suitably experienced caregivers, but babysitting is not a substitute for maternity nursing or medical newborn care." },
  { q: "Can the babysitter feed my child?", a: "A babysitter may serve prepared meals or assist with feeding according to written parental instructions and the confirmed service scope." },
  { q: "Can the babysitter give medicine?", a: "Medication assistance is subject to company policy, written parental authorization, clear instructions, and the nature of the medication. Medical care is not included in standard babysitting." },
  { q: "Can the babysitter take my child swimming?", a: "Swimming supervision is not automatically included and may be excluded entirely because it requires additional risk assessment and specific caregiver suitability." },
  { q: "Can the babysitter take my child outside?", a: "Trips outside the home should only take place when expressly authorized and included in the booking. The location, transportation, contact arrangements, and permissions must be clear." },
  { q: "Do you provide hotel babysitting?", a: "Hotel babysitting may be available subject to caregiver availability, hotel visitor policies, and complete booking information." },
  { q: "Can tourists book a babysitter?", a: "Yes, where the company offers visitor services. Tourists should provide hotel or accommodation details, local contact information, and complete childcare instructions." },
  { q: "Do you provide overnight babysitting?", a: "Overnight care may be offered as a separate service, subject to availability, caregiver suitability, pricing, accommodation arrangements, and company policy." },
  { q: "Can I book a babysitter for a wedding?", a: "Event babysitting may be arranged for weddings and private functions. Larger numbers of children may require multiple caregivers and a designated childcare area." },
  { q: "How far in advance should I book?", a: "Advance booking is recommended, especially for evenings, weekends, public holidays, recurring care, and major events." },
  { q: "Is same-day babysitting available?", a: "Same-day service may be available, but it depends on caregiver availability, location, booking duration, and childcare requirements." },
  { q: "What information do I need to provide?", a: "You should provide the child’s age, number of children, address, date, hours, care routine, allergies, medical considerations, pets, and requested duties." },
  { q: "Do I need to stay at home?", a: "No, unless the service is booked as parent-helper support. Parents leaving the property must remain contactable and provide a backup emergency contact." },
  { q: "Can a babysitter also clean my home?", a: "General housekeeping is not automatically part of babysitting. The caregiver’s attention should remain focused on the child. Separate maid or cleaning services should be booked when required." },
  { q: "What happens if I return late?", a: "Contact the company or caregiver as early as possible. Extensions depend on caregiver availability and may involve additional charges." },
  { q: "What happens if my child becomes unwell?", a: "The caregiver should contact the parent and follow the agreed emergency instructions. Babysitters cannot provide clinical diagnosis or replace qualified medical care." },
  { q: "Can I interview the babysitter?", a: "Introductory calls or interviews may be possible for recurring arrangements, depending on company policy and caregiver availability." },
  { q: "Are babysitters background checked?", a: "Only state this when the company has a documented verification process. The company should explain exactly which identity, reference, employment, or background checks it conducts." },
  { q: "Are babysitters first-aid trained?", a: "First-aid training should only be advertised for caregivers whose current training has been verified. Parents may request details before confirming the service." },
];

const reveal = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

export default function Babysitting() {
  const { addToCart } = useCart();
  const prefersReducedMotion = useReducedMotion();
  const timeoutRef = useRef(null);
  const [hours, setHours] = useState(2);
  const [crew, setCrew] = useState(1);
  const [added, setAdded] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
  }, []);

  const ratePerHour = useMemo(() => {
    if (hours === 2) return 50;
    if (hours === 3) return 45;
    return 40;
  }, [hours]);

  const totalAmount = hours * crew * ratePerHour;
  const animation = {
    initial: prefersReducedMotion ? false : "hidden",
    whileInView: "visible",
    viewport: { once: true, amount: 0.15 },
    variants: reveal,
    transition: { duration: prefersReducedMotion ? 0 : 0.45 },
  };

  const handleAddToCart = () => {
    addToCart({
      id: `babysitting-${hours}-${crew}`,
      service: "Babysitting Services",
      hours,
      crew,
      ratePerHour,
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
        <title>Babysitting Services Dubai | Hourly Childcare Support</title>
        <meta name="description" content="Book babysitting services in Dubai for hourly, daytime, evening, weekend, hotel, and event childcare. Request support matched to your family’s schedule and needs." />
      </Helmet>

      <section className="relative isolate min-h-[650px] overflow-hidden bg-gray-950">
        <img src={HERO_IMAGE} alt="Professional babysitting services in Dubai" className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" decoding="async" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/85 to-indigo-950/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-gray-950/20" />
        <div className="container relative mx-auto flex min-h-[650px] items-end px-5 pb-14 pt-28 sm:px-6 md:items-center md:pb-20">
          <motion.div initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: prefersReducedMotion ? 0 : 0.55 }} className="max-w-4xl">
            <Link to="/services" className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-indigo-100 backdrop-blur transition hover:bg-white/15">
              <ArrowLeft className="h-4 w-4" /> Back to Services
            </Link>
            <span className="mb-4 block text-sm font-bold uppercase tracking-[0.24em] text-indigo-300">Flexible family support</span>
            <h1 className="max-w-3xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">Professional Babysitting Services in Dubai</h1>
            <p className="mt-6 max-w-3xl text-base leading-7 text-gray-200 sm:text-lg">Finding dependable childcare is one of the most important decisions a parent can make. Whether you need a few hours of support during a busy day, regular assistance while working, childcare during an appointment, or an extra pair of hands at home, our professional babysitting services in Dubai are designed around your family’s routine, preferences, and childcare requirements.</p>
            <button type="button" onClick={scrollToPicker} className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-indigo-500 px-6 py-3.5 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-indigo-600">
              <CalendarCheck className="h-5 w-5" /> Book a Babysitter
            </button>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container mx-auto max-w-6xl px-5 sm:px-6">
          <motion.div {...animation} className="mx-auto max-w-4xl text-center">
            <SectionEyebrow>Support when families need it</SectionEyebrow>
            <h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">Dependable Childcare Support for Dubai Families</h2>
            <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg">Modern family schedules can be demanding. Professional babysitting provides flexible support without requiring every family to commit immediately to a full-time childcare arrangement. Our babysitting service may be suitable when you need:</p>
          </motion.div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((item) => <div key={item} className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4"><CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-indigo-500" /><span className="text-sm font-medium leading-6 text-gray-700">{item}</span></div>)}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="container mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {careOptions.map((option, index) => {
              const Icon = option.icon;
              return <motion.article key={option.title} {...animation} transition={{ duration: prefersReducedMotion ? 0 : 0.4, delay: prefersReducedMotion ? 0 : index * 0.05 }} className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600"><Icon className="h-7 w-7" /></div><h3 className="mt-6 text-xl font-bold text-gray-900">{option.title}</h3><p className="mt-3 text-sm leading-6 text-gray-600">{option.desc}</p></motion.article>;
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container mx-auto grid max-w-6xl gap-6 px-5 sm:px-6 md:grid-cols-3">
          {specialistOptions.map((option) => {
            const Icon = option.icon;
            return <article key={option.title} className="rounded-3xl border border-gray-100 bg-gray-50 p-7"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600"><Icon className="h-7 w-7" /></div><h3 className="mt-6 text-2xl font-bold text-gray-900">{option.title}</h3><p className="mt-4 text-sm leading-7 text-gray-600">{option.desc}</p></article>;
          })}
        </div>
      </section>

      <section id="booking-picker" className="scroll-mt-24 bg-gray-950 py-20">
        <div className="container mx-auto grid max-w-6xl gap-8 px-5 sm:px-6 lg:grid-cols-[1.35fr_0.65fr]">
          <motion.div {...animation} className="rounded-[2rem] bg-white p-6 sm:p-8">
            <SectionEyebrow>Build your booking</SectionEyebrow>
            <h2 className="font-display text-3xl font-bold text-gray-900">Book Your Babysitter</h2>
            <p className="mt-4 text-gray-600">Select the number of hours and babysitters required. Minimum booking is 2 hours.</p>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <CounterControl label="Hours" help="Minimum 2, maximum 8" value={`${hours} Hours`} onDecrease={() => setHours((v) => Math.max(2, v - 1))} onIncrease={() => setHours((v) => Math.min(8, v + 1))} decreaseDisabled={hours === 2} increaseDisabled={hours === 8} />
              <CounterControl label="Babysitters" help="Maximum 5" value={`${crew} Sitter${crew > 1 ? "s" : ""}`} onDecrease={() => setCrew((v) => Math.max(1, v - 1))} onIncrease={() => setCrew((v) => Math.min(5, v + 1))} decreaseDisabled={crew === 1} increaseDisabled={crew === 5} />
            </div>
            <div className="mt-7 rounded-2xl border border-indigo-100 bg-indigo-50 p-5"><p className="text-sm font-bold text-indigo-900">Before confirming</p><p className="mt-2 text-sm leading-6 text-indigo-800">Please share the children’s ages, number of children, allergies, routine, exact duties, location, and emergency contact details during checkout or when the team contacts you.</p></div>
          </motion.div>

          <motion.aside {...animation}>
            <div className="sticky top-24 rounded-[2rem] border border-white/10 bg-white/10 p-6 text-white backdrop-blur-xl">
              <Baby className="h-7 w-7 text-indigo-300" />
              <h3 className="mt-5 text-2xl font-bold">Booking Summary</h3>
              <dl className="mt-6 space-y-3 text-sm"><SummaryRow label="Rate" value={`${ratePerHour} AED/hour`} /><SummaryRow label="Hours" value={`${hours}`} /><SummaryRow label="Babysitters" value={`${crew}`} /><SummaryRow label="Calculation" value={`${hours} × ${crew} × ${ratePerHour}`} /></dl>
              <div className="mt-6 border-t border-white/10 pt-6"><div className="flex items-end justify-between gap-4"><span className="text-sm text-gray-300">Estimated total</span><span className="text-3xl font-bold text-indigo-300">{totalAmount} AED</span></div></div>
              <button type="button" onClick={handleAddToCart} disabled={added} className={`mt-7 flex w-full items-center justify-center gap-2 rounded-xl py-4 font-bold transition ${added ? "cursor-default bg-emerald-500" : "bg-indigo-500 hover:bg-indigo-600"}`}>
                {added ? <><CheckCircle className="h-5 w-5" /> Added to Cart</> : <><ShoppingCart className="h-5 w-5" /> Add to Cart</>}
              </button>
            </div>
          </motion.aside>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="container mx-auto max-w-6xl px-5 sm:px-6">
          <motion.div {...animation} className="text-center"><SectionEyebrow>Six clear stages</SectionEyebrow><h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">Our Babysitting Booking Process</h2></motion.div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {bookingProcess.map((step, index) => <article key={step.title} className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 font-bold text-white">{index + 1}</span><h3 className="mt-5 text-lg font-bold text-gray-900">{step.title}</h3><p className="mt-3 text-sm leading-6 text-gray-600">{step.desc}</p></article>)}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container mx-auto grid max-w-6xl gap-10 px-5 sm:px-6 lg:grid-cols-2">
          <DutyPanel title="What May Be Included" items={includedDuties} included />
          <DutyPanel title="What Is Not Automatically Included" items={excludedDuties} />
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="container mx-auto max-w-6xl px-5 sm:px-6">
          <motion.div {...animation} className="text-center"><SectionEyebrow>Why families choose us</SectionEyebrow><h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">Why Choose Our Babysitting Services?</h2></motion.div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((point) => { const Icon = point.icon; return <article key={point.title} className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600"><Icon className="h-7 w-7" /></div><h3 className="mt-6 text-xl font-bold text-gray-900">{point.title}</h3><p className="mt-3 text-sm leading-6 text-gray-600">{point.desc}</p></article>; })}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container mx-auto max-w-5xl px-5 text-center sm:px-6">
          <motion.div {...animation}><SectionEyebrow>Service coverage</SectionEyebrow><h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">Babysitters Near You in Dubai</h2><p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-gray-600 sm:text-lg">Subject to caregiver availability, we serve families in communities including:</p></motion.div>
          <div className="mt-9 flex flex-wrap justify-center gap-2.5">{areasServed.map((area) => <span key={area} className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700"><MapPin className="h-3.5 w-3.5 text-indigo-500" />{area}</span>)}</div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="container mx-auto max-w-3xl px-5 sm:px-6">
          <motion.div {...animation} className="text-center"><SectionEyebrow>Helpful answers</SectionEyebrow><h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">Babysitting Services Dubai FAQs</h2></motion.div>
          <div className="mt-10 space-y-3">
            {faqs.map((faq, index) => {
              const open = openFaq === index;
              const panelId = `babysitting-faq-panel-${index}`;
              const buttonId = `babysitting-faq-button-${index}`;
              return <article key={faq.q} className="overflow-hidden rounded-2xl border border-gray-200 bg-white"><button id={buttonId} type="button" onClick={() => setOpenFaq(open ? null : index)} className="flex w-full items-center justify-between gap-4 p-5 text-left font-semibold text-gray-900 transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500" aria-expanded={open} aria-controls={panelId}><span>{faq.q}</span><ChevronDown className={`h-5 w-5 shrink-0 text-indigo-500 transition-transform ${open ? "rotate-180" : ""}`} /></button><AnimatePresence initial={false}>{open && <motion.div id={panelId} role="region" aria-labelledby={buttonId} initial={prefersReducedMotion ? { opacity: 1 } : { height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }} transition={{ duration: prefersReducedMotion ? 0 : 0.2 }} className="overflow-hidden"><p className="px-5 pb-5 text-sm leading-6 text-gray-600">{faq.a}</p></motion.div>}</AnimatePresence></article>;
            })}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-10 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-600 via-indigo-700 to-gray-950 px-6 py-12 text-center shadow-2xl sm:px-10 md:py-16">
            <Sparkles className="absolute -bottom-16 -right-10 h-64 w-64 rotate-12 text-white/[0.05]" />
            <div className="relative mx-auto max-w-3xl"><h2 className="font-display text-3xl font-bold text-white md:text-4xl">Need a Dependable Babysitter in Dubai?</h2><p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-indigo-100 sm:text-lg">Tell us your schedule, location, and children’s ages, and our team will help you arrange suitable childcare support.</p><button type="button" onClick={scrollToPicker} className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 font-bold text-indigo-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-indigo-50">Book a Babysitter</button></div>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionEyebrow({ children }) {
  return <span className="mb-3 block text-xs font-bold uppercase tracking-[0.22em] text-indigo-600">{children}</span>;
}

function CounterControl({ label, help, value, onDecrease, onIncrease, decreaseDisabled, increaseDisabled }) {
  return <div><div className="mb-2"><p className="text-sm font-bold text-gray-800">{label}</p><p className="text-xs text-gray-500">{help}</p></div><div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 p-3"><button type="button" onClick={onDecrease} disabled={decreaseDisabled} className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-gray-700 shadow-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40" aria-label={`Decrease ${label.toLowerCase()}`}><Minus className="h-4 w-4" /></button><span className="font-bold text-gray-900">{value}</span><button type="button" onClick={onIncrease} disabled={increaseDisabled} className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-gray-700 shadow-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40" aria-label={`Increase ${label.toLowerCase()}`}><Plus className="h-4 w-4" /></button></div></div>;
}

function SummaryRow({ label, value }) {
  return <div className="flex items-center justify-between gap-4"><dt className="text-gray-300">{label}</dt><dd className="text-right font-semibold text-white">{value}</dd></div>;
}

function DutyPanel({ title, items, included = false }) {
  return <article><SectionEyebrow>{included ? "Agreed child-related care" : "Separate or excluded work"}</SectionEyebrow><h2 className="font-display text-3xl font-bold text-gray-900">{title}</h2><div className="mt-7 grid gap-3 sm:grid-cols-2">{items.map((item) => <div key={item} className={`flex items-start gap-3 rounded-xl border p-3 ${included ? "border-emerald-100 bg-emerald-50" : "border-red-100 bg-red-50"}`}>{included ? <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" /> : <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />}<span className="text-xs font-semibold leading-5 text-gray-700">{item}</span></div>)}</div></article>;
}