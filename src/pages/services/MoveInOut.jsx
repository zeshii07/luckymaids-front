import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  Building,
  CheckCircle,
  ChevronDown,
  ClipboardList,
  Clock,
  FileCheck,
  Home,
  MapPin,
  Settings,
  ShoppingCart,
  Tag,
  Truck,
  UserCheck,
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import RelatedServices from "../../components/RelatedServices";

// --- Pricing Data ---
const villaFurnished = [
  { id: 'mvf1', name: '1 Bedroom Villa', price: 400, original: 450 },
  { id: 'mvf2', name: '2 Bedroom Villa', price: 500, original: 550 },
  { id: 'mvf3', name: '3 Bedroom Villa', price: 600, original: 700 },
  { id: 'mvf4', name: '4 Bedroom Villa', price: 700, original: 800 },
  { id: 'mvf5', name: '5 Bedroom Villa', price: 800, original: 950 },
];

const villaUnfurnished = [
  { id: 'mvu1', name: '1 Bedroom Villa', price: 350, original: 400 },
  { id: 'mvu2', name: '2 Bedroom Villa', price: 450, original: 500 },
  { id: 'mvu3', name: '3 Bedroom Villa', price: 550, original: 650 },
  { id: 'mvu4', name: '4 Bedroom Villa', price: 650, original: 750 },
  { id: 'mvu5', name: '5 Bedroom Villa', price: 750, original: 900 },
];

const apartments = [
  { id: 'map0', name: 'Studio Apartment', price: 250, original: 300 },
  { id: 'map1', name: '1 Bedroom Apartment', price: 300, original: 350 },
  { id: 'map2', name: '2 Bedroom Apartment', price: 350, original: 400 },
  { id: 'map3', name: '3 Bedroom Apartment', price: 400, original: 450 },
];

// --- Content Data ---
const solutionsIncluded = [
  "Floors and floor edges", "Doors, handles, and frames", "Windows, tracks, and internal glass", "Kitchen cabinets and drawers", 
  "Wardrobes and storage areas", "Bathrooms and sanitary fixtures", "Kitchen surfaces and backsplash tiles", "Accessible appliances", 
  "Skirting boards", "Switches and sockets", "Light fixtures", "Air-conditioning vent exteriors", 
  "Balconies and utility areas", "Empty shelves and cupboards", "Corners and difficult-to-reach spaces"
];

const moveInPrevOccupied = [
  "Kitchen drawers and cupboards", "Bathroom fixtures", "Built-in wardrobes", "Window tracks", 
  "Balcony floors", "Utility rooms", "Storage areas", "Floor edges and corners", 
  "Behind movable appliances", "Door frames and handles"
];

const moveOutAreas = [
  "Empty bedrooms", "Living and dining areas", "Kitchens", "Bathrooms", "Hallways", 
  "Balconies", "Storage rooms", "Maid’s rooms", "Laundry and utility areas", "Built-in cabinets and wardrobes"
];

const endOfTenancySuitable = [
  "Tenants leaving rental apartments", "Families moving out of villas", "Landlords preparing units for new tenants", 
  "Property management companies", "Real estate brokers", "Holiday-home operators", 
  "Serviced apartment managers", "Corporate accommodation providers"
];

const checklistRooms = [
  { title: "Kitchen Move-In and Move-Out Cleaning", items: ["Dusting and wiping accessible surfaces", "Cleaning countertops & backsplash tiles", "Degreasing accessible kitchen surfaces", "Scrubbing and polishing the sink", "Cleaning faucets and fixtures", "Wiping cabinet doors", "Cleaning empty cabinets & drawers internally", "Cleaning appliance exteriors (cooker, fridge)", "Cleaning microwave internally/externally", "Wiping range hood exterior", "Cleaning switches and socket exteriors", "Vacuuming floor edges & scrubbing floors"] },
  { title: "Bathroom Deep Cleaning and Sanitization", items: ["Cleaning and disinfecting toilets", "Cleaning washbasins & scrubbing bathtubs", "Cleaning shower areas & accessible wall tiles", "Scrubbing floor tiles", "Cleaning shower-glass surfaces & polishing mirrors", "Cleaning faucets and fixtures", "Wiping cabinet exteriors & cleaning empty cabinets", "Cleaning doors and handles", "Wiping switches and socket exteriors", "Cleaning accessible exhaust covers", "Cleaning floor edges and corners", "Mopping and sanitizing the floor"] },
  { title: "Bedroom Cleaning", items: ["Dusting walls where safely accessible", "Removing accessible cobwebs", "Cleaning built-in wardrobes & empty shelves", "Cleaning empty drawers", "Wiping doors, handles, and door frames", "Wiping skirting boards", "Cleaning window interiors & internal tracks", "Wiping switches and socket exteriors", "Dusting accessible light fixtures", "Vacuuming & mopping suitable flooring", "Cleaning floor edges and corners", "Spot-cleaning minor wall marks"] },
  { title: "Living Room and Dining Area Cleaning", items: ["Dusting accessible surfaces & removing cobwebs", "Wiping built-in shelves", "Cleaning empty storage units", "Cleaning doors and frames & wiping handles", "Cleaning skirting boards", "Wiping switches and socket exteriors", "Cleaning internal window glass & accessible tracks", "Dusting light fixtures", "Vacuuming & mopping suitable flooring", "Cleaning corners and edges", "Wiping balcony doors", "Spot-cleaning suitable surfaces"] }
];

