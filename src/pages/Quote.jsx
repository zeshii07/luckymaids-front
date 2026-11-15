import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  Calculator,
  Home,
  Building,
  Baby,
  Sparkles,
  Truck,
  Sofa,
  Minus,
  Plus,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  ClipboardList,
  X,
  Phone,
  Mail,
  MapPin,
  User,
  ShieldCheck,
  Clock,
  Wallet,
  PartyPopper,
  Wand2,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
const hourlyServices = [
  {
    id: "residential",
    name: "Residential Cleaning",
    short: "Home & villa upkeep",
    icon: Home,
    accent: "violet",
    rates: { 2: 40, 3: 35, 4: 30 },
    hasMaterials: true,
  },
  {
    id: "commercial",
    name: "Commercial Cleaning",
    short: "Offices & retail",
    icon: Building,
    accent: "coral",
    rates: { 2: 40, 3: 35, 4: 30 },
    hasMaterials: true,
  },
  {
    id: "babysitting",
    name: "Babysitting & Maid",
    short: "Childcare support",
    icon: Baby,
    accent: "mint",
    rates: { 2: 50, 3: 45, 4: 40 },
    hasMaterials: false,
  },
];

const packageServices = [
  {
    id: "deep",
    name: "Deep Cleaning",
    short: "Top-to-bottom detail",
    icon: Sparkles,
    accent: "coral",
    types: ["Villa (Furnished)", "Villa (Unfurnished)", "Apartment"],
  },
  {
    id: "move",
    name: "Move In / Out",
    short: "Handover-ready",
    icon: Truck,
    accent: "mint",
    types: ["Villa (Furnished)", "Villa (Unfurnished)", "Apartment"],
  },
  {
    id: "furniture",
    name: "Furniture Cleaning",
    short: "Sofa · mattress · carpet",
    icon: Sofa,
    accent: "violet",
    types: ["Sofa", "Mattress", "Carpet"],
  },
];

const packagePricing = {
  "Deep Cleaning": {
    "Villa (Furnished)": [
      { id: "vf1", name: "1 BHK", price: 400 },
      { id: "vf2", name: "2 BHK", price: 500 },
      { id: "vf3", name: "3 BHK", price: 600 },
      { id: "vf4", name: "4 BHK", price: 700 },
      { id: "vf5", name: "5 BHK", price: 800 },
    ],
    "Villa (Unfurnished)": [
      { id: "vu1", name: "1 BHK", price: 350 },
      { id: "vu2", name: "2 BHK", price: 450 },
      { id: "vu3", name: "3 BHK", price: 550 },
      { id: "vu4", name: "4 BHK", price: 650 },
      { id: "vu5", name: "5 BHK", price: 750 },
    ],
    Apartment: [
      { id: "ap0", name: "Studio", price: 250 },
      { id: "ap1", name: "1 BHK", price: 300 },
      { id: "ap2", name: "2 BHK", price: 350 },
      { id: "ap3", name: "3 BHK", price: 400 },
    ],
  },
  "Move In/Out Cleaning": {
    "Villa (Furnished)": [
      { id: "mvf1", name: "1 BHK", price: 400 },
      { id: "mvf2", name: "2 BHK", price: 500 },
      { id: "mvf3", name: "3 BHK", price: 600 },
      { id: "mvf4", name: "4 BHK", price: 700 },
      { id: "mvf5", name: "5 BHK", price: 800 },
    ],
    "Villa (Unfurnished)": [
      { id: "mvu1", name: "1 BHK", price: 350 },
      { id: "mvu2", name: "2 BHK", price: 450 },
      { id: "mvu3", name: "3 BHK", price: 550 },
      { id: "mvu4", name: "4 BHK", price: 650 },
      { id: "mvu5", name: "5 BHK", price: 750 },
    ],
    Apartment: [
      { id: "map0", name: "Studio", price: 250 },
      { id: "map1", name: "1 BHK", price: 300 },
      { id: "map2", name: "2 BHK", price: 350 },
      { id: "map3", name: "3 BHK", price: 400 },
    ],
  },
  "Furniture Cleaning": {
    Sofa: [
      { id: "s1", name: "1 Seater", price: 80 },
      { id: "s2", name: "2 Seater", price: 120 },
      { id: "s3", name: "3 Seater", price: 160 },
      { id: "s4", name: "4 Seater", price: 200 },
      { id: "s5", name: "5 Seater (L-Shape)", price: 250 },
    ],
    Mattress: [
      { id: "m1", name: "Single / Twin", price: 100 },
      { id: "m2", name: "Double / Full", price: 120 },
      { id: "m3", name: "Queen", price: 140 },
      { id: "m4", name: "King", price: 160 },
    ],
    Carpet: [
      { id: "c1", name: "Small (2×2m)", price: 100 },
      { id: "c2", name: "Medium (3×4m)", price: 150 },
      { id: "c3", name: "Large (4×5m)", price: 200 },
      { id: "c4", name: "Extra Large (5m+)", price: 250 },
    ],
  },
};

