import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  Building,
  ChevronDown,
  ClipboardList,
  Clock,
  Eye,
  Home,
  MapPin,
  ShieldCheck,
  Sparkles,
  Target,
  UserCheck,
} from "lucide-react";

const whatWeDo = [
  { name: "Residential Cleaning", link: "/residential-cleaning-services-dubai" },
  { name: "Deep Cleaning", link: "/deep-cleaning-services-dubai" },
  { name: "Maid Services", link: "/maid-services-dubai" },
  { name: "Furniture Cleaning", link: "/furniture-cleaning-dubai" },
  { name: "Commercial Cleaning", link: "/commercial-cleaning-services-dubai" },
  { name: "Move-In & Move-Out Cleaning", link: "/move-in-move-out-cleaning-dubai" },
  { name: "Babysitting Services", link: "/babysitting-services-dubai" },
];

const whyChooseUs = [
  { icon: Clock, title: "Flexible scheduling" },
  { icon: ClipboardList, title: "Customized cleaning plans" },
  { icon: Building, title: "Residential and commercial expertise" },
  { icon: UserCheck, title: "Friendly customer support" },
  { icon: ShieldCheck, title: "Transparent communication" },
  { icon: Sparkles, title: "Attention to detail" },
  { icon: MapPin, title: "Wide service coverage across Dubai" },
  { icon: Home, title: "Comprehensive cleaning solutions under one roof" },
];

const ourValues = [
  {
    icon: UserCheck,
    title: "Professionalism",
    desc: "We aim to provide courteous and dependable service throughout every customer interaction.",
  },
  {
    icon: Clock,
    title: "Reliability",
    desc: "We understand the importance of arriving as scheduled and communicating clearly with our customers.",
  },
  {
    icon: Target,
    title: "Customer Focus",
    desc: "Every property has different needs, which is why we tailor our cleaning recommendations instead of offering a one-size-fits-all approach.",
  },
  {
    icon: Sparkles,
    title: "Continuous Improvement",
    desc: "We continually review our services and customer feedback to improve the overall experience.",
  },
];

const areasServed = [
  "Downtown Dubai",
  "Business Bay",
  "Dubai Marina",
  "JVC",
  "JLT",
  "Palm Jumeirah",
  "Arabian Ranches",
  "Dubai Hills Estate",
  "Al Barsha",
  "Mirdif",
  "Dubai Silicon Oasis",
  "Dubai South",
  "Deira",
  "Bur Dubai",
  "Motor City",
  "Town Square",
  "DAMAC Hills",
];

const faqs = [
  {
    q: "What services do you offer?",
    a: "We provide residential cleaning, commercial cleaning, deep cleaning, maid services, furniture cleaning, move-in/move-out cleaning, and babysitting services.",
  },
  {
    q: "Do you serve all areas of Dubai?",
    a: "We serve many residential and commercial communities across Dubai. Contact us to confirm availability.",
  },
  {
    q: "Can I customize my cleaning service?",
    a: "Yes. Cleaning plans can be tailored to your property's requirements and preferred schedule.",
  },
  {
    q: "Do you provide one-time and recurring services?",
    a: "Yes. Depending on the service, one-time and recurring appointments can be arranged.",
  },
];

const ease = [0.22, 1, 0.36, 1];

