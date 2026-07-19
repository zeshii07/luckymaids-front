import { Gem, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setScrolled(true);
      else setScrolled(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-4' : 'bg-transparent py-6'}`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Gem className="w-8 h-8 text-crystal-500 drop-shadow-sm" />
          <span className="text-xl font-display font-bold text-gray-800">
            Lucky Crystal <span className="text-crystal-500">Maids</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-600 hover:text-crystal-500 transition font-medium">HOME</Link>
          <Link to="/#services" className="text-gray-600 hover:text-crystal-500 transition font-medium">SERVICES</Link>
          <Link to="/about" className="text-gray-600 hover:text-crystal-500 transition font-medium">ABOUT</Link>
          <Link to="/contact" className="text-gray-600 hover:text-crystal-500 transition font-medium">CONTACT</Link>
          
          <div className="flex items-center space-x-3">
            <Link to="/quote" className="text-crystal-600 border border-crystal-500 px-5 py-2 rounded-full hover:bg-crystal-50 transition font-medium">
              Get Quote
            </Link>
            <Link to="/booking" className="bg-crystal-500 text-white px-6 py-2 rounded-full hover:bg-crystal-600 transition shadow-lg hover:shadow-crystal-300/50">
              Book Now
            </Link>
          </div>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-600">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-white mt-4 py-4 px-6 shadow-xl rounded-b-2xl"
        >
          <div className="flex flex-col space-y-4">
            <Link to="/" onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-crystal-500">HOME</Link>
            <Link to="/#services" onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-crystal-500">SERVICES</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-crystal-500">ABOUT</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-crystal-500">CONTACT</Link>
            <Link to="/quote" onClick={() => setIsOpen(false)} className="text-center text-crystal-600 border border-crystal-500 px-5 py-2 rounded-full">Get Quote</Link>
            <Link to="/booking" onClick={() => setIsOpen(false)} className="text-center bg-crystal-500 text-white px-6 py-2 rounded-full">Book Now</Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}