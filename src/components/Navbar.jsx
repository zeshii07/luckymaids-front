import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gem, Menu, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false); // Desktop hover
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false); // Mobile click

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
  { name: 'Residential Cleaning', path: '/services/residential' },
  { name: 'Deep Cleaning', path: '/services/deep-cleaning' },
  { name: 'Move-in/Out Cleaning', path: '/services/move-in-out' },
  { name: 'Commercial Cleaning', path: '/services/commercial' },
  { name: 'Furniture Cleaning', path: '/services/furniture' },
  { name: 'Maid Services', path: '/services/maid-services' }, // New Link
  { name: 'Babysitting Services', path: '/services/babysitting' }, // New Link
];

  return (
    <motion.nav 
      initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-4' : 'bg-transparent py-6'}`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Gem className="w-8 h-8 text-crystal-500 drop-shadow-sm" />
          <span className="text-xl font-display font-bold text-gray-800">
            Lucky Crystal <span className="text-crystal-500">Maids</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-600 hover:text-crystal-500 transition font-medium">HOME</Link>
          
          <div className="relative" onMouseEnter={() => setServicesDropdown(true)} onMouseLeave={() => setServicesDropdown(false)}>
            <button className="flex items-center text-gray-600 hover:text-crystal-500 transition font-medium">
              SERVICES <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${servicesDropdown ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {servicesDropdown && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 w-72 bg-white shadow-xl rounded-2xl py-4 mt-2 border border-gray-100"
                >
                  <Link to="/services" className="block px-6 py-2 text-crystal-600 font-bold hover:bg-crystal-50">All Services</Link>
                  <div className="border-t border-gray-100 my-2"></div>
                  {services.map((service, i) => (
                    <Link key={i} to={service.path} className="block px-6 py-2 text-gray-600 hover:bg-crystal-50 hover:text-crystal-600">
                      {service.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/about" className="text-gray-600 hover:text-crystal-500 transition font-medium">ABOUT</Link>
          <Link to="/contact" className="text-gray-600 hover:text-crystal-500 transition font-medium">CONTACT</Link>
          
          <div className="flex items-center space-x-3">
            <Link to="/quote" className="text-crystal-600 border border-crystal-500 px-5 py-2 rounded-full hover:bg-crystal-50 transition font-medium">Get Quote</Link>
            <Link to="/booking" className="bg-crystal-500 text-white px-6 py-2 rounded-full hover:bg-crystal-600 transition shadow-lg">Book Now</Link>
          </div>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-600">{isOpen ? <X /> : <Menu />}</button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="md:hidden bg-white mt-4 py-4 px-6 shadow-xl rounded-b-2xl max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col space-y-4">
            <Link to="/" onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-crystal-500">HOME</Link>
            
            {/* Mobile Accordion for Services */}
            <div>
              <button onClick={() => setMobileServicesOpen(!mobileServicesOpen)} className="flex items-center justify-between w-full text-gray-600 hover:text-crystal-500">
                SERVICES <ChevronDown className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileServicesOpen && (
                <div className="flex flex-col space-y-3 pl-4 mt-2 border-l-2 border-crystal-200">
                  <Link to="/services" onClick={() => setIsOpen(false)} className="text-crystal-600 font-medium hover:text-crystal-500">All Services</Link>
                  {services.map((s, i) => (
                    <Link key={i} to={s.path} onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-crystal-500">{s.name}</Link>
                  ))}
                </div>
              )}
            </div>

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