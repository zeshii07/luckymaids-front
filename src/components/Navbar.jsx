import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Baby,
  Building2,
  ChevronDown,
  Gem,
  Home,
  Menu,
  Sofa,
  Sparkles,
  SprayCan,
  Truck,
  UserRoundCheck,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const services = [
  { name: "Residential Cleaning", description: "Reliable home cleaning for apartments and villas.", path: "/residential-cleaning-services-dubai", icon: Home },
  { name: "Deep Cleaning", description: "Detailed top-to-bottom cleaning for every room.", path: "/deep-cleaning-services-dubai", icon: Sparkles, featured: true },
  { name: "Move-in/Out Cleaning", description: "Prepare your property before or after moving.", path: "/move-in-move-out-cleaning-dubai", icon: Truck },
  { name: "Commercial Cleaning", description: "Professional cleaning for offices and businesses.", path: "/commercial-cleaning-services-dubai", icon: Building2 },
  { name: "Furniture Cleaning", description: "Specialized care for sofas, carpets, and mattresses.", path: "/furniture-cleaning-dubai", icon: Sofa },
  { name: "Maid Services", description: "Flexible maid support for everyday household needs.", path: "/maid-services-dubai", icon: SprayCan },
  { name: "Babysitting Services", description: "Dependable assistance for families and children.", path: "/babysitting-services-dubai", icon: Baby },
];

const primaryLinks = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Pricing",
    path: "/pricing",
  },
  {
    name: "Areas We Serve",
    path: "/areas-we-serve",
  },
  {
    name: "Blog",
    path: "/blog",
  },
  {
    name: "About",
    path: "/about-us",
  },
  {
    name: "Contact",
    path: "/contact-us",
  },
];

function isPathActive(currentPath, targetPath) {
  if (targetPath === "/") return currentPath === "/";
  return currentPath === targetPath || currentPath.startsWith(`${targetPath}/`);
}

