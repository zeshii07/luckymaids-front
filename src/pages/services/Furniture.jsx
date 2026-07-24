// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { Helmet } from "react-helmet-async";
// import {
//   CheckCircle,
//   ArrowLeft,
//   ShoppingCart,
//   Tag,
//   ShieldCheck,
//   Leaf,
//   Clock,
//   Search,
//   SprayCan,
//   Eye,
//   ChevronDown,
//   Sofa,
//   BedDouble,
//   Ruler,
// } from "lucide-react";
// import { useCart } from "../../context/CartContext";
// import ServiceIntro from "../../components/ServiceIntro";
// import { Droplets, Wind } from "lucide-react";

// // Pricing Data
// const sofaPackages = [
//   { id: "sofa1", name: "1 Seater Sofa", price: 80, original: 100 },
//   { id: "sofa2", name: "2 Seater Sofa", price: 120, original: 150 },
//   { id: "sofa3", name: "3 Seater Sofa", price: 160, original: 200 },
//   { id: "sofa4", name: "4 Seater Sofa", price: 200, original: 250 },
//   { id: "sofa5", name: "5 Seater Sofa (L-Shape)", price: 250, original: 300 },
// ];

// const mattressPackages = [
//   { id: "mat1", name: "Single / Twin Mattress", price: 100, original: 130 },
//   { id: "mat2", name: "Double / Full Mattress", price: 120, original: 150 },
//   { id: "mat3", name: "Queen Size Mattress", price: 140, original: 180 },
//   { id: "mat4", name: "King Size Mattress", price: 160, original: 200 },
// ];

// const carpetPackages = [
//   {
//     id: "carp1",
//     name: "Small Carpet (Up to 2x2 m)",
//     price: 100,
//     original: 130,
//   },
//   {
//     id: "carp2",
//     name: "Medium Carpet (Up to 3x4 m)",
//     price: 150,
//     original: 190,
//   },
//   {
//     id: "carp3",
//     name: "Large Carpet (Up to 4x5 m)",
//     price: 200,
//     original: 250,
//   },
//   { id: "carp4", name: "Extra Large Carpet (5m+)", price: 250, original: 320 },
// ];

// const detailedChecklist = [
//   "Deep vacuuming to remove loose dust, dirt, and pet hair",
//   "Application of eco-friendly, fabric-safe pre-treatment sprays",
//   "Targeted stain and spot removal (food, ink, grease, beverage)",
//   "Hot water extraction (steam cleaning) to kill bacteria & dust mites",
//   "Deodorizing treatment to eliminate odors and leave a fresh scent",
//   "Grooming the fabric to restore its original texture and appearance",
// ];

// const processSteps = [
//   {
//     icon: Search,
//     title: "1. Fabric Inspection",
//     desc: "We inspect the upholstery material to choose the safest and most effective cleaning method.",
//   },
//   {
//     icon: SprayCan,
//     title: "2. Stain Pre-Treatment",
//     desc: "Tough stains are targeted with specialized, eco-friendly solvents to break down grime.",
//   },
//   {
//     icon: Eye,
//     title: "3. Deep Extraction",
//     desc: "We use professional hot water extraction machines to pull out embedded dirt and allergens.",
//   },
//   {
//     icon: Sofa,
//     title: "4. Grooming & Drying",
//     desc: "The fabric is groomed for a uniform finish and sped-dried so you can use it quickly.",
//   },
// ];

// const faqs = [
//   {
//     q: "How long does it take for the furniture to dry?",
//     a: "Typically, upholstery and carpets take 4 to 6 hours to dry completely. We use high-speed air movers to accelerate the process whenever possible.",
//   },
//   {
//     q: "Can you remove all types of stains?",
//     a: "While we can remove the vast majority of stains (food, beverage, grease), some older stains like permanent ink or bleach damage may be impossible to remove completely. Our team will manage expectations during the inspection.",
//   },
//   {
//     q: "Is the cleaning solution safe for my children and pets?",
//     a: "Absolutely. We prioritize health and use non-toxic, eco-friendly, pet-safe cleaning detergents that leave no harmful residue.",
//   },
//   {
//     q: "How often should I get my mattress professionally cleaned?",
//     a: "We recommend a professional deep clean for your mattress every 6 to 12 months to eliminate dust mites, dead skin cells, and bacteria, ensuring a healthy sleep environment.",
//   },
// ];

// export default function Furniture() {
//   const { addToCart } = useCart();
//   const [addedId, setAddedId] = useState(null);
//   const [openFaq, setOpenFaq] = useState(null);

//   const handleAddPackage = (pkg, category) => {
//     addToCart({
//       service: `Furniture Clean: ${pkg.name} (${category})`,
//       totalAmount: pkg.price,
//       isPackage: true,
//     });
//     setAddedId(pkg.id);
//     setTimeout(() => setAddedId(null), 2000);
//   };

//   const scrollToSection = (id) => {
//     document
//       .getElementById(id)
//       .scrollIntoView({ behavior: "smooth", block: "start" });
//   };