const processSteps = [
  { title: "Share Your Property Details", desc: "Provide location, property type, number of bedrooms/bathrooms, furnished status, size, condition, preferred date, and photos if available. This helps us recommend the right package." },
  { title: "Receive a Cleaning Estimate", desc: "We prepare an estimate based on the service scope, property size, condition, access, equipment requirements, and expected working time. Inspections may be recommended for larger villas." },
  { title: "Prepare the Property", desc: "Remove personal belongings, empty cabinets, dispose of unwanted items, arrange building access, reserve service elevator, confirm utilities, and identify fragile surfaces." },
  { title: "Detailed Cleaning", desc: "Our team follows a room-by-room checklist and works from higher surfaces toward lower areas, helping prevent cleaned floors from being contaminated again by falling dust." },
  { title: "Final Review", desc: "After cleaning, the customer or authorized representative should review the property and report any concerns while the team is still on site for immediate resolution." }
];

const whyChooseUs = [
  { icon: UserCheck, title: "Trained and Supervised Cleaners", desc: "Our cleaners follow structured checklists and suitable cleaning procedures for different rooms and surfaces." },
  { icon: Settings, title: "Cleaning Equipment and Materials Available", desc: "Depending on the selected package, we can provide cleaning tools, machines, and cleaning products required for the job." },
  { icon: Clock, title: "Flexible Booking Options", desc: "Morning, afternoon, weekday, and weekend appointments may be available depending on team schedules." },
  { icon: ClipboardList, title: "Customized Service Scope", desc: "You can request a complete property clean or highlight specific areas such as bathrooms, kitchens, windows, cabinets, or floors." },
  { icon: Home, title: "Apartment and Villa Experience", desc: "Our teams understand the different access, timing, and cleaning requirements of apartments, villas, townhouses, and larger properties." },
  { icon: FileCheck, title: "Clear Service Expectations", desc: "We explain the service scope, exclusions, and recommended additional services before the appointment." }
];

const areasServed = [
  "Downtown Dubai", "Business Bay", "Dubai Marina", "Jumeirah Beach Residence", "Jumeirah Lake Towers", "Palm Jumeirah", "Jumeirah", "Umm Suqeim", "Al Barsha", "Barsha Heights", "Dubai Hills Estate", "Arabian Ranches", "Emirates Living", "The Springs", "The Meadows", "The Lakes", "Emirates Hills", "Jumeirah Village Circle", "Jumeirah Village Triangle", "Dubai Sports City", "Dubai Production City", "Motor City", "Damac Hills", "Damac Hills 2", "Town Square Dubai", "Mudon", "Tilal Al Ghaf", "Dubai Silicon Oasis", "International City", "Dubai South", "Discovery Gardens", "The Gardens", "Al Furjan", "Mirdif", "Nad Al Sheba", "Meydan", "Dubai Creek Harbour", "Dubai Festival City", "Al Nahda", "Deira", "Bur Dubai", "Al Karama"
];

