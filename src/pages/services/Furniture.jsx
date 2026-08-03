import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  BedDouble,
  Building,
  CheckCircle,
  ChevronDown,
  Clock,
  Droplets,
  Eye,
  MapPin,
  Ruler,
  Search,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Sofa,
  SprayCan,
  Tag,
  UserCheck,
  Wind,
  XCircle,
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import RelatedServices from "../../components/RelatedServices";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1800&q=85";

const sofaPackages = [
  { id: "sofa1", name: "1 Seater Sofa", price: 80, original: 100 },
  { id: "sofa2", name: "2 Seater Sofa", price: 120, original: 150 },
  { id: "sofa3", name: "3 Seater Sofa", price: 160, original: 200 },
  { id: "sofa4", name: "4 Seater Sofa", price: 200, original: 250 },
  { id: "sofa5", name: "5 Seater Sofa (L-Shape)", price: 250, original: 300 },
];

const mattressPackages = [
  { id: "mat1", name: "Single / Twin Mattress", price: 100, original: 130 },
  { id: "mat2", name: "Double / Full Mattress", price: 120, original: 150 },
  { id: "mat3", name: "Queen Size Mattress", price: 140, original: 180 },
  { id: "mat4", name: "King Size Mattress", price: 160, original: 200 },
];

const carpetPackages = [
  { id: "carp1", name: "Small Carpet (Up to 2x2 m)", price: 100, original: 130 },
  { id: "carp2", name: "Medium Carpet (Up to 3x4 m)", price: 150, original: 190 },
  { id: "carp3", name: "Large Carpet (Up to 4x5 m)", price: 200, original: 250 },
  { id: "carp4", name: "Extra Large Carpet (5m+)", price: 250, original: 320 },
];

const specialistCleaning = [
  "Sofas",
  "Mattresses",
  "Upholstered chairs",
  "Dining chairs",
  "Office chairs",
  "Armchairs",
  "Fabric headboards",
  "Carpets",
  "Rugs",
  "Curtains",
  "Fabric panels",
  "Ottomans",
  "Benches",
  "Cushions",
  "Selected leather furniture",
];

const assessmentList = [
  "Furniture material",
  "Fabric color",
  "Fabric condition",
  "Existing damage",
  "Stain type",
  "Level of soiling",
  "Manufacturer care label",
  "Colorfastness",
  "Drying requirements",
  "Cleaning accessibility",
  "Age of the furniture",
  "Previous cleaning attempts",
];

const methodsList = [
  "Dry vacuuming",
  "Fabric pre-treatment",
  "Spot treatment",
  "Shampoo cleaning",
  "Hot-water extraction",
  "Steam-assisted cleaning",
  "Low-moisture cleaning",
  "Manual upholstery cleaning",
  "Deodorizing",
  "Surface sanitization",
  "Controlled drying",
];

const benefitsList = [
  "Remove accumulated surface dirt",
  "Lift many common stains",
  "Reduce unpleasant odors",
  "Refresh fabric colors",
  "Remove pet hair",
  "Reduce trapped dust",
  "Improve the overall appearance of furniture",
  "Maintain a cleaner indoor environment",
  "Extend the usable life of suitable furniture",
  "Improve presentation before guests, tenants, or customers arrive",
];

const sofaTypes = [
  "Fabric sofas",
  "Sectional sofas",
  "L-shaped sofas",
  "Three-seater sofas",
  "Two-seater sofas",
  "Single-seater sofas",
  "Sofa beds",
  "Recliner sofas",
  "Modular sofas",
  "Corner sofas",
  "Office reception sofas",
  "Majlis seating",
  "Upholstered benches",
  "Dining benches",
];

const sofaStains = [
  "Tea",
  "Coffee",
  "Juice",
  "Soft drinks",
  "Food spills",
  "Chocolate",
  "Makeup",
  "Body oils",
  "Dust",
  "Mud",
  "Pet accidents",
  "Water marks",
  "General household use",
];