//   const PackageCard = ({ pkg, category }) => (
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.4 }}
//       className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group hover:shadow-xl transition-all"
//     >
//       <div className="p-6 flex-grow bg-pink-50">
//         <h4 className="text-lg font-bold text-gray-800 mb-2">{pkg.name}</h4>
//         <div className="flex items-end gap-2 mb-3">
//           <span className="text-3xl font-bold text-pink-600">
//             {pkg.price} AED
//           </span>
//           <span className="text-lg text-gray-400 line-through mb-1">
//             {pkg.original} AED
//           </span>
//         </div>
//         <span className="inline-flex items-center text-xs font-bold px-2 py-1 rounded-full bg-green-100 text-green-700">
//           <Tag className="w-3 h-3 mr-1" /> Save {pkg.original - pkg.price} AED
//         </span>
//       </div>
//       <div className="p-4 bg-white">
//         <button
//           onClick={() => handleAddPackage(pkg, category)}
//           className={`w-full flex items-center justify-center py-3 rounded-xl transition font-bold text-sm shadow-sm ${addedId === pkg.id ? "bg-green-500 text-white" : "bg-pink-500 hover:bg-pink-600 text-white"}`}
//         >
//           {addedId === pkg.id ? (
//             "Added!"
//           ) : (
//             <>
//               <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
//             </>
//           )}
//         </button>
//       </div>
//     </motion.div>
//   );

//   return (
//     <div className="pt-20 pb-32 bg-white min-h-screen">
//       <Helmet>
//         <title>
//           Furniture & Upholstery Cleaning in Dubai | Sofa, Mattress, Carpet |
//           Lucky Crystal
//         </title>
//         <meta
//           name="description"
//           content="Professional furniture and upholstery cleaning in Dubai. Expert sofa, mattress, and carpet cleaning packages. Remove stains and dust mites. Book online!"
//         />
//       </Helmet>

//       {/* Hero */}
//       <div className="relative h-[400px] w-full overflow-hidden">
//         <img
//           src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
//           alt="Dubai Upholstery Cleaning"
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-pink-900/90 via-pink-900/50 to-transparent"></div>
//         <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 pt-28">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <Link
//               to="/services"
//               className="inline-flex items-center text-pink-300 mb-4 hover:text-white transition"
//             >
//               <ArrowLeft className="w-4 h-4 mr-2" /> Back to Services
//             </Link>
//             <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-2">
//               Furniture & Upholstery Cleaning
//             </h1>
//             <p className="text-xl text-gray-200 mb-6">
//               Revive your sofas, mattresses, and carpets with our deep
//               extraction service.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
//               <button
//                 onClick={() => scrollToSection("sofa-section")}
//                 className="flex items-center justify-center bg-white text-gray-800 px-6 py-3 rounded-full hover:bg-gray-100 transition shadow-lg font-bold"
//               >
//                 <Sofa className="w-5 h-5 mr-2 text-pink-500" /> Sofa Cleaning
//               </button>
//               <button
//                 onClick={() => scrollToSection("mattress-section")}
//                 className="flex items-center justify-center bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition shadow-lg font-bold"
//               >
//                 <BedDouble className="w-5 h-5 mr-2" /> Mattress Cleaning
//               </button>
//               <button
//                 onClick={() => scrollToSection("carpet-section")}
//                 className="flex items-center justify-center bg-pink-700 text-white px-6 py-3 rounded-full hover:bg-pink-800 transition shadow-lg font-bold"
//               >
//                 <Ruler className="w-5 h-5 mr-2" /> Carpet Cleaning
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       <ServiceIntro
//         title="Furniture & Upholstery Cleaning"
//         description="Furniture and upholstery cleaning is the professional deep extraction of dirt, allergens, and stains from your sofas, mattresses, and carpets. In Dubai's climate, dust mites and humidity can quickly degrade fabric quality and affect indoor air quality. Using industrial-grade hot water extraction machines, we pull out embedded dirt and kill bacteria, reviving your furniture’s appearance and ensuring a hypoallergenic sleep and living environment."
//         cards={[
//           {
//             icon: Droplets,
//             title: "Stain Removal",
//             desc: "We target food, beverage, and ink stains with specialized fabric-safe solvents.",
//           },
//           {
//             icon: Wind,
//             title: "Dust Mite Elimination",
//             desc: "Deep extraction removes the allergens that cause allergies and asthma, especially in mattresses.",
//           },
//           {
//             icon: ShieldCheck,
//             title: "Fabric Protection",
//             desc: "We condition the fabric to extend the life of your expensive furniture and prevent future staining.",
//           },
//         ]}
//       />

