import { Shield, Mail, Phone, MapPin, Facebook, Youtube, Heart, ChevronUp, Landmark } from 'lucide-react';
import { COMMUNITIES_DATA } from '../data';
import { ContactInfo } from '../types';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  logoText?: string;
  logoSubtext?: string;
  logoImgUrl?: string;
  contacts?: ContactInfo;
}

export default function Footer({ onNavigate, logoText, logoSubtext, logoImgUrl, contacts }: FooterProps) {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleNavClick = (id: string) => {
    onNavigate(id);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="relative bg-[#0a0a0a] text-neutral-400 font-sans border-t-2 border-[#990000] pt-16 pb-8 overflow-hidden">
      
      {/* Decorative Gold Thread Line at very top of footer */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4AF37] via-[#990000] to-[#D4AF37]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-neutral-900">
        
        {/* Column 1: Royal Brand & Mission (4 Cols) */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center space-x-4 cursor-pointer" onClick={handleScrollToTop}>
            <div className="flex items-center justify-center h-14 lg:h-18 aspect-[1376/768] bg-white border border-neutral-800 hover:border-[#D4AF37] rounded-lg transition-all duration-300 overflow-hidden p-1">
              {logoImgUrl ? (
                <img 
                  src={logoImgUrl} 
                  alt="Logo" 
                  className="w-full h-full object-contain rounded" 
                  referrerPolicy="no-referrer" 
                />
              ) : (
                <Shield className="w-5 h-5 text-[#990000]" />
              )}
            </div>
            <div>
              <h4 className="text-sm font-display font-black text-white uppercase tracking-tight">
                {logoText || "Nkosuo Division New Juaben Traditional Area"}
              </h4>
            </div>
          </div>
          <p className="text-xs leading-relaxed text-neutral-400">
            Dedicated to coordinating and accelerating developmental projects in the sub-communities of New Juaben, ensuring a balanced fusion of modern innovation and cultural preservation.
          </p>
          <div className="pt-2">
            <span className="text-[10px] font-sans font-black px-3 py-1 bg-[#111111] border border-neutral-800 rounded text-[#D4AF37] uppercase tracking-widest inline-block">
              Yɛma mo Akwaaba! • Welcome
            </span>
          </div>
        </div>

        {/* Column 2: Quick Links (2.5 Cols) */}
        <div className="md:col-span-2.5 space-y-4">
          <h4 className="text-xs font-sans font-black text-white uppercase tracking-[0.2em] border-b border-neutral-900 pb-2">
            Secretariat Maps
          </h4>
          <ul className="space-y-2 text-xs font-sans">
            {[
              { id: 'hero', label: 'Home Page' },
              { id: 'communities', label: 'Divisional Chiefs' },
              { id: 'projects', label: 'Nkosuo Projects' },
              { id: 'advisory', label: 'Advisory Board' },
              { id: 'gallery', label: 'Historical Gallery' },
              { id: 'charter', label: 'Council Charter' },
              { id: 'feedback', label: 'Citizen Suggestion Portal' }
            ].map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => handleNavClick(link.id)}
                  className="hover:text-[#D4AF37] hover:underline transition-all text-left cursor-pointer"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Divisional Areas (3 Cols) */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="text-xs font-sans font-black text-white uppercase tracking-[0.2em] border-b border-neutral-900 pb-2">
            Divisional Areas
          </h4>
          <ul className="space-y-2 text-xs font-sans">
            {COMMUNITIES_DATA.map((community) => (
              <li key={community.id} className="flex items-center">
                <span className="text-[#990000] font-black mr-1.5">•</span>
                <button
                  onClick={() => handleNavClick('communities')}
                  className="hover:text-[#D4AF37] hover:underline text-neutral-400 transition-all text-left cursor-pointer"
                >
                  {community.name} (Stool Desk)
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Cultural Greetings & Social (2.5 Cols) */}
        <div className="md:col-span-2.5 space-y-4">
          <h4 className="text-xs font-sans font-black text-white uppercase tracking-[0.2em] border-b border-neutral-900 pb-2">
            Stay Connected
          </h4>
          <p className="text-xs leading-relaxed text-neutral-400">
            For news, cultural updates, and festival schedules, follow the Traditional Council Secretariat:
          </p>
          <div className="flex items-center space-x-2.5 pt-1">
            <a
              href="#app-header"
              aria-label="Facebook link"
              className="w-8 h-8 bg-[#111111] border border-neutral-800 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-all"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="#app-header"
              aria-label="Youtube link"
              className="w-8 h-8 bg-[#111111] border border-neutral-800 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-all"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href="#app-header"
              aria-label="Traditional landmarks link"
              className="w-8 h-8 bg-[#111111] border border-neutral-800 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-all"
            >
              <Landmark className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>

      {/* Footer Bottom credits */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-sans">
        <div className="text-neutral-500 text-center sm:text-left font-sans font-medium uppercase tracking-wider">
          <span>© {new Date().getFullYear()} NEW JUABEN Traditional Council (Nkosuo Division). All Rights Reserved.</span>
        </div>
        
        <div className="flex items-center justify-center space-x-1.5 text-neutral-500 font-sans font-medium uppercase tracking-wider">
          <span>Upholding heritage with</span>
          <Heart className="w-3 h-3 text-[#990000] animate-pulse fill-[#990000]" />
          <span>in Koforidua, Ghana</span>
        </div>

        <div>
          <button
            id="footer-scroll-top"
            onClick={handleScrollToTop}
            className="flex items-center space-x-1 text-[#D4AF37] hover:text-white font-sans font-black uppercase text-[9px] tracking-widest transition-all cursor-pointer"
          >
            <span>Back to Top</span>
            <ChevronUp className="w-4 h-4 text-[#990000]" />
          </button>
        </div>
      </div>

    </footer>
  );
}
