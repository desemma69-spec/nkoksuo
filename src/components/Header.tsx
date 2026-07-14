import { useState, useEffect } from 'react';
import { Menu, X, Shield, Award, MapPin } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenAdmin: () => void;
  logoText?: string;
  logoSubtext?: string;
  logoImgUrl?: string;
  isAdminUnlocked: boolean;
  onToggleAdminUnlock: () => void;
}

export default function Header({ 
  activeSection, 
  onNavigate, 
  onOpenAdmin, 
  logoText, 
  logoSubtext, 
  logoImgUrl,
  isAdminUnlocked,
  onToggleAdminUnlock
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);

  const handleLogoClick = () => {
    const now = Date.now();
    if (now - lastClickTime < 1500) {
      const nextClicks = logoClicks + 1;
      setLogoClicks(nextClicks);
      if (nextClicks === 3) {
        onToggleAdminUnlock();
        setLogoClicks(0);
      }
    } else {
      setLogoClicks(1);
    }
    setLastClickTime(now);
    handleNavClick('hero');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'communities', label: 'Communities & Chiefs' },
    { id: 'projects', label: 'Nkosuo Projects' },
    { id: 'advisory', label: 'Advisory Board' },
    { id: 'gallery', label: 'Culture & Gallery' },
    { id: 'charter', label: 'Our Charter' },
    { id: 'feedback', label: 'Citizen Suggestion Portal' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <header
      id="app-header"
      className="fixed top-0 left-0 right-0 z-50 bg-[#D4AF37] shadow-2xl border-b-4 border-[#990000] transition-all duration-300 py-2.5 min-h-[72px] lg:min-h-[96px] flex items-center"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Crest Title */}
          <div
            className="flex items-center space-x-5 lg:space-x-6 cursor-pointer group"
            onClick={handleLogoClick}
          >
            {/* Elegant Crest Representation as Sleek Rectangular Badge supporting wide format logos */}
            <div className="relative flex items-center justify-center h-16 sm:h-20 lg:h-24 xl:h-28 aspect-[1376/768] bg-white rounded-xl flex-shrink-0 border-2 border-[#990000] shadow-[0_4px_15px_rgba(153,0,0,0.3)] group-hover:scale-105 transition-transform duration-300 overflow-hidden p-1 lg:p-1.5">
              {logoImgUrl ? (
                <img 
                  src={logoImgUrl} 
                  alt="Logo" 
                  className="w-full h-full object-contain rounded-lg" 
                  referrerPolicy="no-referrer" 
                />
              ) : (
                <Shield className="w-8 h-8 lg:w-11 lg:h-11 text-[#990000]" />
              )}
            </div>
            <div>
              <h1 className="text-lg sm:text-xl lg:text-3xl font-display font-black tracking-tight leading-none text-black uppercase">
                {logoText || "Nkosuo Division New Juaben Traditional Area"}
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-1.5 text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                  activeSection === item.id
                    ? 'text-black border-b-2 border-black font-black'
                    : 'text-black/75 hover:text-black font-semibold'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Call to Action: Admin Button */}
          {isAdminUnlocked && (
            <div className="hidden lg:flex items-center space-x-2.5">
              <button
                id="header-admin-cta"
                onClick={onOpenAdmin}
                className="px-3.5 py-2 bg-black hover:bg-neutral-900 text-[#D4AF37] border border-[#990000] font-bold text-xs tracking-widest uppercase rounded shadow-lg transition-colors duration-200 cursor-pointer flex items-center"
              >
                <Shield className="w-3.5 h-3.5 mr-1.5 text-[#D4AF37]" />
                Admin
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-red-900 transition-all focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6 text-[#990000]" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div
        id="mobile-navigation-panel"
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-[#D4AF37] border-t border-[#990000] absolute top-full left-0 right-0 z-40 ${
          isMobileMenuOpen ? 'max-h-screen py-4 shadow-xl' : 'max-h-0 py-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-4 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`mobile-nav-link-${item.id}`}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full text-left px-4 py-2.5 rounded text-sm font-bold tracking-wide transition-colors ${
                activeSection === item.id
                  ? 'text-black bg-[#990000]/10 border-l-4 border-black'
                  : 'text-black/80 hover:text-black hover:bg-black/5'
              }`}
            >
              {item.label}
            </button>
          ))}
          {isAdminUnlocked && (
            <div className="pt-4 pb-2 border-t border-[#990000]/20">
              <button
                id="mobile-admin-cta"
                onClick={() => {
                  onOpenAdmin();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-2.5 bg-black hover:bg-neutral-900 text-[#D4AF37] border border-[#990000] font-bold text-center tracking-widest uppercase rounded shadow-md flex items-center justify-center cursor-pointer"
              >
                <Shield className="w-3.5 h-3.5 mr-1.5" /> Admin Area
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