//       {/* Sofa Section */}
//       <div id="sofa-section" className="py-16 scroll-mt-20 bg-gray-50">
//         <div className="container mx-auto px-6 max-w-6xl">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-3 flex items-center justify-center">
//               <Sofa className="w-8 h-8 mr-3 text-pink-500" /> Sofa Cleaning
//               Packages
//             </h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               Deep cleaning and stain removal for sofas, couches, and
//               sectionals. We handle all fabric types including microfiber,
//               leather, and cotton.
//             </p>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {sofaPackages.map((pkg) => (
//               <PackageCard key={pkg.id} pkg={pkg} category="Sofa" />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Mattress Section */}
//       <div id="mattress-section" className="py-16 scroll-mt-20 bg-white">
//         <div className="container mx-auto px-6 max-w-6xl">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-3 flex items-center justify-center">
//               <BedDouble className="w-8 h-8 mr-3 text-pink-500" /> Mattress
//               Cleaning Packages
//             </h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               Eliminate dust mites, dead skin cells, and stains for a healthier,
//               hypoallergenic sleep environment.
//             </p>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {mattressPackages.map((pkg) => (
//               <PackageCard key={pkg.id} pkg={pkg} category="Mattress" />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Carpet Section */}
//       <div id="carpet-section" className="py-16 scroll-mt-20 bg-gray-50">
//         <div className="container mx-auto px-6 max-w-6xl">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-3 flex items-center justify-center">
//               <Ruler className="w-8 h-8 mr-3 text-pink-500" /> Carpet Cleaning
//               Packages
//             </h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               Powerful steam extraction for area rugs and wall-to-wall carpets
//               to remove deep-seated dirt and pet dander.
//             </p>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {carpetPackages.map((pkg) => (
//               <PackageCard key={pkg.id} pkg={pkg} category="Carpet" />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* SEO Content 1: What's Included */}
//       <section className="py-20 bg-white">
//         <div className="container mx-auto px-6 max-w-5xl">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center mb-12"
//           >
//             <p className="text-pink-500 font-semibold mb-2">OUR CHECKLIST</p>
//             <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800">
//               What’s Included in Upholstery Cleaning?
//             </h2>
//             <p className="text-gray-600 mt-4">
//               Dubai's dust and humidity can take a toll on your fabrics. Our
//               extraction method pulls out embedded dirt that regular vacuuming
//               leaves behind.
//             </p>
//           </motion.div>
//           <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
//             {detailedChecklist.map((item, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, x: -20 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: i * 0.05 }}
//                 className="flex items-start mb-4"
//               >
//                 <CheckCircle className="w-6 h-6 text-pink-500 mr-4 flex-shrink-0 mt-1" />
//                 <span className="text-gray-700">{item}</span>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* SEO Content 2: The Process */}
//       <section className="py-20 bg-gray-50">
//         <div className="container mx-auto px-6 max-w-6xl">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center mb-16"
//           >
//             <p className="text-pink-500 font-semibold mb-2">HOW IT WORKS</p>
//             <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800">
//               Our Deep Extraction Process
//             </h2>
//           </motion.div>
//           <div className="grid md:grid-cols-4 gap-8">
//             {processSteps.map((step, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: i * 0.1 }}
//                 className="text-center p-6 bg-white rounded-3xl"
//               >
//                 <div className="bg-gray-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm border border-gray-100">
//                   <step.icon className="w-8 h-8 text-pink-500" />
//                 </div>
//                 <h3 className="text-lg font-bold text-gray-800 mb-2">
//                   {step.title}
//                 </h3>
//                 <p className="text-sm text-gray-600">{step.desc}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* SEO Content 3: Why Choose Us & Trust Badges */}
//       <section className="py-20 bg-pink-50">
//         <div className="container mx-auto px-6 max-w-5xl grid md:grid-cols-2 gap-12 items-center">
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//           >
//             <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-6">
//               Why Choose Lucky Crystal for Furniture Cleaning?
//             </h2>
//             <p className="text-gray-600 mb-8 leading-relaxed">
//               Your furniture is an investment. Our Dubai-based cleaning
//               specialists don't just wipe the surface; we sanitize the core.
//               Using industrial-grade extraction machines, we remove the
//               moisture, dirt, and allergens that cause wear and odors, extending
//               the life of your upholstery.
//             </p>
//             <div className="space-y-4">
//               <div className="flex items-center">
//                 <ShieldCheck className="w-6 h-6 text-pink-500 mr-4" />
//                 <p className="font-medium text-gray-700">
//                   Trained & Background-Checked Professionals
//                 </p>
//               </div>
//               <div className="flex items-center">
//                 <Leaf className="w-6 h-6 text-pink-500 mr-4" />
//                 <p className="font-medium text-gray-700">
//                   Eco-Friendly, Non-Toxic Detergents
//                 </p>
//               </div>
//               <div className="flex items-center">
//                 <Clock className="w-6 h-6 text-pink-500 mr-4" />
//                 <p className="font-medium text-gray-700">
//                   Fast Drying Times & 100% Satisfaction Guarantee
//                 </p>
//               </div>
//             </div>
//           </motion.div>
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true }}
//             className="rounded-3xl overflow-hidden shadow-xl"
//           >
//             <img
//               src="https://images.unsplash.com/photo-1582582494705-f8ce0b0c24f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
//               alt="Professional Carpet Cleaning"
//               className="w-full h-[400px] object-cover"
//             />
//           </motion.div>
//         </div>
//       </section>

