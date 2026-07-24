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
//   Clock,
//   Sparkles,
//   Search,
//   SprayCan,
//   Eye,
//   ChevronDown,
// } from "lucide-react";
// import { useCart } from "../../context/CartContext";
// import ServiceIntro from "../../components/ServiceIntro";
// import {   Leaf } from "lucide-react";

// // Pricing Data
// const villaFurnished = [
//   { id: "vf1", name: "1 Bedroom Villa", price: 400, original: 450 },
//   { id: "vf2", name: "2 Bedroom Villa", price: 500, original: 550 },
//   { id: "vf3", name: "3 Bedroom Villa", price: 600, original: 700 },
//   { id: "vf4", name: "4 Bedroom Villa", price: 700, original: 800 },
//   { id: "vf5", name: "5 Bedroom Villa", price: 800, original: 950 },
// ];

// const villaUnfurnished = [
//   { id: "vu1", name: "1 Bedroom Villa", price: 350, original: 400 },
//   { id: "vu2", name: "2 Bedroom Villa", price: 450, original: 500 },
//   { id: "vu3", name: "3 Bedroom Villa", price: 550, original: 650 },
//   { id: "vu4", name: "4 Bedroom Villa", price: 650, original: 750 },
//   { id: "vu5", name: "5 Bedroom Villa", price: 750, original: 900 },
// ];

// const apartments = [
//   { id: "ap0", name: "Studio Apartment", price: 250, original: 300 },
//   { id: "ap1", name: "1 Bedroom Apartment", price: 300, original: 350 },
//   { id: "ap2", name: "2 Bedroom Apartment", price: 350, original: 400 },
//   { id: "ap3", name: "3 Bedroom Apartment", price: 400, original: 450 },
// ];

// const detailedChecklist = [
//   "Deep kitchen degreasing (oven, stovetop, extractor hood)",
//   "Inside and outside of all cabinets and drawers",
//   "Descaling bathrooms (tiles, showerheads, faucets)",
//   "Scrubbing grout lines and sanitizing floors",
//   "Dusting ceiling fans, light fixtures, and high corners",
//   "Vacuuming and shampooing upholstery (if applicable)",
//   "Cleaning window tracks, frames, and internal glass",
//   "Wiping down all baseboards, doors, and door frames",
//   "Sanitizing all high-touch surfaces (switches, handles)",
// ];

// const processSteps = [
//   {
//     icon: Search,
//     title: "1. Assessment",
//     desc: "Our team assesses the property layout and identifies high-priority areas requiring special attention.",
//   },
//   {
//     icon: SprayCan,
//     title: "2. Preparation",
//     desc: "We bring professional-grade, eco-friendly cleaning agents and equipment tailored for deep extraction.",
//   },
//   {
//     icon: Sparkles,
//     title: "3. Deep Execution",
//     desc: "Top-to-bottom scrubbing, degreasing, and sanitizing of every room, focusing on grime and hard water stains.",
//   },
//   {
//     icon: Eye,
//     title: "4. Quality Check",
//     desc: "A final walkthrough inspection ensures no corner is missed and the space meets our Crystal Standard.",
//   },
// ];

// const faqs = [
//   {
//     q: "How long does a deep clean take?",
//     a: "Depending on the size and condition of the property, a deep clean can take anywhere from 4 to 8 hours with a specialized crew.",
//   },
//   {
//     q: "Do I need to provide cleaning materials?",
//     a: "No, our deep cleaning packages include all professional-grade equipment and eco-friendly chemicals needed to make your space spotless.",
//   },
//   {
//     q: "Is deep cleaning safe for pets and children?",
//     a: "Absolutely. We use non-toxic, eco-friendly products that are completely safe for your entire family once the surfaces dry.",
//   },
//   {
//     q: "What is the difference between regular and deep cleaning?",
//     a: "Regular cleaning maintains daily tidiness. Deep cleaning tackles hidden grime, grease, scale, and hard-to-reach areas like inside ovens and behind appliances.",
//   },
// ];

