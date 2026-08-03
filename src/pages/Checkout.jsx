import { useMemo, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Lock, ArrowLeft, Trash2, MapPin, Calendar, Clock, User, Phone, Mail, Banknote, X, Loader2, ShieldCheck, ShoppingBag, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

const API_URL = 'https://lucky-backend-woad.vercel.app/api/booking';
const inputClass = 'w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-crystal-500 focus:ring-4 focus:ring-crystal-100';

export default function Checkout() {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const { cartItems, cartTotal, clearCart, removeFromCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({ name: '', phone: '', email: '', address: '', mapLink: '', date: '', time: '' });

  const minimumDate = useMemo(() => new Date().toISOString().split('T')[0], []);
  const handleChange = ({ target }) => setBookingDetails(current => ({ ...current, [target.name]: target.value }));

  const handlePayment = async (event) => {
    event.preventDefault();
    if (isProcessing) return;
    setIsProcessing(true);
    setError(null);
    try {
      const response = await fetch(API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items: cartItems, totalAmount: cartTotal, customer: bookingDetails, paymentMethod: 'cash' }) });
      if (!response.ok) throw new Error('Unable to complete booking');
      const state = { totalAmount: cartTotal, items: [...cartItems], customer: { ...bookingDetails }, paymentMethod: 'cash' };
      clearCart();
      navigate('/booking-confirmation', { state });
    } catch {
      setError('We could not submit your booking. Please check your connection and try again.');
      setIsProcessing(false);
    }
  };

  if (!cartItems.length) return <main className="grid min-h-screen place-items-center bg-gray-50 px-6 pt-24"><div className="max-w-md text-center"><span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-crystal-100 text-crystal-600"><ShoppingBag className="h-9 w-9" /></span><h1 className="mt-6 text-3xl font-bold text-gray-900">Your cart is empty</h1><p className="mt-3 text-gray-600">Please select a service before checking out.</p><Link to="/services" className="mt-8 inline-flex rounded-full bg-crystal-600 px-7 py-3.5 font-bold text-white hover:bg-crystal-700">Browse Services</Link></div></main>;

  const reveal = reduceMotion ? {} : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.35 } };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-crystal-50 pb-24 pt-28">
      <Helmet><title>Checkout | Lucky Crystal Maids</title><meta name="description" content="Complete your Lucky Crystal Maids booking securely online." /></Helmet>
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <Link to="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-crystal-600"><ArrowLeft className="h-4 w-4" /> Continue shopping</Link>
        <motion.header {...reveal} className="my-8"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><span className="inline-flex items-center gap-2 rounded-full border border-crystal-200 bg-white px-4 py-2 text-sm font-semibold text-crystal-700"><Lock className="h-4 w-4" /> Secure booking</span><h1 className="mt-4 text-4xl font-display font-bold text-gray-900">Complete your booking</h1><p className="mt-3 text-gray-600">Add your contact details and preferred service time.</p></div><div className="rounded-2xl bg-white px-5 py-3 text-sm shadow-sm ring-1 ring-gray-200"><span className="text-gray-500">{cartItems.length} item{cartItems.length > 1 ? 's' : ''}</span><strong className="ml-3 text-crystal-700">{cartTotal} AED</strong></div></div></motion.header>

        <form onSubmit={handlePayment} className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-6">
            <motion.section {...reveal} className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8"><div className="mb-6 flex items-center justify-between"><div><p className="text-sm font-semibold uppercase tracking-widest text-crystal-600">Order</p><h2 className="mt-1 text-2xl font-bold text-gray-900">Your selected services</h2></div></div><div className="space-y-3">{cartItems.map(item => <article key={item.cartId} className="relative flex items-start justify-between gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-4 pr-12"><div><h3 className="font-bold text-gray-900">{item.service}</h3><p className="mt-1 text-sm leading-6 text-gray-500">{item.isCustom ? item.customDetails : item.isPackage ? 'Flat Package Rate' : `${item.hours}h × ${item.crew} crew (${item.ratePerHour} AED/hr)${item.materials ? ' + Materials' : ''}`}</p></div><strong className="whitespace-nowrap text-crystal-700">{item.isCustom ? 'TBD' : `${item.totalAmount} AED`}</strong><button type="button" onClick={() => removeFromCart(item.cartId)} aria-label={`Remove ${item.service}`} className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full text-gray-400 hover:bg-red-50 hover:text-red-600"><Trash2 className="h-4 w-4" /></button></article>)}</div></motion.section>

            <motion.section {...reveal} className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8"><div className="mb-6 flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-crystal-100 text-crystal-600"><MapPin className="h-5 w-5" /></span><div><p className="text-sm font-semibold uppercase tracking-widest text-crystal-600">Contact</p><h2 className="text-2xl font-bold text-gray-900">Contact & location details</h2></div></div><div className="grid gap-5 md:grid-cols-2">
              <label className="text-sm font-semibold text-gray-700">Full Name *<div className="relative mt-2"><User className="absolute left-3.5 top-4 h-5 w-5 text-gray-400" /><input className={`${inputClass} pl-11`} autoComplete="name" name="name" value={bookingDetails.name} onChange={handleChange} required placeholder="John Doe" /></div></label>
              <label className="text-sm font-semibold text-gray-700">Phone Number *<div className="relative mt-2"><Phone className="absolute left-3.5 top-4 h-5 w-5 text-gray-400" /><input className={`${inputClass} pl-11`} autoComplete="tel" inputMode="tel" type="tel" name="phone" value={bookingDetails.phone} onChange={handleChange} required placeholder="+971 50 123 4567" /></div></label>
              <label className="text-sm font-semibold text-gray-700 md:col-span-2">Email Address *<div className="relative mt-2"><Mail className="absolute left-3.5 top-4 h-5 w-5 text-gray-400" /><input className={`${inputClass} pl-11`} autoComplete="email" type="email" name="email" value={bookingDetails.email} onChange={handleChange} required placeholder="john@example.com" /></div></label>
              <label className="text-sm font-semibold text-gray-700 md:col-span-2">Full Address *<textarea className={`${inputClass} mt-2 min-h-24 resize-y`} autoComplete="street-address" name="address" value={bookingDetails.address} onChange={handleChange} required placeholder="Building, apartment, street and area" /></label>
              <label className="text-sm font-semibold text-gray-700 md:col-span-2">Google Maps Location Link <span className="font-normal text-gray-400">(optional)</span><input className={`${inputClass} mt-2`} type="url" name="mapLink" value={bookingDetails.mapLink} onChange={handleChange} placeholder="https://maps.app.goo.gl/..." /></label>
            </div></motion.section>

            <motion.section {...reveal} className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8"><div className="mb-6 flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-crystal-100 text-crystal-600"><Calendar className="h-5 w-5" /></span><div><p className="text-sm font-semibold uppercase tracking-widest text-crystal-600">Schedule</p><h2 className="text-2xl font-bold text-gray-900">Choose your preferred time</h2></div></div><div className="grid gap-5 md:grid-cols-2"><label className="text-sm font-semibold text-gray-700">Preferred Date *<input className={`${inputClass} mt-2`} min={minimumDate} type="date" name="date" value={bookingDetails.date} onChange={handleChange} required /></label><label className="text-sm font-semibold text-gray-700">Preferred Time *<input className={`${inputClass} mt-2`} type="time" name="time" value={bookingDetails.time} onChange={handleChange} required /></label></div></motion.section>

            <motion.section {...reveal} className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8"><div className="flex items-start gap-4"><span className="grid h-12 w-12 flex-none place-items-center rounded-2xl bg-green-100 text-green-700"><Banknote className="h-6 w-6" /></span><div><h2 className="text-xl font-bold text-gray-900">Cash on service</h2><p className="mt-2 text-sm leading-6 text-gray-600">Please have the exact amount ready when our cleaning crew arrives. You will receive a digital receipt upon completion.</p><span className="mt-4 inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">Card payments coming soon</span></div></div></motion.section>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start"><div className="rounded-3xl bg-gray-950 p-6 text-white shadow-2xl sm:p-8"><h2 className="text-xl font-bold">Booking summary</h2><dl className="mt-6 space-y-4 border-b border-white/10 pb-6 text-sm"><div className="flex justify-between"><dt className="text-gray-400">Subtotal</dt><dd>{cartTotal} AED</dd></div><div className="flex justify-between"><dt className="text-gray-400">Payment</dt><dd>Cash on service</dd></div></dl><div className="mt-6 flex items-end justify-between"><span className="font-bold">Total</span><span className="text-3xl font-bold text-crystal-400">{cartTotal} AED</span></div><button type="submit" disabled={isProcessing} className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-crystal-500 px-5 py-4 text-lg font-bold text-white transition hover:bg-crystal-400 disabled:cursor-wait disabled:opacity-70">{isProcessing ? <><Loader2 className="h-5 w-5 animate-spin" /> Confirming...</> : cartTotal === 0 ? 'Submit Request' : `Confirm Booking (${cartTotal} AED)`}</button>{error && <div role="alert" className="mt-4 rounded-xl bg-red-500/10 p-4 text-sm text-red-200"><div className="flex items-start gap-3"><AlertCircle className="mt-0.5 h-5 w-5 flex-none" /><span>{error}</span><button type="button" onClick={() => setError(null)} aria-label="Dismiss error" className="ml-auto"><X className="h-4 w-4" /></button></div></div>}<div className="mt-6 flex gap-3 rounded-2xl bg-white/5 p-4 text-xs leading-5 text-gray-300"><ShieldCheck className="h-5 w-5 flex-none text-crystal-400" /><span>By confirming, you agree to our Terms of Service and Cancellation Policy.</span></div></div></aside>
        </form>
      </div>
    </main>
  );
}
