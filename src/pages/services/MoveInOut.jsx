// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { Helmet } from "react-helmet-async";
// import {
//   CheckCircle,
//   ArrowLeft,
//   ShoppingCart,
//   Home,
//   Building,
//   Tag,
//   ShieldCheck,
//   Leaf,
//   Clock,
//   Search,
//   SprayCan,
//   Eye,
//   ChevronDown,
//   KeyRound,
// } from "lucide-react";
// import { useCart } from "../../context/CartContext";
// import ServiceIntro from "../../components/ServiceIntro";
// import { FileCheck, Truck } from "lucide-react";

// // Pricing Data (Mirroring Deep Cleaning)
// const villaFurnished = [
//   { id: "mvf1", name: "1 Bedroom Villa", price: 400, original: 450 },
//   { id: "mvf2", name: "2 Bedroom Villa", price: 500, original: 550 },
//   { id: "mvf3", name: "3 Bedroom Villa", price: 600, original: 700 },
//   { id: "mvf4", name: "4 Bedroom Villa", price: 700, original: 800 },
//   { id: "mvf5", name: "5 Bedroom Villa", price: 800, original: 950 },
// ];

// const villaUnfurnished = [
//   { id: "mvu1", name: "1 Bedroom Villa", price: 350, original: 400 },
//   { id: "mvu2", name: "2 Bedroom Villa", price: 450, original: 500 },
//   { id: "mvu3", name: "3 Bedroom Villa", price: 550, original: 650 },
//   { id: "mvu4", name: "4 Bedroom Villa", price: 650, original: 750 },
//   { id: "mvu5", name: "5 Bedroom Villa", price: 750, original: 900 },
// ];

// const apartments = [
//   { id: "map0", name: "Studio Apartment", price: 250, original: 300 },
//   { id: "map1", name: "1 Bedroom Apartment", price: 300, original: 350 },
//   { id: "map2", name: "2 Bedroom Apartment", price: 350, original: 400 },
//   { id: "map3", name: "3 Bedroom Apartment", price: 400, original: 450 },
// ];

// const detailedChecklist = [
//   "Deep cleaning of all empty cabinets, wardrobes, and drawers",
//   "Heavy duty kitchen degreasing (oven, stovetop, extractor)",
//   "Inside and outside of all appliances (if requested)",
//   "Descaling bathrooms (tiles, showerheads, faucets, toilets)",
//   "Scrubbing grout lines and sanitizing all floors",
//   "Dusting ceiling fans, light fixtures, and skirting boards",
//   "Cleaning window tracks, frames, and internal glass",
//   "Wall spot cleaning and cobweb removal",
//   "Balcony and patio sweeping and washing",
// ];

// const processSteps = [
//   {
//     icon: Search,
//     title: "1. Property Assessment",
//     desc: "We assess the empty property to identify areas that require special attention to meet landlord or Real Estate Agent (Ejari) standards.",
//   },
//   {
//     icon: SprayCan,
//     title: "2. Equipment Prep",
//     desc: "Our team arrives fully equipped with industrial-grade degreasers, descalers, and eco-friendly cleaning agents.",
//   },
//   {
//     icon: KeyRound,
//     title: "3. Comprehensive Deep Clean",
//     desc: "We execute a top-to-bottom scrub down of every room, focusing on deposit-critical areas like kitchens and bathrooms.",
//   },
//   {
//     icon: Eye,
//     title: "4. Final Walkthrough",
//     desc: "A strict quality inspection ensures the property is spotless and ready for handover, helping secure your full deposit.",
//   },
// ];

// const faqs = [
//   {
//     q: "Will this cleaning help me get my full deposit back?",
//     a: "Yes. Landlords and property managers in Dubai require a professional end-of-tenancy deep clean. Our checklist is specifically designed to meet Real Estate Regulatory Agency (RERA) standards.",
//   },
//   {
//     q: "Do I need to be present during the move-out clean?",
//     a: "No, you do not. In fact, it is easier for our team to clean an empty property. You can hand over the keys to our team leader and relax.",
//   },
//   {
//     q: "What if the property is still furnished?",
//     a: "We can clean around furniture, but please note that move-in/move-out cleans are most effective on empty properties. We offer specific pricing for furnished vs. unfurnished villas.",
//   },
//   {
//     q: "Do you clean the outside windows and balconies?",
//     a: "Internal windows, tracks, and frames are always included. Balcony sweeping and washing are included. External high-rise window cleaning requires specialized equipment and can be quoted separately.",
//   },
// ];

// export default function MoveInOut() {
//   const { addToCart } = useCart();
//   const [addedId, setAddedId] = useState(null);
//   const [openFaq, setOpenFaq] = useState(null);

//   const handleAddPackage = (pkg, type) => {
//     addToCart({
//       service: `Move In/Out: ${pkg.name} (${type})`,
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