//       {/* SEO Content 4: FAQ Section */}
//       <section className="py-20 bg-white">
//         <div className="container mx-auto px-6 max-w-3xl">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center mb-12"
//           >
//             <p className="text-pink-500 font-semibold mb-2">FAQS</p>
//             <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800">
//               Furniture & Carpet Cleaning FAQs
//             </h2>
//           </motion.div>
//           <div className="space-y-4">
//             {faqs.map((faq, i) => (
//               <div
//                 key={i}
//                 className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden"
//               >
//                 <button
//                   onClick={() => setOpenFaq(openFaq === i ? null : i)}
//                   className="w-full flex justify-between items-center p-6 text-left"
//                 >
//                   <span className="font-semibold text-gray-800">{faq.q}</span>
//                   <ChevronDown
//                     className={`w-5 h-5 text-pink-500 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
//                   />
//                 </button>
//                 <motion.div
//                   initial={{ height: 0, opacity: 0 }}
//                   animate={
//                     openFaq === i
//                       ? { height: "auto", opacity: 1 }
//                       : { height: 0, opacity: 0 }
//                   }
//                   className="overflow-hidden"
//                 >
//                   <p className="p-6 pt-0 text-gray-600">{faq.a}</p>
//                 </motion.div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Final CTA Banner */}
//       <section className="py-16 bg-white">
//         <div className="container mx-auto px-6">
//           <div className="bg-gradient-to-br from-pink-600 to-pink-800 rounded-[3rem] p-12 md:p-16 text-center shadow-2xl">
//             <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
//               Ready to Refresh Your Furniture?
//             </h2>
//             <p className="text-pink-100 text-lg mb-8 max-w-2xl mx-auto">
//               Book our upholstery cleaning service today and make your sofas and
//               carpets look brand new.
//             </p>
//             <button
//               onClick={() => scrollToSection("sofa-section")}
//               className="bg-white text-pink-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition shadow-lg"
//             >
//               View Packages & Book Now
//             </button>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }


import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, ArrowLeft, ShoppingCart, Sofa, BedDouble, Ruler, Tag, ChevronDown, Search, SprayCan, Eye, Wind, Droplets, ShieldCheck, XCircle, Clock, MapPin, UserCheck, Settings, Building } from 'lucide-react';
import { useCart } from '../../context/CartContext';

// --- Pricing Data ---
const sofaPackages = [
  { id: 'sofa1', name: '1 Seater Sofa', price: 80, original: 100 },
  { id: 'sofa2', name: '2 Seater Sofa', price: 120, original: 150 },
  { id: 'sofa3', name: '3 Seater Sofa', price: 160, original: 200 },
  { id: 'sofa4', name: '4 Seater Sofa', price: 200, original: 250 },
  { id: 'sofa5', name: '5 Seater Sofa (L-Shape)', price: 250, original: 300 },
];

const mattressPackages = [
  { id: 'mat1', name: 'Single / Twin Mattress', price: 100, original: 130 },
  { id: 'mat2', name: 'Double / Full Mattress', price: 120, original: 150 },
  { id: 'mat3', name: 'Queen Size Mattress', price: 140, original: 180 },
  { id: 'mat4', name: 'King Size Mattress', price: 160, original: 200 },
];

const carpetPackages = [
  { id: 'carp1', name: 'Small Carpet (Up to 2x2 m)', price: 100, original: 130 },
  { id: 'carp2', name: 'Medium Carpet (Up to 3x4 m)', price: 150, original: 190 },
  { id: 'carp3', name: 'Large Carpet (Up to 4x5 m)', price: 200, original: 250 },
  { id: 'carp4', name: 'Extra Large Carpet (5m+)', price: 250, original: 320 },
];

// --- Content Data ---
const specialistCleaning = ["Sofas", "Mattresses", "Upholstered chairs", "Dining chairs", "Office chairs", "Armchairs", "Fabric headboards", "Carpets", "Rugs", "Curtains", "Fabric panels", "Ottomans", "Benches", "Cushions", "Selected leather furniture"];

const assessmentList = ["Furniture material", "Fabric color", "Fabric condition", "Existing damage", "Stain type", "Level of soiling", "Manufacturer care label", "Colorfastness", "Drying requirements", "Cleaning accessibility", "Age of the furniture", "Previous cleaning attempts"];

const methodsList = ["Dry vacuuming", "Fabric pre-treatment", "Spot treatment", "Shampoo cleaning", "Hot-water extraction", "Steam-assisted cleaning", "Low-moisture cleaning", "Manual upholstery cleaning", "Deodorizing", "Surface sanitization", "Controlled drying"];

