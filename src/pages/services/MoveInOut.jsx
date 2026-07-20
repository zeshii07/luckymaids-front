import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, ArrowLeft, ShoppingCart, Home, Building, Tag, ShieldCheck, Leaf, Clock, Search, SprayCan, Eye, ChevronDown, KeyRound } from 'lucide-react';
import { useCart } from '../../context/CartContext';

// Pricing Data (Mirroring Deep Cleaning)
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

const detailedChecklist = [
  "Deep cleaning of all empty cabinets, wardrobes, and drawers",
  "Heavy duty kitchen degreasing (oven, stovetop, extractor)",
  "Inside and outside of all appliances (if requested)",
  "Descaling bathrooms (tiles, showerheads, faucets, toilets)",
  "Scrubbing grout lines and sanitizing all floors",
  "Dusting ceiling fans, light fixtures, and skirting boards",
  "Cleaning window tracks, frames, and internal glass",
  "Wall spot cleaning and cobweb removal",
  "Balcony and patio sweeping and washing"
];

const processSteps = [
  { icon: Search, title: "1. Property Assessment", desc: "We assess the empty property to identify areas that require special attention to meet landlord or Real Estate Agent (Ejari) standards." },
  { icon: SprayCan, title: "2. Equipment Prep", desc: "Our team arrives fully equipped with industrial-grade degreasers, descalers, and eco-friendly cleaning agents." },
  { icon: KeyRound, title: "3. Comprehensive Deep Clean", desc: "We execute a top-to-bottom scrub down of every room, focusing on deposit-critical areas like kitchens and bathrooms." },
  { icon: Eye, title: "4. Final Walkthrough", desc: "A strict quality inspection ensures the property is spotless and ready for handover, helping secure your full deposit." }
];

const faqs = [
  { q: "Will this cleaning help me get my full deposit back?", a: "Yes. Landlords and property managers in Dubai require a professional end-of-tenancy deep clean. Our checklist is specifically designed to meet Real Estate Regulatory Agency (RERA) standards." },
  { q: "Do I need to be present during the move-out clean?", a: "No, you do not. In fact, it is easier for our team to clean an empty property. You can hand over the keys to our team leader and relax." },
  { q: "What if the property is still furnished?", a: "We can clean around furniture, but please note that move-in/move-out cleans are most effective on empty properties. We offer specific pricing for furnished vs. unfurnished villas." },
  { q: "Do you clean the outside windows and balconies?", a: "Internal windows, tracks, and frames are always included. Balcony sweeping and washing are included. External high-rise window cleaning requires specialized equipment and can be quoted separately." }
];

