/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useRef } from 'react';
import Cover from './components/Cover';
import Blessings from './components/Blessings';
import DateReveal from './components/DateReveal';
import Envelope from './components/Envelope';
import CoupleProfile from './components/CoupleProfile';
import InvitationLetter from './components/InvitationLetter';
import SideBorders from './components/SideBorders';
import weddingMusic from './assets/music/themesong.mp3';
import lockscreenMusic from './assets/music/lockscreen.mp3';
import bgImage from './assets/wedding_bg.png';
import defaultConfig from './weddingConfig.json';
import AdminDashboard from './components/AdminDashboard';

// Custom Scroll Reveal Component using Intersection Observer
const ScrollReveal = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const currentEl = domRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) {
        observer.unobserve(currentEl);
      }
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-[1200ms] cubic-bezier(0.21, 0.6, 0.35, 1) transform ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-98'
      }`}
    >
      {children}
    </div>
  );
};

// Helper to get ceremony SVG icons based on ID or Title
const getEventIcon = (event) => {
  const id = event.id || '';
  const title = (event.title || '').toLowerCase();
  
  if (id === 'haldi' || title.includes('haldi')) {
    return (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
      </svg>
    );
  }
  if (id === 'sangeet' || title.includes('sangeet') || title.includes('ring') || title.includes('music')) {
    return (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19V6l12-3v13M9 10l12-3M9 14l12-3" />
      </svg>
    );
  }
  if (id === 'wedding' || title.includes('vows') || title.includes('shaadi') || title.includes('marriage') || title.includes('phera')) {
    return (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    );
  }
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );
};

// Wedding Event Timeline Component
const Timeline = ({ events }) => {
  if (!events || events.length === 0) return null;
  
  return (
    <section className="w-full max-w-4xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-serif tracking-[4px] gold-text-gradient mb-3">
          WEDDING SCHEDULE
        </h2>
        <div className="h-[1px] w-24 mx-auto bg-gold-500/30" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {events.map((event, index) => (
          <div
            key={event.id || index}
            className="border transition-all duration-500 rounded-xl p-6 relative overflow-hidden group flex flex-col justify-between bg-stone-900/40 border-gold-800/20 hover:border-gold-500/40 shadow-black/50 hover:shadow-[0_0_20px_rgba(197,168,80,0.1)]"
          >
            {/* Background sparkle effect */}
            <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-gold-500/5 rounded-full blur-2xl group-hover:bg-gold-500/10 transition-all duration-500" />
            
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2.5 border rounded-lg group-hover:scale-110 transition-all duration-300 bg-stone-950 border-gold-600/30 text-gold-400">
                  {getEventIcon(event)}
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold tracking-[1px] text-gold-200 animate-pulse-slow">
                    {event.title}
                  </h3>
                  <div className="text-[10px] font-sans tracking-[1.5px] uppercase text-stone-400">
                    {event.date}
                  </div>
                </div>
              </div>
              <p className="text-xs md:text-sm font-sans leading-relaxed mb-4 text-stone-300">
                {event.desc}
              </p>
            </div>

            <div className="border-t pt-4 mt-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-gold-900/20">
              <div className="flex flex-col">
                <span className="text-[10px] font-sans tracking-[1.5px] uppercase text-gold-500/70 font-semibold">TIME & VENUE</span>
                <span className="text-xs font-sans font-semibold text-gold-100">{event.time}</span>
                <span className="text-xs font-sans italic text-stone-400">{event.venue}</span>
              </div>
              {event.mapUrl && (
                <a
                  href={event.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 border text-xs py-2 px-4 rounded transition-all duration-300 font-sans tracking-[1px] border-gold-500/30 hover:border-gold-500 hover:bg-gold-500 hover:text-stone-950 text-gold-400"
                >
                  <span>Google Map</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};


// RSVP Interactive Form Component
// const RSVP = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     attendance: 'yes',
//     guests: '1',
//     message: '',
//   });
//   const [submitted, setSubmitted] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.name.trim()) return;

//     setLoading(true);
//     // Simulate backend submission delay
//     setTimeout(() => {
//       setLoading(false);
//       setSubmitted(true);
//     }, 1200);
//   };

//   const handleReset = () => {
//     setFormData({
//       name: '',
//       email: '',
//       attendance: 'yes',
//       guests: '1',
//       message: '',
//     });
//     setSubmitted(false);
//   };

//   return (
//     <section className="w-full max-w-2xl mx-auto px-6 py-20">
//       <div className="relative rounded-2xl p-8 md:p-10 overflow-hidden shadow-2xl">
//         {/* Background card frame and backdrop blur - isolated from content wrapper */}
//         <div className="absolute inset-0 bg-stone-900/60 border border-gold-800/20 rounded-2xl backdrop-blur-md shadow-black/50 -z-10" />

//         {/* Content wrapper with positive z-index to isolate form fields from backdrop filter */}
//         <div className="relative z-10">
//           {/* Decorative elements */}
//           <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gold-500/5 to-transparent rounded-full blur-2xl -z-10" />
//           <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-gold-500/5 to-transparent rounded-full blur-2xl -z-10" />

//           <div className="text-center mb-10">
//             <h2 className="text-3xl font-serif tracking-[3px] gold-text-gradient mb-2">
//               R S V P
//             </h2>
//             <p className="font-sans text-[10px] md:text-xs tracking-[2px] uppercase text-stone-400">
//               Kindly respond by July 28, 2026
//             </p>
//           </div>

//           {submitted ? (
//             /* Submission success state card */
//             <div className="text-center py-8 animate-fade-in space-y-6">
//               <svg className="w-16 h-16 text-gold-500 mx-auto animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               <div className="space-y-2">
//                 <h3 className="font-serif text-2xl tracking-[1px] text-gold-200 font-bold">
//                   Blessings Received!
//                 </h3>
//                 <p className="text-sm font-sans max-w-sm mx-auto leading-relaxed text-stone-300">
//                   Thank you for RSVPing. Your warm presence & blessings mean the world to us.
//                 </p>
//               </div>
//               <button
//                 onClick={handleReset}
//                 className="text-xs font-sans text-gold-500 hover:text-gold-300 underline tracking-[1px] uppercase transition-colors"
//               >
//                 Update RSVP / Submit Another Response
//               </button>
//             </div>
//           ) : (
//             /* Interactive RSVP form */
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                 <div className="space-y-2">
//                   <label className="block text-[10px] font-sans tracking-[1.5px] uppercase text-gold-400 font-semibold">
//                     FULL NAME
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     value={formData.name}
//                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                     className="w-full border rounded-lg py-3 px-4 font-sans text-sm transition-all duration-300 focus:outline-none focus:border-gold-500 bg-stone-950 border-gold-800/30 text-gold-100 placeholder-stone-600 focus:ring-1 focus:ring-gold-500"
//                     placeholder="Enter your name"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <label className="block text-[10px] font-sans tracking-[1.5px] uppercase text-gold-400 font-semibold">
//                     EMAIL ADDRESS (OPTIONAL)
//                   </label>
//                   <input
//                     type="email"
//                     value={formData.email}
//                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                     className="w-full border rounded-lg py-3 px-4 font-sans text-sm transition-all duration-300 focus:outline-none focus:border-gold-500 bg-stone-950 border-gold-800/30 text-gold-100 placeholder-stone-600 focus:ring-1 focus:ring-gold-500"
//                     placeholder="Enter email address"
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                 <div className="space-y-2">
//                   <label className="block text-[10px] font-sans tracking-[1.5px] uppercase text-gold-400 font-semibold">
//                     ATTENDANCE STATUS
//                   </label>
//                   <div className="flex space-x-4">
//                     <label className="flex items-center flex-1 justify-center border rounded-lg py-3 px-4 cursor-pointer transition-all duration-300 bg-stone-950 border-gold-800/30 hover:border-gold-600/60">
//                       <input
//                         type="radio"
//                         name="attendance"
//                         value="yes"
//                         checked={formData.attendance === 'yes'}
//                         onChange={() => setFormData({ ...formData, attendance: 'yes' })}
//                         className="accent-gold-500 mr-2"
//                       />
//                       <span className="text-xs font-sans text-stone-200">Will Attend</span>
//                     </label>
//                     <label className="flex items-center flex-1 justify-center border rounded-lg py-3 px-4 cursor-pointer transition-all duration-300 bg-stone-950 border-gold-800/30 hover:border-gold-600/60">
//                       <input
//                         type="radio"
//                         name="attendance"
//                         value="no"
//                         checked={formData.attendance === 'no'}
//                         onChange={() => setFormData({ ...formData, attendance: 'no', guests: '0' })}
//                         className="accent-gold-500 mr-2"
//                       />
//                       <span className="text-xs font-sans text-stone-200">Declines</span>
//                     </label>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <label className="block text-[10px] font-sans tracking-[1.5px] uppercase text-gold-400 font-semibold">
//                     NUMBER OF GUESTS
//                   </label>
//                   <select
//                     disabled={formData.attendance === 'no'}
//                     value={formData.guests}
//                     onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
//                     className="w-full border rounded-lg py-3 px-4 font-sans text-sm transition-all duration-300 focus:outline-none focus:border-gold-500 disabled:opacity-40 disabled:cursor-not-allowed bg-stone-950 border-gold-800/30 text-gold-100"
//                   >
//                     <option value="1">1 Person</option>
//                     <option value="2">2 People</option>
//                     <option value="3">3 People</option>
//                     <option value="4">4 People</option>
//                     <option value="5">5+ People</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <label className="block text-[10px] font-sans tracking-[1.5px] uppercase text-gold-400 font-semibold">
//                   SEND WISHES / BLESSINGS
//                 </label>
//                 <textarea
//                   value={formData.message}
//                   onChange={(e) => setFormData({ ...formData, message: e.target.value })}
//                   rows="3"
//                   className="w-full border rounded-lg py-3 px-4 font-sans text-sm transition-all duration-300 focus:outline-none focus:border-gold-500 resize-none bg-stone-950 border-gold-800/30 text-gold-100 placeholder-stone-600 focus:ring-1 focus:ring-gold-500"
//                   placeholder="Write your wishes here..."
//                 />
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full relative group overflow-hidden bg-gradient-to-r from-gold-600 via-gold-500 to-gold-700 hover:from-gold-500 hover:to-gold-600 text-stone-950 font-bold py-3.5 px-6 rounded-lg text-sm font-sans tracking-[2px] uppercase shadow-[0_4px_15px_rgba(197,168,80,0.2)] hover:shadow-[0_4px_25px_rgba(197,168,80,0.4)] active:scale-98 transition-all duration-300 flex items-center justify-center cursor-pointer"
//               >
//                 {loading ? (
//                   <svg className="animate-spin h-5 w-5 text-stone-950" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                   </svg>
//                 ) : (
//                   'SUBMIT RSVP'
//                 )}
//               </button>
//             </form>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

const resolveStandardTailwindColor = (colorStr) => {
  const colorMap = {
    'black': '#000000',
    'white': '#ffffff',
    'transparent': 'transparent',
    'stone-50': '#fafaf9',
    'stone-100': '#f5f5f4',
    'stone-200': '#e7e5e4',
    'stone-300': '#d6d3d1',
    'stone-400': '#a8a29e',
    'stone-500': '#78716c',
    'stone-600': '#57534e',
    'stone-700': '#44403c',
    'stone-800': '#292524',
    'stone-900': '#1c1917',
    'stone-950': '#0c0a09',
    'slate-900': '#0f172a',
    'slate-950': '#020617',
    'zinc-900': '#18181b',
    'zinc-950': '#09090b',
    'neutral-900': '#171717',
    'neutral-950': '#0a0a0a',
    'indigo-900': '#312e81',
    'indigo-950': '#1e1b4b',
    'cyan-900': '#164e63',
    'cyan-950': '#083344',
    'violet-950': '#2e1065',
    'purple-950': '#3b0764',
    'red-500': '#ef4444',
    'red-950': '#450a0a',
    'yellow-500': '#eab308'
  };
  
  if (colorMap[colorStr]) {
    return colorMap[colorStr];
  }
  
  const match = colorStr.match(/^([a-z]+)-([0-9]+)$/);
  if (match) {
    const family = match[1];
    const shade = match[2];
    const families = {
      slate: { 50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1', 400: '#94a3b8', 500: '#64748b', 600: '#475569', 700: '#334155', 800: '#1e293b', 900: '#0f172a', 950: '#020617' },
      zinc: { 50: '#fafafa', 100: '#f4f4f5', 200: '#e4e4e7', 300: '#d4d4d8', 400: '#a1a1aa', 500: '#71717a', 600: '#52525b', 700: '#3f3f46', 800: '#27272a', 900: '#18181b', 950: '#09090b' },
      neutral: { 50: '#fafafa', 100: '#f5f5f5', 200: '#e5e5e5', 300: '#d4d4d4', 400: '#a3a3a3', 500: '#737373', 600: '#525252', 700: '#404040', 800: '#262626', 900: '#171717', 950: '#0a0a0a' },
      stone: { 50: '#fafaf9', 100: '#f5f5f4', 200: '#e7e5e4', 300: '#d6d3d1', 400: '#a8a29e', 500: '#78716c', 600: '#57534e', 700: '#44403c', 800: '#292524', 900: '#1c1917', 950: '#0c0a09' },
      gray: { 50: '#f9fafb', 100: '#f3f4f6', 200: '#e5e7eb', 300: '#d1d5db', 400: '#9ca3af', 500: '#6b7280', 600: '#4b5563', 700: '#374151', 800: '#1f2937', 900: '#111827', 950: '#030712' },
      red: { 50: '#fef2f2', 100: '#fee2e2', 200: '#fecaca', 300: '#fca5a5', 400: '#f87171', 500: '#ef4444', 600: '#dc2626', 700: '#b91c1c', 800: '#991b1b', 900: '#7f1d1d', 950: '#450a0a' },
      orange: { 50: '#fff7ed', 100: '#ffedd5', 200: '#fed7aa', 300: '#fdba74', 400: '#fb923c', 500: '#f97316', 600: '#ea580c', 700: '#c2410c', 800: '#9a3412', 900: '#7c2d12', 950: '#431407' },
      amber: { 50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a', 300: '#fcd34d', 400: '#fbbf24', 500: '#f59e0b', 600: '#d97706', 700: '#b45309', 800: '#92400e', 900: '#78350f', 950: '#451a03' },
      yellow: { 50: '#fefce8', 100: '#fef9c3', 200: '#fef08a', 300: '#fde047', 400: '#facc15', 500: '#eab308', 600: '#ca8a04', 700: '#a16207', 800: '#854d0e', 900: '#713f12', 950: '#422006' },
      lime: { 50: '#f7fee7', 100: '#ecfccb', 200: '#d9f99d', 300: '#bef264', 400: '#a3e635', 500: '#84cc16', 600: '#65a30d', 700: '#4d7c0f', 800: '#3f6212', 900: '#365314', 950: '#1a2e05' },
      green: { 50: '#f0fdf4', 100: '#dcfce7', 200: '#bbf7d0', 300: '#86efac', 400: '#4ade80', 500: '#22c55e', 600: '#16a34a', 700: '#15803d', 800: '#166534', 900: '#14532d', 950: '#052e16' },
      emerald: { 50: '#ecfdf5', 100: '#d1fae5', 200: '#a7f3d0', 300: '#6ee7b7', 400: '#34d399', 500: '#10b981', 600: '#059669', 700: '#047857', 800: '#065f46', 900: '#064e3b', 950: '#022c22' },
      teal: { 50: '#f0fdfa', 100: '#ccfbf1', 200: '#99f6e4', 300: '#5eead4', 400: '#2dd4bf', 500: '#14b8a6', 600: '#0d9488', 700: '#0f766e', 800: '#115e59', 900: '#134e4a', 950: '#042f2e' },
      cyan: { 50: '#ecfeff', 100: '#cffafe', 200: '#a5f3fc', 300: '#67e8f9', 400: '#22d3ee', 500: '#06b6d4', 600: '#0891b2', 700: '#0e7490', 800: '#155e75', 900: '#164e63', 950: '#083344' },
      sky: { 50: '#f0f9ff', 100: '#e0f2fe', 200: '#bae6fd', 300: '#7dd3fc', 400: '#38bdf8', 500: '#0ea5e9', 600: '#0284c7', 700: '#0369a1', 800: '#075985', 900: '#0c4a6e', 950: '#082f49' },
      blue: { 50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd', 400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 800: '#1e40af', 900: '#1e3a8a', 950: '#172554' },
      indigo: { 50: '#eef2ff', 100: '#e0e7ff', 200: '#c7d2fe', 300: '#a5b4fc', 400: '#818cf8', 500: '#6366f1', 600: '#4f46e5', 700: '#4338ca', 800: '#3730a3', 900: '#312e81', 950: '#1e1b4b' },
      violet: { 50: '#f5f3ff', 100: '#ede9fe', 200: '#ddd6fe', 300: '#c4b5fd', 400: '#a78bfa', 500: '#8b5cf6', 600: '#7c3aed', 700: '#6d28d9', 800: '#5b21b6', 900: '#4c1d95', 950: '#2e1065' },
      purple: { 50: '#faf5ff', 100: '#f3e8ff', 200: '#e9d5ff', 300: '#d8b4fe', 400: '#c084fc', 500: '#a855f7', 600: '#9333ea', 700: '#7e22ce', 800: '#6b21a8', 900: '#581c87', 950: '#3b0764' },
      fuchsia: { 50: '#fdf4ff', 100: '#fae8ff', 200: '#f5d0fe', 300: '#f0abfc', 400: '#e879f9', 500: '#d946ef', 600: '#c026d3', 700: '#a21caf', 800: '#86198f', 900: '#701a75', 950: '#4a044e' },
      pink: { 50: '#fdf2f8', 100: '#fce7f3', 200: '#fbcfe8', 300: '#f472b6', 400: '#f472b6', 500: '#ec4899', 600: '#db2777', 700: '#be185d', 900: '#831843', 950: '#500724' },
      rose: { 50: '#fff1f2', 100: '#ffe4e6', 200: '#fecdd3', 300: '#fda4af', 400: '#fb7185', 500: '#f43f5e', 600: '#e11d48', 700: '#be123c', 800: '#9f1239', 900: '#881337', 950: '#4c051e' }
    };
    if (families[family] && families[family][shade]) {
      return families[family][shade];
    }
  }
  return null;
};

const resolveColor = (color) => {
  if (!color) return '';
  const cleaned = color.trim();
  if (cleaned.startsWith('#') || cleaned.startsWith('rgb') || cleaned.startsWith('hsl')) {
    return cleaned;
  }
  const tailwindResolved = resolveStandardTailwindColor(cleaned);
  if (tailwindResolved) {
    return tailwindResolved;
  }
  return cleaned;
};

const parseTailwindClasses = (classList) => {
  const styles = {};
  if (!classList) return styles;
  const classes = classList.split(/\s+/);
  
  let direction = 'to bottom';
  let fromColor = '';
  let viaColor = '';
  let toColor = '';
  let hasGradient = false;

  classes.forEach(c => {
    if (c.startsWith('bg-')) {
      if (c.startsWith('bg-gradient-to-')) {
        hasGradient = true;
        const dir = c.substring('bg-gradient-to-'.length);
        const dirMap = {
          't': 'to top',
          'b': 'to bottom',
          'l': 'to left',
          'r': 'to right',
          'tl': 'to top left',
          'tr': 'to top right',
          'bl': 'to bottom left',
          'br': 'to bottom right'
        };
        direction = dirMap[dir] || 'to bottom';
      } else {
        const hexMatch = c.match(/^bg-\[([^\]]+)\]$/);
        if (hexMatch) {
          styles.backgroundColor = hexMatch[1];
        } else {
          const colorName = c.substring(3);
          const resolvedColor = resolveColor(colorName);
          if (resolvedColor) {
            styles.backgroundColor = resolvedColor;
          }
        }
      }
    }
    
    if (c.startsWith('from-')) {
      const hexMatch = c.match(/^from-\[([^\]]+)\]$/);
      if (hexMatch) {
        fromColor = hexMatch[1];
      } else {
        fromColor = resolveColor(c.substring(5)) || '';
      }
    }
    if (c.startsWith('via-')) {
      const hexMatch = c.match(/^via-\[([^\]]+)\]$/);
      if (hexMatch) {
        viaColor = hexMatch[1];
      } else {
        viaColor = resolveColor(c.substring(4)) || '';
      }
    }
    if (c.startsWith('to-')) {
      const hexMatch = c.match(/^to-\[([^\]]+)\]$/);
      if (hexMatch) {
        toColor = hexMatch[1];
      } else {
        toColor = resolveColor(c.substring(3)) || '';
      }
    }
  });

  if (hasGradient && fromColor) {
    if (viaColor) {
      if (toColor) {
        styles.backgroundImage = `linear-gradient(${direction}, ${fromColor}, ${viaColor}, ${toColor})`;
      } else {
        styles.backgroundImage = `linear-gradient(${direction}, ${fromColor}, ${viaColor})`;
      }
    } else if (toColor) {
      styles.backgroundImage = `linear-gradient(${direction}, ${fromColor}, ${toColor})`;
    } else {
      styles.backgroundImage = `linear-gradient(${direction}, ${fromColor}, transparent)`;
    }
  }

  return styles;
};

const parseBgCssToStyle = (input, customBgColor) => {
  const resolvedBgColor = resolveColor(customBgColor) || '#0a0a0a';
  const styles = {
    backgroundColor: resolvedBgColor
  };

  if (!input) return styles;
  const cleaned = input.trim();

  const stripQuotes = (str) => {
    let s = str.trim();
    // Strip surrounding quotes
    if ((s.startsWith('`') && s.endsWith('`')) || 
        (s.startsWith('"') && s.endsWith('"')) || 
        (s.startsWith("'") && s.endsWith("'"))) {
      s = s.substring(1, s.length - 1);
    }
    // Handle escaped quotes
    if ((s.startsWith('\\"') && s.endsWith('\\"')) || 
        (s.startsWith("\\'") && s.endsWith("\\'"))) {
      s = s.substring(2, s.length - 2);
    }
    return s.trim();
  };

  const isHtmlOrJsx = cleaned.includes('<') || cleaned.includes('style={{') || cleaned.includes('className=');

  if (isHtmlOrJsx) {
    const bgImgMatch = cleaned.match(/backgroundImage\s*:\s*(`[\s\S]*?`|'[\s\S]*?'|"[\s\S]*?"|[^,}]+)/);
    const bgMatch = cleaned.match(/background\s*:\s*(`[\s\S]*?`|'[\s\S]*?'|"[\s\S]*?"|[^,}]+)/);
    const bgColorMatch = cleaned.match(/backgroundColor\s*:\s*(`[\s\S]*?`|'[\s\S]*?'|"[\s\S]*?"|[^,}]+)/);

    let foundBg = '';
    if (bgImgMatch) {
      foundBg = stripQuotes(bgImgMatch[1]);
    } else if (bgMatch) {
      foundBg = stripQuotes(bgMatch[1]);
    }

    if (foundBg) {
      styles.backgroundImage = foundBg;
      styles.background = foundBg;
    }

    if (bgColorMatch) {
      styles.backgroundColor = resolveColor(stripQuotes(bgColorMatch[1]));
    }

    const classMatch = cleaned.match(/className\s*=\s*["']([^"']*)["']/);
    if (classMatch) {
      const classes = classMatch[1];
      const hexMatch = classes.match(/bg-\[([^\]]+)\]/);
      if (hexMatch) {
        styles.backgroundColor = hexMatch[1];
      }
      
      const tailwindStyles = parseTailwindClasses(classes);
      if (tailwindStyles.backgroundImage) {
        styles.backgroundImage = tailwindStyles.backgroundImage;
        styles.background = tailwindStyles.backgroundImage;
      }
      if (tailwindStyles.backgroundColor) {
        styles.backgroundColor = tailwindStyles.backgroundColor;
      }
    }

    if (styles.backgroundImage) {
      return styles;
    }
  }

  // Treat as CSS declarations
  const cssBgImgMatch = cleaned.match(/background-image\s*:\s*([\s\S]*?)(?:;|$)/i);
  const cssBgMatch = cleaned.match(/background\s*:\s*([\s\S]*?)(?:;|$)/i);
  const cssBgColorMatch = cleaned.match(/background-color\s*:\s*([\s\S]*?)(?:;|$)/i);

  let foundCssBg = '';
  if (cssBgImgMatch) {
    foundCssBg = stripQuotes(cssBgImgMatch[1].trim());
  } else if (cssBgMatch) {
    foundCssBg = stripQuotes(cssBgMatch[1].trim());
  }

  if (foundCssBg) {
    styles.backgroundImage = foundCssBg;
    styles.background = foundCssBg;
  }

  if (cssBgColorMatch) {
    styles.backgroundColor = resolveColor(stripQuotes(cssBgColorMatch[1].trim()));
  }

  if (styles.backgroundImage) {
    return styles;
  }

  // Check if it's a space-separated list of Tailwind CSS class names
  const isClassList = !cleaned.includes(';') && !cleaned.includes(':') && !cleaned.includes('(');
  if (isClassList) {
    const tailwindStyles = parseTailwindClasses(cleaned);
    if (tailwindStyles.backgroundImage) {
      styles.backgroundImage = tailwindStyles.backgroundImage;
      styles.background = tailwindStyles.backgroundImage;
    }
    if (tailwindStyles.backgroundColor) {
      styles.backgroundColor = tailwindStyles.backgroundColor;
    }
    if (styles.backgroundImage || styles.backgroundColor) {
      return styles;
    }
  }

  // Fallback: treat the entire string as the raw value of the gradient / image
  const rawBg = stripQuotes(cleaned);
  styles.backgroundImage = rawBg;
  styles.background = rawBg;
  return styles;
};

// Main App Assembler
function App() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAutoPlayPrompt, setShowAutoPlayPrompt] = useState(false);
  const [showEnvelope, setShowEnvelope] = useState(true);

  // Routing and Configuration State
  const [hash, setHash] = useState(window.location.hash);
  
  const getInitialConfig = () => {
    try {
      const preview = localStorage.getItem('wedding_invitation_config_preview');
      if (preview) {
        return JSON.parse(preview);
      }
      const saved = localStorage.getItem('wedding_invitation_config');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to parse config from localStorage:", e);
    }
    return defaultConfig;
  };

  const [config, setConfig] = useState(getInitialConfig());

  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash);
      setConfig(getInitialConfig());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    setConfig(getInitialConfig());
  }, [hash]);

  useEffect(() => {
    document.title = config?.pageTitle || 'Wedding Invitation';
  }, [config?.pageTitle]);

  const handleSaveConfig = (newConfig) => {
    setConfig(newConfig);
    localStorage.setItem('wedding_invitation_config', JSON.stringify(newConfig));
    localStorage.removeItem('wedding_invitation_config_preview');
  };

  // Play lockscreen music on mount/user interaction while envelope is visible
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentLockscreen) return;

    const playLockscreenMusic = () => {
      // Only play lockscreen music if envelope is still visible and not already playing
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.log('Autoplay blocked for lockscreen music:', err);
          });
      }
    };

    // Try playing immediately
    playLockscreenMusic();

    // Fallback: trigger playback on first user interaction with the screen
    const handleInteraction = () => {
      playLockscreenMusic();
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, [hash]); // Re-run when switching back from admin dashboard

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const activeSrc = showEnvelope ? currentLockscreen : currentThemesong;
    if (!activeSrc) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play()
        .then(() => {
          setIsPlaying(true);
          setShowAutoPlayPrompt(false);
        })
        .catch((err) => {
          console.log('Playback blocked or failed:', err);
          setShowAutoPlayPrompt(true);
        });
    }
  };

  const handleUnlockInvitation = () => {
    const audio = audioRef.current;
    if (audio && audio.paused) {
      audio.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.log('Unlock audio playback failed:', err);
        });
    }
  };

  const handleOpenInvitation = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      if (currentThemesong) {
        audio.src = currentThemesong;
        audio.loop = true;
        audio.load();
        audio.play()
          .then(() => {
            setIsPlaying(true);
            setShowAutoPlayPrompt(false);
          })
          .catch((err) => {
            console.log('Wedding music autoplay blocked:', err);
            setShowAutoPlayPrompt(true);
          });
      } else {
        setIsPlaying(false);
        setShowAutoPlayPrompt(false);
      }
    }
    // Remove envelope from DOM after sliding animation completes (2000ms to allow whirlpool fadeout)
    setTimeout(() => {
      setShowEnvelope(false);
    }, 2000);
  };

  // Render Admin Dashboard Route
  if (hash === '#/admin') {
    return <AdminDashboard initialConfig={config} onSaveConfig={handleSaveConfig} />;
  }

  const isLockscreenEnabled = config?.music?.lockscreenEnabled !== false;
  const isThemesongEnabled = config?.music?.themesongEnabled !== false;

  const currentLockscreen = isLockscreenEnabled 
    ? (config.music?.lockscreen || lockscreenMusic) 
    : '';

  const currentThemesong = isThemesongEnabled 
    ? (config.music?.themesong || weddingMusic) 
    : '';

  const currentBgImage = config.bgImage || bgImage;

  const isTailwindBg = config.customBgCss && 
    !config.customBgCss.includes('(') && 
    !config.customBgCss.includes('{') && 
    !config.customBgCss.includes(':');

  const customBgStyle = config.customBgCss
    ? parseBgCssToStyle(config.customBgCss, config.customBgColor)
    : {
        backgroundImage: `url(${currentBgImage})`
      };

  const hasEnvelopeMusic = isLockscreenEnabled && !!currentLockscreen;
  const hasThemesongMusic = isThemesongEnabled && !!currentThemesong;

  return (
    <div 
      className="relative min-h-screen text-stone-200 overflow-x-hidden selection:bg-gold-500 selection:text-stone-950"
      style={{ backgroundColor: resolveColor(config.customBgColor) || '#0c0a09' }}
    >
      {/* Envelope Opening Gatekeeper Overlay */}
      {showEnvelope && (
        <Envelope
          config={config}
          onUnlock={handleUnlockInvitation}
          onOpen={handleOpenInvitation}
          hasEnvelopeMusic={hasEnvelopeMusic}
        />
      )}

      {/* Background Music Audio Element (Starts with lockscreen loops) */}
      <audio ref={audioRef} src={currentLockscreen} loop preload="auto" />

      {/* Ornate Traditional Side Borders (Left and Right Viewport Edges) */}
      <SideBorders />

      {/* Hero Cover Section */}
      <Cover
        config={config}
        isPlaying={isPlaying}
        togglePlay={togglePlay}
        showAutoPlayPrompt={showAutoPlayPrompt}
        customBgStyle={customBgStyle}
        isTailwindBg={isTailwindBg}
        hasMusic={hasThemesongMusic}
      />

      {/* Scrollable Content Container with Blurry Dark Background */}
      <div className="relative z-10 pb-24 overflow-hidden isolate">
        {/* Custom background pattern or blurry image layer */}
        <div
          className={`absolute inset-0 -z-10 translate-z-0 ${
            config.customBgCss 
              ? (isTailwindBg ? config.customBgCss : '') 
              : 'bg-cover bg-center bg-no-repeat blur-[16px] scale-110 opacity-60'
          }`}
          style={customBgStyle}
        />
        {/* Dark charcoal overlay layer to ensure text readability */}
        <div 
          className="absolute inset-0 bg-stone-950 -z-10" 
          style={{ opacity: config.customBgCss ? 0.35 : 0.85 }}
        />

        {/* Couple Profile Section */}
        <ScrollReveal>
          <CoupleProfile config={config} />
        </ScrollReveal>

        {/* Blessings Section */}
        <ScrollReveal>
          <Blessings config={config} />
        </ScrollReveal>

        {/* Invitation Letter Section */}
        <ScrollReveal>
          <InvitationLetter config={config} />
        </ScrollReveal>

        {/* Date Reveal Section */}
        <ScrollReveal>
          <DateReveal config={config} />
        </ScrollReveal>

        {/* Event Schedule Timeline Section */}
        <ScrollReveal>
          <Timeline events={config.events} />
        </ScrollReveal>

        {/* RSVP Section */}
        {/* <ScrollReveal>
          <RSVP />
        </ScrollReveal> */}

        {/* Footer Credit */}
        <footer className="text-center pt-16 pb-8 px-4 text-[25px] font-sans tracking-[2px] uppercase select-none text-stone-500">
          {config.credit}
        </footer>
        <footer className="text-center pt-25 pb-2 px-4 text-[9px] font-sans tracking-[10px] uppercase select-none text-stone-500">
          {config.footerCreditCopy}
        </footer>
      </div>
    </div>
  );
}


export default App;
