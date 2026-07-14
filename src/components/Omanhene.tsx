import { OMANHENE_DATA } from '../data';
import { Award, Eye, Heart, Shield, Landmark } from 'lucide-react';

interface OmanheneProps {
  data?: any;
}

export default function Omanhene({ data = OMANHENE_DATA }: OmanheneProps) {

  // Let's pair icons with the principles dynamically
  const getIcon = (title: string) => {
    switch (title.toLowerCase()) {
      case 'nkosuo (progress)':
        return <Award className="w-6 h-6 text-[#D4AF37]" />;
      case 'obuo (respect & unity)':
        return <Landmark className="w-6 h-6 text-red-500" />;
      case 'amapam (sustainable stewardship)':
        return <Shield className="w-6 h-6 text-[#D4AF37]" />;
      default:
        return <Heart className="w-6 h-6 text-[#D4AF37]" />;
    }
  };

  return (
    <section
      id="omanhene"
      className="relative py-24 bg-[#0a0a0a] border-b border-neutral-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Majestic Portrait Frame */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative group w-full max-w-sm">
              {/* Outer Subtle Golden Glow Border */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#990000] via-[#D4AF37] to-[#990000] rounded-xl blur-sm opacity-20 group-hover:opacity-45 transition-all duration-500"></div>
              
              {/* Main Portrait Frame with Royal Design (Sleek Interface) */}
              <div className="relative bg-gradient-to-br from-[#1a1a1a] to-black p-4 rounded-xl border border-neutral-800 shadow-2xl overflow-hidden">
                <div className="relative aspect-square rounded overflow-hidden border border-neutral-800">
                  <img
                    src={data.avatarUrl}
                    alt={data.name}
                    className="w-full h-full object-cover object-top transition-all duration-700 transform group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle Royal Crimson Overlay on Image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                  
                  {/* Corner Block Enstooled tag (Sleek Interface style) */}
                  <div className="absolute top-0 right-0 px-3 py-2 bg-[#D4AF37] text-black font-black text-[10px] tracking-widest uppercase rounded-bl-lg shadow-md">
                    Enstooled {data.stooledYear}
                  </div>
                </div>

                {/* Portrait Caption */}
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-black text-[#D4AF37] tracking-wide uppercase">
                    {data.name}
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono mt-1">
                    {data.reignTitle}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Royal Authority Details */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <span className="text-[#D4AF37] text-xs font-black uppercase tracking-[0.2em] border-l-2 border-[#990000] pl-3 mb-3">
              Patron of Development
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white uppercase leading-none">
              The Paramountcy
            </h2>
            <div className="h-1.5 w-20 bg-[#990000] mt-4"></div>

            <div className="mt-6 text-neutral-300 font-sans leading-relaxed space-y-4">
              <p className="text-base sm:text-lg font-medium text-white italic">
                &ldquo;Traditional governance has entered a new era. Our legacy must be defined not by the grandeur of our stools alone, but by the schools, clinics, and clean water networks we build for our citizens.&rdquo;
              </p>
              <p className="text-sm text-neutral-400 leading-relaxed">
                {data.bio}
              </p>
            </div>

            {/* Vision Callout Box (Sleek Interface styled) */}
            <div className="mt-8 bg-[#990000]/10 p-4 rounded-lg border border-[#990000]/30 shadow-sm">
              <h4 className="text-xs font-sans font-black text-[#D4AF37] tracking-[0.15em] uppercase flex items-center mb-2">
                <Eye className="w-4 h-4 text-red-500 mr-2" /> Paramount Development Vision
              </h4>
              <p className="text-xs sm:text-sm font-sans text-neutral-300 leading-relaxed">
                {data.vision}
              </p>
            </div>

            {/* Core Pillars (Sleek Interface border-r-4 and neat columns) */}
            <div className="mt-10">
              <h4 className="text-[10px] font-sans font-black tracking-[0.25em] text-neutral-500 uppercase mb-4">
                Three Pillars of the Royal Stewardship
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {data.principles.map((principle, index) => (
                  <div
                    key={index}
                    id={`omanhene-pillar-${index}`}
                    className="bg-[#111111] p-4 border-r-4 border-neutral-800 hover:border-[#D4AF37] transition-all duration-300 rounded shadow-sm"
                  >
                    <div className="p-2 bg-neutral-900 w-10 h-10 rounded flex items-center justify-center border border-[#990000]/25 mb-3">
                      {getIcon(principle.title)}
                    </div>
                    <h5 className="text-xs sm:text-sm font-black text-[#D4AF37] tracking-wide uppercase">
                      {principle.title.split(' (')[0]}
                    </h5>
                    <p className="text-[11px] text-neutral-400 font-sans mt-1.5 leading-relaxed">
                      {principle.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
