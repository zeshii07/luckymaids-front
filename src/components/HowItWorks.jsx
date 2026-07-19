import { motion } from 'framer-motion';
import { CalendarCheck, Sparkles, Smile } from 'lucide-react';

const steps = [
  {
    icon: CalendarCheck,
    title: '1. Book Online',
    desc: 'Choose your service and select a date and time that works perfectly for you.'
  },
  {
    icon: Sparkles,
    title: '2. We Clean',
    desc: 'Our professional team arrives on time and transforms your space into a sparkling sanctuary.'
  },
  {
    icon: Smile,
    title: '3. Relax & Enjoy',
    desc: 'Enjoy your free time in a perfectly clean home. Sit back and let us handle the rest!'
  }
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-crystal-500 font-semibold mb-2">SIMPLE PROCESS</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-800">How It Works</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="text-center relative"
            >
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md border border-gray-100">
                <step.icon className="w-10 h-10 text-crystal-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">{step.title}</h3>
              <p className="text-gray-600 max-w-xs mx-auto">{step.desc}</p>
              
              {/* Dotted line between steps */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-full border-t-2 border-dashed border-gray-200"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}