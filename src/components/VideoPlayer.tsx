import { Play, Film } from 'lucide-react';
import { useState } from 'react';

interface VideoPlayerProps {
  videoUrl?: string;
  videoType?: 'youtube' | 'local';
  thumbnailUrl?: string;
  title: string;
}

export default function VideoPlayer({ videoUrl, videoType, thumbnailUrl, title }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!videoUrl) return null;

  // Helper to extract YouTube video ID
  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}?autoplay=1`;
    }
    return '';
  };

  if (!isPlaying) {
    return (
      <div className="relative w-full h-full group/video">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover object-center transition-all duration-500 transform group-hover/video:scale-102"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-950">
            <Film className="w-8 h-8 text-neutral-700 mb-2" />
          </div>
        )}
        <div className="absolute inset-0 bg-black/45 flex items-center justify-center transition-all duration-300 group-hover/video:bg-black/60">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsPlaying(true);
            }}
            className="w-12 h-12 rounded-full bg-[#990000] hover:bg-red-700 text-[#D4AF37] border border-[#D4AF37]/40 flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-110 cursor-pointer focus:outline-none"
          >
            <Play className="w-5 h-5 fill-current" />
          </button>
        </div>
        <div className="absolute bottom-2 left-2 bg-black/80 px-2.5 py-1 rounded text-[8px] font-mono tracking-wider text-[#D4AF37] uppercase border border-neutral-800">
          {videoType === 'youtube' ? 'YouTube video' : 'Device video'}
        </div>
      </div>
    );
  }

  if (videoType === 'youtube') {
    const embedUrl = getYouTubeEmbedUrl(videoUrl);
    if (embedUrl) {
      return (
        <iframe
          src={embedUrl}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full"
        />
      );
    }
  }

  // Local / Direct Video URL
  return (
    <div className="relative w-full h-full bg-black">
      <video
        src={videoUrl}
        className="w-full h-full object-cover"
        controls
        autoPlay
        preload="auto"
      />
    </div>
  );
}
