import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, ArrowLeft, Minus, Plus, ShoppingCart, CalendarCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function Commercial() {
  const { addToCart } = useCart();
  const [hours, setHours] = useState(2);
  const [crew, setCrew] = useState(1);
  const [materials, setMaterials] = useState(false);
  const [added, setAdded] = useState(false);

  const getRate = (h) => {
    if (h === 2) return 40;
    if (h > 2 && h < 4) return 35;
    return 30;
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
        <title>Commercial & Office Cleaning in Dubai | Lucky Crystal Maids</title>
        <meta name="description" content="Professional office and commercial cleaning services in Dubai. Keep your workspace spotless and productive with our reliable corporate cleaning team." />
      </Helmet>

      <div className="relative h-[400px] w-full overflow-hidden">
        <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Dubai Office Cleaning" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-orange-900/90 via-orange-900/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/services" className="inline-flex items-center text-orange-300 mb-4 hover:text-white transition"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Services</Link>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-2">Commercial Cleaning in Dubai</h1>
            <p className="text-xl text-gray-200 mb-6">Professional spaces deserve professional care.</p>
            <button onClick={scrollToPicker} className="flex items-center bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition shadow-lg font-bold">
              <CalendarCheck className="w-5 h-5 mr-2" /> Book Now
            </button>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl mt-16 grid md:grid-cols-3 gap-12">
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="md:col-span-2">
          <h2 className="text-3xl font-display font-bold text-gray-800 mb-6">Office & Retail Cleaning in Dubai</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">A clean workspace boosts employee productivity and impresses clients. We offer flexible daily, weekly, or monthly commercial cleaning contracts tailored to your business needs across Dubai, from Business Bay to JLT.</p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {['Office desk & workstation wiping', 'Breakroom sanitization', 'Restroom deep clean', 'Glass door cleaning', 'Floor stripping & waxing', 'Disinfecting high-touch areas'].map((f, i) => (
              <div key={i} className="flex items-start bg-orange-50 p-4 rounded-xl"><CheckCircle className="w-6 h-6 text-orange-500 mr-3 flex-shrink-0 mt-1" /><span className="text-gray-700">{f}</span></div>
            ))}
          </div>
        </motion.div>

        <motion.div id="booking-picker" initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-8 scroll-mt-24">
          <div className="bg-orange-50 p-8 rounded-3xl border border-orange-100 sticky top-24">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Build Your Crew</h3>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Hours (Min 2, Max 8)</label>
              <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-200">
                <button onClick={() => setHours(Math.max(2, hours - 1))} className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"><Minus className="w-4 h-4" /></button>
                <span className="text-xl font-bold text-gray-800">{hours} Hours</span>
                <button onClick={() => setHours(Math.min(8, hours + 1))} className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"><Plus className="w-4 h-4" /></button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Crew Members (Min 1, Max 10)</label>
              <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-200">
                <button onClick={() => setCrew(Math.max(1, crew - 1))} className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"><Minus className="w-4 h-4" /></button>
                <span className="text-xl font-bold text-gray-800">{crew} Member{crew > 1 ? 's' : ''}</span>
                <button onClick={() => setCrew(Math.min(10, crew + 1))} className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"><Plus className="w-4 h-4" /></button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Bring Cleaning Materials? (+20 AED)</label>
              <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={() => setMaterials(true)} className={`p-3 rounded-xl border-2 font-medium text-sm transition ${materials ? 'border-orange-500 bg-white text-orange-600' : 'border-gray-200 bg-white text-gray-500'}`}>Yes, Bring Materials</button>
                <button type="button" onClick={() => setMaterials(false)} className={`p-3 rounded-xl border-2 font-medium text-sm transition ${!materials ? 'border-orange-500 bg-white text-orange-600' : 'border-gray-200 bg-white text-gray-500'}`}>No, I Have Them</button>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl mb-6 text-sm text-gray-600 space-y-1">
              <p>Rate: <span className="font-bold text-orange-600">{ratePerHour} AED/hour</span></p>
              <p>Service: {hours}h × {crew} crew = {hours * crew * ratePerHour} AED</p>
              {materials && <p>Materials: +20 AED</p>}
              <p className="text-lg font-bold text-gray-800 mt-2 pt-2 border-t border-gray-100">Total: {totalAmount} AED</p>
            </div>

            <button onClick={handleAddToCart} className={`w-full flex items-center justify-center py-4 rounded-xl transition font-bold text-lg shadow-lg ${added ? 'bg-green-500 text-white' : 'bg-orange-500 text-white hover:bg-orange-600'}`}>
              {added ? 'Added to Cart!' : (<><ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart</>)}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}