//   const PackageCard = ({ pkg, type, accentColor }) => (
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.4 }}
//       className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group hover:shadow-xl transition-all"
//     >
//       <div
//         className={`p-6 flex-grow ${accentColor === "purple" ? "bg-purple-50" : "bg-blue-50"}`}
//       >
//         <h4 className="text-lg font-bold text-gray-800 mb-2">{pkg.name}</h4>
//         <div className="flex items-end gap-2 mb-3">
//           <span
//             className={`text-3xl font-bold ${accentColor === "purple" ? "text-purple-600" : "text-blue-600"}`}
//           >
//             {pkg.price} AED
//           </span>
//           <span className="text-lg text-gray-400 line-through mb-1">
//             {pkg.original} AED
//           </span>
//         </div>
//         <span
//           className={`inline-flex items-center text-xs font-bold px-2 py-1 rounded-full bg-green-100 text-green-700`}
//         >
//           <Tag className="w-3 h-3 mr-1" /> Save {pkg.original - pkg.price} AED
//         </span>
//       </div>
//       <div className="p-4 bg-white">
//         <button
//           onClick={() => handleAddPackage(pkg, type)}
//           className={`w-full flex items-center justify-center py-3 rounded-xl transition font-bold text-sm shadow-sm ${addedId === pkg.id ? "bg-green-500 text-white" : `${accentColor === "purple" ? "bg-purple-500 hover:bg-purple-600" : "bg-blue-500 hover:bg-blue-600"} text-white`}`}
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
//           Move-In & Move-Out Cleaning in Dubai | End of Tenancy | Lucky Crystal
//         </title>
//         <meta
//           name="description"
//           content="Secure your deposit with professional move-in and move-out cleaning in Dubai. Transparent package pricing for empty villas and apartments. Book online!"
//         />
//       </Helmet>

//       {/* Hero */}
//       <div className="relative h-[400px] w-full overflow-hidden">
//         <img
//           src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
//           alt="Dubai Move Out Cleaning"
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-900/50 to-transparent"></div>
//         <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <Link
//               to="/services"
//               className="inline-flex items-center text-purple-300 mb-4 hover:text-white transition"
//             >
//               <ArrowLeft className="w-4 h-4 mr-2" /> Back to Services
//             </Link>
//             <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-2">
//               Move-In / Move-Out Cleaning in Dubai
//             </h1>
//             <p className="text-xl text-gray-200 mb-6">
//               Secure your deposit with our end-of-tenancy deep cleaning
//               packages.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4">
//               <button
//                 onClick={() => scrollToSection("villa-section")}
//                 className="flex items-center justify-center bg-white text-gray-800 px-6 py-3 rounded-full hover:bg-gray-100 transition shadow-lg font-bold"
//               >
//                 <Home className="w-5 h-5 mr-2 text-purple-500" /> Villa Move Out
//               </button>
//               <button
//                 onClick={() => scrollToSection("apartment-section")}
//                 className="flex items-center justify-center bg-purple-500 text-white px-6 py-3 rounded-full hover:bg-purple-600 transition shadow-lg font-bold"
//               >
//                 <Building className="w-5 h-5 mr-2" /> Apartment Move Out
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       <ServiceIntro
//         title="Move-In / Move-Out Cleaning in Dubai"
//         description="Move-in/move-out cleaning in Dubai is a specialized end-of-tenancy deep clean designed to meet the strict handover standards of Dubai landlords and real estate agents. Whether you are vacating a property in JLT and need your full deposit back, or moving into a new home in Dubai Hills and want it pristine before unpacking, our comprehensive checklist ensures every cabinet, appliance, and bathroom is spotless and ready for handover."
//         cards={[
//           {
//             icon: KeyRound,
//             title: "Secure Your Deposit",
//             desc: "We meet RERA standards to ensure landlords have no reason to deduct your security deposit.",
//           },
//           {
//             icon: FileCheck,
//             title: "Real Estate Approved",
//             desc: "Our checklist is recognized by major Dubai property managers for smooth key handovers.",
//           },
//           {
//             icon: Truck,
//             title: "Stress-Free Relocation",
//             desc: "Focus on moving your boxes; let us handle the heavy scrubbing and sanitization.",
//           },
//         ]}
//       />

