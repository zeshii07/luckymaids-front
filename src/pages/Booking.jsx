import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  Home,
  Building,
  Baby,
  Sparkles,
  Truck,
  Sofa,
  Minus,
  Plus,
  ArrowRight,
  ArrowLeft,
  ClipboardList,
  ShoppingCart,
  ShieldCheck,
  Clock3,
  CheckCircle,
  Calendar,
  Wallet,
  Star,
  Wand2,
} from "lucide-react";
import { useCart } from "../context/CartContext";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
const hourlyServices = [
  { id: "residential", name: "Residential Cleaning", short: "Home & villa upkeep", icon: Home, accent: "violet", rates: { 2: 40, 3: 35, 4: 30 }, hasMaterials: true },
  { id: "commercial", name: "Commercial Cleaning", short: "Offices & retail", icon: Building, accent: "coral", rates: { 2: 40, 3: 35, 4: 30 }, hasMaterials: true },
  { id: "babysitting", name: "Babysitting & Maid", short: "Childcare support", icon: Baby, accent: "mint", rates: { 2: 50, 3: 45, 4: 40 }, hasMaterials: false },
];

const packageServices = [
  { id: "deep", name: "Deep Cleaning", short: "Top-to-bottom detail", icon: Sparkles, accent: "coral", types: ["Villa (Furnished)", "Villa (Unfurnished)", "Apartment"] },
  { id: "move", name: "Move In / Out", short: "Handover-ready", icon: Truck, accent: "mint", types: ["Villa (Furnished)", "Villa (Unfurnished)", "Apartment"] },
  { id: "furniture", name: "Furniture Cleaning", short: "Sofa · mattress · carpet", icon: Sofa, accent: "violet", types: ["Sofa", "Mattress", "Carpet"] },
];

const packagePricing = {
  "Deep Cleaning": {
    "Villa (Furnished)": [{ id: "vf1", name: "1 BHK", price: 400 }, { id: "vf2", name: "2 BHK", price: 500 }, { id: "vf3", name: "3 BHK", price: 600 }, { id: "vf4", name: "4 BHK", price: 700 }, { id: "vf5", name: "5 BHK", price: 800 }],
    "Villa (Unfurnished)": [{ id: "vu1", name: "1 BHK", price: 350 }, { id: "vu2", name: "2 BHK", price: 450 }, { id: "vu3", name: "3 BHK", price: 550 }, { id: "vu4", name: "4 BHK", price: 650 }, { id: "vu5", name: "5 BHK", price: 750 }],
    Apartment: [{ id: "ap0", name: "Studio", price: 250 }, { id: "ap1", name: "1 BHK", price: 300 }, { id: "ap2", name: "2 BHK", price: 350 }, { id: "ap3", name: "3 BHK", price: 400 }],
  },
  "Move In/Out Cleaning": {
    "Villa (Furnished)": [{ id: "mvf1", name: "1 BHK", price: 400 }, { id: "mvf2", name: "2 BHK", price: 500 }, { id: "mvf3", name: "3 BHK", price: 600 }, { id: "mvf4", name: "4 BHK", price: 700 }, { id: "mvf5", name: "5 BHK", price: 800 }],
    "Villa (Unfurnished)": [{ id: "mvu1", name: "1 BHK", price: 350 }, { id: "mvu2", name: "2 BHK", price: 450 }, { id: "mvu3", name: "3 BHK", price: 550 }, { id: "mvu4", name: "4 BHK", price: 650 }, { id: "mvu5", name: "5 BHK", price: 750 }],
    Apartment: [{ id: "map0", name: "Studio", price: 250 }, { id: "map1", name: "1 BHK", price: 300 }, { id: "map2", name: "2 BHK", price: 350 }, { id: "map3", name: "3 BHK", price: 400 }],
  },
  "Furniture Cleaning": {
    Sofa: [{ id: "s1", name: "1 Seater", price: 80 }, { id: "s2", name: "2 Seater", price: 120 }, { id: "s3", name: "3 Seater", price: 160 }, { id: "s4", name: "4 Seater", price: 200 }, { id: "s5", name: "5 Seater (L-Shape)", price: 250 }],
    Mattress: [{ id: "m1", name: "Single / Twin", price: 100 }, { id: "m2", name: "Double / Full", price: 120 }, { id: "m3", name: "Queen", price: 140 }, { id: "m4", name: "King", price: 160 }],
    Carpet: [{ id: "c1", name: "Small (2×2m)", price: 100 }, { id: "c2", name: "Medium (3×4m)", price: 150 }, { id: "c3", name: "Large (4×5m)", price: 200 }, { id: "c4", name: "Extra Large (5m+)", price: 250 }],
  },
};

