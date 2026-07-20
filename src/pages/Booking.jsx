import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Home, Building, Baby, Sparkles, Truck, Sofa, Minus, Plus, CheckCircle, ArrowRight, ClipboardList, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

// --- Data Definitions ---
const hourlyServices = [
  { id: 'residential', name: 'Residential Cleaning', icon: Home, rates: { 2: 40, 3: 35, 4: 30 }, hasMaterials: true },
  { id: 'commercial', name: 'Commercial Cleaning', icon: Building, rates: { 2: 40, 3: 35, 4: 30 }, hasMaterials: true },
  { id: 'babysitting', name: 'Babysitting & Maid', icon: Baby, rates: { 2: 50, 3: 45, 4: 40 }, hasMaterials: false },
];

const packageServices = [
  { id: 'deep', name: 'Deep Cleaning', icon: Sparkles, types: ['Villa (Furnished)', 'Villa (Unfurnished)', 'Apartment'] },
  { id: 'move', name: 'Move In/Out Cleaning', icon: Truck, types: ['Villa (Furnished)', 'Villa (Unfurnished)', 'Apartment'] },
  { id: 'furniture', name: 'Furniture Cleaning', icon: Sofa, types: ['Sofa', 'Mattress', 'Carpet'] },
];

const packagePricing = {
  'Deep Cleaning': {
    'Villa (Furnished)': [{ id: 'vf1', name: '1 BHK', price: 400 }, { id: 'vf2', name: '2 BHK', price: 500 }, { id: 'vf3', name: '3 BHK', price: 600 }, { id: 'vf4', name: '4 BHK', price: 700 }, { id: 'vf5', name: '5 BHK', price: 800 }],
    'Villa (Unfurnished)': [{ id: 'vu1', name: '1 BHK', price: 350 }, { id: 'vu2', name: '2 BHK', price: 450 }, { id: 'vu3', name: '3 BHK', price: 550 }, { id: 'vu4', name: '4 BHK', price: 650 }, { id: 'vu5', name: '5 BHK', price: 750 }],
    'Apartment': [{ id: 'ap0', name: 'Studio', price: 250 }, { id: 'ap1', name: '1 BHK', price: 300 }, { id: 'ap2', name: '2 BHK', price: 350 }, { id: 'ap3', name: '3 BHK', price: 400 }]
  },
  'Move In/Out Cleaning': {
    'Villa (Furnished)': [{ id: 'mvf1', name: '1 BHK', price: 400 }, { id: 'mvf2', name: '2 BHK', price: 500 }, { id: 'mvf3', name: '3 BHK', price: 600 }, { id: 'mvf4', name: '4 BHK', price: 700 }, { id: 'mvf5', name: '5 BHK', price: 800 }],
    'Villa (Unfurnished)': [{ id: 'mvu1', name: '1 BHK', price: 350 }, { id: 'mvu2', name: '2 BHK', price: 450 }, { id: 'mvu3', name: '3 BHK', price: 550 }, { id: 'mvu4', name: '4 BHK', price: 650 }, { id: 'mvu5', name: '5 BHK', price: 750 }],
    'Apartment': [{ id: 'map0', name: 'Studio', price: 250 }, { id: 'map1', name: '1 BHK', price: 300 }, { id: 'map2', name: '2 BHK', price: 350 }, { id: 'map3', name: '3 BHK', price: 400 }]
  },
  'Furniture Cleaning': {
    'Sofa': [{ id: 's1', name: '1 Seater', price: 80 }, { id: 's2', name: '2 Seater', price: 120 }, { id: 's3', name: '3 Seater', price: 160 }, { id: 's4', name: '4 Seater', price: 200 }, { id: 's5', name: '5 Seater (L-Shape)', price: 250 }],
    'Mattress': [{ id: 'm1', name: 'Single/Twin', price: 100 }, { id: 'm2', name: 'Double/Full', price: 120 }, { id: 'm3', name: 'Queen', price: 140 }, { id: 'm4', name: 'King', price: 160 }],
    'Carpet': [{ id: 'c1', name: 'Small (2x2m)', price: 100 }, { id: 'c2', name: 'Medium (3x4m)', price: 150 }, { id: 'c3', name: 'Large (4x5m)', price: 200 }, { id: 'c4', name: 'Extra Large (5m+)', price: 250 }]
  }
};

