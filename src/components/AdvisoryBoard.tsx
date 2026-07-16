import { motion } from 'motion/react';
import { AdvisoryBoardMember } from '../types';
import { Shield, Briefcase, GraduationCap } from 'lucide-react';

interface AdvisoryBoardProps {
  members: AdvisoryBoardMember[];
  subtitle?: string;
  title?: string;
  desc?: string;
}

export default function AdvisoryBoard({ 
  members,
  subtitle = 'Advisory Council & Strategy',
  title = 'Nkosuo Advisory Board',
  desc = 'A distinguished panel of technical experts, development economists, healthcare champions, and financial specialists advising the Nkosuo Division on the strategic implementation of our modernization projects.'
}: AdvisoryBoardProps) {
  return (
    <section id="advisory-board-section" className="pt-36 sm:pt-44 pb-24 px-4 sm:px-6 lg:px-8 bg-neutral-950 text-neutral-100 relative overflow-hidden">
      {/* Aesthetic Background Accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-950/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-950/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div id="advisory-board-header" className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs sm:text-sm font-mono text-[#D4AF37] uppercase tracking-widest block mb-2">
            {subtitle}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold tracking-tight text-white uppercase">
            {title}
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-[#990000] to-[#D4AF37] mx-auto mt-6 rounded-full" />
          <p className="mt-4 text-sm sm:text-base text-neutral-400 leading-relaxed font-sans">
            {desc}
          </p>
        </div>

        {/* Members Grid */}
        <div id="advisory-members-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member, index) => (
            <motion.div
              key={member.id || index}
              id={`advisory-member-card-${member.id || index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-neutral-900/60 border border-neutral-800/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-[#D4AF37]/30 transition-all duration-300 group hover:shadow-[0_10px_30px_-15px_rgba(212,175,55,0.1)] relative"
            >
              {/* Gold Accent Corner Border on Hover */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-transparent group-hover:border-[#D4AF37]/40 rounded-tr-2xl transition-all duration-300 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-transparent group-hover:border-[#D4AF37]/40 rounded-bl-2xl transition-all duration-300 pointer-events-none" />

              <div className="space-y-6">
                {/* Photo & Identity */}
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-neutral-800 group-hover:border-[#D4AF37] transition-colors duration-300 relative flex-shrink-0 bg-neutral-950">
                    <img
                      src={member.imageUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400'}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-display font-black text-white group-hover:text-[#D4AF37] transition-colors uppercase leading-tight">
                      {member.name}
                    </h3>
                    <p className="text-xs text-[#D4AF37] font-sans font-medium mt-1">
                      {member.role}
                    </p>
                  </div>
                </div>

                {/* Organization and Bio */}
                <div className="space-y-3 pt-2 border-t border-neutral-800/60">
                  <div className="flex items-start space-x-2 text-neutral-400">
                    <Briefcase className="w-4 h-4 mt-0.5 text-[#D4AF37]/80 flex-shrink-0" />
                    <span className="text-[11px] font-mono tracking-wide uppercase">
                      {member.organization}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
                    {member.bio}
                  </p>
                </div>
              </div>

              {/* Card Footer Decoration */}
              <div className="mt-6 flex items-center justify-between text-[10px] text-neutral-600 font-mono border-t border-neutral-800/40 pt-4">
                <span className="flex items-center space-x-1 uppercase">
                  <Shield className="w-3 h-3 text-[#990000]" />
                  <span>Strategic Advisor</span>
                </span>
                <span className="uppercase">Nkosuo Division</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
