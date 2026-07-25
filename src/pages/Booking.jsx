import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Home, Building, Baby, Sparkles, Truck, Sofa, Minus, Plus, CheckCircle, ArrowRight, ClipboardList, ShoppingCart, ShieldCheck, Clock3 } from 'lucide-react';
import { useCart } from '../context/CartContext';

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
    Apartment: [{ id: 'ap0', name: 'Studio', price: 250 }, { id: 'ap1', name: '1 BHK', price: 300 }, { id: 'ap2', name: '2 BHK', price: 350 }, { id: 'ap3', name: '3 BHK', price: 400 }],
  },
  'Move In/Out Cleaning': {
    'Villa (Furnished)': [{ id: 'mvf1', name: '1 BHK', price: 400 }, { id: 'mvf2', name: '2 BHK', price: 500 }, { id: 'mvf3', name: '3 BHK', price: 600 }, { id: 'mvf4', name: '4 BHK', price: 700 }, { id: 'mvf5', name: '5 BHK', price: 800 }],
    'Villa (Unfurnished)': [{ id: 'mvu1', name: '1 BHK', price: 350 }, { id: 'mvu2', name: '2 BHK', price: 450 }, { id: 'mvu3', name: '3 BHK', price: 550 }, { id: 'mvu4', name: '4 BHK', price: 650 }, { id: 'mvu5', name: '5 BHK', price: 750 }],
    Apartment: [{ id: 'map0', name: 'Studio', price: 250 }, { id: 'map1', name: '1 BHK', price: 300 }, { id: 'map2', name: '2 BHK', price: 350 }, { id: 'map3', name: '3 BHK', price: 400 }],
  },
  'Furniture Cleaning': {
    Sofa: [{ id: 's1', name: '1 Seater', price: 80 }, { id: 's2', name: '2 Seater', price: 120 }, { id: 's3', name: '3 Seater', price: 160 }, { id: 's4', name: '4 Seater', price: 200 }, { id: 's5', name: '5 Seater (L-Shape)', price: 250 }],
    Mattress: [{ id: 'm1', name: 'Single/Twin', price: 100 }, { id: 'm2', name: 'Double/Full', price: 120 }, { id: 'm3', name: 'Queen', price: 140 }, { id: 'm4', name: 'King', price: 160 }],
    Carpet: [{ id: 'c1', name: 'Small (2x2m)', price: 100 }, { id: 'c2', name: 'Medium (3x4m)', price: 150 }, { id: 'c3', name: 'Large (4x5m)', price: 200 }, { id: 'c4', name: 'Extra Large (5m+)', price: 250 }],
  },
};

const cardClass = 'rounded-3xl border border-gray-200 bg-white shadow-sm';

