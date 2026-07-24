import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const services = [
  { id: 'residential', name: 'Residential Cleaning', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { id: 'deep-cleaning', name: 'Deep Cleaning', image: 'https://images.unsplash.com/photo-1521798643720-73c7b1d78294?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { id: 'move-in-out', name: 'Move In/Out Cleaning', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { id: 'commercial', name: 'Commercial Cleaning', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { id: 'furniture', name: 'Furniture Cleaning', image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { id: 'babysitting-maid', name: 'Babysitting & Maid', image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
];

export default function ServiceMarquee() {
  return (
    <section className="py-16 bg-gray-50 overflow-hidden border-t border-gray-100">
      <div className="container mx-auto px-6 mb-8 text-center">
        <p className="text-crystal-500 font-semibold mb-2">EXPLORE MORE</p>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800">Our Premium Services</h2>
      </div>

      {/* Scrolling Marquee Container */}
      <div className="relative w-full">
        {/* Edge gradients for a smooth fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>

        {/* The scrolling track */}
        <div className="flex gap-6 animate-marquee hover:[animation-play-state:paused] w-max">
          {/* Render services twice for a seamless infinite loop */}
          {[...services, ...services].map((service, index) => (
            <Link 
              key={index} 
              to={`/services/${service.id}`} 
              className="w-72 h-40 rounded-2xl relative overflow-hidden group flex-shrink-0 shadow-md"
            >
              {/* Background Image */}
              <img 
                src={service.image} 
                alt={service.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              
              {/* Text Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                <h3 className="text-white font-bold text-lg leading-tight">{service.name}</h3>
                <div className="bg-white/20 backdrop-blur-md p-2 rounded-full group-hover:bg-crystal-500 transition-colors">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}