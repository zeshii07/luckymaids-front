import { motion } from 'framer-motion';
import { Leaf, ShieldCheck, Clock } from 'lucide-react';

const features = [
  {
    icon: Leaf,
    title: 'Eco-Friendly Products',
    desc: 'Safe for your family and pets. We use only environmentally sustainable cleaning products.'
  },
  {
    icon: ShieldCheck,
    title: '100% Satisfaction Guaranteed',
    desc: 'If you are not completely satisfied, we will re-clean the specific area free of charge.'
  },
  {
    icon: Clock,
    title: 'Flexible Scheduling',
    desc: 'We work around your busy schedule. Book us weekly, bi-weekly, or for one-time deep cleans.'
  }
];

export default function WhyChooseUs() {
  return (
    <section id="why" className="py-24 bg-gradient-to-b from-crystal-50 to-white">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        
        {/* Left Side - Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <img 
            src="https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            alt="Professional Maid Cleaning" 
            className="rounded-3xl shadow-2xl w-full h-[500px] object-cover"
          />
          <div className="absolute -bottom-8 -right-8 bg-crystal-500 text-white p-8 rounded-3xl shadow-xl hidden md:block">
            <p className="text-4xl font-bold">10+</p>
            <p>Years of Experience</p>
          </div>
        </motion.div>

        {/* Right Side - Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-crystal-500 font-semibold mb-2">WHY CHOOSE US</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-800 mb-8">
            The Crystal Standard of Clean
          </h2>
          
          <div className="space-y-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="flex items-start space-x-4"
              >
                <div className="bg-white p-3 rounded-xl shadow-md text-crystal-500 mt-1">
                  <feature.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h4>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}