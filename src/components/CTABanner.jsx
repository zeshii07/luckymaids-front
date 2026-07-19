import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Gem } from 'lucide-react';

export default function CTABanner() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-br from-crystal-600 to-crystal-800 rounded-[3rem] p-12 md:p-20 text-center overflow-hidden shadow-2xl"
        >
          {/* Decorative floating diamond */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-10 left-10 opacity-20"
          >
            <Gem className="w-32 h-32 text-white" />
          </motion.div>
          <motion.div 
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute bottom-10 right-10 opacity-20"
          >
            <Gem className="w-24 h-24 text-white" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 relative z-10">
            Ready for a Sparkling Clean Home?
          </h2>
          <p className="text-crystal-100 text-lg mb-8 max-w-2xl mx-auto relative z-10">
            Book our premium cleaning services today and experience the crystal standard. Your dream home is just a click away.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center relative z-10">
            <Link to="/booking" className="bg-white text-crystal-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition shadow-lg">
              Book Now
            </Link>
            <Link to="/quote" className="border-2 border-white/50 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition">
              Get a Free Quote
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}