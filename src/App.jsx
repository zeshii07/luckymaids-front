import { lazy, Suspense, useEffect } from "react";
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
import PageLoader from "./components/PageLoader";
import RouteLoader from "./components/RouteLoader";
import ChatBot from "./components/chatbot/ChatBot";
import RouteSeo from "./components/RouteSeo";

// Lazy-loaded primary pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Booking = lazy(() => import("./pages/Booking"));
const Quote = lazy(() => import("./pages/Quote"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Confirmation = lazy(() => import("./pages/Confirmation"));
const ServicesOverview = lazy(
  () => import("./pages/ServicesOverview"),
);
const AreasWeServe = lazy(() => import("./pages/AreasWeServe"));
const Pricing = lazy(() => import("./pages/Pricing"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));

// Lazy-loaded service pages
const Residential = lazy(
  () => import("./pages/services/Residential"),
);
const DeepCleaning = lazy(
  () => import("./pages/services/DeepCleaning"),
);
const MoveInOut = lazy(
  () => import("./pages/services/MoveInOut"),
);
const Commercial = lazy(
  () => import("./pages/services/Commercial"),
);
const Furniture = lazy(
  () => import("./pages/services/Furniture"),
);
const BabysittingMaid = lazy(
  () => import("./pages/services/BabysittingMaid"),
);
const Babysitting = lazy(
  () => import("./pages/services/Babysitting"),
);
const MaidServices = lazy(
  () => import("./pages/services/MaidServices"),
);

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

          <RouteLoader minimumDuration={350} />

          <div className="site-shell flex min-h-screen flex-col font-sans antialiased">
            <Navbar />

            <main className="flex-grow pb-24">
              <Suspense
                fallback={
                  <PageLoader message="Loading page content" />
                }
              >
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
                    element={
                      <Navigate
                        to="/"
                        replace
                      />
                    }
                  />
                </Routes>
              </Suspense>
            </main>

            <ServiceMarquee />
            <Footer />
            <FloatingContact />
            <StickyCartBar />
            <ChatBot />
          </div>
        </BrowserRouter>
      </CartProvider>
    </HelmetProvider>
  );
}
