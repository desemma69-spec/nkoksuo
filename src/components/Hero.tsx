import { Sparkles, MapPin, ChevronDown } from 'lucide-react';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
  heroBgUrl?: string;
  heroTitle1?: string;
  heroTitle2?: string;
  heroSubBadge?: string;
  heroDesc?: string;
  heroStats?: Array<{value: string, label: string}>;
  heroBgPosition?: string;
}

export default function Hero({ 
  onNavigate, 
  heroBgUrl,
  heroTitle1,
  heroTitle2,
  heroSubBadge,
  heroDesc,
  heroStats,
  heroBgPosition
}: HeroProps) {
  const handleScrollTo = (id: string) => {
    onNavigate(id);
  };

  const defaultStats = [
    { value: "8", label: "Divisional Communities" },
    { value: "15+", label: "Nkosuo Projects" },
    { value: "GH¢2.8M+", label: "Development Budget" },
    { value: "180k+", label: "Beneficiaries Served" }
  ];

  const activeStats = heroStats || defaultStats;

  // We refer to our background image
  const heroImgUrl = heroBgUrl || "/src/assets/images/omanhene_hero_bg_1783513909221.jpg";

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center bg-[#0a0a0a] pt-24 overflow-hidden"
    >
      {/* Background Hero Image with Deep Regal Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImgUrl}
          alt="Nkosuo Division New Juaben Traditional Area sitting in state"
          className="w-full h-full object-cover opacity-65 scale-100 transition-all duration-700 brightness-[0.85] contrast-[1.25] saturate-[1.15]"
          style={{ objectPosition: heroBgPosition || 'center 20%' }}
          referrerPolicy="no-referrer"
        />
        {/* Deep Black and Rich Red Radial Gradients to Balance Bright/Deep Colors */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/75 via-[#0a0a0a]/40 to-transparent"></div>
        <div className="absolute inset-0 bg-radial-at-c from-[#990000]/10 via-transparent to-[#0a0a0a]/75"></div>
      </div>

      {/* Decorative Gold & Crimson Kente borders at top and bottom */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#990000] via-[#D4AF37] to-[#0a0a0a]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 flex flex-col items-center text-center">


        {/* Main Headings */}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-black tracking-tight text-white uppercase max-w-5xl leading-none">
          <span className="block text-[#D4AF37] drop-shadow-[0_2px_15px_rgba(212,175,55,0.15)]">{heroTitle1 || "New Juaben"}</span>
          <span className="block mt-2">{heroTitle2 || "New Juaben Traditional Area"}</span>
        </h1>

        {/* Hero Actions */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <button
            id="hero-explore-communities"
            onClick={() => handleScrollTo('communities')}
            className="w-full sm:w-auto px-6 py-4 bg-[#D4AF37] hover:bg-white text-black font-black text-xs tracking-widest uppercase rounded shadow-[0_4px_20px_rgba(212,175,55,0.25)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
          >
            Explore Communities & Chiefs
          </button>
          <button
            id="hero-view-projects"
            onClick={() => handleScrollTo('projects')}
            className="w-full sm:w-auto px-6 py-4 bg-[#990000] hover:bg-red-800 text-white font-black text-xs tracking-widest uppercase rounded shadow-[0_4px_20px_rgba(153,0,0,0.25)] transition-all duration-300 cursor-pointer"
          >
            View Active Projects
          </button>
        </div>

        {/* Stats Grid styled with sleek gradients and border-r-4 borders like standard theme layout */}
        <div className="mt-16 w-full grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl bg-gradient-to-br from-[#1a1a1a] to-black border border-neutral-800 rounded-xl p-6 sm:p-8 shadow-2xl">
          {activeStats.map((stat, idx) => (
            <div
              key={idx}
              id={`hero-stat-${idx}`}
              className="text-center p-3 border-r border-neutral-800 last:border-r-0 flex flex-col justify-center items-center"
            >
              <div className="text-3xl sm:text-4xl font-black text-[#D4AF37] font-mono tracking-tight">
                {stat.value}
              </div>
              <div className="mt-2 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-neutral-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <button
          id="hero-scroll-down"
          onClick={() => handleScrollTo('communities')}
          className="mt-12 animate-bounce flex flex-col items-center text-neutral-500 hover:text-[#D4AF37] transition-colors cursor-pointer"
        >
          <span className="text-[9px] uppercase tracking-[0.3em] font-sans font-black mb-1">Explore Communities</span>
          <ChevronDown className="w-5 h-5 text-[#D4AF37]" />
        </button>
      </div>

      {/* Royal Accent Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-60"></div>
    </section>
  );
}