//       {/* Villa Section */}
//       <div id="villa-section" className="py-16 scroll-mt-20 bg-gray-50">
//         <div className="container mx-auto px-6 max-w-6xl">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-3">
//               Villa Move-Out Packages
//             </h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               Comprehensive top-to-bottom cleaning for your Dubai villa. Perfect
//               for handovers and ensuring full deposit returns.
//             </p>
//           </div>
//           <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
//             <Home className="w-6 h-6 mr-3 text-purple-500" /> Furnished Villas
//           </h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
//             {villaFurnished.map((pkg) => (
//               <PackageCard
//                 key={pkg.id}
//                 pkg={pkg}
//                 type="Furnished"
//                 accentColor="purple"
//               />
//             ))}
//           </div>
//           <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
//             <Home className="w-6 h-6 mr-3 text-gray-400" /> Unfurnished Villas
//           </h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {villaUnfurnished.map((pkg) => (
//               <PackageCard
//                 key={pkg.id}
//                 pkg={pkg}
//                 type="Unfurnished"
//                 accentColor="purple"
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Apartment Section */}
//       <div id="apartment-section" className="py-16 scroll-mt-20 bg-white">
//         <div className="container mx-auto px-6 max-w-6xl">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-3">
//               Apartment Move-Out Packages
//             </h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               Detailed end-of-tenancy cleaning for apartments and studios. Meets
//               all Dubai property manager requirements.
//             </p>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {apartments.map((pkg) => (
//               <PackageCard
//                 key={pkg.id}
//                 pkg={pkg}
//                 type="Apartment"
//                 accentColor="blue"
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* SEO Content 1: What's Included */}
//       <section className="py-20 bg-gray-50">
//         <div className="container mx-auto px-6 max-w-5xl">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center mb-12"
//           >
//             <p className="text-purple-500 font-semibold mb-2">OUR CHECKLIST</p>
//             <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800">
//               What’s Included in Our Move-Out Clean?
//             </h2>
//             <p className="text-gray-600 mt-4">
//               We focus on the critical areas that landlords and property
//               managers inspect during the handover process.
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
//                 <CheckCircle className="w-6 h-6 text-purple-500 mr-4 flex-shrink-0 mt-1" />
//                 <span className="text-gray-700">{item}</span>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* SEO Content 2: The Process */}
//       <section className="py-20 bg-white">
//         <div className="container mx-auto px-6 max-w-6xl">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center mb-16"
//           >
//             <p className="text-purple-500 font-semibold mb-2">HOW IT WORKS</p>
//             <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800">
//               Our Move-Out Cleaning Process
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
//                 className="text-center p-6 bg-gray-50 rounded-3xl"
//               >
//                 <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm border border-gray-100">
//                   <step.icon className="w-8 h-8 text-purple-500" />
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
//       <section className="py-20 bg-purple-50">
//         <div className="container mx-auto px-6 max-w-5xl grid md:grid-cols-2 gap-12 items-center">
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//           >
//             <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-6">
//               Why Choose Lucky Crystal for Your Move?
//             </h2>
//             <p className="text-gray-600 mb-8 leading-relaxed">
//               Moving is stressful enough. Let us handle the cleaning so you can
//               focus on settling into your new home. Our Dubai-based team
//               understands exactly what landlords and real estate agents expect
//               during a property handover, ensuring a smooth transition and
//               helping you secure your full deposit back.
//             </p>
//             <div className="space-y-4">
//               <div className="flex items-center">
//                 <ShieldCheck className="w-6 h-6 text-purple-500 mr-4" />
//                 <p className="font-medium text-gray-700">
//                   Trained & Background-Checked Professionals
//                 </p>
//               </div>
//               <div className="flex items-center">
//                 <KeyRound className="w-6 h-6 text-purple-500 mr-4" />
//                 <p className="font-medium text-gray-700">
//                   Meets RERA & Landlord Handover Standards
//                 </p>
//               </div>
//               <div className="flex items-center">
//                 <Clock className="w-6 h-6 text-purple-500 mr-4" />
//                 <p className="font-medium text-gray-700">
//                   Flexible Scheduling Around Your Move Date
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
//               src="https://images.unsplash.com/photo-1582132818112-14f028e9a8ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
//               alt="Professional Move Out Cleaning"
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
//             <p className="text-purple-500 font-semibold mb-2">FAQS</p>
//             <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800">
//               Move-In / Move-Out Cleaning FAQs
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
//                     className={`w-5 h-5 text-purple-500 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
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
//           <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-[3rem] p-12 md:p-16 text-center shadow-2xl">
//             <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
//               Ready for a Stress-Free Move?
//             </h2>
//             <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
//               Book your move-in/move-out cleaning today and leave the heavy
//               lifting to us.
//             </p>
//             <button
//               onClick={() => scrollToSection("villa-section")}
//               className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition shadow-lg"
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
import { CheckCircle, ArrowLeft, ShoppingCart, Home, Building, Tag, ChevronDown, ClipboardList, FileCheck, Truck, UserCheck, Settings, Clock, MapPin } from 'lucide-react';
import { useCart } from '../../context/CartContext';

// --- Pricing Data ---
const villaFurnished = [
  { id: 'mvf1', name: '1 Bedroom Villa', price: 400, original: 450 },
  { id: 'mvf2', name: '2 Bedroom Villa', price: 500, original: 550 },
  { id: 'mvf3', name: '3 Bedroom Villa', price: 600, original: 700 },
  { id: 'mvf4', name: '4 Bedroom Villa', price: 700, original: 800 },
  { id: 'mvf5', name: '5 Bedroom Villa', price: 800, original: 950 },
];

