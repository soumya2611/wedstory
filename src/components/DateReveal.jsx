/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import ScratchCard from './ui/ScratchCard';

// Inline Confetti Emitter for celebration (popping from below)
const Confetti = () => {
  const [particles] = useState(() => {
    const colors = [
      '#bf953f', // Classic gold
      '#fcf6ba', // Bright shimmer gold
      '#b38728', // Deep bronze
      '#fbf5b7', // Pale yellow gold
      '#c5a850', // Medium gold
      '#ffffff', // Elegant white contrast
      '#dfb15b'  // Warm amber
    ];
    const shapes = ['rounded-full', 'rotate-45', ''];
    const animations = [
      'confettiBurstLeft',
      'confettiBurstMidLeft',
      'confettiBurstCenter',
      'confettiBurstMidRight',
      'confettiBurstRight'
    ];

    return Array.from({ length: 110 }).map(() => ({
      size: Math.random() * 8 + 6, // 6px to 14px
      left: 35 + Math.random() * 30, // start near the bottom middle (35% to 65% of screen width)
      delay: Math.random() * 0.9, // staggered launch times
      duration: Math.random() * 1.5 + 2.5, // 2.5s to 4s
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.85 + 0.15,
      animationName: animations[Math.floor(Math.random() * animations.length)]
    }));
  });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible z-25 rounded-2xl">
      <style>{`
        @keyframes confettiBurstLeft {
          0% { transform: translateY(20px) translateX(0) scale(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          25% { transform: translateY(-280px) translateX(-90px) scale(1.2) rotate(180deg); opacity: 1; }
          100% { transform: translateY(450px) translateX(-190px) scale(0.4) rotate(720deg); opacity: 0; }
        }
        @keyframes confettiBurstMidLeft {
          0% { transform: translateY(20px) translateX(0) scale(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          25% { transform: translateY(-340px) translateX(-40px) scale(1.2) rotate(180deg); opacity: 1; }
          100% { transform: translateY(450px) translateX(-90px) scale(0.4) rotate(720deg); opacity: 0; }
        }
        @keyframes confettiBurstCenter {
          0% { transform: translateY(20px) translateX(0) scale(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          25% { transform: translateY(-380px) translateX(10px) scale(1.2) rotate(180deg); opacity: 1; }
          100% { transform: translateY(450px) translateX(20px) scale(0.4) rotate(720deg); opacity: 0; }
        }
        @keyframes confettiBurstMidRight {
          0% { transform: translateY(20px) translateX(0) scale(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          25% { transform: translateY(-330px) translateX(50px) scale(1.2) rotate(180deg); opacity: 1; }
          100% { transform: translateY(450px) translateX(100px) scale(0.4) rotate(720deg); opacity: 0; }
        }
        @keyframes confettiBurstRight {
          0% { transform: translateY(20px) translateX(0) scale(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          25% { transform: translateY(-260px) translateX(100px) scale(1.2) rotate(180deg); opacity: 1; }
          100% { transform: translateY(450px) translateX(200px) scale(0.4) rotate(720deg); opacity: 0; }
        }
      `}</style>
      {particles.map((particle, i) => (
        <div
          key={i}
          className={`absolute bottom-0 ${particle.shape}`}
          style={{
            left: `${particle.left}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            animationName: particle.animationName,
            animationDuration: `${particle.duration}s`,
            animationTimingFunction: 'cubic-bezier(0.1, 0.85, 0.25, 1)',
            animationFillMode: 'forwards',
            animationDelay: `${particle.delay}s`,
            opacity: particle.opacity,
          }}
        />
      ))}
    </div>
  );
};

// Stateful Countdown Timer to the Wedding Date
const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate || "2026-07-04T17:00:00") - +new Date();
    let timeLeft;

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-center items-center gap-3 mt-6 animate-scale-in max-w-xs sm:max-w-md mx-auto">
      {/* DAYS */}
      <div className="flex flex-col items-center p-2.5 sm:p-3 rounded-lg border border-gold-800/30 bg-stone-950/70 min-w-[55px] sm:min-w-[70px] shadow-md">
        <span className="text-xl sm:text-3xl font-serif font-bold text-gold-200">
          {String(timeLeft.days).padStart(2, '0')}
        </span>
        <span className="text-[7.5px] sm:text-[9px] font-sans tracking-[0.5px] sm:tracking-[1px] uppercase text-stone-400 mt-1 font-semibold">Days</span>
      </div>

      <span className="text-md sm:text-xl text-gold-500 font-bold -translate-y-1 sm:-translate-y-2 animate-pulse">:</span>

      {/* HOURS */}
      <div className="flex flex-col items-center p-2.5 sm:p-3 rounded-lg border border-gold-800/30 bg-stone-950/70 min-w-[55px] sm:min-w-[70px] shadow-md">
        <span className="text-xl sm:text-3xl font-serif font-bold text-gold-200">
          {String(timeLeft.hours).padStart(2, '0')}
        </span>
        <span className="text-[7.5px] sm:text-[9px] font-sans tracking-[0.5px] sm:tracking-[1px] uppercase text-stone-400 mt-1 font-semibold">Hours</span>
      </div>

      <span className="text-md sm:text-xl text-gold-500 font-bold -translate-y-1 sm:-translate-y-2 animate-pulse">:</span>

      {/* MINUTES */}
      <div className="flex flex-col items-center p-2.5 sm:p-3 rounded-lg border border-gold-800/30 bg-stone-950/70 min-w-[55px] sm:min-w-[70px] shadow-md">
        <span className="text-xl sm:text-3xl font-serif font-bold text-gold-200">
          {String(timeLeft.minutes).padStart(2, '0')}
        </span>
        <span className="text-[7.5px] sm:text-[9px] font-sans tracking-[0.5px] sm:tracking-[1px] uppercase text-stone-400 mt-1 font-semibold">Mins</span>
      </div>

      <span className="text-md sm:text-xl text-gold-500 font-bold -translate-y-1 sm:-translate-y-2 animate-pulse">:</span>

      {/* SECONDS */}
      <div className="flex flex-col items-center p-2.5 sm:p-3 rounded-lg border border-gold-800/30 bg-stone-950/70 min-w-[55px] sm:min-w-[70px] shadow-md">
        <span className="text-xl sm:text-3xl font-serif font-bold text-gold-200">
          {String(timeLeft.seconds).padStart(2, '0')}
        </span>
        <span className="text-[7.5px] sm:text-[9px] font-sans tracking-[0.5px] sm:tracking-[1px] uppercase text-stone-400 mt-1 font-semibold">Secs</span>
      </div>
    </div>
  );
};

const DateReveal = ({ config }) => {
  const [revealedStates, setRevealedStates] = useState({
    month: false,
    day: false,
    year: false,
  });

  const handleReveal = (field) => {
    setRevealedStates((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const isAllRevealed = revealedStates.month && revealedStates.day && revealedStates.year;

  return (
    <section className="relative w-full max-w-4xl mx-auto px-6 py-20 text-center rounded-2xl">
      {/* Background card frame and backdrop blur - isolated from content wrapper */}
      <div className="absolute inset-0 bg-stone-900/60 border border-gold-800/20 rounded-2xl backdrop-blur-md shadow-2xl shadow-black/50 -z-10" />

      {/* Content wrapper with positive z-index to keep everything sharp */}
      <div className="relative z-10">
        {/* Decorative Top Flourish */}
        <div className="flex justify-center items-center mb-6 space-x-2">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold-500" />
          <svg className="w-6 h-6 text-gold-500 animate-sparkle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
          </svg>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gold-500" />
        </div>

        <h2 className="text-3xl md:text-4xl font-serif tracking-[4px] gold-text-gradient mb-3">
          SAVE THE DATE
        </h2>
        <p className="font-sans text-xs md:text-sm tracking-[2px] uppercase mb-12 max-w-md mx-auto text-stone-300 font-medium">
          Scratch the cards to reveal the wedding date
        </p>

        {/* Grid of Scratch Cards (Stacked on mobile, 3 columns on larger screens) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 max-w-3xl mx-auto my-8 sm:my-12 relative px-2 sm:px-4">
          {/* MONTH CARD */}
          <div className={`relative group rounded-xl overflow-hidden shimmer-effect ${
            revealedStates.month ? 'animate-shimmer' : ''
          }`}>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-gold-600 to-gold-800 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-500" />
            <ScratchCard
              title="MONTH"
              subTitle="Scratch to Reveal"
              onComplete={() => handleReveal('month')}
              className="w-full aspect-[4/3] sm:aspect-square border rounded-xl flex items-center justify-center p-2 sm:p-4 relative bg-stone-950 border-gold-800/40 shadow-inner"
            >
              <div className="flex flex-col items-center justify-center h-full text-center select-none">
                <span className="text-[9px] sm:text-xs font-sans tracking-[1.5px] sm:tracking-[3px] text-gold-500/70 mb-1">MONTH</span>
                <span className={`text-xl sm:text-4xl font-serif tracking-[1px] sm:tracking-[2px] font-bold text-gold-100 drop-shadow-[0_1px_3px_rgba(197,168,80,0.4)] ${
                  revealedStates.month ? 'animate-scale-in' : ''
                }`}>
                  {config?.formattedMonth || 'JULY'}
                </span>
                <div className="mt-1 sm:mt-2 text-[8px] sm:text-[9px] font-sans tracking-[0.5px] sm:tracking-[1px] text-stone-400 font-semibold">FRIDAY</div>
              </div>
            </ScratchCard>
          </div>

          {/* DAY CARD */}
          <div className={`relative group rounded-xl overflow-hidden shimmer-effect ${
            revealedStates.day ? 'animate-shimmer' : ''
          }`}>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-gold-600 to-gold-800 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-500" />
            <ScratchCard
              title="DAY"
              subTitle="Scratch to Reveal"
              onComplete={() => handleReveal('day')}
              className="w-full aspect-[4/3] sm:aspect-square border rounded-xl flex items-center justify-center p-2 sm:p-4 relative bg-stone-950 border-gold-800/40 shadow-inner"
            >
              <div className="flex flex-col items-center justify-center h-full text-center select-none">
                <span className="text-[9px] sm:text-xs font-sans tracking-[1.5px] sm:tracking-[3px] text-gold-500/70 mb-1 sm:mb-2">DAY</span>
                <span className={`text-3xl sm:text-5xl font-serif font-extrabold tracking-tight text-gold-200 drop-shadow-[0_1px_4px_rgba(197,168,80,0.4)] ${
                  revealedStates.day ? 'animate-scale-in' : ''
                }`}>
                  {config?.formattedDay || '04'}
                </span>
                {/* Floating Heart Icon */}
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-amber-500/80 mt-1 sm:mt-2 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
            </ScratchCard>
          </div>

          {/* YEAR CARD */}
          <div className={`relative group rounded-xl overflow-hidden shimmer-effect ${
            revealedStates.year ? 'animate-shimmer' : ''
          }`}>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-gold-600 to-gold-800 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-500" />
            <ScratchCard
              title="YEAR"
              subTitle="Scratch to Reveal"
              onComplete={() => handleReveal('year')}
              className="w-full aspect-[4/3] sm:aspect-square border rounded-xl flex items-center justify-center p-2 sm:p-4 relative bg-stone-950 border-gold-800/40 shadow-inner"
            >
              <div className="flex flex-col items-center justify-center h-full text-center select-none">
                <span className="text-[9px] sm:text-xs font-sans tracking-[1.5px] sm:tracking-[3px] text-gold-500/70 mb-1">YEAR</span>
                <span className={`text-xl sm:text-4xl font-serif tracking-[1px] sm:tracking-[2px] font-bold text-gold-100 drop-shadow-[0_1px_3px_rgba(197,168,80,0.4)] ${
                  revealedStates.year ? 'animate-scale-in' : ''
                }`}>
                  {config?.formattedYear || '2026'}
                </span>
                <div className="mt-1 sm:mt-2 text-[8px] sm:text-[9px] font-sans tracking-[0.5px] sm:tracking-[1px] text-stone-400 font-semibold">AUSPICIOUS DAY</div>
              </div>
            </ScratchCard>
          </div>
        </div>

        {/* Confetti Overlay when all elements are revealed */}
        {isAllRevealed && <Confetti />}

        {/* Reveal Message */}
        <div className="mt-8 min-h-[4rem] flex flex-col items-center justify-center px-4">
          {isAllRevealed ? (
            <div className="animate-fade-in space-y-2">
              <p className="text-lg md:text-xl font-serif font-bold tracking-[1.5px] text-gold-100">
                ✨ We Are Getting Married! ✨
              </p>
              <p className="text-xs md:text-sm font-sans max-w-md mx-auto leading-relaxed text-stone-300 font-medium">
                Please join us on {config?.formattedDate || 'Friday, July 4th, 2026'} to celebrate our love, blessings, and lifelong union.
              </p>
              <CountdownTimer targetDate={config?.weddingDate} />
            </div>
          ) : (
            <p className="text-xs md:text-sm font-sans tracking-[1px] italic animate-pulse text-stone-400 font-medium">
              Waiting for all cards to be revealed...
            </p>
          )}
        </div>

        {/* Decorative Bottom Line */}
        <div className="mt-12 flex justify-center items-center">
          <div className="h-[0.5px] w-2/3 bg-gradient-to-r from-transparent via-gold-700/30 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default DateReveal;
