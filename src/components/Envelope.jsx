import { useState, useEffect } from 'react';

// Floating Golden Dust Particle Field
const GoldDust = () => {
  const [particles] = useState(() => 
    Array.from({ length: 30 }).map(() => ({
      left: Math.random() * 100,
      bottom: Math.random() * 20,
      size: Math.random() * 3.5 + 1.5, // 1.5px to 5px
      delay: Math.random() * 6,
      duration: Math.random() * 8 + 6, // 6s to 14s
      opacity: Math.random() * 0.4 + 0.3,
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      <style>{`
        @keyframes floatDust {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(-90vh) translateX(30px); opacity: 0; }
        }
      `}</style>
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute bg-gradient-to-br from-gold-200 to-gold-500 rounded-full"
          style={{
            left: `${p.left}%`,
            bottom: `${p.bottom}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animation: `floatDust ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
            boxShadow: '0 0 6px rgba(250, 247, 221, 0.5)',
          }}
        />
      ))}
    </div>
  );
};

/**
 * Envelope Component (Gatekeeper Opening Transition)
 * @param {Object} props
 * @param {function} props.onUnlock - Callback triggered immediately on click to play lockscreen music and unlock audio context
 * @param {function} props.onOpen - Callback triggered when the invitation opens (after the 10s countdown)
 */
