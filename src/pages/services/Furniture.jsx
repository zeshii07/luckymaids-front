import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, ArrowLeft, ShoppingCart, Tag, ShieldCheck, Leaf, Clock, Search, SprayCan, Eye, ChevronDown, Sofa, BedDouble, Ruler } from 'lucide-react';
import { useCart } from '../../context/CartContext';

// Pricing Data
const sofaPackages = [
  { id: 'sofa1', name: '1 Seater Sofa', price: 80, original: 100 },
  { id: 'sofa2', name: '2 Seater Sofa', price: 120, original: 150 },
  { id: 'sofa3', name: '3 Seater Sofa', price: 160, original: 200 },
  { id: 'sofa4', name: '4 Seater Sofa', price: 200, original: 250 },
  { id: 'sofa5', name: '5 Seater Sofa (L-Shape)', price: 250, original: 300 },
];

const mattressPackages = [
  { id: 'mat1', name: 'Single / Twin Mattress', price: 100, original: 130 },
  { id: 'mat2', name: 'Double / Full Mattress', price: 120, original: 150 },
  { id: 'mat3', name: 'Queen Size Mattress', price: 140, original: 180 },
  { id: 'mat4', name: 'King Size Mattress', price: 160, original: 200 },
];

const carpetPackages = [
  { id: 'carp1', name: 'Small Carpet (Up to 2x2 m)', price: 100, original: 130 },
  { id: 'carp2', name: 'Medium Carpet (Up to 3x4 m)', price: 150, original: 190 },
  { id: 'carp3', name: 'Large Carpet (Up to 4x5 m)', price: 200, original: 250 },
  { id: 'carp4', name: 'Extra Large Carpet (5m+)', price: 250, original: 320 },
];

const detailedChecklist = [
  "Deep vacuuming to remove loose dust, dirt, and pet hair",
  "Application of eco-friendly, fabric-safe pre-treatment sprays",
  "Targeted stain and spot removal (food, ink, grease, beverage)",
  "Hot water extraction (steam cleaning) to kill bacteria & dust mites",
  "Deodorizing treatment to eliminate odors and leave a fresh scent",
  "Grooming the fabric to restore its original texture and appearance"
];

const processSteps = [
  { icon: Search, title: "1. Fabric Inspection", desc: "We inspect the upholstery material to choose the safest and most effective cleaning method." },
  { icon: SprayCan, title: "2. Stain Pre-Treatment", desc: "Tough stains are targeted with specialized, eco-friendly solvents to break down grime." },
  { icon: Eye, title: "3. Deep Extraction", desc: "We use professional hot water extraction machines to pull out embedded dirt and allergens." },
  { icon: Sofa, title: "4. Grooming & Drying", desc: "The fabric is groomed for a uniform finish and sped-dried so you can use it quickly." }
];

const faqs = [
  { q: "How long does it take for the furniture to dry?", a: "Typically, upholstery and carpets take 4 to 6 hours to dry completely. We use high-speed air movers to accelerate the process whenever possible." },
  { q: "Can you remove all types of stains?", a: "While we can remove the vast majority of stains (food, beverage, grease), some older stains like permanent ink or bleach damage may be impossible to remove completely. Our team will manage expectations during the inspection." },
  { q: "Is the cleaning solution safe for my children and pets?", a: "Absolutely. We prioritize health and use non-toxic, eco-friendly, pet-safe cleaning detergents that leave no harmful residue." },
  { q: "How often should I get my mattress professionally cleaned?", a: "We recommend a professional deep clean for your mattress every 6 to 12 months to eliminate dust mites, dead skin cells, and bacteria, ensuring a healthy sleep environment." }
];