const faqs = [
  { q: "What is the difference between move-in cleaning and move-out cleaning?", a: "Move-in cleaning prepares a property before new occupants unpack and settle in. Move-out cleaning prepares a property after the previous occupants remove their belongings. The cleaning tasks are often similar, but the priorities may differ according to property condition and handover requirements." },
  { q: "Is moving cleaning the same as regular cleaning?", a: "No. Regular cleaning focuses mainly on routine maintenance of occupied areas. Moving cleaning is generally more detailed and may include empty cabinets, wardrobes, skirting boards, window tracks, fixtures, floor edges, and areas that become accessible after furniture is removed." },
  { q: "Is move-out cleaning the same as end-of-tenancy cleaning?", a: "The terms are often used for similar services. End-of-tenancy cleaning usually refers specifically to cleaning a rental property before handover, while move-out cleaning may apply to renters, homeowners, offices, or commercial units." },
  { q: "Should the property be empty before cleaning?", a: "An empty property generally allows the most detailed cleaning. We can clean furnished or partially empty properties, but furniture and boxes may restrict access." },
  { q: "Do you clean inside kitchen cabinets?", a: "Yes, internal cabinet and drawer cleaning can be included when they are completely empty and safely accessible." },
  { q: "Do you clean inside wardrobes?", a: "Yes. Empty built-in wardrobes, shelves, and drawers can be wiped as part of the agreed service." },
  { q: "Do you clean windows?", a: "Internal window glass, frames, sills, and accessible tracks may be included. High-rise external windows or inaccessible exterior glass require specialist services." },
  { q: "Do you clean kitchen appliances?", a: "Appliance exterior cleaning may be included. Internal oven, refrigerator, dishwasher, or washing-machine cleaning should be requested in advance and may carry an additional charge." },
  { q: "Do you provide cleaning products and equipment?", a: "Cleaning products and equipment can be supplied according to the selected package. Confirm this when booking." },
  { q: "Can you remove all stains?", a: "We treat removable dirt and stains using suitable products and methods. However, permanent discoloration, damaged finishes, rust, burns, scratches, deep grout staining, old silicone marks, and material deterioration may not be completely removable." },
  { q: "Can move-out cleaning guarantee the return of my security deposit?", a: "No cleaning company can responsibly guarantee a deposit refund because the final decision may depend on property damage, unpaid charges, maintenance issues, tenancy terms, inspection standards, and landlord approval. Professional cleaning can help improve the property’s cleanliness and presentation." },
  { q: "Can I book cleaning on the same day as moving?", a: "Same-day availability may be possible, but advance booking is recommended. Moving schedules can change, and cleaning is most effective after movers have removed furniture and boxes." },
  { q: "Can cleaners work while movers are inside the property?", a: "It is possible, but it is usually less efficient. Movers may create dust, block rooms, and walk over cleaned floors. For better results, schedule cleaning after the movers finish or clean the new property before deliveries begin." },
  { q: "How many cleaners will come?", a: "Team size depends on the property size, condition, service scope, and required completion time." },
  { q: "Do I need to be present?", a: "You do not necessarily need to remain throughout the service, but an authorized person should provide access, explain priorities, and complete the final inspection." },
  { q: "Can landlords and real estate agents book on behalf of tenants?", a: "Yes. We work with tenants, landlords, property managers, agents, and company representatives." },
  { q: "Do you clean villas as well as apartments?", a: "Yes. We provide moving cleaning for studios, apartments, penthouses, townhouses, and villas throughout Dubai." },
  { q: "Do you offer move-in cleaning for commercial offices?", a: "Yes. Commercial relocation cleaning can be arranged after reviewing the office size, floor type, access, and required scope." },
  { q: "When should I contact you for a quotation?", a: "Contact us as soon as your moving date is confirmed. Early booking gives you more scheduling options, especially at weekends and near the end or beginning of the month." }
];