const benefitsList = ["Remove accumulated surface dirt", "Lift many common stains", "Reduce unpleasant odors", "Refresh fabric colors", "Remove pet hair", "Reduce trapped dust", "Improve the overall appearance of furniture", "Maintain a cleaner indoor environment", "Extend the usable life of suitable furniture", "Improve presentation before guests, tenants, or customers arrive"];

const sofaTypes = ["Fabric sofas", "Sectional sofas", "L-shaped sofas", "Three-seater sofas", "Two-seater sofas", "Single-seater sofas", "Sofa beds", "Recliner sofas", "Modular sofas", "Corner sofas", "Office reception sofas", "Majlis seating", "Upholstered benches", "Dining benches"];

const sofaStains = ["Tea", "Coffee", "Juice", "Soft drinks", "Food spills", "Chocolate", "Makeup", "Body oils", "Dust", "Mud", "Pet accidents", "Water marks", "General household use"];

const processSteps = [
  { icon: Search, title: "Step 1 — Furniture Inspection", desc: "Technician checks fabric type, construction, existing damage, loose stitching, color stability, stain condition, areas of heavy use, cleaning-code labels, and moisture sensitivity." },
  { icon: Wind, title: "Step 2 — Dry Vacuuming", desc: "Loose dust, crumbs, hair, and surface particles are removed from accessible areas, cushion edges, seams, corners, armrests, and gaps between sections." },
  { icon: Droplets, title: "Step 3 — Spot and Stain Pre-Treatment", desc: "Visible stains are treated individually using suitable products. Product and contact time depend on fabric type, stain type, stain age, previous chemicals, and colorfastness." },
  { icon: SprayCan, title: "Step 4 — Fabric Cleaning", desc: "The selected cleaning solution is applied using a controlled method (hand cleaning, brushing, shampooing, extraction, low-moisture, or steam-assisted) to loosen soil while minimizing moisture." },
  { icon: Eye, title: "Step 5 — Extraction", desc: "Where suitable, professional extraction equipment removes dirty cleaning solution, loosened residue, excess moisture, and surface soil to improve results and reduce drying time." },
  { icon: CheckCircle, title: "Step 6 — Final Inspection", desc: "After cleaning, the technician reviews treated stains, fabric appearance, moisture level, cleaned sections, remaining permanent marks, and drying requirements." },
  { icon: Clock, title: "Step 7 — Drying", desc: "Furniture should be allowed to dry completely before heavy use. Drying time depends on fabric thickness, cushion filling, room ventilation, humidity, and cleaning method." }
];

const whyChooseUs = [
  { icon: UserCheck, title: "Trained Upholstery Cleaning Technicians", desc: "Our technicians understand that upholstery requires more care than general surface cleaning. They assess the material before selecting a cleaning method." },
  { icon: Settings, title: "Professional Cleaning Equipment", desc: "We use equipment specifically designed for furniture, mattress, carpet, and upholstery cleaning." },
  { icon: MapPin, title: "On-Site Service", desc: "Most cleaning is completed at your home or business, reducing the need to transport heavy furniture." },
  { icon: ShieldCheck, title: "Customized Cleaning", desc: "We tailor the service according to furniture type, quantity, fabric, condition, and stain level." },
  { icon: Building, title: "Residential and Commercial Experience", desc: "We serve private homes, offices, hospitality businesses, restaurants, clinics, and property managers." },
  { icon: Clock, title: "Flexible Scheduling", desc: "Appointments may be available on weekdays, weekends, and outside standard business hours, subject to team availability." }
];

const limitations = ["Fabric tears", "Burn marks", "Bleach stains", "Permanent dye loss", "Deep ink stains", "Paint", "Glue", "Rust", "Cracked leather", "Peeling leather", "Broken foam", "Loose springs", "Damaged frames", "Water-damaged internal padding", "Severe mold contamination", "Pest infestation", "Strong odors inside damaged foam", "Previous chemical damage"];

const areasServed = ["Downtown Dubai", "Business Bay", "Dubai Marina", "Jumeirah Beach Residence", "Jumeirah Lake Towers", "Palm Jumeirah", "Jumeirah", "Umm Suqeim", "Al Barsha", "Barsha Heights", "Jumeirah Village Circle", "Jumeirah Village Triangle", "Dubai Hills Estate", "Arabian Ranches", "Emirates Hills", "The Springs", "The Meadows", "The Lakes", "Dubai Sports City", "Motor City", "Damac Hills", "Town Square Dubai", "Mudon", "Dubai Silicon Oasis", "International City", "Discovery Gardens", "The Gardens", "Al Furjan", "Mirdif", "Nad Al Sheba", "Meydan", "Dubai Creek Harbour", "Dubai Festival City", "Al Nahda", "Deira", "Bur Dubai", "Al Karama", "Dubai South"];

