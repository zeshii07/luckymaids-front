import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, Mail, PhoneCall } from 'lucide-react';

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  // Replace with your actual contact info
  const phoneNumber = "15551234567"; 
  const whatsappNumber = "15551234567"; 
  const email = "hello@luckycrystalmaids.com";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-4">
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.a 
              href={`tel:+${phoneNumber}`} 
              initial={{ opacity: 0, scale: 0, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0, y: 20 }}
              className="bg-blue-500 text-white p-4 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition relative"
              title="Call Us"
            >
              <Phone className="w-6 h-6" />
            </motion.a>
            
            <motion.a 
              href={`https://wa.me/${whatsappNumber}?text=Hi%20Lucky%20Crystal%20Maids,%20I%20would%20like%20a%20quote.`} 
              target="_blank" rel="noreferrer"
              initial={{ opacity: 0, scale: 0, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0, y: 20 }}
              transition={{ delay: 0.05 }}
              className="bg-green-500 text-white p-4 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition"
              title="WhatsApp Us"
            >
              <MessageCircle className="w-6 h-6" />
            </motion.a>

            <motion.a 
              href={`mailto:${email}`} 
              initial={{ opacity: 0, scale: 0, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0, y: 20 }}
              transition={{ delay: 0.1 }}
              className="bg-crystal-500 text-white p-4 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition"
              title="Email Us"
            >
              <Mail className="w-6 h-6" />
            </motion.a>
          </>
        )}
      </AnimatePresence>

      <motion.button 
        onClick={() => setIsOpen(!isOpen)} 
        whileTap={{ scale: 0.9 }}
        className="bg-crystal-500 text-white p-5 rounded-full shadow-2xl flex items-center justify-center relative"
      >
        {/* Pulsing ring effect */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-crystal-500 animate-ping opacity-75"></span>
        )}
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className="relative z-10">
          {isOpen ? <PhoneCall className="w-8 h-8" /> : <PhoneCall className="w-8 h-8" />}
        </motion.div>
      </motion.button>
    </div>
  );
}