export default function About() {
  const [openFaq, setOpenFaq] = useState(null);
  const reduceMotion = useReducedMotion();

  const reveal = {
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.18 },
    transition: { duration: 0.55, ease },
  };

  return (
    <main className="min-h-screen overflow-hidden bg-white text-ink">
      <Helmet>
        <title>About Byt Cleaning Services | Trusted Cleaning Services Dubai</title>
        <meta
          name="description"
          content="Byt Cleaning Services provides reliable, flexible, and customer-focused residential and commercial cleaning services in Dubai. Learn more about our mission and values."
        />
      </Helmet>

      <section className="relative isolate overflow-hidden bg-ink pt-28 text-white sm:pt-32">
        <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1800&q=85" alt="Byt Cleaning Services professional cleaning team" className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-ink/55" />

        <div className="container mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-28">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease }}
            className="grid items-end gap-8 sm:gap-10 lg:grid-cols-[1.25fr_.75fr]"
          >
            <div className="max-w-4xl">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-xs font-semibold text-mint backdrop-blur sm:text-sm sm:px-4">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Professional cleaning across Dubai
              </span>
              <h1 className="text-3xl font-display font-bold leading-tight tracking-tight sm:text-5xl lg:text-7xl">
                About Byt Cleaning Services
              </h1>
              <h2 className="mt-4 max-w-3xl text-lg font-semibold text-mint sm:text-2xl">
                Professional Cleaning & Maid Services You Can Trust in Dubai
              </h2>
              <p className="mt-5 max-w-3xl text-sm leading-7 text-[var(--line)] sm:text-lg sm:leading-8">
                At <strong className="text-white">Byt Cleaning Services</strong>, we believe a clean and well-maintained space contributes to greater comfort, productivity, and peace of mind. Our goal is to provide dependable residential and commercial cleaning services that help homeowners, tenants, landlords, and businesses maintain clean, organized, and welcoming environments.
              </p>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--line)] sm:text-lg sm:leading-8">
                From regular maid services to detailed deep cleaning, furniture cleaning, move-in and move-out cleaning, and commercial cleaning, we tailor our services to meet the unique requirements of every customer.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
              {whyChooseUs.slice(0, 4).map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.07] p-3 backdrop-blur-sm sm:p-5">
                  <item.icon className="mb-3 h-5 w-5 text-mint sm:mb-4 sm:h-6 sm:w-6" aria-hidden="true" />
                  <p className="text-xs font-semibold leading-5 text-white sm:text-sm">{item.title}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative mt-4 z-10">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal} className="rounded-[2rem] border border-[var(--line)]/80 bg-white p-7 shadow-[0_24px_80px_-35px_rgba(15,23,42,0.35)] sm:p-10 lg:p-14">
            <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:items-start">
              <div>
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-deep">Our story</span>
                <h2 className="mt-4 text-3xl font-display font-bold tracking-tight text-ink sm:text-4xl">Built around different spaces and different needs.</h2>
              </div>
              <div className="space-y-4 text-base leading-8 text-ink-muted sm:text-lg">
                <p>Every property is different, and every customer has different expectations. Byt Cleaning Services was established with the vision of delivering reliable, flexible, and customer-focused cleaning services throughout Dubai.</p>
                <p>By understanding each client's needs, we aim to recommend practical cleaning solutions that fit their property, schedule, and lifestyle.</p>
                <p>Whether cleaning a studio apartment, a family villa, a corporate office, or a retail store, we approach every project with professionalism and attention to detail.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            {[
              {
                icon: Target,
                eyebrow: "Our mission",
                title: "Dependable service, shaped around each customer.",
                text: "To provide dependable cleaning services that help customers maintain comfortable homes and professional workplaces through consistent service, transparent communication, and customized cleaning solutions.",
              },
              {
                icon: Eye,
                eyebrow: "Our vision",
                title: "A trusted name for cleaning services in Dubai.",
                text: "To become a trusted name for residential and commercial cleaning services in Dubai by building long-term relationships through quality service and customer satisfaction.",
              },
            ].map((item, index) => (
              <motion.article
                key={item.eyebrow}
                {...reveal}
                transition={{ ...reveal.transition, delay: reduceMotion ? 0 : index * 0.08 }}
                className="group relative overflow-hidden rounded-[2rem] border border-[var(--line)] bg-paper p-8 sm:p-10"
              >
                <div className="absolute right-0 top-0 h-40 w-40 translate-x-1/3 -translate-y-1/3 rounded-full bg-indigo-soft blur-3xl transition-transform duration-500 group-hover:scale-125" />
                <div className="relative">
                  <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-[var(--line)]">
                    <item.icon className="h-7 w-7 text-indigo-deep" aria-hidden="true" />
                  </div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-deep">{item.eyebrow}</p>
                  <h2 className="mt-3 text-2xl font-display font-bold text-ink sm:text-3xl">{item.title}</h2>
                  <p className="mt-5 leading-7 text-ink-muted">{item.text}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 text-white sm:py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal} className="mx-auto mb-12 max-w-3xl text-center">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-mint">What we do</span>
            <h2 className="mt-4 text-3xl font-display font-bold tracking-tight sm:text-5xl">Cleaning support for homes, businesses, and busy lives.</h2>
            <p className="mt-5 text-lg text-[var(--line)]">Byt Cleaning Services provides a wide range of services, including:</p>
          </motion.div>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {whatWeDo.map((service, index) => (
              <motion.div key={service.name} {...reveal} transition={{ ...reveal.transition, delay: reduceMotion ? 0 : Math.min(index * 0.05, 0.25) }}>
                <Link
                  to={service.link}
                  className="group flex min-h-24 items-center justify-between bg-ink-soft/40 px-6 py-5 transition duration-300 hover:bg-ink-soft/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-mint"
                >
                  <span className="flex items-center gap-3">
                    <span className="section-numeral text-sm font-bold text-mint/70" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-semibold text-white">{service.name}</span>
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition group-hover:bg-coral">
                    <ArrowRight className="h-4 w-4 text-white transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal} className="mb-14 max-w-2xl">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-deep">Why choose us</span>
            <h2 className="mt-4 text-3xl font-display font-bold tracking-tight text-ink sm:text-4xl">A straightforward experience from enquiry to completion.</h2>
            <p className="mt-5 text-lg text-ink-muted">We strive to make every booking straightforward, reliable, and tailored to the customer's requirements.</p>
          </motion.div>

          {/* Typographic values list — numbered labels with dividers, not boxed cards */}
          <ul className="grid divide-y divide-[var(--line)] border-y border-[var(--line)] sm:grid-cols-2 sm:divide-x sm:divide-y-0">
            {whyChooseUs.map((item, index) => (
              <motion.li
                key={item.title}
                {...reveal}
                transition={{ ...reveal.transition, delay: reduceMotion ? 0 : Math.min(index * 0.05, 0.25) }}
                className="flex items-start gap-5 px-2 py-7 sm:px-6"
              >
                <span className="section-numeral shrink-0 text-2xl font-bold text-coral" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-soft text-indigo">
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-lg font-bold leading-tight text-ink">{item.title}</h3>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-paper py-16 sm:py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal} className="mb-14 max-w-2xl">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-deep">Our values</span>
            <h2 className="mt-4 text-3xl font-display font-bold tracking-tight text-ink sm:text-4xl">The principles behind every service.</h2>
          </motion.div>

          {/* Editorial values — large typographic labels with explanations, not cards */}
          <div className="grid gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] lg:grid-cols-2">
            {ourValues.map((value, index) => (
              <motion.div
                key={value.title}
                {...reveal}
                transition={{ ...reveal.transition, delay: reduceMotion ? 0 : index * 0.06 }}
                className="bg-white p-8 sm:p-10"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-mint-soft text-indigo-deep">
                    <value.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className="section-numeral text-sm font-bold text-ink-muted" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")} / {String(ourValues.length).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold leading-tight text-ink">{value.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-ink-muted">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal} className="rounded-[2rem] border border-[var(--line)] bg-white p-7 shadow-sm sm:p-10 lg:p-14">
            <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
              <div>
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-deep">Areas we serve</span>
                <h2 className="mt-4 text-3xl font-display font-bold text-ink sm:text-4xl">Serving homes and businesses across Dubai.</h2>
                <p className="mt-5 text-lg leading-8 text-ink-muted">Byt Cleaning Services proudly serves homes and businesses across many communities in Dubai, including:</p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {areasServed.map((area) => (
                  <span key={area} className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-paper px-4 py-2 text-sm font-medium text-ink-soft">
                    <MapPin className="h-3.5 w-3.5 text-indigo-deep" aria-hidden="true" />
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-paper py-16 sm:py-24">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal} className="mb-12 text-center">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-deep">FAQs</span>
            <h2 className="mt-4 text-3xl font-display font-bold text-ink sm:text-5xl">Frequently Asked Questions</h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              const panelId = `about-faq-panel-${index}`;
              const buttonId = `about-faq-button-${index}`;

              return (
                <div key={faq.q} className="overflow-hidden rounded-2xl border border-[var(--line)] bg-white shadow-sm">
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-5 p-5 text-left font-semibold text-ink outline-none transition hover:bg-paper focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo sm:p-6"
                  >
                    <span>{faq.q}</span>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-soft">
                      <ChevronDown className={`h-5 w-5 text-indigo-deep transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
                    </span>
                  </button>
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.25, ease }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-6 leading-7 text-ink-muted sm:px-6">{faq.a}</p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal} className="relative overflow-hidden rounded-[2.25rem] bg-gradient-to-br from-indigo-deep via-indigo-deep to-ink px-6 py-14 text-center text-white shadow-2xl sm:px-12 sm:py-16">
            <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-mint/20 blur-3xl" />
            <div className="relative mx-auto max-w-3xl">
              <h2 className="text-3xl font-display font-bold sm:text-5xl">Let's Keep Your Property Looking Its Best</h2>
              <p className="mt-5 text-lg leading-8 text-indigo-soft">Whether you need regular housekeeping, a detailed deep clean, or commercial cleaning for your business, Byt Cleaning Services is ready to help. Contact us today to discuss your requirements and request a personalized quotation.</p>
              <Link to="/contact" className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-bold text-indigo-deep shadow-lg transition hover:-translate-y-0.5 hover:bg-[var(--line)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-deep">
                Contact Us Today
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
