import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  CheckCircle,
  ArrowLeft,
  Minus,
  Plus,
  ShoppingCart,
  CalendarCheck,
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import ServiceIntro from "../../components/ServiceIntro";
import RelatedServices from "../../components/RelatedServices";
import { Heart, ShieldCheck, Smile } from "lucide-react";

export default function BabysittingMaid() {
  const { addToCart } = useCart();
  const [hours, setHours] = useState(2);
  const [crew, setCrew] = useState(1);
  const [added, setAdded] = useState(false);

  // Higher pricing for specialized childcare/maid services
  const getRate = (h) => {
    if (h === 2) return 50;
    if (h > 2 && h < 4) return 45;
    return 40;
  };

  const ratePerHour = getRate(hours);
  const totalAmount = hours * crew * ratePerHour;

  const handleAddToCart = () => {
    addToCart({
      service: "Babysitting & Maid",
      hours,
      crew,
      ratePerHour,
      totalAmount,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const scrollToPicker = () =>
    document
      .getElementById("booking-picker")
      .scrollIntoView({ behavior: "smooth", block: "center" });

  return (
    <div className="pt-20 pb-32 bg-white min-h-screen">
      <Helmet>
        <title>
          Babysitting & Maid Services in Dubai | Lucky Crystal Maids
        </title>
        <meta
          name="description"
          content="Trusted babysitters and maids in Dubai. Background-checked, reliable, and caring. Childcare, light housekeeping, and school runs. Book a sitter today!"
        />
      </Helmet>

      <div className="relative h-[400px] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?auto=format&fit=crop&w=1600&q=85"
          alt="Bright family childcare and household support"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/50 via-slate-900/15 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 pt-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/services"
              className="mb-4 inline-flex items-center rounded-full border border-white/40 bg-black/10 px-4 py-2 font-semibold text-white backdrop-blur transition hover:bg-black/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Services
            </Link>
            <h1 className="mb-2 font-display text-4xl font-bold text-white drop-shadow-sm md:text-6xl">
              Babysitting & Maid in Dubai
            </h1>
            <p className="mb-6 text-xl text-white drop-shadow-sm">
              Trusted care for your home and little ones.
            </p>
            <button
              onClick={scrollToPicker}
              className="flex items-center bg-indigo-500 text-white px-6 py-3 rounded-full hover:bg-indigo-600 transition shadow-lg font-bold"
            >
              <CalendarCheck className="w-5 h-5 mr-2" /> Book Now
            </button>
          </motion.div>
        </div>
      </div>

      <ServiceIntro
        title="Babysitting & Maid Services in Dubai"
        description="Babysitting and maid services in Dubai provide families with reliable, vetted professionals to manage childcare and household chores. Balancing a busy career and family life in Dubai can be challenging. Our trusted helpers provide safe, engaging childcare, prepare meals, and handle light housekeeping, ensuring your children are cared for and your home runs smoothly while you are at work or away."
        cards={[
          {
            icon: Heart,
            title: "Compassionate Care",
            desc: "Our sitters engage your children in playful, educational activities while ensuring their safety.",
          },
          {
            icon: ShieldCheck,
            title: "Verified Professionals",
            desc: "Every maid and babysitter is strictly background-checked and interviewed for your peace of mind.",
          },
          {
            icon: Smile,
            title: "Household Support",
            desc: "Beyond childcare, they handle meal prep, school runs, and light tidying to ease your daily load.",
          },
        ]}
      />

      <div className="container mx-auto px-6 max-w-6xl mt-16 grid md:grid-cols-3 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="md:col-span-2"
        >
          <h2 className="text-3xl font-display font-bold text-gray-800 mb-6">
            Reliable Childcare & Household Help
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Finding someone you trust to care for your children and home in
            Dubai is hard. Our vetted professionals provide peace of mind with
            reliable, loving care. Whether you need a full-time maid in Arabian
            Ranches or a part-time sitter in Downtown Dubai, we've got you
            covered.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {[
              "Verified & background-checked staff",
              "Child meal preparation",
              "Light housekeeping",
              "School run & errands",
              "Engaging playtime activities",
              "Homework assistance",
            ].map((f, i) => (
              <div
                key={i}
                className="flex items-start bg-indigo-50 p-4 rounded-xl"
              >
                <CheckCircle className="w-6 h-6 text-indigo-500 mr-3 flex-shrink-0 mt-1" />
                <span className="text-gray-700">{f}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          id="booking-picker"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8 scroll-mt-24"
        >
          <div className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100 sticky top-24">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Select Your Helper
            </h3>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hours (Min 2, Max 8)
              </label>
              <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-200">
                <button
                  onClick={() => setHours(Math.max(2, hours - 1))}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-xl font-bold text-gray-800">
                  {hours} Hours
                </span>
                <button
                  onClick={() => setHours(Math.min(8, hours + 1))}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Helpers (Min 1, Max 10)
              </label>
              <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-200">
                <button
                  onClick={() => setCrew(Math.max(1, crew - 1))}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-xl font-bold text-gray-800">
                  {crew} Helper{crew > 1 ? "s" : ""}
                </span>
                <button
                  onClick={() => setCrew(Math.min(10, crew + 1))}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl mb-6 text-sm text-gray-600 space-y-1">
              <p>
                Rate:{" "}
                <span className="font-bold text-indigo-600">
                  {ratePerHour} AED/hour
                </span>
              </p>
              <p>
                Calculation: {hours}h × {crew} crew × {ratePerHour} AED
              </p>
              <p className="text-lg font-bold text-gray-800 mt-2 pt-2 border-t border-gray-100">
                Total: {totalAmount} AED
              </p>
            </div>

            <button
              onClick={handleAddToCart}
              className={`w-full flex items-center justify-center py-4 rounded-xl transition font-bold text-lg shadow-lg ${added ? "bg-green-500 text-white" : "bg-indigo-500 text-white hover:bg-indigo-600"}`}
            >
              {added ? (
                "Added to Cart!"
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>

      <RelatedServices intro="Choose dedicated childcare when supervision is the priority, or book household cleaning without childcare duties." services={[
        { title: "Babysitting Services", description: "Arrange child-focused hourly, daytime, evening, weekend, hotel, or event care.", to: "/babysitting-services-dubai", linkText: "Visit babysitting services" },
        { title: "Maid Services", description: "Book flexible household cleaning support for apartments and villas across Dubai.", to: "/maid-services-dubai", linkText: "Visit maid services" },
      ]} />
    </div>
  );
}
