import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, CheckCircle, CalendarCheck, Building, Store, Utensils, Dumbbell, Scissors, Stethoscope, GraduationCap, Warehouse, ClipboardList, Tag, Settings, UserCheck, Clock, ShieldCheck, MapPin, ArrowRight, ChevronDown, Briefcase, Home, Sparkles, Truck, Sofa, Baby, Users, Coffee, Wind, Droplets, SprayCan, Scan, XCircle, ListChecks, Minus, Plus, ShoppingCart} from 'lucide-react';
import { useCart } from '../../context/CartContext';

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

export default function Commercial() {
  const { addToCart } = useCart();
  const [hours, setHours] = useState(2);
  const [crew, setCrew] = useState(1);
  const [materials, setMaterials] = useState(false);
  const [added, setAdded] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const getRate = (h) => {
    if (h === 2) return 40;
    if (h > 2 && h < 4) return 35;
    return 30; // 4 or more hours
  };
  
  const ratePerHour = getRate(hours);
  const materialsFee = materials ? 20 : 0;
  const totalAmount = (hours * crew * ratePerHour) + materialsFee;

  const handleAddToCart = () => {
    addToCart({ service: 'Commercial Cleaning', hours, crew, ratePerHour, materials, totalAmount });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const scrollToPicker = () => document.getElementById('booking-picker').scrollIntoView({ behavior: 'smooth', block: 'center' });

  return (
    <div className="pt-20 pb-32 bg-white min-h-screen">
      <Helmet>
        <title>Commercial Cleaning Services Dubai | Office & Business Cleaning</title>
        <meta name="description" content="Professional commercial cleaning services in Dubai for offices, retail stores, clinics, schools, warehouses, restaurants, hotels, gyms, and business premises. Flexible daily, weekly, and scheduled cleaning solutions." />
        <meta name="keywords" content="Commercial Cleaning Services Dubai, Office Cleaning Dubai, Office Cleaners Dubai, Commercial Cleaners Dubai, Business Cleaning Services Dubai, Corporate Cleaning Dubai, Commercial Cleaning Company Dubai, Daily Office Cleaning Dubai, Retail Cleaning Dubai, Restaurant Cleaning Dubai, Hotel Cleaning Dubai, Clinic Cleaning Dubai, School Cleaning Dubai, Warehouse Cleaning Dubai, Commercial Property Cleaning Dubai" />
      </Helmet>

      {/* Hero Section */}
      <div className="relative h-[500px] w-full overflow-hidden">
        <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" alt="Commercial cleaning services Dubai office" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-orange-900/95 via-orange-900/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/services" className="inline-flex items-center text-orange-300 mb-4 hover:text-white transition"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Services</Link>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-4 max-w-4xl">Professional Cleaning Solutions for Offices, Retail & Businesses in Dubai</h1>
            <p className="text-lg text-gray-200 mb-8 max-w-3xl">A clean commercial environment creates a positive first impression, supports daily business operations, and helps maintain a comfortable workplace for employees, customers, visitors, and tenants. Our Commercial Cleaning Services in Dubai are designed to support businesses of different sizes and industries with flexible cleaning solutions tailored to their premises, operating hours, and business requirements.</p>
            <button onClick={scrollToPicker} className="flex items-center bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition shadow-lg font-bold">
              <CalendarCheck className="w-5 h-5 mr-2" /> Build Your Cleaning Plan
            </button>
          </motion.div>
        </div>
      </div>

      {/* Intro & Properties Served */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto text-center mb-16">
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Dubai's fast-paced business environment means commercial spaces experience continuous foot traffic, daily operations, meetings, customer visits, deliveries, and shared workspace usage. Without a structured cleaning routine, dust, dirt, fingerprints, spills, and general wear can quickly affect the appearance and functionality of a workplace.
            </p>
            <h2 className="text-2xl font-display font-bold text-gray-800 mb-6">We provide commercial cleaning for:</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {businessTypes.map((type, i) => (
                <span key={i} className="bg-orange-50 text-orange-700 px-4 py-2 rounded-full text-sm font-medium border border-orange-100">{type}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Complete Solutions & Why It Matters */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-4">Complete Commercial Cleaning Solutions</motion.h2>
            <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg text-gray-600 max-w-3xl mx-auto">Commercial cleaning extends beyond routine dusting and floor care. Different industries require different cleaning schedules, procedures, and priorities. We customize commercial cleaning plans instead of relying on a one-size-fits-all approach.</motion.p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
            {solutions.map((solution, i) => (
              <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center">
                <CheckCircle className="w-4 h-4 text-orange-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700 text-sm font-medium">{solution}</span>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center bg-white p-8 rounded-3xl border border-gray-100">
            <div>
              <h3 className="text-2xl font-display font-bold text-gray-800 mb-4">Why Professional Commercial Cleaning Matters</h3>
              <p className="text-gray-600 mb-4">A commercial property is often the first physical interaction customers have with a business. Clean surroundings contribute to a more professional appearance and support a pleasant experience for employees and visitors alike.</p>
              <p className="text-gray-600">The exact cleaning schedule should be based on occupancy levels, business activity, and the property's operational requirements.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {["Present a professional image", "Maintain organized workspaces", "Improve customer experience", "Support employee comfort", "Keep shared facilities tidy", "Reduce everyday dust", "Maintain flooring/furnishings", "Support facility management"].map((b, i) => (
                <div key={i} className="flex items-center bg-orange-50 p-3 rounded-xl border border-orange-100">
                  <CheckCircle className="w-4 h-4 text-orange-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 text-xs font-medium">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Office Cleaning Breakdown */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-4">Office Cleaning Services Dubai</motion.h2>
            <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg text-gray-600 max-w-3xl mx-auto">Office environments experience continuous use throughout the working day. Routine office cleaning helps maintain an organized and welcoming workplace while supporting day-to-day business operations.</motion.p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {officeAreas.map((area, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <div className="bg-orange-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <area.icon className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{area.title}</h3>
                <p className="text-gray-600 text-sm">{area.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer-Facing & Hospitality */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-4">Customer-Facing & Hospitality Cleaning</motion.h2>
            <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg text-gray-600 max-w-3xl mx-auto">Businesses that regularly welcome customers benefit from consistent cleaning because visitors immediately notice the condition of the premises.</motion.p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {customerFacing.map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="bg-orange-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <c.icon className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{c.title}</h3>
                <p className="text-gray-600 text-sm">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialized Facilities */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-4">Healthcare, Education & Warehouse Cleaning</motion.h2>
            <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg text-gray-600 max-w-3xl mx-auto">Different industries require different cleaning schedules, procedures, and priorities. We adapt our approach to fit your facility.</motion.p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specializedFacilities.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <div className="bg-orange-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <s.icon className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{s.title}</h3>
                <p className="text-gray-600 text-sm">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process & Quality */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-12">
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-4">Our Commercial Cleaning Process</motion.h2>
            <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg text-gray-600 max-w-3xl mx-auto">Consistency is important for commercial cleaning because businesses rely on predictable service. We follow a structured approach.</motion.p>
          </div>
          <div className="relative border-l-2 border-orange-100 ml-4 sm:ml-0 sm:border-0">
            {processSteps.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="mb-8 sm:grid sm:grid-cols-[auto_1fr] sm:gap-8 sm:items-center sm:text-left flex flex-col ml-6 sm:ml-0">
                <div className="flex items-center mb-2 sm:mb-0 sm:justify-center">
                  <div className="bg-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold z-10 absolute sm:relative -ml-12 sm:-ml-0">{i+1}</div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 mt-3 sm:mt-0">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Picker */}
      <div className="container mx-auto px-6 max-w-6xl mt-4 grid md:grid-cols-3 gap-12">
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="md:col-span-2">
          <h2 className="text-3xl font-display font-bold text-gray-800 mb-6">Build Your Commercial Cleaning Plan</h2>
          <p className="text-gray-600 mb-8">Select the number of hours and cleaners required. Minimum booking is 2 hours. Choose whether you need us to bring cleaning materials.</p>
          
          <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hours (Min 2, Max 8)</label>
                <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-200">
                  <button onClick={() => setHours(Math.max(2, hours - 1))} className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"><Minus className="w-4 h-4" /></button>
                  <span className="text-lg font-bold text-gray-800">{hours} Hours</span>
                  <button onClick={() => setHours(Math.min(8, hours + 1))} className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"><Plus className="w-4 h-4" /></button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cleaners (Max 10)</label>
                <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-200">
                  <button onClick={() => setCrew(Math.max(1, crew - 1))} className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"><Minus className="w-4 h-4" /></button>
                  <span className="text-lg font-bold text-gray-800">{crew} Cleaner{crew > 1 ? 's' : ''}</span>
                  <button onClick={() => setCrew(Math.min(10, crew + 1))} className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"><Plus className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Bring Cleaning Materials? (+20 AED)</label>
              <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={() => setMaterials(true)} className={`p-3 rounded-xl border-2 font-medium text-sm transition ${materials ? 'border-orange-500 bg-white text-orange-600' : 'border-gray-200 bg-white text-gray-500'}`}>Yes, Bring Materials</button>
                <button type="button" onClick={() => setMaterials(false)} className={`p-3 rounded-xl border-2 font-medium text-sm transition ${!materials ? 'border-orange-500 bg-white text-orange-600' : 'border-gray-200 bg-white text-gray-500'}`}>No, I Have Them</button>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div id="booking-picker" initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-8 scroll-mt-24">
          <div className="bg-orange-50 p-8 rounded-3xl border border-orange-100 sticky top-24">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Booking Summary</h3>
            <div className="bg-white p-4 rounded-xl mb-6 text-sm text-gray-600 space-y-1">
              <p>Rate: <span className="font-bold text-orange-600">{ratePerHour} AED/hour</span></p>
              <p>Service: {hours}h × {crew} cleaner = {hours * crew * ratePerHour} AED</p>
              {materials && <p>Materials: +20 AED</p>}
              <p className="text-lg font-bold text-gray-800 mt-2 pt-2 border-t border-gray-100">Total: {totalAmount} AED</p>
            </div>
            <button onClick={handleAddToCart} className={`w-full flex items-center justify-center py-4 rounded-xl transition font-bold text-lg shadow-lg ${added ? 'bg-green-500 text-white' : 'bg-orange-500 text-white hover:bg-orange-600'}`}>
              {added ? 'Added to Cart!' : (<><ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart</>)}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Areas Served */}
      <section className="py-20 bg-white mt-16">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-4">Commercial Cleaning Across Dubai</motion.h2>
          <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">We provide commercial cleaning services across many of Dubai's major business districts, commercial developments, retail centres, industrial zones, and mixed-use communities.</motion.p>
          <div className="flex flex-wrap justify-center gap-3">
            {dubaiAreas.map((area, i) => (
              <span key={i} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium flex items-center"><MapPin className="w-3 h-3 mr-2 text-orange-500" />{area}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing & Preparation */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl grid lg:grid-cols-2 gap-12">
          
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-display font-bold text-gray-800 mb-6">Commercial Cleaning Pricing Guide</h2>
            <h3 className="text-xl font-bold text-gray-800 mb-4">What Influences the Cost?</h3>
            <p className="text-gray-600 mb-4">Commercial cleaning costs depend on several factors rather than a single fixed rate. Pricing may be influenced by:</p>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {pricingFactors.map((item, i) => (
                <div key={i} className="flex items-center bg-white p-3 rounded-xl border border-gray-100">
                  <CheckCircle className="w-4 h-4 text-orange-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 text-xs font-medium">{item}</span>
                </div>
              ))}
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Transparent Pricing</h3>
            <p className="text-gray-600 mb-4">Before confirming a quotation, customers should understand:</p>
            <ul className="space-y-2">
              {pricingTransparency.map((item, i) => (
                <li key={i} className="flex items-center text-gray-700"><CheckCircle className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" /> {item}</li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white p-8 rounded-3xl border border-gray-100">
            <h2 className="text-3xl font-display font-bold text-gray-800 mb-6">Preparing Your Business Before Cleaning</h2>
            <p className="text-gray-600 mb-6">To help the cleaning team work efficiently, businesses can prepare by:</p>
            <ul className="space-y-4">
              {preparationChecklist.map((item, i) => (
                <li key={i} className="flex items-start text-gray-700">
                  <div className="bg-gray-50 p-1 rounded-full shadow-sm mr-4 flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-500 mt-6 italic">Advance preparation reduces delays and allows more time for cleaning.</p>
          </motion.div>
        </div>
      </section>

      {/* Why Businesses Invest */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-6">Why Businesses Choose Professional Commercial Cleaning</motion.h2>
          <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">Businesses invest in commercial cleaning because it helps them maintain professional premises while supporting day-to-day operations. Professional cleaning should be viewed as part of a broader facility management strategy.</motion.p>
          <div className="flex flex-wrap justify-center gap-4">
            {businessBenefits.map((benefit, i) => (
              <span key={i} className="bg-gray-50 text-gray-700 px-5 py-3 rounded-full text-sm font-medium shadow-sm border border-gray-100 flex items-center">
                <Sparkles className="w-4 h-4 text-orange-500 mr-2" /> {benefit}
              </span>
            ))}
          </div>
          
          <div className="mt-12 bg-blue-50 text-blue-800 p-4 rounded-xl text-sm max-w-2xl mx-auto">
            <p className="font-bold mb-2">Related Services:</p>
            <p>For residential properties, visit our <Link to="/services/residential" className="underline font-semibold">Residential Cleaning</Link>. For intensive detail, book our <Link to="/services/deep-cleaning" className="underline font-semibold">Deep Cleaning</Link>. For carpets and sofas, book <Link to="/services/furniture" className="underline font-semibold">Furniture Cleaning</Link>. For recurring home help, book our <Link to="/services/maid-services" className="underline font-semibold">Maid Services</Link>.</p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 mt-4">Commercial Cleaning FAQs</p>
          </motion.div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex justify-between items-center p-6 text-left">
                  <h3 className="text-base font-semibold text-gray-800">{faq.q}</h3>
                  <ChevronDown className={`w-5 h-5 text-orange-500 transition-transform flex-shrink-0 ml-4 ${openFaq === i ? 'rotate-180' : ''}`} />
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
          <div className="bg-gradient-to-br from-orange-600 to-orange-800 rounded-[3rem] p-12 md:p-16 text-center shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Professional Commercial Cleaning Solutions for Businesses Across Dubai</h2>
            <p className="text-orange-100 text-lg mb-8 max-w-2xl mx-auto">Whether you manage a corporate office, retail store, restaurant, clinic, warehouse, educational facility, or commercial building, our cleaning services can be tailored to your business operations, property type, and preferred schedule. Share your business location, property details, cleaning frequency, and service priorities, and we'll recommend a commercial cleaning plan that supports your workplace.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/quote" className="bg-white text-orange-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition shadow-lg">
                Request a Commercial Cleaning Quote
              </Link>
              <Link to="/booking" className="border-2 border-white/50 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition">
                Schedule a Site Visit
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}