const villaUnfurnished = [
  { id: 'mvu1', name: '1 Bedroom Villa', price: 350, original: 400 },
  { id: 'mvu2', name: '2 Bedroom Villa', price: 450, original: 500 },
  { id: 'mvu3', name: '3 Bedroom Villa', price: 550, original: 650 },
  { id: 'mvu4', name: '4 Bedroom Villa', price: 650, original: 750 },
  { id: 'mvu5', name: '5 Bedroom Villa', price: 750, original: 900 },
];

const apartments = [
  { id: 'map0', name: 'Studio Apartment', price: 250, original: 300 },
  { id: 'map1', name: '1 Bedroom Apartment', price: 300, original: 350 },
  { id: 'map2', name: '2 Bedroom Apartment', price: 350, original: 400 },
  { id: 'map3', name: '3 Bedroom Apartment', price: 400, original: 450 },
];

// --- Content Data ---
const solutionsIncluded = [
  "Floors and floor edges", "Doors, handles, and frames", "Windows, tracks, and internal glass", "Kitchen cabinets and drawers", 
  "Wardrobes and storage areas", "Bathrooms and sanitary fixtures", "Kitchen surfaces and backsplash tiles", "Accessible appliances", 
  "Skirting boards", "Switches and sockets", "Light fixtures", "Air-conditioning vent exteriors", 
  "Balconies and utility areas", "Empty shelves and cupboards", "Corners and difficult-to-reach spaces"
];

const moveInPrevOccupied = [
  "Kitchen drawers and cupboards", "Bathroom fixtures", "Built-in wardrobes", "Window tracks", 
  "Balcony floors", "Utility rooms", "Storage areas", "Floor edges and corners", 
  "Behind movable appliances", "Door frames and handles"
];

const moveOutAreas = [
  "Empty bedrooms", "Living and dining areas", "Kitchens", "Bathrooms", "Hallways", 
  "Balconies", "Storage rooms", "Maid’s rooms", "Laundry and utility areas", "Built-in cabinets and wardrobes"
];

const endOfTenancySuitable = [
  "Tenants leaving rental apartments", "Families moving out of villas", "Landlords preparing units for new tenants", 
  "Property management companies", "Real estate brokers", "Holiday-home operators", 
  "Serviced apartment managers", "Corporate accommodation providers"
];

const checklistRooms = [
  { title: "Kitchen Move-In and Move-Out Cleaning", items: ["Dusting and wiping accessible surfaces", "Cleaning countertops & backsplash tiles", "Degreasing accessible kitchen surfaces", "Scrubbing and polishing the sink", "Cleaning faucets and fixtures", "Wiping cabinet doors", "Cleaning empty cabinets & drawers internally", "Cleaning appliance exteriors (cooker, fridge)", "Cleaning microwave internally/externally", "Wiping range hood exterior", "Cleaning switches and socket exteriors", "Vacuuming floor edges & scrubbing floors"] },
  { title: "Bathroom Deep Cleaning and Sanitization", items: ["Cleaning and disinfecting toilets", "Cleaning washbasins & scrubbing bathtubs", "Cleaning shower areas & accessible wall tiles", "Scrubbing floor tiles", "Cleaning shower-glass surfaces & polishing mirrors", "Cleaning faucets and fixtures", "Wiping cabinet exteriors & cleaning empty cabinets", "Cleaning doors and handles", "Wiping switches and socket exteriors", "Cleaning accessible exhaust covers", "Cleaning floor edges and corners", "Mopping and sanitizing the floor"] },
  { title: "Bedroom Cleaning", items: ["Dusting walls where safely accessible", "Removing accessible cobwebs", "Cleaning built-in wardrobes & empty shelves", "Cleaning empty drawers", "Wiping doors, handles, and door frames", "Wiping skirting boards", "Cleaning window interiors & internal tracks", "Wiping switches and socket exteriors", "Dusting accessible light fixtures", "Vacuuming & mopping suitable flooring", "Cleaning floor edges and corners", "Spot-cleaning minor wall marks"] },
  { title: "Living Room and Dining Area Cleaning", items: ["Dusting accessible surfaces & removing cobwebs", "Wiping built-in shelves", "Cleaning empty storage units", "Cleaning doors and frames & wiping handles", "Cleaning skirting boards", "Wiping switches and socket exteriors", "Cleaning internal window glass & accessible tracks", "Dusting light fixtures", "Vacuuming & mopping suitable flooring", "Cleaning corners and edges", "Wiping balcony doors", "Spot-cleaning suitable surfaces"] }
];

