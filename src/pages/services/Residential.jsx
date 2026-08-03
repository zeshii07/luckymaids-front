import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import RelatedServices from "../../components/RelatedServices";
import {
  ArrowLeft,
  ArrowRight,
  Bath,
  Building,
  CheckCircle,
  ChefHat,
  ChevronDown,
  Home,
  ListChecks,
  MapPin,
  MessageCircle,
  Sparkles,
  Wind,
  Clock,
  UserCheck,
  ClipboardList,
  Tag,
  Settings,
  ShieldCheck,
  CalendarCheck,
  BedDouble,
  Sofa,
  Utensils,
  WashingMachine,
  Shirt,
  SprayCan,
  Scan,
  Droplets,
  PanelTop,
  DoorOpen,
  Layers,
  CalendarDays,
  CalendarRange ,
  Calendar,
  Sun,
  Truck,
  HardHat,
  PartyPopper,
  Users,
  Briefcase,
  PawPrint,
  Baby,
  Leaf,
} from "lucide-react";

// --- Data Arrays for Part 1 ---
const propertyTypes = ["Studio Apartments", "Apartments", "Villas", "Townhouses", "Duplex Homes", "Penthouses", "Holiday Homes", "Staff Accommodation", "Residential Compounds", "Family Homes"];

const cleaningSolutions = [
  { name: "Routine Home Cleaning", link: null },
  { name: "Apartment Cleaning", link: null },
  { name: "Villa Cleaning", link: null },
  { name: "House Cleaning", link: null },
  { name: "Deep Cleaning", link: "/services/deep-cleaning" },
  { name: "Move-In Cleaning", link: "/services/move-in-out" },
  { name: "Move-Out Cleaning", link: "/services/move-in-out" },
  { name: "Furniture Cleaning", link: "/services/furniture" },
  { name: "Sofa Cleaning", link: "/services/furniture" },
  { name: "Mattress Cleaning", link: "/services/furniture" },
  { name: "Carpet Cleaning", link: "/services/furniture" },
  { name: "Window Cleaning", link: null },
  { name: "Floor Cleaning", link: null },
  { name: "Weekly Cleaning", link: null },
  { name: "Monthly Cleaning", link: null },
  { name: "Holiday Home Cleaning", link: null }
];

const whyChooseUs = [
  { icon: Clock, title: "Flexible booking options" },
  { icon: UserCheck, title: "Trained residential cleaning teams" },
  { icon: ClipboardList, title: "Customized cleaning plans" },
  { icon: Tag, title: "Transparent quotations" },
  { icon: Settings, title: "Professional cleaning equipment" },
  { icon: Sparkles, title: "Suitable cleaning products" },
  { icon: Building, title: "Apartment and villa expertise" },
  { icon: ShieldCheck, title: "Reliable customer support" },
  { icon: Home, title: "Residential-only cleaning specialists" },
  { icon: CalendarCheck, title: "Flexible scheduling throughout Dubai" }
];

const apartmentTypes = ["Studio", "1-Bedroom", "2-Bedroom", "3-Bedroom", "4-Bedroom", "Duplex", "Penthouse", "Furnished", "Unfurnished"];
const apartmentTasks = ["Dusting furniture", "Kitchen cleaning", "Bathroom cleaning", "Vacuuming", "Floor mopping", "Bed making", "Balcony cleaning", "Window cleaning (internal)", "Bin emptying", "Surface sanitization"];
const villaTasks = ["Regular villa cleaning", "Deep villa cleaning", "Weekly housekeeping", "Seasonal cleaning", "Pre-event cleaning", "Post-party cleaning", "Move-in cleaning", "Move-out cleaning"];
const houseTasks = ["Dust removal", "Kitchen cleaning", "Bathroom sanitization", "Bedroom cleaning", "Living room cleaning", "Floor care", "Vacuuming", "Mopping", "General tidying", "Bed making", "Waste disposal"];
const lifestyles = ["Working professionals", "Families with children", "Couples", "Senior residents", "Frequent travelers", "Holiday-home owners", "Landlords", "Property managers", "New homeowners", "Tenants"];

