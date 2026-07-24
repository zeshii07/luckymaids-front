import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, CheckCircle, CalendarCheck, Home, Building, Sparkles,  Truck, Briefcase, UserCheck, Clock, ShieldCheck, MapPin, ArrowRight, ChevronDown, ClipboardList, Tag, Settings, ChefHat, Bath, BedDouble, Sofa, Utensils, Wind, WashingMachine, Shirt, SprayCan, Scan, Droplets, PanelTop, DoorOpen, Layers, CalendarDays, CalendarRange, Calendar, Sun, HardHat, PartyPopper, Users, PawPrint, Baby, Leaf, Wind as WindIcon, ListChecks, MessageCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';

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

export default function Residential() {
  const { addToCart } = useCart();
  const [hours, setHours] = useState(2);
  const [crew, setCrew] = useState(1);
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="pt-20 pb-32 bg-white min-h-screen">
      <Helmet>
        <title>Residential Cleaning Services Dubai | Apartment & Villa Cleaning</title>
        <meta name="description" content="Professional residential cleaning services in Dubai for apartments, villas, townhouses, and family homes. Book routine cleaning, deep cleaning, move-in/move-out cleaning, and housekeeping tailored to your schedule." />
        <meta name="keywords" content="Residential Cleaning Services Dubai, Home Cleaning Services Dubai, House Cleaning Dubai, Residential Cleaners Dubai, Home Cleaning Company Dubai, Apartment Cleaning Dubai, Villa Cleaning Dubai, Weekly Home Cleaning Dubai, Monthly Home Cleaning Dubai, Family Home Cleaning Dubai, Holiday Home Cleaning Dubai" />
      </Helmet>

      {/* Hero Section */}
      <div className="relative h-[500px] w-full overflow-hidden">
        <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" alt="Residential cleaning services in Dubai apartment" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 pt-28">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/services" className="inline-flex items-center text-crystal-300 mb-4 hover:text-white transition"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Services</Link>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-4 max-w-4xl">Professional Residential Cleaning Services in Dubai</h1>
            <p className="text-lg text-gray-200 mb-8 max-w-3xl">A clean, comfortable, and well-maintained home contributes to a healthier and more enjoyable living environment. Yet with demanding work schedules, family commitments, travel, and daily responsibilities, keeping every room consistently clean can be difficult. Our Residential Cleaning Services in Dubai are designed to help homeowners, tenants, landlords, and property managers maintain clean and welcoming living spaces through flexible, high-quality cleaning solutions tailored to each property's needs.</p>
          </motion.div>
        </div>
      </div>

      {/* Introduction & Property Types */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto text-center mb-16">
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Whether you live in a compact studio apartment in Dubai Marina, a spacious penthouse in Downtown Dubai, or a luxury villa in Arabian Ranches, our residential cleaning services can be customized according to your schedule, lifestyle, property size, and cleaning priorities. Dust, sand, humidity, cooking residue, and everyday use gradually affect every part of a home—from kitchens and bathrooms to bedrooms, living areas, furniture, and flooring.
            </p>
            <h2 className="text-2xl font-display font-bold text-gray-800 mb-6">We provide cleaning services for:</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {propertyTypes.map((type, i) => (
                <span key={i} className="bg-crystal-50 text-crystal-700 px-4 py-2 rounded-full text-sm font-medium border border-crystal-100">{type}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Complete Residential Cleaning Solutions (With Internal Links) */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-4">Complete Residential Cleaning Solutions</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Residential cleaning is more than simply dusting furniture or mopping floors. Every home has unique cleaning requirements depending on its size, layout, occupancy, pets, children, flooring materials, furniture, and daily use. Instead of offering a one-size-fits-all solution, we customize each service around your property and priorities.</p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cleaningSolutions.map((solution, i) => (
              solution.link ? (
                <Link key={i} to={solution.link} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-crystal-300 hover:shadow-md transition flex items-center justify-between group">
                  <span className="text-gray-700 text-sm font-medium">{solution.name}</span>
                  <ArrowRight className="w-4 h-4 text-crystal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ) : (
                <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center">
                  <CheckCircle className="w-4 h-4 text-crystal-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 text-sm font-medium">{solution.name}</span>
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us (E-E-A-T Focus) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-4">Why Choose Our Residential Cleaning Services?</motion.h2>
            <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg text-gray-600 max-w-3xl mx-auto">Choosing a professional residential cleaning company is about more than convenience. It is about trusting experienced professionals to care for your home while delivering consistent results. Every property is different, which is why we begin by understanding your home, priorities, and expectations before recommending the most suitable cleaning solution.</motion.p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {whyChooseUs.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center flex flex-col items-center justify-center">
                <item.icon className="w-8 h-8 text-crystal-500 mb-3" />
                <span className="text-gray-700 text-xs font-medium">{item.title}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Apartment & Villa Cleaning Split */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl grid md:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <Building className="w-12 h-12 text-crystal-500 mb-4" />
            <h2 className="text-3xl font-display font-bold text-gray-800 mb-4">Apartment Cleaning Services Dubai</h2>
            <p className="text-gray-600 mb-6">Apartments are among the most common residential properties in Dubai, and each building has its own layout, access rules, parking arrangements, and service-elevator requirements.</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {apartmentTypes.map((type, i) => (
                <span key={i} className="bg-white text-gray-700 px-3 py-1 rounded-full text-xs font-medium border border-gray-200">{type}</span>
              ))}
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-3">Apartment cleaning may include:</h3>
            <ul className="grid grid-cols-2 gap-2">
              {apartmentTasks.map((task, i) => (
                <li key={i} className="flex items-center text-gray-700 text-sm"><CheckCircle className="w-4 h-4 text-crystal-500 mr-2 flex-shrink-0" /> {task}</li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <Home className="w-12 h-12 text-crystal-500 mb-4" />
            <h2 className="text-3xl font-display font-bold text-gray-800 mb-4">Villa Cleaning Services Dubai</h2>
            <p className="text-gray-600 mb-6">Villa cleaning generally requires a larger scope because villas often include multiple bedrooms, several bathrooms, staircases, balconies, outdoor entrances, maid's rooms, utility rooms, and multiple living spaces. Our villa cleaning services are tailored to each property's size and layout.</p>
            <h3 className="text-lg font-bold text-gray-800 mb-3">Depending on your requirements, we can provide:</h3>
            <ul className="grid grid-cols-2 gap-2">
              {villaTasks.map((task, i) => (
                <li key={i} className="flex items-center text-gray-700 text-sm"><CheckCircle className="w-4 h-4 text-crystal-500 mr-2 flex-shrink-0" /> {task}</li>
              ))}
            </ul>
            <p className="text-sm text-gray-500 mt-4">For larger villas, we may recommend multiple cleaners or extended appointment times to ensure every room receives the attention it needs.</p>
          </motion.div>
        </div>
      </section>

      {/* House Cleaning & Studio */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl grid md:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
            <h2 className="text-2xl font-display font-bold text-gray-800 mb-4">House Cleaning Services</h2>
            <p className="text-gray-600 mb-4">Whether you own your home or rent your property, regular house cleaning helps maintain cleanliness, comfort, and the overall appearance of your living space.</p>
            <h3 className="text-lg font-bold text-gray-800 mb-3">Routine house cleaning may include:</h3>
            <ul className="grid grid-cols-2 gap-2">
              {houseTasks.map((task, i) => (
                <li key={i} className="flex items-center text-gray-700 text-sm"><CheckCircle className="w-4 h-4 text-crystal-500 mr-2 flex-shrink-0" /> {task}</li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
            <h2 className="text-2xl font-display font-bold text-gray-800 mb-4">Studio Apartment Cleaning</h2>
            <p className="text-gray-600 mb-4">Studio apartments require efficient cleaning that makes the best use of limited space. Compact properties benefit from regular maintenance, helping prevent dust and clutter from accumulating.</p>
            <h3 className="text-lg font-bold text-gray-800 mb-3">Typical studio cleaning includes:</h3>
            <ul className="grid grid-cols-2 gap-2">
              {["Dusting all accessible surfaces", "Cleaning the kitchenette", "Bathroom cleaning", "Vacuuming", "Floor mopping", "Mirror cleaning", "Bed making", "Bin emptying", "Light organization"].map((task, i) => (
                <li key={i} className="flex items-center text-gray-700 text-sm"><CheckCircle className="w-4 h-4 text-crystal-500 mr-2 flex-shrink-0" /> {task}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Tailored to Lifestyle */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-6">Home Cleaning Tailored to Your Lifestyle</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">Every family uses their home differently. Some households need weekly maintenance, while others prefer monthly visits combined with occasional deep cleaning. We create flexible residential cleaning plans for:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {lifestyles.map((life, i) => (
                <span key={i} className="bg-white text-gray-700 px-4 py-2 rounded-full text-sm font-medium shadow-sm border border-gray-100">{life}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================= */}
      {/* PART 2 CONTENT */}
      {/* ========================================= */}

      {/* Room-by-Room Deep Dive */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-4">Detailed Room-by-Room Cleaning</motion.h2>
            <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg text-gray-600 max-w-3xl mx-auto">Every room in your home has unique cleaning requirements. We tailor our approach to ensure each space receives the specific care it needs.</motion.p>
          </div>

          <div className="space-y-12">
            {roomCleaningDetails.map((room, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`grid md:grid-cols-2 gap-8 items-center bg-gray-50 p-8 rounded-3xl border border-gray-100 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className={i % 2 !== 0 ? 'md:order-2' : ''}>
                  <div className="flex items-center mb-4">
                    <div className="bg-crystal-100 w-14 h-14 rounded-2xl flex items-center justify-center mr-4">
                      <room.icon className="w-7 h-7 text-crystal-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">{room.title}</h3>
                      <p className="text-sm text-crystal-600 font-medium">{room.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6">{room.desc}</p>
                  
                  <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-sm">
                    {room.note} 
                    {room.linkText && room.linkPath && (
                      <Link to={room.linkPath} className="font-bold underline hover:text-blue-900">{room.linkText}</Link>
                    )}
                    {room.noteEnd && ` ${room.noteEnd}`}
                  </div>
                </div>

                <div className={`${i % 2 !== 0 ? 'md:order-1' : ''} bg-white p-6 rounded-2xl shadow-sm`}>
                  <h4 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wider">Tasks May Include:</h4>
                  <ul className="grid grid-cols-2 gap-3">
                    {room.tasks.map((task, idx) => (
                      <li key={idx} className="flex items-start text-gray-700 text-sm">
                        <CheckCircle className="w-4 h-4 text-crystal-500 mr-2 flex-shrink-0 mt-0.5" /> {task}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Household Tasks Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-4">Household Tasks & Floor Care</motion.h2>
            <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg text-gray-600 max-w-3xl mx-auto">Beyond standard room cleaning, we offer assistance with everyday household chores, comprehensive floor care, and detailed dusting services.</motion.p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {householdTasks.map((task, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <task.icon className="w-8 h-8 text-crystal-500 mr-3" />
                  <h3 className="text-lg font-bold text-gray-800">{task.title}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">{task.desc}</p>
                <ul className="space-y-2 border-t border-gray-100 pt-4">
                  {task.tasks.map((t, idx) => (
                    <li key={idx} className="flex items-center text-gray-700 text-xs">
                      <CheckCircle className="w-3 h-3 text-crystal-400 mr-2 flex-shrink-0" /> {t}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cleaning Frequencies & Schedules */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-4">Flexible Cleaning Schedules</motion.h2>
            <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg text-gray-600 max-w-3xl mx-auto">Whether you need weekly maintenance or a seasonal refresh, we offer scheduling options that fit your lifestyle and household routine.</motion.p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {scheduleOptions.map((opt, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-gray-50 p-6 rounded-3xl border border-gray-100 flex flex-col">
                <div className="bg-crystal-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <opt.icon className="w-6 h-6 text-crystal-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">{opt.title}</h3>
                <p className="text-gray-600 text-sm mb-4 flex-grow">{opt.desc}</p>
                <div className="border-t border-gray-200 pt-4 mt-auto">
                  <ul className="space-y-2">
                    {opt.tasks.map((t, idx) => (
                      <li key={idx} className="flex items-center text-gray-700 text-xs">
                        <CheckCircle className="w-3 h-3 text-crystal-500 mr-2 flex-shrink-0" /> {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Standard Checklist Visual */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-12">
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-4">Residential Cleaning Checklist</motion.h2>
            <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg text-gray-600 max-w-3xl mx-auto">Although every booking is customized, a standard residential cleaning checklist may include the following tasks. Customers can adjust the checklist according to their own priorities.</motion.p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Object.entries(finalChecklist).map(([room, tasks], i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-md font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">{room}</h3>
                <ul className="space-y-2">
                  {tasks.map((t, idx) => (
                    <li key={idx} className="flex items-center text-gray-600 text-xs">
                      <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" /> {t}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================= */}
      {/* PART 3 CONTENT */}
      {/* ========================================= */}

      {/* Specialized Residential Services (Deep, Move, Furniture) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-4">Specialized Residential Cleaning Services</motion.h2>
            <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg text-gray-600 max-w-3xl mx-auto">While routine cleaning maintains everyday cleanliness, some situations require a more intensive or specialized approach.</motion.p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {specializedServices.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-gray-50 p-8 rounded-3xl border border-gray-100 flex flex-col">
                <div className="bg-crystal-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                  <s.icon className="w-7 h-7 text-crystal-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{s.title}</h3>
                <p className="text-gray-600 text-sm mb-6 flex-grow">{s.desc}</p>
                <Link to={s.link} className="text-crystal-600 font-semibold text-sm flex items-center hover:underline mt-auto">
                  {s.linkText} <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Kitchen & Bathroom Deep Clean */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl grid md:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <ChefHat className="w-12 h-12 text-crystal-500 mb-4" />
            <h3 className="text-2xl font-display font-bold text-gray-800 mb-3">Kitchen Deep Cleaning</h3>
            <p className="text-gray-600 mb-6">Routine kitchen cleaning maintains everyday cleanliness, while kitchen deep cleaning focuses on areas requiring more detailed attention.</p>
            <ul className="grid grid-cols-2 gap-3">
              {kitchenDeepTasks.map((task, i) => (
                <li key={i} className="flex items-start text-gray-700 text-sm"><CheckCircle className="w-4 h-4 text-crystal-500 mr-2 flex-shrink-0 mt-0.5" /> {task}</li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <Bath className="w-12 h-12 text-crystal-500 mb-4" />
            <h3 className="text-2xl font-display font-bold text-gray-800 mb-3">Bathroom Deep Cleaning</h3>
            <p className="text-gray-600 mb-6">Refresh bathrooms beyond routine maintenance. Bathrooms experience constant exposure to moisture, soap residue, and everyday use.</p>
            <ul className="grid grid-cols-2 gap-3">
              {bathroomDeepTasks.map((task, i) => (
                <li key={i} className="flex items-start text-gray-700 text-sm"><CheckCircle className="w-4 h-4 text-crystal-500 mr-2 flex-shrink-0 mt-0.5" /> {task}</li>
              ))}
            </ul>
            <p className="text-xs text-gray-500 mt-4">* Permanent discoloration, damaged grout, or worn sealant may remain after cleaning.</p>
          </motion.div>
        </div>
      </section>

      {/* Situational Cleaning Use Cases */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-4">Cleaning for Every Situation</motion.h2>
            <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg text-gray-600 max-w-3xl mx-auto">From holiday homes to post-renovation dust removal, we tailor our services to fit your specific life events.</motion.p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {situationalCleaning.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <div className="bg-crystal-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <s.icon className="w-6 h-6 text-crystal-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{s.title}</h3>
                <p className="text-gray-600 text-sm">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demographic Specific Cleaning */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-4">Tailored to Your Household</motion.h2>
            <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg text-gray-600 max-w-3xl mx-auto">We adapt our cleaning approach to fit the unique needs of your family, lifestyle, and preferences.</motion.p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {demographicCleaning.map((d, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-start">
                <div className="bg-crystal-50 p-3 rounded-xl mr-4 mb-4 sm:mb-0 flex-shrink-0">
                  <d.icon className="w-6 h-6 text-crystal-600" />
                </div>
                <div>
                  <h3 className="text-md font-bold text-gray-800 mb-1">{d.title}</h3>
                  <p className="text-gray-600 text-sm">{d.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process Timeline */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-12">
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-4">Our Residential Cleaning Process</motion.h2>
            <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg text-gray-600 max-w-3xl mx-auto">We follow a structured, room-by-room approach to ensure consistency and high-quality results every time.</motion.p>
          </div>
          <div className="relative border-l-2 border-crystal-100 ml-4 sm:ml-0 sm:border-0">
            {processSteps.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="mb-8 sm:grid sm:grid-cols-[auto_1fr] sm:gap-8 sm:items-center sm:text-left flex flex-col ml-6 sm:ml-0">
                <div className="flex items-center mb-2 sm:mb-0 sm:justify-center">
                  <div className="bg-crystal-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold z-10 absolute sm:relative -ml-12 sm:-ml-0">{i+1}</div>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mt-3 sm:mt-0">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits & Dubai Climate */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <ListChecks className="w-12 h-12 text-crystal-500 mb-4" />
            <h2 className="text-3xl font-display font-bold text-gray-800 mb-6">Benefits of Professional Residential Cleaning</h2>
            <p className="text-gray-600 mb-8">Regular residential cleaning offers many practical advantages. While cleanliness contributes to comfort, we focus on tangible household improvements.</p>
            <div className="grid grid-cols-2 gap-4">
              {residentialBenefits.map((b, i) => (
                <div key={i} className="flex items-center bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 text-xs font-medium">{b}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-crystal-50 p-8 rounded-3xl border border-crystal-100">
            <WindIcon className="w-12 h-12 text-crystal-500 mb-4" />
            <h2 className="text-3xl font-display font-bold text-gray-800 mb-6">Why Dubai Residents Choose Us</h2>
            <p className="text-gray-600 mb-6">Dubai's unique climate presents ongoing cleaning challenges. Homes frequently experience specific environmental factors that require professional attention:</p>
            <ul className="space-y-3">
              {dubaiClimateFactors.map((f, i) => (
                <li key={i} className="flex items-center text-gray-700"><CheckCircle className="w-5 h-5 text-crystal-500 mr-3 flex-shrink-0" /> {f}</li>
              ))}
            </ul>
            <p className="text-sm text-gray-600 mt-6">Professional residential cleaning helps homeowners manage these conditions through structured and recurring cleaning routines tailored to Dubai living.</p>
          </motion.div>
        </div>
      </section>

      {/* ========================================= */}
      {/* PART 4 CONTENT STARTS HERE */}
      {/* ========================================= */}

      {/* Residential Cleaning Across Dubai */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-4">Residential Cleaning Across Dubai</motion.h2>
            <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg text-gray-600 max-w-3xl mx-auto">Professional Home Cleaning Near You. Our residential cleaning services are available across many of Dubai's residential communities. Whether you live in a modern apartment, a townhouse, or a spacious villa, we aim to provide flexible scheduling based on service availability.</motion.p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {communityCategories.map((cat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center"><MapPin className="w-5 h-5 text-crystal-500 mr-2" /> {cat.title}</h3>
                <ul className="space-y-2">
                  {cat.areas.map((area, idx) => (
                    <li key={idx} className="text-gray-600 text-sm flex items-center"><CheckCircle className="w-4 h-4 text-crystal-400 mr-2 flex-shrink-0" /> {area}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 mt-8">Service availability may vary depending on appointment schedules, travel time, staffing, and building access requirements.</p>
        </div>
      </section>

      {/* Choosing the Right Residential Cleaning Service */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-4">Choosing the Right Residential Cleaning Service</motion.h2>
            <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg text-gray-600 max-w-3xl mx-auto">Every home is different, so the right cleaning service depends on your property, lifestyle, and cleaning goals. Selecting the appropriate service ensures your booking is matched to the work required.</motion.p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rightServiceTypes.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col">
                <h3 className="text-xl font-bold text-gray-800 mb-3">{s.title}</h3>
                <p className="text-gray-600 text-sm mb-6 flex-grow">{s.desc}</p>
                {s.link && (
                  <Link to={s.link} className="text-crystal-600 font-semibold text-sm flex items-center hover:underline">
                    Learn More <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing & Preparation */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl grid lg:grid-cols-2 gap-12">
          
          {/* Pricing Guide */}
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-display font-bold text-gray-800 mb-6">Residential Cleaning Pricing Guide</h2>
            <h3 className="text-xl font-bold text-gray-800 mb-4">What Can Affect the Cost?</h3>
            <p className="text-gray-600 mb-4">Cleaning prices vary depending on several factors, including:</p>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {costFactors.map((item, i) => (
                <div key={i} className="flex items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <CheckCircle className="w-4 h-4 text-crystal-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 text-xs font-medium">{item}</span>
                </div>
              ))}
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Transparent Pricing</h3>
            <p className="text-gray-600 mb-4">Before confirming a booking, customers should understand:</p>
            <ul className="space-y-2">
              {pricingTransparency.map((item, i) => (
                <li key={i} className="flex items-center text-gray-700"><CheckCircle className="w-5 h-5 text-crystal-500 mr-3 flex-shrink-0" /> {item}</li>
              ))}
            </ul>
          </motion.div>

          {/* Preparation Checklist */}
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
            <h2 className="text-3xl font-display font-bold text-gray-800 mb-6">Preparing for Your Cleaning Appointment</h2>
            <p className="text-gray-600 mb-6">To help the cleaning team work efficiently, consider:</p>
            <ul className="space-y-4">
              {preparationChecklist.map((item, i) => (
                <li key={i} className="flex items-start text-gray-700">
                  <div className="bg-white p-1 rounded-full shadow-sm mr-4 flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-500 mt-6 italic">A little preparation allows more of the booked time to be spent on cleaning.</p>
          </motion.div>
        </div>
      </section>

      {/* Why Homeowners Choose Professional Residential Cleaning */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-6">Why Homeowners Choose Professional Residential Cleaning</motion.h2>
          <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">Professional residential cleaning offers practical benefits beyond appearance alone. A customized cleaning plan allows each household to focus on the rooms and tasks that matter most.</motion.p>
          <div className="flex flex-wrap justify-center gap-4">
            {homeownerBenefits.map((benefit, i) => (
              <span key={i} className="bg-white text-gray-700 px-5 py-3 rounded-full text-sm font-medium shadow-sm border border-gray-100 flex items-center">
                <Sparkles className="w-4 h-4 text-crystal-500 mr-2" /> {benefit}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 mt-4">Residential Cleaning FAQs</p>
          </motion.div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex justify-between items-center p-6 text-left">
                  <h3 className="text-base font-semibold text-gray-800">{faq.q}</h3>
                  <ChevronDown className={`w-5 h-5 text-crystal-500 transition-transform flex-shrink-0 ml-4 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <motion.div initial={{ height: 0, opacity: 0 }} animate={openFaq === i ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }} className="overflow-hidden">
                  <p className="p-6 pt-0 text-gray-600 text-sm">{faq.a}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-br from-crystal-600 to-crystal-800 rounded-[3rem] p-12 md:p-16 text-center shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Professional Residential Cleaning for Every Home in Dubai</h2>
            <p className="text-crystal-100 text-lg mb-8 max-w-2xl mx-auto">Whether you need regular housekeeping, detailed deep cleaning, move-in or move-out cleaning, or complete care for your apartment or villa, our residential cleaning services are designed to fit your schedule and your home's unique requirements. Tell us about your property, preferred cleaning schedule, and priority tasks, and we'll help you choose the residential cleaning solution that best matches your needs.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/booking" className="bg-white text-crystal-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition shadow-lg">
                Book Residential Cleaning
              </Link>
              <Link to="/quote" className="border-2 border-white/50 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition">
                Request a Free Quote
              </Link>
              <a href="https://wa.me/971501234567" target="_blank" rel="noreferrer" className="bg-green-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-green-600 transition shadow-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 mr-2" /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}