export default function MoveInOut() {
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const handleAddPackage = (pkg, type) => {
    addToCart({ 
      service: `Move In/Out: ${pkg.name} (${type})`, 
      totalAmount: pkg.price,
      isPackage: true 
    });
    setAddedId(pkg.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const PackageCard = ({ pkg, type, accentColor }) => (
    <motion.div 
      initial={{ opacity: 0, y: 30 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group hover:shadow-xl transition-all"
    >
      <div className={`p-6 flex-grow ${accentColor === 'purple' ? 'bg-purple-50' : 'bg-blue-50'}`}>
        <h4 className="text-lg font-bold text-gray-800 mb-2">{pkg.name}</h4>
        <div className="flex items-end gap-2 mb-3">
          <span className={`text-3xl font-bold ${accentColor === 'purple' ? 'text-purple-600' : 'text-blue-600'}`}>{pkg.price} AED</span>
          <span className="text-lg text-gray-400 line-through mb-1">{pkg.original} AED</span>
        </div>
        <span className={`inline-flex items-center text-xs font-bold px-2 py-1 rounded-full bg-green-100 text-green-700`}>
          <Tag className="w-3 h-3 mr-1" /> Save {pkg.original - pkg.price} AED
        </span>
      </div>
      <div className="p-4 bg-white">
        <button 
          onClick={() => handleAddPackage(pkg, type)} 
          className={`w-full flex items-center justify-center py-3 rounded-xl transition font-bold text-sm shadow-sm ${addedId === pkg.id ? 'bg-green-500 text-white' : `${accentColor === 'purple' ? 'bg-purple-500 hover:bg-purple-600' : 'bg-blue-500 hover:bg-blue-600'} text-white`}`}
        >
          {addedId === pkg.id ? 'Added!' : (<><ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart</>)}
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="pt-20 pb-32 bg-white min-h-screen">
      <Helmet>
        <title>Move-In & Move-Out Cleaning in Dubai | End of Tenancy | Lucky Crystal</title>
        <meta name="description" content="Secure your deposit with professional move-in and move-out cleaning in Dubai. Transparent package pricing for empty villas and apartments. Book online!" />
      </Helmet>

      {/* Hero */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Dubai Move Out Cleaning" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-900/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/services" className="inline-flex items-center text-purple-300 mb-4 hover:text-white transition"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Services</Link>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-2">Move-In / Move-Out Cleaning in Dubai</h1>
            <p className="text-xl text-gray-200 mb-6">Secure your deposit with our end-of-tenancy deep cleaning packages.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => scrollToSection('villa-section')} className="flex items-center justify-center bg-white text-gray-800 px-6 py-3 rounded-full hover:bg-gray-100 transition shadow-lg font-bold">
                <Home className="w-5 h-5 mr-2 text-purple-500" /> Villa Move Out
              </button>
              <button onClick={() => scrollToSection('apartment-section')} className="flex items-center justify-center bg-purple-500 text-white px-6 py-3 rounded-full hover:bg-purple-600 transition shadow-lg font-bold">
                <Building className="w-5 h-5 mr-2" /> Apartment Move Out
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Villa Section */}
      <div id="villa-section" className="py-16 scroll-mt-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-3">Villa Move-Out Packages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Comprehensive top-to-bottom cleaning for your Dubai villa. Perfect for handovers and ensuring full deposit returns.</p>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center"><Home className="w-6 h-6 mr-3 text-purple-500" /> Furnished Villas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {villaFurnished.map(pkg => <PackageCard key={pkg.id} pkg={pkg} type="Furnished" accentColor="purple" />)}
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center"><Home className="w-6 h-6 mr-3 text-gray-400" /> Unfurnished Villas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {villaUnfurnished.map(pkg => <PackageCard key={pkg.id} pkg={pkg} type="Unfurnished" accentColor="purple" />)}
          </div>
        </div>
      </div>

      {/* Apartment Section */}
      <div id="apartment-section" className="py-16 scroll-mt-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-3">Apartment Move-Out Packages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Detailed end-of-tenancy cleaning for apartments and studios. Meets all Dubai property manager requirements.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {apartments.map(pkg => <PackageCard key={pkg.id} pkg={pkg} type="Apartment" accentColor="blue" />)}
          </div>
        </div>
      </div>

      {/* SEO Content 1: What's Included */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-purple-500 font-semibold mb-2">OUR CHECKLIST</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800">What’s Included in Our Move-Out Clean?</h2>
            <p className="text-gray-600 mt-4">We focus on the critical areas that landlords and property managers inspect during the handover process.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
            {detailedChecklist.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex items-start mb-4">
                <CheckCircle className="w-6 h-6 text-purple-500 mr-4 flex-shrink-0 mt-1" />
                <span className="text-gray-700">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content 2: The Process */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-purple-500 font-semibold mb-2">HOW IT WORKS</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800">Our Move-Out Cleaning Process</h2>
          </motion.div>
          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center p-6 bg-gray-50 rounded-3xl">
                <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm border border-gray-100">
                  <step.icon className="w-8 h-8 text-purple-500" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content 3: Why Choose Us & Trust Badges */}
      <section className="py-20 bg-purple-50">
        <div className="container mx-auto px-6 max-w-5xl grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-6">Why Choose Lucky Crystal for Your Move?</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">Moving is stressful enough. Let us handle the cleaning so you can focus on settling into your new home. Our Dubai-based team understands exactly what landlords and real estate agents expect during a property handover, ensuring a smooth transition and helping you secure your full deposit back.</p>
            <div className="space-y-4">
              <div className="flex items-center"><ShieldCheck className="w-6 h-6 text-purple-500 mr-4" /><p className="font-medium text-gray-700">Trained & Background-Checked Professionals</p></div>
              <div className="flex items-center"><KeyRound className="w-6 h-6 text-purple-500 mr-4" /><p className="font-medium text-gray-700">Meets RERA & Landlord Handover Standards</p></div>
              <div className="flex items-center"><Clock className="w-6 h-6 text-purple-500 mr-4" /><p className="font-medium text-gray-700">Flexible Scheduling Around Your Move Date</p></div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="rounded-3xl overflow-hidden shadow-xl">
            <img src="https://images.unsplash.com/photo-1582132818112-14f028e9a8ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Professional Move Out Cleaning" className="w-full h-[400px] object-cover" />
          </motion.div>
        </div>
      </section>

      {/* SEO Content 4: FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-purple-500 font-semibold mb-2">FAQS</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800">Move-In / Move-Out Cleaning FAQs</h2>
          </motion.div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex justify-between items-center p-6 text-left">
                  <span className="font-semibold text-gray-800">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-purple-500 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <motion.div initial={{ height: 0, opacity: 0 }} animate={openFaq === i ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }} className="overflow-hidden">
                  <p className="p-6 pt-0 text-gray-600">{faq.a}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-[3rem] p-12 md:p-16 text-center shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Ready for a Stress-Free Move?</h2>
            <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">Book your move-in/move-out cleaning today and leave the heavy lifting to us.</p>
            <button onClick={() => scrollToSection('villa-section')} className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition shadow-lg">
              View Packages & Book Now
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}