const STEPS = ["Service", "Details", "Contact"];

// ---------------------------------------------------------------------------
// Helper: animated number ticker
// ---------------------------------------------------------------------------
function AnimatedNumber({ value, className }) {
  const [display, setDisplay] = useState(value);
  const reduceMotion = useReducedMotion();
  const prev = useRef(value);
  useEffect(() => {
    if (reduceMotion) {
      setDisplay(value);
      prev.current = value;
      return;
    }
    const start = prev.current || 0;
    const end = value || 0;
    if (start === end) {
      setDisplay(end);
      return;
    }
    const duration = 450;
    const startTime = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(start + (end - start) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
      else prev.current = end;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, reduceMotion]);
  return <span className={className}>{display.toLocaleString()}</span>;
}

// ---------------------------------------------------------------------------
// Stepper
// ---------------------------------------------------------------------------
function Stepper({ step }) {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3" aria-label="Quote progress">
      {STEPS.map((label, i) => {
        const idx = i + 1;
        const active = step === idx;
        const done = step > idx;
        return (
          <div key={label} className="flex items-center gap-2 sm:gap-3">
            <div className="flex flex-col items-center gap-1.5">
              <motion.div
                initial={false}
                animate={{
                  scale: active ? 1.1 : 1,
                  backgroundColor: done || active ? "rgb(63 53 199)" : "rgb(255 255 255)",
                  color: done || active ? "rgb(255 255 255)" : "rgb(101 113 125)",
                }}
                className="grid h-10 w-10 place-items-center rounded-full text-sm font-bold ring-2 sm:h-11 sm:w-11"
                style={{
                  boxShadow: active ? "0 8px 22px -8px rgba(63,53,199,0.6)" : "none",
                  borderColor: done || active ? "transparent" : "rgb(221 226 228)",
                }}
              >
                {done ? <CheckCircle className="h-5 w-5" /> : idx}
              </motion.div>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider sm:text-xs ${
                  active ? "text-indigo-deep" : "text-ink-muted"
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="relative h-1 w-8 overflow-hidden rounded-full bg-[var(--line)] sm:w-16">
                <motion.div
                  initial={false}
                  animate={{ width: done ? "100%" : "0%" }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-violet to-indigo-deep"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Pill toggle button
// ---------------------------------------------------------------------------
function Pill({ active, onClick, children, accent = "violet" }) {
  const accentRing =
    accent === "coral"
      ? "ring-coral"
      : accent === "mint"
      ? "ring-mint-deep"
      : "ring-violet";
  const accentBg =
    accent === "coral"
      ? "bg-coral/15 text-coral-deep"
      : accent === "mint"
      ? "bg-mint-soft text-emerald-700"
      : "bg-violet-soft text-violet-deep";
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      className={`relative overflow-hidden rounded-full px-4 py-2.5 text-sm font-bold ring-2 transition-all ${
        active
          ? `${accentBg} ${accentRing}`
          : "bg-white text-ink-muted ring-[var(--line)] hover:ring-indigo/40"
      }`}
    >
      {children}
    </motion.button>
  );
}

// ---------------------------------------------------------------------------
// Stepper +/- counter
// ---------------------------------------------------------------------------
function Counter({ label, value, min, max, onDec, onInc, display }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-ink-soft">{label}</label>
      <div className="flex items-center justify-between rounded-2xl border-2 border-[var(--line)] bg-white p-2.5">
        <motion.button
          type="button"
          onClick={onDec}
          disabled={value <= min}
          whileTap={{ scale: 0.9 }}
          className="grid h-10 w-10 place-items-center rounded-xl bg-violet-soft text-violet-deep shadow-sm transition hover:bg-violet-soft/70 disabled:opacity-40"
          aria-label={`Decrease ${label}`}
        >
          <Minus className="h-4 w-4" />
        </motion.button>
        <span className="text-lg font-black text-ink">{display}</span>
        <motion.button
          type="button"
          onClick={onInc}
          disabled={value >= max}
          whileTap={{ scale: 0.9 }}
          className="grid h-10 w-10 place-items-center rounded-xl bg-coral/15 text-coral-deep shadow-sm transition hover:bg-coral/25 disabled:opacity-40"
          aria-label={`Increase ${label}`}
        >
          <Plus className="h-4 w-4" />
        </motion.button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Animated field input
// ---------------------------------------------------------------------------
function Field({ icon: Icon, ...props }) {
  return (
    <div className="group relative">
      <Icon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-muted transition group-focus-within:text-violet" />
      <input
        {...props}
        className="w-full rounded-2xl border-2 border-[var(--line)] bg-white py-3.5 pl-12 pr-4 text-ink outline-none transition placeholder:text-ink-muted/60 focus:border-violet focus:ring-4 focus:ring-violet-soft"
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export default function Quote() {
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(1); // 1 service, 2 details, 3 contact, 4 success
  const [category, setCategory] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [error, setError] = useState(null);

  // hourly
  const [hours, setHours] = useState(2);
  const [crew, setCrew] = useState(1);
  const [materials, setMaterials] = useState(false);

  // package
  const [propertyType, setPropertyType] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);

  // custom
  const [customDetails, setCustomDetails] = useState("");

  // contact
  const [contact, setContact] = useState({ name: "", phone: "", email: "", address: "" });

  const estimate = useMemo(() => {
    if (category === "hourly" && selectedService) {
      const rate = selectedService.rates[hours] || selectedService.rates[4];
      return hours * crew * rate + (materials && selectedService.hasMaterials ? 20 : 0);
    }
    if (category === "package" && selectedPackage) return selectedPackage.price;
    if (category === "custom") return null;
    return 0;
  }, [category, selectedService, hours, crew, materials, selectedPackage]);

  useEffect(() => {
    // reset optionals when service changes
    setHours(2);
    setCrew(1);
    setMaterials(false);
    setPropertyType(null);
    setSelectedPackage(null);
    setCustomDetails("");
  }, [selectedService]);

  const selectService = (service, type) => {
    setCategory(type);
    setSelectedService(service);
    setError(null);
    setStep(2);
  };

  const canGoStep3 = useMemo(() => {
    if (category === "hourly") return true;
    if (category === "package") return !!selectedPackage;
    if (category === "custom") return customDetails.trim().length >= 10;
    return false;
  }, [category, selectedPackage, customDetails]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const details =
      category === "hourly"
        ? { hours, crew, materials }
        : category === "package"
        ? { propertyType, selectedPackage }
        : { customDetails };
    try {
      const response = await fetch("https://lucky-backend-woad.vercel.app/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: selectedService.name,
          details,
          estimate,
          contact,
        }),
      });
      if (response.ok) setStep(4);
      else setError("Failed to submit quote. Please check your details and try again.");
    } catch {
      setError("Error connecting to server. Is the backend running?");
    }
  };

  const reset = () => {
    setStep(1);
    setCategory(null);
    setSelectedService(null);
    setContact({ name: "", phone: "", email: "", address: "" });
    setError(null);
  };

  const accent = selectedService?.accent || "violet";

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-violet-soft via-paper to-mint-soft pt-24 pb-20">
      <Helmet>
        <title>Get a Free Cleaning Quote in Dubai | Byt Cleaning Services</title>
        <meta
          name="description"
          content="Get an instant, free quote for residential, deep, commercial, or custom cleaning in Dubai. Transparent pricing, no hidden fees."
        />
      </Helmet>

      {/* Ambient animated blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.div
          className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-violet/20 blur-3xl"
          animate={reduceMotion ? undefined : { x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-24 top-40 h-80 w-80 rounded-full bg-coral/20 blur-3xl"
          animate={reduceMotion ? undefined : { x: [0, -30, 0], y: [0, 40, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-mint/30 blur-3xl"
          animate={reduceMotion ? undefined : { x: [0, 25, 0], y: [0, -25, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mb-8 max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-violet/30 bg-white px-4 py-2 text-sm font-bold text-violet-deep shadow-sm">
            <Calculator className="h-4 w-4" /> Instant, transparent pricing
          </span>
          <h1 className="mt-5 font-display text-4xl font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Get a <span className="text-violet-deep">free</span> quote
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
            Pick your service, fine-tune the details, and see your live estimate — no
            phone tag, no hidden fees, no commitment.
          </p>
        </motion.div>

        {/* Stepper (hidden on success) */}
        {step < 4 && (
          <div className="mb-10">
            <Stepper step={step} />
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* ============================================================
              STEP 1 — Service selection
          ============================================================ */}
          {step === 1 && (
            <motion.div
              key="s1"
              initial={reduceMotion ? false : { opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? false : { opacity: 0, x: -30 }}
              className="mx-auto max-w-5xl"
            >
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[...hourlyServices, ...packageServices].map((s, i) => {
                  const Icon = s.icon;
                  const a = s.accent;
                  return (
                    <motion.button
                      key={s.id}
                      type="button"
                      onClick={() => selectService(s, hourlyServices.includes(s) ? "hourly" : "package")}
                      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ y: -6 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative overflow-hidden rounded-3xl border-2 border-white bg-white/80 p-6 text-left shadow-lg shadow-ink/5 backdrop-blur-sm transition hover:shadow-xl"
                    >
                      {/* hover gradient wash */}
                      <div
                        className={`absolute inset-0 -z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
                          a === "coral"
                            ? "bg-gradient-to-br from-coral/10 to-coral-soft/40"
                            : a === "mint"
                            ? "bg-gradient-to-br from-mint-soft to-mint/30"
                            : "bg-gradient-to-br from-violet-soft to-violet/15"
                        }`}
                      />
                      <div className="relative z-10">
                        <span
                          className={`grid h-14 w-14 place-items-center rounded-2xl shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${
                            a === "coral"
                              ? "bg-coral text-ink"
                              : a === "mint"
                              ? "bg-mint-deep text-ink"
                              : "bg-violet text-white"
                          }`}
                        >
                          <Icon className="h-7 w-7" />
                        </span>
                        <h3 className="mt-5 font-display text-xl font-bold text-ink">{s.name}</h3>
                        <p className="mt-1 text-sm text-ink-muted">{s.short}</p>
                        <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-violet-deep">
                          Configure <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </motion.button>
                  );
                })}

                {/* Custom request — full width */}
                <motion.button
                  type="button"
                  onClick={() => selectService({ id: "custom", name: "Custom Request", accent: "violet" }, "custom")}
                  initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative col-span-1 overflow-hidden rounded-3xl border-2 border-dashed border-violet/40 bg-violet-soft/40 p-6 text-left transition hover:bg-violet-soft/70 sm:col-span-2 lg:col-span-3"
                >
                  <div className="flex items-center gap-5">
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-violet text-white shadow-md transition-transform group-hover:rotate-6">
                      <ClipboardList className="h-7 w-7" />
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-bold text-ink">Custom / Other request</h3>
                      <p className="mt-1 text-sm text-ink-muted">
                        Post-construction cleanup, full-time live-in maid, event cleaning — tell us
                        exactly what you need and we'll tailor a quote.
                      </p>
                    </div>
                    <Wand2 className="ml-auto hidden h-8 w-8 text-violet/50 transition group-hover:text-violet sm:block" />
                  </div>
                </motion.button>
              </div>

              {/* Trust strip */}
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { icon: Wallet, label: "No payment to quote" },
                  { icon: Clock, label: "2-min response" },
                  { icon: ShieldCheck, label: "Trained & verified" },
                  { icon: CheckCircle, label: "Agreed scope" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2.5 rounded-2xl border border-white bg-white/70 px-3 py-3 text-sm font-semibold text-ink backdrop-blur-sm">
                    <Icon className="h-5 w-5 shrink-0 text-violet" />
                    {label}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ============================================================
              STEP 2 — Details + live estimate
          ============================================================ */}
          {step === 2 && (
            <motion.div
              key="s2"
              initial={reduceMotion ? false : { opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? false : { opacity: 0, x: -30 }}
              className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.6fr_1fr]"
            >
              {/* Details panel */}
              <div className="rounded-3xl border border-white bg-white/90 p-6 shadow-xl backdrop-blur-sm sm:p-8">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-ink-muted transition hover:text-violet-deep"
                >
                  <ArrowLeft className="h-4 w-4" /> Back to services
                </button>

                <div className="mb-7 flex items-center gap-3">
                  {(() => {
                    const Icon = selectedService.icon;
                    return (
                      <span
                        className={`grid h-12 w-12 place-items-center rounded-2xl ${
                          accent === "coral"
                            ? "bg-coral text-ink"
                            : accent === "mint"
                            ? "bg-mint-deep text-ink"
                            : "bg-violet text-white"
                        }`}
                      >
                        <Icon className="h-6 w-6" />
                      </span>
                    );
                  })()}
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-violet-deep">Step 2 · Details</p>
                    <h2 className="font-display text-2xl font-bold text-ink">{selectedService.name}</h2>
                  </div>
                </div>

                {/* Hourly config */}
                {category === "hourly" && (
                  <div className="space-y-6">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Counter
                        label="Hours (min 2, max 8)"
                        value={hours}
                        min={2}
                        max={8}
                        onDec={() => setHours((h) => Math.max(2, h - 1))}
                        onInc={() => setHours((h) => Math.min(8, h + 1))}
                        display={`${hours} Hours`}
                      />
                      <Counter
                        label="Crew members (max 10)"
                        value={crew}
                        min={1}
                        max={10}
                        onDec={() => setCrew((c) => Math.max(1, c - 1))}
                        onInc={() => setCrew((c) => Math.min(10, c + 1))}
                        display={`${crew} Member${crew > 1 ? "s" : ""}`}
                      />
                    </div>

                    {selectedService.hasMaterials && (
                      <div>
                        <p className="mb-2.5 text-sm font-bold text-ink-soft">
                          Bring cleaning materials? <span className="font-normal text-ink-muted">+20 AED</span>
                        </p>
                        <div className="flex flex-wrap gap-2.5">
                          <Pill active={materials} accent="coral" onClick={() => setMaterials(true)}>
                            Yes, bring materials
                          </Pill>
                          <Pill active={!materials} onClick={() => setMaterials(false)}>
                            No, I have them
                          </Pill>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Package config */}
                {category === "package" && (
                  <div className="space-y-6">
                    <div>
                      <p className="mb-2.5 text-sm font-bold text-ink-soft">Select type</p>
                      <div className="flex flex-wrap gap-2.5">
                        {selectedService.types.map((type) => (
                          <Pill
                            key={type}
                            active={propertyType === type}
                            accent={accent}
                            onClick={() => {
                              setPropertyType(type);
                              setSelectedPackage(null);
                            }}
                          >
                            {type}
                          </Pill>
                        ))}
                      </div>
                    </div>

                    <AnimatePresence>
                      {propertyType && (
                        <motion.div
                          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                        >
                          <p className="mb-2.5 text-sm font-bold text-ink-soft">Select package</p>
                          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                            {packagePricing[selectedService.name][propertyType].map((pkg) => {
                              const active = selectedPackage?.id === pkg.id;
                              return (
                                <motion.button
                                  key={pkg.id}
                                  type="button"
                                  onClick={() => setSelectedPackage(pkg)}
                                  whileTap={{ scale: 0.96 }}
                                  className={`relative overflow-hidden rounded-2xl border-2 p-4 text-left transition ${
                                    active
                                      ? accent === "coral"
                                        ? "border-coral bg-coral/10"
                                        : accent === "mint"
                                        ? "border-mint-deep bg-mint-soft"
                                        : "border-violet bg-violet-soft"
                                      : "border-[var(--line)] bg-white hover:border-violet/40"
                                  }`}
                                >
                                  <p className="font-bold text-ink">{pkg.name}</p>
                                  <p
                                    className={`mt-1 font-black ${
                                      active
                                        ? accent === "coral"
                                          ? "text-coral-deep"
                                          : accent === "mint"
                                          ? "text-emerald-700"
                                          : "text-violet-deep"
                                        : "text-ink-muted"
                                    }`}
                                  >
                                    {pkg.price} AED
                                  </p>
                                  {active && (
                                    <span className="absolute right-2 top-2 grid h-5 w-5 place-items-center rounded-full bg-violet text-white">
                                      <CheckCircle className="h-3.5 w-3.5" />
                                    </span>
                                  )}
                                </motion.button>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* Custom config */}
                {category === "custom" && (
                  <div>
                    <p className="mb-2.5 text-sm font-bold text-ink-soft">Describe your requirements</p>
                    <textarea
                      rows={6}
                      required
                      minLength={10}
                      value={customDetails}
                      onChange={(e) => setCustomDetails(e.target.value)}
                      placeholder="e.g., I need a post-construction cleanup for a 2000 sqft office, or a full-time live-in maid for a month..."
                      className="w-full rounded-2xl border-2 border-[var(--line)] bg-white px-4 py-3.5 text-ink outline-none transition placeholder:text-ink-muted/60 focus:border-violet focus:ring-4 focus:ring-violet-soft"
                    />
                    <p className="mt-2 text-xs text-ink-muted">
                      The more detail you provide, the more accurate our custom quote will be. ({customDetails.trim().length}/10 min)
                    </p>
                  </div>
                )}

                <motion.button
                  type="button"
                  onClick={() => {
                    if (canGoStep3) {
                      setError(null);
                      setStep(3);
                    } else {
                      setError("Please complete the selection above before continuing.");
                    }
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet to-indigo-deep py-4 text-base font-bold text-white shadow-lg shadow-violet/30 transition hover:shadow-xl disabled:opacity-50"
                >
                  Continue to contact <ArrowRight className="h-5 w-5" />
                </motion.button>

                {error && (
                  <div className="mt-4 flex items-center justify-between rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
                    <span>{error}</span>
                    <button type="button" onClick={() => setError(null)}>
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Live estimate sidebar */}
              <div className="lg:sticky lg:top-24 lg:self-start">
                <div className="relative overflow-hidden rounded-3xl bg-ink p-6 text-white shadow-2xl sm:p-8">
                  {/* glow */}
                  <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-violet/40 blur-3xl" aria-hidden="true" />
                  <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-coral/30 blur-3xl" aria-hidden="true" />
                  <div className="relative">
                    <div className="flex items-center gap-2">
                      <Calculator className="h-5 w-5 text-violet" />
                      <h3 className="text-lg font-bold">Live estimate</h3>
                    </div>
                    <p className="mt-1 text-xs text-white/60">{selectedService.name}</p>

                    <dl className="mt-6 space-y-3 border-b border-white/10 pb-6 text-sm">
                      {category === "hourly" && (
                        <>
                          <Row k="Duration" v={`${hours} hours`} />
                          <Row k="Crew" v={`${crew} ${crew > 1 ? "members" : "member"}`} />
                          <Row k="Materials" v={materials && selectedService.hasMaterials ? "Yes (+20 AED)" : "No"} />
                        </>
                      )}
                      {category === "package" && (
                        <>
                          <Row k="Type" v={propertyType || "—"} />
                          <Row k="Package" v={selectedPackage?.name || "—"} />
                        </>
                      )}
                      {category === "custom" && <Row k="Details" v="Custom request" />}
                    </dl>

                    <div className="mt-6">
                      <p className="text-xs text-white/60">Estimated total</p>
                      <div className="mt-1 flex items-baseline gap-2">
                        {estimate === null ? (
                          <span className="font-display text-3xl font-black text-coral">Custom</span>
                        ) : (
                          <>
                            <AnimatedNumber value={estimate} className="font-display text-4xl font-black text-violet" />
                            <span className="text-lg font-bold text-white/70">AED</span>
                          </>
                        )}
                      </div>
                      <p className="mt-2 text-xs text-white/50">
                        {estimate === null
                          ? "Our team will assess and tailor a price."
                          : "Final price may vary slightly with exact condition."}
                      </p>
                    </div>

                    <div className="mt-6 flex items-start gap-2 rounded-2xl bg-white/5 p-3.5 text-xs text-white/80">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-mint-deep" />
                      No payment required to request a quote. Our team will contact you to confirm.
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ============================================================
              STEP 3 — Contact
          ============================================================ */}
          {step === 3 && (
            <motion.div
              key="s3"
              initial={reduceMotion ? false : { opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? false : { opacity: 0, x: -30 }}
              className="mx-auto max-w-2xl"
            >
              <div className="overflow-hidden rounded-3xl border border-white bg-white/90 shadow-xl backdrop-blur-sm">
                <div className="bg-gradient-to-r from-violet to-indigo-deep px-6 py-7 text-white sm:px-8">
                  <p className="text-xs font-bold uppercase tracking-wider text-white/70">Step 3 · Contact</p>
                  <h2 className="mt-1 font-display text-2xl font-bold">Almost there!</h2>
                  <p className="mt-1 text-sm text-white/80">
                    Share your details and we'll confirm your quote within minutes.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 p-6 sm:p-8">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      icon={User}
                      type="text"
                      required
                      placeholder="Full name"
                      value={contact.name}
                      onChange={(e) => setContact({ ...contact, name: e.target.value })}
                    />
                    <Field
                      icon={Phone}
                      type="tel"
                      required
                      placeholder="+971 55 373 0702"
                      value={contact.phone}
                      onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      icon={Mail}
                      type="email"
                      required
                      placeholder="Email address"
                      value={contact.email}
                      onChange={(e) => setContact({ ...contact, email: e.target.value })}
                    />
                    <Field
                      icon={MapPin}
                      type="text"
                      required
                      placeholder="Area in Dubai (e.g., Marina)"
                      value={contact.address}
                      onChange={(e) => setContact({ ...contact, address: e.target.value })}
                    />
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl bg-violet-soft/60 px-4 py-3 text-sm text-violet-deep">
                    <Wallet className="h-5 w-5 shrink-0" />
                    <span>
                      Estimated total: <strong>{estimate === null ? "Custom quote" : `${estimate} AED`}</strong> · no payment now
                    </span>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-[var(--line)] bg-white px-6 py-3.5 font-bold text-ink-soft transition hover:border-violet/40"
                    >
                      <ArrowLeft className="h-5 w-5" /> Back
                    </button>
                    <motion.button
                      type="submit"
                      whileTap={{ scale: 0.98 }}
                      className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-coral to-coral-deep py-3.5 text-base font-bold text-ink shadow-lg shadow-coral/30 transition hover:shadow-xl"
                    >
                      Submit quote request <ArrowRight className="h-5 w-5" />
                    </motion.button>
                  </div>

                  {error && (
                    <div className="flex items-center justify-between rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
                      <span>{error}</span>
                      <button type="button" onClick={() => setError(null)}>
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </motion.div>
          )}

          {/* ============================================================
              STEP 4 — Success
          ============================================================ */}
          {step === 4 && (
            <motion.div
              key="s4"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mx-auto max-w-xl"
            >
              <div className="relative overflow-hidden rounded-3xl border border-white bg-white/90 p-8 text-center shadow-2xl backdrop-blur-sm sm:p-12">
                {/* Confetti dots */}
                {!reduceMotion &&
                  Array.from({ length: 18 }).map((_, i) => (
                    <motion.span
                      key={i}
                      className="absolute h-2.5 w-2.5 rounded-full"
                      style={{
                        left: "50%",
                        top: "30%",
                        background: ["#5D50E8", "#F46E57", "#BDE8D4", "#FDE4DD"][i % 4],
                      }}
                      initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                      animate={{
                        opacity: [1, 1, 0],
                        x: (Math.random() - 0.5) * 360,
                        y: (Math.random() - 0.2) * 260,
                        scale: [1, 1, 0.4],
                        rotate: Math.random() * 360,
                      }}
                      transition={{ duration: 1.4, delay: 0.1 + i * 0.03, ease: "easeOut" }}
                    />
                  ))}

                <motion.div
                  initial={reduceMotion ? false : { scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 14 }}
                  className="relative mx-auto grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-mint-deep to-emerald-600 text-white shadow-xl"
                >
                  <PartyPopper className="h-12 w-12" />
                </motion.div>

                <h2 className="mt-7 font-display text-3xl font-black text-ink sm:text-4xl">Quote request sent!</h2>
                <p className="mx-auto mt-3 max-w-md text-ink-muted">
                  Thank you, {contact.name || "friend"}! Our team has received your request.
                  {estimate ? ` Your estimated total is ${estimate} AED.` : " We'll assess your custom request."}{" "}
                  We'll contact you shortly to confirm the details.
                </p>

                <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={reset}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet to-indigo-deep px-7 py-3.5 font-bold text-white shadow-lg shadow-violet/30 transition hover:shadow-xl"
                  >
                    Start a new quote <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

function Row({ k, v }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-white/60">{k}</dt>
      <dd className="text-right font-semibold text-white">{v}</dd>
    </div>
  );
}
