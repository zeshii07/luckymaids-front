// import { motion } from 'framer-motion';
// import { Home, Sparkles, Truck, Building, Sofa, Baby, ArrowRight } from 'lucide-react';
// import { Link } from 'react-router-dom';

// const services = [
//   {
//     id: 'residential',
//     icon: Home,
//     title: 'Residential Cleaning',
//     desc: 'Regular weekly or bi-weekly cleaning to keep your home spotless and comfortable.',
//     color: 'bg-blue-100 text-blue-600'
//   },
//   {
//     id: 'deep',
//     icon: Sparkles,
//     title: 'Deep Cleaning',
//     desc: 'A comprehensive top-to-bottom clean for those areas that need extra attention.',
//     color: 'bg-crystal-100 text-crystal-600'
//   },
//   {
//     id: 'move',
//     icon: Truck,
//     title: 'Move-in/Out Cleaning',
//     desc: 'Make your transition smooth with our specialized move-in or move-out cleaning.',
//     color: 'bg-purple-100 text-purple-600'
//   },
//   {
//     id: 'commercial',
//     icon: Building,
//     title: 'Commercial Cleaning',
//     desc: 'Professional cleaning for offices, retail spaces, and commercial buildings.',
//     color: 'bg-orange-100 text-orange-600'
//   },
//   {
//     id: 'furniture',
//     icon: Sofa,
//     title: 'Furniture Cleaning',
//     desc: 'Deep cleaning and stain removal for sofas, couches, and upholstery.',
//     color: 'bg-pink-100 text-pink-600'
//   },
//   {
//     id: 'babysitting',
//     icon: Baby,
//     title: 'Babysitting & Maid',
//     desc: 'Reliable childcare and household management while you are away.',
//     color: 'bg-indigo-100 text-indigo-600'
//   }
// ];

// export default function Services() {
//   return (
//     <section id="services" className="py-24 bg-white">
//       <div className="container mx-auto px-6">
//         <motion.div 
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16"
//         >
//           <p className="text-crystal-500 font-semibold mb-2">WHAT WE OFFER</p>
//           <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-800">Our Premium Services</h2>
//         </motion.div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {services.map((service, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               whileHover={{ y: -10 }}
//               className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:shadow-2xl hover:bg-white transition-all duration-300 group cursor-pointer"
//             >
//               <div className={`${service.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
//                 <service.icon className="w-8 h-8" />
//               </div>
//               <h3 className="text-2xl font-bold text-gray-800 mb-4">{service.title}</h3>
//               <p className="text-gray-600 mb-6">{service.desc}</p>
//               <Link to={`/services/${service.id}`} className="text-crystal-500 font-semibold flex items-center group-hover:translate-x-2 transition-transform">
//                 Learn More <ArrowRight className="ml-2 w-4 h-4" />
//               </Link>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

import { motion } from 'framer-motion';
import { Home, Sparkles, Truck, Building, Sofa, Baby, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    id: 'residential',
    icon: Home,
    title: 'Residential Cleaning',
    desc: 'Regular weekly or bi-weekly cleaning to keep your home spotless and comfortable.',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'deep',
    icon: Sparkles,
    title: 'Deep Cleaning',
    desc: 'A comprehensive top-to-bottom clean for those areas that need extra attention.',
    image: 'https://plus.unsplash.com/premium_photo-1677234147127-36046f5fbe78?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGNsZWFuaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'move',
    icon: Truck,
    title: 'Move-in/Out Cleaning',
    desc: 'Make your transition smooth with our specialized move-in or move-out cleaning.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'commercial',
    icon: Building,
    title: 'Commercial Cleaning',
    desc: 'Professional cleaning for offices, retail spaces, and commercial buildings.',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'furniture',
    icon: Sofa,
    title: 'Furniture Cleaning',
    desc: 'Deep cleaning and stain removal for sofas, couches, and upholstery.',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'babysitting',
    icon: Baby,
    title: 'Babysitting & Maid',
    desc: 'Reliable childcare and household management while you are away.',
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];
export default function Services() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-crystal-500 font-semibold mb-2">WHAT WE OFFER</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-800">Our Premium Services</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative h-96 rounded-3xl overflow-hidden group cursor-pointer"
            >
              {/* Background Image */}
              <img 
                src={service.image} 
                alt={service.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

              {/* Content */}
              <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                <div className="bg-crystal-500 w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-gray-200 mb-4 opacity-90">{service.desc}</p>
                <Link to={`/services/${service.id}`} className="text-white font-semibold flex items-center group-hover:translate-x-2 transition-transform">
                  Learn More <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}