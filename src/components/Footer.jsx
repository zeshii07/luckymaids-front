 import { Link } from "react-router-dom";
import {
  ArrowRight,
  Clock3,
  Gem,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about-us" },
  { name: "All Services", path: "/cleaning-services-dubai" },
  { name: "Contact Us", path: "/contact-us" },
  { name: "Get a Quote", path: "/request-a-quote" },
  { name: "Book Now", path: "/book-cleaning-service" },
];

const serviceLinks = [
  { name: "Residential Cleaning", path: "/residential-cleaning-services-dubai" },
  { name: "Deep Cleaning", path: "/deep-cleaning-services-dubai" },
  { name: "Maid Services", path: "/maid-services-dubai" },
  { name: "Furniture Cleaning", path: "/furniture-cleaning-dubai" },
  { name: "Commercial Cleaning", path: "/commercial-cleaning-services-dubai" },
  { name: "Move-In / Move-Out", path: "/move-in-move-out-cleaning-dubai" },
  { name: "Babysitting Services", path: "/babysitting-services-dubai" },
];

// Add verified business profile URLs here when they are available.
const socialLinks = [];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(93,80,232,0.14),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(189,232,212,0.08),transparent_30%)]" />
      <Gem className="pointer-events-none absolute -bottom-24 -right-20 h-80 w-80 rotate-12 text-white/[0.025]" />

      <div className="relative">
        <section className="border-b border-white/10">
          <div className="container mx-auto px-5 py-10 sm:px-6">
            <div className="flex flex-col gap-6 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur sm:p-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <div className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.22em] text-mint">
                  <Sparkles className="h-4 w-4" />
                  Professional cleaning across Dubai
                </div>
                <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                  Ready for a cleaner, more comfortable space?
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-6 text-gray-400 sm:text-base">
                  Book a service online or request a personalized quotation for
                  your home, office, furniture, or move.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/request-a-quote"
                  className="inline-flex items-center justify-center rounded-full border border-indigo/60 bg-indigo/15 px-6 py-3 font-bold text-white transition hover:bg-indigo/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo"
                >
                  Get a Free Quote
                </Link>
                <Link
                  to="/book-cleaning-service"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-coral px-6 py-3 font-bold text-ink shadow-lg shadow-coral/30 transition hover:-translate-y-0.5 hover:bg-coral-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
                >
                  Book Now
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-5 py-14 sm:px-6 lg:py-16">
          <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-[1.25fr_0.8fr_1fr_1fr]">
            <div>
              <Link
                to="/"
                className="inline-flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo"
                aria-label="Byt Cleaning Services home"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo to-indigo-deep text-white shadow-lg shadow-ink/40">
                  <Gem className="h-6 w-6" />
                </span>
                <span>
                  <span className="block font-display text-xl font-bold text-white">
                    Byt Cleaning
                  </span>
                  <span className="block text-xs font-bold uppercase tracking-[0.22em] text-mint">
                    Services
                  </span>
                </span>
              </Link>

              <p className="mt-6 max-w-md text-sm leading-7 text-gray-400">
                Providing professional, flexible, and customer-focused cleaning
                services for homes and businesses across Dubai. From routine
                housekeeping to detailed deep cleaning, we help make everyday
                spaces cleaner, fresher, and easier to maintain.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-gray-300">
                  <ShieldCheck className="h-4 w-4 text-mint" />
                  Clear communication
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-gray-300">
                  <Clock3 className="h-4 w-4 text-mint" />
                  Flexible scheduling
                </span>
              </div>

              <div className="mt-7 flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;

                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      aria-label={social.name}
                      className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-gray-300 transition hover:-translate-y-0.5 hover:border-indigo/40 hover:bg-indigo hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            <FooterColumn title="Quick Links" links={quickLinks} />
            <FooterColumn title="Our Services" links={serviceLinks} />

            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
                Contact Us
              </h3>

              <ul className="mt-6 space-y-5">
                <ContactItem
                  icon={MapPin}
                  label="Service Area"
                  content="Dubai, United Arab Emirates"
                />

                <ContactItem
                  icon={Phone}
                  label="Phone"
                  content={
                    <a
                      href="tel:0553730702"
                      className="transition hover:text-mint"
                    >
                      055 373 0702
                    </a>
                  }
                />

                <ContactItem
                  icon={MessageCircle}
                  label="WhatsApp"
                  content={
                    <a
                      href="https://wa.me/971553730702"
                      target="_blank"
                      rel="noreferrer"
                      className="transition hover:text-mint"
                    >
                      Chat on WhatsApp
                    </a>
                  }
                />

                <ContactItem
                  icon={Mail}
                  label="Email"
                  content={
                    <a
                      href="mailto:bytalhryacleaning@gmail.com"
                      className="break-all transition hover:text-mint"
                    >
                      bytalhryacleaning@gmail.com
                    </a>
                  }
                />

                <ContactItem
                  icon={Clock3}
                  label="Business Hours"
                  content="Monday – Sunday, 8:00 AM – 8:00 PM"
                />
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="container mx-auto flex flex-col gap-4 px-5 py-6 text-sm text-gray-500 sm:px-6 md:flex-row md:items-center md:justify-between">
            <p>
              © {year} Byt Cleaning Services. All rights reserved.
            </p>

            <div className="flex flex-wrap gap-x-5 gap-y-2">
              <Link
                to="/privacy"
                className="transition hover:text-mint"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="transition hover:text-mint"
              >
                Terms of Service
              </Link>
              <Link
                to="/contact-us"
                className="transition hover:text-mint"
              >
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
        {title}
      </h3>
      <ul className="mt-6 space-y-3">
        {links.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className="group inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-ink-soft transition group-hover:bg-mint" />
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactItem({ icon: Icon, label, content }) {
  return (
    <li className="flex items-start gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-mint">
        <Icon className="h-4.5 w-4.5" />
      </span>
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
          {label}
        </p>
        <div className="mt-1 text-sm leading-6 text-gray-300">{content}</div>
      </div>
    </li>
  );
}