const processSteps = [
  { title: "Share Your Property Details", desc: "Provide location, property type, number of bedrooms/bathrooms, furnished status, size, condition, preferred date, and photos if available. This helps us recommend the right package." },
  { title: "Receive a Cleaning Estimate", desc: "We prepare an estimate based on the service scope, property size, condition, access, equipment requirements, and expected working time. Inspections may be recommended for larger villas." },
  { title: "Prepare the Property", desc: "Remove personal belongings, empty cabinets, dispose of unwanted items, arrange building access, reserve service elevator, confirm utilities, and identify fragile surfaces." },
  { title: "Detailed Cleaning", desc: "Our team follows a room-by-room checklist and works from higher surfaces toward lower areas, helping prevent cleaned floors from being contaminated again by falling dust." },
  { title: "Final Review", desc: "After cleaning, the customer or authorized representative should review the property and report any concerns while the team is still on site for immediate resolution." }
];

const whyChooseUs = [
  { icon: UserCheck, title: "Trained and Supervised Cleaners", desc: "Our cleaners follow structured checklists and suitable cleaning procedures for different rooms and surfaces." },
  { icon: Settings, title: "Cleaning Equipment and Materials Available", desc: "Depending on the selected package, we can provide cleaning tools, machines, and cleaning products required for the job." },
  { icon: Clock, title: "Flexible Booking Options", desc: "Morning, afternoon, weekday, and weekend appointments may be available depending on team schedules." },
  { icon: ClipboardList, title: "Customized Service Scope", desc: "You can request a complete property clean or highlight specific areas such as bathrooms, kitchens, windows, cabinets, or floors." },
  { icon: Home, title: "Apartment and Villa Experience", desc: "Our teams understand the different access, timing, and cleaning requirements of apartments, villas, townhouses, and larger properties." },
  { icon: FileCheck, title: "Clear Service Expectations", desc: "We explain the service scope, exclusions, and recommended additional services before the appointment." }
];

const areasServed = [
  "Downtown Dubai", "Business Bay", "Dubai Marina", "Jumeirah Beach Residence", "Jumeirah Lake Towers", "Palm Jumeirah", "Jumeirah", "Umm Suqeim", "Al Barsha", "Barsha Heights", "Dubai Hills Estate", "Arabian Ranches", "Emirates Living", "The Springs", "The Meadows", "The Lakes", "Emirates Hills", "Jumeirah Village Circle", "Jumeirah Village Triangle", "Dubai Sports City", "Dubai Production City", "Motor City", "Damac Hills", "Damac Hills 2", "Town Square Dubai", "Mudon", "Tilal Al Ghaf", "Dubai Silicon Oasis", "International City", "Dubai South", "Discovery Gardens", "The Gardens", "Al Furjan", "Mirdif", "Nad Al Sheba", "Meydan", "Dubai Creek Harbour", "Dubai Festival City", "Al Nahda", "Deira", "Bur Dubai", "Al Karama"
];

