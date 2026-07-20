import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import cleanerImg from '../assets/cleaner.png';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20 pb-0">
      
      {/* 1. Full Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img 
          src="https://images.unsplash.com/photo-1604147495798-57beb5d6af73?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          alt="Clean modern home background" 
          className="w-full h-full object-cover"
        />
        {/* Dark global gradient for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/80 to-black/60 md:bg-gradient-to-r md:from-black/95 md:via-black/80 md:to-black/40"></div>
      </div>

      {/* 2. Smiling Cleaner PNG (Spanning FULL section height behind text) */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} // Sets target opacity directly on mobile
        transition={{ duration: 1 }}
        /* 
          Mobile: absolute filling inset-0 completely. z-10 puts her behind text.
          Desktop: resets back to full opacity on the right side.
        */
        className="absolute inset-0 z-10 w-full h-full md:left-auto md:right-0 md:w-auto flex justify-center items-end pointer-events-none md:opacity-100"
      >
        <img 
          src={cleanerImg} 
          alt="Confident professional cleaner" 
          /*
            Mobile: h-full and w-full makes her expand to the absolute edges of the hero section. 
                    object-cover forces her to fill the entire vertical and horizontal space.
                    object-bottom ensures she starts grounded from the very bottom edge.
            Desktop: md:w-auto and md:object-contain resets her to standard proportions on the right side.
          */
          className="w-full h-full object-cover object-bottom md:w-auto md:h-full md:object-contain transition-all duration-300"
        />
      </motion.div>

      {/* 3. Content Container (Layered safely on top at z-20) */}
      <div className="container mx-auto px-6 relative z-20 flex items-center h-full pt-12 pb-12 md:py-20">
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8 }}
          className="max-w-xl w-full text-center md:text-left md:w-1/2 mx-auto md:mx-0"
        >
          <div className="inline-flex items-center bg-crystal-500/20 backdrop-blur-md border border-crystal-400/30 text-crystal-100 px-4 py-2 rounded-full mb-6">
            <Star className="w-4 h-4 mr-2 fill-current text-crystal-300" />
            <span className="text-sm font-semibold">Premium Maid Services</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight mb-6 drop-shadow-lg">
            SPARKLING CLEAN <br/> HOMES, <span className="text-crystal-400">EFFORTLESSLY.</span>
          </h1>
          
          <p className="text-lg text-gray-200 mb-8 max-w-md mx-auto md:mx-0 drop-shadow-md">
            Experience the magic of Lucky Crystal Maids. We transform your living spaces into pristine sanctuaries so you can focus on what matters most.
          </p>

          <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/quote" className="flex items-center justify-center bg-crystal-500 text-white px-8 py-4 rounded-full hover:bg-crystal-600 transition shadow-lg hover:shadow-xl hover:scale-105 duration-300 font-medium">
              Get a Free Quote <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <a href="/#services" className="flex items-center justify-center bg-white/10 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full hover:bg-white/20 transition shadow-sm font-medium">
              Our Services
            </a>
          </div>
        </motion.div>
      </div>

    </section>
  );
}