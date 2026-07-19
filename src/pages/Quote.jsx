import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Construction } from 'lucide-react';

export default function Quote() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="pt-32 pb-20 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-5xl font-display font-bold text-gray-800 mb-6">Get A Free Quote</h1>
          <p className="text-xl text-gray-600">Tell us about your space, and we'll provide an estimate instantly.</p>
        </motion.div>
        
        <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100">
          
          {isSubmitted ? (
            <div className="text-center py-12 flex flex-col items-center">
              <div className="bg-yellow-100 p-4 rounded-full mb-6">
                <Construction className="w-12 h-12 text-yellow-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Backend Integration Pending</h2>
              <p className="text-gray-600 max-w-md mb-8">
                This is a frontend placeholder. Soon, this will trigger an email to our team and a confirmation email to you.
              </p>
              <button onClick={() => setIsSubmitted(false)} className="text-crystal-500 font-semibold hover:underline">
                Calculate another quote
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input type="text" placeholder="Full Name" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-crystal-500" required />
                <input type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-crystal-500" required />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <input type="number" placeholder="Bedrooms" min="0" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-crystal-500" required />
                <input type="number" placeholder="Bathrooms" min="0" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-crystal-500" required />
                <input type="number" placeholder="Square Footage" min="0" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-crystal-500" required />
              </div>

              <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-crystal-500 bg-white">
                <option>Standard Clean</option>
                <option>Deep Clean</option>
                <option>Move-in/Out Clean</option>
              </select>

              <textarea placeholder="Any extra details? (e.g., pets, specific areas to focus on)" rows="4" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-crystal-500"></textarea>

              <button type="submit" className="w-full bg-crystal-500 text-white py-4 rounded-xl hover:bg-crystal-600 transition font-semibold text-lg flex items-center justify-center">
                <Calculator className="w-5 h-5 mr-2" /> Get My Estimate
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}