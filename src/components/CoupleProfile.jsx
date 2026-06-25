import brideImg from '../assets/bride_portrait.png';
import groomImg from '../assets/groom_portrait.png';

/**
 * CoupleProfile Component (Meet the Bride & Groom)
 */
const CoupleProfile = ({ config }) => {
  return (
    <section className="relative w-full max-w-4xl mx-auto px-6 py-20 text-center rounded-2xl">
      {/* Background card frame and backdrop blur - isolated from content wrapper */}
      <div className="absolute inset-0 bg-stone-900/60 border border-gold-800/20 rounded-2xl backdrop-blur-md shadow-2xl shadow-black/50 -z-10" />

      {/* Content wrapper with positive z-index to keep everything sharp */}
      <div className="relative z-10">
        {/* Decorative Top Flourish */}
        <div className="flex justify-center items-center mb-6 space-x-2">
          <div className="h-[0.5px] w-10 bg-gradient-to-r from-transparent to-gold-500" />
          <svg className="w-5 h-5 text-gold-500 animate-sparkle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <div className="h-[0.5px] w-10 bg-gradient-to-l from-transparent to-gold-500" />
        </div>

        <h2 className="text-3xl md:text-4xl font-serif tracking-[4px] gold-text-gradient mb-12">
          THE HAPPY COUPLE
        </h2>

        {/* Profile Card Layout */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16 max-w-3xl mx-auto">
          
          {/* BRIDE SIDE */}
          <div className="flex-1 w-full max-w-xs group">
            <div className="relative rounded-2xl p-3 bg-stone-950 border border-gold-900/20 shadow-xl transition-all duration-500 hover:border-gold-500/40 hover:shadow-[0_10px_30px_rgba(197,168,80,0.15)]">
              {/* Corner decorative brackets */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-gold-500/30 group-hover:border-gold-500/70 transition duration-500" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-gold-500/30 group-hover:border-gold-500/70 transition duration-500" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-gold-500/30 group-hover:border-gold-500/70 transition duration-500" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-gold-500/30 group-hover:border-gold-500/70 transition duration-500" />

              {/* Portrait Image */}
              <div className="relative overflow-hidden rounded-xl aspect-[4/5] bg-stone-900">
                <img 
                  src={config?.bride?.image || brideImg} 
                  alt={`Bride ${config?.bride?.firstName || 'Lipsa'}`} 
                  className={`w-full h-full object-cover brightness-90 hover:brightness-100 hover:scale-103 transition duration-700 ${config?.coupleImageGrayscale !== false ? 'grayscale' : ''}`}
                />
              </div>

              {/* Details */}
              <div className="mt-6 mb-2">
                <h3 className="text-xl md:text-2xl font-serif tracking-[1px] text-gold-200">
                  {config?.bride?.fullName}
                </h3>
                <p className="text-[10px] font-sans tracking-[2px] uppercase text-stone-400 mt-1 font-semibold">
                  The Bride
                </p>
              </div>
            </div>
          </div>

          {/* AESTHETIC HEART KNOT CONNECTOR */}
          <div className="flex flex-col items-center justify-center py-2 z-10">
            <svg 
              className="w-16 h-16 md:w-20 md:h-20 text-gold-500 animate-float" 
              viewBox="0 0 100 100" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5"
            >
              {/* Heart Love Knot (Celtic Loop style) */}
              <path 
                d="M50 35 C40 10, 10 20, 30 50 C50 70, 50 70, 50 70 C50 70, 50 70, 70 50 C90 20, 60 10, 50 35 Z" 
                fill="rgba(197, 168, 80, 0.08)" 
                strokeWidth="2" 
              />
              <path 
                d="M50 20 C45 35, 30 45, 50 70 C70 45, 55 35, 50 20 Z" 
                strokeWidth="1" 
                strokeDasharray="2 2" 
              />
              <circle cx="50" cy="42" r="3" fill="currentColor" className="animate-pulse" />
            </svg>
            <div className="h-8 w-[1px] bg-gradient-to-b from-gold-500/40 to-transparent md:hidden" />
          </div>

          {/* GROOM SIDE */}
          <div className="flex-1 w-full max-w-xs group">
            <div className="relative rounded-2xl p-3 bg-stone-950 border border-gold-900/20 shadow-xl transition-all duration-500 hover:border-gold-500/40 hover:shadow-[0_10px_30px_rgba(197,168,80,0.15)]">
              {/* Corner decorative brackets */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-gold-500/30 group-hover:border-gold-500/70 transition duration-500" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-gold-500/30 group-hover:border-gold-500/70 transition duration-500" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-gold-500/30 group-hover:border-gold-500/70 transition duration-500" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-gold-500/30 group-hover:border-gold-500/70 transition duration-500" />

              {/* Portrait Image */}
              <div className="relative overflow-hidden rounded-xl aspect-[4/5] bg-stone-900">
                <img 
                  src={config?.groom?.image || groomImg} 
                  alt={`Groom ${config?.groom?.firstName || 'Aditya'}`} 
                  className={`w-full h-full object-cover brightness-90 hover:brightness-100 hover:scale-103 transition duration-700 ${config?.coupleImageGrayscale !== false ? 'grayscale' : ''}`}
                />
              </div>

              {/* Details */}
              <div className="mt-6 mb-2">
                <h3 className="text-xl md:text-2xl font-serif tracking-[1px] text-gold-200">
                  {config?.groom?.fullName}
                </h3>
                <p className="text-[10px] font-sans tracking-[2px] uppercase text-stone-400 mt-1 font-semibold">
                  The Groom
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Decorative Bottom Line */}
        <div className="mt-16 flex justify-center items-center">
          <div className="h-[0.5px] w-2/3 bg-gradient-to-r from-transparent via-gold-700/30 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default CoupleProfile;
