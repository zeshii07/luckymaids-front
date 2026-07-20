import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, ArrowLeft, ShoppingCart, Home, Building, Tag, ShieldCheck, Leaf, Clock, Sparkles, Search, SprayCan, Eye, ChevronDown } from 'lucide-react';
import { useCart } from '../../context/CartContext';

// Pricing Data
const villaFurnished = [
  { id: 'vf1', name: '1 Bedroom Villa', price: 400, original: 450 },
  { id: 'vf2', name: '2 Bedroom Villa', price: 500, original: 550 },
  { id: 'vf3', name: '3 Bedroom Villa', price: 600, original: 700 },
  { id: 'vf4', name: '4 Bedroom Villa', price: 700, original: 800 },
  { id: 'vf5', name: '5 Bedroom Villa', price: 800, original: 950 },
];

const villaUnfurnished = [
  { id: 'vu1', name: '1 Bedroom Villa', price: 350, original: 400 },
  { id: 'vu2', name: '2 Bedroom Villa', price: 450, original: 500 },
  { id: 'vu3', name: '3 Bedroom Villa', price: 550, original: 650 },
  { id: 'vu4', name: '4 Bedroom Villa', price: 650, original: 750 },
  { id: 'vu5', name: '5 Bedroom Villa', price: 750, original: 900 },
];

const apartments = [
  { id: 'ap0', name: 'Studio Apartment', price: 250, original: 300 },
  { id: 'ap1', name: '1 Bedroom Apartment', price: 300, original: 350 },
  { id: 'ap2', name: '2 Bedroom Apartment', price: 350, original: 400 },
  { id: 'ap3', name: '3 Bedroom Apartment', price: 400, original: 450 },
];

const detailedChecklist = [
  "Deep kitchen degreasing (oven, stovetop, extractor hood)",
  "Inside and outside of all cabinets and drawers",
  "Descaling bathrooms (tiles, showerheads, faucets)",
  "Scrubbing grout lines and sanitizing floors",
  "Dusting ceiling fans, light fixtures, and high corners",
  "Vacuuming and shampooing upholstery (if applicable)",
  "Cleaning window tracks, frames, and internal glass",
  "Wiping down all baseboards, doors, and door frames",
  "Sanitizing all high-touch surfaces (switches, handles)"
];

const processSteps = [
  { icon: Search, title: "1. Assessment", desc: "Our team assesses the property layout and identifies high-priority areas requiring special attention." },
  { icon: SprayCan, title: "2. Preparation", desc: "We bring professional-grade, eco-friendly cleaning agents and equipment tailored for deep extraction." },
  { icon: Sparkles, title: "3. Deep Execution", desc: "Top-to-bottom scrubbing, degreasing, and sanitizing of every room, focusing on grime and hard water stains." },
  { icon: Eye, title: "4. Quality Check", desc: "A final walkthrough inspection ensures no corner is missed and the space meets our Crystal Standard." }
];

const faqs = [
  { q: "How long does a deep clean take?", a: "Depending on the size and condition of the property, a deep clean can take anywhere from 4 to 8 hours with a specialized crew." },
  { q: "Do I need to provide cleaning materials?", a: "No, our deep cleaning packages include all professional-grade equipment and eco-friendly chemicals needed to make your space spotless." },
  { q: "Is deep cleaning safe for pets and children?", a: "Absolutely. We use non-toxic, eco-friendly products that are completely safe for your entire family once the surfaces dry." },
  { q: "What is the difference between regular and deep cleaning?", a: "Regular cleaning maintains daily tidiness. Deep cleaning tackles hidden grime, grease, scale, and hard-to-reach areas like inside ovens and behind appliances." }
];

