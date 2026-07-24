import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Minus, Plus, ShoppingCart, CalendarCheck, CheckCircle, XCircle, ChevronDown, Baby, Clock, Moon, Sun, Hotel, PartyPopper, UserCheck, ShieldCheck, Heart, MapPin } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const useCases = [
  "Childcare during working hours", "Support while working from home", "Evening babysitting", "Weekend childcare", 
  "Care during appointments", "Help during family events", "Child supervision at a hotel", "Support during school holidays", 
  "Temporary assistance when a regular nanny is unavailable", "Extra help when caring for more than one child", 
  "Assistance while settling into Dubai", "Recurring part-time childcare", "A parent helper while a parent remains at home"
];

const bookingProcess = [
  { title: "Tell Us About Your Childcare Needs", desc: "Provide accurate information about the number of children, ages, location, date, time, required activities, feeding needs, allergies, and preferred caregiver experience." },
  { title: "Review Caregiver Availability", desc: "We review available caregivers according to your requested date, hours, location, child age, required experience, and duties." },
  { title: "Confirm the Service Details", desc: "Review the booking date, time, address, number of children, agreed duties, total price, minimum hours, and cancellation terms before final confirmation." },
  { title: "Provide a Family Care Brief", desc: "Prepare a written or digital care brief containing parent contacts, child details, allergies, medical considerations, meal instructions, and bedtime routines." },
  { title: "Meet the Babysitter", desc: "Allow enough time to introduce the caregiver, show important rooms, explain routines, point out emergency exits, and discuss food and allergies." },
  { title: "Stay Contactable", desc: "Parents should remain reachable throughout the booking. Nominate a trusted adult who can make decisions in an emergency if you cannot answer directly." }
];

const includedDuties = [
  "Child supervision", "Age-appropriate play", "Reading", "Serving prepared food", "Basic meal preparation for children", 
  "Bottle feeding according to instructions", "Diaper changing", "Nap supervision", "Bedtime routines", "Homework monitoring", 
  "Organizing children’s toys", "Cleaning up after child-related activities", "Sharing updates with parents"
];

const excludedDuties = [
  "General house cleaning", "Full-family meal preparation", "Driving children", "School transportation", "Swimming supervision", 
  "Taking children to public locations", "Giving medication", "Medical care", "Nursing duties", "Overnight stays", 
  "Pet care", "Shopping", "Tutoring", "Laundry for the whole household", "Care for unregistered additional children"
];

const whyChooseUs = [
  { icon: UserCheck, title: "Care Matched to Your Requirements", desc: "We consider the child’s age, booking schedule, location, and requested duties when reviewing caregiver availability." },
  { icon: CheckCircle, title: "Clear Booking Information", desc: "We confirm the agreed hours, location, number of children, requested responsibilities, and price before the appointment." },
  { icon: Clock, title: "Flexible Childcare Options", desc: "Subject to availability, families may request hourly, daytime, evening, weekend, recurring, hotel, and event babysitting." },
  { icon: Heart, title: "Child-Focused Support", desc: "The caregiver’s primary responsibility during the booking is the care and supervision of the registered child or children." },
  { icon: Hotel, title: "Residential and Visitor Services", desc: "We assist Dubai residents as well as families staying in hotels, serviced apartments, and holiday homes." },
  { icon: ShieldCheck, title: "Customer Support", desc: "Customers receive a company contact for booking questions, changes, or service concerns according to our operating hours." }
];

const areasServed = [
  "Downtown Dubai", "Business Bay", "Dubai Marina", "Jumeirah Beach Residence", "Jumeirah Lake Towers", "Palm Jumeirah", "Dubai Harbour", "Bluewaters Island", "Jumeirah", "Umm Suqeim", "Al Safa", "Al Wasl", "Al Barsha", "Barsha Heights", "Dubai Hills Estate", "Arabian Ranches", "Emirates Hills", "The Springs", "The Meadows", "The Lakes", "The Greens", "The Views", "Jumeirah Village Circle", "Jumeirah Village Triangle", "Dubai Sports City", "Motor City", "Damac Hills", "Mudon", "Town Square Dubai", "Tilal Al Ghaf", "Dubai Silicon Oasis", "Mirdif", "Nad Al Sheba", "Meydan", "Mohammed Bin Rashid City", "Dubai Creek Harbour", "Dubai Festival City", "Al Furjan", "Discovery Gardens", "The Gardens", "Dubai South", "Deira", "Bur Dubai", "Al Karama", "Al Nahda"
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
  { q: "Are babysitters first-aid trained?", a: "First-aid training should only be advertised for caregivers whose current training has been verified. Parents may request details before confirming the service." }
];

