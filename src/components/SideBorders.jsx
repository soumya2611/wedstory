
/**
 * SideBorders Component
 * Renders ornate traditional Indian borders (vines, leaves, and Mangal Kalasa)
 * on the left and right sides of the viewport on desktop and tablet screens.
 */
const SideBorders = () => {
  return (
    <>
      {/* Left side border */}
      <div className="hidden md:block fixed left-0 top-0 bottom-0 w-16 lg:w-20 pointer-events-none z-15 text-gold-400/60 animate-pulse-slow">
        <svg viewBox="0 0 100 1000" className="w-full h-full" fill="none" stroke="currentColor">
          {/* Main vertical border lines */}
          <line x1="50" y1="50" x2="50" y2="830" strokeWidth="1.5" />
          <line x1="54" y1="50" x2="54" y2="830" strokeWidth="0.5" strokeDasharray="3 3" />

          {/* Ornate vines/swirls along the line */}
          {Array.from({ length: 8 }).map((_, idx) => {
            const y = 80 + idx * 90;
            return (
              <g key={idx} strokeWidth="1">
                {/* Wavy leaf scroll element */}
                <path d={`M 50,${y} C 20,${y+20} 20,${y+60} 50,${y+80}`} />
                <path d={`M 50,${y+10} C 30,${y+25} 30,${y+55} 50,${y+70}`} />
                {/* Buds and leaves */}
                <circle cx="28" cy={y+40} r="2.5" fill="currentColor" />
                <path d={`M 50,${y+30} Q 35,${y+20} 38,${y+38}`} />
                <path d={`M 50,${y+50} Q 35,${y+60} 38,${y+42}`} />
                {/* Decorative horizontal accent lines */}
                <line x1="50" y1={y+20} x2="60" y2={y+15} />
                <line x1="50" y1={y+40} x2="62" y2={y+40} />
                <line x1="50" y1={y+60} x2="60" y2={y+65} />
              </g>
            );
          })}

          {/* Top Hanging Lotus/Ornament */}
          <g transform="translate(50, 40)" strokeWidth="1">
            <path d="M 0,0 C -20,-15 -20,-25 0,-25 C 20,-25 20,-15 0,0" fill="currentColor" fillOpacity="0.2" />
            <path d="M -12,-15 Q 0,-4 12,-15" />
            <circle cx="0" cy="4" r="2.5" fill="currentColor" />
          </g>

          {/* Bottom Mangal Kalash (Water Pot with Coconut & Leaves) */}
          <g transform="translate(50, 830)" strokeWidth="1" fill="currentColor">
            {/* Stand/Pedestal */}
            <path d="M -18,50 Q 0,46 18,50 L 14,54 Q 0,51 -14,54 Z" />
            {/* Lotus Pedestal Base */}
            <path d="M -22,38 Q 0,42 22,38 C 26,48 0,48 -26,48 Z" />
            {/* Pot Body */}
            <path d="M -20,20 C -27,34 -13,42 0,42 C 13,42 27,34 20,20 Z" fillOpacity="0.3" stroke="currentColor" strokeWidth="1" />
            {/* Swastika on Kalash */}
            <path d="M -5,30 H 5 M 0,25 V 35 M -5,25 V 30 M 5,30 V 35" stroke="currentColor" strokeWidth="1.2" fill="none" />
            {/* Neck opening */}
            <path d="M -12,20 Q 0,22 12,20 L 10,17 Q 0,19 -10,17 Z" />
            {/* Mango Leaves (Amrapatra) */}
            <path d="M -12,17 Q -18,4 -4,9 M 12,17 Q 18,4 4,9 M -7,17 Q 0,-2 7,17" />
            {/* Coconut (Shriphal) on top */}
            <path d="M -7,9 C -7,1 0,-10 0,-10 C 0,-10 7,1 7,9 Z" />
          </g>
        </svg>
      </div>

      {/* Right side border (mirrored using scale-x-[-1]) */}
      <div className="hidden md:block fixed right-0 top-0 bottom-0 w-16 lg:w-20 pointer-events-none z-15 text-gold-400/60 transform scale-x-[-1] animate-pulse-slow">
        <svg viewBox="0 0 100 1000" className="w-full h-full" fill="none" stroke="currentColor">
          {/* Main vertical border lines */}
          <line x1="50" y1="50" x2="50" y2="830" strokeWidth="1.5" />
          <line x1="54" y1="50" x2="54" y2="830" strokeWidth="0.5" strokeDasharray="3 3" />

          {/* Ornate vines/swirls along the line */}
          {Array.from({ length: 8 }).map((_, idx) => {
            const y = 80 + idx * 90;
            return (
              <g key={idx} strokeWidth="1">
                <path d={`M 50,${y} C 20,${y+20} 20,${y+60} 50,${y+80}`} />
                <path d={`M 50,${y+10} C 30,${y+25} 30,${y+55} 50,${y+70}`} />
                <circle cx="28" cy={y+40} r="2.5" fill="currentColor" />
                <path d={`M 50,${y+30} Q 35,${y+20} 38,${y+38}`} />
                <path d={`M 50,${y+50} Q 35,${y+60} 38,${y+42}`} />
                <line x1="50" y1={y+20} x2="60" y2={y+15} />
                <line x1="50" y1={y+40} x2="62" y2={y+40} />
                <line x1="50" y1={y+60} x2="60" y2={y+65} />
              </g>
            );
          })}

          {/* Top Hanging Lotus/Ornament */}
          <g transform="translate(50, 40)" strokeWidth="1">
            <path d="M 0,0 C -20,-15 -20,-25 0,-25 C 20,-25 20,-15 0,0" fill="currentColor" fillOpacity="0.2" />
            <path d="M -12,-15 Q 0,-4 12,-15" />
            <circle cx="0" cy="4" r="2.5" fill="currentColor" />
          </g>

          {/* Bottom Mangal Kalash */}
          <g transform="translate(50, 830)" strokeWidth="1" fill="currentColor">
            <path d="M -18,50 Q 0,46 18,50 L 14,54 Q 0,51 -14,54 Z" />
            <path d="M -22,38 Q 0,42 22,38 C 26,48 0,48 -26,48 Z" />
            <path d="M -20,20 C -27,34 -13,42 0,42 C 13,42 27,34 20,20 Z" fillOpacity="0.3" stroke="currentColor" strokeWidth="1" />
            <path d="M -5,30 H 5 M 0,25 V 35 M -5,25 V 30 M 5,30 V 35" stroke="currentColor" strokeWidth="1.2" fill="none" />
            <path d="M -12,20 Q 0,22 12,20 L 10,17 Q 0,19 -10,17 Z" />
            <path d="M -12,17 Q -18,4 -4,9 M 12,17 Q 18,4 4,9 M -7,17 Q 0,-2 7,17" />
            <path d="M -7,9 C -7,9 0,-10 0,-10 Z" />
          </g>
        </svg>
      </div>
    </>
  );
};

export default SideBorders;