// --- Data Arrays for Part 2 ---
const roomCleaningDetails = [
  { 
    icon: ChefHat, title: "Kitchen Cleaning Services", subtitle: "The Heart of Every Home Deserves Professional Care",
    desc: "Daily cooking, food preparation, washing dishes, and constant use lead to grease buildup, food residue, fingerprints, spills, water spots, and dust accumulating on surfaces, cabinets, appliances, and floors. Routine wiping helps maintain appearances, but professional residential kitchen cleaning focuses on cleaning areas that often receive less attention during everyday housekeeping.",
    tasks: ["Countertops", "Cabinet exteriors", "Backsplash surfaces", "Sinks", "Polishing faucets", "Stovetop surfaces", "Appliance exteriors", "Dining tables", "Dusting shelves", "Sweeping/Vacuuming", "Mopping floors", "Emptying waste bins"],
    note: "For customers requiring more detailed kitchen care, our", linkText: "Deep Cleaning Service", linkPath: "/services/deep-cleaning", noteEnd: "can include internal cabinets, ovens, refrigerators, extractor hoods, and other detailed cleaning tasks."
  },
  { 
    icon: Bath, title: "Bathroom Cleaning Services", subtitle: "Maintaining One of the Most Frequently Used Rooms",
    desc: "Bathrooms require consistent attention because they are exposed to moisture, soap residue, hard water, daily use, and humidity. Professional residential bathroom cleaning focuses on maintaining cleanliness while improving the appearance of fixtures, fittings, and surfaces. Bathrooms with multiple users may require more frequent maintenance than guest bathrooms.",
    tasks: ["Toilet cleaning", "Washbasin cleaning", "Bathtub cleaning", "Shower cleaning", "Mirror cleaning", "Countertop cleaning", "Faucet polishing", "Tile wiping", "Glass partition cleaning", "Floor cleaning", "Waste bin emptying", "Vent cover dusting"],
    note: "Households with children often experience higher bathroom usage. Regular cleaning helps reduce the buildup of soap residue, toothpaste, water spots, and everyday dirt.",
    linkText: null, linkPath: null, noteEnd: null
  },
  { 
    icon: BedDouble, title: "Bedroom Cleaning Services", subtitle: "Creating a Comfortable Living Space",
    desc: "Bedrooms should provide a relaxing environment, yet they naturally collect dust, clothing fibers, personal belongings, and airborne particles over time. Customers who require wardrobe organization or detailed closet cleaning should mention this during booking, as these tasks may require additional time.",
    tasks: ["Dusting bedside tables", "Cleaning accessible furniture", "Making beds", "Changing bed linen (customer supplied)", "Cleaning mirrors", "Dusting shelves", "Vacuuming carpets", "Sweeping floors", "Mopping suitable flooring", "Emptying bins", "Light organization of visible items"],
    note: "For children's bedrooms, parents may request cleaners to prioritize floor cleaning, toy organization, dust removal, bed making, waste disposal, and study desk cleaning. Personal documents, schoolwork, and electronics remain under the family's supervision.",
    linkText: null, linkPath: null, noteEnd: null
  },
  { 
    icon: Sofa, title: "Living Room Cleaning", subtitle: "Keeping Your Main Living Area Looking Its Best",
    desc: "The living room is where families relax, entertain guests, and spend much of their time together. Over time, sofas, tables, shelves, entertainment units, rugs, and decorative surfaces accumulate dust, fingerprints, and everyday household dirt.",
    tasks: ["Dusting furniture", "Wiping tables", "Cleaning TV units", "Cleaning mirrors", "Dusting shelves", "Arranging cushions", "Vacuuming rugs", "Sweeping floors", "Mopping hard flooring", "Cleaning accessible glass surfaces", "Emptying waste bins"],
    note: "Specialist upholstery, sofa shampooing, curtain cleaning, or carpet extraction should be booked separately through our", linkText: "Furniture Cleaning Service", linkPath: "/services/furniture", noteEnd: "."
  },
  { 
    icon: Utensils, title: "Dining Room Cleaning", subtitle: "A Clean Space for Every Meal",
    desc: "Dining areas receive regular use and often collect food crumbs, fingerprints, spills, and dust.",
    tasks: ["Cleaning dining tables", "Wiping dining chairs", "Dusting decorative furniture", "Cleaning accessible cabinets", "Vacuuming", "Sweeping", "Floor mopping", "Cleaning mirrors", "Removing visible marks from accessible surfaces"],
    note: "For upholstered dining chairs requiring shampooing or stain treatment, specialist upholstery cleaning may be recommended.", linkText: null, linkPath: null, noteEnd: null
  },
  { 
    icon: Wind, title: "Balcony Cleaning", subtitle: "Refreshing Outdoor Residential Spaces",
    desc: "Balconies in Dubai are regularly exposed to dust, sand, wind, outdoor debris, rain residue, plant soil, and bird activity. Customers living in apartments should ensure balcony access is safe before cleaning begins.",
    tasks: ["Sweeping", "Mopping", "Dust removal", "Cleaning balcony railings", "Wiping accessible furniture", "Cleaning floor surfaces", "Removing loose debris"],
    note: "Exterior building glass, façade cleaning, rope access, pressure washing, and high-rise exterior work are not included within standard residential cleaning services.", linkText: null, linkPath: null, noteEnd: null
  }
];

const householdTasks = [
  { icon: WashingMachine, title: "Laundry Assistance", desc: "Many customers combine cleaning appointments with basic laundry assistance. Customers should clearly explain detergent preferences, temperature settings, delicate garments, color separation, and dry-clean-only clothing.", tasks: ["Loading washing machines", "Sorting laundry", "Hanging clothes to dry", "Folding dry clothes", "Organizing laundry baskets"] },
  { icon: Shirt, title: "Ironing Services", desc: "Ironing can be included as one of the household tasks during your booked appointment. The amount completed depends upon the number of garments, fabric type, available time, and garment complexity.", tasks: ["Working iron (provided by customer)", "Ironing board", "Suitable electrical outlet", "Hangers if required"] },
  { icon: SprayCan, title: "Floor Cleaning", desc: "Different flooring materials require different cleaning methods. We clean ceramic tile, porcelain, marble, granite, vinyl, laminate, hardwood, engineered wood, and stone flooring.", tasks: ["Sweeping", "Vacuuming", "Damp mopping", "Spot cleaning", "Edge cleaning where accessible"] },
  { icon: Scan, title: "Vacuuming Services", desc: "Vacuuming helps remove loose dust, hair, crumbs, and debris. It is often the first step before mopping hard floors. Homes with pets may require more detailed vacuuming due to fur accumulation.", tasks: ["Carpets & Rugs", "Bedrooms & Living rooms", "Hallways & Layers", "Under accessible furniture", "Entrance areas"] },
  { icon: Droplets, title: "Mopping Services", desc: "Following vacuuming or sweeping, suitable floors may be mopped using appropriate cleaning products. Our cleaners select products appropriate for the flooring material whenever possible.", tasks: ["Surface dust removal", "Light dirt removal", "Footprints", "Everyday marks", "Minor spills"] },
  { icon: Sparkles, title: "Dusting Services", desc: "Dubai's environment naturally leads to frequent dust accumulation inside homes due to fine desert sand, air conditioning, and regular indoor living.", tasks: ["Shelves & Tables", "Cabinets & TV units", "Window sills", "Decorative items", "Accessible light fixtures", "Skirting boards (time permitting)"] },
  { icon: PanelTop, title: "Mirror Cleaning", desc: "Mirrors throughout the home can collect fingerprints, water spots, and dust. Large decorative mirrors should be securely mounted before cleaning begins.", tasks: ["Bathroom mirrors", "Bedroom mirrors", "Hallway mirrors", "Decorative mirrors", "Dressing mirrors"] },
  { icon: Wind, title: "Internal Window Cleaning", desc: "Natural light helps homes feel larger, brighter, and more inviting. Our residential window cleaning focuses on accessible interior glass. Exterior high-rise window cleaning requires specialist equipment.", tasks: ["Interior glass cleaning", "Window frame wiping", "Window sill cleaning", "Track cleaning (light maintenance)", "Removing fingerprints"] },
  { icon: DoorOpen, title: "Doors & Handles", desc: "Frequently touched surfaces may be wiped as part of routine residential cleaning where included in the customer's priorities.", tasks: ["Interior doors", "Door handles", "Light switches", "Cabinet handles"] },
  { icon: Layers, title: "Staircase Cleaning", desc: "Townhouses and villas often include staircases that collect dust along the edges and high-traffic areas. Large staircases may require additional appointment time.", tasks: ["Sweeping", "Vacuuming", "Mopping", "Handrail wiping", "Accessible skirting cleaning"] }
];