export default function DeepCleaning() {
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const handleAddPackage = (pkg, type) => {
    addToCart({ 
      service: `Deep Clean: ${pkg.name} (${type})`, 
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
      <div className={`p-6 flex-grow ${accentColor === 'crystal' ? 'bg-crystal-50' : 'bg-blue-50'}`}>
        <h4 className="text-lg font-bold text-gray-800 mb-2">{pkg.name}</h4>
        <div className="flex items-end gap-2 mb-3">
          <span className={`text-3xl font-bold ${accentColor === 'crystal' ? 'text-crystal-600' : 'text-blue-600'}`}>{pkg.price} AED</span>
          <span className="text-lg text-gray-400 line-through mb-1">{pkg.original} AED</span>
        </div>
        <span className={`inline-flex items-center text-xs font-bold px-2 py-1 rounded-full bg-green-100 text-green-700`}>
          <Tag className="w-3 h-3 mr-1" /> Save {pkg.original - pkg.price} AED
        </span>
      </div>
      <div className="p-4 bg-white">
        <button 
          onClick={() => handleAddPackage(pkg, type)} 
          className={`w-full flex items-center justify-center py-3 rounded-xl transition font-bold text-sm shadow-sm ${addedId === pkg.id ? 'bg-green-500 text-white' : `${accentColor === 'crystal' ? 'bg-crystal-500 hover:bg-crystal-600' : 'bg-blue-500 hover:bg-blue-600'} text-white`}`}
        >
          {addedId === pkg.id ? 'Added!' : (<><ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart</>)}
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="pt-20 pb-32 bg-white min-h-screen">
      <Helmet>
        <title>Deep Cleaning Services in Dubai | Villas & Apartments | Lucky Crystal</title>
        <meta name="description" content="Professional deep cleaning services in Dubai. Transparent package pricing for furnished & unfurnished villas, and apartments. Book your spring clean today!" />
      </Helmet>

      {/* Hero */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Dubai Deep Cleaning" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/services" className="inline-flex items-center text-crystal-300 mb-4 hover:text-white transition"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Services</Link>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-2">Deep Cleaning in Dubai</h1>
            <p className="text-xl text-gray-200 mb-6">Choose your property type for precise package pricing.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => scrollToSection('villa-section')} className="flex items-center justify-center bg-white text-gray-800 px-6 py-3 rounded-full hover:bg-gray-100 transition shadow-lg font-bold">
                <Home className="w-5 h-5 mr-2 text-crystal-500" /> Villa Deep Cleaning
              </button>
              <button onClick={() => scrollToSection('apartment-section')} className="flex items-center justify-center bg-crystal-500 text-white px-6 py-3 rounded-full hover:bg-crystal-600 transition shadow-lg font-bold">
                <Building className="w-5 h-5 mr-2" /> Apartment Deep Cleaning
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Villa Section */}
      <div id="villa-section" className="py-16 scroll-mt-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-3">Villa Deep Cleaning Packages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Comprehensive top-to-bottom cleaning for your Dubai villa. Perfect for spring cleaning or post-renovation.</p>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center"><Home className="w-6 h-6 mr-3 text-crystal-500" /> Furnished Villas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {villaFurnished.map(pkg => <PackageCard key={pkg.id} pkg={pkg} type="Furnished" accentColor="crystal" />)}
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center"><Home className="w-6 h-6 mr-3 text-gray-400" /> Unfurnished Villas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {villaUnfurnished.map(pkg => <PackageCard key={pkg.id} pkg={pkg} type="Unfurnished" accentColor="crystal" />)}
          </div>
        </div>
      </div>

      {/* Apartment Section */}
      <div id="apartment-section" className="py-16 scroll-mt-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-3">Apartment Deep Cleaning Packages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Detailed cleaning for apartments and studios. Ideal for move-in/move-out or annual deep cleans.</p>
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
            <p className="text-crystal-500 font-semibold mb-2">OUR CHECKLIST</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800">What’s Included in Our Deep Clean?</h2>
            <p className="text-gray-600 mt-4">Unlike standard maid services, our deep cleaning package tackles hidden grime, grease, and hard water stains across every room in your Dubai home.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
            {detailedChecklist.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex items-start mb-4">
                <CheckCircle className="w-6 h-6 text-crystal-500 mr-4 flex-shrink-0 mt-1" />
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
            <p className="text-crystal-500 font-semibold mb-2">HOW IT WORKS</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800">Our Deep Cleaning Process</h2>
          </motion.div>
          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center p-6 bg-gray-50 rounded-3xl">
                <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm border border-gray-100">
                  <step.icon className="w-8 h-8 text-crystal-500" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content 3: Why Choose Us & Trust Badges */}
      <section className="py-20 bg-crystal-50">
        <div className="container mx-auto px-6 max-w-5xl grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-6">Why Choose Lucky Crystal for Deep Cleaning?</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">Deep cleaning requires more than just a mop and bucket. It requires attention to detail, professional-grade equipment, and a trained eye. Our Dubai-based team specializes in restoring homes to their original sparkle, ensuring a healthy, hygienic living environment for you and your family.</p>
            <div className="space-y-4">
              <div className="flex items-center"><ShieldCheck className="w-6 h-6 text-crystal-500 mr-4" /><p className="font-medium text-gray-700">Trained & Background-Checked Professionals</p></div>
              <div className="flex items-center"><Leaf className="w-6 h-6 text-crystal-500 mr-4" /><p className="font-medium text-gray-700">Eco-Friendly, Petrochemical-Free Products</p></div>
              <div className="flex items-center"><Clock className="w-6 h-6 text-crystal-500 mr-4" /><p className="font-medium text-gray-700">Flexible Scheduling & 100% Satisfaction Guarantee</p></div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="rounded-3xl overflow-hidden shadow-xl">
            <img src="https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Professional Deep Cleaner at Work" className="w-full h-[400px] object-cover" />
          </motion.div>
        </div>
      </section>

      {/* SEO Content 4: FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-crystal-500 font-semibold mb-2">FAQS</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800">Deep Cleaning FAQs</h2>
          </motion.div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex justify-between items-center p-6 text-left">
                  <span className="font-semibold text-gray-800">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-crystal-500 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
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
          <div className="bg-gradient-to-br from-crystal-600 to-crystal-800 rounded-[3rem] p-12 md:p-16 text-center shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Ready for a Spotless Home?</h2>
            <p className="text-crystal-100 text-lg mb-8 max-w-2xl mx-auto">Book our deep cleaning service today and experience the crystal standard. Your dream home is just a click away.</p>
            <button onClick={() => scrollToSection('villa-section')} className="bg-white text-crystal-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition shadow-lg">
              View Packages & Book Now
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}