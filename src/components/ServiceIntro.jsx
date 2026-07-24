import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export default function ServiceIntro({ title, description, cards }) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* "What is..." SEO Text Block */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-6">
            What is {title}?
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {description}
          </p>
        </motion.div>

        {/* Trust & Benefit Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:shadow-lg transition"
            >
              <div className="bg-crystal-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                <card.icon className="w-7 h-7 text-crystal-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{card.title}</h3>
              <p className="text-gray-600">{card.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}