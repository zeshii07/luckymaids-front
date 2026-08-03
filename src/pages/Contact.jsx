import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle,
  ChevronDown,
  Clock,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
  X,
} from "lucide-react";

const servicesList = [
  "Deep Cleaning",
  "Maid Services",
  "Residential Cleaning",
  "Commercial Cleaning",
  "Move-In Cleaning",
  "Move-Out Cleaning",
  "Sofa Cleaning",
  "Carpet Cleaning",
  "Mattress Cleaning",
  "Curtain Cleaning",
  "Upholstery Cleaning",
  "Babysitting Services",
];

const areasServed = [
  "Downtown Dubai",
  "Business Bay",
  "Dubai Marina",
  "Palm Jumeirah",
  "Dubai Hills Estate",
  "JVC",
  "JLT",
  "Al Barsha",
  "Deira",
  "Bur Dubai",
  "Dubai Silicon Oasis",
  "Dubai South",
  "Arabian Ranches",
  "Mirdif",
  "Motor City",
  "DAMAC Hills",
  "Town Square",
];

const faqs = [
  {
    q: "How can I book a cleaning service?",
    a: "Contact us by phone, WhatsApp, email, or through the website's booking form.",
  },
  {
    q: "How quickly will I receive a quotation?",
    a: "Quotation response times depend on the complexity of your request, but we aim to respond as promptly as possible during business hours.",
  },
  {
    q: "Do I need to be home during the cleaning?",
    a: "Requirements may vary depending on the service. Our team can discuss the most suitable arrangements when confirming your booking.",
  },
  {
    q: "Can I reschedule my appointment?",
    a: "Yes, subject to our scheduling and availability. Please let us know as early as possible if you need to change your booking.",
  },
  {
    q: "Which payment methods do you accept?",
    a: "We accept cash, bank transfer, and card payments (subject to availability).",
  },
];

const initialFormData = {
  name: "",
  phone: "",
  email: "",
  service_type: "Deep Cleaning",
  location: "",
  property_type: "",
  preferred_date: "",
  frequency: "",
  message: "",
};

const ease = [0.22, 1, 0.36, 1];
const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-crystal-500 focus:ring-4 focus:ring-crystal-100 disabled:cursor-not-allowed disabled:bg-gray-50";

