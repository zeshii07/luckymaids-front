import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  Lock,
  ArrowLeft,
  Trash2,
  MapPin,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  CreditCard,
  Banknote,
  CreditCard as CardIcon,
  X,
} from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart, removeFromCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [error, setError] = useState(null); // 'cash' or 'card'

  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    mapLink: "",
    date: "",
    time: "",
  });
  const handleChange = (e) => {
    setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);

    try {
      const response = await fetch("https://lucky-backend-woad.vercel.app/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems,
          totalAmount: cartTotal,
          customer: bookingDetails,
          paymentMethod: paymentMethod,
        }),
      });

      if (response.ok) {
        const finalTotal = cartTotal;
        const finalItems = [...cartItems];
        const finalCustomer = { ...bookingDetails };

        clearCart();

        navigate("/confirmation", {
          state: {
            totalAmount: finalTotal,
            items: finalItems,
            customer: finalCustomer,
            paymentMethod,
          },
        });
      } else {
        setIsProcessing(false);
        setError("Payment failed. Please try again.");
      }
    } catch (error) {
      setIsProcessing(false);
      setError("Error connecting to server. Is the backend running?");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="pt-32 pb-20 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Your cart is empty
          </h1>
          <p className="text-gray-600 mb-8">
            Please select a service before checking out.
          </p>
          <Link
            to="/services"
            className="bg-crystal-500 text-white px-8 py-4 rounded-full hover:bg-crystal-600 transition font-semibold"
          >
            Browse Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 bg-gray-50 min-h-screen">
      <Helmet>
        <title>Checkout | Lucky Crystal Maids</title>
      </Helmet>

      <div className="container mx-auto px-6 max-w-6xl">
        <Link
          to="/services"
          className="inline-flex items-center text-crystal-500 mb-8 hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Continue Shopping
        </Link>

        <h1 className="text-4xl font-display font-bold text-gray-800 mb-12">
          Secure Checkout
        </h1>

        <form onSubmit={handlePayment} className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Forms */}
          <div className="lg:col-span-2 space-y-8">
            {/* 1. Order Summary Block (Moved to Top) */}
            {/* Replace the cartItems.map block in Checkout.jsx with this */}
            {/* Replace the cartItems.map block with this */}
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.cartId}
                  className="bg-gray-50 p-4 rounded-xl relative flex justify-between items-center"
                >
                  <div className="pr-8">
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.cartId)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <p className="font-bold text-gray-800">{item.service}</p>
                    {item.isCustom ? (
                      <p className="text-sm text-gray-600 mt-1 truncate max-w-[200px]">
                        {item.customDetails}
                      </p>
                    ) : item.isPackage ? (
                      <p className="text-sm text-gray-600 mt-1">
                        Flat Package Rate
                      </p>
                    ) : (
                      <p className="text-sm text-gray-600 mt-1">
                        {item.hours}h × {item.crew} crew ({item.ratePerHour}{" "}
                        AED/hr){item.materials ? " + Materials" : ""}
                      </p>
                    )}
                  </div>
                  <p className="text-md font-bold text-crystal-600">
                    {item.isCustom ? "TBD" : `${item.totalAmount} AED`}
                  </p>
                </div>
              ))}
            </div>

            {/* 2. Contact & Location Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-crystal-500" /> Contact &
                Location Details
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={bookingDetails.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-crystal-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={bookingDetails.phone}
                      onChange={handleChange}
                      required
                      placeholder="+971 50 123 4567"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-crystal-500"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={bookingDetails.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-crystal-500"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Address (Building, Apt, Street)
                </label>
                <textarea
                  name="address"
                  value={bookingDetails.address}
                  onChange={handleChange}
                  required
                  rows="2"
                  placeholder="e.g., Marina Heights, Apt 1402, Dubai Marina"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-crystal-500"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Google Maps Location Link (Optional but recommended)
                </label>
                <input
                  type="url"
                  name="mapLink"
                  value={bookingDetails.mapLink}
                  onChange={handleChange}
                  placeholder="https://maps.app.goo.gl/..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-crystal-500"
                />
              </div>
            </motion.div>

            {/* 3. Schedule */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-crystal-500" /> Schedule
                Your Service
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                    <input
                      type="date"
                      name="date"
                      value={bookingDetails.date}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-crystal-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Time
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                    <input
                      type="time"
                      name="time"
                      value={bookingDetails.time}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-crystal-500"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 4. Payment Method */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Lock className="w-5 h-5 mr-2 text-crystal-500" /> Payment
                Method
              </h2>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cash")}
                  className={`p-4 border-2 rounded-xl flex items-center justify-center font-bold transition ${paymentMethod === "cash" ? "border-crystal-500 bg-crystal-50 text-crystal-600" : "border-gray-200 text-gray-500 hover:border-gray-300"}`}
                >
                  <Banknote className="w-5 h-5 mr-2" /> Cash on Service
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`p-4 border-2 rounded-xl flex items-center justify-center font-bold transition ${paymentMethod === "card" ? "border-crystal-500 bg-crystal-50 text-crystal-600" : "border-gray-200 text-gray-500 hover:border-gray-300"}`}
                >
                  <CardIcon className="w-5 h-5 mr-2" /> Credit / Debit Card
                </button>
              </div>

              {/* Cash UI */}
              {paymentMethod === "cash" && (
                <div className="bg-green-50 border border-green-100 text-green-700 p-4 rounded-xl text-sm">
                  Please have the exact amount ready in cash when our cleaning
                  crew arrives. You will receive a digital receipt upon
                  completion.
                </div>
              )}

              {/* Card UI (Coming Soon Placeholder) */}
              {paymentMethod === "card" && (
                <div className="relative opacity-50 pointer-events-none">
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Card Number"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200"
                      />
                      <input
                        type="text"
                        placeholder="CVC"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200"
                      />
                    </div>
                  </div>
                  {/* Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
                    <span className="bg-gray-900 text-white px-4 py-2 rounded-full text-xs font-bold flex items-center">
                      <Lock className="w-3 h-3 mr-2" /> Card Payments Coming
                      Soon (Stripe)
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Column: Submit Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 sticky top-24 flex flex-col h-fit">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Complete Booking
              </h3>

              <div className="space-y-2 mb-6 text-sm text-gray-600">
                <p>
                  Payment Method:{" "}
                  <span className="font-bold text-gray-800 capitalize">
                    {paymentMethod === "cash" ? "Cash on Service" : "Card"}
                  </span>
                </p>
                {paymentMethod === "cash" && (
                  <p className="text-xs">Pay directly to the crew.</p>
                )}
              </div>

              <div className="border-t border-gray-100 pt-6 mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-800">
                    {cartTotal} AED
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xl font-bold text-gray-800">
                    Total to Pay
                  </span>
                  <span className="text-2xl font-bold text-crystal-600">
                    {cartTotal} AED
                  </span>
                </div>
              </div>

              {/* Replace the submit button with this */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full mt-8 bg-crystal-500 text-white py-4 rounded-xl hover:bg-crystal-600 transition font-bold text-lg flex items-center justify-center disabled:bg-crystal-300"
              >
                {isProcessing
                  ? "Confirming..."
                  : cartTotal === 0
                    ? "Submit Request"
                    : `Confirm Booking (${cartTotal} AED)`}
              </button>

              {error && (
                <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm flex items-center justify-between mt-4">
                  <span>{error}</span>
                  <button type="button" onClick={() => setError(null)}>
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              <div className="mt-6 bg-crystal-50 p-4 rounded-xl text-xs text-crystal-700 flex items-start">
                <CreditCard className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" /> By
                confirming, you agree to our Terms of Service and Cancellation
                Policy.
              </div>
            </div>
          </motion.div>
        </form>
      </div>
    </div>
  );
}