export default function Navbar() {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const dropdownRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const servicesActive = services.some(({ path }) => location.pathname === path);

  useEffect(() => {
    let frameId = null;
    const updateScrollState = () => {
      frameId = null;
      setScrolled(window.scrollY > 24);
    };
    const handleScroll = () => {
      if (frameId === null) frameId = window.requestAnimationFrame(updateScrollState);
    };

    updateScrollState();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setServicesDropdown(false);
    setMobileServicesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setServicesDropdown(false);
        setMobileServicesOpen(false);
        setIsOpen(false);
      }
    };

    const handlePointerDown = (event) => {
      if (servicesDropdown && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setServicesDropdown(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [servicesDropdown]);

  const closeMobileMenu = () => {
    setIsOpen(false);
    setMobileServicesOpen(false);
  };

  const navLinkClass = (active) => [
    "relative whitespace-nowrap rounded-lg px-2.5 py-2 text-[13px] font-semibold tracking-wide transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crystal-500 focus-visible:ring-offset-2",
    active ? "text-crystal-600" : "text-gray-600 hover:text-crystal-600",
  ].join(" ");

  return (
    <>
      <nav
        className={[
          "fixed inset-x-0 top-0 z-50 border-b bg-white/95 backdrop-blur-xl",
          "transition-[padding,box-shadow,border-color] duration-200",
          scrolled
            ? "border-gray-200/80 py-2.5 shadow-[0_14px_40px_-24px_rgba(15,23,42,0.35)]"
            : "border-gray-200/60 py-3.5 shadow-sm",
        ].join(" ")}
        aria-label="Primary navigation"
      >
        <div className="container mx-auto flex items-center justify-between px-4 sm:px-6">
          <Link to="/" className="group flex min-w-0 items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crystal-500 focus-visible:ring-offset-2" aria-label="Lucky Crystal Maids home">
            <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-crystal-400 to-crystal-600 text-white shadow-lg shadow-crystal-500/20 transition-transform duration-300 group-hover:-translate-y-0.5">
              <Gem className="h-6 w-6" aria-hidden="true" />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block whitespace-nowrap font-display text-lg font-bold text-gray-900 sm:text-xl">Lucky Crystal</span>
              <span className="block text-xs font-bold uppercase tracking-[0.22em] text-crystal-600">Maids</span>
            </span>
          </Link>

          <div className="hidden items-center gap-0.5 xl:flex">
            <Link to="/" className={navLinkClass(location.pathname === "/")} aria-current={location.pathname === "/" ? "page" : undefined}>
              Home
              {location.pathname === "/" && <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-crystal-500" />}
            </Link>

            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setServicesDropdown(true)}
              onMouseLeave={() => setServicesDropdown(false)}
              onFocus={() => setServicesDropdown(true)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setServicesDropdown(false);
              }}
            >
              <button type="button" onClick={() => setServicesDropdown((open) => !open)} className={navLinkClass(servicesActive)} aria-expanded={servicesDropdown} aria-controls="desktop-services-menu">
                <span className="flex items-center gap-1.5">
                  Services
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${servicesDropdown ? "rotate-180" : ""}`} aria-hidden="true" />
                </span>
                {servicesActive && <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-crystal-500" />}
              </button>

              <AnimatePresence>
                {servicesDropdown && (
                  <motion.div
                    id="desktop-services-menu"
                    initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.18 }}
                    className="absolute left-1/2 top-full w-[720px] -translate-x-1/2 pt-4"
                  >
                    <div className="overflow-hidden rounded-[1.75rem] border border-gray-200/80 bg-white p-3 shadow-[0_24px_70px_-30px_rgba(15,23,42,0.45)]">
                      <div className="grid grid-cols-[1.1fr_1.9fr] gap-3">
                        <Link to="/cleaning-services-dubai" className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-crystal-900 p-6 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crystal-400">
                          <span className="relative z-10">
                            <span className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur"><Sparkles className="h-6 w-6 text-crystal-300" /></span>
                            <span className="block text-sm font-semibold text-crystal-200">Complete care</span>
                            <span className="mt-1 block text-2xl font-bold">Explore all services</span>
                            <span className="mt-3 block text-sm leading-6 text-gray-300">Compare our cleaning, maid, furniture, moving, and family-support options.</span>
                            <span className="mt-7 inline-flex items-center gap-2 text-sm font-bold">View services <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                          </span>
                          <Gem className="absolute -bottom-10 -right-10 h-40 w-40 rotate-12 text-white/[0.05]" />
                        </Link>

                        <div className="grid grid-cols-2 gap-1.5">
                          {services.map((service) => {
                            const Icon = service.icon;
                            const active = isPathActive(location.pathname, service.path);
                            return (
                              <Link key={service.path} to={service.path} className={`group relative flex gap-3 rounded-2xl p-3.5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crystal-500 ${active ? "bg-crystal-50" : "hover:bg-gray-50"}`} aria-current={active ? "page" : undefined}>
                                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition ${active ? "bg-crystal-500 text-white" : "bg-gray-100 text-gray-500 group-hover:bg-crystal-100 group-hover:text-crystal-600"}`}>
                                  <Icon className="h-5 w-5" aria-hidden="true" />
                                </span>
                                <span className="min-w-0">
                                  <span className="flex items-center gap-2 text-sm font-bold text-gray-900">
                                    {service.name}
                                    {service.featured && <span className="rounded-full bg-crystal-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-crystal-700">Popular</span>}
                                  </span>
                                  <span className="mt-1 block text-xs leading-5 text-gray-500">{service.description}</span>
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {primaryLinks.slice(1).map((item) => {
              const active = isPathActive(location.pathname, item.path);
              return (
                <Link key={item.path} to={item.path} className={navLinkClass(active)} aria-current={active ? "page" : undefined}>
                  {item.name}
                  {active && <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-crystal-500" />}
                </Link>
              );
            })}
          </div>

          <div className="hidden items-center gap-2 xl:flex">
            <Link to="/request-a-quote" className="rounded-full border border-crystal-200 bg-white/70 px-5 py-2.5 text-sm font-bold text-crystal-700 transition hover:border-crystal-300 hover:bg-crystal-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crystal-500 focus-visible:ring-offset-2">Get Quote</Link>
            <Link to="/book-cleaning-service" className="group inline-flex items-center gap-2 rounded-full bg-crystal-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-crystal-500/20 transition hover:-translate-y-0.5 hover:bg-crystal-600 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crystal-500 focus-visible:ring-offset-2">Book Now <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></Link>
          </div>

          <button type="button" onClick={() => setIsOpen((open) => !open)} className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:border-crystal-200 hover:text-crystal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crystal-500 focus-visible:ring-offset-2 xl:hidden" aria-expanded={isOpen} aria-controls="mobile-navigation" aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}>
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button type="button" aria-label="Close navigation menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeMobileMenu} className="fixed inset-0 z-40 bg-gray-950/45 backdrop-blur-sm xl:hidden" />
            <motion.div
              id="mobile-navigation"
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: "100%" }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.28, ease: "easeOut" }}
              className="fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-sm flex-col bg-white shadow-2xl xl:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                <Link to="/" onClick={closeMobileMenu} className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-crystal-500 text-white"><Gem className="h-5 w-5" /></span>
                  <span><span className="block font-display font-bold text-gray-900">Lucky Crystal</span><span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-crystal-600">Maids</span></span>
                </Link>
                <button type="button" onClick={closeMobileMenu} className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crystal-500" aria-label="Close navigation menu"><X className="h-5 w-5" /></button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-5">
                <nav className="space-y-2" aria-label="Mobile navigation links">
                  <Link to="/" onClick={closeMobileMenu} className={`flex items-center justify-between rounded-2xl px-4 py-3.5 font-semibold transition ${location.pathname === "/" ? "bg-crystal-50 text-crystal-700" : "text-gray-700 hover:bg-gray-50"}`}>
                    Home {location.pathname === "/" && <CheckMark />}
                  </Link>

                  <div className="overflow-hidden rounded-2xl border border-gray-100">
                    <button type="button" onClick={() => setMobileServicesOpen((open) => !open)} className={`flex w-full items-center justify-between px-4 py-3.5 text-left font-semibold transition ${servicesActive ? "bg-crystal-50 text-crystal-700" : "text-gray-700 hover:bg-gray-50"}`} aria-expanded={mobileServicesOpen} aria-controls="mobile-services-list">
                      Services <ChevronDown className={`h-4 w-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
                    </button>

                    <AnimatePresence initial={false}>
                      {mobileServicesOpen && (
                        <motion.div id="mobile-services-list" initial={prefersReducedMotion ? { opacity: 1 } : { height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }} transition={{ duration: prefersReducedMotion ? 0 : 0.2 }} className="overflow-hidden border-t border-gray-100 bg-gray-50/70">
                          <div className="space-y-1 p-2">
                            <Link to="/cleaning-services-dubai" onClick={closeMobileMenu} className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-bold text-crystal-700 hover:bg-white">All Services <ArrowRight className="h-4 w-4" /></Link>
                            {services.map((service) => {
                              const Icon = service.icon;
                              const active = isPathActive(location.pathname, service.path);
                              return (
                                <Link key={service.path} to={service.path} onClick={closeMobileMenu} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${active ? "bg-white text-crystal-700 shadow-sm" : "text-gray-600 hover:bg-white hover:text-crystal-700"}`} aria-current={active ? "page" : undefined}>
                                  <Icon className="h-4 w-4 shrink-0" />
                                  <span className="flex-1">{service.name}</span>
                                  {service.featured && <span className="rounded-full bg-crystal-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-crystal-700">Popular</span>}
                                </Link>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {primaryLinks.slice(1).map((item) => {
                    const active = isPathActive(location.pathname, item.path);
                    return (
                      <Link key={item.path} to={item.path} onClick={closeMobileMenu} className={`flex items-center justify-between rounded-2xl px-4 py-3.5 font-semibold transition ${active ? "bg-crystal-50 text-crystal-700" : "text-gray-700 hover:bg-gray-50"}`} aria-current={active ? "page" : undefined}>
                        {item.name} {active && <CheckMark />}
                      </Link>
                    );
                  })}
                </nav>

                <div className="mt-7 rounded-3xl bg-gray-900 p-5 text-white">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10"><UserRoundCheck className="h-5 w-5 text-crystal-300" /></span>
                    <div><p className="font-bold">Need help choosing?</p><p className="mt-0.5 text-xs text-gray-400">Request a personalized cleaning quote.</p></div>
                  </div>
                  <Link to="/request-a-quote" onClick={closeMobileMenu} className="mt-5 flex w-full items-center justify-center rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-bold transition hover:bg-white/15">Get a Free Quote</Link>
                </div>
              </div>

              <div className="border-t border-gray-100 bg-white p-5">
                <Link to="/book-cleaning-service" onClick={closeMobileMenu} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-crystal-500 px-5 py-4 font-bold text-white shadow-lg shadow-crystal-500/20 transition hover:bg-crystal-600">Book Now <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function CheckMark() {
  return (
    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-crystal-500 text-white">
      <span className="h-1.5 w-1.5 rounded-full bg-white" />
    </span>
  );
}
