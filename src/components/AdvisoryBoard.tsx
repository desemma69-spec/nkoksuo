import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { AdvisoryBoardMember } from '../types';
import { Shield, Briefcase, GraduationCap, User, ArrowRight, X } from 'lucide-react';

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
  const [selectedMember, setSelectedMember] = useState<AdvisoryBoardMember | null>(null);

  // Close modal on Escape key press and block background scroll when open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedMember(null);
      }
    };
    if (selectedMember) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [selectedMember]);

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
              onClick={() => setSelectedMember(member)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-5 sm:p-6 flex flex-col justify-between hover:border-[#D4AF37]/50 transition-all duration-300 group hover:shadow-[0_12px_35px_-10px_rgba(212,175,55,0.15)] relative cursor-pointer overflow-hidden min-w-0"
            >
              {/* Corner Accents */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-transparent group-hover:border-[#D4AF37]/50 rounded-tr-2xl transition-all duration-300 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-transparent group-hover:border-[#D4AF37]/50 rounded-bl-2xl transition-all duration-300 pointer-events-none" />

              <div>
                {/* Spacious Portrait Frame */}
                <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden mb-5 bg-neutral-950 border border-neutral-800 group-hover:border-[#D4AF37]/60 transition-colors shadow-md">
                  <img
                    src={member.imageUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400'}
                    alt={member.name}
                    className="w-full h-full object-cover object-[center_15%] group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400';
                    }}
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-75 pointer-events-none" />

                  {/* Advisor Badge Overlay */}
                  <div className="absolute top-3 right-3 bg-neutral-950/90 backdrop-blur-md border border-neutral-800/80 px-2.5 py-1 rounded-lg text-xs font-mono text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                    <Shield className="w-3 h-3 text-[#990000]" />
                    <span>Advisor</span>
                  </div>

                  {/* Bottom Division Tag */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-widest text-neutral-300 bg-neutral-950/85 backdrop-blur-sm px-2.5 py-1 rounded border border-neutral-800/80">
                      Nkosuo Division
                    </span>
                  </div>
                </div>

                {/* Name & Identity */}
                <div className="space-y-3 min-w-0">
                  <div>
                    <h3 className="text-lg sm:text-xl font-display font-black text-white group-hover:text-[#D4AF37] transition-colors uppercase leading-tight [overflow-wrap:anywhere] break-words">
                      {member.name}
                    </h3>
                    <p className="text-sm text-[#D4AF37] font-sans font-bold mt-1 [overflow-wrap:anywhere] break-words">
                      {member.role}
                    </p>
                  </div>

                  {member.organization && (
                    <div className="flex items-start space-x-2 text-neutral-200 min-w-0 pt-2 border-t border-neutral-800/80">
                      <Briefcase className="w-4 h-4 mt-0.5 text-[#D4AF37] flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-mono font-semibold tracking-wide uppercase [overflow-wrap:anywhere] break-words text-neutral-200">
                        {member.organization}
                      </span>
                    </div>
                  )}

                  {/* Bio Preview with strict line clamp & overflow protection */}
                  <p className="text-xs sm:text-sm text-neutral-200 font-medium leading-relaxed font-sans line-clamp-3 [overflow-wrap:anywhere] break-words pt-1">
                    {member.bio}
                  </p>
                </div>
              </div>

              {/* Action Button Footer */}
              <div className="mt-5 pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs sm:text-sm font-sans text-[#D4AF37] group-hover:text-amber-300 font-bold uppercase tracking-wider">
                <span className="flex items-center space-x-1.5">
                  <User className="w-4 h-4" />
                  <span>View Full Profile Page</span>
                </span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FULL PROFILE PAGE MODAL */}
      {selectedMember && (
        <div 
          id="advisory-profile-modal" 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in"
          onClick={() => setSelectedMember(null)}
        >
          <div 
            className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl relative my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Modal Header */}
            <div className="bg-neutral-950 px-6 py-4 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs font-mono text-[#D4AF37] uppercase tracking-widest">
                <Shield className="w-4 h-4 text-[#990000]" />
                <span>Royal Advisory Board • Profile Page</span>
              </div>
              <button
                id="close-advisory-modal"
                type="button"
                onClick={() => setSelectedMember(null)}
                className="p-2 text-neutral-400 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg transition-all flex items-center space-x-1.5 text-xs font-sans font-bold cursor-pointer"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">Close</span>
              </button>
            </div>

            {/* Modal Body Content */}
            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
              {/* Left Column: Portrait Frame */}
              <div className="md:col-span-5 flex flex-col items-center">
                <div className="w-full aspect-[3/4] rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800 shadow-xl relative group">
                  <img
                    src={selectedMember.imageUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400'}
                    alt={selectedMember.name}
                    className="w-full h-full object-cover object-[center_15%]"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="mt-4 w-full bg-neutral-950/90 border border-neutral-800 p-3 rounded-xl text-center">
                  <p className="text-xs font-mono uppercase tracking-wider text-neutral-400">Division Jurisdiction</p>
                  <p className="text-xs font-bold text-[#D4AF37] mt-0.5">Nkosuo Division • New Juaben</p>
                </div>
              </div>

              {/* Right Column: Full Profile Info */}
              <div className="md:col-span-7 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div>
                    <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-3 py-1.5 rounded-lg inline-block mb-2.5 font-bold">
                      Strategic Advisor
                    </span>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-white uppercase tracking-tight [overflow-wrap:anywhere] break-words">
                      {selectedMember.name}
                    </h2>
                    <p className="text-base sm:text-lg font-sans font-bold text-[#D4AF37] mt-1.5 [overflow-wrap:anywhere] break-words">
                      {selectedMember.role}
                    </p>
                  </div>

                  {selectedMember.organization && (
                    <div className="flex items-start space-x-3 text-neutral-200 bg-neutral-950 border border-neutral-800 p-4 rounded-xl">
                      <Briefcase className="w-5 h-5 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-xs font-mono text-neutral-400 font-bold uppercase block">Affiliation / Organization</span>
                        <span className="text-xs sm:text-sm font-mono text-white font-bold uppercase [overflow-wrap:anywhere] break-words mt-0.5 block">
                          {selectedMember.organization}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3 pt-4 border-t border-neutral-800">
                    <div className="flex items-center space-x-2 text-xs sm:text-sm font-mono text-[#D4AF37] uppercase font-bold tracking-wider">
                      <GraduationCap className="w-5 h-5 text-[#D4AF37]" />
                      <span>Biography & Advisory Mandate</span>
                    </div>
                    <p className="text-sm sm:text-base text-white font-medium leading-relaxed font-sans whitespace-pre-line [overflow-wrap:anywhere] break-words pt-1">
                      {selectedMember.bio}
                    </p>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="pt-4 border-t border-neutral-800 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setSelectedMember(null)}
                    className="px-5 py-2.5 bg-[#990000] hover:bg-red-800 text-white text-xs font-sans font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                  >
                    Close Profile Page
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