const STEPS = ["Service", "Configure", "Review"];

// ---------------------------------------------------------------------------
// Animated number
// ---------------------------------------------------------------------------
function AnimatedNumber({ value, className }) {
  const [display, setDisplay] = useState(value);
  const reduceMotion = useReducedMotion();
  const prev = useState(value);
  useEffect(() => {
    if (reduceMotion) {
      setDisplay(value);
      return;
    }
    const start = prev[0] || 0;
    const end = value || 0;
    if (start === end) {
      setDisplay(end);
      return;
    }
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - t0) / 450);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(start + (end - start) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, reduceMotion]);
  return <span className={className}>{display.toLocaleString()}</span>;
}

function Pill({ active, onClick, children, accent = "violet" }) {
  const ring = accent === "coral" ? "ring-coral" : accent === "mint" ? "ring-mint-deep" : "ring-violet";
  const bg = active
    ? accent === "coral" ? "bg-coral/15 text-coral-deep" : accent === "mint" ? "bg-mint-soft text-emerald-700" : "bg-violet-soft text-violet-deep"
    : "bg-white text-ink-muted";
  return (
    <motion.button type="button" onClick={onClick} whileTap={{ scale: 0.96 }}
      className={`relative rounded-full px-4 py-2.5 text-sm font-bold ring-2 transition-all ${active ? `${bg} ${ring}` : "bg-white text-ink-muted ring-[var(--line)] hover:ring-violet/40"}`}>
      {children}
    </motion.button>
  );
}

