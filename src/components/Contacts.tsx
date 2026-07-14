import { Phone, Mail, MapPin, Clock, Shield, Landmark } from 'lucide-react';
import { ContactInfo } from '../types';

interface ContactsProps {
  contacts: ContactInfo;
}

export default function Contacts({ contacts }: ContactsProps) {
  return (
    <section id="contacts-section" className="py-20 bg-[#0a0a0a] relative overflow-hidden border-t border-neutral-900">
      {/* Traditional Adinkra symbol subtle background layout */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none flex items-center justify-center">
        <Landmark className="w-96 h-96 text-[#D4AF37]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-[#1c1404] px-3.5 py-1.5 rounded border border-[#D4AF37]/20 text-[#D4AF37] text-xs font-sans font-black tracking-widest uppercase mb-4">
            <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Official Inquiries</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase tracking-tight mb-4">
            Council Secretariat <span className="text-[#D4AF37]">Contacts</span>
          </h2>
          <p className="text-sm text-neutral-400 font-sans leading-relaxed">
            Get in touch with the Nkosuo (Development) Division. Reach out for development partnerships, community projects information, or traditional protocol inquiries.
          </p>
        </div>

        <div className="space-y-4">
          
          {/* Card 1: Palace Location */}
          <div className="bg-[#111111]/60 border border-neutral-800/80 rounded-2xl p-6 hover:border-[#D4AF37]/30 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 group">
            <div className="flex items-start md:items-center space-x-5">
              <div className="w-12 h-12 rounded-xl bg-amber-950/40 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#990000]/10 transition-colors duration-300 flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-sans font-black text-neutral-500 uppercase tracking-widest">Physical Address</h3>
                <p className="text-sm text-neutral-200 mt-1 font-sans leading-relaxed">
                  {contacts.address}
                </p>
              </div>
            </div>
            {contacts.gpsAddress && (
              <div className="flex-shrink-0 flex items-center space-x-3 bg-[#1a140b] border border-[#D4AF37]/10 px-4 py-2 rounded-xl self-start md:self-auto">
                <span className="text-[10px] font-sans text-neutral-500 uppercase tracking-wider font-bold">Ghana Post GPS</span>
                <span className="text-xs font-mono font-bold text-[#D4AF37]">
                  {contacts.gpsAddress}
                </span>
              </div>
            )}
          </div>

          {/* Card 2: Phone & Email */}
          <div className="bg-[#111111]/60 border border-neutral-800/80 rounded-2xl p-6 hover:border-[#D4AF37]/30 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 group">
            <div className="flex items-start md:items-center space-x-5 flex-1">
              <div className="w-12 h-12 rounded-xl bg-amber-950/40 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#990000]/10 transition-colors duration-300 flex-shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                <div>
                  <h3 className="text-xs font-sans font-black text-[#D4AF37] uppercase tracking-widest">Call Secretariat</h3>
                  <p className="text-sm text-neutral-200 mt-1 font-mono">
                    {contacts.phone}
                  </p>
                </div>
                <div>
                  <h3 className="text-xs font-sans font-black text-[#D4AF37] uppercase tracking-widest">Email Address</h3>
                  <p className="text-sm text-neutral-200 mt-1 font-mono break-all">
                    {contacts.email}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0 text-left md:text-right hidden lg:block">
              <span className="text-[10px] font-sans text-neutral-500 uppercase tracking-wider block">
                Official Secretariat
              </span>
              <span className="text-[9px] text-neutral-600 font-sans block mt-0.5">
                Open for active partnerships
              </span>
            </div>
          </div>

          {/* Card 3: Working Hours */}
          <div className="bg-[#111111]/60 border border-neutral-800/80 rounded-2xl p-6 hover:border-[#D4AF37]/30 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 group">
            <div className="flex items-start md:items-center space-x-5">
              <div className="w-12 h-12 rounded-xl bg-amber-950/40 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#990000]/10 transition-colors duration-300 flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-sans font-black text-neutral-500 uppercase tracking-widest">Office Hours</h3>
                <p className="text-sm text-neutral-200 mt-1 font-sans leading-relaxed">
                  {contacts.officeHours}
                </p>
              </div>
            </div>
            
            <div className="flex-shrink-0 max-w-sm bg-[#160d0d]/30 border-l border-l-[#990000] p-3 rounded self-start md:self-auto">
              <span className="text-[10px] font-sans text-neutral-400 font-medium leading-relaxed block">
                <strong className="text-white uppercase font-sans tracking-wide">Notice:</strong> Closed during national holidays & Traditional Council durbars.
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
