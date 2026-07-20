import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Home, Sparkles, Truck, Building, Sofa, Baby, ArrowRight, CalendarCheck, Smile, ShieldCheck, ChevronDown } from 'lucide-react';

const services = [
  { id: 'residential', icon: Home, title: 'Residential Cleaning', desc: 'Regular weekly or bi-weekly cleaning to keep your home spotless.', path: '/services/residential', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'deep', icon: Sparkles, title: 'Deep Cleaning', desc: 'A comprehensive top-to-bottom clean for extra attention.', path: '/services/deep-cleaning', image: 'https://plus.unsplash.com/premium_photo-1677234147127-36046f5fbe78?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGNsZWFuaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=80' },
  { id: 'move', icon: Truck, title: 'Move-in/Out Cleaning', desc: 'Make your transition smooth with specialized move cleaning.', path: '/services/move-in-out', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'commercial', icon: Building, title: 'Commercial Cleaning', desc: 'Professional cleaning for offices and commercial buildings.', path: '/services/commercial', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'furniture', icon: Sofa, title: 'Furniture Cleaning', desc: 'Deep cleaning and stain removal for upholstery.', path: '/services/furniture', image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'babysitting', icon: Baby, title: 'Babysitting & Maid', desc: 'Reliable childcare and household management.', path: '/services/babysitting-maid', image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
];

const processSteps = [
  { icon: CalendarCheck, title: '1. Book Online', desc: 'Choose your service and select a date and time that works perfectly for you.' },
  { icon: Sparkles, title: '2. We Clean', desc: 'Our professional team arrives on time and transforms your space into a sparkling sanctuary.' },
  { icon: Smile, title: '3. Relax & Enjoy', desc: 'Enjoy your free time in a perfectly clean home. Sit back and let us handle the rest!' }
];

const faqs = [
  { q: 'Are your cleaning products safe for pets and children?', a: 'Yes! We use 100% eco-friendly, non-toxic cleaning products that are completely safe for your entire family.' },
  { q: 'Do I need to be home during the cleaning?', a: 'Not at all. Many of our clients prefer to be at work or out running errands. As long as we have access to the home, we can handle the rest.' },
  { q: 'How do I pay for the services?', a: 'We accept all major credit cards, debit cards, and digital wallets. Payment is processed securely after the service is completed.' }
];

export default function ServicesOverview() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="pt-32 pb-20 bg-gray-50 min-h-screen">
      <Helmet>
        <title>Cleaning Services in Dubai | Lucky Crystal Maids</title>
        <meta name="description" content="Explore our premium cleaning services in Dubai. We offer residential, deep, commercial, and furniture cleaning, plus babysitting services." />
      </Helmet>
      
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <p className="text-crystal-500 font-semibold mb-2">OUR EXPERTISE</p>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-800">Explore Our Services</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">We offer a wide range of professional cleaning and home care services tailored to your needs in Dubai.</p>
        </motion.div>

        {/* Service Cards with Images */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-24">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all group flex flex-col"
            >
              <div className="relative h-52 overflow-hidden">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="bg-crystal-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 -mt-12 relative z-10 border-4 border-white shadow-md">
                  <service.icon className="w-8 h-8 text-crystal-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">{service.title}</h2>
                <p className="text-gray-600 mb-6 flex-grow">{service.desc}</p>
                <Link to={service.path} className="text-crystal-500 font-semibold flex items-center group-hover:translate-x-2 transition-transform">
                  View Details <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cleaning Procedure Section */}
        <div className="max-w-5xl mx-auto mb-24">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-crystal-500 font-semibold mb-2">SIMPLE PROCESS</p>
            <h2 className="text-4xl font-display font-bold text-gray-800">Our Cleaning Process</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {processSteps.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }} className="bg-white p-8 rounded-3xl shadow-sm text-center">
                <div className="bg-crystal-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <step.icon className="w-10 h-10 text-crystal-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Why Choose Us & FAQ Section */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Why Choose Us */}
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-crystal-50 p-8 rounded-3xl border border-crystal-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Why Choose Us?</h3>
            <div className="space-y-4">
              <div className="flex items-center"><div className="bg-white p-2 rounded-lg shadow-sm mr-4"><ShieldCheck className="w-5 h-5 text-crystal-500" /></div><p className="text-gray-700">100% Satisfaction Guarantee</p></div>
              <div className="flex items-center"><div className="bg-white p-2 rounded-lg shadow-sm mr-4"><Sparkles className="w-5 h-5 text-crystal-500" /></div><p className="text-gray-700">Eco-Friendly Products</p></div>
              <div className="flex items-center"><div className="bg-white p-2 rounded-lg shadow-sm mr-4"><CalendarCheck className="w-5 h-5 text-crystal-500" /></div><p className="text-gray-700">Flexible Scheduling</p></div>
            </div>
          </motion.div>

          {/* FAQs */}
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex justify-between items-center p-4 text-left">
                    <span className="font-semibold text-gray-800">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-crystal-500 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={openFaq === i ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }} className="overflow-hidden">
                    <p className="p-4 pt-0 text-gray-600">{faq.a}</p>
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}