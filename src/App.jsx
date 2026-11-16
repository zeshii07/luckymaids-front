import { Suspense, useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import { CartProvider } from "./context/CartContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingContact from "./components/FloatingContact";
import ScrollToTop from "./components/ScrollToTop";
import StickyCartBar from "./components/StickyCartBar";
import ServiceMarquee from "./components/ServiceMarquee";
import RouteSeo from "./components/RouteSeo";
import LazyErrorBoundary from "./components/LazyErrorBoundary";
import AppLoader from "./components/AppLoader";

// EAGER static imports (no code-splitting). On hosts that gate requests with a
// JS challenge (e.g. InfinityFree's AES anti-bot), dynamic imports for lazy
// chunks return the challenge HTML instead of JS → "Failed to fetch
// dynamically imported module" → blank page. Static imports bundle every page
// into the main chunk, so navigation never triggers a new asset request.
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import Quote from "./pages/Quote";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import ServicesOverview from "./pages/ServicesOverview";
import AreasWeServe from "./pages/AreasWeServe";
import Pricing from "./pages/Pricing";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import NotFound from "./pages/NotFound";

// EAGER service pages
import Residential from "./pages/services/Residential";
import DeepCleaning from "./pages/services/DeepCleaning";
import MoveInOut from "./pages/services/MoveInOut";
import Commercial from "./pages/services/Commercial";
import Furniture from "./pages/services/Furniture";
import BabysittingMaid from "./pages/services/BabysittingMaid";
import Babysitting from "./pages/services/Babysitting";
import MaidServices from "./pages/services/MaidServices";

function RouteVisualTheme() {
  const { pathname } = useLocation();
  useEffect(() => {
    const routeTheme = pathname === "/" ? "theme-home"
      : pathname.startsWith("/blog") ? "theme-editorial"
      : ["/book-cleaning-service", "/request-a-quote", "/checkout", "/booking-confirmation"].includes(pathname) ? "theme-booking"
      : pathname.includes("babysitting") ? "theme-care"
      : pathname.includes("commercial") ? "theme-commercial"
      : pathname.includes("furniture") ? "theme-furniture"
      : pathname.includes("move-in-move-out") ? "theme-move"
      : pathname.includes("cleaning") || pathname.includes("maid-services") ? "theme-service"
      : "theme-editorial";
    const themes = ["theme-home", "theme-editorial", "theme-booking", "theme-care", "theme-commercial", "theme-furniture", "theme-move", "theme-service"];
    document.body.classList.remove(...themes);
    document.body.classList.add(routeTheme);
    return () => document.body.classList.remove(routeTheme);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <HelmetProvider>
      <CartProvider>
        <BrowserRouter>
          <RouteVisualTheme />
          <ScrollToTop />
          <RouteSeo />

          {/* First-mount loading animation. Shows on every full reload / first
              visit, then fades out once React mounts the first route. Kept
              OUTSIDE the Routes so it never interferes with SPA navigation. */}
          <AppLoader />

          <div className="site-shell flex min-h-screen flex-col font-sans antialiased">
            <Navbar />
            

            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-indigo-deep focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
            >
              Skip to content
            </a>
            <main id="main-content" className="flex-grow pb-24">
              <LazyErrorBoundary>
                <Routes>
                  {/* ======================================================
                      PRIMARY PUBLIC PAGES
                  ====================================================== */}

                  <Route path="/" element={<Home />} />

                  <Route
                    path="/about-us"
                    element={<About />}
                  />

                  <Route
                    path="/contact-us"
                    element={<Contact />}
                  />

                  <Route
                    path="/cleaning-services-dubai"
                    element={<ServicesOverview />}
                  />

                  <Route
                    path="/areas-we-serve"
                    element={<AreasWeServe />}
                  />

                  <Route
                    path="/pricing"
                    element={<Pricing />}
                  />

                  {/* ======================================================
                      CONVERSION AND BOOKING PAGES
                  ====================================================== */}

                  <Route
                    path="/book-cleaning-service"
                    element={<Booking />}
                  />

                  <Route
                    path="/request-a-quote"
                    element={<Quote />}
                  />

                  <Route
                    path="/checkout"
                    element={<Checkout />}
                  />

                  <Route
                    path="/booking-confirmation"
                    element={<Confirmation />}
                  />

                  {/* ======================================================
                      SEO SERVICE PAGES
                  ====================================================== */}

                  <Route
                    path="/residential-cleaning-services-dubai"
                    element={<Residential />}
                  />

                  <Route
                    path="/deep-cleaning-services-dubai"
                    element={<DeepCleaning />}
                  />

                  <Route
                    path="/move-in-move-out-cleaning-dubai"
                    element={<MoveInOut />}
                  />

                  <Route
                    path="/commercial-cleaning-services-dubai"
                    element={<Commercial />}
                  />

                  <Route
                    path="/furniture-cleaning-dubai"
                    element={<Furniture />}
                  />

                  <Route
                    path="/maid-services-dubai"
                    element={<MaidServices />}
                  />

                  <Route
                    path="/babysitting-services-dubai"
                    element={<Babysitting />}
                  />

                  <Route
                    path="/babysitting-maid-services-dubai"
                    element={<BabysittingMaid />}
                  />

                  {/* ======================================================
                      BLOG
                  ====================================================== */}

                  <Route
                    path="/blog"
                    element={<BlogPage />}
                  />

                  <Route
                    path="/blog/:slug"
                    element={<BlogPostPage />}
                  />

                  {/* ======================================================
                      REDIRECT OLD URLS

                      These prevent existing links from breaking.
                      Remove them only after permanent server redirects
                      are configured.
                  ====================================================== */}

                  <Route
                    path="/about"
                    element={
                      <Navigate
                        to="/about-us"
                        replace
                      />
                    }
                  />

                  <Route
                    path="/contact"
                    element={
                      <Navigate
                        to="/contact-us"
                        replace
                      />
                    }
                  />

                  <Route
                    path="/booking"
                    element={
                      <Navigate
                        to="/book-cleaning-service"
                        replace
                      />
                    }
                  />

                  <Route
                    path="/quote"
                    element={
                      <Navigate
                        to="/request-a-quote"
                        replace
                      />
                    }
                  />

                  <Route
                    path="/confirmation"
                    element={
                      <Navigate
                        to="/booking-confirmation"
                        replace
                      />
                    }
                  />

                  <Route
                    path="/services"
                    element={
                      <Navigate
                        to="/cleaning-services-dubai"
                        replace
                      />
                    }
                  />

                  <Route
                    path="/services/residential"
                    element={
                      <Navigate
                        to="/residential-cleaning-services-dubai"
                        replace
                      />
                    }
                  />

                  <Route
                    path="/services/deep-cleaning"
                    element={
                      <Navigate
                        to="/deep-cleaning-services-dubai"
                        replace
                      />
                    }
                  />

                  <Route
                    path="/services/move-in-out"
                    element={
                      <Navigate
                        to="/move-in-move-out-cleaning-dubai"
                        replace
                      />
                    }
                  />

                  <Route
                    path="/services/commercial"
                    element={
                      <Navigate
                        to="/commercial-cleaning-services-dubai"
                        replace
                      />
                    }
                  />

                  <Route
                    path="/services/furniture"
                    element={
                      <Navigate
                        to="/furniture-cleaning-dubai"
                        replace
                      />
                    }
                  />

                  <Route
                    path="/services/maid-services"
                    element={
                      <Navigate
                        to="/maid-services-dubai"
                        replace
                      />
                    }
                  />

                  <Route
                    path="/services/babysitting"
                    element={
                      <Navigate
                        to="/babysitting-services-dubai"
                        replace
                      />
                    }
                  />

                  <Route
                    path="/services/babysitting-maid"
                    element={
                      <Navigate
                        to="/babysitting-maid-services-dubai"
                        replace
                      />
                    }
                  />

                  <Route path="/privacy" element={<Navigate to="/contact-us" replace />} />
                  <Route path="/terms" element={<Navigate to="/contact-us" replace />} />

                  {/* ======================================================
                      FALLBACK
                  ====================================================== */}

                  <Route
                    path="*"
                    element={<NotFound />}
                  />
                </Routes>
              </LazyErrorBoundary>
            </main>

            <ServiceMarquee />
            <Footer />
            <FloatingContact />
            <StickyCartBar />
          </div>
        </BrowserRouter>
      </CartProvider>
    </HelmetProvider>
  );
}
