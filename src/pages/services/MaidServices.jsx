import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Minus, Plus, ShoppingCart, CalendarCheck, CheckCircle, XCircle, ChevronDown, Home, Clock, Calendar, Building, UserCheck, ShieldCheck, SprayCan, WashingMachine, Shirt, MapPin, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const customizationOptions = [
  "Property type", "Number of rooms", "Number of bathrooms", "Property size", 
  "Household occupancy", "Cleaning frequency", "Preferred days", "Required working hours", 
  "Cleaning-material requirements", "Priority tasks", "Pets in the property", "Special access instructions"
];

const serviceTypes = [
  { icon: Clock, title: "Hourly Maid Services", desc: "Book a cleaner for a defined number of hours with a prioritized task list. Ideal for busy professionals and short-term needs." },
  { icon: Calendar, title: "Part-Time & Weekly", desc: "Regular household support on selected days. Maintain your home consistently without a live-in arrangement." },
  { icon: CalendarCheck, title: "One-Time Cleaning", desc: "Cleaning help whenever you need it. Perfect for before guests arrive, after travel, or during busy work periods." }
];

const roomChecklists = [
  { title: "Living Room Cleaning", items: ["Dusting accessible furniture & TV units", "Wiping tables, shelves, and mirrors", "Vacuuming sofas externally & arranging cushions", "Vacuuming carpets & sweeping floors", "Mopping suitable flooring & emptying bins"] },
  { title: "Bedroom Cleaning", items: ["Making beds & changing provided bed linen", "Dusting bedside tables & accessible furniture", "Wiping wardrobe exteriors & door handles", "Vacuuming & mopping suitable floors", "Light organization of visible items"] },
  { title: "Kitchen Cleaning", items: ["Wiping countertops, sinks, and backsplash", "Polishing accessible faucets", "Wiping cooker & appliance exteriors", "Cleaning dining table & cabinet exteriors", "Loading/unloading dishwasher (if agreed)", "Sweeping & mopping flooring"] },
  { title: "Bathroom Cleaning", items: ["Cleaning toilet, washbasin, and mirrors", "Wiping countertops & cleaning shower surfaces", "Cleaning the bathtub & wiping accessible tiles", "Cleaning faucets & emptying bins", "Sweeping or vacuuming", "Mopping the floor"] }
];

const processSteps = [
  { title: "Select Your Service", desc: "Choose one-time, hourly, weekly, or recurring part-time cleaning, with or without materials." },
  { title: "Share Property Details", desc: "Provide location, property type, bedrooms, bathrooms, preferred date/time, required hours, priority tasks, and pet information." },
  { title: "Receive Booking Price", desc: "Quotation based on hours, cleaners, supplies, transportation, and frequency. Review total price and cancellation terms." },
  { title: "Prepare the Home", desc: "Put away valuables, secure cash, provide building access, ensure utilities are on, prepare materials if required, and secure pets." },
  { title: "Explain Priorities", desc: "Show rooms to clean, areas to avoid, products to use, laundry instructions, and expected completion order." },
  { title: "Review the Service", desc: "Review completed areas before the cleaner leaves. Raise reasonable service concerns promptly." }
];

const limitations = [
  "Childcare or unsupervised babysitting", "Elderly medical care or nursing", "Pest control or mold remediation", "High-rise exterior window cleaning", 
  "Heavy furniture moving", "Maintenance, electrical, or plumbing work", "Garden maintenance or pool cleaning", "Exterior pressure washing or AC-duct cleaning", 
  "Marble restoration or driving", "Unapproved cooking or work outside confirmed address"
];

const areasServed = [
  "Downtown Dubai", "Business Bay", "Dubai Marina", "Jumeirah Beach Residence", "Jumeirah Lake Towers", "Palm Jumeirah", "Dubai Harbour", "Bluewaters Island", "Jumeirah", "Umm Suqeim", "Al Safa", "Al Wasl", "Al Barsha", "Barsha Heights", "The Greens", "The Views", "Dubai Hills Estate", "Arabian Ranches", "Emirates Hills", "The Springs", "The Meadows", "The Lakes", "Jumeirah Village Circle", "Jumeirah Village Triangle", "Dubai Sports City", "Motor City", "Damac Hills", "Damac Hills 2", "Mudon", "Town Square Dubai", "Tilal Al Ghaf", "Dubai Silicon Oasis", "International City", "Mirdif", "Nad Al Sheba", "Meydan", "Mohammed Bin Rashid City", "Dubai Creek Harbour", "Dubai Festival City", "Al Furjan", "Discovery Gardens", "The Gardens", "Dubai South", "Al Nahda", "Deira", "Bur Dubai", "Al Karama"
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
  { q: "Do you clean offices?", a: "Routine office cleaning should be booked through the commercial-cleaning service so staffing, equipment, timing, and pricing can be planned properly." }
];