const scheduleOptions = [
  { icon: CalendarDays, title: "Weekly Residential Cleaning", desc: "Helps maintain consistently clean living spaces while reducing the need for frequent intensive cleaning. Many families find weekly cleaning easier to maintain than occasional large cleaning sessions.", tasks: ["Kitchens & Bathrooms", "Floors & Bedrooms", "Living rooms & Dusting", "Vacuuming & Mopping", "Bed making & Bin emptying"] },
  { icon: CalendarRange, title: "Bi-Weekly Cleaning", desc: "Some households prefer cleaning every two weeks. This schedule balances convenience with regular home maintenance.", tasks: ["Couples & Professionals", "Smaller apartments", "Homes with lower occupancy", "Frequent travelers"] },
  { icon: Calendar, title: "Monthly Residential Cleaning", desc: "Refreshing your home each month. Monthly appointments can be combined with occasional deep cleaning to maintain the property's overall condition.", tasks: ["Holiday homes & Guest properties", "Low-occupancy homes", "Investment properties", "Residents who perform routine cleaning themselves"] },
  { icon: Sun, title: "Seasonal Residential Cleaning", desc: "Preparing your home for every season. Seasonal appointments often involve more detailed work than routine weekly cleaning.", tasks: ["Before Ramadan & Eid", "Before holidays & family gatherings", "After long vacations", "Before moving furniture or welcoming guests"] }
];

const finalChecklist = {
  "Living Areas": ["Dust furniture", "Vacuum carpets", "Mop floors", "Clean mirrors", "Empty bins"],
  "Kitchen": ["Countertops", "Sink", "Appliance exteriors", "Cabinet exteriors", "Floor cleaning"],
  "Bathrooms": ["Toilet", "Shower", "Basin", "Mirrors", "Floor"],
  "Bedrooms": ["Dusting", "Bed making", "Vacuuming", "Floor mopping", "Bin emptying"]
};

// --- Data Arrays for Part 3 ---
const specializedServices = [
  { icon: Sparkles, title: "Deep Cleaning Services", desc: "When routine cleaning isn't enough. Intensive cleaning for areas cleaned less frequently like behind furniture, skirting boards, internal cabinets, and detailed fixtures.", link: "/services/deep-cleaning", linkText: "Book Deep Cleaning" },
  { icon: Truck, title: "Move-In Cleaning", desc: "Begin life in a freshly cleaned home. Prepares living spaces before occupancy, focusing on floors, cabinets, wardrobes, and accessible fixtures.", link: "/services/move-in-out", linkText: "Book Move-In Cleaning" },
  { icon: Home, title: "Move-Out Cleaning", desc: "Leave your property looking its best. Improves presentation for handover by removing accumulated dust and cleaning empty rooms.", link: "/services/move-in-out", linkText: "Book Move-Out Cleaning" },
  { icon: Sofa, title: "Furniture Cleaning", desc: "Refresh your home's soft furnishings. Specialist cleaning for sofas, mattresses, carpets, rugs, and curtains based on fabric type.", link: "/services/furniture", linkText: "Book Furniture Cleaning" }
];

const kitchenDeepTasks = ["Internal cabinets", "Internal drawers", "Oven cleaning", "Refrigerator cleaning", "Extractor hood cleaning", "Tile degreasing", "Splashback cleaning", "Sink detailing", "Appliance detailing", "Floor scrubbing"];
const bathroomDeepTasks = ["Shower detailing", "Bathtub cleaning", "Toilet cleaning", "Tile cleaning", "Grout cleaning", "Glass partition cleaning", "Mirror polishing", "Faucet detailing", "Cabinet cleaning", "Floor scrubbing"];

