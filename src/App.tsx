/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import Leaders from './components/Leaders';
import AboutCharter from './components/AboutCharter';
import Communities from './components/Communities';
import Projects from './components/Projects';
import Gallery from './components/Gallery';
import CommunityFeedback from './components/CommunityFeedback';
import AdvisoryBoard from './components/AdvisoryBoard';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import Contacts from './components/Contacts';

// Schema and datasets
import { PROJECTS_DATA, EVENTS_DATA, GALLERY_ITEMS, COMMUNITIES_DATA, DEFAULT_LEADERS, INITIAL_FEEDBACK, ADINKRA_PROVERBS, DEFAULT_ADVISORY_BOARD, DEFAULT_CONTACT_INFO } from './data';
import { Project, Event as RoyalEvent, GalleryItem, TraditionalLeader, FeedbackSubmission, AdinkraProverb, AdvisoryBoardMember, ContactInfo } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [showAdmin, setShowAdmin] = useState(false);

  // Hidden security admin state
  const [isAdminUnlocked, setIsAdminUnlocked] = useState<boolean>(() => {
    try {
      return localStorage.getItem('royal_admin_unlocked') === 'true';
    } catch {
      return false;
    }
  });

  // Security Toast notification state
  const [securityToast, setSecurityToast] = useState<{ show: boolean, message: string, type: 'unlocked' | 'locked' }>({
    show: false,
    message: '',
    type: 'unlocked'
  });

  // Auto-hide security toast
  useEffect(() => {
    if (securityToast.show) {
      const timer = setTimeout(() => {
        setSecurityToast(prev => ({ ...prev, show: false }));
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [securityToast.show]);

  const handleToggleAdminUnlock = () => {
    setIsAdminUnlocked(prev => {
      const next = !prev;
      try {
        localStorage.setItem('royal_admin_unlocked', String(next));
      } catch (e) {
        console.error(e);
      }
      
      // Close admin dashboard if locking
      if (!next) {
        setShowAdmin(false);
      }

      setSecurityToast({
        show: true,
        message: next 
          ? "Administrative Entry Point Unlocked. The Admin button is now visible in the header." 
          : "Administrative Entry Point Locked & Hidden for Security.",
        type: next ? 'unlocked' : 'locked'
      });

      return next;
    });
  };

  // Global state pools
  const [projects, setProjects] = useState<Project[]>([]);
  const [events, setEvents] = useState<RoyalEvent[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [adinkraProverbs, setAdinkraProverbs] = useState<AdinkraProverb[]>([]);
  const [heroBgUrl, setHeroBgUrl] = useState<string>('');
  const [heroBgPosition, setHeroBgPosition] = useState<string>('center 5%');
  const [communities, setCommunities] = useState<any[]>([]);
  const [traditionalLeaders, setTraditionalLeaders] = useState<TraditionalLeader[]>([]);
  const [feedback, setFeedback] = useState<FeedbackSubmission[]>([]);
  const [advisoryBoard, setAdvisoryBoard] = useState<AdvisoryBoardMember[]>([]);
  const [contacts, setContacts] = useState<ContactInfo>(DEFAULT_CONTACT_INFO);


  // Logo States
  const [logoText, setLogoText] = useState<string>('Nkosuo Division New Juaben Traditional Area');
  const [logoSubtext, setLogoSubtext] = useState<string>('Development & Cultural Legacy');
  const [logoImgUrl, setLogoImgUrl] = useState<string>('/src/assets/images/yiadom_hwedie_logo_1783587100849.jpg');

  // Hero Text States
  const [heroTitle1, setHeroTitle1] = useState<string>('Nkosuo Division');
  const [heroTitle2, setHeroTitle2] = useState<string>('New Juaben Traditional Area');
  const [heroSubBadge, setHeroSubBadge] = useState<string>('Modernization & Royal Heritage');
  const [heroDesc, setHeroDesc] = useState<string>('Led by the vision of the Omanhene, the Nkosuo (Development) Division drives rapid modernization, funding primary healthcare, building modern schools, launching agricultural cooperatives, and empowering the youth of New Juaben Traditional Area while preserving our royal ancestral legacy.');

  // Hero Stats State
  const [heroStats, setHeroStats] = useState<Array<{value: string, label: string}>>([
    { value: "8", label: "Divisional Communities" },
    { value: "15+", label: "Nkosuo Projects" },
    { value: "GH¢2.8M+", label: "Development Budget" },
    { value: "180k+", label: "Beneficiaries Served" }
  ]);

  // Compute stats dynamically based on the current list of projects and communities
  const computedHeroStats = useMemo(() => {
    const numComms = Array.isArray(communities) ? communities.length : 8;
    const numProj = Array.isArray(projects) ? projects.length : 0;

    const totalBudgetVal = Array.isArray(projects) ? projects.reduce((acc, proj) => {
      if (!proj || typeof proj.budget !== 'string') return acc;
      const cleanStr = proj.budget.replace(/[^\d.]/g, '');
      const val = parseFloat(cleanStr);
      return acc + (isNaN(val) ? 0 : val);
    }, 0) : 0;

    const totalBeneficiariesVal = Array.isArray(projects) ? projects.reduce((acc, proj) => {
      if (!proj || typeof proj.beneficiaries !== 'string') return acc;
      const matches = proj.beneficiaries.match(/\d[\d,]*/g);
      if (!matches) return acc;
      const sum = matches.reduce((s, m) => {
        const val = parseInt(m.replace(/,/g, ''), 10);
        return s + (isNaN(val) ? 0 : val);
      }, 0);
      return acc + sum;
    }, 0) : 0;

    const formattedBudget = (() => {
      if (totalBudgetVal >= 1000000) {
        const formatted = (totalBudgetVal / 1000000).toFixed(1);
        const clean = formatted.endsWith('.0') ? formatted.slice(0, -2) : formatted;
        return `GH¢${clean}M+`;
      } else if (totalBudgetVal >= 1000) {
        const formatted = (totalBudgetVal / 1000).toFixed(0);
        const clean = formatted.endsWith('.0') ? formatted.slice(0, -2) : formatted;
        return `GH¢${clean}k+`;
      } else {
        return `GH¢${totalBudgetVal}`;
      }
    })();

    const formattedBeneficiaries = (() => {
      if (totalBeneficiariesVal >= 1000000) {
        const formatted = (totalBeneficiariesVal / 1000000).toFixed(1);
        const clean = formatted.endsWith('.0') ? formatted.slice(0, -2) : formatted;
        return `${clean}M+`;
      } else if (totalBeneficiariesVal >= 1000) {
        const formatted = (totalBeneficiariesVal / 1000).toFixed(1);
        const clean = formatted.endsWith('.0') ? formatted.slice(0, -2) : formatted;
        return `${clean}k+`;
      } else {
        return `${totalBeneficiariesVal}`;
      }
    })();

    return heroStats.map((stat) => {
      const labelLower = stat.label.toLowerCase();
      if (labelLower.includes('community') || labelLower.includes('communities')) {
        return { ...stat, value: String(numComms) };
      }
      if (labelLower.includes('project')) {
        return { ...stat, value: `${numProj}` };
      }
      if (labelLower.includes('budget')) {
        return { ...stat, value: formattedBudget };
      }
      if (labelLower.includes('beneficiary') || labelLower.includes('beneficiaries')) {
        return { ...stat, value: formattedBeneficiaries };
      }
      return stat;
    });
  }, [heroStats, projects, communities]);

  // Hydrate states from localStorage with robust raw static fallbacks
  useEffect(() => {
    // Logo & Migration for name change
    const savedLogoText = localStorage.getItem('new_juaben_logo_text');
    if (!savedLogoText || savedLogoText === 'New Juaben Council of Chiefs') {
      localStorage.setItem('new_juaben_logo_text', 'Nkosuo Division New Juaben Traditional Area');
      setLogoText('Nkosuo Division New Juaben Traditional Area');
    } else {
      setLogoText(savedLogoText);
    }

    const savedLogoSubtext = localStorage.getItem('new_juaben_logo_subtext');
    if (!savedLogoSubtext || savedLogoSubtext === 'Nkosuo Division • Development Portfolio') {
      localStorage.setItem('new_juaben_logo_subtext', 'Development & Cultural Legacy');
      setLogoSubtext('Development & Cultural Legacy');
    } else {
      setLogoSubtext(savedLogoSubtext);
    }

    const savedLogoImgUrl = localStorage.getItem('new_juaben_logo_img_url');
    if (savedLogoImgUrl && savedLogoImgUrl !== '') {
      setLogoImgUrl(savedLogoImgUrl);
    } else {
      const defaultLogo = "/src/assets/images/yiadom_hwedie_logo_1783587100849.jpg";
      setLogoImgUrl(defaultLogo);
      localStorage.setItem('new_juaben_logo_img_url', defaultLogo);
    }

    // Hero Text Migration
    const savedHeroTitle1 = localStorage.getItem('new_juaben_hero_title1');
    if (!savedHeroTitle1 || savedHeroTitle1 === 'New Juaben') {
      localStorage.setItem('new_juaben_hero_title1', 'Nkosuo Division');
      setHeroTitle1('Nkosuo Division');
    } else {
      setHeroTitle1(savedHeroTitle1);
    }

    const savedHeroTitle2 = localStorage.getItem('new_juaben_hero_title2');
    if (!savedHeroTitle2 || savedHeroTitle2 === 'Council of Chiefs') {
      localStorage.setItem('new_juaben_hero_title2', 'New Juaben Traditional Area');
      setHeroTitle2('New Juaben Traditional Area');
    } else {
      setHeroTitle2(savedHeroTitle2);
    }

    const savedHeroSubBadge = localStorage.getItem('new_juaben_hero_subbadge');
    if (!savedHeroSubBadge || savedHeroSubBadge === 'Nkosuo Division (Development)') {
      localStorage.setItem('new_juaben_hero_subbadge', 'Modernization & Royal Heritage');
      setHeroSubBadge('Modernization & Royal Heritage');
    } else {
      setHeroSubBadge(savedHeroSubBadge);
    }

    const savedHeroDesc = localStorage.getItem('new_juaben_hero_desc');
    if (!savedHeroDesc || savedHeroDesc.includes('Led by the vision of the Council of Chiefs')) {
      const newDesc = 'Led by the vision of the Omanhene, the Nkosuo (Development) Division drives rapid modernization, funding primary healthcare, building modern schools, launching agricultural cooperatives, and empowering the youth of New Juaben Traditional Area while preserving our royal ancestral legacy.';
      localStorage.setItem('new_juaben_hero_desc', newDesc);
      setHeroDesc(newDesc);
    } else {
      setHeroDesc(savedHeroDesc);
    }

    // Hero Stats
    const savedHeroStats = localStorage.getItem('new_juaben_hero_stats');
    if (savedHeroStats) {
      try {
        const parsed = JSON.parse(savedHeroStats);
        if (Array.isArray(parsed)) {
          const updated = parsed.map((stat: any) => {
            if (stat && stat.label === "Divisional Communities" && stat.value === "7") {
              return { ...stat, value: "8" };
            }
            return stat;
          });
          setHeroStats(updated);
          localStorage.setItem('new_juaben_hero_stats', JSON.stringify(updated));
        }
      } catch (e) {
        // use default
      }
    }

    // Communities Data
    const savedCommunities = localStorage.getItem('new_juaben_communities_data');
    if (savedCommunities) {
      try {
        const parsed = JSON.parse(savedCommunities);
        const hasSouth = Array.isArray(parsed) && parsed.some((c: any) => c && c.id === 'new_juaben_south');
        if (!Array.isArray(parsed) || !hasSouth || parsed.length < COMMUNITIES_DATA.length) {
          setCommunities(COMMUNITIES_DATA);
          localStorage.setItem('new_juaben_communities_data', JSON.stringify(COMMUNITIES_DATA));
        } else {
          setCommunities(parsed);
        }
      } catch (e) {
        setCommunities(COMMUNITIES_DATA);
      }
    } else {
      setCommunities(COMMUNITIES_DATA);
      localStorage.setItem('new_juaben_communities_data', JSON.stringify(COMMUNITIES_DATA));
    }
    // Hero Background image
    const savedHeroBg = localStorage.getItem('new_juaben_hero_bg_url');
    if (savedHeroBg && savedHeroBg !== "/src/assets/images/omanhene_hero_bg_1783513909221.jpg") {
      setHeroBgUrl(savedHeroBg);
    } else {
      const defaultBg = "/src/assets/images/new_juaben_council_chiefs_hero_1783507779624.jpg";
      setHeroBgUrl(defaultBg);
      localStorage.setItem('new_juaben_hero_bg_url', defaultBg);
    }

    // Hero Background Position Alignment
    const savedHeroBgPos = localStorage.getItem('new_juaben_hero_bg_position');
    if (savedHeroBgPos && savedHeroBgPos !== 'center 20%') {
      setHeroBgPosition(savedHeroBgPos);
    } else {
      setHeroBgPosition('center 5%');
    }

    // Nkosuo Projects
    const savedProjects = localStorage.getItem('new_juaben_nkosuo_projects');
    if (savedProjects) {
      try {
        const parsed = JSON.parse(savedProjects);
        const hasNewSouthProj = Array.isArray(parsed) && parsed.some((p: any) => p && p.communityId === 'new_juaben_south');
        if (!Array.isArray(parsed) || !hasNewSouthProj || parsed.length < PROJECTS_DATA.length) {
          setProjects(PROJECTS_DATA);
          localStorage.setItem('new_juaben_nkosuo_projects', JSON.stringify(PROJECTS_DATA));
        } else {
          setProjects(parsed);
        }
      } catch (e) {
        setProjects(PROJECTS_DATA);
      }
    } else {
      setProjects(PROJECTS_DATA);
      localStorage.setItem('new_juaben_nkosuo_projects', JSON.stringify(PROJECTS_DATA));
    }

    // Traditional Events
    const savedEvents = localStorage.getItem('new_juaben_nkosuo_events');
    if (savedEvents) {
      try {
        const parsed = JSON.parse(savedEvents);
        if (Array.isArray(parsed)) {
          setEvents(parsed);
        } else {
          setEvents(EVENTS_DATA);
          localStorage.setItem('new_juaben_nkosuo_events', JSON.stringify(EVENTS_DATA));
        }
      } catch (e) {
        setEvents(EVENTS_DATA);
      }
    } else {
      setEvents(EVENTS_DATA);
      localStorage.setItem('new_juaben_nkosuo_events', JSON.stringify(EVENTS_DATA));
    }

    // Gallery Items
    const savedGallery = localStorage.getItem('new_juaben_nkosuo_gallery');
    if (savedGallery) {
      try {
        const parsed = JSON.parse(savedGallery);
        if (Array.isArray(parsed)) {
          setGalleryItems(parsed);
        } else {
          setGalleryItems(GALLERY_ITEMS);
          localStorage.setItem('new_juaben_nkosuo_gallery', JSON.stringify(GALLERY_ITEMS));
        }
      } catch (e) {
        setGalleryItems(GALLERY_ITEMS);
      }
    } else {
      setGalleryItems(GALLERY_ITEMS);
      localStorage.setItem('new_juaben_nkosuo_gallery', JSON.stringify(GALLERY_ITEMS));
    }

    // Adinkra Proverbs State Hydration
    const savedProverbs = localStorage.getItem('new_juaben_adinkra_proverbs');
    if (savedProverbs) {
      try {
        const parsed = JSON.parse(savedProverbs);
        if (Array.isArray(parsed)) {
          setAdinkraProverbs(parsed);
        } else {
          setAdinkraProverbs(ADINKRA_PROVERBS);
          localStorage.setItem('new_juaben_adinkra_proverbs', JSON.stringify(ADINKRA_PROVERBS));
        }
      } catch (e) {
        setAdinkraProverbs(ADINKRA_PROVERBS);
      }
    } else {
      setAdinkraProverbs(ADINKRA_PROVERBS);
      localStorage.setItem('new_juaben_adinkra_proverbs', JSON.stringify(ADINKRA_PROVERBS));
    }

    // Traditional Leaders State Hydration
    const savedLeaders = localStorage.getItem('new_juaben_traditional_leaders');
    if (savedLeaders) {
      try {
        const parsed = JSON.parse(savedLeaders);
        if (Array.isArray(parsed)) {
          const filtered = parsed.filter((l: any) => l && l.id !== 'chief_nyamekrom');
          if (filtered.length <= 3) {
            setTraditionalLeaders(DEFAULT_LEADERS);
            localStorage.setItem('new_juaben_traditional_leaders', JSON.stringify(DEFAULT_LEADERS));
          } else {
            setTraditionalLeaders(filtered);
            if (filtered.length !== parsed.length) {
              localStorage.setItem('new_juaben_traditional_leaders', JSON.stringify(filtered));
            }
          }
        } else {
          setTraditionalLeaders(DEFAULT_LEADERS);
          localStorage.setItem('new_juaben_traditional_leaders', JSON.stringify(DEFAULT_LEADERS));
        }
      } catch (e) {
        setTraditionalLeaders(DEFAULT_LEADERS);
      }
    } else {
      setTraditionalLeaders(DEFAULT_LEADERS);
      localStorage.setItem('new_juaben_traditional_leaders', JSON.stringify(DEFAULT_LEADERS));
    }

    // Citizen Feedback State Hydration
    const savedFeedback = localStorage.getItem('new_juaben_nkosuo_feedback');
    if (savedFeedback) {
      try {
        const parsed = JSON.parse(savedFeedback);
        if (Array.isArray(parsed)) {
          setFeedback(parsed);
        } else {
          setFeedback(INITIAL_FEEDBACK);
          localStorage.setItem('new_juaben_nkosuo_feedback', JSON.stringify(INITIAL_FEEDBACK));
        }
      } catch (e) {
        setFeedback(INITIAL_FEEDBACK);
      }
    } else {
      setFeedback(INITIAL_FEEDBACK);
      localStorage.setItem('new_juaben_nkosuo_feedback', JSON.stringify(INITIAL_FEEDBACK));
    }

    // Advisory Board State Hydration
    const savedAdvisoryBoard = localStorage.getItem('new_juaben_advisory_board');
    if (savedAdvisoryBoard) {
      try {
        const parsed = JSON.parse(savedAdvisoryBoard);
        if (Array.isArray(parsed) && parsed.length <= 3) {
          // Auto migrate 3-member list to full 10-member board
          setAdvisoryBoard(DEFAULT_ADVISORY_BOARD);
          localStorage.setItem('new_juaben_advisory_board', JSON.stringify(DEFAULT_ADVISORY_BOARD));
        } else {
          setAdvisoryBoard(parsed);
        }
      } catch (e) {
        setAdvisoryBoard(DEFAULT_ADVISORY_BOARD);
      }
    } else {
      setAdvisoryBoard(DEFAULT_ADVISORY_BOARD);
      localStorage.setItem('new_juaben_advisory_board', JSON.stringify(DEFAULT_ADVISORY_BOARD));
    }

    // Contacts State Hydration
    const savedContacts = localStorage.getItem('new_juaben_contacts');
    if (savedContacts) {
      try {
        const parsed = JSON.parse(savedContacts);
        if (parsed && typeof parsed === 'object' && 'phone' in parsed) {
          setContacts(parsed);
        } else {
          setContacts(DEFAULT_CONTACT_INFO);
          localStorage.setItem('new_juaben_contacts', JSON.stringify(DEFAULT_CONTACT_INFO));
        }
      } catch (e) {
        setContacts(DEFAULT_CONTACT_INFO);
      }
    } else {
      setContacts(DEFAULT_CONTACT_INFO);
      localStorage.setItem('new_juaben_contacts', JSON.stringify(DEFAULT_CONTACT_INFO));
    }
  }, []);

  // Keep activeSection state and reset scroll position to the top of the new page on tab change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }, [activeSection]);

  return (
    <div id="royal-app-container" className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans overflow-x-hidden selection:bg-[#D4AF37] selection:text-neutral-900">
      
      {/* Decorative Traditional Border Header Accent */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-800 via-[#D4AF37] to-red-800 z-50"></div>

      {/* Header / Navigation bar */}
      <Header 
        activeSection={activeSection} 
        onNavigate={setActiveSection} 
        onOpenAdmin={() => setShowAdmin(true)} 
        logoText={logoText}
        logoSubtext={logoSubtext}
        logoImgUrl={logoImgUrl}
        isAdminUnlocked={isAdminUnlocked}
        onToggleAdminUnlock={handleToggleAdminUnlock}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {activeSection === 'hero' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <Hero 
                onNavigate={setActiveSection} 
                heroBgUrl={heroBgUrl} 
                heroTitle1={heroTitle1}
                heroTitle2={heroTitle2}
                heroSubBadge={heroSubBadge}
                heroDesc={heroDesc}
                heroStats={computedHeroStats}
                heroBgPosition={heroBgPosition}
              />
              <Leaders traditionalLeaders={traditionalLeaders} />
              <Contacts contacts={contacts} />
            </motion.div>
          )}

          {activeSection === 'communities' && (
            <motion.div
              key="communities"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <Communities communities={communities.length > 0 ? communities : COMMUNITIES_DATA} projects={projects} events={events} />
            </motion.div>
          )}

          {activeSection === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <Projects projects={projects} />
            </motion.div>
          )}

          {activeSection === 'gallery' && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <Gallery galleryItems={galleryItems} adinkraProverbs={adinkraProverbs} />
            </motion.div>
          )}

          {activeSection === 'charter' && (
            <motion.div
              key="charter"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <AboutCharter />
            </motion.div>
          )}

          {activeSection === 'feedback' && (
            <motion.div
              key="feedback"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <CommunityFeedback 
                communities={communities.length > 0 ? communities : COMMUNITIES_DATA} 
                onSubmitFeedback={(newFb) => {
                  const updated = [newFb, ...feedback];
                  setFeedback(updated);
                  localStorage.setItem('new_juaben_nkosuo_feedback', JSON.stringify(updated));
                }} 
              />
            </motion.div>
          )}

          {activeSection === 'advisory' && (
            <motion.div
              key="advisory"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <AdvisoryBoard members={advisoryBoard} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Majestic Footer */}
      <Footer 
        onNavigate={setActiveSection} 
        logoText={logoText}
        logoSubtext={logoSubtext}
        logoImgUrl={logoImgUrl}
        contacts={contacts}
      />

      {/* Administration Dashboard overlay */}
      {showAdmin && (
        <AdminDashboard
          onClose={() => setShowAdmin(false)}
          feedback={feedback}
          setFeedback={(newFeedback) => {
            setFeedback(newFeedback);
            localStorage.setItem('new_juaben_nkosuo_feedback', JSON.stringify(newFeedback));
          }}
          projects={projects}
          setProjects={setProjects}
          events={events}
          setEvents={setEvents}
          galleryItems={galleryItems}
          setGalleryItems={setGalleryItems}
          adinkraProverbs={adinkraProverbs}
          setAdinkraProverbs={(newProverbs) => {
            setAdinkraProverbs(newProverbs);
            localStorage.setItem('new_juaben_adinkra_proverbs', JSON.stringify(newProverbs));
          }}
          heroBgUrl={heroBgUrl}
          setHeroBgUrl={setHeroBgUrl}
          traditionalLeaders={traditionalLeaders}
          setTraditionalLeaders={(newLeaders) => {
            setTraditionalLeaders(newLeaders);
            localStorage.setItem('new_juaben_traditional_leaders', JSON.stringify(newLeaders));
          }}
          communities={communities.length > 0 ? communities : COMMUNITIES_DATA}
          setCommunities={(newComms) => {
            setCommunities(newComms);
            localStorage.setItem('new_juaben_communities_data', JSON.stringify(newComms));
          }}
          logoText={logoText}
          setLogoText={(val) => {
            setLogoText(val);
            localStorage.setItem('new_juaben_logo_text', val);
          }}
          logoSubtext={logoSubtext}
          setLogoSubtext={(val) => {
            setLogoSubtext(val);
            localStorage.setItem('new_juaben_logo_subtext', val);
          }}
          logoImgUrl={logoImgUrl}
          setLogoImgUrl={(val) => {
            setLogoImgUrl(val);
            localStorage.setItem('new_juaben_logo_img_url', val);
          }}
          heroTitle1={heroTitle1}
          setHeroTitle1={(val) => {
            setHeroTitle1(val);
            localStorage.setItem('new_juaben_hero_title1', val);
          }}
          heroTitle2={heroTitle2}
          setHeroTitle2={(val) => {
            setHeroTitle2(val);
            localStorage.setItem('new_juaben_hero_title2', val);
          }}
          heroSubBadge={heroSubBadge}
          setHeroSubBadge={(val) => {
            setHeroSubBadge(val);
            localStorage.setItem('new_juaben_hero_subbadge', val);
          }}
          heroDesc={heroDesc}
          setHeroDesc={(val) => {
            setHeroDesc(val);
            localStorage.setItem('new_juaben_hero_desc', val);
          }}
          heroStats={computedHeroStats}
          setHeroStats={(val) => {
            setHeroStats(val);
            localStorage.setItem('new_juaben_hero_stats', JSON.stringify(val));
          }}
          heroBgPosition={heroBgPosition}
          setHeroBgPosition={(val) => {
            setHeroBgPosition(val);
            localStorage.setItem('new_juaben_hero_bg_position', val);
          }}
          advisoryBoard={advisoryBoard}
          setAdvisoryBoard={(val) => {
            setAdvisoryBoard(val);
            localStorage.setItem('new_juaben_advisory_board', JSON.stringify(val));
          }}
          contacts={contacts}
          setContacts={(val) => {
            setContacts(val);
            localStorage.setItem('new_juaben_contacts', JSON.stringify(val));
          }}
        />
      )}

      {/* Security Toast Notification */}
      <AnimatePresence>
        {securityToast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className={`fixed bottom-6 right-6 z-50 flex items-center space-x-3 px-5 py-4 rounded-xl border shadow-2xl backdrop-blur-md max-w-sm ${
              securityToast.type === 'unlocked'
                ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37]'
                : 'bg-red-950/20 border-red-800 text-red-200'
            }`}
          >
            <div className={`p-2 rounded-lg ${
              securityToast.type === 'unlocked' ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'bg-red-900/30 text-red-400'
            }`}>
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-wider font-sans">Security Alert</p>
              <p className="text-sm font-medium mt-0.5 opacity-90 font-sans">{securityToast.message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
