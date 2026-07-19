import { motion } from 'framer-motion';
import { Target, Eye, Heart, ShieldCheck, Users, Sparkles } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-32 pb-20 bg-gradient-to-b from-crystal-50 to-white min-h-screen">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl font-display font-bold text-gray-800 mb-6">About Lucky Crystal Maids</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Founded in 2015, we started with a simple mission: to give people their time back while providing an impeccably clean living space. We believe a clean home is a happy home.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto mb-24">
          {[
            { num: '500+', label: 'Homes Cleaned' },
            { num: '20+', label: 'Expert Cleaners' },
            { num: '100%', label: 'Eco-Friendly' },
            { num: '5 Star', label: 'Average Rating' }
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white p-6 rounded-2xl shadow-sm text-center">
              <h3 className="text-3xl font-bold text-crystal-500 mb-1">{stat.num}</h3>
              <p className="text-gray-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto mb-24">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white p-8 rounded-3xl shadow-md border-t-4 border-crystal-500">
            <Target className="w-12 h-12 text-crystal-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To provide top-tier, reliable, and eco-friendly cleaning services that exceed our clients' expectations. We strive to create healthy, comfortable environments for families and businesses alike, allowing our clients to focus on what they love.
            </p>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white p-8 rounded-3xl shadow-md border-t-4 border-blue-500">
            <Eye className="w-12 h-12 text-blue-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              To become the most trusted and recognized cleaning service provider in the region. We envision a future where everyone has access to affordable, premium cleaning solutions that contribute to their well-being and peace of mind.
            </p>
          </motion.div>
        </div>

        {/* Core Values */}
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-gray-800 text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: 'Trust & Security', desc: 'All our staff are background-checked, insured, and trained to respect your privacy.' },
              { icon: Heart, title: 'Care & Empathy', desc: 'We treat every home as if it were our own, paying attention to the smallest details.' },
              { icon: Sparkles, title: 'Excellence', desc: 'We dont just clean; we perfect. We hold ourselves to the highest crystal standard.' }
            ].map((val, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }} className="text-center p-6">
                <div className="bg-crystal-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <val.icon className="w-8 h-8 text-crystal-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{val.title}</h3>
                <p className="text-gray-600">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}