export default function Booking() {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  
  const [hours, setHours] = useState(2);
  const [crew, setCrew] = useState(1);
  const [materials, setMaterials] = useState(false);
  
  const [propertyType, setPropertyType] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  
  const [customDetails, setCustomDetails] = useState('');
  const [estimate, setEstimate] = useState(0);

  useEffect(() => {
    if (category === 'hourly' && selectedService) {
      const rate = selectedService.rates[hours] || selectedService.rates[4];
      const matsFee = materials && selectedService.hasMaterials ? 20 : 0;
      setEstimate((hours * crew * rate) + matsFee);
    } else if (category === 'package' && selectedPackage) {
      setEstimate(selectedPackage.price);
    } else if (category === 'custom') {
      setEstimate(null);
    } else {
      setEstimate(0);
    }
  }, [category, selectedService, hours, crew, materials, selectedPackage]);

  const handleSelectService = (service, type) => {
    setCategory(type);
    setSelectedService(service);
    setHours(2); setCrew(1); setMaterials(false);
    setPropertyType(null); setSelectedPackage(null);
    setCustomDetails('');
    setStep(2);
  };

  const handleProceedToCheckout = (e) => {
    e.preventDefault();
    let cartItem = {};

    if (category === 'hourly') {
      cartItem = { 
        service: selectedService.name, 
        hours, crew, materials, 
        ratePerHour: selectedService.rates[hours], 
        totalAmount: estimate 
      };
    } else if (category === 'package') {
      cartItem = { 
        service: `${selectedService.name}: ${selectedPackage.name} (${propertyType})`, 
        isPackage: true, 
        totalAmount: selectedPackage.price 
      };
    } else if (category === 'custom') {
      cartItem = { 
        service: `Custom Request`, 
        isCustom: true, 
        customDetails: customDetails, 
        totalAmount: 0 // Set to 0 so it doesn't mess up the cart total math
      };
    }

    addToCart(cartItem);
    navigate('/checkout'); // Redirect to the single checkout page
  };

  return (
    <div className="pt-32 pb-20 bg-gradient-to-b from-crystal-50 to-white min-h-screen">
      <Helmet>
        <title>Book Cleaning Services in Dubai | Lucky Crystal Maids</title>
        <meta name="description" content="Book your professional cleaning service in Dubai instantly. Residential, deep, commercial, and custom cleaning available. Schedule online today!" />
      </Helmet>
      
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-5xl font-display font-bold text-gray-800 mb-4">Book Your Cleaning</h1>
          <p className="text-xl text-gray-600">Select your service, build your plan, and proceed to our secure checkout.</p>
        </motion.div>
        
        <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8">
          
          {/* Left Column: Dynamic Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 min-h-[500px]">
              
              {step === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h2 className="text-2xl font-bold mb-8 text-gray-800 text-center">1. Select Your Service</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {hourlyServices.map((s) => (
                      <button key={s.id} onClick={() => handleSelectService(s, 'hourly')} className="p-6 border-2 border-gray-200 rounded-2xl hover:border-crystal-500 hover:bg-crystal-50 transition flex flex-col items-center text-center group">
                        <s.icon className="w-10 h-10 text-gray-400 group-hover:text-crystal-500 mb-3 transition" />
                        <span className="font-semibold text-gray-800 text-sm">{s.name}</span>
                      </button>
                    ))}
                    {packageServices.map((s) => (
                      <button key={s.id} onClick={() => handleSelectService(s, 'package')} className="p-6 border-2 border-gray-200 rounded-2xl hover:border-crystal-500 hover:bg-crystal-50 transition flex flex-col items-center text-center group">
                        <s.icon className="w-10 h-10 text-gray-400 group-hover:text-crystal-500 mb-3 transition" />
                        <span className="font-semibold text-gray-800 text-sm">{s.name}</span>
                      </button>
                    ))}
                    
                    <button onClick={() => handleSelectService({ id: 'custom', name: 'Custom Request' }, 'custom')} className="col-span-2 md:col-span-3 p-6 border-2 border-dashed border-gray-300 rounded-2xl hover:border-crystal-500 hover:bg-crystal-50 transition flex flex-col items-center text-center group mt-2">
                      <ClipboardList className="w-10 h-10 text-gray-400 group-hover:text-crystal-500 mb-3 transition" />
                      <span className="font-semibold text-gray-800 text-sm">Custom / Other Request</span>
                      <span className="text-xs text-gray-500 mt-1">Have a unique requirement? Tell us what you need!</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <button onClick={() => setStep(1)} className="text-sm text-gray-500 hover:text-crystal-500 mb-6 flex items-center">← Back to Services</button>
                  <h2 className="text-2xl font-bold mb-8 text-gray-800">2. {selectedService.name} Details</h2>
                  
                  <form onSubmit={handleProceedToCheckout} className="space-y-8">
                    {/* Dynamic Inputs */}
                    {category === 'hourly' && (
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Hours (Min 2, Max 8)</label>
                          <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-200">
                            <button type="button" onClick={() => setHours(Math.max(2, hours - 1))} className="p-2 rounded-lg bg-white shadow-sm"><Minus className="w-4 h-4" /></button>
                            <span className="text-lg font-bold text-gray-800">{hours} Hours</span>
                            <button type="button" onClick={() => setHours(Math.min(8, hours + 1))} className="p-2 rounded-lg bg-white shadow-sm"><Plus className="w-4 h-4" /></button>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Crew Members (Max 10)</label>
                          <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-200">
                            <button type="button" onClick={() => setCrew(Math.max(1, crew - 1))} className="p-2 rounded-lg bg-white shadow-sm"><Minus className="w-4 h-4" /></button>
                            <span className="text-lg font-bold text-gray-800">{crew} Member{crew > 1 ? 's' : ''}</span>
                            <button type="button" onClick={() => setCrew(Math.min(10, crew + 1))} className="p-2 rounded-lg bg-white shadow-sm"><Plus className="w-4 h-4" /></button>
                          </div>
                        </div>
                        
                        {selectedService.hasMaterials && (
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Bring Cleaning Materials? (+20 AED)</label>
                            <div className="grid grid-cols-2 gap-2">
                              <button type="button" onClick={() => setMaterials(true)} className={`p-3 rounded-xl border-2 font-medium text-sm transition ${materials ? 'border-crystal-500 bg-crystal-50 text-crystal-600' : 'border-gray-200 bg-white text-gray-500'}`}>Yes, Bring Materials</button>
                              <button type="button" onClick={() => setMaterials(false)} className={`p-3 rounded-xl border-2 font-medium text-sm transition ${!materials ? 'border-crystal-500 bg-crystal-50 text-crystal-600' : 'border-gray-200 bg-white text-gray-500'}`}>No, I Have Them</button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {category === 'package' && (
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Select Type</label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {selectedService.types.map((type) => (
                              <button key={type} type="button" onClick={() => { setPropertyType(type); setSelectedPackage(null); }} className={`p-3 rounded-xl border-2 font-medium text-sm transition ${propertyType === type ? 'border-crystal-500 bg-crystal-50 text-crystal-600' : 'border-gray-200 bg-white text-gray-500'}`}>
                                {type}
                              </button>
                            ))}
                          </div>
                        </div>

                        {propertyType && (
                          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Select Package</label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                              {packagePricing[selectedService.name][propertyType].map((pkg) => (
                                <button key={pkg.id} type="button" onClick={() => setSelectedPackage(pkg)} className={`p-4 rounded-xl border-2 text-center transition ${selectedPackage?.id === pkg.id ? 'border-crystal-500 bg-crystal-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                                  <p className="font-bold text-gray-800 text-sm">{pkg.name}</p>
                                  <p className="text-crystal-600 font-bold mt-1">{pkg.price} AED</p>
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </div>
                    )}

                    {category === 'custom' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Describe Your Requirements</label>
                        <textarea 
                          rows="5" 
                          required 
                          value={customDetails}
                          onChange={(e) => setCustomDetails(e.target.value)}
                          placeholder="e.g., I need a post-construction cleanup for a 2000 sqft office, or I need a full-time live-in maid for a month..." 
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-crystal-500"
                        ></textarea>
                        <div className="mt-4 bg-blue-50 text-blue-700 p-4 rounded-xl text-sm flex items-start">
                          <ClipboardList className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Please proceed to checkout to submit your details. Our team will assess your custom request and contact you with an estimate to finalize the booking.</span>
                        </div>
                      </div>
                    )}

                    <button type="submit" className="w-full bg-crystal-500 text-white py-4 rounded-xl hover:bg-crystal-600 transition font-bold text-lg flex items-center justify-center">
                      Proceed to Checkout <ShoppingCart className="w-5 h-5 ml-2" />
                    </button>
                  </form>
                </motion.div>
              )}
            </div>
          </div>

          {/* Right Column: Live Estimate Sidebar */}
          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1">
              <div className="bg-gray-900 text-white p-8 rounded-3xl shadow-xl sticky top-24">
                <h3 className="text-xl font-bold mb-6">Service Summary</h3>
                
                <div className="space-y-3 pb-6 border-b border-gray-700 text-sm">
                  <p className="text-gray-400">Service: <span className="font-medium text-white float-right">{selectedService.name}</span></p>
                  
                  {category === 'hourly' ? (
                    <>
                      <p className="text-gray-400">Duration: <span className="font-medium text-white float-right">{hours} Hours</span></p>
                      <p className="text-gray-400">Crew: <span className="font-medium text-white float-right">{crew} Members</span></p>
                      <p className="text-gray-400">Materials: <span className="font-medium text-white float-right">{materials && selectedService.hasMaterials ? 'Yes (+20 AED)' : 'No'}</span></p>
                    </>
                  ) : category === 'package' ? (
                    <>
                      <p className="text-gray-400">Type: <span className="font-medium text-white float-right">{propertyType || 'N/A'}</span></p>
                      <p className="text-gray-400">Package: <span className="font-medium text-white float-right">{selectedPackage?.name || 'N/A'}</span></p>
                    </>
                  ) : (
                    <p className="text-gray-400">Details: <span className="font-medium text-white float-right">Custom Request</span></p>
                  )}
                </div>

                <div className="mt-6">
                  <p className="text-gray-400 text-sm mb-1">Estimated Total</p>
                  {estimate ? (
                    <p className="text-4xl font-bold text-crystal-400">{estimate} AED</p>
                  ) : (
                    <p className="text-3xl font-bold text-crystal-400">Custom Quote</p>
                  )}
                  <p className="text-xs text-gray-500 mt-2">You will provide your address, date, and time on the checkout page.</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}