import Hero from '../components/Hero';
import Services from '../components/Services';
import HowItWorks from '../components/HowItWorks';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonial from '../components/Testimonial';
import CTABanner from '../components/CTABanner';

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonial />
      <CTABanner />
    </>
  );
}