const situationalCleaning = [
  { icon: Home, title: "Holiday Home Cleaning", desc: "Professional cleaning between guest stays. Includes general cleaning, bed making, bathroom/kitchen cleaning, and property presentation." },
  { icon: Building, title: "Airbnb Cleaning Services", desc: "Reliable turnover cleaning for short-term rentals. Includes linen changes, restocking supplies, and waste removal." },
  { icon: HardHat, title: "Post-Renovation Cleaning", desc: "Remove construction dust before moving back in. Focuses on dust removal, surface wiping, and comprehensive floor care." },
  { icon: PartyPopper, title: "Cleaning Before Events", desc: "Preparing your home for weddings, Eid, Ramadan, or family gatherings to create a welcoming environment." },
  { icon: Users, title: "Cleaning After Parties", desc: "Restoring order after entertaining guests. Addresses food spills, beverage spills, disposable waste, and heavy kitchen use." }
];

const demographicCleaning = [
  { icon: Users, title: "Cleaning for Families", desc: "Supporting busy family homes with children, pets, and frequent cooking. Regular cleaning frees up time for work and family." },
  { icon: Briefcase, title: "Cleaning for Professionals", desc: "Spend your time where it matters most. Flexible appointments help maintain comfort without sacrificing evenings or weekends." },
  { icon: ShieldCheck, title: "Cleaning for Seniors", desc: "Practical household support. Assistance with physically demanding tasks like vacuuming, floor cleaning, and bathroom maintenance." },
  { icon: PawPrint, title: "Pet-Friendly Cleaning", desc: "Cleaning homes with dogs and cats. Focus on pet hair, paw prints, food areas, sleeping areas, and odor management." },
  { icon: Baby, title: "Child-Friendly Cleaning", desc: "Creating a comfortable family environment. Maintaining play areas, bedrooms, kitchens, and identifying child-sensitive products." },
  { icon: Leaf, title: "Eco-Conscious Cleaning", desc: "Using suitable low-odor or environmentally conscious products where available. (Avoiding unsupported 'chemical-free' claims)." }
];

const processSteps = [
  { title: "Property Assessment", desc: "Before cleaning begins, we review property type, number of rooms, cleaning priorities, access arrangements, pets, delicate surfaces, required services, and booking duration." },
  { title: "Preparing Equipment", desc: "Our team arrives with the agreed cleaning materials and equipment, or uses the customer's supplies if that option has been selected." },
  { title: "Room-by-Room Cleaning", desc: "Rather than moving randomly, cleaning follows an organized approach room by room to maintain consistency and reduce overlooking key areas." },
  { title: "Detailed Surface Cleaning", desc: "Each room receives attention based on the agreed checklist: dusting, vacuuming, sweeping, mopping, kitchen, bathroom, mirrors, bins, and organization." },
  { title: "Final Review", desc: "Where practical, customers are encouraged to review the completed work before the team leaves. Reasonable concerns are addressed immediately." }
];

const residentialBenefits = ["Cleaner living spaces", "More organized homes", "Reduced household dust", "More free time", "Flexible scheduling", "Improved presentation before guests", "Support for busy lifestyles", "Customized cleaning plans", "Consistent home maintenance", "Convenient recurring service"];

const dubaiClimateFactors = ["Fine desert dust", "Air-conditioning residue", "Sand carried indoors", "Humidity in bathrooms", "High-traffic family living", "Frequent entertaining", "Holiday-home turnover", "Busy work schedules"];

// --- Data Arrays for Part 4 ---
const communityCategories = [
  { title: "Central Dubai", areas: ["Downtown Dubai", "Business Bay", "DIFC", "City Walk", "Dubai Design District (d3)", "Mohammed Bin Rashid City", "Meydan"] },
  { title: "Coastal Communities", areas: ["Dubai Marina", "Jumeirah Beach Residence (JBR)", "Bluewaters Island", "Palm Jumeirah", "Dubai Harbour"] },
  { title: "Jumeirah Communities", areas: ["Jumeirah 1", "Jumeirah 2", "Jumeirah 3", "Umm Suqeim", "Al Wasl", "Al Safa"] },
  { title: "Family Communities", areas: ["Arabian Ranches", "Arabian Ranches 2", "Arabian Ranches 3", "Dubai Hills Estate", "Emirates Hills", "The Springs", "The Meadows", "The Lakes", "Green Community"] },
  { title: "Growing Residential Areas", areas: ["Jumeirah Village Circle (JVC)", "Jumeirah Village Triangle (JVT)", "Al Furjan", "Discovery Gardens", "The Gardens", "Town Square Dubai", "DAMAC Hills", "DAMAC Hills 2", "Mudon", "Tilal Al Ghaf", "Motor City", "Dubai Sports City", "Remraam"] },
  { title: "Established Neighborhoods", areas: ["Al Barsha", "Mirdif", "Al Nahda", "Al Karama", "Bur Dubai", "Deira", "Nad Al Sheba", "Dubai Silicon Oasis", "Dubai Festival City", "Dubai Creek Harbour", "Dubai South"] }
];

const rightServiceTypes = [
  { title: "Routine Residential Cleaning", desc: "Best for weekly maintenance, families, busy professionals, apartments, villas, and regular housekeeping.", link: null },
  { title: "Deep Cleaning", desc: "Best for seasonal cleaning, homes needing detailed attention, preparing for guests, or long periods without professional cleaning.", link: "/services/deep-cleaning" },
  { title: "Move-In Cleaning", desc: "Recommended before occupying a new home.", link: "/services/move-in-out" },
  { title: "Move-Out Cleaning", desc: "Suitable when vacating a property or preparing it for new occupants.", link: "/services/move-in-out" },
  { title: "Furniture Cleaning", desc: "Recommended for sofas, mattresses, carpets, curtains, rugs, and upholstered furniture.", link: "/services/furniture" }
];

