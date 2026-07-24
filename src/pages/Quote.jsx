import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Calculator, Home, Building, Baby, Sparkles, Truck, Sofa, Minus, Plus, CheckCircle, Construction, ArrowRight, ClipboardList, X } from 'lucide-react';

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

// Package Pricing Matrix
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

export default function Quote() {
  const [step, setStep] = useState(1); // 1: Select Service, 2: Enter Details, 3: Success
  const [category, setCategory] = useState(null); // 'hourly', 'package', or 'custom'
  const [selectedService, setSelectedService] = useState(null);
    const [error, setError] = useState(null);
  
  // Hourly State
  const [hours, setHours] = useState(2);
  const [crew, setCrew] = useState(1);
  const [materials, setMaterials] = useState(false);
  
  // Package State
  const [propertyType, setPropertyType] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  
  // Custom State
  const [customDetails, setCustomDetails] = useState('');

  // Contact State
  const [contact, setContact] = useState({ name: '', phone: '', email: '', address: '' });

  // Calculate Live Estimate
  const [estimate, setEstimate] = useState(0);

  useEffect(() => {
    if (category === 'hourly' && selectedService) {
      const rate = selectedService.rates[hours] || selectedService.rates[4];
      const matsFee = materials && selectedService.hasMaterials ? 20 : 0;
      setEstimate((hours * crew * rate) + matsFee);
    } else if (category === 'package' && selectedPackage) {
      setEstimate(selectedPackage.price);
    } else if (category === 'custom') {
      setEstimate(null); // Use null to represent "Custom Quote"
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

     const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    
    let details = {};
    if (category === 'hourly') {
      details = { hours, crew, materials };
    } else if (category === 'package') {
      details = { propertyType, selectedPackage };
    } else if (category === 'custom') {
      details = { customDetails };
    }

    try {
      const response = await fetch('https://lucky-backend-woad.vercel.app/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: selectedService.name,
          details: details,
          estimate: estimate,
          contact: contact
        })
      });

      if (response.ok) {
        setStep(3);
      } else {
        setError('Failed to submit quote. Please check your details and try again.');
      }
    } catch (error) {
      setError('Error connecting to server. Is the backend running?');
    }
  };

  return (
    <div className="pt-32 pb-20 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <Helmet>
        <title>Get a Free Cleaning Quote in Dubai | Lucky Crystal Maids</title>
        <meta name="description" content="Get an instant, free quote for residential, deep, commercial, or custom cleaning in Dubai. Transparent pricing, no hidden fees." />
      </Helmet>
      
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-5xl font-display font-bold text-gray-800 mb-4">Get A Free Quote</h1>
          <p className="text-xl text-gray-600">Select your service to get an instant estimate. No hidden fees.</p>
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
                    
                    {/* Custom Request Button */}
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
                  
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Dynamic Inputs based on Category */}
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

                    {/* Custom Category Form */}
                    {category === 'custom' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Describe Your Requirements</label>
                        <textarea 
                          rows="6" 
                          required 
                          value={customDetails}
                          onChange={(e) => setCustomDetails(e.target.value)}
                          placeholder="e.g., I need a post-construction cleanup for a 2000 sqft office, or I need a full-time live-in maid for a month..." 
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-crystal-500"
                        ></textarea>
                        <p className="text-xs text-gray-500 mt-2">The more detail you provide, the more accurate our custom quote will be!</p>
                      </div>
                    )}

                    {/* Contact Info */}
                                        {/* Contact Info */}
                    <div className="pt-6 border-t border-gray-100">
                      <h3 className="text-lg font-bold text-gray-800 mb-4">Your Contact Details</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <input type="text" required placeholder="Full Name" value={contact.name} onChange={(e) => setContact({...contact, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-crystal-500" />
                        <input type="tel" required placeholder="Phone Number" value={contact.phone} onChange={(e) => setContact({...contact, phone: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-crystal-500" />
                      </div>
                      <div className="grid md:grid-cols-2 gap-6 mt-4">
                        <input type="email" required placeholder="Email Address" value={contact.email} onChange={(e) => setContact({...contact, email: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-crystal-500" />
                        <input type="text" required placeholder="Area in Dubai (e.g., Marina)" value={contact.address} onChange={(e) => setContact({...contact, address: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-crystal-500" />
                      </div>
                    </div>

                                        <button type="submit" className="w-full bg-crystal-500 text-white py-4 rounded-xl hover:bg-crystal-600 transition font-bold text-lg flex items-center justify-center">
                      Submit Quote Request <ArrowRight className="w-5 h-5 ml-2" />
                    </button>

                    {error && (
                      <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm flex items-center justify-between mt-4">
                        <span>{error}</span>
                        <button type="button" onClick={() => setError(null)}><X className="w-4 h-4" /></button>
                      </div>
                    )}
                  </form>
                </motion.div>
              )}

                            {step === 3 && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12 flex flex-col items-center">
                  <div className="bg-green-100 p-4 rounded-full mb-6">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">Quote Request Sent!</h2>
                  <p className="text-gray-600 max-w-md mb-8">
                    Thank you! Our team has received your request. {estimate ? `Your estimated total is ${estimate} AED.` : 'We will assess your custom request.'} We will contact you shortly to confirm the details.
                  </p>
                  <button onClick={() => { setStep(1); setEstimate(0); setContact({ name: '', phone: '', email: '', address: '' }); }} className="text-crystal-500 font-semibold hover:underline">
                    Start a new quote
                  </button>
                </motion.div>
              )}

            </div>
          </div>

          {/* Right Column: Live Estimate Sidebar */}
          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1">
              <div className="bg-gray-900 text-white p-8 rounded-3xl shadow-xl sticky top-24">
                <h3 className="text-xl font-bold mb-6 flex items-center"><Calculator className="w-5 h-5 mr-2 text-crystal-400" /> Live Estimate</h3>
                
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
                  <p className="text-xs text-gray-500 mt-2">
                    {estimate ? '* Final price may vary slightly based on exact property condition.' : '* Our team will assess your needs and provide a tailored price.'}
                  </p>
                </div>
                
                <div className="mt-6 bg-white/5 p-4 rounded-xl text-xs text-gray-300 flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-green-400" /> No payment required to request a quote. Our team will contact you to confirm.
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}