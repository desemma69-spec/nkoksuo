import { useState } from 'react';
import { GALLERY_ITEMS, ADINKRA_PROVERBS } from '../data';
import { GalleryItem, AdinkraProverb } from '../types';
import { Eye, BookOpen, Quote, X, HelpCircle, ShieldAlert } from 'lucide-react';

interface GalleryProps {
  galleryItems?: GalleryItem[];
  adinkraProverbs?: AdinkraProverb[];
}

export default function Gallery({ 
  galleryItems = GALLERY_ITEMS,
  adinkraProverbs = ADINKRA_PROVERBS
}: GalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const categories = [
    { value: 'all', label: 'All Artifacts' },
    { value: 'chiefs', label: 'Royal Stools' },
    { value: 'culture', label: 'Akan Culture' },
    { value: 'events', label: 'Festivals & Durbars' },
    { value: 'projects', label: 'Nkosuo in Action' },
  ];

  // Filter gallery items
  const filteredItems = selectedCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <section
      id="gallery"
      className="relative py-24 bg-[#0a0a0a] border-b border-neutral-950"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-[#D4AF37] text-xs font-black uppercase tracking-[0.25em] border-l-2 border-[#990000] pl-3 mb-3 block">
            Cultural Heritage & Showcase
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white uppercase mt-2">
            Historical Gallery
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
            Glimpse into the ancestral beauty, gold-crafted symbols, sacred festivals (such as Akwantukese), and direct community development efforts that define New Juaben.
          </p>
        </div>

        {/* Adinkra Wisdom Panel */}
        <div className="mb-20">
          <h3 className="text-[10px] font-sans font-black text-neutral-400 uppercase tracking-[0.15em] mb-6 flex items-center border-l-2 border-[#990000] pl-2">
            <Quote className="w-4 h-4 text-[#990000] mr-2" /> Adinkra Wisdom & developmental Philosophy
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {adinkraProverbs.map((prov, index) => (
              <div
                key={index}
                id={`adinkra-proverb-${index}`}
                className="bg-[#111111] border-r-4 border-neutral-800 p-6 hover:border-[#D4AF37] transition-all duration-300 relative overflow-hidden group"
              >
                {/* Traditional motif badge */}
                <div className="absolute -top-3 -right-3 w-16 h-16 bg-gradient-to-br from-[#D4AF37]/10 to-red-800/10 rounded-full border border-neutral-800 flex items-center justify-center font-mono text-[9px] font-black text-[#D4AF37] tracking-tighter">
                  {prov.symbol}
                </div>

                <span className="text-xs font-sans font-black text-[#D4AF37] tracking-widest uppercase block mb-1">
                  {prov.symbol}
                </span>
                <span className="text-[10px] text-neutral-400 font-sans italic block mb-3">
                  &ldquo;{prov.translation}&rdquo;
                </span>

                {/* Twi proverb text */}
                <p className="text-sm font-display font-black text-white leading-relaxed uppercase mt-3 border-l-2 border-[#990000] pl-3">
                  &ldquo;{prov.proverb}&rdquo;
                </p>

                {/* Meaning */}
                <p className="text-xs text-neutral-400 mt-4 leading-relaxed font-sans">
                  {prov.meaning}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery Filter controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.value}
              id={`gallery-filter-${cat.value}`}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4.5 py-2.5 text-[9px] font-sans font-black tracking-[0.15em] uppercase transition-all duration-200 cursor-pointer ${
                selectedCategory === cat.value
                  ? 'bg-[#D4AF37] text-black border border-[#D4AF37] shadow-xl'
                  : 'bg-[#111111] text-neutral-400 border border-neutral-800 hover:border-[#D4AF37] hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Dynamic Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              id={`gallery-item-${item.id}`}
              onClick={() => setActiveItem(item)}
              className="group bg-[#111111] border-r-4 border-neutral-800 hover:border-[#D4AF37] overflow-hidden cursor-pointer shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative aspect-square overflow-hidden bg-neutral-950 flex items-center justify-center">
                {item.imageUrl && (item.imageUrl.startsWith('data:video') || item.imageUrl.endsWith('.mp4') || item.imageUrl.endsWith('.webm') || item.imageUrl.endsWith('.ogg')) ? (
                  <video
                    src={item.imageUrl}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    muted
                    loop
                    playsInline
                    onMouseEnter={(e) => { (e.target as HTMLVideoElement).play().catch(() => {}); }}
                    onMouseLeave={(e) => { 
                      const v = e.target as HTMLVideoElement;
                      v.pause();
                      v.currentTime = 0;
                    }}
                  />
                ) : (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                )}
                
                {/* Overlay details on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <span className="text-[9px] font-sans font-black text-[#D4AF37] tracking-[0.15em] uppercase">
                    {item.category} {item.imageUrl && (item.imageUrl.startsWith('data:video') || item.imageUrl.endsWith('.mp4')) ? '• Video' : '• Photo'}
                  </span>
                  <h4 className="text-xs font-display font-black text-white uppercase tracking-tight mt-1 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-neutral-300 line-clamp-2 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                  <span className="mt-3 inline-flex items-center text-[9px] text-[#D4AF37] font-mono font-bold uppercase tracking-widest">
                    <Eye className="w-3.5 h-3.5 mr-1 text-[#990000]" /> Inspect Artifact
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox / Modal for detailed item viewing */}
      {activeItem && (
        <div
          id="gallery-lightbox-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md transition-all animate-fade-in"
        >
          {/* Close button */}
          <button
            id="gallery-lightbox-close"
            onClick={() => setActiveItem(null)}
            className="absolute top-6 right-6 p-2 bg-[#111111] text-[#D4AF37] border border-neutral-800 hover:border-[#D4AF37] transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Container */}
          <div className="bg-[#111111] border-r-4 border-neutral-800 overflow-hidden max-w-3xl w-full shadow-2xl relative">
            <div className="relative aspect-[16/10] w-full bg-[#111111] border-b border-neutral-800 flex items-center justify-center">
              {activeItem.imageUrl && (activeItem.imageUrl.startsWith('data:video') || activeItem.imageUrl.endsWith('.mp4') || activeItem.imageUrl.endsWith('.webm') || activeItem.imageUrl.endsWith('.ogg')) ? (
                <video
                  src={activeItem.imageUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain bg-black"
                />
              ) : (
                <img
                  src={activeItem.imageUrl}
                  alt={activeItem.title}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
              )}
              <div className="absolute top-4 left-4 bg-[#111111] border border-neutral-800 px-2.5 py-1 text-[9px] font-sans font-black text-[#D4AF37] uppercase tracking-[0.1em]">
                {activeItem.category}
              </div>
            </div>
            
            <div className="p-6 sm:p-8">
              <span className="text-[10px] font-sans text-[#990000] font-black uppercase tracking-[0.2em] block mb-1">
                New Juaben Royal Archives
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tight">
                {activeItem.title}
              </h3>
              <p className="mt-3 text-neutral-300 text-xs sm:text-sm leading-relaxed font-sans">
                {activeItem.description}
              </p>
              
              <div className="mt-6 pt-5 border-t border-neutral-800 flex items-center justify-between">
                <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-wider">
                  © New Juaben Traditional Council (Nkosuo Division)
                </span>
                <button
                  id="lightbox-close-cta"
                  onClick={() => setActiveItem(null)}
                  className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white font-mono text-[10px] font-bold tracking-widest uppercase cursor-pointer"
                >
                  Close Archive
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
