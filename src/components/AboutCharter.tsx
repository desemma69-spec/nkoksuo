import React from 'react';
import { motion } from 'motion/react';
import { 
  Target, 
  Eye, 
  Award, 
  BookOpen, 
  Coins, 
  Users, 
  Cpu, 
  HeartPulse, 
  Globe, 
  Check, 
  Sparkles,
  ShieldAlert,
  Handshake,
  Shield,
  Bookmark
} from 'lucide-react';

export default function AboutCharter() {
  const visionPillars = [
    {
      id: '1',
      title: 'Educational Development',
      desc: 'Advancing access to quality instruction, modern study spaces, scholarships, and educational materials across the traditional area.',
      icon: <BookOpen className="w-5 h-5 text-[#D4AF37]" />
    },
    {
      id: '2',
      title: 'Economic Development',
      desc: 'Fostering local business incubation, micro-finance programs, market infrastructure, and robust job creation initiatives.',
      icon: <Coins className="w-5 h-5 text-[#D4AF37]" />
    },
    {
      id: '3',
      title: 'Social Development',
      desc: 'Strengthening community integration, youth empowerment, recreation centers, and welfare support networks.',
      icon: <Users className="w-5 h-5 text-[#D4AF37]" />
    },
    {
      id: '4',
      title: 'Digital Inclusion & Technology Development',
      desc: 'Establishing ICT centers, digital literacy bootcamps, and modern connectivity infrastructure for future-proof growth.',
      icon: <Cpu className="w-5 h-5 text-[#D4AF37]" />
    },
    {
      id: '5',
      title: 'Health, Sanitation & Security',
      desc: 'Improving healthcare facilities, clean water networks, standard sanitation programs, and local community safety systems.',
      icon: <HeartPulse className="w-5 h-5 text-[#D4AF37]" />
    },
    {
      id: '6',
      title: 'Diaspora Integration and Global Partnership',
      desc: 'Engaging citizens abroad and international stakeholders to collaborate on sustainable developmental projects and cultural exchanges.',
      icon: <Globe className="w-5 h-5 text-[#D4AF37]" />
    }
  ];

  const coreValues = [
    {
      num: 1,
      text: 'To promote socio-economic development through the enablement of the existing resources in the various communities.'
    },
    {
      num: 2,
      text: 'Through mobilization of resources from the various communities.'
    },
    {
      num: 3,
      text: 'Improving community social growth through the use of communal labour.'
    },
    {
      num: 4,
      text: 'Encouraging self-suffiency and reliance through effective resource mobilization.'
    },
    {
      num: 5,
      text: 'Promoting socio-economic sufficiency through effective delivery of social services.'
    },
    {
      num: 6,
      text: 'Upholding the socio cultural diversity identity of the people in the communities of New Juaben Traditional Area.'
    },
    {
      num: 7,
      text: 'Cherishing partnership with local internal and external bodies and organization.'
    }
  ];

  return (
    <section id="charter" className="py-24 bg-neutral-950 relative overflow-hidden border-t border-neutral-900">
      {/* Decorative Gold & Crimson Light effects */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#990000]/5 rounded-full blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Traditional Kente Inspired Top Border */}
      <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-[#D4AF37] via-[#990000] to-[#D4AF37] opacity-80" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[10px] font-sans font-black tracking-[0.25em] text-[#D4AF37] uppercase bg-[#990000]/15 border border-[#990000]/25 px-4 py-1.5 rounded-full">
            Strategic Charter
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-sans font-bold tracking-tight text-white uppercase">
            Mission, Vision &amp; Values
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-[#990000] to-[#D4AF37] mx-auto mt-6 rounded-full" />
          <p className="mt-4 text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans max-w-xl mx-auto">
            The guiding principles and tactical pathways steering self-sustained socio-economic development and cultural preservation across the New Juaben Traditional Area.
          </p>
        </div>

        {/* Mission and Vision Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mb-20">
          
          {/* Mission Card - 5 cols */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800/80 rounded-2xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group"
          >
            {/* Background design accents */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#990000]/10 to-transparent rounded-bl-full pointer-events-none" />
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#990000]" />
            
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 rounded-xl bg-[#990000]/15 border border-[#990000]/30 text-[#D4AF37]">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-xs font-sans font-black text-white uppercase tracking-[0.2em]">
                  Mission Statement
                </h3>
              </div>
              
              <p className="text-lg sm:text-xl font-sans font-medium text-white leading-relaxed italic border-l-2 border-[#990000]/60 pl-4 py-1 my-4">
                &ldquo;Mobilising existing resources in the communities to promote self-sustained growth through socio economic development.&rdquo;
              </p>
            </div>
            
            <div className="mt-8 pt-6 border-t border-neutral-800/60 flex items-center justify-between text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
              <span>New Juaben Council</span>
              <span>• Core Intent</span>
            </div>
          </motion.div>

          {/* Vision Card - 7 cols */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800/80 rounded-2xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group"
          >
            {/* Background design accents */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#D4AF37]/10 to-transparent rounded-bl-full pointer-events-none" />
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#D4AF37]" />

            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37]">
                  <Eye className="w-5 h-5" />
                </div>
                <h3 className="text-xs font-sans font-black text-white uppercase tracking-[0.2em]">
                  Vision Statement
                </h3>
              </div>

              <p className="text-base sm:text-lg font-sans font-bold text-neutral-200 leading-relaxed">
                To promote self-sustaining and holistic attitude towards development of the communities and the people of New Juaben Traditional Area and also build resource gaps; Notably:
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-800/60 flex items-center justify-between text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
              <span>Socio-Economic Development</span>
              <span>• Core Vision</span>
            </div>
          </motion.div>

        </div>

        {/* 6 Vision Pillars Grid */}
        <div className="mb-24">
          <div className="mb-10 flex items-center space-x-3 justify-center lg:justify-start">
            <Bookmark className="w-4 h-4 text-[#990000]" />
            <h3 className="text-xs font-sans font-black uppercase text-white tracking-[0.2em]">
              notable strategic development areas
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visionPillars.map((pillar, index) => (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="group relative bg-neutral-900 border border-neutral-800/80 hover:border-neutral-700/60 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                {/* Micro Ambient Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-800/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 bg-neutral-950 border border-neutral-800 rounded-lg group-hover:border-[#D4AF37]/40 transition-colors">
                      {pillar.icon}
                    </div>
                    <span className="text-xs font-mono font-black text-[#990000]/60 group-hover:text-[#D4AF37]/50 transition-colors">
                      Pillar 0{pillar.id}
                    </span>
                  </div>

                  <h4 className="text-xs sm:text-sm font-sans font-black text-white uppercase tracking-wide group-hover:text-[#D4AF37] transition-colors">
                    {pillar.title}
                  </h4>

                  <p className="mt-3 text-xs text-neutral-400 font-sans leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Core Values Section */}
        <div className="mt-24 pt-16 border-t border-neutral-900/60">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left side text */}
            <div className="lg:col-span-4 space-y-4">
              <span className="text-[10px] font-sans font-black tracking-[0.2em] text-[#990000] uppercase">
                Ethos &amp; Principles
              </span>
              <h3 className="text-2xl sm:text-3xl font-sans font-black text-white uppercase tracking-tight">
                Our Core Values
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
                The ethical principles that guide our relationships, communal efforts, and strategic decisions in mobilizing resources for the New Juaben Traditional Area.
              </p>
              <div className="pt-4">
                <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest">
                  <span>Seven Royal Core Values</span>
                </div>
              </div>
            </div>

            {/* Right side numbered list */}
            <div className="lg:col-span-8 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {coreValues.map((val, idx) => (
                  <motion.div
                    key={val.num}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="p-5 bg-neutral-900 border border-neutral-800 rounded-xl hover:border-neutral-700 transition-all duration-200 flex items-start space-x-4"
                  >
                    <span className="font-mono text-xs font-black text-[#D4AF37] bg-neutral-950 px-2.5 py-1 rounded border border-neutral-800 flex-shrink-0">
                      0{val.num}
                    </span>
                    <p className="text-xs text-neutral-300 leading-relaxed font-sans pt-0.5">
                      {val.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
