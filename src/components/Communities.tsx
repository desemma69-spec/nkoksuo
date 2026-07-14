import { useState, useRef } from 'react';
import { COMMUNITIES_DATA, PROJECTS_DATA, EVENTS_DATA } from '../data';
import { 
  Award, 
  BookOpen, 
  Clock, 
  Users, 
  Briefcase, 
  Landmark, 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight, 
  Crown, 
  Calendar, 
  MapPin, 
  Coins,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { Project, Event as RoyalEvent } from '../types';
import VideoPlayer from './VideoPlayer';

import { useEffect } from 'react';
import { Community } from '../types';

interface CommunitiesProps {
  communities?: Community[];
  projects?: Project[];
  events?: RoyalEvent[];
}

export default function Communities({
  communities = COMMUNITIES_DATA,
  projects = PROJECTS_DATA,
  events = EVENTS_DATA
}: CommunitiesProps) {
  const [selectedCommunityId, setSelectedCommunityId] = useState<string>('');
  const [activeSubTab, setActiveSubTab] = useState<'leaders' | 'projects' | 'events'>('leaders');
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (communities && communities.length > 0) {
      if (!selectedCommunityId || !communities.some(c => c.id === selectedCommunityId)) {
        setSelectedCommunityId(communities[0].id);
      }
    } else {
      setSelectedCommunityId('');
    }
  }, [communities, selectedCommunityId]);

  const activeCommunity = (communities && communities.find(c => c.id === selectedCommunityId)) || (communities && communities[0]) || COMMUNITIES_DATA[0];
  const chief = activeCommunity?.chiefProfile;
  const queen = activeCommunity?.queenProfile;

  useEffect(() => {
    if (activeCommunity && !activeCommunity.chiefProfile && activeSubTab === 'leaders') {
      setActiveSubTab('projects');
    }
  }, [activeCommunity, activeSubTab]);

  // Filter projects and events for the selected community
  const communityProjects = projects.filter(p => p.communityId === selectedCommunityId);
  const communityEvents = events.filter(e => e.communityId === selectedCommunityId);

  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsContainerRef.current) {
      const scrollAmount = direction === 'left' ? -240 : 240;
      tabsContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Helper to handle community tab change and reset sub-tab
  const handleCommunityChange = (id: string) => {
    setSelectedCommunityId(id);
    const comm = communities.find(c => c.id === id);
    if (comm && !comm.chiefProfile) {
      setActiveSubTab('projects');
    } else {
      setActiveSubTab('leaders');
    }
  };

  return (
    <section
      id="communities"
      className="relative py-24 bg-[#0a0a0a] border-b border-neutral-950"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-[#D4AF37] text-xs font-black uppercase tracking-[0.25em] border-l-2 border-[#990000] pl-3 mb-3 block">
            Royal Divisions of New Juaben
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white uppercase mt-2">
            Communities & Leaders
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
            The New Juaben Traditional Area consists of vibrant divisional communities. Under the leadership of visionary Chiefs and Queen Mothers, these communities drive local development (Nkosuo), preserve rich Akan heritage, and foster social progress.
          </p>
          <div className="mt-5 inline-flex items-center space-x-2 px-3 py-1.5 bg-[#990000]/10 border border-[#990000]/30 rounded text-xs font-sans text-neutral-300">
            <Landmark className="w-3.5 h-3.5 text-red-500" />
            <span>Select a community tab below to explore its leadership profiles, active developmental projects, and local events</span>
          </div>
        </div>

        {/* Community Tabs Control Area */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-5 border-b border-neutral-900 pb-3">
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse"></span>
              <h4 className="text-[11px] font-sans font-black text-neutral-400 uppercase tracking-[0.2em]">
                Divisional Communities ({communities.length})
              </h4>
            </div>
            <span className="text-[10px] font-sans text-neutral-500 italic hidden md:inline">
              Select a divisional seat to view its leadership, developmental projects, and local events
            </span>
          </div>

          {/* Mathematically Balanced Responsive Grid - 4 columns in a row on large screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {communities.map((community, index) => {
              const isActive = community.id === selectedCommunityId;
              return (
                <button
                  key={community.id}
                  id={`tab-community-${community.id}`}
                  onClick={() => handleCommunityChange(community.id)}
                  className={`flex items-center space-x-4 px-4 py-5 rounded-lg border-b-4 transition-all duration-300 cursor-pointer text-left ${
                    isActive
                      ? 'bg-gradient-to-b from-[#1c1c1c] to-[#111111] border-[#D4AF37] text-[#D4AF37] shadow-[0_4px_25px_rgba(212,175,55,0.06)] scale-[1.02]'
                      : 'bg-[#111111]/80 border-neutral-800 text-neutral-400 hover:text-white hover:bg-[#151515] hover:border-neutral-700 hover:scale-[1.01]'
                  }`}
                >
                  <div className={`w-11 h-11 rounded-full overflow-hidden flex-shrink-0 border-2 transition-all duration-300 flex items-center justify-center ${
                    isActive ? 'border-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.25)]' : 'border-neutral-800 grayscale'
                  }`}>
                    {community.chiefProfile?.avatarUrl ? (
                      <img
                        src={community.chiefProfile.avatarUrl}
                        alt={community.chiefProfile.name}
                        className="w-full h-full object-cover object-center"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#1c1c1c] flex items-center justify-center">
                        <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className={`block text-xs sm:text-sm md:text-base font-sans font-black uppercase tracking-[0.05em] truncate ${
                      isActive ? 'text-[#D4AF37]' : 'text-neutral-200'
                    }`}>
                      {community.name}
                    </span>
                    <span className="block text-[10px] font-sans font-bold text-neutral-500 uppercase tracking-wider truncate mt-1">
                      {community.chiefProfile?.title ? community.chiefProfile.title.split('&')[0].trim() : "NKOSUO DEVELOPMENT"}
                    </span>
                  </div>
                  {/* Small pop stat badge */}
                  <div className="flex-shrink-0 text-right">
                    <span className={`text-[10px] font-mono font-black px-2 py-1 rounded ${
                      isActive ? 'bg-[#990000]/20 text-[#D4AF37] border border-[#D4AF37]/25' : 'bg-black/60 text-neutral-500 border border-neutral-900'
                    }`}>
                      {community.population}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Tab Panel with Motion Animation */}
        <div
          id="active-community-dashboard-panel"
          className="bg-gradient-to-br from-[#121212] to-black border border-neutral-800 rounded-xl p-5 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden"
        >
          {/* Ambient Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#990000]/5 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4AF37]/3 rounded-full blur-3xl -z-10"></div>

          {/* Inner Navigation Tabs (Royal Leaders vs Developmental Projects vs Events) */}
          <div className="flex border-b border-neutral-800/80 mb-8 overflow-x-auto gap-2 pb-1 scrollbar-none">
            {activeCommunity.chiefProfile && (
              <button
                onClick={() => setActiveSubTab('leaders')}
                className={`flex-shrink-0 px-5 py-3 text-[11px] font-sans font-black uppercase tracking-widest border-b-2 transition-all cursor-pointer flex items-center space-x-2.5 ${
                  activeSubTab === 'leaders'
                    ? 'border-[#D4AF37] text-[#D4AF37] bg-white/[0.03]'
                    : 'border-transparent text-neutral-400 hover:text-white hover:bg-white/[0.01]'
                }`}
              >
                <Crown className="w-4 h-4 text-[#D4AF37]" />
                <span>Royal Leaders</span>
              </button>
            )}
            <button
              onClick={() => setActiveSubTab('projects')}
              className={`flex-shrink-0 px-5 py-3 text-[11px] font-sans font-black uppercase tracking-widest border-b-2 transition-all cursor-pointer flex items-center space-x-2.5 ${
                activeSubTab === 'projects'
                  ? 'border-[#D4AF37] text-[#D4AF37] bg-white/[0.03]'
                  : 'border-transparent text-neutral-400 hover:text-white hover:bg-white/[0.01]'
              }`}
            >
              <Briefcase className="w-4 h-4 text-[#D4AF37]" />
              <span>Development Projects ({communityProjects.length})</span>
            </button>
            <button
              onClick={() => setActiveSubTab('events')}
              className={`flex-shrink-0 px-5 py-3 text-[11px] font-sans font-black uppercase tracking-widest border-b-2 transition-all cursor-pointer flex items-center space-x-2.5 ${
                activeSubTab === 'events'
                  ? 'border-[#D4AF37] text-[#D4AF37] bg-white/[0.03]'
                  : 'border-transparent text-neutral-400 hover:text-white hover:bg-white/[0.01]'
              }`}
            >
              <Calendar className="w-4 h-4 text-[#D4AF37]" />
              <span>Events & Durbars ({communityEvents.length})</span>
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCommunityId}-${activeSubTab}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              
              {/* SUB-TAB 1: ROYAL LEADERS (CHIEF & QUEEN MOTHER PROFILE) */}
              {activeSubTab === 'leaders' && chief && queen && (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                  
                  {/* CHIEF CARD SECTION */}
                  <div className="bg-[#111111]/60 border border-neutral-800/80 rounded-xl p-6 sm:p-8 relative hover:border-[#D4AF37]/30 transition-all duration-300">
                    <span className="absolute top-4 right-4 text-[10px] font-mono text-[#D4AF37]/50 uppercase tracking-widest bg-[#D4AF37]/5 border border-[#D4AF37]/20 px-2.5 py-1 rounded">
                      Divisional Chief
                    </span>
                    
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
                      <div className="relative w-28 h-35 sm:w-32 sm:h-40 rounded overflow-hidden border border-neutral-800 shadow-lg flex-shrink-0">
                        <img 
                          src={chief.avatarUrl} 
                          alt={chief.name}
                          className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-300"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-0 right-0 px-1.5 py-0.5 bg-[#990000] text-white font-black text-[7px] tracking-widest uppercase rounded-bl">
                          EST. {chief.stooledYear}
                        </div>
                      </div>
                      <div className="text-center sm:text-left">
                        <span className="text-[10px] font-sans font-black text-[#990000] tracking-[0.2em] uppercase block mb-1">
                          {chief.title}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tight">
                          {chief.name}
                        </h3>
                        <p className="text-[11px] font-sans font-bold text-[#D4AF37] tracking-widest uppercase mt-1">
                          Reign Name: {chief.reignTitle}
                        </p>
                        <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-2">
                          <span className="text-[9px] font-mono text-neutral-400 bg-black/60 px-2 py-1 rounded border border-neutral-900 flex items-center">
                            <Clock className="w-3 h-3 mr-1.5 text-[#990000]" />
                            Reign: {new Date().getFullYear() - parseInt(chief.stooledYear)} Yrs
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-5">
                      <div>
                        <h4 className="text-[10px] font-sans font-black text-neutral-400 uppercase tracking-[0.15em] mb-2 border-l-2 border-[#990000] pl-2">
                          Biography
                        </h4>
                        <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed font-sans">{chief.bio}</p>
                      </div>

                      <div className="p-4 bg-[#990000]/10 border-l-2 border-[#D4AF37] rounded">
                        <h5 className="text-[9px] font-sans font-black text-[#D4AF37] tracking-[0.15em] uppercase mb-1 flex items-center">
                          <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-[#D4AF37]" /> Developmental Vision
                        </h5>
                        <p className="text-xs font-sans text-neutral-300 leading-relaxed italic">&ldquo;{chief.vision}&rdquo;</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-neutral-800/60">
                        <div>
                          <h5 className="text-[9px] font-sans font-black text-neutral-400 uppercase tracking-[0.15em] mb-2 flex items-center">
                            <BookOpen className="w-3.5 h-3.5 mr-1.5 text-red-500" /> Education
                          </h5>
                          <ul className="space-y-1.5 text-xs text-neutral-400 font-sans">
                            {chief.education.map((edu, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="text-[#D4AF37] mr-1.5">•</span>
                                <span>{edu}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="text-[9px] font-sans font-black text-[#D4AF37] uppercase tracking-[0.15em] mb-2 flex items-center">
                            <Award className="w-3.5 h-3.5 mr-1.5 text-[#D4AF37]" /> Key Milestones
                          </h5>
                          <ul className="space-y-1.5 text-xs text-neutral-400 font-sans">
                            {chief.achievements.map((ach, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="text-emerald-500 mr-1.5">✓</span>
                                <span>{ach}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* QUEEN MOTHER CARD SECTION */}
                  <div className="bg-[#111111]/60 border border-neutral-800/80 rounded-xl p-6 sm:p-8 relative hover:border-[#D4AF37]/30 transition-all duration-300">
                    <span className="absolute top-4 right-4 text-[10px] font-mono text-[#D4AF37]/50 uppercase tracking-widest bg-[#D4AF37]/5 border border-[#D4AF37]/20 px-2.5 py-1 rounded">
                      Divisional Queen Mother
                    </span>
                    
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
                      <div className="relative w-28 h-35 sm:w-32 sm:h-40 rounded overflow-hidden border border-neutral-800 shadow-lg flex-shrink-0">
                        <img 
                          src={queen.avatarUrl} 
                          alt={queen.name}
                          className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-300"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-0 right-0 px-1.5 py-0.5 bg-[#990000] text-white font-black text-[7px] tracking-widest uppercase rounded-bl">
                          EST. {queen.enstooledYear}
                        </div>
                      </div>
                      <div className="text-center sm:text-left">
                        <span className="text-[10px] font-sans font-black text-[#990000] tracking-[0.2em] uppercase block mb-1">
                          {queen.title}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tight">
                          {queen.name}
                        </h3>
                        <p className="text-[11px] font-sans font-bold text-[#D4AF37] tracking-widest uppercase mt-1">
                          Reign Name: {queen.reignTitle}
                        </p>
                        <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-2">
                          <span className="text-[9px] font-mono text-neutral-400 bg-black/60 px-2 py-1 rounded border border-neutral-900 flex items-center">
                            <Clock className="w-3 h-3 mr-1.5 text-[#990000]" />
                            Reign: {new Date().getFullYear() - parseInt(queen.enstooledYear)} Yrs
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-5">
                      <div>
                        <h4 className="text-[10px] font-sans font-black text-neutral-400 uppercase tracking-[0.15em] mb-2 border-l-2 border-[#990000] pl-2">
                          Biography
                        </h4>
                        <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed font-sans">{queen.bio}</p>
                      </div>

                      <div className="p-4 bg-[#990000]/10 border-l-2 border-[#D4AF37] rounded">
                        <h5 className="text-[9px] font-sans font-black text-[#D4AF37] tracking-[0.15em] uppercase mb-1 flex items-center">
                          <Sparkles className="w-3.5 h-3.5 mr-1.5 text-[#D4AF37]" /> Queen Mother&apos;s Advocacy
                        </h5>
                        <p className="text-xs font-sans text-neutral-300 leading-relaxed italic">&ldquo;{queen.vision}&rdquo;</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-neutral-800/60">
                        <div>
                          <h5 className="text-[9px] font-sans font-black text-neutral-400 uppercase tracking-[0.15em] mb-2 flex items-center">
                            <BookOpen className="w-3.5 h-3.5 mr-1.5 text-red-500" /> Education
                          </h5>
                          <ul className="space-y-1.5 text-xs text-neutral-400 font-sans">
                            {queen.education.map((edu, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="text-[#D4AF37] mr-1.5">•</span>
                                <span>{edu}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="text-[9px] font-sans font-black text-[#D4AF37] uppercase tracking-[0.15em] mb-2 flex items-center">
                            <Award className="w-3.5 h-3.5 mr-1.5 text-[#D4AF37]" /> Stool Accomplishments
                          </h5>
                          <ul className="space-y-1.5 text-xs text-neutral-400 font-sans">
                            {queen.achievements.map((ach, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="text-emerald-500 mr-1.5">✓</span>
                                <span>{ach}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* SUB-TAB 2: DEVELOPMENTAL PROJECTS */}
              {activeSubTab === 'projects' && (
                <div>
                  <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg sm:text-xl font-display font-black text-white uppercase">
                        Nkosuo Developmental Projects
                      </h3>
                      <p className="text-xs text-neutral-400 font-sans mt-0.5">
                        Socio-economic upgrading initiatives funded and managed by the division in {activeCommunity.name}.
                      </p>
                    </div>
                  </div>

                  {communityProjects.length === 0 ? (
                    <div className="text-center py-12 bg-black/40 border border-neutral-800/60 rounded-xl">
                      <Briefcase className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
                      <h4 className="text-xs font-sans font-black text-neutral-400 uppercase tracking-widest">
                        No active projects registered
                      </h4>
                      <p className="text-neutral-500 text-xs mt-1 max-w-md mx-auto">
                        There are currently no active developmental projects logged under this division.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {communityProjects.map((project) => (
                        <div 
                          key={project.id}
                          className="bg-[#111111]/40 border border-neutral-800 rounded-xl overflow-hidden hover:border-[#D4AF37]/40 transition-all duration-300 flex flex-col h-full"
                        >
                          <div className="relative h-44 w-full bg-neutral-900 overflow-hidden border-b border-neutral-800 flex-shrink-0">
                            {project.videoUrl ? (
                              <VideoPlayer
                                videoUrl={project.videoUrl}
                                videoType={project.videoType}
                                thumbnailUrl={project.image}
                                title={project.title}
                              />
                            ) : project.image ? (
                              <img 
                                src={project.image} 
                                alt={project.title}
                                className="w-full h-full object-cover object-center hover:scale-105 transition-all duration-500"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-neutral-900 to-black">
                                <Briefcase className="w-10 h-10 text-neutral-800" />
                              </div>
                            )}
                            {/* Project Status Tag */}
                            <div className="absolute top-3 right-3">
                              <span className={`text-[8px] font-sans font-black uppercase tracking-widest px-2.5 py-1 rounded border shadow-lg ${
                                project.status === 'completed'
                                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                                  : project.status === 'ongoing'
                                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                                  : 'bg-sky-500/10 border-sky-500/30 text-sky-400'
                              }`}>
                                {project.status}
                              </span>
                            </div>
                            {/* Project Category Tag */}
                            <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded border border-neutral-800 text-[8px] font-sans font-black uppercase text-[#D4AF37] tracking-widest">
                              {project.category}
                            </div>
                          </div>

                          <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                            <div>
                              <h4 className="text-base sm:text-lg font-sans font-black text-white uppercase tracking-tight mb-2">
                                {project.title}
                              </h4>
                              <p className="text-xs text-neutral-400 font-sans leading-relaxed mb-4">
                                {project.description}
                              </p>
                              
                              {/* Progress bar */}
                              <div className="mb-4">
                                <div className="flex justify-between text-[10px] font-sans font-black uppercase text-neutral-500 mb-1">
                                  <span>Implementation Progress</span>
                                  <span className="text-neutral-300">{project.progress}%</span>
                                </div>
                                <div className="h-2 w-full bg-black rounded-full overflow-hidden border border-neutral-900">
                                  <div 
                                    className="h-full bg-gradient-to-r from-[#990000] to-[#D4AF37] rounded-full transition-all duration-500"
                                    style={{ width: `${project.progress}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>

                            {/* Indicators Panel */}
                            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-neutral-800/60 text-[11px] font-sans">
                              <div className="space-y-2">
                                <div className="flex items-center text-neutral-500 font-bold uppercase tracking-wider">
                                  <Coins className="w-3.5 h-3.5 mr-1.5 text-[#D4AF37]" /> Budget
                                </div>
                                <strong className="text-neutral-200 font-mono text-xs block">{project.budget}</strong>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center text-neutral-500 font-bold uppercase tracking-wider">
                                  <Users className="w-3.5 h-3.5 mr-1.5 text-[#990000]" /> Beneficiaries
                                </div>
                                <strong className="text-neutral-200 text-xs block truncate">{project.beneficiaries}</strong>
                              </div>
                              <div className="col-span-2 space-y-1.5 pt-2 border-t border-neutral-900/60">
                                <span className="text-[9px] font-sans font-black uppercase text-[#D4AF37] tracking-wider block">Impact & Outreach</span>
                                <p className="text-neutral-400 text-xs leading-normal italic">&ldquo;{project.impactSummary}&rdquo;</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* SUB-TAB 3: EVENTS & DURBARS */}
              {activeSubTab === 'events' && (
                <div>
                  <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg sm:text-xl font-display font-black text-white uppercase">
                        Divisional Events & Traditional Durbars
                      </h3>
                      <p className="text-xs text-neutral-400 font-sans mt-0.5">
                        Festivals, traditional council assemblies, cleanups, and community developmental screenups in {activeCommunity.name}.
                      </p>
                    </div>
                  </div>

                  {communityEvents.length === 0 ? (
                    <div className="text-center py-12 bg-black/40 border border-neutral-800/60 rounded-xl">
                      <Calendar className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
                      <h4 className="text-xs font-sans font-black text-neutral-400 uppercase tracking-widest">
                        No upcoming events scheduled
                      </h4>
                      <p className="text-neutral-500 text-xs mt-1 max-w-md mx-auto">
                        There are currently no upcoming events, festivals or durbars scheduled for this sub-community.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {communityEvents.map((event) => (
                        <div 
                          key={event.id}
                          className="bg-[#111111]/40 border border-neutral-800 rounded-xl overflow-hidden hover:border-[#D4AF37]/40 transition-all duration-300 flex flex-col h-full"
                        >
                          <div className="relative h-40 w-full bg-neutral-900 overflow-hidden border-b border-neutral-800 flex-shrink-0">
                            {event.videoUrl ? (
                              <VideoPlayer
                                videoUrl={event.videoUrl}
                                videoType={event.videoType}
                                thumbnailUrl={event.imageUrl}
                                title={event.title}
                              />
                            ) : event.imageUrl ? (
                              <img 
                                src={event.imageUrl} 
                                alt={event.title}
                                className="w-full h-full object-cover object-center hover:scale-105 transition-all duration-500"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-[#111111] to-black">
                                <Calendar className="w-10 h-10 text-neutral-800" />
                              </div>
                            )}
                            <div className="absolute top-3 right-3 bg-[#990000] text-white px-3 py-1 rounded text-[8px] font-sans font-black uppercase tracking-widest border border-[#990000]/40 shadow-md flex items-center space-x-1.5">
                              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                              <span>{event.category}</span>
                            </div>
                          </div>

                          <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex flex-wrap items-center gap-3 mb-3 text-[10px] font-sans text-[#D4AF37] font-black uppercase tracking-wider">
                                <span className="flex items-center">
                                  <Calendar className="w-3.5 h-3.5 mr-1.5 text-[#D4AF37]" /> {event.date}
                                </span>
                                {event.time && (
                                  <span className="flex items-center">
                                    <Clock className="w-3.5 h-3.5 mr-1.5 text-[#D4AF37]" /> {event.time}
                                  </span>
                                )}
                              </div>
                              <h4 className="text-base sm:text-lg font-sans font-black text-white uppercase tracking-tight mb-2">
                                {event.title}
                              </h4>
                              <p className="text-xs text-neutral-400 font-sans leading-relaxed mb-4">
                                {event.description}
                              </p>
                            </div>

                            {/* Location Section */}
                            <div className="pt-4 border-t border-neutral-800/60 mt-4">
                              <span className="text-[9px] font-sans font-black uppercase text-neutral-500 tracking-wider block mb-1">Event Venue</span>
                              <div className="flex items-center text-xs text-neutral-300 font-sans">
                                <MapPin className="w-4 h-4 mr-2 text-[#990000] flex-shrink-0" />
                                <span className="font-medium">{event.location}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
