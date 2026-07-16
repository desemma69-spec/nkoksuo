import React from 'react';
import { motion } from 'motion/react';
import { Crown, Sparkles, ShieldCheck, Landmark } from 'lucide-react';
import { TraditionalLeader } from '../types';

interface LeadersProps {
  traditionalLeaders: TraditionalLeader[];
}

const LEADER_ICONS: Record<string, React.ReactNode> = {
  paramount_chief: <Crown className="w-5 h-5 text-[#D4AF37]" />,
  hemaa: <Sparkles className="w-5 h-5 text-purple-400" />,
  nkosuo_hene: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
  nkosuo_hemaa: <Sparkles className="w-5 h-5 text-amber-400" />,
  chief_nyamekrom: <Landmark className="w-5 h-5 text-blue-400" />,
};

export default function Leaders({ traditionalLeaders }: LeadersProps) {
  const PREFERRED_ORDER = ["paramount_chief", "nkosuo_hene", "hemaa", "nkosuo_hemaa"];

  const sortedLeaders = [...traditionalLeaders].sort((a, b) => {
    const indexA = PREFERRED_ORDER.indexOf(a.id);
    const indexB = PREFERRED_ORDER.indexOf(b.id);
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return 0;
  });

  return (
    <section id="traditional-leaders" className="py-24 bg-black border-t border-neutral-900 relative overflow-hidden">
      {/* Decorative Traditional Backdrop Accent */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#990000]/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-sans font-bold tracking-tight text-white uppercase">
            ROYAL LEADERS OF NKOSUO DIVISION • NEW JUABEN TRADITIONAL AREA
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-[#990000] to-[#D4AF37] mx-auto mt-6 rounded-full" />
          <p className="mt-4 text-sm sm:text-base text-neutral-400 leading-relaxed font-sans">
            The revered traditional leadership steering cultural preservation, societal cohesion, and infrastructural development across the Nkosuo Division of New Juaben Traditional Area.
          </p>
        </div>

        {/* Leaders Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 ${sortedLeaders.length === 3 ? 'lg:grid-cols-3 max-w-5xl mx-auto' : 'lg:grid-cols-4'} gap-8`}>
          {sortedLeaders.map((leader, index) => (
            <motion.div
              key={leader.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-neutral-950 rounded-2xl border border-neutral-900 hover:border-neutral-800 p-5 transition-all duration-300 flex flex-col justify-between h-full relative"
              id={`leader-card-${leader.id}`}
            >
              {/* Card Accent Glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#990000]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

              <div>
                {/* Beautiful Photo Frame */}
                <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-5 bg-neutral-900 border border-neutral-800">
                  <img
                    src={leader.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400'}
                    alt={leader.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400';
                    }}
                  />
                  
                  {/* Category icon badge */}
                  <div className="absolute top-3 right-3 bg-neutral-950/95 backdrop-blur-sm border border-neutral-800/80 p-2 rounded-lg shadow-lg">
                    {LEADER_ICONS[leader.id] || <Crown className="w-5 h-5 text-[#D4AF37]" />}
                  </div>
                </div>

                {/* Role Label */}
                <span className="text-[9px] font-sans font-black tracking-widest text-[#D4AF37] uppercase bg-amber-950/30 border border-amber-900/40 px-2 py-1 rounded inline-block mb-3">
                  {leader.role}
                </span>

                {/* Name */}
                <h3 className="text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors duration-200">
                  {leader.name}
                </h3>

                {/* Title */}
                <p className="text-[11px] text-neutral-400 font-sans mt-1.5 font-medium italic">
                  {leader.title}
                </p>
              </div>

              {/* Bio Paragraph */}
              <p className="text-xs text-neutral-400 font-sans mt-4 leading-relaxed border-t border-neutral-900/80 pt-4 flex-grow">
                {leader.bio}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