const faqs = [
  { q: "What is the difference between move-in cleaning and move-out cleaning?", a: "Move-in cleaning prepares a property before new occupants unpack and settle in. Move-out cleaning prepares a property after the previous occupants remove their belongings. The cleaning tasks are often similar, but the priorities may differ according to property condition and handover requirements." },
  { q: "Is moving cleaning the same as regular cleaning?", a: "No. Regular cleaning focuses mainly on routine maintenance of occupied areas. Moving cleaning is generally more detailed and may include empty cabinets, wardrobes, skirting boards, window tracks, fixtures, floor edges, and areas that become accessible after furniture is removed." },
  { q: "Is move-out cleaning the same as end-of-tenancy cleaning?", a: "The terms are often used for similar services. End-of-tenancy cleaning usually refers specifically to cleaning a rental property before handover, while move-out cleaning may apply to renters, homeowners, offices, or commercial units." },
  { q: "Should the property be empty before cleaning?", a: "An empty property generally allows the most detailed cleaning. We can clean furnished or partially empty properties, but furniture and boxes may restrict access." },
  { q: "Do you clean inside kitchen cabinets?", a: "Yes, internal cabinet and drawer cleaning can be included when they are completely empty and safely accessible." },
  { q: "Do you clean inside wardrobes?", a: "Yes. Empty built-in wardrobes, shelves, and drawers can be wiped as part of the agreed service." },
  { q: "Do you clean windows?", a: "Internal window glass, frames, sills, and accessible tracks may be included. High-rise external windows or inaccessible exterior glass require specialist services." },
  { q: "Do you clean kitchen appliances?", a: "Appliance exterior cleaning may be included. Internal oven, refrigerator, dishwasher, or washing-machine cleaning should be requested in advance and may carry an additional charge." },
  { q: "Do you provide cleaning products and equipment?", a: "Cleaning products and equipment can be supplied according to the selected package. Confirm this when booking." },
  { q: "Can you remove all stains?", a: "We treat removable dirt and stains using suitable products and methods. However, permanent discoloration, damaged finishes, rust, burns, scratches, deep grout staining, old silicone marks, and material deterioration may not be completely removable." },
  { q: "Can move-out cleaning guarantee the return of my security deposit?", a: "No cleaning company can responsibly guarantee a deposit refund because the final decision may depend on property damage, unpaid charges, maintenance issues, tenancy terms, inspection standards, and landlord approval. Professional cleaning can help improve the property’s cleanliness and presentation." },
  { q: "Can I book cleaning on the same day as moving?", a: "Same-day availability may be possible, but advance booking is recommended. Moving schedules can change, and cleaning is most effective after movers have removed furniture and boxes." },
  { q: "Can cleaners work while movers are inside the property?", a: "It is possible, but it is usually less efficient. Movers may create dust, block rooms, and walk over cleaned floors. For better results, schedule cleaning after the movers finish or clean the new property before deliveries begin." },
  { q: "How many cleaners will come?", a: "Team size depends on the property size, condition, service scope, and required completion time." },
  { q: "Do I need to be present?", a: "You do not necessarily need to remain throughout the service, but an authorized person should provide access, explain priorities, and complete the final inspection." },
  { q: "Can landlords and real estate agents book on behalf of tenants?", a: "Yes. We work with tenants, landlords, property managers, agents, and company representatives." },
  { q: "Do you clean villas as well as apartments?", a: "Yes. We provide moving cleaning for studios, apartments, penthouses, townhouses, and villas throughout Dubai." },
  { q: "Do you offer move-in cleaning for commercial offices?", a: "Yes. Commercial relocation cleaning can be arranged after reviewing the office size, floor type, access, and required scope." },
  { q: "When should I contact you for a quotation?", a: "Contact us as soon as your moving date is confirmed. Early booking gives you more scheduling options, especially at weekends and near the end or beginning of the month." }
];

