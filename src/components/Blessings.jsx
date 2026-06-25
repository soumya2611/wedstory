
const GaneshaIcon = () => (
  <svg
    className="w-24 h-24 text-gold-500 mx-auto mb-8 animate-sparkle"
    viewBox="0 0 100 120"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Head Tilak */}
    <path d="M47 32 C 47 32, 50 18, 50 18 C 50 18, 53 32, 53 32 Z" fill="currentColor" />
    <path d="M44 28 Q 50 30 56 28" />
    <path d="M45 25 Q 50 27 55 25" />
    
    {/* Left Ear */}
    <path d="M38 35 C24 32 18 45 23 55 C26 62 38 62 38 62" />
    {/* Right Ear */}
    <path d="M62 35 C76 32 82 45 77 55 C74 62 62 62 62 62" />
    
    {/* Head Outline / Crown */}
    <path d="M38 35 C42 22 45 15 50 10 C55 15 58 22 62 35" />
    
    {/* Face & Trunk */}
    <path d="M38 35 C42 35 48 37 48 45 C48 55 42 62 42 75 C42 86 52 91 55 91 C58 91 62 83 58 79 Q 54 75 52 77" />
    
    {/* Tusks */}
    <path d="M34 52 L39 51" strokeWidth="2.5" />
    <path d="M59 52 L62 51" strokeWidth="1.5" />

    {/* Eyes */}
    <path d="M41 42 Q 44 40 45 43" strokeWidth="2" />
    <path d="M59 42 Q 56 40 55 43" strokeWidth="2" />
  </svg>
);

const Blessings = () => {
  return (
    <section className="relative w-full max-w-4xl mx-auto px-6 py-24 text-center">
      {/* Decorative Outer Border frame with gold corners - positioned behind the text */}
      <div className="absolute inset-0 border border-gold-800/20 rounded-2xl pointer-events-none bg-stone-900/40 backdrop-blur-[2px] shadow-[0_4px_30px_rgba(0,0,0,0.4)] -z-10" />
      
      {/* Top and Bottom Corner Accents */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 rounded-tl border-gold-500/30 -z-10" />
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 rounded-tr border-gold-500/30 -z-10" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 rounded-bl border-gold-500/30 -z-10" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 rounded-br border-gold-500/30 -z-10" />

      {/* Content wrapper with positive z-index to isolate text from background filter */}
      <div className="relative z-10">
        {/* Ganesha Silhouette SVG */}
        <GaneshaIcon />

        {/* traditional Salutation */}
        <h3 className="font-serif text-gold-500 text-lg md:text-xl tracking-[6px] uppercase mb-8 font-semibold">
          ॥ श्री गणेशाय नमः ॥
        </h3>

        {/* Shloka Text */}
        <div className="my-8 px-4">
          <p className="text-xl md:text-3xl font-serif font-bold leading-loose tracking-wide md:tracking-[2px] text-center max-w-2xl mx-auto gold-text-gradient select-none">
            वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।
          </p>
          <p className="text-xl md:text-3xl font-serif font-bold leading-loose tracking-wide md:tracking-[2px] text-center max-w-2xl mx-auto gold-text-gradient select-none mt-2">
            निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥
          </p>
        </div>

        {/* Separator Accent */}
        <div className="flex items-center justify-center my-8 space-x-2.5">
          <div className="w-1.5 h-1.5 rounded-full bg-gold-600/40" />
          <div className="w-3 h-3 rotate-45 border border-gold-500/60 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-gold-500" />
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-gold-600/40" />
        </div>

        {/* English Translation */}
        <div className="max-w-xl mx-auto px-4">
          <p className="font-display italic text-sm md:text-base leading-relaxed text-stone-300 font-medium">
            "O Lord of the curved trunk and massive body, whose splendor is equal to a million suns,
            please make all my undertakings free of obstacles, always."
          </p>
        </div>
      </div>
    </section>
  );
};

export default Blessings;
