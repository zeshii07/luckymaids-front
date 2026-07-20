import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function StickyCartBar() {
  const { cartItems, cartTotal } = useCart();

  return (
    <AnimatePresence>
      {cartItems.length > 0 && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          // Changed to a subtle upward shadow, reduced padding (p-3), and removed blur for better mobile performance
          className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] p-3 sm:p-4"
        >
          <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
            
            {/* Left side: Cart Icon & Total Amount */}
            <div className="flex items-center space-x-3 flex-shrink-0">
              <div className="relative">
                <ShoppingBag className="w-6 h-6 sm:w-8 sm:h-8 text-crystal-600" />
                <span className="absolute -top-2 -right-2 bg-crystal-500 text-white text-[10px] w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center font-bold">
                  {cartItems.length}
                </span>
              </div>
              <div className="text-left">
                {/* Hidden the "Total" text on mobile to save space */}
                <p className="hidden sm:block text-sm text-gray-500 leading-none mb-1">Total Amount</p>
                <p className="text-lg sm:text-2xl font-bold text-crystal-600 leading-none">{cartTotal} AED</p>
              </div>
            </div>
            
            {/* Right side: Checkout Button */}
            {/* flex-grow makes the button expand to fill available space on mobile */}
            <Link 
              to="/checkout" 
              className="flex-grow sm:flex-grow-0 flex items-center justify-center bg-crystal-500 text-white px-4 sm:px-8 py-3 sm:py-3.5 rounded-full hover:bg-crystal-600 transition shadow-md font-bold text-sm sm:text-lg"
            >
              Checkout
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}