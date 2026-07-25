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

import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaLinkedinIn,
} from "react-icons/fa6";
const quickLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "All Services", path: "/services" },
  { name: "Contact Us", path: "/contact" },
  { name: "Get a Quote", path: "/quote" },
  { name: "Book Now", path: "/booking" },
];

const serviceLinks = [
  { name: "Residential Cleaning", path: "/services/residential" },
  { name: "Deep Cleaning", path: "/services/deep-cleaning" },
  { name: "Maid Services", path: "/services/maid-services" },
  { name: "Furniture Cleaning", path: "/services/furniture" },
  { name: "Commercial Cleaning", path: "/services/commercial" },
  { name: "Move-In / Move-Out", path: "/services/move-in-out" },
  { name: "Babysitting Services", path: "/services/babysitting" },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "https://facebook.com/yourpage",
    icon: FaFacebookF,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/yourpage",
    icon: FaInstagram,
  },
  {
    name: "X",
    href: "https://x.com/yourpage",
    icon: FaXTwitter,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/yourcompany",
    icon: FaLinkedinIn,
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-gray-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.10),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.08),transparent_30%)]" />
      <Gem className="pointer-events-none absolute -bottom-24 -right-20 h-80 w-80 rotate-12 text-white/[0.025]" />

      <div className="relative">
        <section className="border-b border-white/10">
          <div className="container mx-auto px-5 py-10 sm:px-6">
            <div className="flex flex-col gap-6 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur sm:p-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <div className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.22em] text-crystal-300">
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
                  to="/quote"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-6 py-3 font-bold text-white transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crystal-400"
                >
                  Get a Free Quote
                </Link>
                <Link
                  to="/booking"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-crystal-500 px-6 py-3 font-bold text-white shadow-lg shadow-crystal-950/30 transition hover:-translate-y-0.5 hover:bg-crystal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crystal-400"
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
                className="inline-flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crystal-400"
                aria-label="Lucky Crystal Maids home"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-crystal-400 to-crystal-600 text-white shadow-lg shadow-crystal-950/30">
                  <Gem className="h-6 w-6" />
                </span>
                <span>
                  <span className="block font-display text-xl font-bold text-white">
                    Lucky Crystal
                  </span>
                  <span className="block text-xs font-bold uppercase tracking-[0.22em] text-crystal-400">
                    Maids
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
                  <ShieldCheck className="h-4 w-4 text-crystal-400" />
                  Clear communication
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-gray-300">
                  <Clock3 className="h-4 w-4 text-crystal-400" />
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
                      className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-gray-300 transition hover:-translate-y-0.5 hover:border-crystal-400/40 hover:bg-crystal-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crystal-400"
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
                      href="tel:0552488588"
                      className="transition hover:text-crystal-300"
                    >
                      055 248 8588
                    </a>
                  }
                />

                <ContactItem
                  icon={MessageCircle}
                  label="WhatsApp"
                  content={
                    <a
                      href="https://wa.me/971552488588"
                      target="_blank"
                      rel="noreferrer"
                      className="transition hover:text-crystal-300"
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
                      href="mailto:Luckycrystaldubai@gmail.com"
                      className="break-all transition hover:text-crystal-300"
                    >
                      Luckycrystaldubai@gmail.com
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
              © {year} Lucky Crystal Maids. All rights reserved.
            </p>

            <div className="flex flex-wrap gap-x-5 gap-y-2">
              <Link
                to="/privacy"
                className="transition hover:text-crystal-300"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="transition hover:text-crystal-300"
              >
                Terms of Service
              </Link>
              <Link
                to="/contact"
                className="transition hover:text-crystal-300"
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
              className="group inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-crystal-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crystal-400"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gray-700 transition group-hover:bg-crystal-400" />
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
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-crystal-400">
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