export default function MoveInOut() {
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const handleAddPackage = (pkg, type) => {
    addToCart({ service: `Move In/Out: ${pkg.name} (${type})`, totalAmount: pkg.price, isPackage: true });
    setAddedId(pkg.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  const scrollToSection = (id) => document.getElementById(id).scrollIntoView({ behavior: 'smooth', block: 'start' });

  const PackageCard = ({ pkg, type, accentColor }) => (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group hover:shadow-xl transition-all">
      <div className={`p-6 flex-grow ${accentColor === 'purple' ? 'bg-purple-50' : 'bg-blue-50'}`}>
        <h4 className="text-lg font-bold text-gray-800 mb-2">{pkg.name}</h4>
        <div className="flex items-end gap-2 mb-3">
          <span className={`text-3xl font-bold ${accentColor === 'purple' ? 'text-purple-600' : 'text-blue-600'}`}>{pkg.price} AED</span>
          <span className="text-lg text-gray-400 line-through mb-1">{pkg.original} AED</span>
        </div>
        <span className="inline-flex items-center text-xs font-bold px-2 py-1 rounded-full bg-green-100 text-green-700">
          <Tag className="w-3 h-3 mr-1" /> Save {pkg.original - pkg.price} AED
        </span>
      </div>
      <div className="p-4 bg-white">
        <button onClick={() => handleAddPackage(pkg, type)} className={`w-full flex items-center justify-center py-3 rounded-xl transition font-bold text-sm shadow-sm ${addedId === pkg.id ? 'bg-green-500 text-white' : `${accentColor === 'purple' ? 'bg-purple-500 hover:bg-purple-600' : 'bg-blue-500 hover:bg-blue-600'} text-white`}`}>
          {addedId === pkg.id ? 'Added!' : (<><ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart</>)}
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="pt-20 pb-32 bg-white min-h-screen">
      <Helmet>
        <title>Move-In & Move-Out Cleaning Dubai | Professional Cleaners</title>
        <meta name="description" content="Book professional move-in and move-out cleaning services in Dubai for apartments, villas, and rental properties. Detailed kitchen, bathroom, cabinet, window, and floor cleaning for a fresh move or property handover." />
        <meta name="keywords" content="Move in cleaning services Dubai, Move out cleaning services Dubai, Move in move out cleaning Dubai, End of tenancy cleaning Dubai, Moving cleaning services Dubai, Move out cleaners Dubai, Move in cleaners Dubai, Book move out cleaning Dubai, Move out cleaning company Dubai, Professional move in cleaning Dubai, Professional move out cleaning Dubai, Best move out cleaning services Dubai, Affordable move out cleaning Dubai, Move out deep cleaning Dubai, Move in deep cleaning Dubai, End of lease cleaning Dubai, Rental property cleaning Dubai, Property handover cleaning Dubai, Vacant property cleaning Dubai, Apartment move out cleaning Dubai, Apartment move in cleaning Dubai, Studio move out cleaning Dubai, One-bedroom apartment cleaning Dubai, Two-bedroom apartment move out cleaning, Three-bedroom apartment cleaning Dubai, Empty apartment cleaning Dubai, Rental apartment cleaning Dubai, Villa move out cleaning Dubai, Villa move in cleaning Dubai, End of tenancy villa cleaning Dubai, Empty villa cleaning Dubai, Townhouse move out cleaning Dubai, Large villa cleaning services Dubai, Villa handover cleaning Dubai, Landlord cleaning services Dubai, Property management cleaning Dubai, Tenant move out cleaning Dubai, Rental unit cleaning Dubai, Property turnover cleaning Dubai, Cleaning before new tenant Dubai, Real estate cleaning company Dubai, Holiday home turnover cleaning Dubai, Kitchen deep cleaning Dubai, Bathroom sanitization Dubai, Cabinet cleaning Dubai, Wardrobe cleaning Dubai, Window cleaning Dubai, Floor scrubbing Dubai, Balcony cleaning Dubai, Appliance cleaning Dubai, Empty property cleaning, Pre-move cleaning Dubai, Post-move cleaning Dubai" />
      </Helmet>

      {/* Hero Section */}
      <div className="relative h-[500px] w-full overflow-hidden">
        <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" alt="Professional move out cleaning services in Dubai" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/95 via-purple-900/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/services" className="inline-flex items-center text-purple-300 mb-4 hover:text-white transition"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Services</Link>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-4 max-w-4xl">Professional Move-In and Move-Out Cleaning Services in Dubai</h1>
            <p className="text-lg text-gray-200 mb-8 max-w-3xl">Moving to a new home should feel exciting, not exhausting. However, packing, coordinating movers, managing tenancy requirements, transferring utilities, and organizing your belongings can leave little time for detailed property cleaning. Our professional move-in and move-out cleaning services in Dubai are designed to handle the cleaning process from top to bottom, allowing you to focus on the move itself.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => scrollToSection('villa-section')} className="flex items-center justify-center bg-white text-gray-800 px-6 py-3 rounded-full hover:bg-gray-100 transition shadow-lg font-bold">
                <Home className="w-5 h-5 mr-2 text-purple-500" /> Villa Move Out
              </button>
              <button onClick={() => scrollToSection('apartment-section')} className="flex items-center justify-center bg-purple-500 text-white px-6 py-3 rounded-full hover:bg-purple-600 transition shadow-lg font-bold">
                <Building className="w-5 h-5 mr-2" /> Apartment Move Out
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Complete Solutions Intro */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-6 text-center">Complete Move-In and Move-Out Cleaning Solutions in Dubai</h2>
            <p className="text-lg text-gray-600 leading-relaxed text-center max-w-4xl mx-auto mb-6">
              Move-in and move-out cleaning is more detailed than routine home cleaning. A regular cleaning appointment normally focuses on accessible surfaces and everyday household maintenance. Moving cleaning usually takes place when a property is empty or nearly empty, allowing our cleaners to reach spaces that may have been covered by furniture, appliances, carpets, boxes, or personal belongings.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed text-center max-w-4xl mx-auto mb-12">Our service may include detailed cleaning of:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {solutionsIncluded.map((item, i) => (
                <div key={i} className="flex items-center bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-100">
                  <CheckCircle className="w-5 h-5 text-purple-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Move-In & Move-Out Split Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl grid md:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <Home className="w-12 h-12 text-purple-500 mb-4" />
            <h2 className="text-3xl font-display font-bold text-gray-800 mb-4">Move-In Cleaning Services Dubai</h2>
            <p className="text-gray-600 leading-relaxed mb-4">Moving into a new apartment or villa is an important moment. Even when a property appears tidy during a viewing, it may still contain dust inside cabinets, residue in bathrooms, grease around the kitchen, marks on floors, or dirt in areas that were previously hidden.</p>
            <p className="text-gray-600 leading-relaxed mb-6">Our move-in cleaning service in Dubai gives you a cleaner starting point before furniture, boxes, clothes, kitchen items, and personal belongings are unpacked.</p>
            
            <h3 className="text-xl font-bold text-gray-800 mb-4">Move-In Cleaning for Previously Occupied Properties</h3>
            <p className="text-gray-600 mb-4">Previously occupied homes may require special attention in:</p>
            <ul className="space-y-2">
              {moveInPrevOccupied.map((item, i) => (
                <li key={i} className="flex items-center text-gray-700"><CheckCircle className="w-5 h-5 text-purple-500 mr-3 flex-shrink-0" /> {item}</li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <Truck className="w-12 h-12 text-purple-500 mb-4" />
            <h2 className="text-3xl font-display font-bold text-gray-800 mb-4">Move-Out Cleaning Services Dubai</h2>
            <p className="text-gray-600 leading-relaxed mb-4">Moving out involves more than packing your belongings and booking transportation. Tenants, homeowners, landlords, property managers, and real estate agents may also need the property cleaned before inspection, handover, resale, or the arrival of new occupants.</p>
            <p className="text-gray-600 leading-relaxed mb-6">Our move-out cleaning services in Dubai help prepare apartments and villas after furniture and personal belongings have been removed.</p>
            
            <h3 className="text-xl font-bold text-gray-800 mb-4">A Cleaner Property for Final Handover</h3>
            <p className="text-gray-600 mb-4">A professionally cleaned property creates a better overall presentation during an inspection. Our team can clean:</p>
            <ul className="grid grid-cols-2 gap-2">
              {moveOutAreas.map((item, i) => (
                <li key={i} className="flex items-center text-gray-700 text-sm"><CheckCircle className="w-4 h-4 text-purple-500 mr-2 flex-shrink-0" /> {item}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* End of Tenancy */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-6">End-of-Tenancy Cleaning Services in Dubai</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-3xl mx-auto">End-of-tenancy cleaning refers to the detailed cleaning of a rented property before the tenant completes the handover process. The service is suitable for:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {endOfTenancySuitable.map((item, i) => (
                <div key={i} className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                  <p className="text-gray-700 text-sm font-medium">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Detailed Checklist Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-4">What Is Included in Move-In and Move-Out Cleaning?</motion.h2>
            <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg text-gray-600 max-w-3xl mx-auto">The following checklist represents the typical scope of our moving cleaning service. Final inclusions may differ according to the selected package, property condition, accessibility, and customer requirements.</motion.p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {checklistRooms.map((room, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-6">{room.title}</h3>
                <ul className="space-y-3">
                  {room.items.map((item, idx) => (
                    <li key={idx} className="flex items-start text-gray-700 text-sm"><CheckCircle className="w-4 h-4 text-purple-500 mr-3 flex-shrink-0 mt-1" /> {item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Packages */}
      <div id="villa-section" className="py-16 scroll-mt-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-3">Villa Move-Out Packages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Comprehensive top-to-bottom cleaning for your Dubai villa. Perfect for handovers and ensuring full deposit returns.</p>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center"><Home className="w-6 h-6 mr-3 text-purple-500" /> Furnished Villas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {villaFurnished.map(pkg => <PackageCard key={pkg.id} pkg={pkg} type="Furnished" accentColor="purple" />)}
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center"><Home className="w-6 h-6 mr-3 text-gray-400" /> Unfurnished Villas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {villaUnfurnished.map(pkg => <PackageCard key={pkg.id} pkg={pkg} type="Unfurnished" accentColor="purple" />)}
          </div>
        </div>
      </div>

      <div id="apartment-section" className="py-16 scroll-mt-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-3">Apartment Move-Out Packages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Detailed end-of-tenancy cleaning for apartments and studios. Meets all Dubai property manager requirements.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {apartments.map(pkg => <PackageCard key={pkg.id} pkg={pkg} type="Apartment" accentColor="blue" />)}
          </div>
        </div>
      </div>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-4">Our Move-In and Move-Out Cleaning Process</motion.h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <div className="flex items-center mb-4">
                  <span className="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4">{i+1}</span>
                  <h3 className="text-lg font-bold text-gray-800">{step.title}</h3>
                </div>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-4">Why Choose Our Moving Cleaning Company in Dubai?</motion.h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((point, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <div className="bg-purple-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                  <point.icon className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{point.title}</h3>
                <p className="text-gray-600 text-sm">{point.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas Served */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-4">Areas We Serve Across Dubai</motion.h2>
          <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">Our moving cleaning teams serve customers in many Dubai communities, including:</motion.p>
          <div className="flex flex-wrap justify-center gap-3">
            {areasServed.map((area, i) => (
              <span key={i} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium flex items-center"><MapPin className="w-3 h-3 mr-2 text-purple-500" />{area}</span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800">Frequently Asked Questions About Move-In and Move-Out Cleaning</h2>
          </motion.div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex justify-between items-center p-6 text-left">
                  <h3 className="text-base font-semibold text-gray-800">{faq.q}</h3>
                  <ChevronDown className={`w-5 h-5 text-purple-500 transition-transform flex-shrink-0 ml-4 ${openFaq === i ? 'rotate-180' : ''}`} />
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
          <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-[3rem] p-12 md:p-16 text-center shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Prepare for a Cleaner and Easier Move</h2>
            <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">Relocation already involves dozens of important tasks. Professional cleaning removes one of the largest and most tiring jobs from your moving checklist. Contact us today to request a customized cleaning quotation.</p>
            <button onClick={() => scrollToSection('villa-section')} className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition shadow-lg">
              Book Move-In/Move-Out Cleaning
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}