const processSteps = [
  {
    icon: Search,
    title: "Step 1 — Furniture Inspection",
    desc: "Technician checks fabric type, construction, existing damage, loose stitching, color stability, stain condition, areas of heavy use, cleaning-code labels, and moisture sensitivity.",
  },
  {
    icon: Wind,
    title: "Step 2 — Dry Vacuuming",
    desc: "Loose dust, crumbs, hair, and surface particles are removed from accessible areas, cushion edges, seams, corners, armrests, and gaps between sections.",
  },
  {
    icon: Droplets,
    title: "Step 3 — Spot and Stain Pre-Treatment",
    desc: "Visible stains are treated individually using suitable products. Product and contact time depend on fabric type, stain type, stain age, previous chemicals, and colorfastness.",
  },
  {
    icon: SprayCan,
    title: "Step 4 — Fabric Cleaning",
    desc: "The selected cleaning solution is applied using a controlled method (hand cleaning, brushing, shampooing, extraction, low-moisture, or steam-assisted) to loosen soil while minimizing moisture.",
  },
  {
    icon: Eye,
    title: "Step 5 — Extraction",
    desc: "Where suitable, professional extraction equipment removes dirty cleaning solution, loosened residue, excess moisture, and surface soil to improve results and reduce drying time.",
  },
  {
    icon: CheckCircle,
    title: "Step 6 — Final Inspection",
    desc: "After cleaning, the technician reviews treated stains, fabric appearance, moisture level, cleaned sections, remaining permanent marks, and drying requirements.",
  },
  {
    icon: Clock,
    title: "Step 7 — Drying",
    desc: "Furniture should be allowed to dry completely before heavy use. Drying time depends on fabric thickness, cushion filling, room ventilation, humidity, and cleaning method.",
  },
];

const whyChooseUs = [
  {
    icon: UserCheck,
    title: "Trained Upholstery Cleaning Technicians",
    desc: "Our technicians understand that upholstery requires more care than general surface cleaning. They assess the material before selecting a cleaning method.",
  },
  {
    icon: Settings,
    title: "Professional Cleaning Equipment",
    desc: "We use equipment specifically designed for furniture, mattress, carpet, and upholstery cleaning.",
  },
  {
    icon: MapPin,
    title: "On-Site Service",
    desc: "Most cleaning is completed at your home or business, reducing the need to transport heavy furniture.",
  },
  {
    icon: ShieldCheck,
    title: "Customized Cleaning",
    desc: "We tailor the service according to furniture type, quantity, fabric, condition, and stain level.",
  },
  {
    icon: Building,
    title: "Residential and Commercial Experience",
    desc: "We serve private homes, offices, hospitality businesses, restaurants, clinics, and property managers.",
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    desc: "Appointments may be available on weekdays, weekends, and outside standard business hours, subject to team availability.",
  },
];

const limitations = [
  "Fabric tears",
  "Burn marks",
  "Bleach stains",
  "Permanent dye loss",
  "Deep ink stains",
  "Paint",
  "Glue",
  "Rust",
  "Cracked leather",
  "Peeling leather",
  "Broken foam",
  "Loose springs",
  "Damaged frames",
  "Water-damaged internal padding",
  "Severe mold contamination",
  "Pest infestation",
  "Strong odors inside damaged foam",
  "Previous chemical damage",
];

const areasServed = [
  "Downtown Dubai",
  "Business Bay",
  "Dubai Marina",
  "Jumeirah Beach Residence",
  "Jumeirah Lake Towers",
  "Palm Jumeirah",
  "Jumeirah",
  "Umm Suqeim",
  "Al Barsha",
  "Barsha Heights",
  "Jumeirah Village Circle",
  "Jumeirah Village Triangle",
  "Dubai Hills Estate",
  "Arabian Ranches",
  "Emirates Hills",
  "The Springs",
  "The Meadows",
  "The Lakes",
  "Dubai Sports City",
  "Motor City",
  "Damac Hills",
  "Town Square Dubai",
  "Mudon",
  "Dubai Silicon Oasis",
  "International City",
  "Discovery Gardens",
  "The Gardens",
  "Al Furjan",
  "Mirdif",
  "Nad Al Sheba",
  "Meydan",
  "Dubai Creek Harbour",
  "Dubai Festival City",
  "Al Nahda",
  "Deira",
  "Bur Dubai",
  "Al Karama",
  "Dubai South",
];

