import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function RelatedServices({ services, intro }) {
  return (
    <section className="bg-gray-50 py-16 sm:py-20" aria-labelledby="related-services-title">
      <div className="container mx-auto max-w-6xl px-5 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-crystal-600">You may also need</span>
          <h2 id="related-services-title" className="mt-3 font-display text-3xl font-bold text-gray-900 md:text-4xl">Explore Related Services</h2>
          <p className="mt-5 text-lg leading-7 text-gray-600">{intro}</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {services.map((service) => (
            <article key={service.to} className="flex flex-col rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-crystal-200 hover:shadow-lg">
              <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
              <p className="mt-3 flex-1 leading-7 text-gray-600">{service.description}</p>
              <Link to={service.to} className="mt-6 inline-flex items-center gap-2 font-bold text-crystal-600 transition hover:text-crystal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crystal-500 focus-visible:ring-offset-4">
                {service.linkText}<ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