// export default function DeepCleaning() {
//   const { addToCart } = useCart();
//   const [addedId, setAddedId] = useState(null);
//   const [openFaq, setOpenFaq] = useState(null);

//   const handleAddPackage = (pkg, type) => {
//     addToCart({
//       service: `Deep Clean: ${pkg.name} (${type})`,
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
//         className={`p-6 flex-grow ${accentColor === "crystal" ? "bg-crystal-50" : "bg-blue-50"}`}
//       >
//         <h4 className="text-lg font-bold text-gray-800 mb-2">{pkg.name}</h4>
//         <div className="flex items-end gap-2 mb-3">
//           <span
//             className={`text-3xl font-bold ${accentColor === "crystal" ? "text-crystal-600" : "text-blue-600"}`}
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
//           className={`w-full flex items-center justify-center py-3 rounded-xl transition font-bold text-sm shadow-sm ${addedId === pkg.id ? "bg-green-500 text-white" : `${accentColor === "crystal" ? "bg-crystal-500 hover:bg-crystal-600" : "bg-blue-500 hover:bg-blue-600"} text-white`}`}
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
//           Deep Cleaning Services in Dubai | Villas & Apartments | Lucky Crystal
//         </title>
//         <meta
//           name="description"
//           content="Professional deep cleaning services in Dubai. Transparent package pricing for furnished & unfurnished villas, and apartments. Book your spring clean today!"
//         />
//       </Helmet>

//       {/* Hero */}
//       <div className="relative h-[400px] w-full overflow-hidden">
//         <img
//           src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
//           alt="Dubai Deep Cleaning"
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent"></div>
//         <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 pt-28">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <Link
//               to="/services"
//               className="inline-flex items-center text-crystal-300 mb-4 hover:text-white transition"
//             >
//               <ArrowLeft className="w-4 h-4 mr-2" /> Back to Services
//             </Link>
//             <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-2">
//               Deep Cleaning in Dubai
//             </h1>
//             <p className="text-xl text-gray-200 mb-6">
//               Choose your property type for precise package pricing.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4">
//               <button
//                 onClick={() => scrollToSection("villa-section")}
//                 className="flex items-center justify-center bg-white text-gray-800 px-6 py-3 rounded-full hover:bg-gray-100 transition shadow-lg font-bold"
//               >
//                 <Home className="w-5 h-5 mr-2 text-crystal-500" /> Villa Deep
//                 Cleaning
//               </button>
//               <button
//                 onClick={() => scrollToSection("apartment-section")}
//                 className="flex items-center justify-center bg-crystal-500 text-white px-6 py-3 rounded-full hover:bg-crystal-600 transition shadow-lg font-bold"
//               >
//                 <Building className="w-5 h-5 mr-2" /> Apartment Deep Cleaning
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       <ServiceIntro
//         title="Deep Cleaning in Dubai"
//         description="Deep cleaning in Dubai is an intensive, top-to-bottom sanitization process that targets hidden grime, stubborn stains, and bacteria that regular weekly cleaning might miss. Due to Dubai's dusty climate and hard water, properties require periodic deep extraction. Our team scrubs grout lines, degreases kitchen appliances inside-out, and eliminates dust mites from every corner, restoring your villa or apartment to a pristine, brand-new condition."
//         cards={[
//           {
//             icon: Search,
//             title: "Detailed Extraction",
//             desc: "We pull out the deep-seated dirt from carpets, upholstery, and hard-to-reach corners.",
//           },
//           {
//             icon: SprayCan,
//             title: "Heavy-Duty Degreasing",
//             desc: "Ovens, stovetops, and extractor hoods are stripped of stubborn grease and carbon buildup.",
//           },
//           {
//             icon: Leaf,
//             title: "Eco-Friendly Chemicals",
//             desc: "Powerful yet safe, our industrial-grade solutions are non-toxic for your family and pets.",
//           },
//         ]}
//       />