const faqs = [
  { q: "How often should furniture be professionally cleaned?", a: "Most homes may benefit from professional furniture cleaning every six to twelve months. Homes with children, pets, allergies, frequent guests, or heavy sofa use may require more frequent cleaning." },
  { q: "How long does sofa cleaning take?", a: "Cleaning time depends on sofa size, fabric, number of cushions, stains, and cleaning method. A small sofa may take less time than a large sectional or majlis seating area." },
  { q: "How long does furniture take to dry?", a: "Drying may take several hours. Thick fabric, large cushions, humid weather, and limited ventilation can increase drying time." },
  { q: "Can I sit on the sofa immediately after cleaning?", a: "No. The sofa should dry fully before use to avoid marks, odors, or uneven drying." },
  { q: "Can you remove every stain?", a: "No cleaning company can responsibly guarantee every stain. Results depend on the stain, fabric, age, previous treatment, and existing damage." },
  { q: "Do you clean removable sofa cushions?", a: "Yes, suitable removable cushions can usually be cleaned. Share the total number of cushions when requesting a quotation." },
  { q: "Do you clean leather sofas?", a: "We clean selected leather furniture using suitable products. Leather repair, recoloring, and restoration are separate specialist services." },
  { q: "Is steam cleaning suitable for every sofa?", a: "No. Some fabrics are sensitive to heat or moisture. The technician will select a safer method after inspection." },
  { q: "Can you clean delicate fabrics?", a: "Some delicate fabrics may require specialist dry cleaning or off-site treatment. We assess the material before proceeding." },
  { q: "Do you clean mattresses on both sides?", a: "Both sides may be cleaned when requested, accessible, and suitable. This should be confirmed during booking." },
  { q: "Can mattress cleaning remove odors?", a: "It may reduce many surface-related odors. Deep odors inside foam or damaged material may remain." },
  { q: "Can you clean office chairs in bulk?", a: "Yes. We provide bulk office-chair cleaning for companies, schools, hotels, clinics, and other commercial properties." },
  { q: "Do you move furniture?", a: "Light furniture may be repositioned where safe. Heavy furniture moving is not normally included and may require additional workers or movers." },
  { q: "Are cleaning products safe for children and pets?", a: "We use products selected for professional upholstery cleaning. Children and pets should remain away from the area until the furniture is fully dry." },
  { q: "Do you provide same-day furniture cleaning?", a: "Same-day service may be available depending on location, team schedule, item quantity, and equipment requirements. Advance booking is recommended." },
  { q: "Can I book sofa and mattress cleaning together?", a: "Yes. Multiple furniture items can be included in one booking. Send photographs and quantities for an accurate quotation." },
  { q: "Do you clean carpets and curtains?", a: "Yes, suitable carpets, rugs, and curtains can be cleaned. Delicate materials may require specialist treatment." },
  { q: "Should I vacuum before the appointment?", a: "It is not necessary because dry vacuuming is normally part of the professional process. However, remove personal items and loose objects." },
  { q: "Do you provide services for hotels and restaurants?", a: "Yes. We clean furniture for hotels, restaurants, cafés, offices, clinics, and other businesses." },
  { q: "Can you remove pet hair and pet odors?", a: "Vacuuming and cleaning can remove much of the accessible pet hair and reduce many odors. Deep contamination inside foam may require additional treatment." }
];