const faqs = [
  { q: "How often should furniture be professionally cleaned?", a: "Most homes may benefit from professional furniture cleaning every six to twelve months. Homes with children, pets, allergies, frequent guests, or heavy sofa use may require more frequent cleaning." },
  { q: "How long does sofa cleaning take?", a: "Cleaning time depends on sofa size, fabric, number of cushions, stains, and cleaning method. A small sofa may take less time than a large sectional or majlis seating area." },
  { q: "How long does furniture take to dry?", a: "Drying may take several hours. Thick fabric, large cushions, humid weather, and limited ventilation can increase drying time." },
  { q: "Can I sit on the sofa immediately after cleaning?", a: "No. The sofa should dry fully before use to avoid marks, odors, or uneven drying." },
  { q: "Can you remove every stain?", a: "No cleaning company can responsibly guarantee every stain. Results depend on the stain, fabric, age, previous treatment, and existing damage." },
  { q: "Do you clean removable sofa cushions?", a: "Yes, suitable removable cushions can usually be cleaned. Share the total number of cushions when requesting a quotation." },
  { q: "Do you clean leather sofas?", a: "We clean selected leather furniture using suitable products. Leather repair, recoloring, and restoration are separate specialist services." },
  { q: "Is steam cleaning suitable for every sofa?", a: "No. Some fabrics are sensitive to heat or moisture. The technician will select a safer method after inspection." },
  { q: "Can you clean delicate fabrics?", a: "Some delicate fabrics may require specialist dry cleaning or off-site treatment. We assess the material before proceeding." },
  { q: "Do you clean mattresses on both sides?", a: "Both sides may be cleaned when requested, accessible, and suitable. This should be confirmed during booking." },
  { q: "Can mattress cleaning remove odors?", a: "It may reduce many surface-related odors. Deep odors inside foam or damaged material may remain." },
  { q: "Can you clean office chairs in bulk?", a: "Yes. We provide bulk office-chair cleaning for companies, schools, hotels, clinics, and other commercial properties." },
  { q: "Do you move furniture?", a: "Light furniture may be repositioned where safe. Heavy furniture moving is not normally included and may require additional workers or movers." },
  { q: "Are cleaning products safe for children and pets?", a: "We use products selected for professional upholstery cleaning. Children and pets should remain away from the area until the furniture is fully dry." },
  { q: "Do you provide same-day furniture cleaning?", a: "Same-day service may be available depending on location, team schedule, item quantity, and equipment requirements. Advance booking is recommended." },
  { q: "Can I book sofa and mattress cleaning together?", a: "Yes. Multiple furniture items can be included in one booking. Send photographs and quantities for an accurate quotation." },
  { q: "Do you clean carpets and curtains?", a: "Yes, suitable carpets, rugs, and curtains can be cleaned. Delicate materials may require specialist treatment." },
  { q: "Should I vacuum before the appointment?", a: "It is not necessary because dry vacuuming is normally part of the professional process. However, remove personal items and loose objects." },
  { q: "Do you provide services for hotels and restaurants?", a: "Yes. We clean furniture for hotels, restaurants, cafés, offices, clinics, and other businesses." },
  { q: "Can you remove pet hair and pet odors?", a: "Vacuuming and cleaning can remove much of the accessible pet hair and reduce many odors. Deep contamination inside foam may require additional treatment." },
];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Furniture() {
  const { addToCart } = useCart();
  const prefersReducedMotion = useReducedMotion();
  const timeoutRef = useRef(null);
  const [addedId, setAddedId] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(
    () => () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    },
    [],
  );

  const animation = useMemo(
    () => ({
      initial: prefersReducedMotion ? false : "hidden",
      whileInView: "visible",
      viewport: { once: true, amount: 0.15 },
      variants: reveal,
      transition: { duration: prefersReducedMotion ? 0 : 0.45 },
    }),
    [prefersReducedMotion],
  );

  const handleAddPackage = (pkg, category) => {
    addToCart({
      id: pkg.id,
      service: `Furniture Clean: ${pkg.name} (${category})`,
      totalAmount: pkg.price,
      isPackage: true,
      quantity: 1,
    });

    setAddedId(pkg.id);
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setAddedId(null), 1800);
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <div className="min-h-screen overflow-hidden bg-white pb-28 pt-20">
      <Helmet>
        <title>Furniture Cleaning Dubai | Sofa, Mattress & Upholstery</title>
        <meta
          name="description"
          content="Book professional furniture cleaning services in Dubai for sofas, mattresses, chairs, carpets, curtains, and upholstery. Advanced stain, dust, odor, and fabric cleaning for homes and businesses."
        />
      </Helmet>

      <section className="relative isolate min-h-[640px] overflow-hidden bg-pink-50">
        <img
          src={HERO_IMAGE}
          alt="Professional furniture cleaning services in Dubai"
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
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/40 bg-black/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-black/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Services
            </Link>

            <span className="mb-4 block text-sm font-bold uppercase tracking-[0.24em] text-pink-200">
              On-site upholstery care
            </span>

            <h1 className="max-w-3xl font-display text-4xl font-bold leading-tight text-white drop-shadow-sm sm:text-5xl md:text-6xl">
              Professional Furniture Cleaning Services in Dubai
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-7 text-white drop-shadow-sm sm:text-lg">
              Furniture is one of the most frequently used parts of any home,
              office, hotel, restaurant, or commercial property. Sofas,
              mattresses, dining chairs, carpets, curtains, and upholstered
              furniture collect dust, body oils, food particles, pet hair,
              spills, odors, and airborne allergens over time. Our professional
              furniture cleaning services in Dubai are designed to refresh,
              clean, and improve the appearance of residential and commercial
              furniture using suitable equipment, fabric-safe products, and
              proven cleaning methods.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <HeroButton icon={Sofa} onClick={() => scrollToSection("sofa-section")}>
                Sofa Cleaning
              </HeroButton>
              <HeroButton icon={BedDouble} onClick={() => scrollToSection("mattress-section")}>
                Mattress Cleaning
              </HeroButton>
              <HeroButton icon={Ruler} onClick={() => scrollToSection("carpet-section")}>
                Carpet Cleaning
              </HeroButton>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container mx-auto max-w-6xl px-5 sm:px-6">
          <motion.div {...animation} className="mx-auto max-w-4xl text-center">
            <SectionEyebrow>Fabric-safe solutions</SectionEyebrow>
            <h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">
              Complete Furniture Cleaning Solutions in Dubai
            </h2>
            <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg">
              Furniture cleaning is not a one-method service. Different
              fabrics, materials, fillings, colors, and construction methods
              respond differently to moisture, heat, chemicals, and
              agitation. Before cleaning begins, our technicians review the
              furniture material, fabric color, condition, existing damage,
              stain type, level of soiling, manufacturer care label,
              colorfastness, drying requirements, cleaning accessibility, age
              of the furniture, and previous cleaning attempts. Based on this
              assessment, we select the most appropriate cleaning process.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <InfoPanel title="What we assess" items={assessmentList} />
            <InfoPanel title="Methods we may use" items={methodsList} />
          </div>

          <motion.div {...animation} className="mt-16">
            <div className="text-center">
              <SectionEyebrow>Why it matters</SectionEyebrow>
              <h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">
                Why Professional Furniture Cleaning Is Important
              </h2>
              <p className="mx-auto mt-5 max-w-4xl text-base leading-7 text-gray-600 sm:text-lg">
                Furniture may appear clean from a distance while still holding
                dust, hair, crumbs, skin particles, residue, and odors inside
                the fabric. Professional cleaning is especially useful in
                Dubai, where air-conditioning, dust, sand, humidity, frequent
                indoor living, and closed windows can contribute to faster
                dirt accumulation on soft furnishings.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {benefitsList.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-pink-100 bg-pink-50/70 p-4"
                >
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-pink-500" />
                  <span className="text-sm font-medium leading-6 text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <PricingSection
        id="sofa-section"
        icon={Sofa}
        title="Sofa Cleaning Packages"
        description="The sofa is often the most heavily used piece of furniture in a home. Our professional sofa cleaning helps restore the appearance and freshness of your sofa without the inconvenience of replacing it."
        packages={sofaPackages}
        category="Sofa"
        addedId={addedId}
        onAdd={handleAddPackage}
        background="bg-gray-50"
        columns="lg:grid-cols-3"
      />

      <PricingSection
        id="mattress-section"
        icon={BedDouble}
        title="Mattress Cleaning Packages"
        description="A mattress is used for several hours every night and can collect dust, body oils, perspiration, hair, skin particles, spills, and general household residue. Our service helps refresh the sleeping surface."
        packages={mattressPackages}
        category="Mattress"
        addedId={addedId}
        onAdd={handleAddPackage}
        background="bg-white"
        columns="lg:grid-cols-4"
      />

      <PricingSection
        id="carpet-section"
        icon={Ruler}
        title="Carpet Cleaning Packages"
        description="Carpets and rugs can hold dust, sand, hair, food particles, stains, and odors below the visible surface. Our extraction methods pull out embedded dirt."
        packages={carpetPackages}
        category="Carpet"
        addedId={addedId}
        onAdd={handleAddPackage}
        background="bg-gray-50"
        columns="lg:grid-cols-4"
      />

      <section className="bg-white py-20">
        <div className="container mx-auto max-w-6xl px-5 sm:px-6">
          <motion.div {...animation} className="text-center">
            <SectionEyebrow>Seven careful stages</SectionEyebrow>
            <h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">
              Our Furniture Cleaning Process
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.article
                  key={step.title}
                  {...animation}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.4,
                    delay: prefersReducedMotion ? 0 : Math.min(index * 0.04, 0.2),
                  }}
                  className="group rounded-3xl border border-gray-100 bg-gray-50 p-6 transition hover:-translate-y-1 hover:border-pink-200 hover:bg-white hover:shadow-xl"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-100 text-pink-600 transition group-hover:bg-pink-500 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-gray-900">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-gray-600">{step.desc}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="container mx-auto grid max-w-6xl gap-10 px-5 sm:px-6 lg:grid-cols-2">
          <motion.div {...animation}>
            <SectionEyebrow>Why choose us</SectionEyebrow>
            <h2 className="font-display text-3xl font-bold text-gray-900">
              Why Choose Our Furniture Cleaning Company?
            </h2>

            <div className="mt-8 space-y-4">
              {whyChooseUs.map((point) => {
                const Icon = point.icon;
                return (
                  <article
                    key={point.title}
                    className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-pink-100 text-pink-600">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{point.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-gray-600">{point.desc}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </motion.div>

          <motion.div {...animation}>
            <SectionEyebrow>Clear expectations</SectionEyebrow>
            <h2 className="font-display text-3xl font-bold text-gray-900">
              What Professional Cleaning May Not Fix
            </h2>
            <p className="mt-5 leading-7 text-gray-600">
              Cleaning improves cleanliness and appearance, but it cannot repair
              structural or material damage. Customers should inform the
              technician of known damage before cleaning.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {limitations.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-xl border border-red-100 bg-white p-3"
                >
                  <XCircle className="h-4 w-4 shrink-0 text-red-500" />
                  <span className="text-xs font-semibold text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container mx-auto max-w-6xl px-5 sm:px-6">
          <motion.div {...animation} className="text-center">
            <SectionEyebrow>Furniture we handle</SectionEyebrow>
            <h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">
              Specialist Cleaning for Residential and Commercial Furniture
            </h2>
          </motion.div>

          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            <TagCloud title="Furniture and surfaces" items={specialistCleaning} />
            <TagCloud title="Common sofa types" items={sofaTypes} />
            <TagCloud title="Common stains and residue" items={sofaStains} />
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="container mx-auto max-w-5xl px-5 text-center sm:px-6">
          <motion.div {...animation}>
            <SectionEyebrow>Mobile teams across Dubai</SectionEyebrow>
            <h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">
              Areas We Serve Across Dubai
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-gray-600 sm:text-lg">
              We serve customers across many Dubai communities. Service
              availability depends on the booking date, property access, item
              quantity, and required equipment.
            </p>
          </motion.div>

          <div className="mt-9 flex flex-wrap justify-center gap-2.5">
            {areasServed.map((area) => (
              <span
                key={area}
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700"
              >
                <MapPin className="h-3.5 w-3.5 text-pink-500" />
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container mx-auto max-w-3xl px-5 sm:px-6">
          <motion.div {...animation} className="text-center">
            <SectionEyebrow>Helpful answers</SectionEyebrow>
            <h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="mt-10 space-y-3">
            {faqs.map((faq, index) => {
              const open = openFaq === index;
              const panelId = `furniture-faq-panel-${index}`;
              const buttonId = `furniture-faq-button-${index}`;

              return (
                <article
                  key={faq.q}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
                >
                  <button
                    id={buttonId}
                    type="button"
                    onClick={() => setOpenFaq(open ? null : index)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left font-semibold text-gray-900 transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-pink-500"
                    aria-expanded={open}
                    aria-controls={panelId}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-pink-500 transition-transform ${
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

      <RelatedServices intro="Pair upholstery care with a thorough property clean so the rooms around your furniture feel equally renewed." services={[
        { title: "Deep Cleaning", description: "Give kitchens, bathrooms, floors, fixtures, and hard-to-reach areas detailed attention.", to: "/deep-cleaning-services-dubai", linkText: "Visit deep cleaning" },
        { title: "Residential Cleaning", description: "Maintain your apartment or villa with a practical recurring cleaning routine.", to: "/residential-cleaning-services-dubai", linkText: "Visit residential cleaning" },
      ]} />

      <section className="bg-white px-5 py-8 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-pink-600 via-pink-700 to-gray-950 px-6 py-12 text-center shadow-2xl sm:px-10 md:py-16">
            <Sofa className="absolute -bottom-16 -right-10 h-64 w-64 rotate-12 text-white/[0.05]" />
            <div className="relative mx-auto max-w-3xl">
              <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
                Refresh Your Sofas, Mattresses, Carpets, and Upholstery
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-pink-100 sm:text-lg">
                Dirty or stained furniture can affect the comfort and appearance
                of your entire property. Contact us today to share your
                furniture photos, dimensions, and stain details for a customized
                quotation.
              </p>
              <button
                type="button"
                onClick={() => scrollToSection("sofa-section")}
                className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 font-bold text-pink-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-pink-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-pink-700"
              >
                Book Furniture Cleaning
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function HeroButton({ icon: Icon, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white px-5 py-3 font-bold text-gray-900 shadow-lg transition hover:-translate-y-0.5 hover:bg-pink-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
    >
      <Icon className="h-5 w-5 text-pink-500" />
      {children}
    </button>
  );
}

function SectionEyebrow({ children }) {
  return (
    <span className="mb-3 block text-xs font-bold uppercase tracking-[0.22em] text-pink-600">
      {children}
    </span>
  );
}

function InfoPanel({ title, items }) {
  return (
    <div className="rounded-3xl border border-gray-100 bg-gray-50 p-6 sm:p-8">
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3">
            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-pink-500" />
            <span className="text-sm leading-5 text-gray-700">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TagCloud({ title, items }) {
  return (
    <article className="rounded-3xl border border-gray-100 bg-gray-50 p-6">
      <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      <div className="mt-5 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700"
          >
            {item}
          </span>
        ))}
      </div>
    </article>
  );
}

function PricingSection({
  id,
  icon: Icon,
  title,
  description,
  packages,
  category,
  addedId,
  onAdd,
  background,
  columns,
}) {
  return (
    <section id={id} className={`${background} scroll-mt-24 py-20`}>
      <div className="container mx-auto max-w-6xl px-5 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-100 text-pink-600">
            <Icon className="h-7 w-7" />
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold text-gray-900 md:text-4xl">
            {title}
          </h2>
          <p className="mt-4 leading-7 text-gray-600">{description}</p>
        </div>

        <div className={`mt-10 grid gap-5 sm:grid-cols-2 ${columns}`}>
          {packages.map((pkg, index) => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              category={category}
              added={addedId === pkg.id}
              onAdd={onAdd}
              popular={index === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PackageCard({ pkg, category, added, onAdd, popular }) {
  const saving = pkg.original - pkg.price;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.35 }}
      className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-pink-200 hover:shadow-xl"
    >
      {popular && (
        <span className="absolute right-4 top-4 rounded-full bg-gray-900 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
          Popular
        </span>
      )}

      <div className="flex-1 bg-gradient-to-br from-pink-50 to-white p-6">
        <p className="text-sm font-bold uppercase tracking-wider text-pink-600">{category}</p>
        <h3 className="mt-2 pr-16 text-lg font-bold text-gray-900">{pkg.name}</h3>

        <div className="mt-5 flex items-end gap-2">
          <span className="text-3xl font-bold text-gray-900">{pkg.price}</span>
          <span className="pb-1 font-semibold text-gray-500">AED</span>
          <span className="pb-1 text-sm text-gray-400 line-through">
            {pkg.original} AED
          </span>
        </div>

        <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
          <Tag className="h-3.5 w-3.5" />
          Save {saving} AED
        </span>

        <div className="mt-6 space-y-2 text-sm text-gray-600">
          <p className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-pink-500" />
            On-site professional service
          </p>
          <p className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-pink-500" />
            Fabric inspection before cleaning
          </p>
        </div>
      </div>

      <div className="border-t border-gray-100 p-4">
        <button
          type="button"
          onClick={() => onAdd(pkg, category)}
          disabled={added}
          className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 font-bold text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2 ${
            added
              ? "cursor-default bg-emerald-500"
              : "bg-pink-500 hover:-translate-y-0.5 hover:bg-pink-600"
          }`}
        >
          {added ? (
            <>
              <CheckCircle className="h-4 w-4" />
              Added to Cart
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </motion.article>
  );
}