const Envelope = ({ config, onUnlock, onOpen, hasEnvelopeMusic }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [isUnmounted, setIsUnmounted] = useState(false);
  const [showWhirlpool, setShowWhirlpool] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [progress, setProgress] = useState(0);

  // Disable body scrolling when envelope is mounted
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleOpenClick = () => {
    if (isUnlocking || isOpening) return;

    if (!hasEnvelopeMusic) {
      setIsOpening(true);
      setShowWhirlpool(true);

      if (onOpen) {
        onOpen();
      }

      setTimeout(() => {
        setIsOpened(true);
      }, 600);

      setTimeout(() => {
        setIsUnmounted(true);
      }, 2000);
      
      return;
    }

    setIsUnlocking(true);

    // Play lockscreen audio immediately on click to guarantee context is unlocked by a user gesture
    if (onUnlock) {
      onUnlock();
    }

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 1;
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
        setIsOpening(true);
        setShowWhirlpool(true);

        // Switch to wedding music
        if (onOpen) {
          onOpen();
        }

        setTimeout(() => {
          setIsOpened(true);
        }, 600);

        setTimeout(() => {
          setIsUnmounted(true);
        }, 2000);
      }
    }, 100); // 100ms * 100 = 10000ms (10 seconds)
  };

  if (isUnmounted) return null;

  const envelopeBgStyle = config?.envelopeBg
    ? {
        backgroundImage: `url(${config.envelopeBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }
    : {};

  return (
    <div
      className={`fixed inset-0 z-55 flex items-center justify-center overflow-hidden bg-stone-950 transition-opacity duration-1000 ${
        isOpened ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={envelopeBgStyle}
    >
      {/* Floating Golden Dust Particles (Palace courtyard atmosphere) */}
      <GoldDust />

      {/* Decorative Fixed Hanging Marigold Garland (Toran) */}
      <div className="fixed top-0 left-0 right-0 h-20 sm:h-28 z-30 pointer-events-none overflow-hidden animate-sway">
        <svg className="w-full h-full text-gold-500" viewBox="0 0 1200 120" preserveAspectRatio="none" fill="currentColor">
          {/* Main swag loops of alternating yellow and orange marigolds */}
          <path d="M 0,20 Q 75,55 150,20 Q 225,55 300,20 Q 375,55 450,20 Q 525,55 600,20 Q 675,55 750,20 Q 825,55 900,20 Q 975,55 1050,20 Q 1125,55 1200,20" fill="none" stroke="#f59e0b" strokeWidth="8" strokeLinecap="round" strokeDasharray="1 14" />
          <path d="M 0,20 Q 75,55 150,20 Q 225,55 300,20 Q 375,55 450,20 Q 525,55 600,20 Q 675,55 750,20 Q 825,55 900,20 Q 975,55 1050,20 Q 1125,55 1200,20" fill="none" stroke="#ea580c" strokeWidth="8" strokeLinecap="round" strokeDasharray="1 14" strokeDashoffset="7" />
          
          {/* Secondary smaller inner swag loop */}
          <path d="M 0,20 Q 75,40 150,20 Q 225,40 300,20 Q 375,40 450,20 Q 525,40 600,20 Q 675,40 750,20 Q 825,40 900,20 Q 975,40 1050,20 Q 1125,40 1200,20" fill="none" stroke="#eab308" strokeWidth="5" strokeLinecap="round" strokeDasharray="1 11" strokeDashoffset="3" />

          {/* Programmatic Mango Leaves and hanging drop strings */}
          {Array.from({ length: 9 }).map((_, i) => {
            const x = i * 150;
            return (
              <g key={i}>
                {/* Vertical hanging drop string */}
                <line x1={x} y1="20" x2={x} y2="85" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" strokeDasharray="1 10" />
                <line x1={x} y1="20" x2={x} y2="85" stroke="#ea580c" strokeWidth="5" strokeLinecap="round" strokeDasharray="1 10" strokeDashoffset="5" />
                
                {/* Green Mango Leaf at the top node */}
                <path
                  d={`M ${x},20 C ${x - 7},32 ${x - 5},52 ${x},60 C ${x + 5},52 ${x + 7},32 ${x},20`}
                  fill="#15803d"
                />
                {/* Green Mango Leaf at the bottom drop node */}
                <path
                  d={`M ${x},85 C ${x - 5},95 ${x - 3},107 ${x},115 C ${x + 3},107 ${x + 5},95 ${x},85`}
                  fill="#166534"
                />
                
                {/* Red center flower buds */}
                <circle cx={x} cy="20" r="5" fill="#dc2626" />
                <circle cx={x} cy="20" r="2.5" fill="#f59e0b" />

                {/* Golden brass bell at the tip of the hanging drop */}
                <path
                  d={`M ${x - 4},115 L ${x + 4},115 L ${x + 2.5},110 L ${x - 2.5},110 Z`}
                  fill="#facc15"
                />
                <circle cx={x} cy="117" r="1.5" fill="#eab308" />
              </g>
            );
          })}
        </svg>
      </div>



      {/* LEFT PALACE DOOR */}
      <div
        className={`absolute left-0 top-0 w-1/2 h-full border-r border-stone-800 transition-transform duration-[1200ms] ease-in-out z-20 overflow-hidden ${
          isOpened ? '-translate-x-full' : 'translate-x-0'
        }`}
        style={{
          backgroundImage: config?.envelopeBg ? `url(${config.envelopeBg})` : 'none',
          backgroundSize: '200% 100%',
          backgroundPosition: 'left center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#0e0d0c'
        }}
      >
        {/* Inset Gold Panel Frames */}
        <div className="absolute inset-4 sm:inset-6 border border-gold-800/20 rounded-xl pointer-events-none z-10" />
        <div className="absolute inset-[20px] sm:inset-[28px] border border-gold-900/10 rounded-lg pointer-events-none z-10" />

        {/* Panel Line Accents */}
        <div className="absolute left-0 right-0 top-1/4 h-[0.5px] bg-gold-900/10 z-10" />
        <div className="absolute left-0 right-0 top-3/4 h-[0.5px] bg-gold-900/10 z-10" />

        {/* Brass Ring Handle / Lion Knocker */}
        <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-25 pointer-events-none">
          <svg className="w-10 h-10 sm:w-14 sm:h-14 text-gold-500/80 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]" viewBox="0 0 40 40" fill="none" stroke="currentColor">
            <circle cx="20" cy="18" r="8" fill="currentColor" fillOpacity="0.15" strokeWidth="1" />
            <circle cx="20" cy="18" r="2.5" fill="currentColor" />
            <circle cx="20" cy="27" r="9" strokeWidth="2" />
            <rect x="19" y="18" width="2" height="6" fill="currentColor" />
          </svg>
        </div>

        {/* Rotating Gold Mandala - Left Half */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-72 h-72 sm:w-96 sm:h-96 pointer-events-none opacity-20 select-none text-gold-500/80">
          <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <circle cx="50" cy="50" r="45" strokeWidth="0.5" strokeDasharray="3 3" />
            <circle cx="50" cy="50" r="35" strokeWidth="0.75" />
            <circle cx="50" cy="50" r="25" strokeWidth="0.5" />
            {Array.from({ length: 24 }).map((_, i) => (
              <line
                key={i}
                x1="50"
                y1="50"
                x2={50 + 45 * Math.cos((i * Math.PI) / 12)}
                y2={50 + 45 * Math.sin((i * Math.PI) / 12)}
                strokeWidth="0.25"
              />
            ))}
          </svg>
        </div>

        {/* Elegant Traditional Corner Art Scroll (Bottom Left) */}
        <div className="absolute left-6 bottom-6 w-16 h-16 pointer-events-none opacity-25 select-none text-gold-500/80">
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M 10,90 Q 20,50 50,40" />
            <path d="M 10,90 Q 50,20 60,10" />
            <path d="M 10,90 Q 80,80 90,60" />
            <circle cx="50" cy="40" r="2" fill="currentColor" />
            <circle cx="60" cy="10" r="2" fill="currentColor" />
            <circle cx="90" cy="60" r="2" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* RIGHT PALACE DOOR */}
      <div
        className={`absolute right-0 top-0 w-1/2 h-full border-l border-stone-800 transition-transform duration-[1200ms] ease-in-out z-20 overflow-hidden ${
          isOpened ? 'translate-x-full' : 'translate-x-0'
        }`}
        style={{
          backgroundImage: config?.envelopeBg ? `url(${config.envelopeBg})` : 'none',
          backgroundSize: '200% 100%',
          backgroundPosition: 'right center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#0e0d0c'
        }}
      >
        {/* Inset Gold Panel Frames */}
        <div className="absolute inset-4 sm:inset-6 border border-gold-800/20 rounded-xl pointer-events-none z-10" />
        <div className="absolute inset-[20px] sm:inset-[28px] border border-gold-900/10 rounded-lg pointer-events-none z-10" />

        {/* Panel Line Accents */}
        <div className="absolute left-0 right-0 top-1/4 h-[0.5px] bg-gold-900/10 z-10" />
        <div className="absolute left-0 right-0 top-3/4 h-[0.5px] bg-gold-900/10 z-10" />

        {/* Brass Ring Handle / Lion Knocker */}
        <div className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-25 pointer-events-none">
          <svg className="w-10 h-10 sm:w-14 sm:h-14 text-gold-500/80 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] transform scale-x-[-1]" viewBox="0 0 40 40" fill="none" stroke="currentColor">
            <circle cx="20" cy="18" r="8" fill="currentColor" fillOpacity="0.15" strokeWidth="1" />
            <circle cx="20" cy="18" r="2.5" fill="currentColor" />
            <circle cx="20" cy="27" r="9" strokeWidth="2" />
            <rect x="19" y="18" width="2" height="6" fill="currentColor" />
          </svg>
        </div>

        {/* Rotating Gold Mandala - Right Half (Reverse direction) */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-72 h-72 sm:w-96 sm:h-96 pointer-events-none opacity-20 select-none text-gold-500/80">
          <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100" fill="none" stroke="currentColor" style={{ animationDirection: 'reverse' }}>
            <circle cx="50" cy="50" r="45" strokeWidth="0.5" strokeDasharray="3 3" />
            <circle cx="50" cy="50" r="35" strokeWidth="0.75" />
            <circle cx="50" cy="50" r="25" strokeWidth="0.5" />
            {Array.from({ length: 24 }).map((_, i) => (
              <line
                key={i}
                x1="50"
                y1="50"
                x2={50 + 45 * Math.cos((i * Math.PI) / 12)}
                y2={50 + 45 * Math.sin((i * Math.PI) / 12)}
                strokeWidth="0.25"
              />
            ))}
          </svg>
        </div>

        {/* Elegant Traditional Corner Art Scroll (Bottom Right) */}
        <div className="absolute right-6 bottom-6 w-16 h-16 pointer-events-none opacity-25 select-none text-gold-500/80 transform scale-x-[-1]">
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M 10,90 Q 20,50 50,40" />
            <path d="M 10,90 Q 50,20 60,10" />
            <path d="M 10,90 Q 80,80 90,60" />
            <circle cx="50" cy="40" r="2" fill="currentColor" />
            <circle cx="60" cy="10" r="2" fill="currentColor" />
            <circle cx="90" cy="60" r="2" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* CENTRAL CARD CONTENT (Fades out when click starts) */}
      <div
        className={`flex flex-col items-center justify-center z-30 transition-all duration-500 max-w-sm px-6 text-center ${
          isOpening ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'
        }`}
      >
        {/* Sanskrit Shloka Icon Header */}
        <svg
          className="w-12 h-12 text-gold-500 mb-4 animate-sparkle"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M50 15 C 50 15, 38 25, 38 45 C 38 55, 45 65, 50 70 C 55 65, 62 55, 62 45 C 62 25, 50 15, 50 15 Z" />
          <path d="M50 30 L50 60" />
          <circle cx="50" cy="45" r="5" fill="currentColor" />
        </svg>

        <span className="font-sans text-[10px] sm:text-xs tracking-[5px] text-stone-400 uppercase mb-2">
          WEDDING INVITATION
        </span>
        
        <h2 className="font-script text-5xl sm:text-6xl gold-text-gradient font-bold tracking-wide py-2 mb-3 animate-float drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
          {config?.bride?.firstName} & {config?.groom?.firstName}
        </h2>

        {/* Elegant Gold Divider */}
        <div className="flex items-center justify-center my-4 space-x-2">
          <div className="h-[0.5px] w-8 bg-gradient-to-r from-transparent to-gold-700/50" />
          <div className="w-1.5 h-1.5 rotate-45 border border-gold-600/50 fill-gold-500 bg-gold-500" />
          <div className="h-[0.5px] w-8 bg-gradient-to-l from-transparent to-gold-700/50" />
        </div>

        <p className="font-sans italic text-stone-300 text-xs tracking-wider leading-relaxed mb-10 max-w-xs select-none">
          "We request the honor of your presence to witness and bless our sacred bond of marriage."
        </p>

        {/* Traditional Crimson Wax Seal Button */}
        <button
          onClick={handleOpenClick}
          disabled={isUnlocking || isOpening}
          className={`relative w-28 h-28 rounded-full bg-gradient-to-br from-stone-900 via-stone-800 to-stone-950 border-2 border-white/40 flex flex-col items-center justify-center shadow-[0_0_25px_rgba(255,255,255,0.15)] cursor-pointer select-none active:scale-95 transition-all duration-300 group ${
            isUnlocking 
              ? 'shadow-[0_0_35px_rgba(191,149,63,0.35)] border-gold-500/60 scale-102' 
              : 'hover:shadow-[0_0_35px_rgba(255,255,255,0.25)]'
          }`}
          aria-label="Open Invitation"
        >
          {/* Circular Gold Progress Ring when unlocking */}
          {isUnlocking && (
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none scale-[1.04]" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="46"
                stroke="#bf953f" // Gold stroke
                strokeWidth="2"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 46}
                strokeDashoffset={2 * Math.PI * 46 * (1 - progress / 100)}
                className="transition-all duration-100 ease-linear"
              />
            </svg>
          )}

          {/* Bouncing radar ring (only show when not unlocking) */}
          {!isUnlocking && (
            <div className="absolute inset-[-8px] border border-white/20 rounded-full animate-ping pointer-events-none" />
          )}
          
          {/* Inner details */}
          {isUnlocking ? (
            <svg className="w-6 h-6 text-gold-500 mb-1 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-white mb-1 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          )}

          {isUnlocking ? (
            <>
              <span className="font-serif text-gold-400 text-[10px] tracking-[2px] font-bold">
                {progress}%
              </span>
              <span className="font-sans text-stone-300 text-[7px] tracking-[1px] uppercase">
                UNLOCKING
              </span>
            </>
          ) : (
            <>
              <span className="font-serif text-white text-[10px] tracking-[2px] font-bold">
                OPEN
              </span>
              <span className="font-sans text-stone-400 text-[7px] tracking-[1.5px] uppercase">
                INVITATION
              </span>
            </>
          )}
        </button>
      </div>
      {/* WHIRLPOOL PORTAL ANIMATION */}
      {showWhirlpool && (
        <div className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none overflow-hidden">
          <style>{`
            @keyframes whirlpool {
              0% {
                transform: scale(0) rotate(0deg);
                opacity: 0;
                border-radius: 50%;
              }
              30% {
                transform: scale(2.5) rotate(180deg);
                opacity: 0.95;
                border-radius: 45%;
              }
              60% {
                transform: scale(6) rotate(480deg);
                opacity: 1;
                border-radius: 20%;
              }
              80% {
                transform: scale(8.5) rotate(720deg);
                opacity: 0.95;
                border-radius: 0%;
              }
              100% {
                transform: scale(11) rotate(960deg);
                opacity: 0;
                border-radius: 0%;
              }
            }
            .animate-whirlpool {
              animation: whirlpool 1.8s cubic-bezier(0.15, 0.85, 0.35, 1) forwards;
            }
          `}</style>
          <div
            className="w-48 h-48 rounded-full animate-whirlpool"
            style={{
              background: 'radial-gradient(circle, #dc2626 10%, #991b1b 35%, #7f1d1d 60%, #450a0a 80%, transparent 100%)',
              boxShadow: '0 0 60px rgba(220, 38, 38, 0.6), inset 0 0 40px rgba(0, 0, 0, 0.8)'
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Envelope;