//       {/* Villa Section */}
//       <div id="villa-section" className="py-16 scroll-mt-20 bg-gray-50">
//         <div className="container mx-auto px-6 max-w-6xl">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-3">
//               Villa Deep Cleaning Packages
//             </h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               Comprehensive top-to-bottom cleaning for your Dubai villa. Perfect
//               for spring cleaning or post-renovation.
//             </p>
//           </div>
//           <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
//             <Home className="w-6 h-6 mr-3 text-crystal-500" /> Furnished Villas
//           </h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
//             {villaFurnished.map((pkg) => (
//               <PackageCard
//                 key={pkg.id}
//                 pkg={pkg}
//                 type="Furnished"
//                 accentColor="crystal"
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
//                 accentColor="crystal"
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
//               Apartment Deep Cleaning Packages
//             </h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               Detailed cleaning for apartments and studios. Ideal for
//               move-in/move-out or annual deep cleans.
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
//             <p className="text-crystal-500 font-semibold mb-2">OUR CHECKLIST</p>
//             <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800">
//               What’s Included in Our Deep Clean?
//             </h2>
//             <p className="text-gray-600 mt-4">
//               Unlike standard maid services, our deep cleaning package tackles
//               hidden grime, grease, and hard water stains across every room in
//               your Dubai home.
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
//                 <CheckCircle className="w-6 h-6 text-crystal-500 mr-4 flex-shrink-0 mt-1" />
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
//             <p className="text-crystal-500 font-semibold mb-2">HOW IT WORKS</p>
//             <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800">
//               Our Deep Cleaning Process
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
//                   <step.icon className="w-8 h-8 text-crystal-500" />
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
//       <section className="py-20 bg-crystal-50">
//         <div className="container mx-auto px-6 max-w-5xl grid md:grid-cols-2 gap-12 items-center">
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//           >
//             <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-6">
//               Why Choose Lucky Crystal for Deep Cleaning?
//             </h2>
//             <p className="text-gray-600 mb-8 leading-relaxed">
//               Deep cleaning requires more than just a mop and bucket. It
//               requires attention to detail, professional-grade equipment, and a
//               trained eye. Our Dubai-based team specializes in restoring homes
//               to their original sparkle, ensuring a healthy, hygienic living
//               environment for you and your family.
//             </p>
//             <div className="space-y-4">
//               <div className="flex items-center">
//                 <ShieldCheck className="w-6 h-6 text-crystal-500 mr-4" />
//                 <p className="font-medium text-gray-700">
//                   Trained & Background-Checked Professionals
//                 </p>
//               </div>
//               <div className="flex items-center">
//                 <Leaf className="w-6 h-6 text-crystal-500 mr-4" />
//                 <p className="font-medium text-gray-700">
//                   Eco-Friendly, Petrochemical-Free Products
//                 </p>
//               </div>
//               <div className="flex items-center">
//                 <Clock className="w-6 h-6 text-crystal-500 mr-4" />
//                 <p className="font-medium text-gray-700">
//                   Flexible Scheduling & 100% Satisfaction Guarantee
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
//               src="https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
//               alt="Professional Deep Cleaner at Work"
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
//             <p className="text-crystal-500 font-semibold mb-2">FAQS</p>
//             <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800">
//               Deep Cleaning FAQs
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
//                     className={`w-5 h-5 text-crystal-500 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
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
//           <div className="bg-gradient-to-br from-crystal-600 to-crystal-800 rounded-[3rem] p-12 md:p-16 text-center shadow-2xl">
//             <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
//               Ready for a Spotless Home?
//             </h2>
//             <p className="text-crystal-100 text-lg mb-8 max-w-2xl mx-auto">
//               Book our deep cleaning service today and experience the crystal
//               standard. Your dream home is just a click away.
//             </p>
//             <button
//               onClick={() => scrollToSection("villa-section")}
//               className="bg-white text-crystal-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition shadow-lg"
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
import { CheckCircle, ArrowLeft, ShoppingCart, Home, Building, Tag, ChevronDown, Sparkles, Leaf, UserCheck, Settings, ClipboardList, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';

// --- Pricing Data ---
const villaFurnished = [
  { id: 'vf1', name: '1 Bedroom Villa', price: 400, original: 450 },
  { id: 'vf2', name: '2 Bedroom Villa', price: 500, original: 550 },
  { id: 'vf3', name: '3 Bedroom Villa', price: 600, original: 700 },
  { id: 'vf4', name: '4 Bedroom Villa', price: 700, original: 800 },
  { id: 'vf5', name: '5 Bedroom Villa', price: 800, original: 950 },
];

const villaUnfurnished = [
  { id: 'vu1', name: '1 Bedroom Villa', price: 350, original: 400 },
  { id: 'vu2', name: '2 Bedroom Villa', price: 450, original: 500 },
  { id: 'vu3', name: '3 Bedroom Villa', price: 550, original: 650 },
  { id: 'vu4', name: '4 Bedroom Villa', price: 650, original: 750 },
  { id: 'vu5', name: '5 Bedroom Villa', price: 750, original: 900 },
];

const apartments = [
  { id: 'ap0', name: 'Studio Apartment', price: 250, original: 300 },
  { id: 'ap1', name: '1 Bedroom Apartment', price: 300, original: 350 },
  { id: 'ap2', name: '2 Bedroom Apartment', price: 350, original: 400 },
  { id: 'ap3', name: '3 Bedroom Apartment', price: 400, original: 450 },
];

// --- Content Data ---
const recommendedFor = [
  "New homes and apartments", "Villas requiring seasonal cleaning", "Properties after renovation or construction", 
  "Homes before or after special events", "End-of-tenancy cleaning", "Commercial offices", 
  "Restaurants and cafés", "Medical clinics", "Educational institutions", 
  "Hospitality businesses", "Property management companies", "Airbnb and holiday homes"
];

const whyChooseFeatures = [
  { icon: UserCheck, title: "Experienced Cleaning Professionals", desc: "Our team consists of trained and background-verified cleaning professionals who understand the highest standards of residential and commercial cleaning. Every cleaner follows detailed cleaning checklists to ensure consistency and exceptional results." },
  { icon: Leaf, title: "Eco-Friendly Cleaning Products", desc: "We care about your family's health and the environment. That's why we use environmentally responsible cleaning products that effectively remove bacteria and stains without leaving harmful chemical residues. Our cleaning solutions are safe for children, pets, and individuals with allergies." },
  { icon: Settings, title: "Advanced Cleaning Equipment", desc: "Our investment in professional-grade cleaning equipment allows us to clean more thoroughly than traditional household tools. We utilize high-powered vacuum systems, steam cleaning machines, floor scrubbers, carpet extraction equipment, and specialized bathroom and kitchen cleaning equipment." },
  { icon: ClipboardList, title: "Customized Cleaning Plans", desc: "Every property is different. Whether you own a studio apartment, luxury villa, corporate office, retail outlet, or warehouse, we tailor our cleaning approach according to your property's layout, condition, and specific cleaning requirements." },
  { icon: Tag, title: "Transparent Pricing", desc: "We believe in honest pricing with no hidden costs. Our quotations are based on property size, cleaning requirements, and service scope, ensuring complete transparency before work begins." }
];

const processSteps = [
  { title: "Initial Property Assessment", desc: "Our team evaluates the condition of your property, identifies high-priority areas, and prepares a customized cleaning plan." },
  { title: "Dust Removal", desc: "We remove accumulated dust from ceilings, walls, vents, corners, shelves, cabinets, furniture, decorative items, and hidden spaces where allergens commonly accumulate." },
  { title: "Kitchen Deep Cleaning", desc: "Thoroughly cleaning countertops, cabinets, sinks, backsplash, exhaust hood, oven, microwave, refrigerator, tile grout, and switches." },
  { title: "Bathroom Sanitization", desc: "Professional disinfection to eliminate bacteria, mold, mildew, and soap residue from toilets, basins, bathtubs, showers, glass, tiles, and exhaust fans." },
  { title: "Bedroom Cleaning", desc: "Dusting furniture, cleaning wardrobes, vacuuming mattresses, window cleaning, floor sanitization, and mirror polishing." },
  { title: "Living Room Cleaning", desc: "Restoring living areas by cleaning sofas, tables, entertainment units, windows, carpets, and flooring." },
  { title: "Floor Care", desc: "Cleaning marble, ceramic, porcelain, wooden, vinyl, and laminate flooring using appropriate cleaning products and professional equipment." }
];

const areasWeClean = [
  "Apartments", "Villas", "Townhouses", "Studios", "Penthouses", "Duplex homes", "Offices", "Restaurants", 
  "Retail stores", "Shopping outlets", "Warehouses", "Hotels", "Clinics", "Medical centers", 
  "Educational institutions", "Gyms", "Beauty salons", "Property management facilities"
];

const benefits = [
  { title: "Improved Indoor Air Quality", desc: "Removing dust, pollen, and allergens helps create healthier indoor environments." },
  { title: "Better Health", desc: "Professional sanitization reduces bacteria, viruses, mold spores, and allergens that may contribute to illness." },
  { title: "Longer Life for Furniture and Flooring", desc: "Regular professional cleaning protects your investment by preventing long-term damage caused by dirt accumulation." },
  { title: "Enhanced Property Appearance", desc: "A thoroughly cleaned property feels brighter, fresher, and more welcoming." },
  { title: "Reduced Allergens", desc: "Our cleaning process helps minimize allergens that trigger asthma and allergic reactions." },
  { title: "Stress-Free Living", desc: "Walking into a professionally cleaned home provides peace of mind and improves everyday comfort." }
];

const faqs = [
  { q: "How often should I schedule deep cleaning?", a: "For most homes, deep cleaning every three to six months is recommended. Larger families, homes with pets, or busy commercial spaces may benefit from more frequent service." },
  { q: "How long does deep cleaning take?", a: "The duration depends on the size and condition of the property. A studio apartment may take four to five hours, while large villas or commercial spaces may require a full day or more." },
  { q: "Do I need to provide cleaning materials?", a: "No. Our team arrives fully equipped with professional cleaning supplies, tools, and eco-friendly products." },
  { q: "Are your cleaning products safe?", a: "Yes. We use high-quality cleaning products selected for effectiveness while being safe for children, pets, and most household surfaces." },
  { q: "Can I book weekend deep cleaning?", a: "Yes. We offer flexible scheduling, including weekends and public holidays, subject to availability." }
];

export default function DeepCleaning() {
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const handleAddPackage = (pkg, type) => {
    addToCart({ service: `Deep Clean: ${pkg.name} (${type})`, totalAmount: pkg.price, isPackage: true });
    setAddedId(pkg.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  const scrollToSection = (id) => document.getElementById(id).scrollIntoView({ behavior: 'smooth', block: 'start' });

  const PackageCard = ({ pkg, type, accentColor }) => (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group hover:shadow-xl transition-all">
      <div className={`p-6 flex-grow ${accentColor === 'crystal' ? 'bg-crystal-50' : 'bg-blue-50'}`}>
        <h4 className="text-lg font-bold text-gray-800 mb-2">{pkg.name}</h4>
        <div className="flex items-end gap-2 mb-3">
          <span className={`text-3xl font-bold ${accentColor === 'crystal' ? 'text-crystal-600' : 'text-blue-600'}`}>{pkg.price} AED</span>
          <span className="text-lg text-gray-400 line-through mb-1">{pkg.original} AED</span>
        </div>
        <span className="inline-flex items-center text-xs font-bold px-2 py-1 rounded-full bg-green-100 text-green-700">
          <Tag className="w-3 h-3 mr-1" /> Save {pkg.original - pkg.price} AED
        </span>
      </div>
      <div className="p-4 bg-white">
        <button onClick={() => handleAddPackage(pkg, type)} className={`w-full flex items-center justify-center py-3 rounded-xl transition font-bold text-sm shadow-sm ${addedId === pkg.id ? 'bg-green-500 text-white' : `${accentColor === 'crystal' ? 'bg-crystal-500 hover:bg-crystal-600' : 'bg-blue-500 hover:bg-blue-600'} text-white`}`}>
          {addedId === pkg.id ? 'Added!' : (<><ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart</>)}
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="pt-20 pb-32 bg-white min-h-screen">
      <Helmet>
        <title>Deep Cleaning Services Dubai | Professional Home & Office Cleaning Company</title>
        <meta name="description" content="Book professional deep cleaning services in Dubai for villas, apartments, offices, and commercial spaces. Eco-friendly products, trained cleaners, affordable pricing, and exceptional results across Dubai." />
        <meta name="keywords" content="Deep Cleaning Services Dubai, Deep Cleaning Dubai, Professional Deep Cleaning Dubai, Home Deep Cleaning Dubai, Apartment Deep Cleaning Dubai, Villa Deep Cleaning Dubai, Office Deep Cleaning Dubai, Cleaning Company Dubai, Professional Cleaners Dubai, House Deep Cleaning Dubai, Residential Deep Cleaning Dubai, Commercial Deep Cleaning Dubai, Eco-Friendly Cleaning Dubai, Kitchen Deep Cleaning Dubai, Bathroom Deep Cleaning Dubai, Floor Cleaning Dubai, Sanitization Services Dubai, One-Time Deep Cleaning Dubai, Same-Day Cleaning Dubai, Move-In Deep Cleaning Dubai, Move-Out Deep Cleaning Dubai, Post-Renovation Cleaning Dubai, Spring Cleaning Dubai, Professional House Cleaning Dubai, Dust removal, Germ removal, Home sanitization, Eco-safe cleaning, Property cleaning, Indoor air quality, Residential hygiene, Commercial hygiene, Steam cleaning, Disinfection services, Trained cleaning professionals, Apartment sanitization, Villa maintenance, Office hygiene, Deep home cleaning" />
      </Helmet>

      {/* Hero Section */}
      <div className="relative h-[500px] w-full overflow-hidden">
        <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" alt="Professional Deep Cleaning Dubai" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 pt-28">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/services" className="inline-flex items-center text-crystal-300 mb-4 hover:text-white transition"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Services</Link>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-4 max-w-4xl">Professional Deep Cleaning Services in Dubai – Trusted Experts for Homes & Businesses</h1>
            <p className="text-lg text-gray-200 mb-8 max-w-3xl">Keeping your home or workplace truly clean requires more than routine dusting and mopping. Over time, dirt, grease, bacteria, allergens, and hidden contaminants accumulate in areas that regular cleaning simply cannot reach. Our Deep Cleaning Services in Dubai are designed to restore every corner of your property, delivering a healthier, fresher, and more hygienic environment for your family, employees, or customers.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => scrollToSection('villa-section')} className="flex items-center justify-center bg-white text-gray-800 px-6 py-3 rounded-full hover:bg-gray-100 transition shadow-lg font-bold">
                <Home className="w-5 h-5 mr-2 text-crystal-500" /> Villa Deep Cleaning
              </button>
              <button onClick={() => scrollToSection('apartment-section')} className="flex items-center justify-center bg-crystal-500 text-white px-6 py-3 rounded-full hover:bg-crystal-600 transition shadow-lg font-bold">
                <Building className="w-5 h-5 mr-2" /> Apartment Deep Cleaning
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Intro Text */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-lg text-gray-600 leading-relaxed mb-6">
            As one of Dubai's trusted cleaning service providers, we specialize in comprehensive deep cleaning solutions for apartments, villas, offices, retail stores, restaurants, clinics, schools, warehouses, and commercial buildings. Our trained cleaning professionals use advanced equipment, eco-friendly cleaning solutions, and proven techniques to remove stubborn dirt, sanitize surfaces, eliminate odors, and leave your property looking and feeling like new.
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg text-gray-600 leading-relaxed">
            Whether you're preparing for a special occasion, moving into a new property, recovering after renovations, or simply giving your home the attention it deserves, our professional deep cleaning service ensures every room receives meticulous care.
          </motion.p>
        </div>
      </section>

      {/* What Is Deep Cleaning? */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-6 text-center">What Is Deep Cleaning?</h2>
            <p className="text-lg text-gray-600 leading-relaxed text-center max-w-4xl mx-auto mb-6">
              Deep cleaning is a comprehensive cleaning process that goes far beyond everyday housekeeping. Unlike standard cleaning, which focuses on visible surfaces, deep cleaning targets hidden dust, accumulated grime, bacteria, mold, grease, and allergens found in difficult-to-reach places.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed text-center max-w-4xl mx-auto mb-12">
              Our professional cleaners pay close attention to every detail, ensuring your property receives a complete top-to-bottom cleaning. From high ceilings and light fixtures to kitchen appliances, bathroom tiles, grout lines, windows, furniture, and flooring, every area is carefully cleaned, disinfected, and restored.
            </p>
            
            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Deep cleaning is recommended for:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {recommendedFor.map((item, i) => (
                <div key={i} className="flex items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <CheckCircle className="w-5 h-5 text-crystal-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Our Deep Cleaning Services? */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-4">Why Choose Our Deep Cleaning Services in Dubai?</motion.h2>
            <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg text-gray-600 max-w-3xl mx-auto">Finding a reliable cleaning company in Dubai means choosing a team that values quality, professionalism, and customer satisfaction. Our experienced cleaning specialists are trained to deliver exceptional results while respecting your property and schedule.</motion.p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {whyChooseFeatures.map((feature, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-gray-50 p-8 rounded-3xl border border-gray-100 flex flex-col sm:flex-row items-start gap-6">
                <div className="bg-crystal-100 w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-8 h-8 text-crystal-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Complete Deep Cleaning Process */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-4">Our Complete Deep Cleaning Process</motion.h2>
            <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg text-gray-600 max-w-3xl mx-auto">Professional cleaning requires a systematic approach. Our deep cleaning process has been carefully developed to achieve outstanding results while protecting your furniture, flooring, and interior finishes.</motion.p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <span className="bg-crystal-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4">{i+1}</span>
                  <h3 className="text-lg font-bold text-gray-800">{step.title}</h3>
                </div>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas We Deep Clean */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-8">Areas We Deep Clean</motion.h2>
          <div className="flex flex-wrap justify-center gap-3">
            {areasWeClean.map((area, i) => (
              <span key={i} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">{area}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Residential & Commercial Sections */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl grid md:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <Home className="w-12 h-12 text-crystal-500 mb-4" />
            <h2 className="text-3xl font-display font-bold text-gray-800 mb-4">Residential Deep Cleaning Services</h2>
            <p className="text-gray-600 leading-relaxed mb-4">Your home should be a place of comfort, relaxation, and wellness. Our residential deep cleaning service removes dust, bacteria, allergens, stains, and hidden dirt to create a healthier environment for your family.</p>
            <p className="text-gray-600 leading-relaxed">Whether you live in a compact apartment or a spacious luxury villa, our professional team delivers personalized cleaning solutions that meet your lifestyle and schedule.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <Building className="w-12 h-12 text-crystal-500 mb-4" />
            <h2 className="text-3xl font-display font-bold text-gray-800 mb-4">Commercial Deep Cleaning Services</h2>
            <p className="text-gray-600 leading-relaxed mb-4">A clean workplace creates a positive impression while promoting employee productivity and customer confidence. We provide deep cleaning solutions for:</p>
            <ul className="grid grid-cols-2 gap-2 text-gray-600">
              <li className="flex items-center"><CheckCircle className="w-4 h-4 text-crystal-500 mr-2" /> Corporate offices</li>
              <li className="flex items-center"><CheckCircle className="w-4 h-4 text-crystal-500 mr-2" /> Retail outlets</li>
              <li className="flex items-center"><CheckCircle className="w-4 h-4 text-crystal-500 mr-2" /> Restaurants & Cafés</li>
              <li className="flex items-center"><CheckCircle className="w-4 h-4 text-crystal-500 mr-2" /> Hotels</li>
              <li className="flex items-center"><CheckCircle className="w-4 h-4 text-crystal-500 mr-2" /> Medical facilities</li>
              <li className="flex items-center"><CheckCircle className="w-4 h-4 text-crystal-500 mr-2" /> Schools & Gyms</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Pricing Packages */}
      <div id="villa-section" className="py-16 scroll-mt-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-3">Villa Deep Cleaning Packages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Comprehensive top-to-bottom cleaning for your Dubai villa. Perfect for spring cleaning or post-renovation.</p>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center"><Home className="w-6 h-6 mr-3 text-crystal-500" /> Furnished Villas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {villaFurnished.map(pkg => <PackageCard key={pkg.id} pkg={pkg} type="Furnished" accentColor="crystal" />)}
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center"><Home className="w-6 h-6 mr-3 text-gray-400" /> Unfurnished Villas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {villaUnfurnished.map(pkg => <PackageCard key={pkg.id} pkg={pkg} type="Unfurnished" accentColor="crystal" />)}
          </div>
        </div>
      </div>

      <div id="apartment-section" className="py-16 scroll-mt-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-3">Apartment Deep Cleaning Packages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Detailed cleaning for apartments and studios. Ideal for move-in/move-out or annual deep cleans.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {apartments.map(pkg => <PackageCard key={pkg.id} pkg={pkg} type="Apartment" accentColor="blue" />)}
          </div>
        </div>
      </div>

      {/* Benefits of Professional Deep Cleaning */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-4">Benefits of Professional Deep Cleaning</motion.h2>
            <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg text-gray-600 max-w-3xl mx-auto">Choosing professional deep cleaning provides long-term benefits beyond appearance.</motion.p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                <div className="bg-crystal-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                  <Sparkles className="w-7 h-7 text-crystal-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Dubai Residents Trust Our Cleaning Company */}
      <section className="py-20 bg-crystal-50">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-6">Why Dubai Residents Trust Our Cleaning Company</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Our reputation has been built through consistent service quality, attention to detail, and customer satisfaction. We understand the unique challenges of maintaining properties in Dubai's climate, where dust, sand, humidity, and heavy air-conditioning use can quickly affect cleanliness.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Whether you are located in Downtown Dubai, Dubai Marina, Business Bay, Jumeirah, Palm Jumeirah, Arabian Ranches, JVC, JLT, Al Barsha, Mirdif, Dubai Hills Estate, Silicon Oasis, Sports City, or Emirates Hills, our mobile cleaning teams are ready to deliver professional deep cleaning services across Dubai.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800">Frequently Asked Questions</h2>
          </motion.div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex justify-between items-center p-6 text-left">
                  <h3 className="text-lg font-semibold text-gray-800">{faq.q}</h3>
                  <ChevronDown className={`w-5 h-5 text-crystal-500 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <motion.div initial={{ height: 0, opacity: 0 }} animate={openFaq === i ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }} className="overflow-hidden">
                  <p className="p-6 pt-0 text-gray-600">{faq.a}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-br from-crystal-600 to-crystal-800 rounded-[3rem] p-12 md:p-16 text-center shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Book Professional Deep Cleaning Services in Dubai Today</h2>
            <p className="text-crystal-100 text-lg mb-8 max-w-2xl mx-auto">Experience the difference that professional deep cleaning can make. Whether you need a one-time deep clean, seasonal maintenance, or recurring cleaning services, our experienced team is committed to delivering exceptional results with attention to every detail.</p>
            <button onClick={() => scrollToSection('villa-section')} className="bg-white text-crystal-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition shadow-lg">
              View Packages & Book Now
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}