export default function MaidServices() {
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
    addToCart({ service: 'Maid Services', hours, crew, ratePerHour, materials, totalAmount });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const scrollToPicker = () => document.getElementById('booking-picker').scrollIntoView({ behavior: 'smooth', block: 'center' });

  return (
    <div className="pt-20 pb-32 bg-white min-h-screen">
      <Helmet>
        <title>Maid Services Dubai | Hourly & Part-Time Cleaners</title>
        <meta name="description" content="Book professional maid services in Dubai for hourly, part-time, weekly, and recurring home cleaning. Flexible housekeeping for apartments and villas, with or without cleaning materials." />
        <meta name="keywords" content="Maid services Dubai, Maid service Dubai, Maids in Dubai, Professional maid services Dubai, House maid services Dubai, Home maid service Dubai, Housekeeping services Dubai, Home cleaning maid Dubai, Hourly maid service Dubai, Part-time maid Dubai, Weekly maid service Dubai, Apartment maid service Dubai, Villa maid service Dubai, Maid for ironing Dubai, Laundry and ironing service Dubai" />
      </Helmet>

      {/* Hero Section */}
      <div className="relative h-[500px] w-full overflow-hidden">
        <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" alt="Professional maid services in Dubai" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-crystal-900/95 via-crystal-900/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 pt-28">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/services" className="inline-flex items-center text-crystal-300 mb-4 hover:text-white transition"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Services</Link>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-4 max-w-4xl">Professional Maid Services in Dubai</h1>
            <p className="text-lg text-gray-200 mb-8 max-w-3xl">Managing a clean and organized home takes time, energy, and consistent attention. Our professional maid services in Dubai provide flexible household cleaning support for apartments, villas, townhouses, penthouses, and holiday homes. Whether you need a maid for a few hours, a weekly home-cleaning appointment, or recurring housekeeping, our service can be arranged around your schedule.</p>
            <button onClick={scrollToPicker} className="flex items-center bg-crystal-500 text-white px-6 py-3 rounded-full hover:bg-crystal-600 transition shadow-lg font-bold">
              <CalendarCheck className="w-5 h-5 mr-2" /> Book a Maid
            </button>
          </motion.div>
        </div>
      </div>

      {/* Flexible Customization */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-4">Flexible Maid and Housekeeping Services</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Every household has a different schedule, layout, and cleaning routine. Rather than providing an identical service to every customer, we allow you to customize the service according to:</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {customizationOptions.map((item, i) => (
              <div key={i} className="flex items-center bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-100">
                <CheckCircle className="w-5 h-5 text-crystal-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700 text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Types */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {serviceTypes.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <div className="bg-crystal-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                  <s.icon className="w-7 h-7 text-crystal-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{s.title}</h3>
                <p className="text-gray-600 text-sm">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Apartment vs Villa */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl grid md:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <Building className="w-12 h-12 text-crystal-500 mb-4" />
            <h3 className="text-2xl font-display font-bold text-gray-800 mb-3">Apartment Maid Services</h3>
            <p className="text-gray-600 mb-4">We provide maid services for studios, 1 to 4-bedroom apartments, duplexes, penthouses, and serviced apartments. Cleaning includes routine care for bedrooms, living areas, bathrooms, kitchens, and balconies.</p>
            <p className="text-gray-600">Customers should provide necessary building access approvals, visitor registration, parking instructions, and service-elevator details to avoid delays.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <Home className="w-12 h-12 text-crystal-500 mb-4" />
            <h3 className="text-2xl font-display font-bold text-gray-800 mb-3">Villa Maid Services</h3>
            <p className="text-gray-600 mb-4">Villas normally require more time due to multiple bedrooms, several bathrooms, large kitchens, staircases, and outdoor patios. Depending on size, we may recommend a longer appointment or multiple cleaners.</p>
            <p className="text-gray-600">Routine maid service does not automatically include garden maintenance, swimming-pool cleaning, or exterior pressure washing.</p>
          </motion.div>
        </div>
      </section>

      {/* Room Checklists */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-4">What Is Included in Maid Services?</motion.h2>
            <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg text-gray-600 max-w-3xl mx-auto">The following tasks may be completed during a standard maid-service appointment, depending on the booked time and customer priorities.</motion.p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {roomChecklists.map((room, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-6">{room.title}</h3>
                <ul className="space-y-3">
                  {room.items.map((item, idx) => (
                    <li key={idx} className="flex items-start text-gray-700 text-sm"><CheckCircle className="w-4 h-4 text-crystal-500 mr-3 flex-shrink-0 mt-1" /> {item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Laundry & Materials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl grid md:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
            <div className="flex items-center mb-4">
              <WashingMachine className="w-10 h-10 text-crystal-500 mr-4" />
              <h3 className="text-2xl font-bold text-gray-800">Laundry & Ironing</h3>
            </div>
            <p className="text-gray-600 mb-4">Where agreed, a maid may help with sorting clothing, loading the washing machine, hanging clothes to dry, and folding laundry.</p>
            <p className="text-gray-600 mb-2">Ironing may be included as a priority task. Customers should provide:</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center"><Shirt className="w-4 h-4 text-crystal-500 mr-2" /> A functioning iron and safe ironing board</li>
              <li className="flex items-center"><Shirt className="w-4 h-4 text-crystal-500 mr-2" /> Hangers and clear garment instructions</li>
              <li className="flex items-center"><Shirt className="w-4 h-4 text-crystal-500 mr-2" /> A designated place for finished clothing</li>
            </ul>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
            <div className="flex items-center mb-4">
              <SprayCan className="w-10 h-10 text-crystal-500 mr-4" />
              <h3 className="text-2xl font-bold text-gray-800">Materials Options</h3>
            </div>
            <p className="text-gray-600 mb-4">Customers may choose a package that includes standard cleaning materials and tools, or request the cleaner to use supplies already available in the home.</p>
            <p className="text-gray-600 mb-2"><strong>With Materials:</strong> We provide multipurpose cleaner, glass cleaner, bathroom cleaner, microfiber cloths, mop, and vacuum (where included).</p>
            <p className="text-gray-600 text-sm mt-2">Special products for marble, wood, or delicate surfaces may not be included in a standard kit.</p>
          </motion.div>
        </div>
      </section>

      {/* Booking Picker */}
      <div className="container mx-auto px-6 max-w-6xl mt-4 grid md:grid-cols-3 gap-12">
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="md:col-span-2">
          <h2 className="text-3xl font-display font-bold text-gray-800 mb-6">Book Your Maid Service</h2>
          <p className="text-gray-600 mb-8">Select the number of hours and cleaners required. Minimum booking is 2 hours.</p>
          
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
                <button type="button" onClick={() => setMaterials(true)} className={`p-3 rounded-xl border-2 font-medium text-sm transition ${materials ? 'border-crystal-500 bg-white text-crystal-600' : 'border-gray-200 bg-white text-gray-500'}`}>Yes, Bring Materials</button>
                <button type="button" onClick={() => setMaterials(false)} className={`p-3 rounded-xl border-2 font-medium text-sm transition ${!materials ? 'border-crystal-500 bg-white text-crystal-600' : 'border-gray-200 bg-white text-gray-500'}`}>No, I Have Them</button>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div id="booking-picker" initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-8 scroll-mt-24">
          <div className="bg-crystal-50 p-8 rounded-3xl border border-crystal-100 sticky top-24">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Booking Summary</h3>
            <div className="bg-white p-4 rounded-xl mb-6 text-sm text-gray-600 space-y-1">
              <p>Rate: <span className="font-bold text-crystal-600">{ratePerHour} AED/hour</span></p>
              <p>Service: {hours}h × {crew} cleaner = {hours * crew * ratePerHour} AED</p>
              {materials && <p>Materials: +20 AED</p>}
              <p className="text-lg font-bold text-gray-800 mt-2 pt-2 border-t border-gray-100">Total: {totalAmount} AED</p>
            </div>
            <button onClick={handleAddToCart} className={`w-full flex items-center justify-center py-4 rounded-xl transition font-bold text-lg shadow-lg ${added ? 'bg-green-500 text-white' : 'bg-crystal-500 text-white hover:bg-crystal-600'}`}>
              {added ? 'Added to Cart!' : (<><ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart</>)}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Process & Limitations */}
      <section className="py-20 bg-gray-50 mt-16">
        <div className="container mx-auto px-6 max-w-6xl grid md:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-display font-bold text-gray-800 mb-6">Our Booking Process</h2>
            <div className="space-y-6">
              {processSteps.map((step, i) => (
                <div key={i} className="flex items-start bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <span className="bg-crystal-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 text-sm flex-shrink-0 mt-1">{i+1}</span>
                  <div>
                    <h3 className="font-bold text-gray-800">{step.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-display font-bold text-gray-800 mb-6">Important Service Limitations</h2>
            <p className="text-gray-600 mb-6">Unless specifically agreed and legally available, routine maid service may not include:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {limitations.map((item, i) => (
                <div key={i} className="flex items-center bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                  <XCircle className="w-4 h-4 text-red-400 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 text-xs font-medium">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-blue-50 text-blue-700 p-4 rounded-xl text-sm">
              <p className="font-bold mb-2">Internal Links:</p>
              <p>For intensive detail, book our <Link to="/services/deep-cleaning" className="underline font-semibold">Deep Cleaning</Link>. For upholstery, book <Link to="/services/furniture" className="underline font-semibold">Furniture Cleaning</Link>. For childcare, book our <Link to="/services/babysitting" className="underline font-semibold">Babysitting Services</Link>.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Areas Served */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-4">Maid Services Near You in Dubai</motion.h2>
          <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">Subject to booking availability, we serve customers in communities including:</motion.p>
          <div className="flex flex-wrap justify-center gap-3">
            {areasServed.map((area, i) => (
              <span key={i} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium flex items-center"><MapPin className="w-3 h-3 mr-2 text-crystal-500" />{area}</span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800">Maid Services Dubai FAQs</h2>
          </motion.div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
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
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Need Reliable Home-Cleaning Help in Dubai?</h2>
            <p className="text-crystal-100 text-lg mb-8 max-w-2xl mx-auto">Book flexible hourly, weekly, or part-time maid services for your apartment or villa. Spend less time cleaning and more time on what matters.</p>
            <button onClick={scrollToPicker} className="bg-white text-crystal-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition shadow-lg">
              Book a Maid Service
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}