import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Calendar, ShieldCheck, Leaf } from 'lucide-react';

const serviceData = {
  residential: {
    title: 'Residential Cleaning',
    subtitle: 'Your home, perfectly maintained.',
    image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    features: ['Dusting all surfaces & fixtures', 'Vacuuming carpets & rugs', 'Mopping hard floors', 'Kitchen appliance exteriors', 'Bathroom sanitization', 'Making beds', 'Emptying trash bins']
  },
  deep: {
    title: 'Deep Cleaning',
    subtitle: 'When your home needs that extra attention.',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    features: ['Inside oven & refrigerator cleaning', 'Baseboard scrubbing', 'Window sill & frame washing', 'Ceiling fan dusting', 'Grout scrubbing', 'Light fixture cleaning', 'Detailed wall spot cleaning']
  },
  move: {
    title: 'Move-in/Out Cleaning',
    subtitle: 'A fresh start in a spotless space.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    features: ['Complete empty property cleaning', 'Inside cabinet & drawer wiping', 'Deep appliance cleaning', 'Garage sweep out', 'Window cleaning', 'Carpet vacuuming', 'Final touch-up sanitization']
  },
  commercial: {
    title: 'Commercial Cleaning',
    subtitle: 'Professional spaces deserve professional care.',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    features: ['Office desk & workstation wiping', 'Breakroom sanitization', 'Restroom deep clean', 'Glass door cleaning', 'Floor stripping & waxing', 'Trash removal & recycling', 'Disinfecting high-touch areas']
  },
  furniture: {
    title: 'Furniture Cleaning',
    subtitle: 'Revive your upholstery and extend its life.',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    features: ['Deep sofa & couch extraction', 'Stain & odor removal', 'Fabric protection application', 'Leather conditioning', 'Curtain & drape dusting', 'Cushion deep clean', 'Hypoallergenic treatments']
  },
  babysitting: {
    title: 'Babysitting & Maid',
    subtitle: 'Trusted care for your home and little ones.',
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    features: ['Verified & background-checked staff', 'Child meal preparation', 'Light housekeeping', 'School run & errands', 'Engaging playtime activities', 'Homework assistance', 'Strict safety protocols']
  }
};

export default function ServiceDetail() {
  const { id } = useParams();
  const service = serviceData[id] || serviceData.residential;

  return (
    <div className="pt-20 pb-20 bg-white min-h-screen">
      
      {/* Hero Section */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/" className="inline-flex items-center text-crystal-300 mb-4 hover:text-white transition">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
            </Link>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-2">{service.title}</h1>
            <p className="text-xl text-gray-200">{service.subtitle}</p>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6 max-w-6xl mt-16 grid md:grid-cols-3 gap-12">
        
        {/* Left Column: Features */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:col-span-2"
        >
          <h2 className="text-3xl font-display font-bold text-gray-800 mb-8">What's Included</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {service.features.map((feature, index) => (
              <div key={index} className="flex items-start bg-gray-50 p-4 rounded-xl border border-gray-100">
                <CheckCircle className="w-6 h-6 text-crystal-500 mr-3 flex-shrink-0 mt-1" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Sidebar / CTA */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="bg-crystal-50 p-8 rounded-3xl border border-crystal-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Why Choose Us?</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-white p-2 rounded-lg shadow-sm mr-4"><Leaf className="w-5 h-5 text-crystal-500" /></div>
                <p className="text-gray-700">Eco-Friendly Products</p>
              </div>
              <div className="flex items-center">
                <div className="bg-white p-2 rounded-lg shadow-sm mr-4"><ShieldCheck className="w-5 h-5 text-crystal-500" /></div>
                <p className="text-gray-700">100% Satisfaction Guarantee</p>
              </div>
              <div className="flex items-center">
                <div className="bg-white p-2 rounded-lg shadow-sm mr-4"><Calendar className="w-5 h-5 text-crystal-500" /></div>
                <p className="text-gray-700">Flexible Scheduling</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 p-8 rounded-3xl text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Book?</h3>
            <p className="text-gray-400 mb-6">Get a free estimate for {service.title} today.</p>
            <Link to="/booking" className="block bg-crystal-500 text-white py-4 rounded-xl hover:bg-crystal-600 transition font-semibold">
              Book This Service
            </Link>
            <Link to="/quote" className="block mt-4 text-crystal-400 hover:text-crystal-300 transition font-medium">
              Get a Free Quote Instead →
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}