const costFactors = ["Property type", "Number of bedrooms", "Number of bathrooms", "Property size", "Required cleaning hours", "One-time or recurring service", "Number of cleaners", "Cleaning materials", "Specialist equipment", "Property condition", "Weekend or public holiday scheduling", "Add-on services"];
const pricingTransparency = ["Hourly or fixed pricing", "Minimum booking duration", "Additional service charges", "Cancellation policy", "Rescheduling policy", "Payment methods", "VAT treatment (where applicable)"];

const preparationChecklist = ["Securing valuables and important documents", "Providing clear building access instructions", "Identifying delicate surfaces or special materials", "Informing the team about pets", "Listing priority tasks", "Ensuring water and electricity are available", "Providing cleaning products if you selected a service without supplied materials", "Removing unnecessary clutter from work areas"];

const homeownerBenefits = ["Save time", "Keep their homes organized", "Maintain a consistent cleaning routine", "Prepare for visitors", "Reduce household workload", "Manage busy family schedules", "Support rental-property upkeep", "Maintain apartments and villas between deep cleans"];

const faqs = [
  { q: "What is included in residential cleaning?", a: "Routine residential cleaning typically includes dusting, vacuuming, mopping, kitchen cleaning, bathroom cleaning, bedroom cleaning, living area cleaning, and general household tidying. The exact tasks depend on the service booked." },
  { q: "Do I need to be at home during the appointment?", a: "Not necessarily. Some customers remain at home, while others arrange authorized access according to the company's procedures." },
  { q: "Can I book recurring residential cleaning?", a: "Yes, many customers choose weekly, fortnightly, or monthly schedules, subject to availability." },
  { q: "Do you clean apartments and villas?", a: "Yes. Residential cleaning can be tailored for studios, apartments, villas, townhouses, duplexes, and penthouses." },
  { q: "Are cleaning materials included?", a: "This depends on the package selected. Some bookings include standard cleaning supplies, while others use products provided by the customer." },
  { q: "Can I request specific tasks?", a: "Yes. Customers are encouraged to identify priority rooms and tasks before cleaning begins." },
  { q: "Is deep cleaning included in regular residential cleaning?", a: "No. Deep cleaning is a separate service intended for more detailed work." },
  { q: "Can I combine multiple services?", a: "Yes. Customers often combine residential cleaning with deep cleaning, furniture cleaning, or move-in/move-out cleaning where appropriate." },
  { q: "Do you clean furnished and unfurnished properties?", a: "Yes. Both can be cleaned, though the scope of work differs depending on whether furniture is present." },
  { q: "How many cleaners will I need?", a: "This depends on the property's size, condition, and the time available. Larger homes may benefit from multiple cleaners." },
  { q: "Can you clean after renovations?", a: "Yes, if post-renovation cleaning is offered. The required scope should be discussed before booking." },
  { q: "Do you clean holiday homes?", a: "Yes, subject to the services your company provides and scheduling availability." },
  { q: "Can I change or cancel my booking?", a: "Bookings may generally be changed or cancelled according to the company's cancellation and rescheduling policy." },
  { q: "Are weekend appointments available?", a: "Weekend availability depends on staffing and scheduling." },
  { q: "Can you guarantee every stain will be removed?", a: "No. Permanent staining, material damage, discoloration, or wear may remain despite professional cleaning." },
  { q: "Do you move heavy furniture?", a: "Routine residential cleaning does not generally include moving heavy furniture unless agreed in advance and it can be done safely." },
  { q: "Do you clean balconies?", a: "Yes, where they are safely accessible and included in the booked service." },
  { q: "Do you clean windows?", a: "Routine residential cleaning generally includes accessible interior glass. Exterior high-rise window cleaning requires specialist equipment." },
  { q: "What if I have pets?", a: "Please let us know in advance so appropriate arrangements can be made." },
  { q: "Do you provide same-day appointments?", a: "Same-day availability depends on scheduling and location." },
  { q: "Can I book evening cleaning?", a: "Availability varies by schedule and operating hours." },
  { q: "Do you provide office cleaning?", a: "Commercial premises should be booked through our Commercial Cleaning service." },
  { q: "Can I request the same cleaner?", a: "Requests can usually be noted, but availability cannot be guaranteed unless your business specifically offers this arrangement." },
  { q: "Is residential cleaning suitable for elderly homeowners?", a: "Many older residents appreciate assistance with routine household cleaning, though cleaning services should not be presented as medical or personal care." },
  { q: "Do you provide childcare?", a: "No. Child supervision should be booked through a dedicated babysitting service where available." }
];


