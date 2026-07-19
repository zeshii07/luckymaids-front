import { Star } from 'lucide-react';

const testimonials = [
  { name: 'Sarah Jenkins', role: 'New York, NY', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80', text: 'Lucky Crystal Maids transformed my apartment! The attention to detail was incredible. Highly recommend their premium service!' },
  { name: 'Michael David', role: 'Los Angeles, CA', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80', text: 'I booked the deep cleaning service before a family event. The team was punctual, professional, and left the house sparkling.' },
  { name: 'Emily Clark', role: 'Chicago, IL', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80', text: 'Using their weekly residential cleaning has changed my life. Coming home to a spotless house is the best feeling. 5 stars!' },
  { name: 'Robert Li', role: 'Houston, TX', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80', text: 'We hired them for our office commercial cleaning. The difference is night and day. The workspace feels so much more welcoming.' },
  { name: 'Jessica Alba', role: 'Miami, FL', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80', text: 'The move-out cleaning was handled perfectly. I got my full deposit back thanks to how spotless they left the apartment!' }
];

export default function Testimonial() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 mb-12 text-center">
        <p className="text-crystal-500 font-semibold mb-2">CLIENT REVIEWS</p>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-800">What Our Clients Say</h2>
      </div>

      {/* Scrolling Marquee Container */}
      <div className="relative w-full">
        {/* Edge gradients for a smooth fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        {/* The scrolling track */}
        <div className="flex gap-8 animate-marquee hover:[animation-play-state:paused] w-max">
          {/* Render testimonials twice for a seamless infinite loop */}
          {[...testimonials, ...testimonials].map((t, index) => (
            <div key={index} className="w-[400px] bg-gray-50 p-8 rounded-3xl border border-gray-100 shadow-sm flex-shrink-0">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"{t.text}"</p>
              <div className="flex items-center space-x-4">
                <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <p className="font-bold text-gray-800">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}