export default function Babysitting() {
  const { addToCart } = useCart();
  const [hours, setHours] = useState(2);
  const [crew, setCrew] = useState(1); // Represents number of babysitters
  const [added, setAdded] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const getRate = (h) => {
    if (h === 2) return 50;
    if (h > 2 && h < 4) return 45;
    return 40; // 4 or more hours
  };
  
  const ratePerHour = getRate(hours);
  const totalAmount = hours * crew * ratePerHour;

  const handleAddToCart = () => {
    addToCart({ service: 'Babysitting Services', hours, crew, ratePerHour, totalAmount });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const scrollToPicker = () => document.getElementById('booking-picker').scrollIntoView({ behavior: 'smooth', block: 'center' });

  return (
    <div className="pt-20 pb-32 bg-white min-h-screen">
      <Helmet>
        <title>Babysitting Services Dubai | Trusted Hourly Childcare Support</title>
        <meta name="description" content="Book reliable babysitting services in Dubai for hourly, part-time, daytime, evening, weekend, hotel, and event childcare. Request a carefully matched caregiver for your family’s schedule and needs." />
        <meta name="keywords" content="Babysitting services Dubai, Babysitter Dubai, Professional babysitter Dubai, Childcare services Dubai, Babysitting company Dubai, Hourly babysitter Dubai, Part-time babysitter Dubai, Infant babysitter Dubai, Toddler babysitter Dubai, Daytime babysitter Dubai, Evening babysitter Dubai, Weekend babysitter Dubai, Hotel babysitting Dubai, Event babysitting Dubai, Wedding babysitter Dubai" />
      </Helmet>

      {/* Hero Section */}
      <div className="relative h-[500px] w-full overflow-hidden">
        <img src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" alt="Professional babysitting services in Dubai" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/95 via-indigo-900/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 pt-28">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/services" className="inline-flex items-center text-indigo-300 mb-4 hover:text-white transition"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Services</Link>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-4 max-w-4xl">Professional Babysitting Services in Dubai</h1>
            <p className="text-lg text-gray-200 mb-8 max-w-3xl">Finding dependable childcare is one of the most important decisions a parent can make. Whether you need a few hours of support during a busy day, regular assistance while working, childcare during an appointment, or an extra pair of hands at home, our professional babysitting services in Dubai are designed around your family’s routine, preferences, and childcare requirements.</p>
            <button onClick={scrollToPicker} className="flex items-center bg-indigo-500 text-white px-6 py-3 rounded-full hover:bg-indigo-600 transition shadow-lg font-bold">
              <CalendarCheck className="w-5 h-5 mr-2" /> Book a Babysitter
            </button>
          </motion.div>
        </div>
      </div>

      {/* Dependable Childcare Support */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-6 text-center">Dependable Childcare Support for Dubai Families</h2>
            <p className="text-lg text-gray-600 leading-relaxed text-center max-w-4xl mx-auto mb-12">Modern family schedules can be demanding. Professional babysitting provides flexible support without requiring every family to commit immediately to a full-time childcare arrangement. Our babysitting service may be suitable when you need:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {useCases.map((item, i) => (
                <div key={i} className="flex items-center bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-100">
                  <CheckCircle className="w-5 h-5 text-indigo-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Flexible Care Options */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Clock, title: "Hourly & Part-Time", desc: "Ideal for parents who need childcare for a defined period, regular assistance, or recurring weekly support." },
              { icon: Sun, title: "Daytime Care", desc: "Support during morning or afternoon hours, including play, feeding routines, and homework monitoring." },
              { icon: Moon, title: "Evening & Weekend", desc: "Flexible childcare for dinners, events, appointments, or weekend commitments." },
              { icon: Baby, title: "Infants & Toddlers", desc: "Caregivers matched with suitable experience for baby routines, diaper changing, and active toddler supervision." }
            ].map((opt, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <div className="bg-indigo-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                  <opt.icon className="w-7 h-7 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{opt.title}</h3>
                <p className="text-gray-600 text-sm">{opt.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialized Babysitting */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl grid md:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <Hotel className="w-12 h-12 text-indigo-500 mb-4" />
            <h3 className="text-2xl font-display font-bold text-gray-800 mb-3">Hotel Babysitting</h3>
            <p className="text-gray-600">Families visiting Dubai may need childcare while attending business meetings, weddings, or events. Hotel babysitting is provided in your room or approved location, subject to hotel policies.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <PartyPopper className="w-12 h-12 text-indigo-500 mb-4" />
            <h3 className="text-2xl font-display font-bold text-gray-800 mb-3">Event Babysitting</h3>
            <p className="text-gray-600">Childcare for weddings, parties, and corporate events. We help plan designated spaces, check-in procedures, and appropriate caregiver-to-child ratios for safe event care.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <Heart className="w-12 h-12 text-indigo-500 mb-4" />
            <h3 className="text-2xl font-display font-bold text-gray-800 mb-3">Parent Helper</h3>
            <p className="text-gray-600">An extra pair of hands while you remain at home. Perfect for working from home, caring for a newborn, hosting guests, or managing household tasks while children are supervised.</p>
          </motion.div>
        </div>
      </section>

      {/* Booking Picker */}
      <div className="container mx-auto px-6 max-w-6xl mt-8 grid md:grid-cols-3 gap-12">
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="md:col-span-2">
          <h2 className="text-3xl font-display font-bold text-gray-800 mb-6">Book Your Babysitter</h2>
          <p className="text-gray-600 mb-8">Select the number of hours and babysitters required. Minimum booking is 2 hours.</p>
          
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Babysitters (Max 5)</label>
                <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-200">
                  <button onClick={() => setCrew(Math.max(1, crew - 1))} className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"><Minus className="w-4 h-4" /></button>
                  <span className="text-lg font-bold text-gray-800">{crew} Sitter{crew > 1 ? 's' : ''}</span>
                  <button onClick={() => setCrew(Math.min(5, crew + 1))} className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"><Plus className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div id="booking-picker" initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-8 scroll-mt-24">
          <div className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100 sticky top-24">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Booking Summary</h3>
            <div className="bg-white p-4 rounded-xl mb-6 text-sm text-gray-600 space-y-1">
              <p>Rate: <span className="font-bold text-indigo-600">{ratePerHour} AED/hour</span></p>
              <p>Calculation: {hours}h × {crew} sitter × {ratePerHour} AED</p>
              <p className="text-lg font-bold text-gray-800 mt-2 pt-2 border-t border-gray-100">Total: {totalAmount} AED</p>
            </div>
            <button onClick={handleAddToCart} className={`w-full flex items-center justify-center py-4 rounded-xl transition font-bold text-lg shadow-lg ${added ? 'bg-green-500 text-white' : 'bg-indigo-500 text-white hover:bg-indigo-600'}`}>
              {added ? 'Added to Cart!' : (<><ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart</>)}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Booking Process */}
      <section className="py-20 bg-gray-50 mt-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-4">Our Babysitting Booking Process</motion.h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookingProcess.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center mb-4">
                  <span className="bg-indigo-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 text-sm">{i+1}</span>
                  <h3 className="text-lg font-bold text-gray-800">{step.title}</h3>
                </div>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Responsibilities */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl grid md:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-display font-bold text-gray-800 mb-6">What May Be Included</h2>
            <div className="space-y-3">
              {includedDuties.map((item, i) => (
                <div key={i} className="flex items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-display font-bold text-gray-800 mb-6">What Is Not Automatically Included</h2>
            <div className="space-y-3">
              {excludedDuties.map((item, i) => (
                <div key={i} className="flex items-center bg-red-50 p-3 rounded-xl border border-red-100">
                  <XCircle className="w-5 h-5 text-red-400 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-4">Why Choose Our Babysitting Services?</motion.h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((point, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <div className="bg-indigo-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                  <point.icon className="w-7 h-7 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{point.title}</h3>
                <p className="text-gray-600 text-sm">{point.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas Served */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-4">Babysitters Near You in Dubai</motion.h2>
          <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">Subject to caregiver availability, we serve families in communities including:</motion.p>
          <div className="flex flex-wrap justify-center gap-3">
            {areasServed.map((area, i) => (
              <span key={i} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium flex items-center"><MapPin className="w-3 h-3 mr-2 text-indigo-500" />{area}</span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800">Babysitting Services Dubai FAQs</h2>
          </motion.div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex justify-between items-center p-6 text-left">
                  <h3 className="text-base font-semibold text-gray-800">{faq.q}</h3>
                  <ChevronDown className={`w-5 h-5 text-indigo-500 transition-transform flex-shrink-0 ml-4 ${openFaq === i ? 'rotate-180' : ''}`} />
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
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[3rem] p-12 md:p-16 text-center shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Need a Dependable Babysitter in Dubai?</h2>
            <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">Tell us your schedule, location, and children’s ages, and our team will help you arrange suitable childcare support.</p>
            <button onClick={scrollToPicker} className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition shadow-lg">
              Book a Babysitter
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}