// eslint-disable-next-line no-unused-vars
import React from 'react';
import bgImage from '../assets/wedding_bg.png';

const Cover = ({ config, isPlaying, togglePlay, showAutoPlayPrompt, customBgStyle, isTailwindBg, hasMusic }) => {
  const showCustomBg = config?.customBgCss && !config?.bgImage;

  const coverBgStyle = showCustomBg 
    ? customBgStyle 
    : { 
        backgroundImage: `url(${config?.bgImage || bgImage})`,
        transform: 'translate3d(0, 0, 0)',
      };

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between items-center py-16 px-6 overflow-hidden">
      {/* Background Image with Grayscale Filter & Soft Deep Black Overlay */}
      <div 
        className={`absolute inset-0 transition-all duration-1000 ${
          showCustomBg 
            ? (isTailwindBg ? config.customBgCss : '') 
            : 'bg-cover bg-center bg-no-repeat grayscale contrast-125 scale-105'
        }`}
        style={coverBgStyle}
      />
      <div 
        className="absolute inset-0 z-0 transition-all duration-1000"
        style={{
          background: showCustomBg 
            ? 'linear-gradient(to bottom, rgba(18, 17, 16, 0.4) 0%, rgba(18, 17, 16, 0.2) 50%, rgba(18, 17, 16, 0.4) 100%)' 
            : 'linear-gradient(to bottom, rgba(18, 17, 16, 0.95) 0%, rgba(28, 26, 24, 0.8) 50%, rgba(18, 17, 16, 0.95) 100%)',
          backdropFilter: showCustomBg ? 'none' : 'blur(1px)'
        }}
      />

      {/* Decorative Silver/Charcoal Mandap Silhouette (SVG Overlay) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-15 pointer-events-none">
        <svg className="w-[80%] h-[80%] max-w-lg text-stone-850 animate-spin-slow" viewBox="0 0 100 100" fill="none" stroke="currentColor">
          <circle cx="50" cy="50" r="40" strokeWidth="0.5" strokeDasharray="3 3" />
          <circle cx="50" cy="50" r="30" strokeWidth="0.75" />
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={i}
              x1="50"
              y1="50"
              x2={50 + 30 * Math.cos((i * Math.PI) / 6)}
              y2={50 + 30 * Math.sin((i * Math.PI) / 6)}
              strokeWidth="0.5"
            />
          ))}
        </svg>
      </div>

      {/* Header section (Subtle text or logo) */}
      <div className="z-10 animate-fade-in mt-6">
        <div className="flex items-center space-x-3">
          <div className="h-[0.5px] w-8 bg-stone-700/50" />
          <span className="font-sans text-[10px] md:text-xs tracking-[4px] text-stone-400 font-semibold uppercase">
            Shree Ganeshay Namah
          </span>
          <div className="h-[0.5px] w-8 bg-stone-700/50" />
        </div>
      </div>

      {/* Main Couple Names Section */}
      <div className="z-10 my-auto flex flex-col items-center max-w-xl px-4 text-center">
        <p className="font-sans text-xs md:text-sm tracking-[5px] uppercase mb-4 text-stone-500 font-semibold animate-[slideDown_1s_ease-out]">
          THE WEDDING INVITATION
        </p>
        
        <h1 className="font-script text-6xl sm:text-7xl md:text-8xl tracking-wide font-normal py-4 leading-tight select-none text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] font-bold animate-[scaleIn_0.8s_ease-out]">
          {config?.groom?.firstName}
        </h1>
        
        <div className="flex items-center justify-center my-2 space-x-4 animate-sparkle">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-stone-600" />
          <span className="font-serif italic text-2xl text-stone-400 font-light">&</span>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-stone-600" />
        </div>

        <h1 className="font-script text-6xl sm:text-7xl md:text-8xl tracking-wide font-normal py-4 leading-tight select-none text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] font-bold animate-[scaleIn_0.8s_ease-out]">
          {config?.bride?.firstName}
        </h1>

        <p className="font-sans text-[11px] md:text-xs max-w-xs md:max-w-sm mt-8 leading-relaxed tracking-[1.5px] uppercase text-stone-400 font-medium">
          Together with their families, invite you to share in the joy of their new beginning.
        </p>
      </div>

      {/* Scroll Down Indicator */}
      <div className="z-10 flex flex-col items-center animate-bounce duration-1000 select-none cursor-pointer"
           onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
        <span className="font-sans text-[9px] tracking-[4px] uppercase mb-2 text-stone-400 font-semibold">
          Scroll to Reveal
        </span>
        <svg className="w-5 h-5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

      {/* Floating Audio Controller */}
      {hasMusic && (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
          {/* Play Suggestion Tooltip */}
          {showAutoPlayPrompt && (
            <div className="bg-stone-900 border border-stone-850 text-stone-300 font-sans text-[10px] px-3 py-1.5 rounded-lg shadow-xl mb-2 mr-1 animate-float tracking-[1px] uppercase pointer-events-none relative">
              🎵 Play Music
              {/* Arrow tail */}
              <div className="absolute bottom-[-5px] right-4 w-2.5 h-2.5 bg-stone-900 border-r border-b border-stone-850 rotate-45" />
            </div>
          )}

          <button
            onClick={togglePlay}
            className="bg-stone-900/90 border border-stone-750 text-white p-3.5 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.4)] hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
            aria-label="Toggle Background Music"
          >
            {isPlaying ? (
              /* Animated music wave bars */
              <div className="flex items-end justify-center space-x-[2.5px] w-5 h-5 px-0.5">
                <style>{`
                  @keyframes musicWave {
                    0%, 100% { height: 4px; }
                    50% { height: 18px; }
                  }
                  .bar-active {
                    animation: musicWave 1.2s ease-in-out infinite;
                  }
                `}</style>
                <span className="w-[2px] bg-white rounded-full bar-active" style={{ animationDelay: '0.1s' }} />
                <span className="w-[2px] bg-white rounded-full bar-active" style={{ animationDelay: '0.4s' }} />
                <span className="w-[2px] bg-white rounded-full bar-active" style={{ animationDelay: '0.2s' }} />
                <span className="w-[2px] bg-white rounded-full bar-active" style={{ animationDelay: '0.6s' }} />
              </div>
            ) : (
              /* Paused state SVG icon */
              <svg className="w-5 h-5 text-stone-300 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            )}
          </button>
        </div>
      )}
    </section>
  );
};

export default Cover;