export default function Furniture() {
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const handleAddPackage = (pkg, category) => {
    addToCart({ 
      service: `Furniture Clean: ${pkg.name} (${category})`, 
      totalAmount: pkg.price,
      isPackage: true 
    });
    setAddedId(pkg.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const PackageCard = ({ pkg, category }) => (
    <motion.div 
      initial={{ opacity: 0, y: 30 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group hover:shadow-xl transition-all"
    >
      <div className="p-6 flex-grow bg-pink-50">
        <h4 className="text-lg font-bold text-gray-800 mb-2">{pkg.name}</h4>
        <div className="flex items-end gap-2 mb-3">
          <span className="text-3xl font-bold text-pink-600">{pkg.price} AED</span>
          <span className="text-lg text-gray-400 line-through mb-1">{pkg.original} AED</span>
        </div>
        <span className="inline-flex items-center text-xs font-bold px-2 py-1 rounded-full bg-green-100 text-green-700">
          <Tag className="w-3 h-3 mr-1" /> Save {pkg.original - pkg.price} AED
        </span>
      </div>
      <div className="p-4 bg-white">
        <button 
          onClick={() => handleAddPackage(pkg, category)} 
          className={`w-full flex items-center justify-center py-3 rounded-xl transition font-bold text-sm shadow-sm ${addedId === pkg.id ? 'bg-green-500 text-white' : 'bg-pink-500 hover:bg-pink-600 text-white'}`}
        >
          {addedId === pkg.id ? 'Added!' : (<><ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart</>)}
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="pt-20 pb-32 bg-white min-h-screen">
      <Helmet>
        <title>Furniture & Upholstery Cleaning in Dubai | Sofa, Mattress, Carpet | Lucky Crystal</title>
        <meta name="description" content="Professional furniture and upholstery cleaning in Dubai. Expert sofa, mattress, and carpet cleaning packages. Remove stains and dust mites. Book online!" />
      </Helmet>

      {/* Hero */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <img src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Dubai Upholstery Cleaning" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-pink-900/90 via-pink-900/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/services" className="inline-flex items-center text-pink-300 mb-4 hover:text-white transition"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Services</Link>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-2">Furniture & Upholstery Cleaning</h1>
            <p className="text-xl text-gray-200 mb-6">Revive your sofas, mattresses, and carpets with our deep extraction service.</p>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <button onClick={() => scrollToSection('sofa-section')} className="flex items-center justify-center bg-white text-gray-800 px-6 py-3 rounded-full hover:bg-gray-100 transition shadow-lg font-bold">
                <Sofa className="w-5 h-5 mr-2 text-pink-500" /> Sofa Cleaning
              </button>
              <button onClick={() => scrollToSection('mattress-section')} className="flex items-center justify-center bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition shadow-lg font-bold">
                <BedDouble className="w-5 h-5 mr-2" /> Mattress Cleaning
              </button>
              <button onClick={() => scrollToSection('carpet-section')} className="flex items-center justify-center bg-pink-700 text-white px-6 py-3 rounded-full hover:bg-pink-800 transition shadow-lg font-bold">
                <Ruler className="w-5 h-5 mr-2" /> Carpet Cleaning
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Sofa Section */}
      <div id="sofa-section" className="py-16 scroll-mt-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-3 flex items-center justify-center"><Sofa className="w-8 h-8 mr-3 text-pink-500" /> Sofa Cleaning Packages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Deep cleaning and stain removal for sofas, couches, and sectionals. We handle all fabric types including microfiber, leather, and cotton.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sofaPackages.map(pkg => <PackageCard key={pkg.id} pkg={pkg} category="Sofa" />)}
          </div>
        </div>
      </div>

      {/* Mattress Section */}
      <div id="mattress-section" className="py-16 scroll-mt-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-3 flex items-center justify-center"><BedDouble className="w-8 h-8 mr-3 text-pink-500" /> Mattress Cleaning Packages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Eliminate dust mites, dead skin cells, and stains for a healthier, hypoallergenic sleep environment.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mattressPackages.map(pkg => <PackageCard key={pkg.id} pkg={pkg} category="Mattress" />)}
          </div>
        </div>
      </div>

      {/* Carpet Section */}
      <div id="carpet-section" className="py-16 scroll-mt-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-3 flex items-center justify-center"><Ruler className="w-8 h-8 mr-3 text-pink-500" /> Carpet Cleaning Packages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Powerful steam extraction for area rugs and wall-to-wall carpets to remove deep-seated dirt and pet dander.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {carpetPackages.map(pkg => <PackageCard key={pkg.id} pkg={pkg} category="Carpet" />)}
          </div>
        </div>
      </div>

      {/* SEO Content 1: What's Included */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-pink-500 font-semibold mb-2">OUR CHECKLIST</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800">What’s Included in Upholstery Cleaning?</h2>
            <p className="text-gray-600 mt-4">Dubai's dust and humidity can take a toll on your fabrics. Our extraction method pulls out embedded dirt that regular vacuuming leaves behind.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
            {detailedChecklist.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex items-start mb-4">
                <CheckCircle className="w-6 h-6 text-pink-500 mr-4 flex-shrink-0 mt-1" />
                <span className="text-gray-700">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content 2: The Process */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-pink-500 font-semibold mb-2">HOW IT WORKS</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800">Our Deep Extraction Process</h2>
          </motion.div>
          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center p-6 bg-white rounded-3xl">
                <div className="bg-gray-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm border border-gray-100">
                  <step.icon className="w-8 h-8 text-pink-500" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content 3: Why Choose Us & Trust Badges */}
      <section className="py-20 bg-pink-50">
        <div className="container mx-auto px-6 max-w-5xl grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-6">Why Choose Lucky Crystal for Furniture Cleaning?</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">Your furniture is an investment. Our Dubai-based cleaning specialists don't just wipe the surface; we sanitize the core. Using industrial-grade extraction machines, we remove the moisture, dirt, and allergens that cause wear and odors, extending the life of your upholstery.</p>
            <div className="space-y-4">
              <div className="flex items-center"><ShieldCheck className="w-6 h-6 text-pink-500 mr-4" /><p className="font-medium text-gray-700">Trained & Background-Checked Professionals</p></div>
              <div className="flex items-center"><Leaf className="w-6 h-6 text-pink-500 mr-4" /><p className="font-medium text-gray-700">Eco-Friendly, Non-Toxic Detergents</p></div>
              <div className="flex items-center"><Clock className="w-6 h-6 text-pink-500 mr-4" /><p className="font-medium text-gray-700">Fast Drying Times & 100% Satisfaction Guarantee</p></div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="rounded-3xl overflow-hidden shadow-xl">
            <img src="https://images.unsplash.com/photo-1582582494705-f8ce0b0c24f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Professional Carpet Cleaning" className="w-full h-[400px] object-cover" />
          </motion.div>
        </div>
      </section>

      {/* SEO Content 4: FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-pink-500 font-semibold mb-2">FAQS</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800">Furniture & Carpet Cleaning FAQs</h2>
          </motion.div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex justify-between items-center p-6 text-left">
                  <span className="font-semibold text-gray-800">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-pink-500 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
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
          <div className="bg-gradient-to-br from-pink-600 to-pink-800 rounded-[3rem] p-12 md:p-16 text-center shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Ready to Refresh Your Furniture?</h2>
            <p className="text-pink-100 text-lg mb-8 max-w-2xl mx-auto">Book our upholstery cleaning service today and make your sofas and carpets look brand new.</p>
            <button onClick={() => scrollToSection('sofa-section')} className="bg-white text-pink-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition shadow-lg">
              View Packages & Book Now
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}