export default function Contact() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const timeoutRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  const reveal = {
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.55, ease },
  };

  const handleChange = ({ target }) => {
    setFormData((current) => ({ ...current, [target.name]: target.value }));
  };

  const resetStatusLater = () => {
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setStatus("idle");
      setError(null);
    }, 5000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setError(null);

    const fullMessage = `Location: ${formData.location}\nProperty Type: ${formData.property_type}\nPreferred Date: ${formData.preferred_date}\nFrequency: ${formData.frequency}\n\nNotes: ${formData.message}`;
    const payload = { ...formData, message: fullMessage };

    try {
      const response = await fetch(
        "https://lucky-backend-woad.vercel.app/api/contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok)
        throw new Error(`Request failed with status ${response.status}`);

      setStatus("success");
      setFormData(initialFormData);
      resetStatusLater();
    } catch (requestError) {
      console.error("Contact form submission failed:", requestError);
      setError(
        "We couldn't send your request. Please try again, or contact us by phone or WhatsApp.",
      );
      setStatus("error");
      resetStatusLater();
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-white text-gray-900">
      <Helmet>
        <title>Contact Lucky Crystal Maids | Cleaning Services Dubai</title>
        <meta
          name="description"
          content="Contact Lucky Crystal Maids to book professional cleaning services in Dubai. Request a free quote for deep cleaning, maid services, commercial cleaning, and more."
        />
      </Helmet>

      <section className="relative isolate overflow-hidden bg-gray-950 pt-28 text-white sm:pt-32">
        <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1800&q=85" alt="Friendly customer support team ready to help" className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-slate-950/45" />
        <div className="container mx-auto max-w-7xl px-5 pb-20 sm:px-6 lg:px-8 lg:pb-28">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease }}
            className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end"
          >
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-crystal-100 backdrop-blur">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Fast, friendly booking support
              </span>
              <h1 className="mt-6 text-4xl font-display font-bold tracking-tight sm:text-5xl lg:text-7xl">
                Contact Lucky Crystal Maids
              </h1>
              <h2 className="mt-5 text-xl font-semibold text-crystal-200 sm:text-2xl">
                We're Here to Help
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-gray-300 sm:text-lg">
                Whether you have a question about our services, would like to
                request a quotation, or are ready to schedule a cleaning
                appointment, our team is here to assist. We aim to respond
                promptly and help you choose the cleaning service that best fits
                your home or business.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[
                {
                  icon: Phone,
                  label: "Phone",
                  value: "+971 55 248 8588",
                  href: "tel:+971552488588",
                },
                {
                  icon: MessageCircle,
                  label: "WhatsApp",
                  value: "+971 55 248 8588",
                  href: "https://wa.me/971552488588",
                  external: true,
                },
                {
                  icon: Mail,
                  label: "Email",
                  value: "Luckycrystaldubai@gmail.com",
                  href: "mailto:Luckycrystaldubai@gmail.com",
                },
                {
                  icon: Clock,
                  label: "Business Hours",
                  value: "Daily, 8:00 AM – 8:00 PM",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur-sm sm:p-5"
                >
                  <item.icon
                    className="mb-4 h-6 w-6 text-crystal-300"
                    aria-hidden="true"
                  />
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noreferrer" : undefined}
                      className="mt-1 block break-words text-sm font-semibold text-white hover:text-crystal-200"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="mt-1 text-sm font-semibold text-white">
                      {item.value}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 -mt-8 pb-20 sm:pb-24">
        <div className="container mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-7 lg:grid-cols-[.72fr_1.28fr] lg:items-start">
            <motion.aside {...reveal} className="space-y-6 lg:sticky lg:top-28">
              <div className="rounded-[2rem] bg-gray-950 p-7 text-white shadow-xl sm:p-8">
                <h2 className="text-2xl font-display font-bold">
                  Get in Touch
                </h2>
                <div className="mt-7 space-y-6">
                  {[
                    {
                      icon: Phone,
                      title: "Phone",
                      content: (
                        <a
                          href="tel:+971501234567"
                          className="text-gray-300 transition hover:text-white"
                        >
                          +971 55 248 8588
                        </a>
                      ),
                    },
                    {
                      icon: MessageCircle,
                      title: "WhatsApp",
                      content: (
                        <a
                          href="https://wa.me/971552488588"
                          target="_blank"
                          rel="noreferrer"
                          className="text-gray-300 transition hover:text-white"
                        >
                          +971 55 248 8588
                        </a>
                      ),
                    },
                    {
                      icon: Mail,
                      title: "Email",
                      content: (
                        <a
                          href="mailto:Luckycrystaldubai@gmail.com"
                          className="break-all text-gray-300 transition hover:text-white"
                        >
                          Luckycrystaldubai@gmail.com
                        </a>
                      ),
                    },
                    {
                      icon: Clock,
                      title: "Business Hours",
                      content: (
                        <>
                          <p className="text-gray-300">Monday – Sunday</p>
                          <p className="text-gray-300">8:00 AM – 8:00 PM</p>
                        </>
                      ),
                    },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                        <item.icon
                          className="h-5 w-5 text-crystal-300"
                          aria-hidden="true"
                        />
                      </span>
                      <div>
                        <p className="font-semibold text-white">{item.title}</p>
                        <div className="mt-1 text-sm leading-6">
                          {item.content}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-gray-200 bg-white p-7 shadow-sm sm:p-8">
                <h2 className="text-xl font-bold text-gray-900">
                  Our Cleaning Services
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  We can assist with:
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {servicesList.map((service) => (
                    <div
                      key={service}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <CheckCircle
                        className="mt-0.5 h-4 w-4 shrink-0 text-crystal-600"
                        aria-hidden="true"
                      />
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.aside>

            <motion.div
              {...reveal}
              transition={{
                ...reveal.transition,
                delay: reduceMotion ? 0 : 0.08,
              }}
              className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-[0_24px_80px_-35px_rgba(15,23,42,0.35)] sm:p-9 lg:p-11"
            >
              <div className="mb-8 flex flex-col gap-3 border-b border-gray-100 pb-8 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <span className="text-sm font-bold uppercase tracking-[0.18em] text-crystal-600">
                    Free quotation
                  </span>
                  <h2 className="mt-3 text-3xl font-display font-bold text-gray-900">
                    Request a Free Quote
                  </h2>
                  <p className="mt-3 max-w-2xl text-gray-600">
                    To help us recommend the most suitable service, please
                    include your details below.
                  </p>
                </div>
                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-crystal-50 px-3 py-2 text-xs font-semibold text-crystal-700">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  Prompt response during business hours
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-6"
                aria-busy={status === "loading"}
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Full Name" required htmlFor="contact-name">
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      autoComplete="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={inputClass}
                      placeholder="Your full name"
                    />
                  </Field>
                  <Field
                    label="Contact Number"
                    required
                    htmlFor="contact-phone"
                  >
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      inputMode="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className={inputClass}
                      placeholder="e.g., +971 50 123 4567"
                    />
                  </Field>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Email Address" htmlFor="contact-email">
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="you@example.com"
                    />
                  </Field>
                  <Field
                    label="Property Location"
                    required
                    htmlFor="contact-location"
                  >
                    <input
                      id="contact-location"
                      type="text"
                      name="location"
                      autoComplete="address-level2"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      placeholder="e.g., Dubai Marina"
                      className={inputClass}
                    />
                  </Field>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <Field
                    label="Required Service"
                    required
                    htmlFor="contact-service"
                  >
                    <select
                      id="contact-service"
                      name="service_type"
                      value={formData.service_type}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    >
                      {servicesList.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Property Type" htmlFor="contact-property">
                    <input
                      id="contact-property"
                      type="text"
                      name="property_type"
                      value={formData.property_type}
                      onChange={handleChange}
                      placeholder="e.g., 2BHK Apartment, Villa"
                      className={inputClass}
                    />
                  </Field>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Preferred Cleaning Date" htmlFor="contact-date">
                    <input
                      id="contact-date"
                      type="date"
                      name="preferred_date"
                      value={formData.preferred_date}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Cleaning Frequency" htmlFor="contact-frequency">
                    <select
                      id="contact-frequency"
                      name="frequency"
                      value={formData.frequency}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">Select Frequency</option>
                      <option value="One-time">One-time</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Bi-weekly">Bi-weekly</option>
                      <option value="Monthly">Monthly</option>
                    </select>
                  </Field>
                </div>

                <Field
                  label="Additional Notes or Special Requests"
                  htmlFor="contact-message"
                >
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`${inputClass} resize-y`}
                    placeholder="Tell us anything that will help us prepare an accurate quotation."
                  />
                </Field>

                <button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className={`flex w-full items-center justify-center gap-2 rounded-xl px-5 py-4 text-base font-bold text-white shadow-lg transition focus:outline-none focus-visible:ring-4 disabled:cursor-not-allowed ${status === "success" ? "bg-emerald-600 focus-visible:ring-emerald-200" : "bg-crystal-600 hover:-translate-y-0.5 hover:bg-crystal-700 focus-visible:ring-crystal-200 disabled:hover:translate-y-0"}`}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2
                        className="h-5 w-5 animate-spin"
                        aria-hidden="true"
                      />
                      Sending...
                    </>
                  ) : status === "success" ? (
                    <>
                      <CheckCircle className="h-5 w-5" aria-hidden="true" />
                      Request Sent!
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" aria-hidden="true" />
                      Submit Quote Request
                    </>
                  )}
                </button>

                <div aria-live="polite" aria-atomic="true">
                  {status === "success" && (
                    <div
                      role="status"
                      className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800"
                    >
                      <CheckCircle
                        className="mt-0.5 h-5 w-5 shrink-0"
                        aria-hidden="true"
                      />
                      <span>
                        Thank you! Your message has been sent to our team.
                      </span>
                    </div>
                  )}
                  {status === "error" && (
                    <div
                      role="alert"
                      className="flex items-start justify-between gap-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
                    >
                      <span className="flex items-start gap-3">
                        <AlertCircle
                          className="mt-0.5 h-5 w-5 shrink-0"
                          aria-hidden="true"
                        />
                        {error}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setError(null);
                          setStatus("idle");
                        }}
                        aria-label="Dismiss error"
                        className="rounded-md p-1 transition hover:bg-red-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                      >
                        <X className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  )}
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20 sm:py-24">
        <div className="container mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <motion.div
            {...reveal}
            className="grid gap-10 rounded-[2rem] border border-gray-200 bg-white p-7 shadow-sm sm:p-10 lg:grid-cols-[.75fr_1.25fr] lg:items-center lg:p-14"
          >
            <div>
              <span className="text-sm font-bold uppercase tracking-[0.18em] text-crystal-600">
                Areas we serve
              </span>
              <h2 className="mt-4 text-3xl font-display font-bold text-gray-900 sm:text-4xl">
                Cleaning services across Dubai.
              </h2>
              <p className="mt-5 text-lg leading-8 text-gray-600">
                We proudly provide services across many areas of Dubai. Contact
                us if your area is not listed, and we'll be happy to confirm
                availability.
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {areasServed.map((area) => (
                <span
                  key={area}
                  className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700"
                >
                  <MapPin
                    className="h-3.5 w-3.5 text-crystal-600"
                    aria-hidden="true"
                  />
                  {area}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
          <motion.div {...reveal} className="mb-12 text-center">
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-crystal-600">
              FAQs
            </span>
            <h2 className="mt-4 text-3xl font-display font-bold text-gray-900 sm:text-5xl">
              Frequently Asked Questions
            </h2>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              const panelId = `contact-faq-panel-${index}`;
              const buttonId = `contact-faq-button-${index}`;
              return (
                <div
                  key={faq.q}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
                >
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-5 p-5 text-left font-semibold text-gray-900 outline-none transition hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-crystal-500 sm:p-6"
                  >
                    <span>{faq.q}</span>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-crystal-50">
                      <ChevronDown
                        className={`h-5 w-5 text-crystal-600 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                        aria-hidden="true"
                      />
                    </span>
                  </button>
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    initial={false}
                    animate={{
                      height: isOpen ? "auto" : 0,
                      opacity: isOpen ? 1 : 0,
                    }}
                    transition={{ duration: reduceMotion ? 0 : 0.25, ease }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-6 leading-7 text-gray-600 sm:px-6">
                      {faq.a}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-20 sm:pb-24">
        <div className="container mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <motion.div
            {...reveal}
            className="relative overflow-hidden rounded-[2.25rem] bg-gradient-to-br from-crystal-600 via-crystal-700 to-gray-950 px-6 py-14 text-center text-white shadow-2xl sm:px-12 sm:py-16"
          >
            <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-crystal-300/20 blur-3xl" />
            <div className="relative mx-auto max-w-3xl">
              <h2 className="text-3xl font-display font-bold sm:text-5xl">
                Ready to Book?
              </h2>
              <p className="mt-5 text-lg leading-8 text-crystal-100">
                Whether you need a one-time deep clean, recurring maid services,
                or commercial cleaning for your workplace, Lucky Crystal Maids
                is ready to help. Contact us today to request your personalized
                quotation or schedule your next cleaning service.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  to="/quote"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-bold text-crystal-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Get a Free Quote
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  to="/booking"
                  className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 px-7 py-3.5 font-bold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Book a Cleaning Service
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

function Field({ label, htmlFor, required = false, children }) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-sm font-semibold text-gray-700"
      >
        {label}
        {required && (
          <span className="ml-1 text-red-500" aria-hidden="true">
            *
          </span>
        )}
        {required && <span className="sr-only"> required</span>}
      </label>
      {children}
    </div>
  );
}
