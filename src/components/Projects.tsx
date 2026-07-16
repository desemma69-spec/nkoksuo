import { useState, useMemo } from 'react';
import { PROJECTS_DATA, COMMUNITIES_DATA } from '../data';
import { Project, ProjectCategory, ProjectStatus, Community } from '../types';
import VideoPlayer from './VideoPlayer';
import {
  Search,
  Filter,
  BookOpen,
  Heart,
  Droplets,
  Hammer,
  Sprout,
  TrendingUp,
  DollarSign,
  Calendar,
  Users,
  Target,
  Award,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Clock
} from 'lucide-react';

interface ProjectsProps {
  projects?: Project[];
  communities?: Community[];
}

export default function Projects({ projects = PROJECTS_DATA, communities = COMMUNITIES_DATA }: ProjectsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);

  // Categories list
  const categories: { value: string; label: string }[] = [
    { value: 'all', label: 'All Categories' },
    { value: 'education', label: 'Education' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'sanitation', label: 'Water & Sanitation' },
    { value: 'infrastructure', label: 'Infrastructure' },
    { value: 'agriculture', label: 'Agribusiness' },
    { value: 'economic', label: 'Economic Empowerment' },
  ];

  // Statuses list
  const statuses: { value: string; label: string; icon: any }[] = [
    { value: 'all', label: 'All Statuses', icon: null },
    { value: 'completed', label: 'Completed', icon: CheckCircle2 },
    { value: 'ongoing', label: 'In Progress', icon: Clock },
    { value: 'planned', label: 'Planned / Pipeline', icon: AlertCircle },
  ];

  // Filter projects dynamically
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      if (!project) return false;
      const titleStr = typeof project.title === 'string' ? project.title : '';
      const descStr = typeof project.description === 'string' ? project.description : '';
      const impactStr = typeof project.impactSummary === 'string' ? project.impactSummary : '';

      const matchesSearch =
        titleStr.toLowerCase().includes(searchTerm.toLowerCase()) ||
        descStr.toLowerCase().includes(searchTerm.toLowerCase()) ||
        impactStr.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCommunity =
        selectedCommunity === 'all' || (typeof project.communityId === 'string' && project.communityId === selectedCommunity);

      const matchesStatus =
        selectedStatus === 'all' || (typeof project.status === 'string' && project.status === selectedStatus);

      const matchesCategory =
        selectedCategory === 'all' || (typeof project.category === 'string' && project.category === selectedCategory);

      return matchesSearch && matchesCommunity && matchesStatus && matchesCategory;
    });
  }, [searchTerm, selectedCommunity, selectedStatus, selectedCategory, projects]);

  // Statistics calculations based on filtered projects
  const stats = useMemo(() => {
    const total = filteredProjects.length;
    const completed = filteredProjects.filter((p) => p.status === 'completed').length;
    const ongoing = filteredProjects.filter((p) => p.status === 'ongoing').length;
    const planned = filteredProjects.filter((p) => p.status === 'planned').length;

    // Estimate completion rate
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, ongoing, planned, completionRate };
  }, [filteredProjects]);

  // Helper to return category icon
  const getCategoryIcon = (category: ProjectCategory) => {
    switch (category) {
      case 'education':
        return <BookOpen className="w-4 h-4" />;
      case 'healthcare':
        return <Heart className="w-4 h-4" />;
      case 'sanitation':
        return <Droplets className="w-4 h-4" />;
      case 'infrastructure':
        return <Hammer className="w-4 h-4" />;
      case 'agriculture':
        return <Sprout className="w-4 h-4" />;
      case 'economic':
        return <TrendingUp className="w-4 h-4" />;
      default:
        return <HelpCircle className="w-4 h-4" />;
    }
  };

  // Helper to style status badges
  const getStatusBadge = (status: ProjectStatus) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-green-950/80 border border-green-800 text-green-400">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> COMPLETED
          </span>
        );
      case 'ongoing':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-950/80 border border-amber-800 text-amber-400">
            <Clock className="w-3.5 h-3.5 mr-1 animate-pulse" /> ONGOING
          </span>
        );
      case 'planned':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-neutral-800 border border-neutral-700 text-neutral-400">
            <AlertCircle className="w-3.5 h-3.5 mr-1" /> PLANNED
          </span>
        );
    }
  };

  const handleCardToggle = (id: string) => {
    setExpandedProjectId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="projects"
      className="relative py-24 bg-[#0a0a0a] border-b border-neutral-950"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 animate-fade-in">
          <span className="text-[#D4AF37] text-xs font-black uppercase tracking-[0.25em] border-l-2 border-[#990000] pl-3 mb-3 block">
            Nkosuo Division Dashboard
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white uppercase mt-2">
            Developmental Projects
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
            Explore active, completed, and planned projects coordinated by the Nkosuo Division of the New Juaben Traditional Area across the traditional sub-communities. Keeping development transparent and citizen-centered.
          </p>
        </div>

        {/* Dashboard Statistics Panel */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
          <div className="bg-[#111111] p-5 border-r-4 border-neutral-800 text-center">
            <span className="text-[10px] font-sans font-black text-neutral-500 uppercase tracking-wider block">
              Filtered Projects
            </span>
            <strong className="text-2xl sm:text-3xl font-black font-mono text-white mt-1 block">
              {stats.total}
            </strong>
          </div>
          <div className="bg-[#111111] p-5 border-r-4 border-emerald-900 text-center">
            <span className="text-[10px] font-sans font-black text-emerald-500 uppercase tracking-wider block">
              Completed
            </span>
            <strong className="text-2xl sm:text-3xl font-black font-mono text-emerald-400 mt-1 block">
              {stats.completed}
            </strong>
          </div>
          <div className="bg-[#111111] p-5 border-r-4 border-[#D4AF37] text-center">
            <span className="text-[10px] font-sans font-black text-[#D4AF37] uppercase tracking-wider block">
              In Progress
            </span>
            <strong className="text-2xl sm:text-3xl font-black font-mono text-[#D4AF37] mt-1 block">
              {stats.ongoing}
            </strong>
          </div>
          <div className="bg-[#111111] p-5 border-r-4 border-[#990000] text-center">
            <span className="text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider block">
              Planned
            </span>
            <strong className="text-2xl sm:text-3xl font-black font-mono text-neutral-400 mt-1 block">
              {stats.planned}
            </strong>
          </div>
          <div className="bg-[#111111] p-5 border-r-4 border-[#D4AF37] text-center col-span-2 md:col-span-1">
            <span className="text-[10px] font-sans font-black text-[#D4AF37] uppercase tracking-wider block">
              Delivery Rate
            </span>
            <div className="flex items-center justify-center mt-1 space-x-1.5">
              <strong className="text-2xl sm:text-3xl font-black font-mono text-[#D4AF37]">
                {stats.completionRate}%
              </strong>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-gradient-to-br from-[#1a1a1a] to-black border border-neutral-800 rounded-xl p-6 mb-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            
            {/* Search Input (4 Cols) */}
            <div className="lg:col-span-4 relative">
              <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-neutral-500" />
              <input
                type="text"
                id="project-search-input"
                placeholder="Search projects or impact..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#111111] border border-neutral-800 rounded pl-10 pr-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37] transition-all"
              />
            </div>

            {/* Community Dropdown (2.5 Cols) */}
            <div className="lg:col-span-3">
              <select
                id="project-community-filter"
                value={selectedCommunity}
                onChange={(e) => setSelectedCommunity(e.target.value)}
                className="w-full bg-[#111111] border border-neutral-800 rounded px-3 py-3 text-xs text-neutral-300 focus:outline-none focus:border-[#D4AF37] cursor-pointer"
              >
                <option value="all">All Communities</option>
                {communities.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Dropdown (2.5 Cols) */}
            <div className="lg:col-span-3">
              <select
                id="project-category-filter"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-[#111111] border border-neutral-800 rounded px-3 py-3 text-xs text-neutral-300 focus:outline-none focus:border-[#D4AF37] cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Selector (2 Cols) */}
            <div className="lg:col-span-2">
              <select
                id="project-status-filter"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full bg-[#111111] border border-neutral-800 rounded px-3 py-3 text-xs text-neutral-300 focus:outline-none focus:border-[#D4AF37] cursor-pointer"
              >
                {statuses.map((stat) => (
                  <option key={stat.value} value={stat.value}>
                    {stat.label}
                  </option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {/* Projects Grid Display */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-neutral-950 rounded-2xl border border-neutral-800 p-8 max-w-md mx-auto">
            <Filter className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
            <h4 className="text-lg font-bold text-white uppercase font-sans">No Projects Found</h4>
            <p className="text-xs text-neutral-500 font-sans mt-2 leading-relaxed">
              We couldn&apos;t find any developmental projects matching your specific search query or filter combination. Try resetting your search filters.
            </p>
            <button
              id="btn-reset-filters"
              onClick={() => {
                setSearchTerm('');
                setSelectedCommunity('all');
                setSelectedCategory('all');
                setSelectedStatus('all');
              }}
              className="mt-5 px-5 py-2.5 bg-red-950 border border-red-800 hover:bg-red-900 text-white rounded font-mono text-xs font-bold tracking-wider uppercase transition-all"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((project) => {
              const isExpanded = expandedProjectId === project.id;
              
              return (
                <div
                  key={project.id}
                  id={`project-card-${project.id}`}
                  className={`bg-[#111111] border-r-4 transition-all duration-300 shadow-2xl relative overflow-hidden ${
                    isExpanded
                      ? 'border-[#D4AF37] bg-gradient-to-br from-[#1a1a1a] to-[#111111]'
                      : 'border-neutral-800 hover:border-neutral-700 hover:bg-[#111111]/90'
                  }`}
                >
                  {/* Thumbnail / Image with Category Tag */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-neutral-900 bg-neutral-900">
                    {project.videoUrl ? (
                      <VideoPlayer
                        videoUrl={project.videoUrl}
                        videoType={project.videoType}
                        thumbnailUrl={project.image}
                        title={project.title}
                      />
                    ) : project.image && (project.image.startsWith('data:video') || project.image.endsWith('.mp4') || project.image.endsWith('.webm')) ? (
                      <video
                        src={project.image}
                        className="w-full h-full object-cover object-center"
                        controls
                        preload="metadata"
                      />
                    ) : (
                      <img
                        src={project.image || "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&q=80&w=800"}
                        alt={project.title}
                        className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-500 transform hover:scale-102"
                        referrerPolicy="no-referrer"
                      />
                    )}
                    
                    {/* Dark gradient shadow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none"></div>

                    {/* Category overlay label */}
                    <div className="absolute top-4 left-4 bg-neutral-950/90 border border-[#D4AF37]/50 text-[#D4AF37] text-[10px] font-mono font-bold tracking-wider px-3 py-1.5 rounded uppercase flex items-center shadow-lg">
                      <span className="mr-1.5">{getCategoryIcon(project.category)}</span>
                      {project.category}
                    </div>

                    {/* Status overlay label */}
                    <div className="absolute top-4 right-4 shadow-lg">
                      {getStatusBadge(project.status)}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    {/* Location Badge */}
                    <div className="text-[9px] font-sans font-black text-[#990000] tracking-[0.2em] uppercase mb-1 flex items-center">
                      <span className="w-4 h-0.5 bg-[#990000] mr-2"></span>
                      Sub-Community: {project.communityName}
                    </div>

                    <h3 className="text-lg sm:text-xl font-display font-black text-white uppercase tracking-tight">
                      {project.title}
                    </h3>
                    
                    <p className="mt-3 text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    {/* Progress Bar */}
                    <div className="mt-6">
                      <div className="flex items-center justify-between text-xs font-mono font-bold mb-1.5">
                        <span className="text-neutral-400 uppercase tracking-wider">Project Progress</span>
                        <span className="text-[#D4AF37]">{project.progress}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-neutral-900 rounded-full overflow-hidden border border-neutral-800">
                        <div
                          className="h-full bg-gradient-to-r from-red-700 via-red-500 to-[#D4AF37] transition-all duration-1000"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Metadata Grid (Start Date, Budget) */}
                    <div className="mt-6 pt-5 border-t border-neutral-900 grid grid-cols-2 gap-4 text-xs font-mono">
                      <div>
                        <span className="text-neutral-500 block uppercase tracking-wider">Estimated Budget</span>
                        <strong className="text-white text-sm tracking-tight flex items-center mt-1">
                          <DollarSign className="w-3.5 h-3.5 text-[#D4AF37] mr-1" /> {project.budget}
                        </strong>
                      </div>
                      <div>
                        <span className="text-neutral-500 block uppercase tracking-wider">Commenced</span>
                        <strong className="text-white text-sm tracking-tight flex items-center mt-1">
                          <Calendar className="w-3.5 h-3.5 text-red-500 mr-1" /> {project.startDate}
                        </strong>
                      </div>
                    </div>

                    {/* Expandable Details Area */}
                    {isExpanded && (
                      <div className="mt-6 pt-5 border-t border-neutral-900 space-y-4 text-xs sm:text-sm font-sans animate-fade-in">
                        {/* Funding Source */}
                        <div className="bg-neutral-900/60 p-3.5 rounded-lg border border-neutral-800">
                          <span className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-wider block mb-1">
                            Funding Authority
                          </span>
                          <p className="text-neutral-200 font-medium leading-relaxed">{project.fundingSource}</p>
                        </div>

                        {/* Beneficiaries */}
                        <div className="bg-neutral-900/60 p-3.5 rounded-lg border border-neutral-800">
                          <span className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-wider block mb-1">
                            Primary Beneficiaries
                          </span>
                          <p className="text-neutral-200 font-medium leading-relaxed">{project.beneficiaries}</p>
                        </div>

                        {/* Impact Summary */}
                        <div className="bg-neutral-900/60 p-3.5 rounded-lg border border-[#D4AF37]/20">
                          <span className="text-[10px] font-mono font-bold text-green-400 uppercase tracking-wider block mb-1 flex items-center">
                            <Award className="w-3.5 h-3.5 mr-1 text-green-500" /> Developmental Impact
                          </span>
                          <p className="text-neutral-200 leading-relaxed font-medium">{project.impactSummary}</p>
                        </div>
                      </div>
                    )}

                    {/* Expand/Collapse Button */}
                    <button
                      id={`btn-expand-project-${project.id}`}
                      onClick={() => handleCardToggle(project.id)}
                      className="mt-6 w-full py-2.5 bg-[#111111] border border-neutral-800 hover:border-[#D4AF37] text-neutral-300 hover:text-white font-mono text-[10px] font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center cursor-pointer"
                    >
                      {isExpanded ? (
                        <>
                          <span className="mr-1.5">Hide Details</span>
                          <ChevronUp className="w-4 h-4 text-red-500" />
                        </>
                      ) : (
                        <>
                          <span className="mr-1.5">Expand Impact &amp; details</span>
                          <ChevronDown className="w-4 h-4 text-[#D4AF37]" />
                        </>
                      )}
                    </button>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