function Counter({ label, value, min, max, onDec, onInc, display }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-ink-soft">{label}</label>
      <div className="flex items-center justify-between rounded-2xl border-2 border-[var(--line)] bg-white p-2.5">
        <motion.button type="button" onClick={onDec} disabled={value <= min} whileTap={{ scale: 0.9 }}
          className="grid h-10 w-10 place-items-center rounded-xl bg-violet-soft text-violet-deep shadow-sm transition hover:bg-violet-soft/70 disabled:opacity-40" aria-label={`Decrease ${label}`}>
          <Minus className="h-4 w-4" />
        </motion.button>
        <span className="text-lg font-black text-ink">{display}</span>
        <motion.button type="button" onClick={onInc} disabled={value >= max} whileTap={{ scale: 0.9 }}
          className="grid h-10 w-10 place-items-center rounded-xl bg-coral/15 text-coral-deep shadow-sm transition hover:bg-coral/25 disabled:opacity-40" aria-label={`Increase ${label}`}>
          <Plus className="h-4 w-4" />
        </motion.button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
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
  const [customDetails, setCustomDetails] = useState("");

  const estimate = useMemo(() => {
    if (category === "hourly" && selectedService) {
      const rate = selectedService.rates[hours] || selectedService.rates[4];
      return hours * crew * rate + (materials && selectedService.hasMaterials ? 20 : 0);
    }
    if (category === "package" && selectedPackage) return selectedPackage.price;
    if (category === "custom") return null;
    return 0;
  }, [category, selectedService, hours, crew, materials, selectedPackage]);

  const canProceed = category === "hourly" || (category === "package" && selectedPackage) || (category === "custom" && customDetails.trim().length >= 10);

  const selectService = (service, type) => {
    setCategory(type);
    setSelectedService(service);
    setHours(2); setCrew(1); setMaterials(false);
    setPropertyType(null); setSelectedPackage(null); setCustomDetails("");
    setStep(2);
    if (!reduceMotion) window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleProceed = (e) => {
    e.preventDefault();
    if (!canProceed) return;
    let cartItem;
    if (category === "hourly") {
      cartItem = { service: selectedService.name, hours, crew, materials, ratePerHour: selectedService.rates[hours] || selectedService.rates[4], totalAmount: estimate };
    } else if (category === "package") {
      cartItem = { service: `${selectedService.name}: ${selectedPackage.name} (${propertyType})`, isPackage: true, totalAmount: selectedPackage.price };
    } else {
      cartItem = { service: "Custom Request", isCustom: true, customDetails: customDetails.trim(), totalAmount: 0 };
    }
    addToCart(cartItem);
    setStep(3);
    if (!reduceMotion) window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const accent = selectedService?.accent || "violet";

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-coral-soft via-paper to-violet-soft pb-24 pt-24">
      <Helmet>
        <title>Book Cleaning Services in Dubai | Byt Cleaning Services</title>
        <meta name="description" content="Book your professional cleaning service in Dubai instantly. Residential, deep, commercial, and custom cleaning available. Schedule online today!" />
      </Helmet>

      {/* Ambient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.div className="absolute -left-24 top-20 h-80 w-80 rounded-full bg-coral/20 blur-3xl"
          animate={reduceMotion ? undefined : { x: [0, 30, 0], y: [0, 20, 0] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute -right-24 top-40 h-80 w-80 rounded-full bg-violet/20 blur-3xl"
          animate={reduceMotion ? undefined : { x: [0, -25, 0], y: [0, 30, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute bottom-0 left-1/2 h-72 w-72 rounded-full bg-mint/30 blur-3xl"
          animate={reduceMotion ? undefined : { x: [0, 20, 0], y: [0, -20, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} />
      </div>

      <div className="relative container mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          className="mx-auto mb-8 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-coral/30 bg-white px-4 py-2 text-sm font-bold text-coral-deep shadow-sm">
            <Sparkles className="h-4 w-4" /> Easy online booking
          </span>
          <h1 className="mt-5 font-display text-4xl font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Book your <span className="text-coral-deep">cleaning</span>
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
            Pick a service, configure the details, and review before checkout — takes about two minutes.
          </p>
        </motion.div>

        {/* Stepper */}
        <div className="mb-8 flex items-center justify-center gap-2 sm:gap-3" aria-label="Booking progress">
          {STEPS.map((label, i) => {
            const idx = i + 1;
            const active = step === idx;
            const done = step > idx;
            return (
              <div key={label} className="flex items-center gap-2 sm:gap-3">
                <div className="flex flex-col items-center gap-1.5">
                  <motion.div
                    initial={false}
                    animate={{ scale: active ? 1.1 : 1, backgroundColor: done || active ? "rgb(216 82 60)" : "rgb(255 255 255)", color: done || active ? "rgb(23 36 50)" : "rgb(101 113 125)" }}
                    className="grid h-10 w-10 place-items-center rounded-full text-sm font-bold ring-2 sm:h-11 sm:w-11"
                    style={{ boxShadow: active ? "0 8px 22px -8px rgba(216,82,60,0.55)" : "none", borderColor: done || active ? "transparent" : "rgb(221 226 228)" }}
                  >
                    {done ? <CheckCircle className="h-5 w-5" /> : idx}
                  </motion.div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider sm:text-xs ${active ? "text-coral-deep" : "text-ink-muted"}`}>{label}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="relative h-1 w-8 overflow-hidden rounded-full bg-[var(--line)] sm:w-16">
                    <motion.div initial={false} animate={{ width: done ? "100%" : "0%" }} transition={{ duration: 0.4 }} className="absolute inset-y-0 left-0 bg-gradient-to-r from-coral to-coral-deep" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          {/* Main panel */}
          <section className="overflow-hidden rounded-3xl border border-white bg-white/90 p-5 shadow-xl backdrop-blur-sm sm:p-8 lg:p-10">
            <AnimatePresence mode="wait">
              {/* STEP 1 — Service */}
              {step === 1 && (
                <motion.div key="b1" initial={reduceMotion ? false : { opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={reduceMotion ? false : { opacity: 0, x: -24 }}>
                  <div className="mb-7">
                    <p className="text-xs font-bold uppercase tracking-widest text-coral-deep">Step 1</p>
                    <h2 className="mt-1 font-display text-2xl font-bold text-ink">Select your service</h2>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[...hourlyServices.map((s) => ({ ...s, type: "hourly" })), ...packageServices.map((s) => ({ ...s, type: "package" }))].map((service, i) => {
                      const Icon = service.icon;
                      const a = service.accent;
                      return (
                        <motion.button key={service.id} type="button" onClick={() => selectService(service, service.type)}
                          initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                          whileHover={{ y: -6 }} whileTap={{ scale: 0.97 }}
                          className="group relative overflow-hidden rounded-3xl border-2 border-white bg-gradient-to-br from-white to-paper p-5 text-left shadow-md transition hover:shadow-xl">
                          <div className={`absolute inset-0 -z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${a === "coral" ? "bg-gradient-to-br from-coral/10 to-coral-soft/40" : a === "mint" ? "bg-gradient-to-br from-mint-soft to-mint/30" : "bg-gradient-to-br from-violet-soft to-violet/15"}`} />
                          <div className="relative z-10">
                            <span className={`grid h-14 w-14 place-items-center rounded-2xl shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${a === "coral" ? "bg-coral text-ink" : a === "mint" ? "bg-mint-deep text-ink" : "bg-violet text-white"}`}>
                              <Icon className="h-7 w-7" />
                            </span>
                            <h3 className="mt-5 font-display text-lg font-bold text-ink">{service.name}</h3>
                            <p className="mt-1 text-sm text-ink-muted">{service.short}</p>
                            <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-coral-deep">Configure <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                          </div>
                        </motion.button>
                      );
                    })}
                    <motion.button type="button" onClick={() => selectService({ id: "custom", name: "Custom Request", accent: "violet" }, "custom")}
                      initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                      whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }}
                      className="group relative col-span-1 overflow-hidden rounded-3xl border-2 border-dashed border-violet/40 bg-violet-soft/40 p-5 text-left transition hover:bg-violet-soft/70 sm:col-span-2 lg:col-span-3">
                      <div className="flex items-center gap-4">
                        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-violet text-white shadow-md transition-transform group-hover:rotate-6"><ClipboardList className="h-7 w-7" /></span>
                        <div>
                          <h3 className="font-display text-lg font-bold text-ink">Custom / Other request</h3>
                          <p className="mt-1 text-sm text-ink-muted">Have a unique requirement? Tell us what you need.</p>
                        </div>
                        <Wand2 className="ml-auto hidden h-7 w-7 text-violet/50 transition group-hover:text-violet sm:block" />
                      </div>
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2 — Configure */}
              {step === 2 && (
                <motion.div key="b2" initial={reduceMotion ? false : { opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={reduceMotion ? false : { opacity: 0, x: -24 }}>
                  <button type="button" onClick={() => setStep(1)} className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-ink-muted transition hover:text-coral-deep">
                    <ArrowLeft className="h-4 w-4" /> Back to services
                  </button>
                  <div className="mb-7 flex items-center gap-3">
                    {(() => {
                      const Icon = selectedService.icon;
                      return (
                        <span className={`grid h-12 w-12 place-items-center rounded-2xl ${accent === "coral" ? "bg-coral text-ink" : accent === "mint" ? "bg-mint-deep text-ink" : "bg-violet text-white"}`}>
                          <Icon className="h-6 w-6" />
                        </span>
                      );
                    })()}
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-coral-deep">Step 2 · Configure</p>
                      <h2 className="font-display text-2xl font-bold text-ink">{selectedService.name}</h2>
                    </div>
                  </div>

                  <form onSubmit={handleProceed} className="space-y-7">
                    {category === "hourly" && (
                      <div className="grid gap-5 sm:grid-cols-2">
                        <Counter label="Hours (min 2, max 8)" value={hours} min={2} max={8} onDec={() => setHours((h) => Math.max(2, h - 1))} onInc={() => setHours((h) => Math.min(8, h + 1))} display={`${hours} Hours`} />
                        <Counter label="Crew members (max 10)" value={crew} min={1} max={10} onDec={() => setCrew((c) => Math.max(1, c - 1))} onInc={() => setCrew((c) => Math.min(10, c + 1))} display={`${crew} Member${crew > 1 ? "s" : ""}`} />
                        {selectedService.hasMaterials && (
                          <div className="sm:col-span-2">
                            <p className="mb-2.5 text-sm font-bold text-ink-soft">Bring cleaning materials? <span className="font-normal text-ink-muted">+20 AED</span></p>
                            <div className="flex flex-wrap gap-2.5">
                              <Pill active={materials} accent="coral" onClick={() => setMaterials(true)}>Yes, bring materials</Pill>
                              <Pill active={!materials} onClick={() => setMaterials(false)}>No, I have them</Pill>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {category === "package" && (
                      <div className="space-y-6">
                        <div>
                          <p className="mb-2.5 text-sm font-bold text-ink-soft">Select type</p>
                          <div className="flex flex-wrap gap-2.5">
                            {selectedService.types.map((type) => (
                              <Pill key={type} active={propertyType === type} accent={accent} onClick={() => { setPropertyType(type); setSelectedPackage(null); }}>{type}</Pill>
                            ))}
                          </div>
                        </div>
                        <AnimatePresence>
                          {propertyType && (
                            <motion.div initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                              <p className="mb-2.5 text-sm font-bold text-ink-soft">Select package</p>
                              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                                {packagePricing[selectedService.name][propertyType].map((pkg) => {
                                  const active = selectedPackage?.id === pkg.id;
                                  return (
                                    <motion.button key={pkg.id} type="button" onClick={() => setSelectedPackage(pkg)} whileTap={{ scale: 0.96 }}
                                      className={`relative overflow-hidden rounded-2xl border-2 p-4 text-left transition ${active ? (accent === "coral" ? "border-coral bg-coral/10" : accent === "mint" ? "border-mint-deep bg-mint-soft" : "border-violet bg-violet-soft") : "border-[var(--line)] bg-white hover:border-coral/40"}`}>
                                      <p className="font-bold text-ink">{pkg.name}</p>
                                      <p className={`mt-1 font-black ${active ? (accent === "coral" ? "text-coral-deep" : accent === "mint" ? "text-emerald-700" : "text-violet-deep") : "text-ink-muted"}`}>{pkg.price} AED</p>
                                      {active && <span className="absolute right-2 top-2 grid h-5 w-5 place-items-center rounded-full bg-coral text-ink"><CheckCircle className="h-3.5 w-3.5" /></span>}
                                    </motion.button>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}

                    {category === "custom" && (
                      <div>
                        <label htmlFor="customDetails" className="mb-2 block text-sm font-bold text-ink-soft">Describe your requirements</label>
                        <textarea id="customDetails" rows={6} required minLength={10} value={customDetails} onChange={(e) => setCustomDetails(e.target.value)}
                          placeholder="e.g., I need a post-construction cleanup for a 2000 sqft office..."
                          className="w-full rounded-2xl border-2 border-[var(--line)] bg-white px-4 py-3.5 outline-none transition placeholder:text-ink-muted/60 focus:border-violet focus:ring-4 focus:ring-violet-soft" />
                        <p className="mt-2 text-xs text-ink-muted">Please provide at least 10 characters. ({customDetails.trim().length}/10)</p>
                      </div>
                    )}

                    <motion.button type="submit" disabled={!canProceed} whileTap={{ scale: 0.98 }}
                      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-coral to-coral-deep py-4 text-lg font-bold text-ink shadow-lg shadow-coral/30 transition hover:shadow-xl disabled:cursor-not-allowed disabled:from-[var(--line)] disabled:to-[var(--line)] disabled:text-ink-muted disabled:shadow-none">
                      Review booking <ArrowRight className="h-5 w-5" />
                    </motion.button>
                  </form>
                </motion.div>
              )}

              {/* STEP 3 — Review */}
              {step === 3 && (
                <motion.div key="b3" initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
                  <div className="mb-7 flex items-center gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-mint-deep text-ink"><CheckCircle className="h-6 w-6" /></span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">Step 3 · Review</p>
                      <h2 className="font-display text-2xl font-bold text-ink">Review your booking</h2>
                    </div>
                  </div>

                  <div className="space-y-3 rounded-2xl border-2 border-[var(--line)] bg-paper/60 p-5">
                    <div className="flex justify-between text-sm"><span className="text-ink-muted">Service</span><span className="font-bold text-ink">{selectedService.name}</span></div>
                    {category === "hourly" && (
                      <>
                        <div className="flex justify-between text-sm"><span className="text-ink-muted">Duration</span><span className="font-semibold text-ink">{hours} hours</span></div>
                        <div className="flex justify-between text-sm"><span className="text-ink-muted">Crew</span><span className="font-semibold text-ink">{crew} {crew > 1 ? "members" : "member"}</span></div>
                        <div className="flex justify-between text-sm"><span className="text-ink-muted">Materials</span><span className="font-semibold text-ink">{materials && selectedService.hasMaterials ? "Yes (+20 AED)" : "No"}</span></div>
                      </>
                    )}
                    {category === "package" && (
                      <>
                        <div className="flex justify-between text-sm"><span className="text-ink-muted">Type</span><span className="font-semibold text-ink">{propertyType}</span></div>
                        <div className="flex justify-between text-sm"><span className="text-ink-muted">Package</span><span className="font-semibold text-ink">{selectedPackage.name}</span></div>
                      </>
                    )}
                    {category === "custom" && (
                      <div className="flex justify-between gap-4 text-sm"><span className="shrink-0 text-ink-muted">Details</span><span className="text-right font-semibold text-ink">{customDetails.slice(0, 80)}{customDetails.length > 80 ? "…" : ""}</span></div>
                    )}
                    <div className="mt-2 flex items-baseline justify-between border-t border-[var(--line)] pt-3">
                      <span className="text-sm font-bold text-ink-muted">Estimated total</span>
                      <span className="font-display text-2xl font-black text-coral-deep">{estimate ? `${estimate} AED` : "Custom"}</span>
                    </div>
                  </div>

                  <div className="mt-5 flex items-start gap-3 rounded-2xl bg-violet-soft/60 px-4 py-3.5 text-sm text-violet-deep">
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
                    <span>You'll add your address, preferred date, and payment choice (cash) on the secure checkout page. No payment required now.</span>
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <button type="button" onClick={() => setStep(2)} className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-[var(--line)] bg-white px-6 py-3.5 font-bold text-ink-soft transition hover:border-coral/40">
                      <ArrowLeft className="h-5 w-5" /> Back
                    </button>
                    <motion.button type="button" onClick={() => navigate("/checkout")} whileTap={{ scale: 0.98 }}
                      className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet to-indigo-deep py-3.5 text-base font-bold text-white shadow-lg shadow-violet/30 transition hover:shadow-xl">
                      Proceed to checkout <ShoppingCart className="h-5 w-5" />
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* Summary sidebar */}
          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div className="relative overflow-hidden rounded-3xl bg-ink p-6 text-white shadow-2xl sm:p-8">
              <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-coral/40 blur-3xl" aria-hidden="true" />
              <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-violet/40 blur-3xl" aria-hidden="true" />
              <div className="relative">
                <h2 className="text-xl font-bold">Service summary</h2>
                {step === 1 ? (
                  <div className="mt-5">
                    <p className="text-sm leading-7 text-white/70">Choose a service to see the price and details here.</p>
                    <div className="mt-5 space-y-2">
                      {["Trained & verified team", "Transparent pricing", "Same-day enquiries"].map((t) => (
                        <div key={t} className="flex items-center gap-2 text-sm text-white/80">
                          <CheckCircle className="h-4 w-4 text-mint-deep" /> {t}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    <dl className="mt-6 space-y-3 border-b border-white/10 pb-6 text-sm">
                      <div className="flex justify-between gap-4"><dt className="text-white/60">Service</dt><dd className="text-right font-semibold">{selectedService.name}</dd></div>
                      {category === "hourly" && (
                        <>
                          <div className="flex justify-between"><dt className="text-white/60">Duration</dt><dd className="font-semibold">{hours} hours</dd></div>
                          <div className="flex justify-between"><dt className="text-white/60">Crew</dt><dd className="font-semibold">{crew}</dd></div>
                        </>
                      )}
                      {category === "package" && (
                        <>
                          <div className="flex justify-between gap-4"><dt className="text-white/60">Type</dt><dd className="text-right font-semibold">{propertyType || "—"}</dd></div>
                          <div className="flex justify-between"><dt className="text-white/60">Package</dt><dd className="font-semibold">{selectedPackage?.name || "—"}</dd></div>
                        </>
                      )}
                      {category === "custom" && <div className="flex justify-between"><dt className="text-white/60">Details</dt><dd className="font-semibold">Custom</dd></div>}
                    </dl>
                    <div className="mt-6">
                      <p className="text-sm text-white/60">Estimated total</p>
                      <div className="mt-1 flex items-baseline gap-2">
                        {estimate === null ? (
                          <span className="font-display text-3xl font-black text-coral">Custom</span>
                        ) : (
                          <>
                            <AnimatedNumber value={estimate} className="font-display text-4xl font-black text-coral" />
                            <span className="text-lg font-bold text-white/70">AED</span>
                          </>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-white bg-white/80 p-5 shadow-lg backdrop-blur-sm">
              <div className="flex gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-coral-deep" />
                <div>
                  <p className="font-bold text-ink">Secure next step</p>
                  <p className="mt-1 text-sm leading-6 text-ink-muted">You'll add your address, preferred date, and payment choice on checkout.</p>
                </div>
              </div>
              <div className="mt-4 flex gap-3 border-t border-[var(--line)] pt-4">
                <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-coral-deep" />
                <p className="text-sm leading-6 text-ink-muted">Most bookings take only a few minutes to complete.</p>
              </div>
              <div className="mt-4 flex gap-3 border-t border-[var(--line)] pt-4">
                <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-coral-deep" />
                <p className="text-sm leading-6 text-ink-muted">Flexible scheduling, subject to team availability.</p>
              </div>
              <div className="mt-4 flex gap-3 border-t border-[var(--line)] pt-4">
                <Wallet className="mt-0.5 h-5 w-5 shrink-0 text-coral-deep" />
                <p className="text-sm leading-6 text-ink-muted">Cash on completion — no online payment required.</p>
              </div>
              <div className="mt-4 flex items-center gap-2 border-t border-[var(--line)] pt-4">
                <div className="flex">
                  {[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-4 w-4 fill-coral text-coral" />)}
                </div>
                <span className="text-sm font-semibold text-ink">Trusted across Dubai</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
