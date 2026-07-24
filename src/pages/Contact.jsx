import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle, AlertCircle, MapPin, Phone, Mail, Clock, ChevronDown } from 'lucide-react';

export default function Contact() {
  const [status, setStatus] = useState('idle');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service_type: 'Residential Cleaning', message: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', service_type: 'Residential Cleaning', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error('Server error');
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const faqs = [
    { q: 'Are your cleaning products safe for pets and children?', a: 'Yes! We use 100% eco-friendly, non-toxic cleaning products that are completely safe for your entire family.' },
    { q: 'Do I need to be home during the cleaning?', a: 'Not at all. Many of our clients prefer to be at work or out running errands. As long as we have access to the home, we can handle the rest.' },
    { q: 'How do I pay for the services?', a: 'We accept all major credit cards, debit cards, and digital wallets. Payment is processed securely after the service is completed.' }
  ];
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="pt-32 pb-20 bg-gradient-to-b from-crystal-50 to-white min-h-screen">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-5xl font-display font-bold text-gray-800 mb-6">Get In Touch</h1>
          <p className="text-xl text-gray-600">Ready for a sparkling clean home? Request a quote or book our services today.</p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-12 mb-24">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2 bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-crystal-500" required />
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-crystal-500" required />
              </div>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-crystal-500" required />
              <select name="service_type" value={formData.service_type} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-crystal-500 bg-white">
                <option>Residential Cleaning</option>
                <option>Deep Cleaning</option>
                <option>Move-in/Out Cleaning</option>
                <option>Commercial Cleaning</option>
                <option>Babysitting & Maid</option>
              </select>
              <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Tell us about your home size and cleaning needs..." rows="4" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-crystal-500" required></textarea>

              <button type="submit" disabled={status === 'loading' || status === 'success'} className={`w-full py-4 rounded-xl transition font-semibold text-lg flex items-center justify-center text-white ${status === 'loading' ? 'bg-crystal-400' : status === 'success' ? 'bg-green-500' : 'bg-crystal-500 hover:bg-crystal-600'}`}>
                {status === 'loading' ? (<><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Sending...</>) : status === 'success' ? (<><CheckCircle className="w-5 h-5 mr-2" /> Message Sent!</>) : ('Send Message')}
              </button>

              {status === 'success' && <div className="bg-green-50 text-green-700 p-4 rounded-xl text-center text-sm">Thank you! Your message has been sent to our team.</div>}
              {status === 'error' && <div className="bg-red-50 text-red-700 p-4 rounded-xl text-center text-sm flex items-center justify-center"><AlertCircle className="w-5 h-5 mr-2" /> Oops! Something went wrong.</div>}
            </form>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-8">
            <div className="bg-gray-900 text-white p-8 rounded-3xl">
              <h3 className="text-xl font-bold mb-6">Contact Details</h3>
              <div className="space-y-4">
                <div className="flex items-start"><MapPin className="w-6 h-6 mr-4 text-crystal-400 flex-shrink-0" /><div><p className="font-medium">Office Location</p><p className="text-gray-400 text-sm">123 Sparkle Street, Dubai, UAE</p></div></div>
                <div className="flex items-start"><Phone className="w-6 h-6 mr-4 text-crystal-400 flex-shrink-0" /><div><p className="font-medium">Call Us</p><p className="text-gray-400 text-sm">+971 50 123 4567</p></div></div>
                <div className="flex items-start"><Mail className="w-6 h-6 mr-4 text-crystal-400 flex-shrink-0" /><div><p className="font-medium">Email Us</p><p className="text-gray-400 text-sm">hello@luckycrystalmaids.com</p></div></div>
              </div>
            </div>
            <div className="bg-crystal-50 p-8 rounded-3xl border border-crystal-100">
              <div className="flex items-center mb-4">
                <Clock className="w-6 h-6 text-crystal-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-800">Business Hours</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li className="flex justify-between"><span>Mon - Fri:</span> <span>8:00 AM - 6:00 PM</span></li>
                <li className="flex justify-between"><span>Saturday:</span> <span>9:00 AM - 4:00 PM</span></li>
                <li className="flex justify-between"><span>Sunday:</span> <span className="text-red-500">Closed</span></li>
              </ul>
            </div>
          </motion.div>
        </div>

        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-gray-800 text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex justify-between items-center p-6 text-left">
                  <span className="font-semibold text-gray-800">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-crystal-500 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <motion.div initial={{ height: 0, opacity: 0 }} animate={openFaq === i ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }} className="overflow-hidden">
                  <p className="p-6 pt-0 text-gray-600">{faq.a}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}