export default function Booking() {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [hours, setHours] = useState(2);
  const [crew, setCrew] = useState(1);
  const [materials, setMaterials] = useState(false);
  const [propertyType, setPropertyType] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [customDetails, setCustomDetails] = useState('');

  const estimate = useMemo(() => {
    if (category === 'hourly' && selectedService) {
      const rate = selectedService.rates[hours] || selectedService.rates[4];
      return hours * crew * rate + (materials && selectedService.hasMaterials ? 20 : 0);
    }
    if (category === 'package' && selectedPackage) return selectedPackage.price;
    if (category === 'custom') return null;
    return 0;
  }, [category, selectedService, hours, crew, materials, selectedPackage]);

  const canContinue = category === 'hourly' || (category === 'package' && selectedPackage) || (category === 'custom' && customDetails.trim().length >= 10);

  const selectService = (service, type) => {
    setCategory(type);
    setSelectedService(service);
    setHours(2);
    setCrew(1);
    setMaterials(false);
    setPropertyType(null);
    setSelectedPackage(null);
    setCustomDetails('');
    setStep(2);
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  const handleProceed = (event) => {
    event.preventDefault();
    if (!canContinue) return;
    let cartItem;
    if (category === 'hourly') {
      cartItem = { service: selectedService.name, hours, crew, materials, ratePerHour: selectedService.rates[hours] || selectedService.rates[4], totalAmount: estimate };
    } else if (category === 'package') {
      cartItem = { service: `${selectedService.name}: ${selectedPackage.name} (${propertyType})`, isPackage: true, totalAmount: selectedPackage.price };
    } else {
      cartItem = { service: 'Custom Request', isCustom: true, customDetails: customDetails.trim(), totalAmount: 0 };
    }
    addToCart(cartItem);
    navigate('/checkout');
  };

  const reveal = reduceMotion ? {} : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.35 } };

  return (
    <main className="min-h-screen bg-gradient-to-b from-crystal-50 via-white to-gray-50 pb-24 pt-28">
      <Helmet><title>Book Cleaning Services in Dubai | Lucky Crystal Maids</title><meta name="description" content="Book your professional cleaning service in Dubai instantly. Residential, deep, commercial, and custom cleaning available. Schedule online today!" /></Helmet>
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <motion.header {...reveal} className="mx-auto mb-10 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-crystal-200 bg-white px-4 py-2 text-sm font-semibold text-crystal-700"><Sparkles className="h-4 w-4" /> Easy online booking</span>
          <h1 className="mt-5 text-4xl font-display font-bold tracking-tight text-gray-900 sm:text-5xl">Book Your Cleaning</h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">Select your service, build your plan, and proceed to our secure checkout.</p>
        </motion.header>

        <div className="mb-8 flex items-center justify-center gap-3" aria-label="Booking progress">
          {[1, 2].map((value) => <div key={value} className="flex items-center gap-3"><span className={`grid h-9 w-9 place-items-center rounded-full text-sm font-bold ${step >= value ? 'bg-crystal-600 text-white' : 'bg-white text-gray-400 ring-1 ring-gray-200'}`}>{value}</span>{value === 1 && <span className={`h-1 w-20 rounded-full ${step === 2 ? 'bg-crystal-500' : 'bg-gray-200'}`} />}</div>)}
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
          <section className={`${cardClass} p-5 sm:p-8 lg:p-10`}>
            {step === 1 ? (
              <motion.div {...reveal}>
                <div className="mb-8"><p className="text-sm font-semibold uppercase tracking-widest text-crystal-600">Step 1</p><h2 className="mt-2 text-2xl font-bold text-gray-900">Select your service</h2></div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {[...hourlyServices.map(s => ({ ...s, type: 'hourly' })), ...packageServices.map(s => ({ ...s, type: 'package' }))].map((service) => (
                    <button key={service.id} type="button" onClick={() => selectService(service, service.type)} className="group min-h-40 rounded-2xl border border-gray-200 bg-gray-50 p-5 text-left transition hover:-translate-y-1 hover:border-crystal-300 hover:bg-white hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-crystal-500">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-crystal-600 shadow-sm"><service.icon className="h-6 w-6" /></span>
                      <span className="mt-5 block font-bold text-gray-900">{service.name}</span>
                      <span className="mt-2 flex items-center gap-1 text-sm text-gray-500">Configure service <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
                    </button>
                  ))}
                  <button type="button" onClick={() => selectService({ id: 'custom', name: 'Custom Request' }, 'custom')} className="group rounded-2xl border-2 border-dashed border-gray-300 p-5 text-left transition hover:border-crystal-400 hover:bg-crystal-50 sm:col-span-2 lg:col-span-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-crystal-500">
                    <div className="flex items-center gap-4"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-crystal-600 shadow-sm"><ClipboardList className="h-6 w-6" /></span><div><span className="block font-bold text-gray-900">Custom / Other Request</span><span className="mt-1 block text-sm text-gray-500">Have a unique requirement? Tell us what you need.</span></div></div>
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div {...reveal}>
                <button type="button" onClick={() => setStep(1)} className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-crystal-600">← Back to services</button>
                <div className="mb-8"><p className="text-sm font-semibold uppercase tracking-widest text-crystal-600">Step 2</p><h2 className="mt-2 text-2xl font-bold text-gray-900">{selectedService.name} details</h2></div>
                <form onSubmit={handleProceed} className="space-y-8">
                  {category === 'hourly' && <div className="grid gap-6 md:grid-cols-2">
                    {[['Hours (Min 2, Max 8)', hours, () => setHours(Math.max(2, hours - 1)), () => setHours(Math.min(8, hours + 1)), `${hours} Hours`], ['Crew Members (Max 10)', crew, () => setCrew(Math.max(1, crew - 1)), () => setCrew(Math.min(10, crew + 1)), `${crew} Member${crew > 1 ? 's' : ''}`]].map(([label, value, minus, plus, display]) => <div key={label}><label className="mb-2 block text-sm font-semibold text-gray-700">{label}</label><div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 p-3"><button type="button" onClick={minus} aria-label={`Decrease ${label}`} className="grid h-10 w-10 place-items-center rounded-xl bg-white shadow-sm hover:bg-gray-100"><Minus className="h-4 w-4" /></button><span className="font-bold text-gray-900">{display}</span><button type="button" onClick={plus} aria-label={`Increase ${label}`} className="grid h-10 w-10 place-items-center rounded-xl bg-white shadow-sm hover:bg-gray-100"><Plus className="h-4 w-4" /></button></div></div>)}
                    {selectedService.hasMaterials && <div className="md:col-span-2"><span className="mb-2 block text-sm font-semibold text-gray-700">Bring Cleaning Materials? (+20 AED)</span><div className="grid grid-cols-2 gap-3">{[[true, 'Yes, bring materials'], [false, 'No, I have them']].map(([value, label]) => <button key={label} type="button" onClick={() => setMaterials(value)} className={`rounded-xl border-2 p-3 text-sm font-semibold ${materials === value ? 'border-crystal-500 bg-crystal-50 text-crystal-700' : 'border-gray-200 text-gray-600'}`}>{label}</button>)}</div></div>}
                  </div>}

                  {category === 'package' && <div className="space-y-6"><div><span className="mb-3 block text-sm font-semibold text-gray-700">Select type</span><div className="grid gap-3 sm:grid-cols-3">{selectedService.types.map(type => <button key={type} type="button" onClick={() => { setPropertyType(type); setSelectedPackage(null); }} className={`rounded-xl border-2 p-3 text-sm font-semibold ${propertyType === type ? 'border-crystal-500 bg-crystal-50 text-crystal-700' : 'border-gray-200 text-gray-600'}`}>{type}</button>)}</div></div>{propertyType && <div><span className="mb-3 block text-sm font-semibold text-gray-700">Select package</span><div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">{packagePricing[selectedService.name][propertyType].map(pkg => <button key={pkg.id} type="button" onClick={() => setSelectedPackage(pkg)} className={`rounded-2xl border-2 p-4 text-left ${selectedPackage?.id === pkg.id ? 'border-crystal-500 bg-crystal-50' : 'border-gray-200 hover:border-gray-300'}`}><span className="block font-bold text-gray-900">{pkg.name}</span><span className="mt-1 block font-bold text-crystal-600">{pkg.price} AED</span></button>)}</div></div>}</div>}

                  {category === 'custom' && <div><label htmlFor="customDetails" className="mb-2 block text-sm font-semibold text-gray-700">Describe Your Requirements</label><textarea id="customDetails" rows={6} required minLength={10} value={customDetails} onChange={(e) => setCustomDetails(e.target.value)} placeholder="e.g., I need a post-construction cleanup for a 2000 sqft office..." className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-crystal-500 focus:ring-4 focus:ring-crystal-100" /><p className="mt-2 text-xs text-gray-500">Please provide at least 10 characters.</p></div>}

                  <button type="submit" disabled={!canContinue} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-crystal-600 px-5 py-4 text-lg font-bold text-white shadow-lg shadow-crystal-200 transition hover:bg-crystal-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none">Proceed to Checkout <ShoppingCart className="h-5 w-5" /></button>
                </form>
              </motion.div>
            )}
          </section>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl bg-gray-950 p-6 text-white shadow-xl sm:p-8">
              <h2 className="text-xl font-bold">Service Summary</h2>
              {step === 1 ? <p className="mt-4 text-sm leading-6 text-gray-400">Choose a service to see the price and details here.</p> : <><dl className="mt-6 space-y-4 border-b border-white/10 pb-6 text-sm"><div className="flex justify-between gap-4"><dt className="text-gray-400">Service</dt><dd className="text-right font-semibold">{selectedService.name}</dd></div>{category === 'hourly' && <><div className="flex justify-between"><dt className="text-gray-400">Duration</dt><dd>{hours} Hours</dd></div><div className="flex justify-between"><dt className="text-gray-400">Crew</dt><dd>{crew}</dd></div></>}{category === 'package' && <><div className="flex justify-between gap-4"><dt className="text-gray-400">Type</dt><dd className="text-right">{propertyType || 'Not selected'}</dd></div><div className="flex justify-between"><dt className="text-gray-400">Package</dt><dd>{selectedPackage?.name || 'Not selected'}</dd></div></>}</dl><div className="mt-6"><p className="text-sm text-gray-400">Estimated Total</p><p className="mt-1 text-4xl font-bold text-crystal-400">{estimate ? `${estimate} AED` : 'Custom Quote'}</p></div></>}
            </div>
            <div className={`${cardClass} p-5`}><div className="flex gap-3"><ShieldCheck className="mt-0.5 h-5 w-5 flex-none text-crystal-600" /><div><p className="font-bold text-gray-900">Secure next step</p><p className="mt-1 text-sm leading-6 text-gray-600">You will add your address, preferred date, and payment choice on checkout.</p></div></div><div className="mt-4 flex gap-3"><Clock3 className="mt-0.5 h-5 w-5 flex-none text-crystal-600" /><p className="text-sm leading-6 text-gray-600">Most bookings take only a few minutes to complete.</p></div></div>
          </aside>
        </div>
      </div>
    </main>
  );
}