const HERO_IMAGE =
  "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1800&q=85";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Residential() {
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
        <title>Residential Cleaning Services Dubai | Apartment & Villa Cleaning</title>
        <meta
          name="description"
          content="Professional residential cleaning services in Dubai for apartments, villas, townhouses, and family homes. Book routine cleaning, deep cleaning, move-in/move-out cleaning, and housekeeping tailored to your schedule."
        />
      </Helmet>

      <section className="relative isolate min-h-[650px] overflow-hidden bg-sky-50">
        <img
          src={HERO_IMAGE}
          alt="Professional residential cleaning services in a Dubai home"
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/55 via-slate-900/20 to-transparent" />

        <div className="container relative mx-auto flex min-h-[650px] items-end px-5 pb-14 pt-28 sm:px-6 md:items-center md:pb-20">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.55 }}
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
              Flexible home cleaning across Dubai
            </span>

            <h1 className="max-w-4xl font-display text-4xl font-bold leading-tight text-white drop-shadow-sm sm:text-5xl md:text-6xl">
              Professional Residential Cleaning Services in Dubai
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-7 text-white drop-shadow-sm sm:text-lg">
              A clean, comfortable, and well-maintained home contributes to a
              more enjoyable living environment. Our residential cleaning
              services help homeowners, tenants, landlords, and property
              managers maintain welcoming living spaces through flexible
              cleaning plans tailored to each property.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/booking"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-crystal-500 px-7 py-3.5 font-bold text-white transition hover:-translate-y-0.5 hover:bg-crystal-600"
              >
                Book Residential Cleaning
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/quote"
                className="inline-flex items-center justify-center rounded-full border border-white/50 bg-white/15 px-7 py-3.5 font-bold text-white backdrop-blur transition hover:bg-white/25"
              >
                Request a Free Quote
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 -mt-7 px-5 sm:px-6">
        <div className="container mx-auto grid max-w-6xl gap-4 rounded-3xl border border-gray-100 bg-white p-4 shadow-xl sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.slice(0, 4).map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="rounded-2xl bg-gray-50 p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-crystal-100 text-crystal-600">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-4 font-bold text-gray-900">{item.title}</h2>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container mx-auto max-w-6xl px-5 sm:px-6">
          <motion.div {...revealProps} className="mx-auto max-w-4xl text-center">
            <Eyebrow>Homes of every size</Eyebrow>
            <h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">
              Residential Cleaning Designed Around Your Property
            </h2>
            <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg">
              Whether you live in a compact studio apartment, spacious
              penthouse, townhouse, holiday home, or family villa, the service
              can be adjusted according to your schedule, lifestyle, property
              size, and cleaning priorities.
            </p>
          </motion.div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {propertyTypes.map((type) => (
              <span
                key={type}
                className="rounded-full border border-crystal-100 bg-crystal-50 px-4 py-2 text-sm font-semibold text-crystal-800"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="container mx-auto max-w-6xl px-5 sm:px-6">
          <div className="text-center">
            <Eyebrow>Flexible service options</Eyebrow>
            <h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">
              Complete Residential Cleaning Solutions
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-7 text-gray-600">
              Every home has different needs depending on layout, occupancy,
              pets, flooring, furniture, and everyday use.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cleaningSolutions.map((solution) =>
              solution.link ? (
                <Link
                  key={solution.name}
                  to={solution.link}
                  className="group flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-5 text-sm font-semibold text-gray-700 shadow-sm transition hover:-translate-y-0.5 hover:border-crystal-200 hover:shadow-md"
                >
                  {solution.name}
                  <ArrowRight className="h-4 w-4 text-crystal-500 transition-transform group-hover:translate-x-1" />
                </Link>
              ) : (
                <div
                  key={solution.name}
                  className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-5"
                >
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-crystal-500" />
                  <span className="text-sm font-semibold leading-6 text-gray-700">
                    {solution.name}
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container mx-auto grid max-w-6xl gap-8 px-5 sm:px-6 lg:grid-cols-2">
          <PropertyPanel
            icon={Building}
            title="Apartment Cleaning Services Dubai"
            description="Apartments have their own layouts, access rules, parking arrangements, and service-elevator requirements."
            tags={apartmentTypes}
            tasks={apartmentTasks}
          />
          <PropertyPanel
            icon={Home}
            title="Villa Cleaning Services Dubai"
            description="Villas often include several bedrooms, bathrooms, staircases, balconies, entrances, utility rooms, and multiple living areas."
            tasks={villaTasks}
          />
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="container mx-auto grid max-w-6xl gap-6 px-5 sm:px-6 lg:grid-cols-2">
          <SimpleChecklistCard
            title="House Cleaning Services"
            description="Regular house cleaning helps maintain comfort and the overall appearance of your living space."
            items={houseTasks}
          />
          <SimpleChecklistCard
            title="Studio Apartment Cleaning"
            description="Compact properties benefit from efficient, regular maintenance that prevents dust and clutter from accumulating."
            items={[
              "Dusting all accessible surfaces",
              "Cleaning the kitchenette",
              "Bathroom cleaning",
              "Vacuuming",
              "Floor mopping",
              "Mirror cleaning",
              "Bed making",
              "Bin emptying",
              "Light organization",
            ]}
          />
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container mx-auto max-w-6xl px-5 sm:px-6">
          <div className="text-center">
            <Eyebrow>Detailed room care</Eyebrow>
            <h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">
              Detailed Room-by-Room Cleaning
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-7 text-gray-600">
              Every room has unique cleaning requirements. We tailor the
              checklist so each area receives appropriate attention.
            </p>
          </div>

          <div className="mt-12 space-y-6">
            {roomCleaningDetails.map((room) => {
              const Icon = room.icon;
              return (
                <article
                  key={room.title}
                  className="grid gap-8 rounded-[2rem] border border-gray-100 bg-gray-50 p-7 lg:grid-cols-[1.05fr_0.95fr]"
                >
                  <div>
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-crystal-100 text-crystal-600">
                        <Icon className="h-7 w-7" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{room.title}</h3>
                        <p className="mt-1 text-sm font-semibold text-crystal-700">
                          {room.subtitle}
                        </p>
                      </div>
                    </div>
                    <p className="mt-6 leading-7 text-gray-600">{room.desc}</p>
                    <div className="mt-6 rounded-2xl bg-blue-50 p-4 text-sm leading-6 text-blue-800">
                      {room.note}{" "}
                      {room.linkText && room.linkPath && (
                        <Link to={room.linkPath} className="font-bold underline">
                          {room.linkText}
                        </Link>
                      )}
                      {room.noteEnd ? ` ${room.noteEnd}` : ""}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white p-6 shadow-sm">
                    <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-gray-500">
                      Tasks may include
                    </h4>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {room.tasks.map((task) => (
                        <div key={task} className="flex items-start gap-2 text-sm leading-6 text-gray-700">
                          <CheckCircle className="mt-1 h-4 w-4 shrink-0 text-crystal-500" />
                          {task}
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <CardGridSection
        eyebrow="Everyday household support"
        title="Household Tasks & Floor Care"
        description="Beyond room cleaning, appointments may include selected household chores, floor care, and detailed dusting."
        items={householdTasks}
        background="bg-gray-50"
      />

      <CardGridSection
        eyebrow="Choose a suitable routine"
        title="Flexible Cleaning Schedules"
        description="Select a weekly, fortnightly, monthly, or seasonal schedule that fits your household."
        items={scheduleOptions}
        background="bg-white"
        columns="lg:grid-cols-4"
      />

      <section className="bg-gray-50 py-20">
        <div className="container mx-auto max-w-5xl px-5 sm:px-6">
          <div className="text-center">
            <Eyebrow>Typical coverage</Eyebrow>
            <h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">
              Residential Cleaning Checklist
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-7 text-gray-600">
              Every booking is customized, but a standard checklist may include
              these common household tasks.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(finalChecklist).map(([room, tasks]) => (
              <article key={room} className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                <h3 className="font-bold text-gray-900">{room}</h3>
                <div className="mt-5 space-y-3">
                  {tasks.map((task) => (
                    <div key={task} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      {task}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CardGridSection
        eyebrow="For more detailed needs"
        title="Specialized Residential Cleaning Services"
        description="Some properties and situations require a more intensive or specialist approach."
        items={specializedServices}
        background="bg-white"
        columns="lg:grid-cols-4"
        linked
      />

      <section className="bg-gray-50 py-20">
        <div className="container mx-auto grid max-w-6xl gap-6 px-5 sm:px-6 lg:grid-cols-2">
          <DeepCleanPanel
            icon={ChefHat}
            title="Kitchen Deep Cleaning"
            description="Routine cleaning maintains everyday cleanliness, while deep cleaning focuses on areas requiring more detailed attention."
            items={kitchenDeepTasks}
          />
          <DeepCleanPanel
            icon={Bath}
            title="Bathroom Deep Cleaning"
            description="Bathrooms experience constant moisture, soap residue, and daily use, so occasional detailed cleaning can be useful."
            items={bathroomDeepTasks}
            note="Permanent discoloration, damaged grout, or worn sealant may remain after cleaning."
          />
        </div>
      </section>

      <CardGridSection
        eyebrow="Support for different occasions"
        title="Cleaning for Every Situation"
        description="From holiday-home turnover to post-renovation dust removal, services can be adapted to the occasion."
        items={situationalCleaning}
        background="bg-white"
      />

      <CardGridSection
        eyebrow="Built around your household"
        title="Tailored to Your Lifestyle"
        description="Cleaning plans can reflect your family, schedule, pets, and preferences."
        items={demographicCleaning}
        background="bg-gray-50"
      />

      <section className="bg-white py-20">
        <div className="container mx-auto max-w-5xl px-5 sm:px-6">
          <div className="text-center">
            <Eyebrow>Five organized stages</Eyebrow>
            <h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">
              Our Residential Cleaning Process
            </h2>
          </div>

          <div className="mt-12 space-y-4">
            {processSteps.map((step, index) => (
              <article
                key={step.title}
                className="grid gap-4 rounded-3xl border border-gray-100 bg-gray-50 p-6 sm:grid-cols-[auto_1fr]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-crystal-500 font-bold text-white">
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

      <section className="bg-gray-50 py-20">
        <div className="container mx-auto grid max-w-6xl gap-8 px-5 sm:px-6 lg:grid-cols-2">
          <InfoGrid
            icon={ListChecks}
            title="Benefits of Professional Residential Cleaning"
            intro="Regular residential cleaning can provide practical household benefits."
            items={residentialBenefits}
          />
          <InfoGrid
            icon={Wind}
            title="Cleaning for Dubai Living"
            intro="Dubai homes face environmental and lifestyle factors that can increase cleaning needs."
            items={dubaiClimateFactors}
          />
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container mx-auto max-w-6xl px-5 sm:px-6">
          <div className="text-center">
            <Eyebrow>Residential coverage</Eyebrow>
            <h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">
              Residential Cleaning Across Dubai
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {communityCategories.map((category) => (
              <article key={category.title} className="rounded-3xl border border-gray-100 bg-gray-50 p-6">
                <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {category.areas.map((area) => (
                    <span key={area} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-gray-600">
                      <MapPin className="h-3 w-3 text-crystal-500" />
                      {area}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="container mx-auto grid max-w-6xl gap-8 px-5 sm:px-6 lg:grid-cols-2">
          <InfoGrid
            icon={Sparkles}
            title="Choosing the Right Residential Service"
            intro="Different situations are best served by different cleaning options."
            items={rightServiceTypes.map((item) => item.title)}
          />
          <InfoGrid
            icon={Home}
            title="What Influences Residential Cleaning Cost?"
            intro="Pricing can vary according to property and service requirements."
            items={costFactors}
          />
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container mx-auto grid max-w-6xl gap-8 px-5 sm:px-6 lg:grid-cols-2">
          <InfoGrid
            icon={CheckCircle}
            title="Preparing Your Home"
            intro="A little preparation can help cleaners use the booked time efficiently."
            items={preparationChecklist}
          />
          <InfoGrid
            icon={Home}
            title="Why Homeowners Book Regular Cleaning"
            intro="Recurring cleaning helps households maintain a manageable routine."
            items={homeownerBenefits}
          />
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="container mx-auto max-w-3xl px-5 sm:px-6">
          <div className="text-center">
            <Eyebrow>Helpful answers</Eyebrow>
            <h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">
              Residential Cleaning FAQs
            </h2>
          </div>

          <div className="mt-10 space-y-3">
            {faqs.map((faq, index) => {
              const open = openFaq === index;
              const panelId = `residential-faq-panel-${index}`;
              const buttonId = `residential-faq-button-${index}`;

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

      <RelatedServices intro="Add occasional intensive cleaning to your home routine, or arrange flexible ongoing household help." services={[
        { title: "Deep Cleaning", description: "Target built-up dirt and hard-to-reach areas with a detailed top-to-bottom service.", to: "/deep-cleaning-services-dubai", linkText: "Visit deep cleaning" },
        { title: "Maid Services", description: "Book flexible hourly or recurring household cleaning for your apartment or villa.", to: "/maid-services-dubai", linkText: "Visit maid services" },
      ]} />

      <section className="bg-white px-5 py-10 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-crystal-600 via-crystal-700 to-gray-950 px-6 py-12 text-center shadow-2xl sm:px-10 md:py-16">
            <Home className="absolute -bottom-16 -right-10 h-64 w-64 rotate-12 text-white/[0.05]" />
            <div className="relative mx-auto max-w-3xl">
              <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
                Book Professional Residential Cleaning in Dubai
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-crystal-100 sm:text-lg">
                Share your location, property type, preferred schedule, and
                priority tasks, and we&apos;ll help you choose the residential
                cleaning option that best matches your needs.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  to="/booking"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-bold text-crystal-700 transition hover:-translate-y-0.5 hover:bg-crystal-50"
                >
                  Book Residential Cleaning
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/quote"
                  className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-7 py-3.5 font-bold text-white transition hover:bg-white/15"
                >
                  Request a Free Quote
                </Link>
                <a
                  href="https://wa.me/971552488588"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-3.5 font-bold text-white transition hover:bg-white/15"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp Us
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

function PropertyPanel({ icon: Icon, title, description, tags = [], tasks }) {
  return (
    <article className="rounded-[2rem] border border-gray-100 bg-gray-50 p-7">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-crystal-100 text-crystal-600">
        <Icon className="h-7 w-7" />
      </div>
      <h2 className="mt-6 font-display text-3xl font-bold text-gray-900">{title}</h2>
      <p className="mt-4 leading-7 text-gray-600">{description}</p>
      {tags.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-gray-600">
              {tag}
            </span>
          ))}
        </div>
      )}
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {tasks.map((task) => (
          <div key={task} className="flex items-start gap-2 text-sm leading-6 text-gray-700">
            <CheckCircle className="mt-1 h-4 w-4 shrink-0 text-crystal-500" />
            {task}
          </div>
        ))}
      </div>
    </article>
  );
}

function SimpleChecklistCard({ title, description, items }) {
  return (
    <article className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm">
      <h2 className="font-display text-3xl font-bold text-gray-900">{title}</h2>
      <p className="mt-4 leading-7 text-gray-600">{description}</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-2 text-sm leading-6 text-gray-700">
            <CheckCircle className="mt-1 h-4 w-4 shrink-0 text-crystal-500" />
            {item}
          </div>
        ))}
      </div>
    </article>
  );
}

function CardGridSection({
  eyebrow,
  title,
  description,
  items,
  background,
  columns = "lg:grid-cols-3",
  linked = false,
}) {
  return (
    <section className={`${background} py-20`}>
      <div className="container mx-auto max-w-6xl px-5 sm:px-6">
        <div className="text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">{title}</h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-7 text-gray-600">{description}</p>
        </div>

        <div className={`mt-12 grid gap-6 sm:grid-cols-2 ${columns}`}>
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="flex flex-col rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-crystal-100 text-crystal-600">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-gray-900">{item.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-gray-600">{item.desc}</p>
                {item.tasks && (
                  <div className="mt-5 space-y-2 border-t border-gray-100 pt-5">
                    {item.tasks.map((task) => (
                      <div key={task} className="flex items-start gap-2 text-xs leading-5 text-gray-600">
                        <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-crystal-500" />
                        {task}
                      </div>
                    ))}
                  </div>
                )}
                {linked && item.link && (
                  <Link
                    to={item.link}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-crystal-600"
                  >
                    {item.linkText}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DeepCleanPanel({ icon: Icon, title, description, items, note }) {
  return (
    <article className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-crystal-100 text-crystal-600">
        <Icon className="h-7 w-7" />
      </div>
      <h2 className="mt-6 font-display text-3xl font-bold text-gray-900">{title}</h2>
      <p className="mt-4 leading-7 text-gray-600">{description}</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-2 text-sm leading-6 text-gray-700">
            <CheckCircle className="mt-1 h-4 w-4 shrink-0 text-crystal-500" />
            {item}
          </div>
        ))}
      </div>
      {note && <p className="mt-5 text-xs leading-5 text-gray-500">{note}</p>}
    </article>
  );
}

function InfoGrid({ icon: Icon, title, intro, items }) {
  return (
    <article className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-sm">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-crystal-100 text-crystal-600">
        <Icon className="h-7 w-7" />
      </div>
      <h2 className="mt-6 font-display text-3xl font-bold text-gray-900">{title}</h2>
      <p className="mt-4 leading-7 text-gray-600">{intro}</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-2 text-sm leading-6 text-gray-700">
            <CheckCircle className="mt-1 h-4 w-4 shrink-0 text-crystal-500" />
            {item}
          </div>
        ))}
      </div>
    </article>
  );
}
