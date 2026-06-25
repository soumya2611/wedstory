
/**
 * InvitationLetter Component (Formal Wedding Invitation Letter translated from Odia)
 */
const InvitationLetter = ({ config }) => {
  return (
    <section className="relative w-full max-w-4xl mx-auto px-6 py-20 text-center rounded-2xl">
      {/* Background card frame and backdrop blur - isolated from content wrapper */}
      <div className="absolute inset-0 bg-stone-900/60 border border-gold-800/20 rounded-2xl backdrop-blur-md shadow-2xl shadow-black/50 -z-10" />

      {/* Content wrapper with positive z-index to keep everything sharp */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 md:px-8">
        
        {/* Sanskrit Invocation Header */}
        <div className="text-center mb-6">
          <span className="font-serif text-xs md:text-sm tracking-[2px] text-gold-500/80 font-bold block mb-1">
            卐 ॐ श्री श्री प्रजापतये नमः 卐
          </span>
          <span className="font-sans text-[9px] tracking-[1.5px] uppercase text-stone-500 block">
            "Salutations to the Lord of Creation and Union"
          </span>
          <div className="flex justify-center items-center mt-3 space-x-1.5">
            <div className="h-[0.5px] w-12 bg-gradient-to-r from-transparent to-gold-700/50" />
            <svg className="w-4 h-4 text-gold-600/70" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
            </svg>
            <div className="h-[0.5px] w-12 bg-gradient-to-l from-transparent to-gold-700/50" />
          </div>
        </div>

        {/* Respected Salutation */}
        <div className="text-left md:text-center mb-8">
          <p className="font-serif italic text-sm text-stone-300">
            Respected Sir / Madam,
          </p>
        </div>

        {/* Invitation Core Text */}
        <p className="font-sans text-xs md:text-sm text-stone-300 leading-relaxed tracking-wide text-justify md:text-center mb-10 max-w-xl mx-auto font-medium">
          {config?.invitationDesc}
        </p>

        {/* BRIDE FAMILY DETAILS */}
        <div className="border-t border-b border-gold-900/10 py-8 mb-8 space-y-3 bg-stone-950/20 rounded-xl px-4">
          <span className="text-[10px] font-sans tracking-[3px] uppercase text-gold-500/80 font-bold block">
            THE BRIDE
          </span>
          <h3 className="text-2xl md:text-3xl font-serif text-gold-100 font-bold drop-shadow-[0_1px_3px_rgba(197,168,80,0.3)]">
            {config?.bride?.fullName} {config?.bride?.nickname && <span className="text-sm font-normal text-stone-400 font-sans italic">({config.bride.nickname})</span>}
          </h3>
          <p className="text-xs font-sans text-stone-300 leading-relaxed">
            {config?.bride?.relation || 'Only daughter'} of <strong className="text-gold-400/90 font-semibold">{config?.bride?.parentNames}</strong>
          </p>
          {(config?.bride?.location || config?.bride?.grandparentNames) && (
            <p className="text-xs font-sans text-gold-400 italic font-semibold">
              {config?.bride?.location || config?.bride?.grandparentNames}
            </p>
          )}
        </div>

        {/* WITH */}
        <div className="flex flex-col items-center justify-center my-6 z-10 select-none">
          <div className="h-6 w-[0.5px] bg-gradient-to-b from-transparent to-gold-700/30" />
          <span className="font-script text-3xl text-gold-500 my-1 font-light italic">
            with
          </span>
          <div className="h-6 w-[0.5px] bg-gradient-to-t from-transparent to-gold-700/30" />
        </div>

        {/* GROOM FAMILY DETAILS */}
        <div className="border-t border-b border-gold-900/10 py-8 mb-12 space-y-3 bg-stone-950/20 rounded-xl px-4">
          <span className="text-[10px] font-sans tracking-[3px] uppercase text-gold-500/80 font-bold block">
            THE GROOM
          </span>
          <h3 className="text-2xl md:text-3xl font-serif text-gold-100 font-bold drop-shadow-[0_1px_3px_rgba(197,168,80,0.3)]">
            {config?.groom?.fullName} {config?.groom?.nickname && <span className="text-sm font-normal text-stone-400 font-sans italic">({config.groom.nickname})</span>}
          </h3>
          <p className="text-xs font-sans text-stone-300 leading-relaxed">
            {config?.groom?.relation || 'Middle son'} of <strong className="text-gold-400/90 font-semibold">{config?.groom?.parentNames}</strong>
          </p>
          {(config?.groom?.location || config?.groom?.grandparentNames) && (
            <p className="text-xs font-sans text-gold-400 italic font-semibold">
              {config?.groom?.location || config?.groom?.grandparentNames}
            </p>
          )}
        </div>

        {/* WEDDING AUSPICIOUS TIME */}
        <div className="space-y-3 mb-12 bg-stone-950 border border-gold-900/20 py-6 px-4 rounded-xl max-w-md mx-auto shadow-inner">
          <span className="text-[9px] font-sans tracking-[3px] uppercase text-gold-500/80 font-bold block">
            WEDDING DATE & TIME
          </span>
          <p className="font-serif text-lg text-gold-200 font-bold">
            {config?.formattedDate}
          </p>
          <p className="text-[11px] font-sans text-stone-400 font-medium">
            ({config?.tithi})
          </p>
        </div>

        {/* SOLICITATION STATEMENT */}
        <div className="space-y-4 max-w-md mx-auto">
          <p className="font-sans text-xs text-stone-300 leading-relaxed font-semibold">
            We humbly request your esteemed presence with family to witness the wedding and bestow your heartfelt blessings on the newlyweds.
          </p>
          
          {/* Polite digital invite disclaimer */}
          <p className="font-sans text-[10px] text-stone-500 italic max-w-xs mx-auto leading-relaxed border-t border-stone-800/40 pt-4">
            "Kindly treat this digital card as a personal invitation and excuse any unintentional omission."
          </p>
        </div>

        {/* INVITATION FROM */}
        <div className="mt-12 space-y-2">
          <span className="text-[9px] font-sans tracking-[3px] uppercase text-gold-500/60 block">
            CORDIALLY INVITED BY
          </span>
          <p className="font-serif text-md text-gold-300 font-bold">
            {config?.inviter}
          </p>
        </div>

        {/* Decorative Bottom Line */}
        <div className="mt-16 flex justify-center items-center">
          <div className="h-[0.5px] w-2/3 bg-gradient-to-r from-transparent via-gold-700/30 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default InvitationLetter;
