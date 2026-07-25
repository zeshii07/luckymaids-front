import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { CartProvider } from "./context/CartContext"; // <-- Import Provider
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingContact from "./components/FloatingContact";
import ScrollToTop from "./components/ScrollToTop";
import StickyCartBar from "./components/StickyCartBar"; // <-- Import Sticky
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import Quote from "./pages/Quote";
import ServicesOverview from "./pages/ServicesOverview";
import Residential from "./pages/services/Residential";
import DeepCleaning from "./pages/services/DeepCleaning";
import MoveInOut from "./pages/services/MoveInOut";
import Commercial from "./pages/services/Commercial";
import Furniture from "./pages/services/Furniture";
import BabysittingMaid from "./pages/services/BabysittingMaid";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import ServiceMarquee from "./components/ServiceMarquee";
import Babysitting from "./pages/services/Babysitting";
import MaidServices from "./pages/services/MaidServices";
import AreasWeServe from "./pages/AreasWeServe";
import Pricing from "./pages/Pricing";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";

export default function App() {
  return (
    <HelmetProvider>
      <CartProvider>
        {" "}
        {/* <-- Wrap App in CartProvider */}
        <BrowserRouter>
          <ScrollToTop />
          <div className="font-sans antialiased flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow pb-24">
              {" "}
              {/* <-- Added pb-24 so content isn't hidden behind sticky bar */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/quote" element={<Quote />} />

                <Route path="/services" element={<ServicesOverview />} />
                <Route path="/services/residential" element={<Residential />} />
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
                <Route path="/services/babysitting" element={<Babysitting />} />
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