export default function Furniture() {
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const handleAddPackage = (pkg, category) => {
    addToCart({ service: `Furniture Clean: ${pkg.name} (${category})`, totalAmount: pkg.price, isPackage: true });
    setAddedId(pkg.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  const scrollToSection = (id) => document.getElementById(id).scrollIntoView({ behavior: 'smooth', block: 'start' });

  const PackageCard = ({ pkg, category }) => (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group hover:shadow-xl transition-all">
      <div className="p-6 flex-grow bg-pink-50">
        <h4 className="text-lg font-bold text-gray-800 mb-2">{pkg.name}</h4>
        <div className="flex items-end gap-2 mb-3">
          <span className="text-3xl font-bold text-pink-600">{pkg.price} AED</span>
          <span className="text-lg text-gray-400 line-through mb-1">{pkg.original} AED</span>
        </div>
        <span className="inline-flex items-center text-xs font-bold px-2 py-1 rounded-full bg-green-100 text-green-700">
          <Tag className="w-3 h-3 mr-1" /> Save {pkg.original - pkg.price} AED
        </span>
      </div>
      <div className="p-4 bg-white">
        <button onClick={() => handleAddPackage(pkg, category)} className={`w-full flex items-center justify-center py-3 rounded-xl transition font-bold text-sm shadow-sm ${addedId === pkg.id ? 'bg-green-500 text-white' : 'bg-pink-500 hover:bg-pink-600 text-white'}`}>
          {addedId === pkg.id ? 'Added!' : (<><ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart</>)}
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="pt-20 pb-32 bg-white min-h-screen">
      <Helmet>
        <title>Furniture Cleaning Dubai | Sofa, Mattress & Upholstery</title>
        <meta name="description" content="Book professional furniture cleaning services in Dubai for sofas, mattresses, chairs, carpets, curtains, and upholstery. Advanced stain, dust, odor, and fabric cleaning for homes and businesses." />
        <meta name="keywords" content="Furniture cleaning Dubai, Furniture cleaning services Dubai, Professional furniture cleaning Dubai, Upholstery cleaning Dubai, Sofa cleaning Dubai, Mattress cleaning Dubai, Carpet cleaning Dubai, Curtain cleaning Dubai, Sofa cleaning services Dubai, Sofa shampooing Dubai, Sofa steam cleaning Dubai, Fabric sofa cleaning Dubai, Deep sofa cleaning Dubai, Couch cleaning Dubai, L-shaped sofa cleaning Dubai, Sectional sofa cleaning Dubai, Majlis cleaning Dubai, Sofa stain removal Dubai, Sofa odor removal Dubai, Mattress cleaning services Dubai, Mattress deep cleaning Dubai, Mattress shampooing Dubai, Mattress steam cleaning Dubai, King-size mattress cleaning Dubai, Queen-size mattress cleaning Dubai, Mattress stain removal Dubai, Mattress odor treatment Dubai, Professional mattress cleaners Dubai, Upholstery cleaning services Dubai, Chair cleaning Dubai, Dining chair cleaning Dubai, Office chair cleaning Dubai, Fabric chair cleaning Dubai, Armchair cleaning Dubai, Headboard cleaning Dubai, Ottoman cleaning Dubai, Upholstered bench cleaning Dubai, Carpet shampooing Dubai, Carpet deep cleaning Dubai, Rug cleaning Dubai, Office carpet cleaning Dubai, Curtain steam cleaning Dubai, Curtain cleaning services Dubai, On-site curtain cleaning Dubai, Residential carpet cleaning Dubai, Commercial carpet cleaning Dubai, Office furniture cleaning Dubai, Hotel furniture cleaning Dubai, Restaurant chair cleaning Dubai, Commercial upholstery cleaning Dubai, Bulk chair cleaning Dubai, Reception sofa cleaning Dubai, Hotel mattress cleaning Dubai, Clinic chair cleaning Dubai, Best sofa cleaning company Dubai, Affordable furniture cleaning Dubai, Professional sofa cleaners Dubai, Furniture cleaning company Dubai, Book sofa cleaning Dubai, Same-day sofa cleaning Dubai, Sofa cleaning near me, Mattress cleaning near me, Upholstery cleaners near me, Furniture cleaners near me" />
      </Helmet>

      {/* Hero Section */}
      <div className="relative h-[500px] w-full overflow-hidden">
        <img src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" alt="Professional furniture cleaning services in Dubai" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-pink-900/95 via-pink-900/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 pt-28">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/services" className="inline-flex items-center text-pink-300 mb-4 hover:text-white transition"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Services</Link>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-4 max-w-4xl">Professional Furniture Cleaning Services in Dubai</h1>
            <p className="text-lg text-gray-200 mb-8 max-w-3xl">Furniture is one of the most frequently used parts of any home, office, hotel, restaurant, or commercial property. Sofas, mattresses, dining chairs, carpets, curtains, and upholstered furniture collect dust, body oils, food particles, pet hair, spills, odors, and airborne allergens over time. Our professional furniture cleaning services in Dubai are designed to refresh, clean, and improve the appearance of residential and commercial furniture using suitable equipment, fabric-safe products, and proven cleaning methods.</p>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <button onClick={() => scrollToSection('sofa-section')} className="flex items-center justify-center bg-white text-gray-800 px-6 py-3 rounded-full hover:bg-gray-100 transition shadow-lg font-bold">
                <Sofa className="w-5 h-5 mr-2 text-pink-500" /> Sofa Cleaning
              </button>
              <button onClick={() => scrollToSection('mattress-section')} className="flex items-center justify-center bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition shadow-lg font-bold">
                <BedDouble className="w-5 h-5 mr-2" /> Mattress Cleaning
              </button>
              <button onClick={() => scrollToSection('carpet-section')} className="flex items-center justify-center bg-pink-700 text-white px-6 py-3 rounded-full hover:bg-pink-800 transition shadow-lg font-bold">
                <Ruler className="w-5 h-5 mr-2" /> Carpet Cleaning
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Complete Solutions & Why Important */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-6 text-center">Complete Furniture Cleaning Solutions in Dubai</h2>
            <p className="text-lg text-gray-600 leading-relaxed text-center max-w-4xl mx-auto mb-6">
              Furniture cleaning is not a one-method service. Different fabrics, materials, fillings, colors, and construction methods respond differently to moisture, heat, chemicals, and agitation. Before cleaning begins, our technicians review the furniture material, fabric color, condition, existing damage, stain type, level of soiling, manufacturer care label, colorfastness, drying requirements, cleaning accessibility, age of the furniture, and previous cleaning attempts. Based on this assessment, we select the most appropriate cleaning process.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto mb-8">
              {methodsList.map((item, i) => (
                <div key={i} className="flex items-center bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-100">
                  <CheckCircle className="w-5 h-5 text-pink-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-6 text-center">Why Professional Furniture Cleaning Is Important</h2>
            <p className="text-lg text-gray-600 leading-relaxed text-center max-w-4xl mx-auto mb-8">Furniture may appear clean from a distance while still holding dust, hair, crumbs, skin particles, residue, and odors inside the fabric. Professional cleaning is especially useful in Dubai, where air-conditioning, dust, sand, humidity, frequent indoor living, and closed windows can contribute to faster dirt accumulation on soft furnishings.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {benefitsList.map((item, i) => (
                <div key={i} className="flex items-start bg-pink-50 p-4 rounded-xl border border-pink-100">
                  <CheckCircle className="w-5 h-5 text-pink-500 mr-3 flex-shrink-0 mt-1" />
                  <span className="text-gray-700 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Packages */}
      <div id="sofa-section" className="py-16 scroll-mt-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-3 flex items-center justify-center"><Sofa className="w-8 h-8 mr-3 text-pink-500" /> Sofa Cleaning Packages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">The sofa is often the most heavily used piece of furniture in a home. Our professional sofa cleaning helps restore the appearance and freshness of your sofa without the inconvenience of replacing it.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sofaPackages.map(pkg => <PackageCard key={pkg.id} pkg={pkg} category="Sofa" />)}
          </div>
        </div>
      </div>

      <div id="mattress-section" className="py-16 scroll-mt-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-3 flex items-center justify-center"><BedDouble className="w-8 h-8 mr-3 text-pink-500" /> Mattress Cleaning Packages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">A mattress is used for several hours every night and can collect dust, body oils, perspiration, hair, skin particles, spills, and general household residue. Our service helps refresh the sleeping surface.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mattressPackages.map(pkg => <PackageCard key={pkg.id} pkg={pkg} category="Mattress" />)}
          </div>
        </div>
      </div>

      <div id="carpet-section" className="py-16 scroll-mt-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-3 flex items-center justify-center"><Ruler className="w-8 h-8 mr-3 text-pink-500" /> Carpet Cleaning Packages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Carpets and rugs can hold dust, sand, hair, food particles, stains, and odors below the visible surface. Our extraction methods pull out embedded dirt.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {carpetPackages.map(pkg => <PackageCard key={pkg.id} pkg={pkg} category="Carpet" />)}
          </div>
        </div>
      </div>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-4">Our Furniture Cleaning Process</motion.h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="bg-pink-100 w-12 h-12 rounded-xl flex items-center justify-center mr-4">
                    <step.icon className="w-6 h-6 text-pink-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">{step.title}</h3>
                </div>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us & Limitations */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl grid md:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-display font-bold text-gray-800 mb-6">Why Choose Our Furniture Cleaning Company?</h2>
            <div className="space-y-4">
              {whyChooseUs.map((point, i) => (
                <div key={i} className="flex items-start bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <div className="bg-pink-100 p-2 rounded-lg mr-4 flex-shrink-0">
                    <point.icon className="w-5 h-5 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{point.title}</h3>
                    <p className="text-gray-600 text-sm">{point.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-display font-bold text-gray-800 mb-6">What Professional Cleaning May Not Fix</h2>
            <p className="text-gray-600 mb-6">Cleaning improves cleanliness and appearance, but it cannot repair structural or material damage. Customers should inform the technician of known damage before cleaning.</p>
            <div className="grid grid-cols-2 gap-3">
              {limitations.map((item, i) => (
                <div key={i} className="flex items-center bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                  <XCircle className="w-4 h-4 text-red-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700 text-xs font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Areas Served */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-4">Areas We Serve Across Dubai</motion.h2>
          <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">We serve customers across many Dubai communities. Service availability depends on the booking date, property access, item quantity, and required equipment.</motion.p>
          <div className="flex flex-wrap justify-center gap-3">
            {areasServed.map((area, i) => (
              <span key={i} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium flex items-center"><MapPin className="w-3 h-3 mr-2 text-pink-500" />{area}</span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800">Frequently Asked Questions</h2>
          </motion.div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex justify-between items-center p-6 text-left">
                  <h3 className="text-base font-semibold text-gray-800">{faq.q}</h3>
                  <ChevronDown className={`w-5 h-5 text-pink-500 transition-transform flex-shrink-0 ml-4 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <motion.div initial={{ height: 0, opacity: 0 }} animate={openFaq === i ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }} className="overflow-hidden">
                  <p className="p-6 pt-0 text-gray-600 text-sm">{faq.a}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-br from-pink-600 to-pink-800 rounded-[3rem] p-12 md:p-16 text-center shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Refresh Your Sofas, Mattresses, Carpets, and Upholstery</h2>
            <p className="text-pink-100 text-lg mb-8 max-w-2xl mx-auto">Dirty or stained furniture can affect the comfort and appearance of your entire property. Contact us today to share your furniture photos, dimensions, and stain details for a customized quotation.</p>
            <button onClick={() => scrollToSection('sofa-section')} className="bg-white text-pink-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition shadow-lg">
              Book Furniture Cleaning
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}