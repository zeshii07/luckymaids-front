import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, Calendar, Users, Home, MapPin, Clock } from 'lucide-react';

export default function Confirmation() {
  const location = useLocation();
  
  // Safely get data passed from checkout
  const bookingData = location.state || { 
    totalAmount: 0, 
    items: [], 
    customer: { name: 'Guest', date: 'Not set', time: 'Not set', address: 'Not set' } 
  };
  
  const { totalAmount, items, customer } = bookingData;

  return (
    <div className="pt-32 pb-20 bg-gradient-to-b from-crystal-50 to-white min-h-screen flex items-center">
      <Helmet><title>Booking Confirmed | Lucky Crystal Maids</title></Helmet>
      
      <div className="container mx-auto px-6 max-w-2xl text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle className="w-14 h-14 text-green-500" />
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-4xl md:text-5xl font-display font-bold text-gray-800 mb-4">
          Booking Confirmed!
        </motion.h1>
        
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-lg text-gray-600 mb-12">
          Thank you, {customer?.name || 'Valued Customer'}! We have received your booking. Our team will arrive at the scheduled time. A confirmation email is on its way.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 text-left mb-12">
          <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Booking Summary</h3>
          
          {/* Schedule & Location Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 pb-8 border-b border-gray-100">
            <div className="flex items-center">
              <div className="bg-crystal-50 p-3 rounded-xl mr-4"><Calendar className="w-6 h-6 text-crystal-500" /></div>
              <div><p className="text-sm text-gray-500">Date</p><p className="font-bold text-gray-800">{customer?.date || 'N/A'}</p></div>
            </div>
            <div className="flex items-center">
              <div className="bg-crystal-50 p-3 rounded-xl mr-4"><Clock className="w-6 h-6 text-crystal-500" /></div>
              <div><p className="text-sm text-gray-500">Time</p><p className="font-bold text-gray-800">{customer?.time || 'N/A'}</p></div>
            </div>
            <div className="flex items-center sm:col-span-2">
              <div className="bg-crystal-50 p-3 rounded-xl mr-4"><MapPin className="w-6 h-6 text-crystal-500" /></div>
              <div><p className="text-sm text-gray-500">Location</p><p className="font-bold text-gray-800">{customer?.address || 'N/A'}</p></div>
            </div>
          </div>

          {/* Services Booked */}
          <div className="space-y-4">
            {items?.map((item, index) => (
              <div key={index} className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center">
                  <div className="bg-white p-2 rounded-lg shadow-sm mr-4"><Home className="w-5 h-5 text-crystal-500" /></div>
                  <div>
                    <p className="font-bold text-gray-800">{item.service}</p>
                    <p className="text-sm text-gray-500">{item.hours}h × {item.crew} crew</p>
                  </div>
                </div>
                <p className="font-bold text-crystal-600">{item.totalAmount} AED</p>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-8 pt-6 border-t-2 border-dashed border-gray-100">
            <span className="text-xl font-bold text-gray-800">Total Paid</span>
            <span className="text-2xl font-bold text-green-500">{totalAmount} AED</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="bg-crystal-500 text-white px-8 py-4 rounded-full hover:bg-crystal-600 transition font-semibold">Back to Home</Link>
          <Link to="/services" className="bg-white text-gray-800 border border-gray-200 px-8 py-4 rounded-full hover:bg-gray-50 transition font-semibold">Book Another Service</Link>
        </motion.div>
      </div>
    </div>
  );
}