const HERO_IMAGE =
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=85";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function MoveInOut() {
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

  const handleAddPackage = (pkg, type) => {
    addToCart({
      id: pkg.id,
      service: `Move In/Out: ${pkg.name} (${type})`,
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
        <title>Move-In & Move-Out Cleaning Dubai | Professional Cleaners</title>
        <meta
          name="description"
          content="Book professional move-in and move-out cleaning services in Dubai for apartments, villas, and rental properties. Detailed kitchen, bathroom, cabinet, window, and floor cleaning for a fresh move or property handover."
        />
      </Helmet>

      <section className="relative isolate min-h-[650px] overflow-hidden bg-purple-50">
        <img
          src={HERO_IMAGE}
          alt="Professional move-in and move-out cleaning services in Dubai"
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/55 via-slate-900/20 to-transparent" />

        <div className="container relative mx-auto flex min-h-[650px] items-end px-5 pb-14 pt-28 sm:px-6 md:items-center md:pb-20">
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

            <span className="mb-4 block text-sm font-bold uppercase tracking-[0.24em] text-purple-200">
              Detailed relocation cleaning
            </span>

            <h1 className="max-w-4xl font-display text-4xl font-bold leading-tight text-white drop-shadow-sm sm:text-5xl md:text-6xl">
              Professional Move-In and Move-Out Cleaning Services in Dubai
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-7 text-white drop-shadow-sm sm:text-lg">
              Moving to a new home should feel exciting, not exhausting.
              However, packing, coordinating movers, managing tenancy
              requirements, transferring utilities, and organizing your
              belongings can leave little time for detailed property cleaning.
              Our professional move-in and move-out cleaning services in Dubai
              are designed to handle the cleaning process from top to bottom,
              allowing you to focus on the move itself.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <HeroButton icon={Home} onClick={() => scrollToSection("villa-section")}>
                Villa Packages
              </HeroButton>
              <HeroButton icon={Building} onClick={() => scrollToSection("apartment-section")}>
                Apartment Packages
              </HeroButton>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 -mt-7 px-5 sm:px-6">
        <div className="container mx-auto grid max-w-6xl gap-4 rounded-3xl border border-gray-100 bg-white p-4 shadow-xl sm:grid-cols-2 lg:grid-cols-4">
          {[
            [ClipboardList, "Detailed checklist", "Room-by-room cleaning based on the selected package."],
            [Settings, "Equipment available", "Tools and materials can be included according to your booking."],
            [Clock, "Flexible scheduling", "Morning, afternoon, weekday, and weekend slots may be available."],
            [FileCheck, "Clear expectations", "Scope and exclusions are explained before your appointment."],
          ].map(([Icon, title, text]) => (
            <article key={title} className="rounded-2xl bg-gray-50 p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
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
            <SectionEyebrow>Complete property reset</SectionEyebrow>
            <h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">
              Complete Move-In and Move-Out Cleaning Solutions in Dubai
            </h2>
            <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg">
              Move-in and move-out cleaning is more detailed than routine home
              cleaning. Moving cleaning usually takes place when a property is
              empty or nearly empty, allowing our cleaners to reach spaces that
              may have been covered by furniture, appliances, carpets, boxes,
              or personal belongings.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {solutionsIncluded.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-purple-500" />
                <span className="text-sm font-medium leading-6 text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="container mx-auto grid max-w-6xl gap-8 px-5 sm:px-6 lg:grid-cols-2">
          <ContentPanel
            icon={Home}
            title="Move-In Cleaning Services Dubai"
            paragraphs={[
              "Moving into a new apartment or villa is an important moment. Even when a property appears tidy during a viewing, it may still contain dust inside cabinets, residue in bathrooms, grease around the kitchen, marks on floors, or dirt in areas that were previously hidden.",
              "Our move-in cleaning service in Dubai gives you a cleaner starting point before furniture, boxes, clothes, kitchen items, and personal belongings are unpacked.",
            ]}
            subtitle="Previously Occupied Properties"
            items={moveInPrevOccupied}
          />

          <ContentPanel
            icon={Truck}
            title="Move-Out Cleaning Services Dubai"
            paragraphs={[
              "Moving out involves more than packing your belongings and booking transportation. Tenants, homeowners, landlords, property managers, and real estate agents may also need the property cleaned before inspection, handover, resale, or the arrival of new occupants.",
              "Our move-out cleaning services in Dubai help prepare apartments and villas after furniture and personal belongings have been removed.",
            ]}
            subtitle="A Cleaner Property for Final Handover"
            items={moveOutAreas}
          />
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container mx-auto max-w-6xl px-5 text-center sm:px-6">
          <motion.div {...animation}>
            <SectionEyebrow>Property turnover support</SectionEyebrow>
            <h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">
              End-of-Tenancy Cleaning Services in Dubai
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-gray-600 sm:text-lg">
              End-of-tenancy cleaning refers to the detailed cleaning of a
              rented property before the tenant completes the handover process.
              The service is suitable for:
            </p>
          </motion.div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {endOfTenancySuitable.map((item) => (
              <div key={item} className="rounded-2xl border border-purple-100 bg-purple-50 p-5 text-sm font-semibold text-gray-700">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="container mx-auto max-w-6xl px-5 sm:px-6">
          <motion.div {...animation} className="text-center">
            <SectionEyebrow>Room-by-room scope</SectionEyebrow>
            <h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">
              What Is Included in Move-In and Move-Out Cleaning?
            </h2>
            <p className="mx-auto mt-5 max-w-3xl leading-7 text-gray-600">
              Final inclusions may differ according to the selected package,
              property condition, accessibility, and customer requirements.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {checklistRooms.map((room) => (
              <article key={room.title} className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900">{room.title}</h3>
                <ul className="mt-6 space-y-3">
                  {room.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-6 text-gray-700">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-purple-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <PricingSection
        id="villa-section"
        title="Villa Move-Out Packages"
        description="Comprehensive top-to-bottom cleaning for Dubai villas, suitable for property handovers and relocations."
        background="bg-white"
      >
        <PackageGroup
          title="Furnished Villas"
          icon={Home}
          packages={villaFurnished}
          type="Furnished"
          addedId={addedId}
          onAdd={handleAddPackage}
        />
        <PackageGroup
          title="Unfurnished Villas"
          icon={Home}
          packages={villaUnfurnished}
          type="Unfurnished"
          addedId={addedId}
          onAdd={handleAddPackage}
        />
      </PricingSection>

      <PricingSection
        id="apartment-section"
        title="Apartment Move-Out Packages"
        description="Detailed moving cleaning for studios and apartments before occupancy or property handover."
        background="bg-gray-50"
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {apartments.map((pkg, index) => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              type="Apartment"
              added={addedId === pkg.id}
              onAdd={handleAddPackage}
              popular={index === 1}
            />
          ))}
        </div>
      </PricingSection>

      <section className="bg-white py-20">
        <div className="container mx-auto max-w-6xl px-5 sm:px-6">
          <motion.div {...animation} className="text-center">
            <SectionEyebrow>Five practical stages</SectionEyebrow>
            <h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">
              Our Move-In and Move-Out Cleaning Process
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step, index) => (
              <article key={step.title} className="rounded-3xl border border-gray-100 bg-gray-50 p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500 font-bold text-white">
                  {index + 1}
                </span>
                <h3 className="mt-5 text-lg font-bold text-gray-900">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-gray-600">{step.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="container mx-auto max-w-6xl px-5 sm:px-6">
          <motion.div {...animation} className="text-center">
            <SectionEyebrow>Why choose us</SectionEyebrow>
            <h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">
              Why Choose Our Moving Cleaning Company in Dubai?
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((point) => {
              const Icon = point.icon;
              return (
                <article key={point.title} className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-gray-900">{point.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-gray-600">{point.desc}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container mx-auto max-w-5xl px-5 text-center sm:px-6">
          <motion.div {...animation}>
            <SectionEyebrow>Dubai-wide coverage</SectionEyebrow>
            <h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">
              Areas We Serve Across Dubai
            </h2>
            <p className="mx-auto mt-5 max-w-3xl leading-7 text-gray-600">
              Our moving-cleaning teams serve customers in many Dubai communities, including:
            </p>
          </motion.div>

          <div className="mt-9 flex flex-wrap justify-center gap-2.5">
            {areasServed.map((area) => (
              <span key={area} className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700">
                <MapPin className="h-3.5 w-3.5 text-purple-500" />
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
              Move-In and Move-Out Cleaning FAQs
            </h2>
          </motion.div>

          <div className="mt-10 space-y-3">
            {faqs.map((faq, index) => {
              const open = openFaq === index;
              const panelId = `move-faq-panel-${index}`;
              const buttonId = `move-faq-button-${index}`;

              return (
                <article key={faq.q} className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                  <button
                    id={buttonId}
                    type="button"
                    onClick={() => setOpenFaq(open ? null : index)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left font-semibold text-gray-900 transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-purple-500"
                    aria-expanded={open}
                    aria-controls={panelId}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`h-5 w-5 shrink-0 text-purple-500 transition-transform ${open ? "rotate-180" : ""}`} />
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

      <RelatedServices intro="Finish preparing the property with intensive detail work and specialist cleaning for furniture moving with you." services={[
        { title: "Deep Cleaning", description: "Add focused attention for stubborn buildup, fixtures, and hard-to-reach areas before handover.", to: "/deep-cleaning-services-dubai", linkText: "Visit deep cleaning" },
        { title: "Furniture Cleaning", description: "Refresh sofas, mattresses, carpets, and upholstery before settling into your new home.", to: "/furniture-cleaning-dubai", linkText: "Visit furniture cleaning" },
      ]} />

      <section className="bg-white px-5 py-10 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-purple-600 via-purple-700 to-gray-950 px-6 py-12 text-center shadow-2xl sm:px-10 md:py-16">
            <Truck className="absolute -bottom-16 -right-10 h-64 w-64 rotate-12 text-white/[0.05]" />
            <div className="relative mx-auto max-w-3xl">
              <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
                Prepare for a Cleaner and Easier Move
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-purple-100 sm:text-lg">
                Moving already involves dozens of important tasks. Professional
                cleaning removes one of the largest and most tiring jobs from
                your moving checklist.
              </p>
              <button
                type="button"
                onClick={() => scrollToSection("villa-section")}
                className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 font-bold text-purple-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-purple-50"
              >
                Book Move-In/Move-Out Cleaning
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
    <span className="mb-3 block text-xs font-bold uppercase tracking-[0.22em] text-purple-600">
      {children}
    </span>
  );
}

function HeroButton({ icon: Icon, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 font-bold text-gray-900 shadow-lg transition hover:-translate-y-0.5 hover:bg-purple-50"
    >
      <Icon className="h-5 w-5 text-purple-500" />
      {children}
    </button>
  );
}

function ContentPanel({ icon: Icon, title, paragraphs, subtitle, items }) {
  return (
    <article className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
        <Icon className="h-7 w-7" />
      </div>
      <h2 className="mt-6 font-display text-3xl font-bold text-gray-900">{title}</h2>
      {paragraphs.map((paragraph) => (
        <p key={paragraph} className="mt-4 leading-7 text-gray-600">{paragraph}</p>
      ))}
      <h3 className="mt-7 text-lg font-bold text-gray-900">{subtitle}</h3>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-2 text-sm leading-6 text-gray-700">
            <CheckCircle className="mt-1 h-4 w-4 shrink-0 text-purple-500" />
            {item}
          </div>
        ))}
      </div>
    </article>
  );
}

function PricingSection({ id, title, description, background, children }) {
  return (
    <section id={id} className={`${background} scroll-mt-24 py-20`}>
      <div className="container mx-auto max-w-6xl px-5 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <SectionEyebrow>Transparent package pricing</SectionEyebrow>
          <h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">{title}</h2>
          <p className="mt-4 leading-7 text-gray-600">{description}</p>
        </div>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

function PackageGroup({ title, icon: Icon, packages, type, addedId, onAdd }) {
  return (
    <div className="mb-14 last:mb-0">
      <h3 className="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-900">
        <Icon className="h-6 w-6 text-purple-500" />
        {title}
      </h3>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg, index) => (
          <PackageCard
            key={pkg.id}
            pkg={pkg}
            type={type}
            added={addedId === pkg.id}
            onAdd={onAdd}
            popular={index === 1}
          />
        ))}
      </div>
    </div>
  );
}

function PackageCard({ pkg, type, added, onAdd, popular }) {
  const saving = pkg.original - pkg.price;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.35 }}
      className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-purple-200 hover:shadow-xl"
    >
      {popular && (
        <span className="absolute right-4 top-4 rounded-full bg-gray-900 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
          Popular
        </span>
      )}
      <div className="flex-1 bg-gradient-to-br from-purple-50 to-white p-6">
        <p className="text-xs font-bold uppercase tracking-wider text-purple-600">{type}</p>
        <h3 className="mt-2 pr-16 text-lg font-bold text-gray-900">{pkg.name}</h3>
        <div className="mt-5 flex items-end gap-2">
          <span className="text-3xl font-bold text-gray-900">{pkg.price}</span>
          <span className="pb-1 font-semibold text-gray-500">AED</span>
          <span className="pb-1 text-sm text-gray-400 line-through">{pkg.original} AED</span>
        </div>
        <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
          <Tag className="h-3.5 w-3.5" />
          Save {saving} AED
        </span>
        <div className="mt-6 space-y-2 text-sm text-gray-600">
          <p className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-purple-500" /> Room-by-room checklist</p>
          <p className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-purple-500" /> Suitable for moving and handover</p>
        </div>
      </div>
      <div className="border-t border-gray-100 p-4">
        <button
          type="button"
          onClick={() => onAdd(pkg, type)}
          disabled={added}
          className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 font-bold text-white transition ${
            added ? "cursor-default bg-emerald-500" : "bg-purple-500 hover:bg-purple-600"
          }`}
        >
          {added ? <><CheckCircle className="h-4 w-4" /> Added to Cart</> : <><ShoppingCart className="h-4 w-4" /> Add to Cart</>}
        </button>
      </div>
    </motion.article>
  );
}
