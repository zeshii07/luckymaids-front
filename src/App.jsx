import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

// Lazy-loaded main pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Booking = lazy(() => import("./pages/Booking"));
const Quote = lazy(() => import("./pages/Quote"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Confirmation = lazy(() => import("./pages/Confirmation"));
const ServicesOverview = lazy(() => import("./pages/ServicesOverview"));
const AreasWeServe = lazy(() => import("./pages/AreasWeServe"));
const Pricing = lazy(() => import("./pages/Pricing"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));

// Lazy-loaded service pages
const Residential = lazy(() => import("./pages/services/Residential"));

const DeepCleaning = lazy(() => import("./pages/services/DeepCleaning"));

const MoveInOut = lazy(() => import("./pages/services/MoveInOut"));

const Commercial = lazy(() => import("./pages/services/Commercial"));

const Furniture = lazy(() => import("./pages/services/Furniture"));

const BabysittingMaid = lazy(() => import("./pages/services/BabysittingMaid"));

const Babysitting = lazy(() => import("./pages/services/Babysitting"));

const MaidServices = lazy(() => import("./pages/services/MaidServices"));

export default function App() {
  return (
    <HelmetProvider>
      <CartProvider>
        <BrowserRouter>
          <ScrollToTop />

          {/* Brief branded loader during route changes */}
          <RouteLoader minimumDuration={350} />

          <div className="flex min-h-screen flex-col font-sans antialiased">
            <Navbar />

            <main className="flex-grow pb-24">
              {/* Loader shown while lazy page files are downloading */}
              <Suspense
                fallback={<PageLoader message="Loading page content" />}
              >
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/booking" element={<Booking />} />
                  <Route path="/quote" element={<Quote />} />

                  <Route path="/services" element={<ServicesOverview />} />

                  <Route
                    path="/services/residential"
                    element={<Residential />}
                  />

                  <Route
                    path="/services/deep-cleaning"
                    element={<DeepCleaning />}
                  />

                  <Route path="/services/move-in-out" element={<MoveInOut />} />

                  <Route path="/services/commercial" element={<Commercial />} />

                  <Route path="/services/furniture" element={<Furniture />} />

                  <Route
                    path="/services/babysitting-maid"
                    element={<BabysittingMaid />}
                  />

                  <Route
                    path="/services/babysitting"
                    element={<Babysitting />}
                  />

                  <Route
                    path="/services/maid-services"
                    element={<MaidServices />}
                  />

                  <Route path="/checkout" element={<Checkout />} />

                  <Route path="/confirmation" element={<Confirmation />} />

                  <Route path="/areas-we-serve" element={<AreasWeServe />} />

                  <Route path="/pricing" element={<Pricing />} />

                  <Route path="/blog" element={<BlogPage />} />

                  <Route path="/blog/:slug" element={<BlogPostPage />} />
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
