import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { 
  Lock, 
  Shield, 
  Trash2, 
  Edit2,
  CheckCircle, 
  Clock, 
  Calendar, 
  Users, 
  Upload, 
  Briefcase, 
  Plus, 
  BookOpen, 
  Heart, 
  Droplets, 
  Hammer, 
  Sprout, 
  TrendingUp, 
  DollarSign, 
  Award, 
  AlertCircle, 
  AlertTriangle,
  Check, 
  Sparkles, 
  Mail, 
  Phone, 
  X, 
  ChevronDown, 
  BarChart3, 
  ArrowLeft, 
  Image as ImageIcon,
  MapPin,
  MessageSquare,
  Crown,
  Landmark,
  Eye,
  EyeOff,
  Video as VideoIcon,
  Film,
  CheckSquare,
  Square
} from 'lucide-react';
import { Project, Event as RoyalEvent, GalleryItem, FeedbackSubmission, ProjectCategory, ProjectStatus, Community, TraditionalLeader, AdinkraProverb, AdvisoryBoardMember, ContactInfo } from '../types';
import { COMMUNITIES_DATA, DEFAULT_CONTACT_INFO } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import VideoPlayer from './VideoPlayer';
import { supabaseService } from '../lib/supabase';

interface AdminDashboardProps {
  onClose: () => void;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  events: RoyalEvent[];
  setEvents: React.Dispatch<React.SetStateAction<RoyalEvent[]>>;
  galleryItems: GalleryItem[];
  setGalleryItems: React.Dispatch<React.SetStateAction<GalleryItem[]>>;
  adinkraProverbs: AdinkraProverb[];
  setAdinkraProverbs: React.Dispatch<React.SetStateAction<AdinkraProverb[]>>;
  feedback?: FeedbackSubmission[];
  setFeedback?: React.Dispatch<React.SetStateAction<FeedbackSubmission[]>>;
  heroBgUrl: string;
  setHeroBgUrl: React.Dispatch<React.SetStateAction<string>>;
  traditionalLeaders: TraditionalLeader[];
  setTraditionalLeaders: (val: TraditionalLeader[]) => void;
  communities: Community[];
  setCommunities: (communities: Community[]) => void;
  
  // Custom Homepage logo and texts
  logoText: string;
  setLogoText: (val: string) => void;
  logoSubtext: string;
  setLogoSubtext: (val: string) => void;
  logoImgUrl: string;
  setLogoImgUrl: (val: string) => void;
  heroTitle1: string;
  setHeroTitle1: (val: string) => void;
  heroTitle2: string;
  setHeroTitle2: (val: string) => void;
  heroSubBadge: string;
  setHeroSubBadge: (val: string) => void;
  heroDesc: string;
  setHeroDesc: (val: string) => void;
  heroStats: Array<{value: string, label: string}>;
  setHeroStats: (val: Array<{value: string, label: string}>) => void;
  heroBgPosition: string;
  setHeroBgPosition: (val: string) => void;
  advisoryBoard?: AdvisoryBoardMember[];
  setAdvisoryBoard?: (val: AdvisoryBoardMember[]) => void;
  advisorySubtitle?: string;
  setAdvisorySubtitle?: (val: string) => void;
  advisoryTitle?: string;
  setAdvisoryTitle?: (val: string) => void;
  advisoryDesc?: string;
  setAdvisoryDesc?: (val: string) => void;
  contacts?: ContactInfo;
  setContacts?: (val: ContactInfo) => void;
  isDbLoading?: boolean;
  supabaseStatus?: 'not_configured' | 'connected' | 'error';
}

const IMAGE_PRESETS = {
  agriculture: [
    { label: 'Cocoa Crop', url: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&q=80&w=800' },
    { label: 'Cassava Processing', url: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=800' },
    { label: 'Organic Farm Plots', url: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800' }
  ],
  education: [
    { label: 'Modern Classrooms', url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800' },
    { label: 'Palace ICT Lab', url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800' },
    { label: 'Children Reading', url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800' }
  ],
  healthcare: [
    { label: 'Maternity Clinic', url: 'https://images.unsplash.com/photo-1584515901367-f1c3a8f3d37e?auto=format&fit=crop&q=80&w=800' },
    { label: 'Medical Screening', url: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800' },
    { label: 'Patient Recovery', url: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=800' }
  ],
  sanitation: [
    { label: 'Clean Water Mechanized System', url: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&q=80&w=800' },
    { label: 'Recycling Facility', url: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=800' }
  ],
  infrastructure: [
    { label: 'Urban Drainage Construction', url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800' },
    { label: 'Lorry Terminal', url: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&q=80&w=800' }
  ],
  cultural: [
    { label: 'Akan Kente Weaver', url: 'https://images.unsplash.com/photo-1523474253046-2cd2748b5fd2?auto=format&fit=crop&q=80&w=800' },
    { label: 'Royal Ceremony Drums', url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800' }
  ]
};

export default function AdminDashboard({
  onClose,
  projects,
  setProjects,
  events,
  setEvents,
  galleryItems,
  setGalleryItems,
  adinkraProverbs,
  setAdinkraProverbs,
  feedback: propFeedback,
  setFeedback: propSetSetFeedback,
  heroBgUrl,
  setHeroBgUrl,
  traditionalLeaders,
  setTraditionalLeaders,
  communities,
  setCommunities,
  logoText,
  setLogoText,
  logoSubtext,
  setLogoSubtext,
  logoImgUrl,
  setLogoImgUrl,
  heroTitle1,
  setHeroTitle1,
  heroTitle2,
  setHeroTitle2,
  heroSubBadge,
  setHeroSubBadge,
  heroDesc,
  setHeroDesc,
  heroStats,
  setHeroStats,
  heroBgPosition,
  setHeroBgPosition,
  advisoryBoard,
  setAdvisoryBoard,
  advisorySubtitle: propAdvisorySubtitle,
  setAdvisorySubtitle: propSetAdvisorySubtitle,
  advisoryTitle: propAdvisoryTitle,
  setAdvisoryTitle: propSetAdvisoryTitle,
  advisoryDesc: propAdvisoryDesc,
  setAdvisoryDesc: propSetAdvisoryDesc,
  contacts: propContacts,
  setContacts: propSetContacts,
  isDbLoading,
  supabaseStatus
}: AdminDashboardProps) {
  const [internalAdvisoryBoard, setInternalAdvisoryBoard] = useState<AdvisoryBoardMember[]>([]);
  const advisoryMembers = advisoryBoard !== undefined ? advisoryBoard : internalAdvisoryBoard;
  const setAdvisoryMembers = setAdvisoryBoard !== undefined ? setAdvisoryBoard : setInternalAdvisoryBoard;

  const [internalAdvisorySubtitle, setInternalAdvisorySubtitle] = useState<string>('Advisory Council & Strategy');
  const advisorySubtitle = propAdvisorySubtitle !== undefined ? propAdvisorySubtitle : internalAdvisorySubtitle;
  const setAdvisorySubtitle = propSetAdvisorySubtitle !== undefined ? propSetAdvisorySubtitle : setInternalAdvisorySubtitle;

  const [internalAdvisoryTitle, setInternalAdvisoryTitle] = useState<string>('Nkosuo Advisory Board');
  const advisoryTitle = propAdvisoryTitle !== undefined ? propAdvisoryTitle : internalAdvisoryTitle;
  const setAdvisoryTitle = propSetAdvisoryTitle !== undefined ? propSetAdvisoryTitle : setInternalAdvisoryTitle;

  const [internalAdvisoryDesc, setInternalAdvisoryDesc] = useState<string>('A distinguished panel of technical experts, development economists, healthcare champions, and financial specialists advising the Nkosuo Division on the strategic implementation of our modernization projects.');
  const advisoryDesc = propAdvisoryDesc !== undefined ? propAdvisoryDesc : internalAdvisoryDesc;
  const setAdvisoryDesc = propSetAdvisoryDesc !== undefined ? propSetAdvisoryDesc : setInternalAdvisoryDesc;

  const [internalFeedback, setInternalFeedback] = useState<FeedbackSubmission[]>([]);
  const feedback = propFeedback !== undefined ? propFeedback : internalFeedback;
  const setFeedback = propSetSetFeedback !== undefined ? propSetSetFeedback : setInternalFeedback;

  const [internalContacts, setInternalContacts] = useState<ContactInfo>(DEFAULT_CONTACT_INFO);
  const contacts = propContacts !== undefined ? propContacts : internalContacts;
  const setContacts = propSetContacts !== undefined ? propSetContacts : setInternalContacts;

  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedGalleryIds, setSelectedGalleryIds] = useState<string[]>([]);

  const [adminPassword, setAdminPassword] = useState<string>(() => {
    return localStorage.getItem('new_juaben_admin_password') || 'nkosuo2026';
  });

  const [currentPasswordInput, setCurrentPasswordInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [passwordChangeError, setPasswordChangeError] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Draft upload states for cancelable uploads
  const [logoDraft, setLogoDraft] = useState<string | null>(null);
  const [heroBgDraft, setHeroBgDraft] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);

  // Form states for texts
  const [formLogoText, setFormLogoText] = useState(logoText);
  const [formLogoSubtext, setFormLogoSubtext] = useState(logoSubtext);
  const [formHeroTitle1, setFormHeroTitle1] = useState(heroTitle1);
  const [formHeroTitle2, setFormHeroTitle2] = useState(heroTitle2);
  const [formHeroSubBadge, setFormHeroSubBadge] = useState(heroSubBadge);
  const [formHeroDesc, setFormHeroDesc] = useState(heroDesc);

  // Form states for stats
  const [formStats, setFormStats] = useState<Array<{value: string, label: string}>>(heroStats);

  // Sync form states with props when component mounts or props update
  useEffect(() => {
    setFormLogoText(logoText);
    setFormLogoSubtext(logoSubtext);
    setFormHeroTitle1(heroTitle1);
    setFormHeroTitle2(heroTitle2);
    setFormHeroSubBadge(heroSubBadge);
    setFormHeroDesc(heroDesc);
    setFormStats(heroStats);
  }, [logoText, logoSubtext, heroTitle1, heroTitle2, heroSubBadge, heroDesc, heroStats]);

  const [contactsForm, setContactsForm] = useState<ContactInfo>(contacts);

  useEffect(() => {
    setContactsForm(contacts);
  }, [contacts]);
  
  // Dashboard navigation sub-tabs
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'events' | 'gallery' | 'feedback' | 'hero-bg' | 'traditional-leaders' | 'advisory' | 'communities' | 'contacts' | 'security'>('overview');
  
  // Editing reference states
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [editingGalleryId, setEditingGalleryId] = useState<string | null>(null);

  // Creation Form States
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    communityId: communities[0]?.id || 'effiduase',
    category: 'education' as ProjectCategory,
    status: 'planned' as ProjectStatus,
    progress: 0,
    budget: '',
    startDate: '',
    fundingSource: '',
    beneficiaries: '',
    impactSummary: '',
    image: IMAGE_PRESETS.education[0].url,
    videoUrl: '',
    videoType: 'youtube' as 'youtube' | 'local'
  });

  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    communityId: communities[0]?.id || 'effiduase',
    category: 'development' as 'festival' | 'durbar' | 'development' | 'cultural' | 'health',
    imageUrl: IMAGE_PRESETS.education[0].url,
    videoUrl: '',
    videoType: 'youtube' as 'youtube' | 'local'
  });

  const [galleryForm, setGalleryForm] = useState({
    title: '',
    description: '',
    category: 'projects' as 'chiefs' | 'culture' | 'projects' | 'events',
    imageUrl: IMAGE_PRESETS.cultural[0].url
  });

  // Adinkra Wisdom & developmental Philosophy States
  const [editingProverbIndex, setEditingProverbIndex] = useState<number | null>(null);
  const [proverbForm, setProverbForm] = useState<AdinkraProverb>({
    symbol: '',
    translation: '',
    proverb: '',
    meaning: ''
  });

  // Traditional Leaders State & Form Manager
  const [selectedLeaderId, setSelectedLeaderId] = useState<string>('paramount_chief');
  const [leadersForm, setLeadersForm] = useState({
    name: '',
    title: '',
    role: '',
    avatarUrl: '',
    bio: ''
  });

  // Advisory Board Form Manager
  const [editingAdvisoryId, setEditingAdvisoryId] = useState<string | null>(null);
  const [advisoryForm, setAdvisoryForm] = useState({
    name: '',
    role: '',
    organization: '',
    bio: '',
    imageUrl: ''
  });

  useEffect(() => {
    const leader = traditionalLeaders.find(l => l.id === selectedLeaderId);
    if (leader) {
      setLeadersForm({
        name: leader.name || '',
        title: leader.title || '',
        role: leader.role || '',
        avatarUrl: leader.avatarUrl || '',
        bio: leader.bio || ''
      });
    }
  }, [selectedLeaderId, traditionalLeaders]);

  // Communities Form Manager
  const [selectedCommunityToEdit, setSelectedCommunityToEdit] = useState<string>('');
  
  // Custom confirmation modal state to replace non-functional native confirm() within iframes
  const [confirmDialog, setConfirmDialog] = useState<{
    title: string;
    message: string;
    onConfirm: () => void;
  } | null>(null);
  const [communityForm, setCommunityForm] = useState({
    name: '',
    population: '',
    desc: '',
    chiefProfile: {
      name: '',
      title: '',
      reignTitle: '',
      stooledYear: '',
      avatarUrl: '',
      bio: '',
      vision: '',
      education: '',
      achievements: ''
    },
    queenProfile: {
      name: '',
      title: '',
      reignTitle: '',
      enstooledYear: '',
      avatarUrl: '',
      bio: '',
      vision: '',
      education: '',
      achievements: ''
    }
  });

  useEffect(() => {
    if (selectedCommunityToEdit) {
      const comm = communities.find(c => c.id === selectedCommunityToEdit);
      if (comm) {
        setCommunityForm({
          name: comm.name,
          population: comm.population || '',
          desc: comm.desc || '',
          chiefProfile: {
            name: comm.chiefProfile?.name || '',
            title: comm.chiefProfile?.title || '',
            reignTitle: comm.chiefProfile?.reignTitle || '',
            stooledYear: comm.chiefProfile?.stooledYear || '',
            avatarUrl: comm.chiefProfile?.avatarUrl || '',
            bio: comm.chiefProfile?.bio || '',
            vision: comm.chiefProfile?.vision || '',
            education: Array.isArray(comm.chiefProfile?.education) ? comm.chiefProfile.education.join(', ') : (comm.chiefProfile?.education || ''),
            achievements: Array.isArray(comm.chiefProfile?.achievements) ? comm.chiefProfile.achievements.join(', ') : (comm.chiefProfile?.achievements || '')
          },
          queenProfile: {
            name: comm.queenProfile?.name || '',
            title: comm.queenProfile?.title || '',
            reignTitle: comm.queenProfile?.reignTitle || '',
            enstooledYear: comm.queenProfile?.enstooledYear || '',
            avatarUrl: comm.queenProfile?.avatarUrl || '',
            bio: comm.queenProfile?.bio || '',
            vision: comm.queenProfile?.vision || '',
            education: Array.isArray(comm.queenProfile?.education) ? comm.queenProfile.education.join(', ') : (comm.queenProfile?.education || ''),
            achievements: Array.isArray(comm.queenProfile?.achievements) ? comm.queenProfile.achievements.join(', ') : (comm.queenProfile?.achievements || '')
          }
        });
      }
    } else {
      setCommunityForm({
        name: '',
        population: '',
        desc: '',
        chiefProfile: {
          name: '',
          title: '',
          reignTitle: '',
          stooledYear: '',
          avatarUrl: '',
          bio: '',
          vision: '',
          education: '',
          achievements: ''
        },
        queenProfile: {
          name: '',
          title: '',
          reignTitle: '',
          enstooledYear: '',
          avatarUrl: '',
          bio: '',
          vision: '',
          education: '',
          achievements: ''
        }
      });
    }
  }, [selectedCommunityToEdit, communities]);

  // Action feedback states
  const [successMessage, setSuccessMessage] = useState('');

  // Handle local storage save of all properties
  const triggerStorageUpdate = (type: 'projects' | 'events' | 'gallery' | 'feedback', data: any) => {
    switch (type) {
      case 'projects':
        localStorage.setItem('new_juaben_nkosuo_projects', JSON.stringify(data));
        break;
      case 'events':
        localStorage.setItem('new_juaben_nkosuo_events', JSON.stringify(data));
        break;
      case 'gallery':
        localStorage.setItem('new_juaben_nkosuo_gallery', JSON.stringify(data));
        break;
      case 'feedback':
        localStorage.setItem('new_juaben_nkosuo_feedback', JSON.stringify(data));
        break;
    }
  };

  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password === adminPassword) {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid access password. Access to Royal Council publishing is protected.');
    }
  };

  const handleChangePasswordSubmit = (e: FormEvent) => {
    e.preventDefault();
    setPasswordChangeError('');

    if (currentPasswordInput !== adminPassword) {
      setPasswordChangeError('Current password input is incorrect.');
      return;
    }

    if (!newPasswordInput || newPasswordInput.trim() === '') {
      setPasswordChangeError('New password cannot be empty.');
      return;
    }

    if (newPasswordInput !== confirmPasswordInput) {
      setPasswordChangeError('New passwords do not match.');
      return;
    }

    if (newPasswordInput.length < 6) {
      setPasswordChangeError('New password must be at least 6 characters long.');
      return;
    }

    // Save
    localStorage.setItem('new_juaben_admin_password', newPasswordInput);
    setAdminPassword(newPasswordInput);
    
    // Clear inputs
    setCurrentPasswordInput('');
    setNewPasswordInput('');
    setConfirmPasswordInput('');
    
    showSuccessFeedback('Administrative passcode successfully updated and secured!');
  };

  // Create Nkosuo Project
  const handleCreateProject = (e: FormEvent) => {
    e.preventDefault();
    if (!projectForm.title || !projectForm.description || !projectForm.budget) return;

    const matchedComm = communities.find(c => c.id === projectForm.communityId);
    
    if (editingProjectId) {
      const updated = projects.map(p => {
        if (p.id === editingProjectId) {
          return {
            ...p,
            title: projectForm.title,
            description: projectForm.description,
            communityId: projectForm.communityId,
            communityName: matchedComm ? matchedComm.name : 'Effiduase',
            category: projectForm.category,
            status: projectForm.status,
            progress: Number(projectForm.progress),
            budget: projectForm.budget,
            startDate: projectForm.startDate || new Date().toISOString().split('T')[0],
            fundingSource: projectForm.fundingSource || 'Traditional Development Fund',
            beneficiaries: projectForm.beneficiaries || 'Entire sub-community',
            impactSummary: projectForm.impactSummary || 'Empowered the developmental index of the division.',
            image: projectForm.image,
            videoUrl: projectForm.videoUrl,
            videoType: projectForm.videoType
          };
        }
        return p;
      });
      setProjects(updated);
      triggerStorageUpdate('projects', updated);
      setEditingProjectId(null);
      showSuccessFeedback('Nkosuo developmental project successfully edited & updated!');
    } else {
      const newProject: Project = {
        id: `p-${Date.now()}`,
        title: projectForm.title,
        description: projectForm.description,
        communityId: projectForm.communityId,
        communityName: matchedComm ? matchedComm.name : 'Effiduase',
        category: projectForm.category,
        status: projectForm.status,
        progress: Number(projectForm.progress),
        budget: projectForm.budget,
        startDate: projectForm.startDate || new Date().toISOString().split('T')[0],
        fundingSource: projectForm.fundingSource || 'Traditional Development Fund',
        beneficiaries: projectForm.beneficiaries || 'Entire sub-community',
        impactSummary: projectForm.impactSummary || 'Empowered the developmental index of the division.',
        image: projectForm.image,
        videoUrl: projectForm.videoUrl,
        videoType: projectForm.videoType
      };

      const updated = [newProject, ...projects];
      setProjects(updated);
      triggerStorageUpdate('projects', updated);
      showSuccessFeedback('Nkosuo developmental project successfully published & stooled!');
    }

    // Reset Form
    setProjectForm({
      title: '',
      description: '',
      communityId: communities[0]?.id || 'effiduase',
      category: 'education',
      status: 'planned',
      progress: 0,
      budget: '',
      startDate: '',
      fundingSource: '',
      beneficiaries: '',
      impactSummary: '',
      image: IMAGE_PRESETS.education[0].url,
      videoUrl: '',
      videoType: 'youtube'
    });
  };

  // Create Event
  const handleCreateEvent = (e: FormEvent) => {
    e.preventDefault();
    if (!eventForm.title || !eventForm.description || !eventForm.location || !eventForm.date) return;

    const matchedComm = communities.find(c => c.id === eventForm.communityId);

    if (editingEventId) {
      const updated = events.map(ev => {
        if (ev.id === editingEventId) {
          return {
            ...ev,
            title: eventForm.title,
            description: eventForm.description,
            date: eventForm.date,
            time: eventForm.time || '10:00 AM',
            location: eventForm.location,
            communityId: eventForm.communityId,
            communityName: matchedComm ? matchedComm.name : 'Effiduase',
            category: eventForm.category,
            imageUrl: eventForm.imageUrl,
            videoUrl: eventForm.videoUrl,
            videoType: eventForm.videoType
          };
        }
        return ev;
      });
      setEvents(updated);
      triggerStorageUpdate('events', updated);
      setEditingEventId(null);
      showSuccessFeedback('Traditional event/durbar successfully edited and updated!');
    } else {
      const newEvent: RoyalEvent = {
        id: `ev-${Date.now()}`,
        title: eventForm.title,
        description: eventForm.description,
        date: eventForm.date,
        time: eventForm.time || '10:00 AM',
        location: eventForm.location,
        communityId: eventForm.communityId,
        communityName: matchedComm ? matchedComm.name : 'Effiduase',
        category: eventForm.category,
        imageUrl: eventForm.imageUrl,
        videoUrl: eventForm.videoUrl,
        videoType: eventForm.videoType
      };

      const updated = [newEvent, ...events];
      setEvents(updated);
      triggerStorageUpdate('events', updated);
      showSuccessFeedback('Traditional event/durbar successfully announced and published!');
    }

    // Reset Form
    setEventForm({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      communityId: communities[0]?.id || 'effiduase',
      category: 'development',
      imageUrl: IMAGE_PRESETS.education[0].url,
      videoUrl: '',
      videoType: 'youtube'
    });
  };

  // Create Gallery Artifact
  const handleCreateGallery = (e: FormEvent) => {
    e.preventDefault();
    if (!galleryForm.title || !galleryForm.description) return;

    if (editingGalleryId) {
      const updated = galleryItems.map(item => {
        if (item.id === editingGalleryId) {
          return {
            ...item,
            title: galleryForm.title,
            description: galleryForm.description,
            category: galleryForm.category,
            imageUrl: galleryForm.imageUrl
          };
        }
        return item;
      });
      setGalleryItems(updated);
      triggerStorageUpdate('gallery', updated);
      setEditingGalleryId(null);
      showSuccessFeedback('Cultural artifact successfully edited and updated!');
    } else {
      const newItem: GalleryItem = {
        id: `g-${Date.now()}`,
        title: galleryForm.title,
        description: galleryForm.description,
        category: galleryForm.category,
        imageUrl: galleryForm.imageUrl
      };

      const updated = [newItem, ...galleryItems];
      setGalleryItems(updated);
      triggerStorageUpdate('gallery', updated);
      showSuccessFeedback('Cultural artifact and snapshot uploaded to history files!');
    }

    // Reset Form
    setGalleryForm({
      title: '',
      description: '',
      category: 'projects',
      imageUrl: IMAGE_PRESETS.cultural[0].url
    });
  };

  // Edit Gallery Artifact helper
  const handleEditGalleryItem = (item: GalleryItem) => {
    setEditingGalleryId(item.id);
    setGalleryForm({
      title: item.title,
      description: item.description,
      category: item.category,
      imageUrl: item.imageUrl
    });
    document.getElementById('gallery-form-anchor')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Edit proverb helper
  const handleEditProverb = (index: number) => {
    setEditingProverbIndex(index);
    setProverbForm(adinkraProverbs[index]);
    document.getElementById('proverb-form-anchor')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Create or Update Proverb
  const handleProverbSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (editingProverbIndex !== null) {
      const updated = adinkraProverbs.map((prov, idx) => 
        idx === editingProverbIndex ? proverbForm : prov
      );
      setAdinkraProverbs(updated);
      setEditingProverbIndex(null);
      showSuccessFeedback('Adinkra wisdom / philosophy updated successfully!');
    } else {
      const updated = [...adinkraProverbs, proverbForm];
      setAdinkraProverbs(updated);
      showSuccessFeedback('New Adinkra wisdom / philosophy proverb added!');
    }

    setProverbForm({
      symbol: '',
      translation: '',
      proverb: '',
      meaning: ''
    });
  };

  // Delete Proverb
  const handleDeleteProverb = (index: number) => {
    const proverbToDelete = adinkraProverbs[index];
    setConfirmDialog({
      title: `Delete Adinkra Wisdom`,
      message: `Are you sure you want to delete the Adinkra proverb/symbol "${proverbToDelete.symbol}"? This action cannot be undone.`,
      onConfirm: () => {
        const updated = adinkraProverbs.filter((_, idx) => idx !== index);
        setAdinkraProverbs(updated);
        showSuccessFeedback('Adinkra proverb deleted successfully.');
        setConfirmDialog(null);
      }
    });
  };

  // Submit Traditional Leaders Profile Updates
  const handleLeaderSubmit = (e: FormEvent) => {
    e.preventDefault();
    const updated = traditionalLeaders.map(leader => {
      if (leader.id === selectedLeaderId) {
        return {
          ...leader,
          name: leadersForm.name,
          title: leadersForm.title,
          avatarUrl: leadersForm.avatarUrl,
          bio: leadersForm.bio
        };
      }
      return leader;
    });
    setTraditionalLeaders(updated);
    showSuccessFeedback(`Profile and image for ${leadersForm.role || 'Traditional Leader'} successfully updated across the home page!`);
  };

  // Submit Communities divisional seat updates
  const handleCommunitySubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!communityForm.name) return;

    const commId = selectedCommunityToEdit || communityForm.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const originalComm = communities.find(c => c.id === selectedCommunityToEdit);
    const keyProjectsCount = originalComm ? originalComm.keyProjectsCount : 0;

    const formattedChief = {
      id: commId,
      name: communityForm.chiefProfile.name,
      title: communityForm.chiefProfile.title || 'Ohene',
      reignTitle: communityForm.chiefProfile.reignTitle || 'Divisional Ruler',
      stooledYear: communityForm.chiefProfile.stooledYear,
      avatarUrl: communityForm.chiefProfile.avatarUrl,
      bio: communityForm.chiefProfile.bio,
      vision: communityForm.chiefProfile.vision,
      education: communityForm.chiefProfile.education.split(',').map(s => s.trim()).filter(Boolean),
      achievements: communityForm.chiefProfile.achievements.split(',').map(s => s.trim()).filter(Boolean)
    };

    const formattedQueen = {
      id: commId,
      name: communityForm.queenProfile.name,
      title: communityForm.queenProfile.title || 'Ohemaa',
      reignTitle: communityForm.queenProfile.reignTitle || 'Divisional Queen Mother',
      enstooledYear: communityForm.queenProfile.enstooledYear,
      avatarUrl: communityForm.queenProfile.avatarUrl,
      bio: communityForm.queenProfile.bio,
      vision: communityForm.queenProfile.vision,
      education: communityForm.queenProfile.education.split(',').map(s => s.trim()).filter(Boolean),
      achievements: communityForm.queenProfile.achievements.split(',').map(s => s.trim()).filter(Boolean)
    };

    if (selectedCommunityToEdit) {
      // Edit/Update Mode
      const updated = communities.map(c => {
        if (c.id === selectedCommunityToEdit) {
          return {
            ...c,
            name: communityForm.name,
            population: communityForm.population,
            desc: communityForm.desc,
            chiefProfile: formattedChief,
            queenProfile: formattedQueen
          };
        }
        return c;
      });
      setCommunities(updated);
      showSuccessFeedback(`Divisional seat of ${communityForm.name} has been successfully edited & updated!`);
    } else {
      // Create Mode
      const newComm: Community = {
        id: commId,
        name: communityForm.name,
        population: communityForm.population,
        desc: communityForm.desc,
        keyProjectsCount: keyProjectsCount,
        chiefProfile: formattedChief,
        queenProfile: formattedQueen
      };
      const updated = [...communities, newComm];
      setCommunities(updated);
      setSelectedCommunityToEdit(newComm.id);
      showSuccessFeedback(`Divisional community of ${communityForm.name} successfully created & seated!`);
    }
  };

  // Delete Community Divisional Seat
  const handleDeleteCommunity = () => {
    if (!selectedCommunityToEdit) return;
    const comm = communities.find(c => c.id === selectedCommunityToEdit);
    if (!comm) return;

    setConfirmDialog({
      title: 'Dissolve Divisional Seat',
      message: `Are you absolutely sure you want to dissolve the divisional seat of ${comm.name}? All of its associated developmental leadership profiles will be deleted permanently. This cannot be undone.`,
      onConfirm: () => {
        const updated = communities.filter(c => c.id !== selectedCommunityToEdit);
        setCommunities(updated);
        setSelectedCommunityToEdit('');
        showSuccessFeedback(`Traditional division seat of ${comm.name} has been dissolved from the Council register.`);
        setConfirmDialog(null);
      }
    });
  };

  // Delete Action helpers
  const handleDeleteItem = (type: 'project' | 'event' | 'gallery', id: string) => {
    setConfirmDialog({
      title: `Delete Published ${type === 'gallery' ? 'Cultural Artifact' : type === 'project' ? 'Project' : 'Event'}`,
      message: `Are you sure you want to delete this published ${type}? This action cannot be undone.`,
      onConfirm: () => {
        if (type === 'project') {
          const updated = projects.filter(p => p.id !== id);
          setProjects(updated);
          triggerStorageUpdate('projects', updated);
        } else if (type === 'event') {
          const updated = events.filter(e => e.id !== id);
          setEvents(updated);
          triggerStorageUpdate('events', updated);
        } else if (type === 'gallery') {
          const updated = galleryItems.filter(g => g.id !== id);
          setGalleryItems(updated);
          triggerStorageUpdate('gallery', updated);
        }
        showSuccessFeedback(`Successfully un-published and archived ${type}.`);
        setConfirmDialog(null);
      }
    });
  };

  const handleClearAll = (type: 'projects' | 'events') => {
    setConfirmDialog({
      title: `Clear All Published ${type === 'projects' ? 'Projects' : 'Events'}`,
      message: `Are you absolutely sure you want to permanently clear and delete ALL published ${type}? This action will wipe all records from the registry and cannot be undone.`,
      onConfirm: async () => {
        if (type === 'projects') {
          setProjects([]);
          triggerStorageUpdate('projects', []);
        } else if (type === 'events') {
          setEvents([]);
          triggerStorageUpdate('events', []);
        }
        
        // Ensure database is marked as seeded/initialized so defaults are not reloaded on refresh
        supabaseService.setSetting('database_seeded', true);
        localStorage.setItem('new_juaben_database_seeded', 'true');
        
        showSuccessFeedback(`Successfully cleared all published ${type}.`);
        setConfirmDialog(null);
      }
    });
  };

  // Citizen Feed management
  const handleToggleReadFeedback = (id: string) => {
    let message = '';
    const updated = feedback.map(item => {
      if (item.id === id) {
        message = item.isRead ? 'Marked citizen feedback as unread.' : 'Marked citizen feedback as read.';
        return { ...item, isRead: !item.isRead };
      }
      return item;
    });
    setFeedback(updated);
    triggerStorageUpdate('feedback', updated);
    if (message) {
      showSuccessFeedback(message);
    }
  };

  const handleDeleteFeedback = (id: string) => {
    setConfirmDialog({
      title: 'Delete Citizen Feedback',
      message: 'Are you sure you want to delete this citizen feedback submission from historical records?',
      onConfirm: () => {
        const updated = feedback.filter(item => item.id !== id);
        setFeedback(updated);
        triggerStorageUpdate('feedback', updated);
        showSuccessFeedback('Citizen feedback submission deleted from historical records.');
        setConfirmDialog(null);
      }
    });
  };

  const showSuccessFeedback = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => {
      setSuccessMessage('');
    }, 5000);
  };

  // Auto set image presets on category switches
  const handleProjectCategoryChange = (cat: ProjectCategory) => {
    let presetUrl = IMAGE_PRESETS.education[0].url;
    if (cat === 'agriculture') presetUrl = IMAGE_PRESETS.agriculture[0].url;
    else if (cat === 'healthcare') presetUrl = IMAGE_PRESETS.healthcare[0].url;
    else if (cat === 'sanitation') presetUrl = IMAGE_PRESETS.sanitation[0].url;
    else if (cat === 'infrastructure') presetUrl = IMAGE_PRESETS.infrastructure[0].url;
    else if (cat === 'economic') presetUrl = IMAGE_PRESETS.cultural[0].url;

    setProjectForm(prev => ({
      ...prev,
      category: cat,
      image: presetUrl
    }));
  };

  const handleEventCategoryChange = (cat: 'festival' | 'durbar' | 'development' | 'cultural' | 'health') => {
    let presetUrl = IMAGE_PRESETS.cultural[0].url;
    if (cat === 'health') presetUrl = IMAGE_PRESETS.healthcare[0].url;
    else if (cat === 'development') presetUrl = IMAGE_PRESETS.education[0].url;
    else if (cat === 'durbar') presetUrl = IMAGE_PRESETS.cultural[1].url;

    setEventForm(prev => ({
      ...prev,
      category: cat,
      imageUrl: presetUrl
    }));
  };

  // Calculate high quality analytical values
  const totalBudget = Array.isArray(projects) ? projects.reduce((acc, p) => {
    if (!p || typeof p.budget !== 'string') return acc;
    const val = parseInt(p.budget.replace(/[^0-9]/g, ''));
    return acc + (isNaN(val) ? 0 : val);
  }, 0) : 0;

  const completedProjects = Array.isArray(projects) ? projects.filter(p => p && p.status === 'completed').length : 0;
  const unreadFeedback = Array.isArray(feedback) ? feedback.filter(f => f && !f.isRead).length : 0;

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-neutral-950 flex items-center justify-center p-4">
        {/* Background Gradients */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#990000]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-full max-w-md bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl"
        >
          {/* Close Area */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-[#D4AF37]/10 border-2 border-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
              <Lock className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tight">
              Administrative Desk
            </h2>
            <p className="text-xs text-[#D4AF37] font-sans font-black uppercase tracking-wider mt-1">
              NKOSUO DIVISION NEW JUABEN TRADITIONAL AREA
            </p>
            <p className="text-xs text-neutral-400 mt-2 max-w-xs mx-auto leading-relaxed">
              This terminal provides authorized chiefs and administrators with publishing and uploading access to developmental portfolios.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label htmlFor="admin-passcode" className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-widest mb-1.5">
                Admin Authentication Password
              </label>
              <div className="relative">
                <input
                  id="admin-passcode"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter administration passcode"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-10 pr-10 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
                <Shield className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-500" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-neutral-500 hover:text-white transition-colors cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="p-3 bg-[#990000]/10 border border-[#990000]/30 rounded-lg text-xs text-red-400 flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-500" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-[#990000] hover:bg-red-800 text-white text-xs font-sans font-black tracking-widest uppercase rounded shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              Unlock Administration desk
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={onClose}
              className="text-[10px] font-sans font-black text-[#D4AF37] uppercase tracking-widest hover:underline flex items-center justify-center mx-auto"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Return to Public Portal
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950 overflow-y-auto flex flex-col font-sans text-neutral-100">
      
      {/* Dynamic Success Alert toast */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-lg px-4"
          >
            <div className="bg-emerald-950 border border-emerald-500/40 text-emerald-300 px-4 py-3.5 rounded-lg shadow-2xl flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-xs font-black uppercase tracking-wider block">Administrative Registry Updated</strong>
                <p className="text-xs text-neutral-300 mt-0.5">{successMessage}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>



      {/* Custom Administrative Confirmation overlay */}
      <AnimatePresence>
        {confirmDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-neutral-950 border border-neutral-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative"
            >
              <div className="flex items-center space-x-3 border-b border-neutral-800 pb-3 mb-4">
                <div className="w-8 h-8 rounded bg-[#990000]/20 border border-[#990000]/50 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <h3 className="text-xs font-sans font-black text-white uppercase tracking-widest">
                  {confirmDialog.title}
                </h3>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed mb-6 font-sans">
                {confirmDialog.message}
              </p>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setConfirmDialog(null)}
                  className="px-4 py-2.5 text-[10px] font-sans font-black uppercase tracking-wider text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-lg transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDialog.onConfirm}
                  className="px-4 py-2.5 text-[10px] font-sans font-black uppercase tracking-wider text-[#D4AF37] hover:text-white bg-[#990000] hover:bg-red-800 border border-[#D4AF37]/30 hover:border-[#D4AF37] rounded-lg transition-all cursor-pointer shadow-lg"
                >
                  Confirm Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Banner Administration Navigation */}
      <header className="bg-black border-b border-neutral-900 sticky top-0 z-40 px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/40 flex items-center justify-center">
            <Award className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <div>
            <span className="text-[10px] font-sans font-black text-[#D4AF37] uppercase tracking-[0.2em] block">
              Administrative Control Panel
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-[9px] font-mono bg-emerald-500/15 border border-emerald-500/35 text-emerald-400 px-2 py-0.5 rounded hidden sm:inline-flex items-center">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping mr-1.5"></span>
            Admin Portal Authenticated
          </span>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white text-xs font-bold tracking-wider uppercase rounded transition-colors cursor-pointer flex items-center space-x-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Exit Desk</span>
          </button>
        </div>
      </header>

      {/* Main Admin Workspace Container */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sidebar Nav: 3 Columns */}
        <aside className="lg:col-span-3 space-y-4">
          <div className="bg-[#111111] border border-neutral-800 rounded-xl p-4.5 space-y-1">
            <h3 className="text-[10px] font-sans font-black text-neutral-500 uppercase tracking-widest mb-3 px-2">
              Workspace Console
            </h3>
            
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full text-left px-3.5 py-3 rounded-lg text-xs font-sans font-black uppercase tracking-wider flex items-center justify-between transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-gradient-to-r from-[#990000] to-red-900 text-white shadow-md'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <span className="flex items-center">
                <BarChart3 className="w-4 h-4 mr-2.5" /> Analytics Overview
              </span>
              <ChevronDown className="w-3.5 h-3.5 rotate-270" />
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full text-left px-3.5 py-3 rounded-lg text-xs font-sans font-black uppercase tracking-wider flex items-center justify-between transition-all cursor-pointer ${
                activeTab === 'projects'
                  ? 'bg-gradient-to-r from-[#990000] to-red-900 text-white shadow-md'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <span className="flex items-center">
                <Briefcase className="w-4 h-4 mr-2.5" /> Publish Projects
              </span>
              <span className="font-mono bg-black/40 text-[9px] px-1.5 py-0.5 rounded border border-neutral-800">{projects.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('events')}
              className={`w-full text-left px-3.5 py-3 rounded-lg text-xs font-sans font-black uppercase tracking-wider flex items-center justify-between transition-all cursor-pointer ${
                activeTab === 'events'
                  ? 'bg-gradient-to-r from-[#990000] to-red-900 text-white shadow-md'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-2.5" /> Publish Events
              </span>
              <span className="font-mono bg-black/40 text-[9px] px-1.5 py-0.5 rounded border border-neutral-800">{events.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`w-full text-left px-3.5 py-3 rounded-lg text-xs font-sans font-black uppercase tracking-wider flex items-center justify-between transition-all cursor-pointer ${
                activeTab === 'gallery'
                  ? 'bg-gradient-to-r from-[#990000] to-red-900 text-white shadow-md'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <span className="flex items-center">
                <ImageIcon className="w-4 h-4 mr-2.5" /> Historical Gallery
              </span>
              <span className="font-mono bg-black/40 text-[9px] px-1.5 py-0.5 rounded border border-neutral-800">{galleryItems.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('feedback')}
              className={`w-full text-left px-3.5 py-3 rounded-lg text-xs font-sans font-black uppercase tracking-wider flex items-center justify-between transition-all cursor-pointer ${
                activeTab === 'feedback'
                  ? 'bg-gradient-to-r from-[#990000] to-red-900 text-white shadow-md'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <span className="flex items-center">
                <MessageSquare className="w-4 h-4 mr-2.5" /> Citizen Feedbacks
              </span>
              {unreadFeedback > 0 ? (
                <span className="font-mono bg-red-600 text-[9px] px-1.5 py-0.5 rounded text-white animate-pulse">
                  {unreadFeedback}
                </span>
              ) : (
                <span className="font-mono bg-black/40 text-[9px] px-1.5 py-0.5 rounded border border-neutral-800">
                  {feedback.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('hero-bg')}
              className={`w-full text-left px-3.5 py-3 rounded-lg text-xs font-sans font-black uppercase tracking-wider flex items-center justify-between transition-all cursor-pointer ${
                activeTab === 'hero-bg'
                  ? 'bg-gradient-to-r from-[#990000] to-red-900 text-white shadow-md'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <span className="flex items-center">
                <ImageIcon className="w-4 h-4 mr-2.5 text-[#D4AF37]" /> Homepage & Logo
              </span>
              <ChevronDown className="w-3.5 h-3.5 rotate-270" />
            </button>



            <button
              onClick={() => setActiveTab('traditional-leaders')}
              className={`w-full text-left px-3.5 py-3 rounded-lg text-xs font-sans font-black uppercase tracking-wider flex items-center justify-between transition-all cursor-pointer ${
                activeTab === 'traditional-leaders'
                  ? 'bg-gradient-to-r from-[#990000] to-red-900 text-white shadow-md'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <span className="flex items-center">
                <Crown className="w-4 h-4 mr-2.5 text-[#D4AF37]" /> Traditional Leaders
              </span>
              <ChevronDown className="w-3.5 h-3.5 rotate-270" />
            </button>

            <button
              onClick={() => setActiveTab('advisory')}
              className={`w-full text-left px-3.5 py-3 rounded-lg text-xs font-sans font-black uppercase tracking-wider flex items-center justify-between transition-all cursor-pointer ${
                activeTab === 'advisory'
                  ? 'bg-gradient-to-r from-[#990000] to-red-900 text-white shadow-md'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <span className="flex items-center">
                <Users className="w-4 h-4 mr-2.5 text-[#D4AF37]" /> Advisory Board
              </span>
              <span className="font-mono bg-black/40 text-[9px] px-1.5 py-0.5 rounded border border-neutral-800">{advisoryMembers.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('communities')}
              className={`w-full text-left px-3.5 py-3 rounded-lg text-xs font-sans font-black uppercase tracking-wider flex items-center justify-between transition-all cursor-pointer ${
                activeTab === 'communities'
                  ? 'bg-gradient-to-r from-[#990000] to-red-900 text-white shadow-md'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <span className="flex items-center">
                <Landmark className="w-4 h-4 mr-2.5 text-[#D4AF37]" /> Edit Communities
              </span>
              <span className="font-mono bg-black/40 text-[9px] px-1.5 py-0.5 rounded border border-neutral-800">{communities.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('contacts')}
              className={`w-full text-left px-3.5 py-3 rounded-lg text-xs font-sans font-black uppercase tracking-wider flex items-center justify-between transition-all cursor-pointer ${
                activeTab === 'contacts'
                  ? 'bg-gradient-to-r from-[#990000] to-red-900 text-white shadow-md'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <span className="flex items-center">
                <Phone className="w-4 h-4 mr-2.5 text-[#D4AF37]" /> Secretariat Contacts
              </span>
              <ChevronDown className="w-3.5 h-3.5 rotate-270" />
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`w-full text-left px-3.5 py-3 rounded-lg text-xs font-sans font-black uppercase tracking-wider flex items-center justify-between transition-all cursor-pointer ${
                activeTab === 'security'
                  ? 'bg-gradient-to-r from-[#990000] to-red-900 text-white shadow-md'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <span className="flex items-center">
                <Lock className="w-4 h-4 mr-2.5 text-[#D4AF37]" /> Security & Password
              </span>
              <ChevronDown className="w-3.5 h-3.5 rotate-270" />
            </button>
          </div>

          {/* Traditional Council Badge */}
          <div className="bg-gradient-to-b from-neutral-900 to-black border border-neutral-800 rounded-xl p-5 text-center">
            <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest block mb-2">Publishing Mandate</span>
            <p className="text-[11px] text-neutral-400 leading-relaxed italic">
              &ldquo;True royal authority is rooted in development, clarity, and direct service to the stools and citizens of New Juaben.&rdquo;
            </p>
          </div>
        </aside>

        {/* Dashboard Panels Area: 9 Columns */}
        <main className="lg:col-span-9 bg-[#111111]/40 border border-neutral-800 rounded-xl p-5 sm:p-7 min-h-[550px]">
          
          {/* TAB 1: OVERVIEW & ANALYTICS */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tight">
                  Traditional Council Analytics Workspace
                </h2>
                <p className="text-xs text-neutral-400 mt-1 font-sans">
                  Current aggregated indices representing developmental investments, active infrastructure scopes, and civic communication logs.
                </p>
              </div>

              {/* Analytical Widgets Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 relative overflow-hidden">
                  <div className="absolute top-4 right-4 w-8 h-8 rounded bg-[#D4AF37]/10 flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <span className="text-[9px] font-sans font-black text-neutral-500 uppercase tracking-widest block mb-1">
                    Aggregate Portfolio Budget
                  </span>
                  <span className="text-xl sm:text-2xl font-mono font-black text-white block">
                    GH¢ {(totalBudget / 1000).toFixed(0)}K+
                  </span>
                  <span className="text-[10px] text-neutral-400 block mt-2">
                    Across {projects.length} developmental works
                  </span>
                </div>

                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 relative overflow-hidden">
                  <div className="absolute top-4 right-4 w-8 h-8 rounded bg-emerald-500/10 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                  </div>
                  <span className="text-[9px] font-sans font-black text-neutral-500 uppercase tracking-widest block mb-1">
                    Completed Works Rate
                  </span>
                  <span className="text-xl sm:text-2xl font-mono font-black text-white block">
                    {projects.length > 0 ? Math.round((completedProjects / projects.length) * 100) : 0}%
                  </span>
                  <span className="text-[10px] text-neutral-400 block mt-2">
                    {completedProjects} of {projects.length} projects completed
                  </span>
                </div>

                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 relative overflow-hidden">
                  <div className="absolute top-4 right-4 w-8 h-8 rounded bg-blue-500/10 flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="text-[9px] font-sans font-black text-neutral-500 uppercase tracking-widest block mb-1">
                    Traditional Events
                  </span>
                  <span className="text-xl sm:text-2xl font-mono font-black text-white block">
                    {events.length} Active
                  </span>
                  <span className="text-[10px] text-neutral-400 block mt-2">
                    Durbars, townhalls, and festivals
                  </span>
                </div>

                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 relative overflow-hidden">
                  <div className="absolute top-4 right-4 w-8 h-8 rounded bg-red-500/10 flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-red-400" />
                  </div>
                  <span className="text-[9px] font-sans font-black text-neutral-500 uppercase tracking-widest block mb-1">
                    Citizen Feed Desk
                  </span>
                  <span className="text-xl sm:text-2xl font-mono font-black text-white block">
                    {feedback.length} Logs
                  </span>
                  <span className="text-[10px] text-neutral-400 block mt-2 font-black uppercase text-red-400">
                    {unreadFeedback} new reports pending
                  </span>
                </div>

              </div>

              {/* Recent Activity lists */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-neutral-800">
                <div>
                  <h3 className="text-xs font-sans font-black text-neutral-300 uppercase tracking-wider mb-4 flex items-center">
                    <Briefcase className="w-4 h-4 text-[#D4AF37] mr-2" /> Recently Added Portfolios
                  </h3>
                  <div className="space-y-3">
                    {projects.slice(0, 3).map(p => (
                      <div key={p.id} className="bg-neutral-900/60 border border-neutral-800 rounded-lg p-3.5 flex items-center justify-between">
                        <div>
                          <strong className="text-xs font-sans text-neutral-200 block line-clamp-1">{p.title}</strong>
                          <span className="text-[10px] text-neutral-500 uppercase tracking-widest mt-0.5 block">{p.communityName} • {p.category}</span>
                        </div>
                        <span className={`text-[8px] font-sans font-black uppercase tracking-wider px-2 py-0.5 rounded ${
                          p.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                        }`}>
                          {p.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-sans font-black text-neutral-300 uppercase tracking-wider mb-4 flex items-center">
                    <MessageSquare className="w-4 h-4 text-red-400 mr-2" /> Citizens feedback Dispatch
                  </h3>
                  <div className="space-y-3">
                    {feedback.length === 0 ? (
                      <div className="text-center py-6 text-neutral-600 text-xs">No feedback submissions lodged yet.</div>
                    ) : (
                      feedback.slice(0, 3).map(f => (
                        <div key={f.id} className="bg-neutral-900/60 border border-neutral-800 rounded-lg p-3.5 space-y-1">
                          <div className="flex justify-between items-center">
                            <strong className="text-xs font-sans text-neutral-200 block">{f.name}</strong>
                            <span className="text-[8px] font-mono text-neutral-500">{f.createdAt.split(',')[0]}</span>
                          </div>
                          <p className="text-neutral-400 text-xs line-clamp-1 italic">&ldquo;{f.message}&rdquo;</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS FORM & LISTS */}
          {activeTab === 'projects' && (
            <div className="space-y-10">
              
              {/* Publication Form */}
              <div className="bg-neutral-900 border border-neutral-800 p-5 sm:p-7 rounded-xl space-y-6">
                <div>
                  <span className="text-[10px] font-sans font-black text-[#D4AF37] uppercase tracking-widest block mb-1">
                    Admin Publishing Form
                  </span>
                  <h3 className="text-lg font-display font-black text-white uppercase">
                    Publish New Nkosuo Project
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Fulfill the Nkosuo division mandate by writing and launching clean developmental project files for the public register.
                  </p>
                </div>

                <form onSubmit={handleCreateProject} className="space-y-5">
                  
                  {/* Title & Community */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="project-title" className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-1.5">
                        Project Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="project-title"
                        type="text"
                        required
                        value={projectForm.title}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="e.g. Asokore Clay Pottery Training Hub"
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label htmlFor="project-community" className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-1.5">
                        Target Divisional Seat <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="project-community"
                        value={projectForm.communityId}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, communityId: e.target.value }))}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-neutral-300 focus:outline-none focus:border-[#D4AF37]"
                      >
                        {COMMUNITIES_DATA.map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Category, Status, Progress */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="project-category" className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-1.5">
                        Developmental Sector
                      </label>
                      <select
                        id="project-category"
                        value={projectForm.category}
                        onChange={(e) => handleProjectCategoryChange(e.target.value as ProjectCategory)}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-neutral-300 focus:outline-none focus:border-[#D4AF37]"
                      >
                        <option value="education">Education</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="sanitation">Water & Sanitation</option>
                        <option value="infrastructure">Infrastructure</option>
                        <option value="agriculture">Agribusiness</option>
                        <option value="economic">Economic Empowerment</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="project-status" className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-1.5">
                        Status Level
                      </label>
                      <select
                        id="project-status"
                        value={projectForm.status}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, status: e.target.value as ProjectStatus, progress: e.target.value === 'completed' ? 100 : prev.progress }))}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-neutral-300 focus:outline-none focus:border-[#D4AF37]"
                      >
                        <option value="planned">Planned / Pipeline</option>
                        <option value="ongoing">Ongoing / Active</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="project-progress" className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-1.5">
                        Progress Rate ({projectForm.progress}%)
                      </label>
                      <input
                        id="project-progress"
                        type="range"
                        min="0"
                        max="100"
                        disabled={projectForm.status === 'completed'}
                        value={projectForm.status === 'completed' ? 100 : projectForm.progress}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, progress: Number(e.target.value) }))}
                        className="w-full accent-[#D4AF37] bg-neutral-950 rounded-lg h-8 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Budget, Funding, Beneficiaries */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="project-budget" className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-1.5">
                        Allocated Budget <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="project-budget"
                        type="text"
                        required
                        value={projectForm.budget}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, budget: e.target.value }))}
                        placeholder="e.g. GH¢ 280,000"
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label htmlFor="project-funding" className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-1.5">
                        Funding Source / Sponsor
                      </label>
                      <input
                        id="project-funding"
                        type="text"
                        value={projectForm.fundingSource}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, fundingSource: e.target.value }))}
                        placeholder="e.g. Royal Trust Fund"
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label htmlFor="project-beneficiaries" className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-1.5">
                        Target Beneficiaries
                      </label>
                      <input
                        id="project-beneficiaries"
                        type="text"
                        value={projectForm.beneficiaries}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, beneficiaries: e.target.value }))}
                        placeholder="e.g. 5,000+ local citizens"
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  {/* Description & Impact Summary */}
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="project-desc" className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-1.5">
                        Description Scope <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="project-desc"
                        rows={3}
                        required
                        value={projectForm.description}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Provide details on the scope of development work, engineering phases, or social services included."
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37]"
                      ></textarea>
                    </div>

                    <div>
                      <label htmlFor="project-impact" className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-1.5">
                        Planned Impact Summary
                      </label>
                      <input
                        id="project-impact"
                        type="text"
                        value={projectForm.impactSummary}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, impactSummary: e.target.value }))}
                        placeholder="e.g. Saved market women 4 miles of travel and ensured safe water quality indices."
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  {/* Image Select & Upload */}
                  <div>
                    {/* Device Upload Field */}
                    <div className="mt-3">
                      <label className="block text-[9px] font-mono text-neutral-500 uppercase tracking-wider mb-1.5">
                        Or Upload Picture from Device
                      </label>
                      <div
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          const files = e.dataTransfer.files;
                          if (files && files.length > 0) {
                            const file = files[0];
                            if (file.type.startsWith('image/')) {
                            setUploadProgress("Uploading project picture to Supabase storage...");
                            supabaseService.uploadFile(file, 'projects').then((url) => {
                              setUploadProgress(null);
                              if (url) {
                                  setProjectForm(prev => ({ ...prev, image: url }));
                                  setSuccessMessage("successfully updated");
                                  setTimeout(() => setSuccessMessage(''), 4000);
                                } else {
                                  setSuccessMessage("Failed to upload project picture to Supabase.");
                                  setTimeout(() => setSuccessMessage(''), 4000);
                                }
                              }).catch((err) => {
                                setUploadProgress(null);
                                console.error(err);
                              });
                            }
                          }
                        }}
                        onClick={() => {
                          const input = document.getElementById('project-device-img-input');
                          if (input) (input as HTMLInputElement).click();
                        }}
                        className="border border-dashed border-neutral-800 hover:border-[#D4AF37] hover:bg-neutral-950/30 rounded-lg p-3 text-center cursor-pointer transition-all flex items-center justify-center space-x-2"
                      >
                        <input
                          id="project-device-img-input"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const files = e.target.files;
                            if (files && files.length > 0) {
                              const file = files[0];
                              setUploadProgress("Uploading project picture to Supabase storage...");
                              supabaseService.uploadFile(file, 'projects').then((url) => {
                                setUploadProgress(null);
                                if (url) {
                                  setProjectForm(prev => ({ ...prev, image: url }));
                                  setSuccessMessage("successfully updated");
                                  setTimeout(() => setSuccessMessage(''), 4000);
                                } else {
                                  setSuccessMessage("Failed to upload project picture to Supabase.");
                                  setTimeout(() => setSuccessMessage(''), 4000);
                                }
                              }).catch((err) => {
                                setUploadProgress(null);
                                console.error(err);
                              });
                            }
                          }}
                        />
                        <Upload className="w-4 h-4 text-neutral-500" />
                        <span className="text-[10px] text-neutral-400 font-sans">
                          Drag & drop or click to upload picture
                        </span>
                      </div>
                      {projectForm.image && (
                        <div className="mt-2 flex items-center space-x-2 bg-neutral-950 p-2 rounded border border-neutral-800">
                          <img src={projectForm.image} alt="Uploaded preview" className="w-8 h-8 rounded object-cover border border-neutral-700" />
                          <span className="text-[9px] font-mono text-neutral-400 truncate flex-1">
                            {projectForm.image.startsWith('data:') ? 'Local file (base64)' : 'Synced with Supabase Storage'}
                          </span>
                          <button
                            type="button"
                            onClick={() => setProjectForm(prev => ({ ...prev, image: '' }))}
                            className="text-[9px] font-sans font-black uppercase text-[#990000] hover:text-red-500 px-2 py-1 rounded bg-neutral-900 border border-neutral-800 cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Raw URL custom field */}
                    <div className="mt-3">
                      <label htmlFor="project-custom-img" className="block text-[9px] font-mono text-neutral-500 uppercase tracking-wider mb-1">
                        Or Paste Custom Image URL
                      </label>
                      <input
                        id="project-custom-img"
                        type="text"
                        value={projectForm.image}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, image: e.target.value }))}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-[10px] font-mono text-neutral-300 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Video Attachment (YouTube) */}
                  <div className="border-t border-neutral-800/80 pt-5 mt-5 space-y-4">
                    <div>
                      <h4 className="text-xs font-sans font-black text-[#D4AF37] uppercase tracking-wider mb-1">
                        Video Presentation (Optional)
                      </h4>
                      <p className="text-[11px] text-neutral-400">
                        Add a project video showcase by pasting a YouTube URL.
                      </p>
                    </div>

                    <div>
                      <label htmlFor="project-video-url" className="block text-[9px] font-mono text-neutral-500 uppercase tracking-wider mb-1.5">
                        YouTube Video URL
                      </label>
                      <input
                        id="project-video-url"
                        type="text"
                        value={projectForm.videoUrl || ''}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, videoUrl: e.target.value, videoType: 'youtube' }))}
                        placeholder="e.g. https://www.youtube.com/watch?v=..."
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    {/* Video Attachment Preview / Remove control */}
                    {projectForm.videoUrl && (
                      <div className="space-y-3">
                        <div className="w-full h-44 bg-neutral-950 border border-neutral-800 rounded-lg overflow-hidden relative">
                          <VideoPlayer
                            videoUrl={projectForm.videoUrl}
                            videoType="youtube"
                            thumbnailUrl={projectForm.image}
                            title={projectForm.title || 'Project Video Preview'}
                          />
                        </div>
                        <div className="flex items-center justify-between bg-neutral-950 p-2.5 rounded border border-neutral-800">
                          <div className="flex items-center space-x-3 truncate">
                            <Film className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                            <span className="text-[10px] font-mono text-neutral-400 truncate">
                              {projectForm.videoUrl}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setProjectForm(prev => ({ ...prev, videoUrl: '' }))}
                            className="text-[9px] font-sans font-black uppercase text-[#990000] hover:text-red-500 px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 cursor-pointer"
                          >
                            Remove Video
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#990000] hover:bg-red-800 text-white text-xs font-sans font-black tracking-widest uppercase rounded shadow-lg transition-colors cursor-pointer"
                  >
                    {editingProjectId ? 'Update developmental project' : 'Publish project to public registry'}
                  </button>
                </form>
              </div>

              {/* Published items manager */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-neutral-900/50 p-4 rounded-xl border border-neutral-800">
                  <div>
                    <h3 className="text-sm font-sans font-black text-neutral-200 uppercase tracking-wider">
                      Manage Published Projects ({projects.length})
                    </h3>
                    <p className="text-[10px] text-neutral-400 mt-0.5">
                      View, edit, or clear active developmental projects published on the portal registry.
                    </p>
                  </div>
                  {projects.length > 0 && (
                    <button
                      type="button"
                      onClick={() => handleClearAll('projects')}
                      className="px-4 py-2 bg-red-950/45 hover:bg-[#990000] text-[#ff6b6b] hover:text-white text-[10px] font-sans font-black uppercase tracking-wider border border-red-800/40 hover:border-red-600 rounded transition-all cursor-pointer shadow-md"
                    >
                      Clear All Projects
                    </button>
                  )}
                </div>
                
                <div className="border border-neutral-800 rounded-xl overflow-hidden bg-neutral-900/40">
                  <table className="w-full text-left text-xs font-sans border-collapse">
                    <thead>
                      <tr className="bg-black/40 border-b border-neutral-800 text-neutral-400 font-bold uppercase tracking-widest text-[9px]">
                        <th className="p-4">Project Info</th>
                        <th className="p-4 hidden md:table-cell">Divisional Seat</th>
                        <th className="p-4 hidden sm:table-cell">Budget</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800/60">
                      {projects.map((p) => (
                        <tr key={p.id} className="hover:bg-neutral-900/40 transition-colors">
                          <td className="p-4 max-w-xs">
                            <strong className="text-white block truncate">{p.title}</strong>
                            <span className="text-[10px] text-neutral-400 uppercase tracking-wider mt-0.5 block">{p.category}</span>
                          </td>
                          <td className="p-4 hidden md:table-cell text-neutral-300">
                            {p.communityName}
                          </td>
                          <td className="p-4 hidden sm:table-cell font-mono text-neutral-200">
                            {p.budget}
                          </td>
                          <td className="p-4">
                            <span className={`text-[8px] font-sans font-black uppercase tracking-wider px-2 py-0.5 rounded ${
                              p.status === 'completed' 
                                ? 'bg-emerald-500/10 text-emerald-400' 
                                : p.status === 'ongoing'
                                ? 'bg-amber-500/10 text-amber-400'
                                : 'bg-sky-500/10 text-sky-400'
                            }`}>
                              {p.status}
                            </span>
                          </td>
                          <td className="p-4 text-right flex items-center justify-end space-x-1.5">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingProjectId(p.id);
                                setProjectForm({
                                  title: p.title,
                                  description: p.description,
                                  communityId: p.communityId,
                                  category: p.category,
                                  status: p.status,
                                  progress: p.progress,
                                  budget: p.budget,
                                  startDate: p.startDate || '',
                                  fundingSource: p.fundingSource || '',
                                  beneficiaries: p.beneficiaries || '',
                                  impactSummary: p.impactSummary || '',
                                  image: p.image || '',
                                  videoUrl: p.videoUrl || '',
                                  videoType: p.videoType || 'youtube'
                                });
                                // Scroll smoothly to the form
                                document.getElementById('admin-dashboard-tabs')?.scrollIntoView({ behavior: 'smooth' });
                              }}
                              className="p-1.5 rounded bg-black/60 hover:bg-amber-950/40 text-neutral-400 hover:text-[#D4AF37] border border-neutral-800 hover:border-[#D4AF37]/30 cursor-pointer transition-colors"
                              title="Edit Portfolio"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteItem('project', p.id)}
                              className="p-1.5 rounded bg-black/60 hover:bg-red-950 text-neutral-400 hover:text-red-500 border border-neutral-800 hover:border-red-900 cursor-pointer transition-colors"
                              title="Delete Portfolio"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: EVENTS FORM & LISTS */}
          {activeTab === 'events' && (
            <div className="space-y-10">
              
              {/* Event Creation form */}
              <div className="bg-neutral-900 border border-neutral-800 p-5 sm:p-7 rounded-xl space-y-6">
                <div>
                  <span className="text-[10px] font-sans font-black text-[#D4AF37] uppercase tracking-widest block mb-1">
                    Traditional Calendars Registry
                  </span>
                  <h3 className="text-lg font-display font-black text-white uppercase">
                    Publish Traditional Event / Durbar
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Announce upcoming Akwantukese durbars, agricultural forums, clean water townhalls, or royal assemblies.
                  </p>
                </div>

                <form onSubmit={handleCreateEvent} className="space-y-5">
                  
                  {/* Title & Community */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="event-title" className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-1.5">
                        Event Assembly Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="event-title"
                        type="text"
                        required
                        value={eventForm.title}
                        onChange={(e) => setEventForm(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="e.g. Effiduase Akwantukese Royal Assembly"
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label htmlFor="event-community" className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-1.5">
                        Hosting Division / Community <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="event-community"
                        value={eventForm.communityId}
                        onChange={(e) => setEventForm(prev => ({ ...prev, communityId: e.target.value }))}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-neutral-300 focus:outline-none focus:border-[#D4AF37]"
                      >
                        {COMMUNITIES_DATA.map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Date, Time, Venue */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="event-date" className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-1.5">
                        Assembly Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="event-date"
                        type="date"
                        required
                        value={eventForm.date}
                        onChange={(e) => setEventForm(prev => ({ ...prev, date: e.target.value }))}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-neutral-300 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label htmlFor="event-time" className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-1.5">
                        Convening Time
                      </label>
                      <input
                        id="event-time"
                        type="text"
                        value={eventForm.time}
                        onChange={(e) => setEventForm(prev => ({ ...prev, time: e.target.value }))}
                        placeholder="e.g. 10:00 AM"
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label htmlFor="event-location" className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-1.5">
                        Event Location / Venue <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="event-location"
                        type="text"
                        required
                        value={eventForm.location}
                        onChange={(e) => setEventForm(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="e.g. Traditional Palace Durbar Grounds"
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  {/* Category & Scope */}
                  <div>
                    <label htmlFor="event-category" className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-1.5">
                      Assembly Type
                    </label>
                    <select
                      id="event-category"
                      value={eventForm.category}
                      onChange={(e) => handleEventCategoryChange(e.target.value as any)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-neutral-300 focus:outline-none"
                    >
                      <option value="festival">Festival Celebration</option>
                      <option value="durbar">Royal Council Durbar</option>
                      <option value="development">Nkosuo Developmental townhall</option>
                      <option value="cultural">Heritage & Arts Workshop</option>
                      <option value="health">Public Health Screening</option>
                    </select>
                  </div>

                  {/* Description */}
                  <div>
                    <label htmlFor="event-desc" className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-1.5">
                      Announcement / Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="event-desc"
                      rows={3}
                      required
                      value={eventForm.description}
                      onChange={(e) => setEventForm(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Write the comprehensive details of the durbar, speakers, expectations, and invitation limits."
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none"
                    ></textarea>
                  </div>

                  {/* Event Presets banner */}
                  <div>
                    {/* Device Upload Field */}
                    <div className="mt-3">
                      <label className="block text-[9px] font-mono text-neutral-500 uppercase tracking-wider mb-1.5">
                        Or Upload Banner from Device
                      </label>
                      <div
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          const files = e.dataTransfer.files;
                          if (files && files.length > 0) {
                            const file = files[0];
                            if (file.type.startsWith('image/')) {
                              setUploadProgress("Uploading event banner to Supabase storage...");
                              supabaseService.uploadFile(file, 'events').then((url) => {
                                setUploadProgress(null);
                                if (url) {
                                  setEventForm(prev => ({ ...prev, imageUrl: url }));
                                  setSuccessMessage("successfully updated");
                                  setTimeout(() => setSuccessMessage(''), 4000);
                                } else {
                                  setSuccessMessage("Failed to upload event banner to Supabase.");
                                  setTimeout(() => setSuccessMessage(''), 4000);
                                }
                              }).catch((err) => {
                                setUploadProgress(null);
                                console.error(err);
                              });
                            }
                          }
                        }}
                        onClick={() => {
                          const input = document.getElementById('event-device-img-input');
                          if (input) (input as HTMLInputElement).click();
                        }}
                        className="border border-dashed border-neutral-800 hover:border-[#D4AF37] hover:bg-neutral-950/30 rounded-lg p-3 text-center cursor-pointer transition-all flex items-center justify-center space-x-2"
                      >
                        <input
                          id="event-device-img-input"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const files = e.target.files;
                            if (files && files.length > 0) {
                              const file = files[0];
                              setUploadProgress("Uploading event banner to Supabase storage...");
                              supabaseService.uploadFile(file, 'events').then((url) => {
                                setUploadProgress(null);
                                if (url) {
                                  setEventForm(prev => ({ ...prev, imageUrl: url }));
                                  setSuccessMessage("successfully updated");
                                  setTimeout(() => setSuccessMessage(''), 4000);
                                } else {
                                  setSuccessMessage("Failed to upload event banner to Supabase.");
                                  setTimeout(() => setSuccessMessage(''), 4000);
                                }
                              }).catch((err) => {
                                setUploadProgress(null);
                                console.error(err);
                              });
                            }
                          }}
                        />
                        <Upload className="w-4 h-4 text-neutral-500" />
                        <span className="text-[10px] text-neutral-400 font-sans">
                          Drag & drop or click to upload banner
                        </span>
                      </div>
                      {eventForm.imageUrl && (
                        <div className="mt-2 flex items-center space-x-2 bg-neutral-950 p-2 rounded border border-neutral-800">
                          <img src={eventForm.imageUrl} alt="Uploaded preview" className="w-8 h-8 rounded object-cover border border-neutral-700" />
                          <span className="text-[9px] font-mono text-neutral-400 truncate flex-1">
                            {eventForm.imageUrl.startsWith('data:') ? 'Local file (base64)' : 'Synced with Supabase Storage'}
                          </span>
                          <button
                            type="button"
                            onClick={() => setEventForm(prev => ({ ...prev, imageUrl: '' }))}
                            className="text-[9px] font-sans font-black uppercase text-[#990000] hover:text-red-500 px-2 py-1 rounded bg-neutral-900 border border-neutral-800 cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Raw URL custom field */}
                    <div className="mt-3">
                      <label htmlFor="event-custom-img" className="block text-[9px] font-mono text-neutral-500 uppercase tracking-wider mb-1">
                        Or Paste Custom Image URL
                      </label>
                      <input
                        id="event-custom-img"
                        type="text"
                        value={eventForm.imageUrl}
                        onChange={(e) => setEventForm(prev => ({ ...prev, imageUrl: e.target.value }))}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-[10px] font-mono text-neutral-300 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Event Video Attachment (YouTube) */}
                  <div className="border-t border-neutral-800/80 pt-5 mt-5 space-y-4">
                    <div>
                      <h4 className="text-xs font-sans font-black text-[#D4AF37] uppercase tracking-wider mb-1">
                        Video Presentation (Optional)
                      </h4>
                      <p className="text-[11px] text-neutral-400">
                        Add an event video showcase by pasting a YouTube URL.
                      </p>
                    </div>

                    <div>
                      <label htmlFor="event-video-url" className="block text-[9px] font-mono text-neutral-500 uppercase tracking-wider mb-1.5">
                        YouTube Video URL
                      </label>
                      <input
                        id="event-video-url"
                        type="text"
                        value={eventForm.videoUrl || ''}
                        onChange={(e) => setEventForm(prev => ({ ...prev, videoUrl: e.target.value, videoType: 'youtube' }))}
                        placeholder="e.g. https://www.youtube.com/watch?v=..."
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    {/* Video Attachment Preview / Remove control */}
                    {eventForm.videoUrl && (
                      <div className="space-y-3">
                        <div className="w-full h-44 bg-neutral-950 border border-neutral-800 rounded-lg overflow-hidden relative">
                          <VideoPlayer
                            videoUrl={eventForm.videoUrl}
                            videoType="youtube"
                            thumbnailUrl={eventForm.imageUrl}
                            title={eventForm.title || 'Event Video Preview'}
                          />
                        </div>
                        <div className="flex items-center justify-between bg-neutral-950 p-2.5 rounded border border-neutral-800">
                          <div className="flex items-center space-x-3 truncate">
                            <Film className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                            <span className="text-[10px] font-mono text-neutral-400 truncate">
                              {eventForm.videoUrl}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setEventForm(prev => ({ ...prev, videoUrl: '' }))}
                            className="text-[9px] font-sans font-black uppercase text-[#990000] hover:text-red-500 px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 cursor-pointer"
                          >
                            Remove Video
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#990000] hover:bg-red-800 text-white text-xs font-sans font-black tracking-widest uppercase rounded shadow-lg transition-colors cursor-pointer"
                  >
                    {editingEventId ? 'Update event' : 'Announce & publish event'}
                  </button>
                </form>
              </div>

              {/* Event Manager lists */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-neutral-900/50 p-4 rounded-xl border border-neutral-800">
                  <div>
                    <h3 className="text-sm font-sans font-black text-neutral-200 uppercase tracking-wider">
                      Manage Announced Events ({events.length})
                    </h3>
                    <p className="text-[10px] text-neutral-400 mt-0.5">
                      View, edit, or clear active royal announcements and developmental events.
                    </p>
                  </div>
                  {events.length > 0 && (
                    <button
                      type="button"
                      onClick={() => handleClearAll('events')}
                      className="px-4 py-2 bg-red-950/45 hover:bg-[#990000] text-[#ff6b6b] hover:text-white text-[10px] font-sans font-black uppercase tracking-wider border border-red-800/40 hover:border-red-600 rounded transition-all cursor-pointer shadow-md"
                    >
                      Clear All Events
                    </button>
                  )}
                </div>
                
                <div className="border border-neutral-800 rounded-xl overflow-hidden bg-neutral-900/40">
                  <table className="w-full text-left text-xs font-sans border-collapse">
                    <thead>
                      <tr className="bg-black/40 border-b border-neutral-800 text-neutral-400 font-bold uppercase tracking-widest text-[9px]">
                        <th className="p-4">Event Assembly</th>
                        <th className="p-4">Division</th>
                        <th className="p-4">Date</th>
                        <th className="p-4">Category</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800/60">
                      {events.map((e) => (
                        <tr key={e.id} className="hover:bg-neutral-900/40 transition-colors">
                          <td className="p-4 max-w-xs">
                            <strong className="text-white block truncate">{e.title}</strong>
                            <span className="text-[10px] text-neutral-500 truncate mt-0.5 block">{e.location}</span>
                          </td>
                          <td className="p-4 text-neutral-300">
                            {e.communityName}
                          </td>
                          <td className="p-4 text-neutral-300 font-mono">
                            {e.date}
                          </td>
                          <td className="p-4">
                            <span className="text-[8px] font-sans font-black uppercase tracking-wider px-2 py-0.5 rounded bg-[#990000]/15 text-[#D4AF37] border border-[#D4AF37]/25">
                              {e.category}
                            </span>
                          </td>
                          <td className="p-4 text-right flex items-center justify-end space-x-1.5">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingEventId(e.id);
                                setEventForm({
                                  title: e.title,
                                  description: e.description,
                                  date: e.date,
                                  time: e.time || '',
                                  location: e.location,
                                  communityId: e.communityId,
                                  category: e.category,
                                  imageUrl: e.imageUrl || '',
                                  videoUrl: e.videoUrl || '',
                                  videoType: e.videoType || 'youtube'
                                });
                                // Scroll smoothly to the form
                                document.getElementById('admin-dashboard-tabs')?.scrollIntoView({ behavior: 'smooth' });
                              }}
                              className="p-1.5 rounded bg-black/60 hover:bg-amber-950/40 text-neutral-400 hover:text-[#D4AF37] border border-neutral-800 hover:border-[#D4AF37]/30 cursor-pointer transition-colors"
                              title="Edit Event"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteItem('event', e.id)}
                              className="p-1.5 rounded bg-black/60 hover:bg-red-950 text-neutral-400 hover:text-red-500 border border-neutral-800 hover:border-red-900 cursor-pointer transition-colors"
                              title="Delete Event"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: GALLERY UPLOAD */}
          {activeTab === 'gallery' && (
            <div className="space-y-10">
              
              <div id="gallery-form-anchor" className="bg-neutral-900 border border-neutral-800 p-5 sm:p-7 rounded-xl space-y-6">
                <div>
                  <span className="text-[10px] font-sans font-black text-[#D4AF37] uppercase tracking-widest block mb-1">
                    Heritage Archives {editingGalleryId && '• Editing Mode'}
                  </span>
                  <h3 className="text-lg font-display font-black text-white uppercase">
                    {editingGalleryId ? 'Edit Cultural Snapshot or Artifact' : 'Upload Cultural Snapshot or Artifact'}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    {editingGalleryId ? 'Update the details of this historic cultural piece.' : 'Contribute beautiful historical pictures of linguistic staffs, traditional Kente weaving, pottery, or ongoing construction sites.'}
                  </p>
                </div>

                <form onSubmit={handleCreateGallery} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="gallery-title" className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-1.5">
                        Artifact / Snapshot Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="gallery-title"
                        type="text"
                        required
                        value={galleryForm.title}
                        onChange={(e) => setGalleryForm(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="e.g. Sacrosanct Effiduase Royal Stool Room"
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="gallery-category" className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-1.5">
                        Artifact Classification
                      </label>
                      <select
                        id="gallery-category"
                        value={galleryForm.category}
                        onChange={(e) => setGalleryForm(prev => ({ ...prev, category: e.target.value as any }))}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-neutral-300 focus:outline-none"
                      >
                        <option value="chiefs">Royal Stools & Chiefs</option>
                        <option value="culture">Akan Culture & Goldweights</option>
                        <option value="projects">Nkosuo Developmental Projects</option>
                        <option value="events">Festivals & Assemblies</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="gallery-desc" className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-1.5">
                      Exhibition Caption / Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="gallery-desc"
                      rows={3}
                      required
                      value={galleryForm.description}
                      onChange={(e) => setGalleryForm(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Write an educational caption explaining the cultural significance of this artifact."
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none"
                    ></textarea>
                  </div>

                  {/* Preset selections */}
                  <div>
                    {/* Device Upload Field */}
                    <div className="mt-3">
                      <label className="block text-[9px] font-mono text-neutral-500 uppercase tracking-wider mb-1.5">
                        Or Upload Snapshot from Device
                      </label>
                      <div
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          const files = e.dataTransfer.files;
                          if (files && files.length > 0) {
                            const file = files[0];
                            if (file.type.startsWith('image/')) {
                              setUploadProgress("Uploading snapshot to Supabase storage...");
                              supabaseService.uploadFile(file, 'gallery').then((url) => {
                                setUploadProgress(null);
                                if (url) {
                                  setGalleryForm(prev => ({ ...prev, imageUrl: url }));
                                  setSuccessMessage("successfully updated");
                                  setTimeout(() => setSuccessMessage(''), 4000);
                                } else {
                                  setSuccessMessage("Failed to upload snapshot to Supabase.");
                                  setTimeout(() => setSuccessMessage(''), 4000);
                                }
                              }).catch((err) => {
                                setUploadProgress(null);
                                console.error(err);
                              });
                            }
                          }
                        }}
                        onClick={() => {
                          const input = document.getElementById('gallery-device-img-input');
                          if (input) (input as HTMLInputElement).click();
                        }}
                        className="border border-dashed border-neutral-800 hover:border-[#D4AF37] hover:bg-neutral-950/30 rounded-lg p-3 text-center cursor-pointer transition-all flex items-center justify-center space-x-2"
                      >
                        <input
                          id="gallery-device-img-input"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const files = e.target.files;
                            if (files && files.length > 0) {
                              const file = files[0];
                              setUploadProgress("Uploading snapshot to Supabase storage...");
                              supabaseService.uploadFile(file, 'gallery').then((url) => {
                                setUploadProgress(null);
                                if (url) {
                                  setGalleryForm(prev => ({ ...prev, imageUrl: url }));
                                  setSuccessMessage("successfully updated");
                                  setTimeout(() => setSuccessMessage(''), 4000);
                                } else {
                                  setSuccessMessage("Failed to upload snapshot to Supabase.");
                                  setTimeout(() => setSuccessMessage(''), 4000);
                                }
                              }).catch((err) => {
                                setUploadProgress(null);
                                console.error(err);
                              });
                            }
                          }}
                        />
                        <Upload className="w-4 h-4 text-neutral-500" />
                        <span className="text-[10px] text-neutral-400 font-sans">
                          Drag & drop or click to upload snapshot
                        </span>
                      </div>
                      {galleryForm.imageUrl && (
                        <div className="mt-2 flex items-center space-x-2 bg-neutral-950 p-2 rounded border border-neutral-800">
                          <img src={galleryForm.imageUrl} alt="Uploaded preview" className="w-8 h-8 rounded object-cover border border-neutral-700" />
                          <span className="text-[9px] font-mono text-neutral-400 truncate flex-1">
                            {galleryForm.imageUrl.startsWith('data:') ? 'Local file (base64)' : 'Synced with Supabase Storage'}
                          </span>
                          <button
                            type="button"
                            onClick={() => setGalleryForm(prev => ({ ...prev, imageUrl: '' }))}
                            className="text-[9px] font-sans font-black uppercase text-[#990000] hover:text-red-500 px-2 py-1 rounded bg-neutral-900 border border-neutral-800 cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Raw URL custom field */}
                    <div className="mt-3">
                      <label htmlFor="gallery-custom-img" className="block text-[9px] font-mono text-neutral-500 uppercase tracking-wider mb-1">
                        Or Paste Custom Image URL
                      </label>
                      <input
                        id="gallery-custom-img"
                        type="text"
                        value={galleryForm.imageUrl}
                        onChange={(e) => setGalleryForm(prev => ({ ...prev, imageUrl: e.target.value }))}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-[10px] font-mono text-neutral-300 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-[#990000] hover:bg-red-800 text-white text-xs font-sans font-black tracking-widest uppercase rounded shadow-lg transition-colors cursor-pointer"
                    >
                      {editingGalleryId ? 'Save Changes' : 'Upload artifact to gallery'}
                    </button>
                    {editingGalleryId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingGalleryId(null);
                          setGalleryForm({
                            title: '',
                            description: '',
                            category: 'projects',
                            imageUrl: IMAGE_PRESETS.cultural[0].url
                          });
                        }}
                        className="px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs font-sans font-black tracking-widest uppercase rounded border border-neutral-700 transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Gallery lists */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-neutral-950 border border-neutral-800 p-4 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        if (selectedGalleryIds.length === galleryItems.length) {
                          setSelectedGalleryIds([]);
                        } else {
                          setSelectedGalleryIds(galleryItems.map(item => item.id));
                        }
                      }}
                      className="text-xs font-sans font-black uppercase tracking-wider text-neutral-400 hover:text-white flex items-center space-x-1.5 cursor-pointer"
                    >
                      {selectedGalleryIds.length === galleryItems.length && galleryItems.length > 0 ? (
                        <>
                          <CheckSquare className="w-4 h-4 text-[#D4AF37]" />
                          <span>Deselect All</span>
                        </>
                      ) : (
                        <>
                          <Square className="w-4 h-4" />
                          <span>Select All ({galleryItems.length})</span>
                        </>
                      )}
                    </button>
                    {selectedGalleryIds.length > 0 && (
                      <span className="text-[10px] font-sans font-black text-[#D4AF37] uppercase tracking-widest bg-amber-950/40 px-2 py-0.5 rounded border border-amber-900/30">
                        {selectedGalleryIds.length} Selected
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    {selectedGalleryIds.length > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          setConfirmDialog({
                            title: 'Clear Selected Pictures & Videos',
                            message: `Are you sure you want to permanently delete the ${selectedGalleryIds.length} selected pictures/videos? This action is irreversible.`,
                            onConfirm: () => {
                              const updated = galleryItems.filter(item => !selectedGalleryIds.includes(item.id));
                              setGalleryItems(updated);
                              triggerStorageUpdate('gallery', updated);
                              setSelectedGalleryIds([]);
                              showSuccessFeedback('Selected pictures and videos deleted successfully.');
                              setConfirmDialog(null);
                            }
                          });
                        }}
                        className="px-3.5 py-2 bg-[#990000] hover:bg-red-800 text-white text-xs font-sans font-black tracking-widest uppercase rounded flex items-center space-x-1.5 cursor-pointer shadow"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Clear Selected</span>
                      </button>
                    )}

                    <button
                      type="button"
                      disabled={galleryItems.length === 0}
                      onClick={() => {
                        setConfirmDialog({
                          title: 'Clear All Pictures & Videos',
                          message: 'Are you absolutely certain you want to clear/delete ALL pictures and videos from the Council archives? This action is irreversible and cannot be undone.',
                          onConfirm: () => {
                            setGalleryItems([]);
                            triggerStorageUpdate('gallery', []);
                            setSelectedGalleryIds([]);
                            showSuccessFeedback('All pictures and videos have been successfully cleared from the archives.');
                            setConfirmDialog(null);
                          }
                        });
                      }}
                      className="px-3.5 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs font-sans font-black tracking-widest uppercase rounded flex items-center space-x-1.5 cursor-pointer border border-neutral-700 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Clear Everything</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {galleryItems.map(item => (
                    <div key={item.id} className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden flex items-center space-x-4 p-3 relative group">
                      <button
                        type="button"
                        onClick={() => {
                          if (selectedGalleryIds.includes(item.id)) {
                            setSelectedGalleryIds(selectedGalleryIds.filter(id => id !== item.id));
                          } else {
                            setSelectedGalleryIds([...selectedGalleryIds, item.id]);
                          }
                        }}
                        className="flex-shrink-0 p-1 text-neutral-500 hover:text-[#D4AF37] transition-colors cursor-pointer"
                        title="Select picture or video"
                      >
                        {selectedGalleryIds.includes(item.id) ? (
                          <CheckSquare className="w-4 h-4 text-[#D4AF37]" />
                        ) : (
                          <Square className="w-4 h-4" />
                        )}
                      </button>

                      <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 border border-neutral-800 bg-neutral-950">
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <strong className="text-xs font-sans text-white block truncate">{item.title}</strong>
                        <span className="text-[10px] text-neutral-500 uppercase block tracking-wider mt-0.5">{item.category}</span>
                      </div>
                      <div className="flex items-center space-x-1 flex-shrink-0">
                        <button
                          onClick={() => handleEditGalleryItem(item)}
                          className="p-1.5 rounded bg-black/40 text-neutral-500 hover:text-[#D4AF37] hover:bg-amber-950/20 border border-transparent hover:border-amber-900/40 cursor-pointer"
                          title="Edit Artifact"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteItem('gallery', item.id)}
                          className="p-1.5 rounded bg-black/40 text-neutral-500 hover:text-red-400 hover:bg-red-950/20 border border-transparent hover:border-red-900/40 cursor-pointer"
                          title="Delete Artifact"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="h-[1px] bg-neutral-800 my-12" />

              {/* Adinkra Wisdom Section */}
              <div className="space-y-10">
                <div id="proverb-form-anchor" className="bg-neutral-900 border border-neutral-800 p-5 sm:p-7 rounded-xl space-y-6">
                  <div>
                    <span className="text-[10px] font-sans font-black text-[#D4AF37] uppercase tracking-widest block mb-1">
                      Adinkra Wisdom & developmental Philosophy {editingProverbIndex !== null && '• Editing Mode'}
                    </span>
                    <h3 className="text-lg font-display font-black text-white uppercase">
                      {editingProverbIndex !== null ? 'Edit Adinkra Symbol & Proverb' : 'Publish New Adinkra Wisdom'}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      {editingProverbIndex !== null ? 'Modify this proverb, translation, and its developmental significance.' : 'Contribute a traditional Akan symbol with its Twi proverb and its modern development meaning.'}
                    </p>
                  </div>

                  <form onSubmit={handleProverbSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="proverb-symbol" className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-1.5">
                          Adinkra Symbol Name (e.g. SANKOFA) <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="proverb-symbol"
                          type="text"
                          required
                          value={proverbForm.symbol}
                          onChange={(e) => setProverbForm(prev => ({ ...prev, symbol: e.target.value.toUpperCase() }))}
                          placeholder="e.g. GYE NYAME"
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none font-mono"
                        />
                      </div>

                      <div>
                        <label htmlFor="proverb-translation" className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-1.5">
                          Literal Translation <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="proverb-translation"
                          type="text"
                          required
                          value={proverbForm.translation}
                          onChange={(e) => setProverbForm(prev => ({ ...prev, translation: e.target.value }))}
                          placeholder="e.g. Except for God"
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="proverb-twi" className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-1.5">
                        Twi Proverb <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="proverb-twi"
                        type="text"
                        required
                        value={proverbForm.proverb}
                        onChange={(e) => setProverbForm(prev => ({ ...prev, proverb: e.target.value }))}
                        placeholder="e.g. Gye Nyame we..."
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="proverb-meaning" className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-1.5">
                        Developmental Philosophy / Meaning <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="proverb-meaning"
                        rows={3}
                        required
                        value={proverbForm.meaning}
                        onChange={(e) => setProverbForm(prev => ({ ...prev, meaning: e.target.value }))}
                        placeholder="Explain the modern developmental significance and moral value of this proverb for New Juaben."
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none"
                      ></textarea>
                    </div>

                    <div className="flex space-x-3">
                      <button
                        type="submit"
                        className="flex-1 py-3 bg-[#990000] hover:bg-red-800 text-white text-xs font-sans font-black tracking-widest uppercase rounded shadow-lg transition-colors cursor-pointer"
                      >
                        {editingProverbIndex !== null ? 'Save Proverb Changes' : 'Publish Adinkra Wisdom'}
                      </button>
                      {editingProverbIndex !== null && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingProverbIndex(null);
                            setProverbForm({
                              symbol: '',
                              translation: '',
                              proverb: '',
                              meaning: ''
                            });
                          }}
                          className="px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs font-sans font-black tracking-widest uppercase rounded border border-neutral-700 transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                {/* Proverbs list */}
                <div className="space-y-4">
                  <h4 className="text-xs font-sans font-black text-[#D4AF37] uppercase tracking-wider">
                    Published Adinkra Wisdom & Philosophies
                  </h4>
                  <div className="grid grid-cols-1 gap-4 font-sans">
                    {adinkraProverbs.map((item, idx) => (
                      <div key={idx} className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-sans font-black text-[#D4AF37] uppercase tracking-widest bg-black/45 px-2 py-0.5 rounded border border-neutral-800 font-mono">
                              {item.symbol}
                            </span>
                            <span className="text-[10px] text-neutral-400 italic">
                              &ldquo;{item.translation}&rdquo;
                            </span>
                          </div>
                          <p className="text-xs font-display font-black text-white uppercase pt-1 border-l border-red-800 pl-2 mt-1">
                            &ldquo;{item.proverb}&rdquo;
                          </p>
                          <p className="text-[11px] text-neutral-400 mt-1">
                            {item.meaning}
                          </p>
                        </div>
                        <div className="flex items-center space-x-1 self-end md:self-center flex-shrink-0">
                          <button
                            onClick={() => handleEditProverb(idx)}
                            className="p-1.5 rounded bg-black/40 text-neutral-500 hover:text-[#D4AF37] hover:bg-amber-950/20 border border-transparent hover:border-amber-900/40 cursor-pointer"
                            title="Edit Proverb"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProverb(idx)}
                            className="p-1.5 rounded bg-black/40 text-neutral-500 hover:text-red-400 hover:bg-red-950/20 border border-transparent hover:border-red-900/40 cursor-pointer"
                            title="Delete Proverb"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 5: FEEDBACK INBOX */}
          {activeTab === 'feedback' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tight">
                  Citizen Communication Dispatch
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Read, review, and manage developmental requests, appreciation letters, or project alerts filed by citizens across divisions.
                </p>
              </div>

              {feedback.length === 0 ? (
                <div className="text-center py-16 bg-neutral-900/40 border border-neutral-800 rounded-xl">
                  <MessageSquare className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
                  <h4 className="text-xs font-sans font-black text-neutral-400 uppercase tracking-widest">No feedbacks filed yet</h4>
                  <p className="text-neutral-500 text-xs mt-1">Direct communication ledger is currently vacant.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {feedback.map(item => (
                    <div 
                      key={item.id}
                      className={`border rounded-xl p-5 sm:p-6 transition-all relative ${
                        item.isRead 
                          ? 'bg-neutral-900/30 border-neutral-800 text-neutral-400' 
                          : 'bg-neutral-900/90 border-[#D4AF37]/30 text-neutral-200 shadow-[0_4px_15px_rgba(212,175,55,0.03)]'
                      }`}
                    >
                      {/* Flag for unread status */}
                      {!item.isRead && (
                        <div className="absolute top-0 left-6 transform -translate-y-1/2 bg-[#D4AF37] text-neutral-900 px-2 py-0.5 rounded text-[8px] font-sans font-black uppercase tracking-wider">
                          New Message
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                        <div>
                          <div className="flex items-center space-x-2 flex-wrap">
                            <strong className="text-sm font-sans text-white">{item.name}</strong>
                            <span className="text-neutral-600 text-xs font-bold">•</span>
                            <span className="text-[10px] font-mono text-neutral-400">{item.email}</span>
                            {item.phone && (
                              <>
                                <span className="text-neutral-600 text-xs font-bold">•</span>
                                <span className="text-[10px] font-mono text-neutral-400 flex items-center"><Phone className="w-3 h-3 mr-1 text-[#990000]" /> {item.phone}</span>
                              </>
                            )}
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-2 mt-2">
                            <span className="text-[9px] font-sans font-black bg-black/60 border border-neutral-800 text-[#D4AF37] px-2 py-0.5 rounded uppercase tracking-wider">
                              Division: {item.community}
                            </span>
                            <span className="text-[9px] font-sans font-black bg-[#990000]/15 text-white border border-[#990000]/25 px-2 py-0.5 rounded uppercase tracking-wider">
                              Type: {item.feedbackType.replace('_', ' ')}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 self-start sm:self-center">
                          <button
                            onClick={() => handleToggleReadFeedback(item.id)}
                            className={`px-2.5 py-1.5 text-[10px] font-sans font-black uppercase tracking-widest rounded border transition-colors cursor-pointer ${
                              item.isRead 
                                ? 'bg-black/40 border-neutral-800 text-neutral-400 hover:text-white' 
                                : 'bg-[#D4AF37]/10 border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/20'
                            }`}
                          >
                            {item.isRead ? 'Mark Unread' : 'Mark Read'}
                          </button>
                          
                          <button
                            onClick={() => handleDeleteFeedback(item.id)}
                            className="p-1.5 rounded bg-black/40 border border-neutral-800 text-neutral-500 hover:text-red-400 hover:border-red-900/30 cursor-pointer transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="p-4 bg-black/45 border border-neutral-900 rounded-lg text-neutral-300 text-xs font-sans leading-relaxed">
                        &ldquo;{item.message}&rdquo;
                      </div>

                      <div className="mt-3 text-[10px] font-mono text-neutral-500 text-right">
                        Lodged on: {item.createdAt}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 6: HOMEPAGE & LOGO CUSTOMIZATION */}
          {activeTab === 'hero-bg' && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tight">
                  Homepage & Logo Brand Customizer
                </h2>
                <p className="text-xs text-neutral-400 mt-1 font-sans">
                  Re-craft the visual branding, logo identity, landing headings, and analytical metrics of the New Juaben Council public portal in real-time.
                </p>
              </div>

              {/* 1. ROYAL LOGO & CREST IDENTITY */}
              <div className="bg-neutral-900 border border-neutral-800 p-5 sm:p-6 rounded-xl space-y-6">
                <h3 className="text-xs font-sans font-black text-[#D4AF37] uppercase tracking-widest border-b border-neutral-800 pb-2 flex items-center justify-between">
                  <span>Royal Logo & Crest Branding</span>
                  <span className="text-[9px] text-neutral-500 font-mono font-normal">PERSISTED IN PORTAL HEADER & FOOTER</span>
                </h3>

                <div className="max-w-xs">
                  {/* Logo Image Uploader */}
                  <div className="space-y-3">
                    <label className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider">
                      Logo Crest Image
                    </label>

                    {/* Image Box */}
                    <div className="relative aspect-[1376/768] w-full rounded-xl overflow-hidden border border-neutral-800 bg-white flex flex-col items-center justify-center text-center group p-2">
                      {logoDraft ? (
                        /* Draft Selected Preview */
                        <>
                          <img 
                            src={logoDraft} 
                            alt="Logo Draft" 
                            className="w-full h-full object-contain rounded-lg" 
                          />
                          <span className="absolute bottom-2 left-2 text-[9px] text-amber-600 font-sans font-black uppercase tracking-wider bg-white/95 px-2 py-0.5 rounded border border-amber-200 shadow-md">
                            Draft Loaded
                          </span>
                        </>
                      ) : logoImgUrl ? (
                        /* Active Custom Logo */
                        <>
                          <img 
                            src={logoImgUrl} 
                            alt="Active Custom Logo" 
                            className="w-full h-full object-contain rounded-lg" 
                          />
                          <span className="absolute bottom-2 left-2 text-[9px] text-emerald-700 font-sans font-bold uppercase bg-white/95 px-2 py-0.5 rounded border border-emerald-200 shadow-md">
                            Custom Logo Active
                          </span>
                        </>
                      ) : (
                        /* Default Shield Crest */
                        <div className="flex flex-col items-center justify-center p-4">
                          <div className="w-16 h-16 rounded-full bg-white border-2 border-[#990000] flex items-center justify-center shadow-lg">
                            <Shield className="w-8 h-8 text-[#990000]" />
                          </div>
                          <span className="text-[9px] text-neutral-600 font-sans font-medium uppercase mt-2 bg-neutral-100 px-2 py-0.5 rounded border border-neutral-300">
                            Default Traditional Shield
                          </span>
                        </div>
                      )}

                      {/* File Input overlay */}
                      {!logoDraft && (
                        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer p-2">
                          <span className="text-[10px] font-sans font-black text-white uppercase tracking-widest text-center">
                            Click to Upload Logo File
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const files = e.target.files;
                              if (files && files.length > 0) {
                                const file = files[0];
                                setUploadProgress("Uploading your custom logo to Supabase storage...");
                                supabaseService.uploadFile(file, 'logos').then((url) => {
                                  setUploadProgress(null);
                                  if (url) {
                                    setLogoDraft(url);
                                    setSuccessMessage("successfully updated");
                                    setTimeout(() => setSuccessMessage(''), 4000);
                                  } else {
                                    setSuccessMessage("Failed to upload logo to Supabase Storage. Please try again.");
                                    setTimeout(() => setSuccessMessage(''), 4000);
                                  }
                                }).catch((err) => {
                                  setUploadProgress(null);
                                  console.error(err);
                                });
                              }
                            }}
                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                          />
                        </div>
                      )}
                    </div>

                    {/* Logo Image Actions */}
                    <div className="flex flex-col gap-2 pt-1">
                      {logoDraft && (
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setLogoDraft(null);
                              setSuccessMessage("Logo upload canceled.");
                              setTimeout(() => setSuccessMessage(''), 3000);
                            }}
                            className="px-3 py-1.5 bg-neutral-950 border border-neutral-800 hover:bg-neutral-900 text-red-400 rounded text-[9px] font-black uppercase tracking-wider transition-colors cursor-pointer"
                          >
                            Cancel Upload
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setLogoImgUrl(logoDraft);
                              setLogoDraft(null);
                              setSuccessMessage("New custom logo image successfully applied and saved!");
                              setTimeout(() => setSuccessMessage(''), 4000);
                            }}
                            className="px-3 py-1.5 bg-emerald-950 border border-emerald-800/40 hover:bg-emerald-900 text-emerald-300 rounded text-[9px] font-black uppercase tracking-wider transition-colors cursor-pointer"
                          >
                            Apply Logo
                          </button>
                        </div>
                      )}

                      {logoImgUrl && !logoDraft && (
                        <button
                          type="button"
                          onClick={() => {
                            setLogoImgUrl('');
                            setSuccessMessage("Custom logo image deleted. Restored default traditional shield icon.");
                            setTimeout(() => setSuccessMessage(''), 4000);
                          }}
                          className="w-full px-3 py-1.5 bg-neutral-950 border border-neutral-800 hover:border-red-900/30 text-neutral-400 hover:text-red-400 rounded text-[9px] font-black uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center space-x-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete Logo Image</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. HERO SECTION HEADINGS & DESCRIPTION */}
              <div className="bg-neutral-900 border border-neutral-800 p-5 sm:p-6 rounded-xl space-y-6">
                <h3 className="text-xs font-sans font-black text-[#D4AF37] uppercase tracking-widest border-b border-neutral-800 pb-2">
                  Hero Section Text Customizer
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="hero-title-1" className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-1.5">
                      Main Heading Line 1 (Gold Accent)
                    </label>
                    <input
                      id="hero-title-1"
                      type="text"
                      value={formHeroTitle1}
                      onChange={(e) => setFormHeroTitle1(e.target.value)}
                      placeholder="e.g. New Juaben"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-700 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="hero-title-2" className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-1.5">
                      Main Heading Line 2 (White)
                    </label>
                    <input
                      id="hero-title-2"
                      type="text"
                      value={formHeroTitle2}
                      onChange={(e) => setFormHeroTitle2(e.target.value)}
                      placeholder="e.g. New Juaben Traditional Area"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-700 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="hero-badge" className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-1.5">
                    Sub-Badge Text (Crimson Accent Box)
                  </label>
                  <input
                    id="hero-badge"
                    type="text"
                    value={formHeroSubBadge}
                    onChange={(e) => setFormHeroSubBadge(e.target.value)}
                    placeholder="e.g. Modernization & Royal Heritage"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-700 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="hero-description" className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-1.5">
                    Main Description Paragraph
                  </label>
                  <textarea
                    id="hero-description"
                    rows={4}
                    value={formHeroDesc}
                    onChange={(e) => setFormHeroDesc(e.target.value)}
                    placeholder="Describe the overarching mission of the traditional developmental division..."
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-700 focus:outline-none focus:border-[#D4AF37] transition-colors leading-relaxed font-sans"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setHeroTitle1(formHeroTitle1);
                      setHeroTitle2(formHeroTitle2);
                      setHeroSubBadge(formHeroSubBadge);
                      setHeroDesc(formHeroDesc);
                      setSuccessMessage("Hero section headlines and brief details saved successfully!");
                      setTimeout(() => setSuccessMessage(''), 4000);
                    }}
                    className="px-5 py-2.5 bg-[#990000] hover:bg-red-800 text-white text-[10px] font-sans font-black uppercase tracking-wider rounded transition-all cursor-pointer shadow-lg"
                  >
                    Save Hero Texts
                  </button>
                </div>
              </div>

              {/* 3. HERO PERFORMANCE STATISTICS */}
              <div className="bg-neutral-900 border border-neutral-800 p-5 sm:p-6 rounded-xl space-y-6">
                <h3 className="text-xs font-sans font-black text-[#D4AF37] uppercase tracking-widest border-b border-neutral-800 pb-2">
                  Homepage Performance Statistics
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                  {formStats.map((stat, idx) => (
                    <div key={idx} className="bg-neutral-950 p-4 rounded-lg border border-neutral-800 space-y-3">
                      <span className="text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-wider block">
                        Analytical Indicator {idx + 1}
                      </span>
                      
                      <div>
                        <label className="block text-[8px] font-sans font-black text-neutral-400 uppercase tracking-widest mb-1">
                          Indicator Value
                        </label>
                        <input
                          type="text"
                          value={stat.value}
                          onChange={(e) => {
                            const updated = [...formStats];
                            updated[idx] = { ...updated[idx], value: e.target.value };
                            setFormStats(updated);
                          }}
                          placeholder="e.g. 15+"
                          className="w-full bg-neutral-900 border border-neutral-800 rounded px-2.5 py-1.5 text-xs text-[#D4AF37] font-mono font-bold focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[8px] font-sans font-black text-neutral-400 uppercase tracking-widest mb-1">
                          Indicator Label
                        </label>
                        <input
                          type="text"
                          value={stat.label}
                          onChange={(e) => {
                            const updated = [...formStats];
                            updated[idx] = { ...updated[idx], label: e.target.value };
                            setFormStats(updated);
                          }}
                          placeholder="e.g. Nkosuo Projects"
                          className="w-full bg-neutral-900 border border-neutral-800 rounded px-2.5 py-1.5 text-[10px] text-neutral-300 font-sans focus:outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setHeroStats(formStats);
                      setSuccessMessage("Homepage performance analytics metrics successfully published!");
                      setTimeout(() => setSuccessMessage(''), 4000);
                    }}
                    className="px-5 py-2.5 bg-[#990000] hover:bg-red-800 text-white text-[10px] font-sans font-black uppercase tracking-wider rounded transition-all cursor-pointer shadow-lg"
                  >
                    Save Hero Statistics
                  </button>
                </div>
              </div>

              {/* 4. HERO BACKGROUND TAPESTRY */}
              <div className="bg-neutral-900 border border-neutral-800 p-5 sm:p-6 rounded-xl space-y-6">
                <h3 className="text-xs font-sans font-black text-[#D4AF37] uppercase tracking-widest border-b border-neutral-800 pb-2">
                  Hero Background Tapestry
                </h3>

                {/* Active Preview */}
                <div className="space-y-3">
                  <span className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider">
                    Background Preview
                  </span>
                  
                  <div className="relative h-48 rounded-lg overflow-hidden border border-neutral-800 bg-neutral-950 flex items-center justify-center">
                    {heroBgDraft ? (
                      <img
                        src={heroBgDraft}
                        alt="Draft Background"
                        className="absolute inset-0 w-full h-full object-cover opacity-60"
                        style={{ objectPosition: heroBgPosition }}
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <img
                        src={heroBgUrl}
                        alt="Active Hero Background"
                        className="absolute inset-0 w-full h-full object-cover opacity-40"
                        style={{ objectPosition: heroBgPosition }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/src/assets/images/omanhene_hero_bg_1783513909221.jpg";
                        }}
                        referrerPolicy="no-referrer"
                      />
                    )}
                    <div className="relative z-10 text-center px-4">
                      {heroBgDraft ? (
                        <span className="text-[9px] font-mono bg-amber-400 text-neutral-950 font-black px-3 py-1.5 rounded border border-amber-500 shadow-xl inline-block max-w-full uppercase tracking-wider">
                          Draft Background Loaded (Pending Apply)
                        </span>
                      ) : (
                        <span className="text-[9px] font-mono bg-black/75 text-white/90 px-3 py-1.5 rounded border border-neutral-800 break-all inline-block max-w-full">
                          {heroBgUrl.startsWith('data:') ? 'Custom Local File (Base64 Data URL)' : heroBgUrl}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions for Hero Draft Background (Apply / Cancel) */}
                  {heroBgDraft && (
                    <div className="flex gap-2 justify-end pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setHeroBgDraft(null);
                          setSuccessMessage("Hero background upload discarded.");
                          setTimeout(() => setSuccessMessage(''), 3000);
                        }}
                        className="px-4 py-2 bg-neutral-950 border border-neutral-800 hover:bg-neutral-900 text-red-400 rounded text-[9px] font-black uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Cancel Upload
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setHeroBgUrl(heroBgDraft);
                          setHeroBgDraft(null);
                          localStorage.setItem('new_juaben_hero_bg_url', heroBgDraft);
                          setSuccessMessage("Hero background picture successfully applied and saved!");
                          setTimeout(() => setSuccessMessage(''), 4000);
                        }}
                        className="px-4 py-2 bg-emerald-950 border border-emerald-800 hover:bg-emerald-900 text-emerald-300 rounded text-[9px] font-black uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Apply & Save Background
                      </button>
                    </div>
                  )}
                </div>

                {/* File Uploader */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <span className="text-[10px] font-sans font-black text-neutral-400 uppercase tracking-widest block">
                      Upload Picture from Device
                    </span>

                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.currentTarget.classList.add('border-[#D4AF37]', 'bg-[#D4AF37]/5');
                      }}
                      onDragLeave={(e) => {
                        e.preventDefault();
                        e.currentTarget.classList.remove('border-[#D4AF37]', 'bg-[#D4AF37]/5');
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        e.currentTarget.classList.remove('border-[#D4AF37]', 'bg-[#D4AF37]/5');
                        const files = e.dataTransfer.files;
                        if (files && files.length > 0) {
                          const file = files[0];
                          if (file.type.startsWith('image/')) {
                            setUploadProgress("Uploading hero background to Supabase storage...");
                            supabaseService.uploadFile(file, 'hero').then((url) => {
                              setUploadProgress(null);
                              if (url) {
                                setHeroBgDraft(url);
                                setSuccessMessage("successfully updated");
                                setTimeout(() => setSuccessMessage(''), 4000);
                              } else {
                                setSuccessMessage("Failed to upload background image to Supabase Storage.");
                                setTimeout(() => setSuccessMessage(''), 4000);
                              }
                            }).catch((err) => {
                              setUploadProgress(null);
                              console.error(err);
                            });
                          }
                        }
                      }}
                      onClick={() => {
                        const input = document.getElementById('device-bg-input');
                        if (input) (input as HTMLInputElement).click();
                      }}
                      className="border-2 border-dashed border-neutral-800 hover:border-[#D4AF37] hover:bg-neutral-950/40 rounded-xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-3"
                    >
                      <input
                        id="device-bg-input"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const files = e.target.files;
                          if (files && files.length > 0) {
                            const file = files[0];
                            setUploadProgress("Uploading hero background to Supabase storage...");
                            supabaseService.uploadFile(file, 'hero').then((url) => {
                              setUploadProgress(null);
                              if (url) {
                                setHeroBgDraft(url);
                                setSuccessMessage("successfully updated");
                                setTimeout(() => setSuccessMessage(''), 4000);
                              } else {
                                setSuccessMessage("Failed to upload background image to Supabase Storage.");
                                setTimeout(() => setSuccessMessage(''), 4000);
                              }
                            }).catch((err) => {
                              setUploadProgress(null);
                              console.error(err);
                            });
                          }
                        }}
                      />
                      <ImageIcon className="w-8 h-8 text-neutral-500 group-hover:text-[#D4AF37]" />
                      <div>
                        <p className="text-xs font-black text-white uppercase tracking-wider">Drag & Drop Image Here</p>
                        <p className="text-[10px] text-neutral-400 mt-1 font-sans">Or click to select a file from your device</p>
                      </div>
                      <span className="text-[9px] text-neutral-500 uppercase tracking-widest font-mono">Supports PNG, JPG, JPEG, WEBP</span>
                    </div>
                  </div>

                  {/* Preset Backgrounds & Manual URL Option */}
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-sans font-black text-neutral-400 uppercase tracking-widest block">
                        Paste Direct Image URL
                      </span>
                      <div className="flex gap-2">
                        <input
                          type="url"
                          placeholder="e.g. https://images.unsplash.com/photo-..."
                          value={heroBgUrl.startsWith('data:') ? '' : heroBgUrl}
                          onChange={(e) => {
                            const url = e.target.value;
                            if (url) {
                              setHeroBgUrl(url);
                              localStorage.setItem('new_juaben_hero_bg_url', url);
                            }
                          }}
                          className="flex-grow text-xs bg-black/60 border border-neutral-800 focus:border-[#D4AF37] hover:border-neutral-700 outline-none px-4 py-2.5 rounded text-neutral-300 placeholder-neutral-700 transition-colors font-sans"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const defaultBg = "/src/assets/images/new_juaben_council_chiefs_hero_1783507779624.jpg";
                            setHeroBgUrl(defaultBg);
                            localStorage.setItem('new_juaben_hero_bg_url', defaultBg);
                            setSuccessMessage('Hero background reset to authentic portrait majesty!');
                            setTimeout(() => setSuccessMessage(''), 4000);
                          }}
                          className="px-4 py-2.5 bg-neutral-950 border border-neutral-800 hover:border-red-900/40 text-neutral-400 hover:text-white rounded text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          Reset Default
                        </button>
                      </div>
                    </div>

                    <div className="bg-neutral-950 p-4 border border-neutral-800/60 rounded-xl space-y-3">
                      <span className="text-[9px] font-sans font-black text-[#D4AF37] uppercase tracking-widest block border-b border-neutral-900 pb-1.5">
                        Historical Tapestry Presets
                      </span>
                      
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          {
                            title: "Omanhene",
                            url: "/src/assets/images/new_juaben_council_chiefs_hero_1783507779624.jpg"
                          },
                          {
                            title: "Royal Gold",
                            url: "/src/assets/images/akan_royal_gold_ornaments_1783507811735.jpg"
                          },
                          {
                            title: "Development",
                            url: "/src/assets/images/new_juaben_dev_project_1783507797237.jpg"
                          }
                        ].map((preset, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              setHeroBgUrl(preset.url);
                              localStorage.setItem('new_juaben_hero_bg_url', preset.url);
                              setSuccessMessage(`Hero background set to preset: ${preset.title}`);
                              setTimeout(() => setSuccessMessage(''), 3000);
                            }}
                            className={`px-2.5 py-2 text-center rounded border transition-all cursor-pointer font-sans text-[10px] font-black uppercase ${
                              heroBgUrl === preset.url
                                ? 'bg-gradient-to-r from-[#990000] to-red-900 border-[#D4AF37] text-white shadow-md'
                                : 'bg-neutral-900 hover:bg-neutral-850 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                            }`}
                          >
                            {preset.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4.5 Background Positioning/Alignment Control */}
                <div className="border-t border-neutral-800/60 pt-6 mt-6 space-y-4">
                  <span className="text-[10px] font-sans font-black text-neutral-400 uppercase tracking-widest block">
                    Background Vertical Offset (Position Alignment)
                  </span>
                  
                  <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1 max-w-md">
                      <p className="text-xs font-bold text-white">Adjust Focal Height</p>
                      <p className="text-[10px] text-neutral-400 leading-relaxed font-sans">
                        Slide to bring the background photo up or down. A lower percentage (e.g. 10% - 20%) shifts the image down to show the upper area (perfectly framing the chiefs' faces). A higher percentage (e.g. 50% - 80%) shows the lower portions.
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-4 min-w-[200px] flex-grow justify-end">
                      <span className="text-[10px] font-mono text-neutral-500 uppercase">Top (Show Heads)</span>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={(() => {
                          const match = heroBgPosition.match(/(\d+)%/);
                          return match ? parseInt(match[1]) : 5;
                        })()}
                        onChange={(e) => {
                          const percent = e.target.value;
                          setHeroBgPosition(`center ${percent}%`);
                        }}
                        className="flex-grow max-w-xs accent-[#D4AF37] cursor-pointer"
                        aria-label="Focal height percentage"
                      />
                      <span className="text-[10px] font-mono text-neutral-500 uppercase">Bottom</span>
                      
                      <div className="bg-neutral-900 border border-neutral-800 rounded px-2.5 py-1 text-center min-w-[65px]">
                        <span className="text-xs font-mono font-bold text-[#D4AF37]">
                          {(() => {
                            const match = heroBgPosition.match(/(\d+)%/);
                            return match ? `${match[1]}%` : '5%';
                          })()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Preset Alignments */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {[
                      { label: "Faces & Crowns (Low)", val: "center 5%" },
                      { label: "Traditional Regalia", val: "center 15%" },
                      { label: "Majesty Framing", val: "center 20%" },
                      { label: "Chest Alignment", val: "center 30%" },
                      { label: "Centered View", val: "center 50%" },
                      { label: "Throne View", val: "center 75%" }
                    ].map((btn, bidx) => (
                      <button
                        key={bidx}
                        type="button"
                        onClick={() => {
                          setHeroBgPosition(btn.val);
                          setSuccessMessage(`Background position set to: ${btn.label}`);
                          setTimeout(() => setSuccessMessage(''), 3000);
                        }}
                        className={`px-3 py-1.5 rounded text-[9px] font-sans font-black uppercase tracking-wider transition-all border cursor-pointer ${
                          heroBgPosition === btn.val
                            ? 'bg-[#990000] border-[#D4AF37] text-white'
                            : 'bg-neutral-950 hover:bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                        }`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 7: TRADITIONAL LEADERS PROFILE & PORTRAITS EDITING */}
          {activeTab === 'traditional-leaders' && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-xl sm:text-2xl font-sans font-black text-white uppercase tracking-tight">
                  Traditional Leaders Portrait & Bio Studio
                </h2>
                <p className="text-xs text-neutral-400 mt-1 font-sans">
                  Keep the supreme traditional leadership's public portrait photographs, names, titles, and biography statements fully up-to-date on the Home Page.
                </p>
              </div>

              {/* 4 Leaders Quick Selector Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {traditionalLeaders.map((leader) => {
                  const isSelected = leader.id === selectedLeaderId;
                  return (
                    <button
                      key={leader.id}
                      type="button"
                      onClick={() => setSelectedLeaderId(leader.id)}
                      className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden flex items-center space-x-3 cursor-pointer ${
                        isSelected
                          ? 'border-[#D4AF37] bg-neutral-900 shadow-md shadow-[#990000]/10'
                          : 'border-neutral-800 bg-[#111111]/30 hover:bg-neutral-900/60 hover:border-neutral-700'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-neutral-800 border border-neutral-700">
                        <img
                          src={leader.avatarUrl}
                          alt={leader.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400';
                          }}
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[8px] font-sans font-black text-[#D4AF37] uppercase tracking-wider truncate">
                          {leader.role}
                        </p>
                        <p className="text-xs font-bold text-white truncate mt-0.5">
                          {leader.name}
                        </p>
                      </div>
                      {isSelected && (
                        <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#D4AF37] rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Edit Form */}
              <form onSubmit={handleLeaderSubmit} className="space-y-6">
                <div className="bg-neutral-900 border border-neutral-800 p-5 sm:p-6 rounded-xl space-y-6">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                    <h3 className="text-xs font-sans font-black text-[#D4AF37] uppercase tracking-widest">
                      Edit {leadersForm.role || 'Traditional Leader'} Profile
                    </h3>
                    <span className="text-[9px] font-mono text-neutral-500 uppercase">
                      ID: {selectedLeaderId}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Portrait Photo Uploader & Preview */}
                    <div className="space-y-4">
                      <label className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider">
                        Upload Portrait Photograph <span className="text-red-500">*</span>
                      </label>
                      
                      {/* Portrait Preview Box */}
                      <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950 flex items-center justify-center group">
                        {leadersForm.avatarUrl ? (
                          <img 
                            src={leadersForm.avatarUrl} 
                            alt="Leader Portrait Preview" 
                            className="w-full h-full object-cover" 
                          />
                        ) : (
                          <Crown className="w-12 h-12 text-neutral-800" />
                        )}
                        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                          <ImageIcon className="w-8 h-8 text-[#D4AF37] mb-2" />
                          <span className="text-[10px] font-sans font-black text-white uppercase tracking-widest">
                            Upload Custom Photo
                          </span>
                        </div>
                        <input
                          id="leader-photo-upload"
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const files = e.target.files;
                            if (files && files.length > 0) {
                              const file = files[0];
                              setUploadProgress("Uploading portrait photo to Supabase storage...");
                              supabaseService.uploadFile(file, 'leaders').then((url) => {
                                setUploadProgress(null);
                                if (url) {
                                  setLeadersForm(prev => ({ ...prev, avatarUrl: url }));
                                  setSuccessMessage("successfully updated");
                                  setTimeout(() => setSuccessMessage(''), 4000);
                                } else {
                                  setSuccessMessage("Failed to upload portrait to Supabase.");
                                  setTimeout(() => setSuccessMessage(''), 4000);
                                }
                              }).catch((err) => {
                                setUploadProgress(null);
                                console.error(err);
                              });
                            }
                          }}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </div>
                      
                      <div className="text-center">
                        <p className="text-[9px] text-neutral-500 font-mono uppercase">
                          Drag and drop or click image above to select file
                        </p>
                      </div>

                      {/* Manual Image URL Paste */}
                      <div className="space-y-1 pt-2">
                        <label htmlFor="manual-url-input" className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider">
                          Or Paste Photograph Direct URL
                        </label>
                        <input
                          id="manual-url-input"
                          type="text"
                          value={leadersForm.avatarUrl}
                          onChange={(e) => setLeadersForm(prev => ({ ...prev, avatarUrl: e.target.value }))}
                          placeholder="e.g. https://images.unsplash.com/..."
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-700 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Leader Details Fields */}
                    <div className="lg:col-span-2 space-y-4">
                      {/* Name */}
                      <div>
                        <label htmlFor="leader-name" className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-1.5">
                          Leader Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="leader-name"
                          type="text"
                          required
                          value={leadersForm.name}
                          onChange={(e) => setLeadersForm(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="e.g. Daasebre Kwaku Boateng III"
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>

                      {/* Official Title */}
                      <div>
                        <label htmlFor="leader-title" className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-1.5">
                          Official Royal/Traditional Title <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="leader-title"
                          type="text"
                          required
                          value={leadersForm.title}
                          onChange={(e) => setLeadersForm(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="e.g. Omanhene of New Juaben Traditional Area"
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>

                      {/* Brief Biography Statement */}
                      <div>
                        <label htmlFor="leader-bio" className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-1.5">
                          Brief Biography &amp; Development Focus <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="leader-bio"
                          rows={8}
                          required
                          value={leadersForm.bio}
                          onChange={(e) => setLeadersForm(prev => ({ ...prev, bio: e.target.value }))}
                          placeholder="Brief biography statement of accomplishments, historical lineage, and current community developmental undertakings..."
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37] leading-relaxed"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#990000] hover:bg-red-800 text-[#D4AF37] text-xs font-sans font-black tracking-widest uppercase rounded-xl shadow-lg border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all cursor-pointer flex items-center justify-center space-x-2"
                >
                  <Shield className="w-4 h-4" />
                  <span>Publish Custom Portrait &amp; Details to Home Page</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 8: DIVISIONAL COMMUNITIES & SEATS */}
          {activeTab === 'communities' && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tight">
                    Traditional Divisional Communities
                  </h2>
                  <p className="text-xs text-neutral-400 mt-1 font-sans">
                    Define population data, custom cultural outlines, and full profiles for both the Paramount Chief (Ohene) and Queen Mother (Ohemaa) of each division.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setSelectedCommunityToEdit('');
                    setCommunityForm({
                      name: '',
                      population: '15,000',
                      desc: '',
                      chiefProfile: {
                        name: '',
                        title: 'Ohene',
                        reignTitle: 'Divisional Ruler',
                        stooledYear: '',
                        avatarUrl: '',
                        bio: '',
                        vision: '',
                        education: '',
                        achievements: ''
                      },
                      queenProfile: {
                        name: '',
                        title: 'Ohemaa',
                        enstooledYear: '',
                        avatarUrl: '',
                        bio: '',
                        vision: '',
                        education: '',
                        achievements: ''
                      }
                    });
                  }}
                  className="px-4 py-2.5 bg-[#990000]/10 hover:bg-[#990000]/30 border border-[#D4AF37]/25 hover:border-[#D4AF37]/50 text-[#D4AF37] hover:text-white rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer self-start sm:self-center"
                >
                  + Add New divisional Seat
                </button>
              </div>

              {/* Selection strip of existing communities */}
              <div className="bg-neutral-900 border border-neutral-800 p-4.5 rounded-xl space-y-3">
                <span className="text-[10px] font-sans font-black text-[#D4AF37] uppercase tracking-widest block">
                  Select Traditional Division to Edit
                </span>
                <div className="flex flex-wrap gap-2">
                  {communities.map(c => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCommunityToEdit(c.id)}
                      className={`px-3 py-2 rounded-lg text-xs font-sans font-black uppercase tracking-wider border transition-all cursor-pointer ${
                        selectedCommunityToEdit === c.id
                          ? 'bg-[#990000] border-[#D4AF37] text-white shadow-md'
                          : 'bg-black/40 border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-950'
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                  {selectedCommunityToEdit === '' && (
                    <span className="px-3 py-2 rounded-lg text-xs font-sans font-black uppercase tracking-wider border bg-neutral-950 border-[#D4AF37]/45 text-[#D4AF37] animate-pulse">
                      Drafting Brand New Seat
                    </span>
                  )}
                </div>
              </div>

              <form onSubmit={handleCommunitySubmit} className="space-y-8">
                {/* Basic community details card */}
                <div className="bg-neutral-900 border border-neutral-800 p-5 sm:p-6 rounded-xl space-y-4">
                  <h3 className="text-xs font-sans font-black text-[#D4AF37] uppercase tracking-widest border-b border-neutral-800 pb-2">
                    Division Basic Data
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="comm-name" className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-1.5">
                        Division/Community Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="comm-name"
                        type="text"
                        required
                        value={communityForm.name}
                        onChange={(e) => setCommunityForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="e.g. Asokore"
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="comm-population" className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-1.5">
                        Approximate Population
                      </label>
                      <input
                        id="comm-population"
                        type="text"
                        required
                        value={communityForm.population}
                        onChange={(e) => setCommunityForm(prev => ({ ...prev, population: e.target.value }))}
                        placeholder="e.g. 24,500"
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="comm-desc" className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-1.5">
                      Sovereign Divisional Background <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="comm-desc"
                      rows={3}
                      required
                      value={communityForm.desc}
                      onChange={(e) => setCommunityForm(prev => ({ ...prev, desc: e.target.value }))}
                      placeholder="Brief history of the division, geographical seat, and developmental direction."
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none"
                    ></textarea>
                  </div>
                </div>

                {/* Paramount Chief profile uploader & content form */}
                <div className="bg-neutral-900 border border-neutral-800 p-5 sm:p-6 rounded-xl space-y-6">
                  <h3 className="text-xs font-sans font-black text-[#D4AF37] uppercase tracking-widest border-b border-neutral-800 pb-2 flex items-center">
                    <Crown className="w-4 h-4 mr-1.5 text-[#D4AF37]" /> Paramount Chief (Ohene) Profile
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Chief Portrait */}
                    <div className="space-y-3">
                      <label className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider">
                        Ohene Portrait Picture
                      </label>
                      
                      <div className="relative aspect-square rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950 flex items-center justify-center group">
                        {communityForm.chiefProfile.avatarUrl ? (
                          <img src={communityForm.chiefProfile.avatarUrl} alt="Chief Portrait" className="w-full h-full object-cover" />
                        ) : (
                          <Crown className="w-10 h-10 text-neutral-800" />
                        )}
                        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 text-center">
                          <span className="text-[9px] font-sans font-black text-white uppercase tracking-widest">
                            Upload Chief portrait
                          </span>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const files = e.target.files;
                            if (files && files.length > 0) {
                              const file = files[0];
                              setUploadProgress("Uploading chief portrait to Supabase storage...");
                              supabaseService.uploadFile(file, 'chiefs').then((url) => {
                                setUploadProgress(null);
                                if (url) {
                                  setCommunityForm(prev => ({
                                    ...prev,
                                    chiefProfile: {
                                      ...prev.chiefProfile,
                                      avatarUrl: url
                                    }
                                  }));
                                  setSuccessMessage("successfully updated");
                                  setTimeout(() => setSuccessMessage(''), 4000);
                                } else {
                                  setSuccessMessage("Failed to upload chief portrait to Supabase.");
                                  setTimeout(() => setSuccessMessage(''), 4000);
                                }
                              }).catch((err) => {
                                setUploadProgress(null);
                                console.error(err);
                              });
                            }
                          }}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Chief Inputs */}
                    <div className="md:col-span-2 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-1.5">
                            Chief Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={communityForm.chiefProfile.name}
                            onChange={(e) => setCommunityForm(prev => ({
                              ...prev,
                              chiefProfile: { ...prev.chiefProfile, name: e.target.value }
                            }))}
                            placeholder="e.g. Nana Kwaku Boateng"
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-1.5">
                            Paramount Slogan/Reign
                          </label>
                          <input
                            type="text"
                            required
                            value={communityForm.chiefProfile.reignTitle}
                            onChange={(e) => setCommunityForm(prev => ({
                              ...prev,
                              chiefProfile: { ...prev.chiefProfile, reignTitle: e.target.value }
                            }))}
                            placeholder="e.g. Adontenhene of New Juaben"
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-1.5">
                            Chief Title
                          </label>
                          <input
                            type="text"
                            required
                            value={communityForm.chiefProfile.title}
                            onChange={(e) => setCommunityForm(prev => ({
                              ...prev,
                              chiefProfile: { ...prev.chiefProfile, title: e.target.value }
                            }))}
                            placeholder="e.g. Nana"
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-1.5">
                            Year Enstooled <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={communityForm.chiefProfile.stooledYear}
                            onChange={(e) => setCommunityForm(prev => ({
                              ...prev,
                              chiefProfile: { ...prev.chiefProfile, stooledYear: e.target.value }
                            }))}
                            placeholder="e.g. 2011"
                            className="w-full bg-[#0d0d0d] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-1.5">
                        Chief Short Biography
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={communityForm.chiefProfile.bio}
                        onChange={(e) => setCommunityForm(prev => ({
                          ...prev,
                          chiefProfile: { ...prev.chiefProfile, bio: e.target.value }
                        }))}
                        placeholder="Traditional upbringing, background, coronation timeline, and family lineage."
                        className="w-full bg-[#0d0d0d] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none"
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-1.5">
                        Chief Strategic Vision
                      </label>
                      <textarea
                        rows={2}
                        required
                        value={communityForm.chiefProfile.vision}
                        onChange={(e) => setCommunityForm(prev => ({
                          ...prev,
                          chiefProfile: { ...prev.chiefProfile, vision: e.target.value }
                        }))}
                        placeholder="Divisional projects, environmental cleanliness programs, or healthcare drives."
                        className="w-full bg-[#0d0d0d] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none"
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-1.5">
                          Academic Degrees (Comma Separated)
                        </label>
                        <input
                          type="text"
                          value={communityForm.chiefProfile.education}
                          onChange={(e) => setCommunityForm(prev => ({
                            ...prev,
                            chiefProfile: { ...prev.chiefProfile, education: e.target.value }
                          }))}
                          placeholder="BSc. Business Administration (KNUST), MBA (GIMPA)"
                          className="w-full bg-[#0d0d0d] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-1.5">
                          Notable Achievements (Comma Separated)
                        </label>
                        <input
                          type="text"
                          value={communityForm.chiefProfile.achievements}
                          onChange={(e) => setCommunityForm(prev => ({
                            ...prev,
                            chiefProfile: { ...prev.chiefProfile, achievements: e.target.value }
                          }))}
                          placeholder="Rebuilt the local market center, Commissioned clean water boreholes"
                          className="w-full bg-[#0d0d0d] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Queen mother profile section */}
                <div className="bg-neutral-900 border border-neutral-800 p-5 sm:p-6 rounded-xl space-y-6">
                  <h3 className="text-xs font-sans font-black text-[#D4AF37] uppercase tracking-widest border-b border-neutral-800 pb-2 flex items-center">
                    <Crown className="w-4 h-4 mr-1.5 text-[#D4AF37]" /> Queen Mother (Ohemaa) Profile
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Queen Portrait */}
                    <div className="space-y-3">
                      <label className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider">
                        Ohemaa Portrait Picture
                      </label>
                      
                      <div className="relative aspect-square rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950 flex items-center justify-center group">
                        {communityForm.queenProfile.avatarUrl ? (
                          <img src={communityForm.queenProfile.avatarUrl} alt="Queen Portrait" className="w-full h-full object-cover" />
                        ) : (
                          <Crown className="w-10 h-10 text-neutral-800" />
                        )}
                        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 text-center">
                          <span className="text-[9px] font-sans font-black text-white uppercase tracking-widest">
                            Upload Queen portrait
                          </span>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const files = e.target.files;
                            if (files && files.length > 0) {
                              const file = files[0];
                              setUploadProgress("Uploading queen portrait to Supabase storage...");
                              supabaseService.uploadFile(file, 'queens').then((url) => {
                                setUploadProgress(null);
                                if (url) {
                                  setCommunityForm(prev => ({
                                    ...prev,
                                    queenProfile: {
                                      ...prev.queenProfile,
                                      avatarUrl: url
                                    }
                                  }));
                                  setSuccessMessage("successfully updated");
                                  setTimeout(() => setSuccessMessage(''), 4000);
                                } else {
                                  setSuccessMessage("Failed to upload queen portrait to Supabase.");
                                  setTimeout(() => setSuccessMessage(''), 4000);
                                }
                              }).catch((err) => {
                                setUploadProgress(null);
                                console.error(err);
                              });
                            }
                          }}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Queen Inputs */}
                    <div className="md:col-span-2 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-1.5">
                            Queen Mother Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={communityForm.queenProfile.name}
                            onChange={(e) => setCommunityForm(prev => ({
                              ...prev,
                              queenProfile: { ...prev.queenProfile, name: e.target.value }
                            }))}
                            placeholder="e.g. Nana Amponsah Dokua"
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-1.5">
                            Queen Mother Title
                          </label>
                          <input
                            type="text"
                            required
                            value={communityForm.queenProfile.title}
                            onChange={(e) => setCommunityForm(prev => ({
                              ...prev,
                              queenProfile: { ...prev.queenProfile, title: e.target.value }
                            }))}
                            placeholder="e.g. Ohemaa"
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-1.5">
                            Year Enstooled <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={communityForm.queenProfile.enstooledYear}
                            onChange={(e) => setCommunityForm(prev => ({
                              ...prev,
                              queenProfile: { ...prev.queenProfile, enstooledYear: e.target.value }
                            }))}
                            placeholder="e.g. 2014"
                            className="w-full bg-[#0d0d0d] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-1.5">
                            Reign Name/Title <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={communityForm.queenProfile.reignTitle}
                            onChange={(e) => setCommunityForm(prev => ({
                              ...prev,
                              queenProfile: { ...prev.queenProfile, reignTitle: e.target.value }
                            }))}
                            placeholder="e.g. Nana Adwoa Akyaamaa II"
                            className="w-full bg-[#0d0d0d] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-1.5">
                        Queen Mother Biography
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={communityForm.queenProfile.bio}
                        onChange={(e) => setCommunityForm(prev => ({
                          ...prev,
                          queenProfile: { ...prev.queenProfile, bio: e.target.value }
                        }))}
                        placeholder="Lineage background, coronation details, and developmental role in the maternal circle."
                        className="w-full bg-[#0d0d0d] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none"
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-1.5">
                        Queen Mother Strategic Vision
                      </label>
                      <textarea
                        rows={2}
                        required
                        value={communityForm.queenProfile.vision}
                        onChange={(e) => setCommunityForm(prev => ({
                          ...prev,
                          queenProfile: { ...prev.queenProfile, vision: e.target.value }
                        }))}
                        placeholder="Empowerment projects, girl-child education schemes, or weaving cooperatives."
                        className="w-full bg-[#0d0d0d] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none"
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-1.5">
                          Academic Degrees (Comma Separated)
                        </label>
                        <input
                          type="text"
                          value={communityForm.queenProfile.education}
                          onChange={(e) => setCommunityForm(prev => ({
                            ...prev,
                            queenProfile: { ...prev.queenProfile, education: e.target.value }
                          }))}
                          placeholder="BA. Sociology (UG), MSc. Social Development"
                          className="w-full bg-[#0d0d0d] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-1.5">
                          Notable Achievements (Comma Separated)
                        </label>
                        <input
                          type="text"
                          value={communityForm.queenProfile.achievements}
                          onChange={(e) => setCommunityForm(prev => ({
                            ...prev,
                            queenProfile: { ...prev.queenProfile, achievements: e.target.value }
                          }))}
                          placeholder="Established women's weaving cooperative, Donated textbooks to secondary schools"
                          className="w-full bg-[#0d0d0d] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-grow py-4 bg-[#990000] hover:bg-red-800 text-white text-xs font-sans font-black tracking-widest uppercase rounded-xl border border-transparent transition-all cursor-pointer shadow-lg"
                  >
                    {selectedCommunityToEdit ? 'Save Divisional Seat Changes' : 'Publish & Seat Divisional Community'}
                  </button>

                  {selectedCommunityToEdit && (
                    <button
                      type="button"
                      onClick={handleDeleteCommunity}
                      className="px-6 py-4 bg-black hover:bg-red-950 border border-neutral-800 hover:border-red-900 text-neutral-400 hover:text-red-500 rounded-xl text-xs font-sans font-black tracking-widest uppercase transition-all cursor-pointer"
                    >
                      Delete Seat
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}

          {/* TAB: ADVISORY BOARD MANAGEMENT */}
          {activeTab === 'advisory' && (
            <div className="space-y-8 animate-fade-in" id="advisory-board-management-panel">
              <div>
                <h2 className="text-xl sm:text-2xl font-sans font-black text-white uppercase tracking-tight">
                  Advisory Board Studio
                </h2>
                <p className="text-xs text-neutral-400 mt-1 font-sans">
                  Manage the profiles, roles, and portrait photographs of the prestigious Advisory Board members supporting the Nkosuo Division.
                </p>
              </div>

              {/* PUBLIC HEADER CUSTOMIZER */}
              <div className="bg-neutral-900 border border-neutral-800 p-5 sm:p-6 rounded-xl space-y-6">
                <h3 className="text-xs font-sans font-black text-[#D4AF37] uppercase tracking-widest border-b border-neutral-800 pb-2 flex items-center justify-between">
                  <span>Advisory Board Header & Intro Text</span>
                  <span className="text-[9px] text-neutral-500 font-mono font-normal">PERSISTED IN PUBLIC ADVISORY SECTION</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-2">
                      Advisory Section Sub-badge
                    </label>
                    <input
                      type="text"
                      value={advisorySubtitle}
                      onChange={(e) => setAdvisorySubtitle(e.target.value)}
                      placeholder="e.g. Advisory Council & Strategy"
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-600 transition-all focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-2">
                      Advisory Section Title
                    </label>
                    <input
                      type="text"
                      value={advisoryTitle}
                      onChange={(e) => setAdvisoryTitle(e.target.value)}
                      placeholder="e.g. Nkosuo Advisory Board"
                      className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-600 transition-all focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-2">
                    Advisory Section Introduction / Description
                  </label>
                  <textarea
                    rows={3}
                    value={advisoryDesc}
                    onChange={(e) => setAdvisoryDesc(e.target.value)}
                    placeholder="Brief introductory description explaining the board's strategic purpose..."
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-600 transition-all focus:outline-none resize-none font-sans leading-relaxed"
                  />
                </div>
              </div>

              {/* Grid: Form and Current Members List */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left Column: Member Editor Form (5 Cols) */}
                <div className="lg:col-span-5 bg-[#111111]/40 border border-neutral-900 rounded-2xl p-6 sm:p-8 space-y-6">
                  <div>
                    <h3 className="text-sm font-sans font-black text-[#D4AF37] uppercase tracking-wider">
                      {editingAdvisoryId ? 'Edit Advisor Profile' : 'Insert New Advisor'}
                    </h3>
                    <p className="text-[11px] text-neutral-400 mt-1">
                      {editingAdvisoryId ? 'Update the details for this strategic advisor.' : 'Add a new member to the Nkosuo Advisory Board.'}
                    </p>
                  </div>

                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!advisoryForm.name.trim() || !advisoryForm.role.trim()) {
                        setSuccessMessage('Error: Name and Role are required.');
                        setTimeout(() => setSuccessMessage(''), 3000);
                        return;
                      }

                      if (editingAdvisoryId) {
                        // Editing existing
                        const updated = advisoryMembers.map(m => 
                          m.id === editingAdvisoryId ? { ...m, ...advisoryForm } : m
                        );
                        setAdvisoryMembers(updated);
                        setEditingAdvisoryId(null);
                        setSuccessMessage('Advisor profile updated successfully.');
                        setTimeout(() => setSuccessMessage(''), 3000);
                      } else {
                        // Creating new
                        const newMember: AdvisoryBoardMember = {
                          id: `adv_${Date.now()}`,
                          ...advisoryForm,
                          imageUrl: advisoryForm.imageUrl.trim() || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400'
                        };
                        setAdvisoryMembers([...advisoryMembers, newMember]);
                        setSuccessMessage('New advisor added to board successfully.');
                        setTimeout(() => setSuccessMessage(''), 3000);
                      }

                      // Reset form
                      setAdvisoryForm({
                        name: '',
                        role: '',
                        organization: '',
                        bio: '',
                        imageUrl: ''
                      });
                    }}
                    className="space-y-4"
                  >
                    {/* Name */}
                    <div>
                      <label className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-2">
                        Advisor Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={advisoryForm.name}
                        onChange={(e) => setAdvisoryForm({ ...advisoryForm, name: e.target.value })}
                        placeholder="e.g. Prof. Kofi Asare-Bediako"
                        className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-600 transition-all focus:outline-none"
                      />
                    </div>

                    {/* Role */}
                    <div>
                      <label className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-2">
                        Strategic Role / Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={advisoryForm.role}
                        onChange={(e) => setAdvisoryForm({ ...advisoryForm, role: e.target.value })}
                        placeholder="e.g. Chairman & Development Policy Advisor"
                        className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-600 transition-all focus:outline-none"
                      />
                    </div>

                    {/* Organization */}
                    <div>
                      <label className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-2">
                        Associated Organization / Body
                      </label>
                      <input
                        type="text"
                        value={advisoryForm.organization}
                        onChange={(e) => setAdvisoryForm({ ...advisoryForm, organization: e.target.value })}
                        placeholder="e.g. Institute of Development Studies, Ghana"
                        className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-600 transition-all focus:outline-none"
                      />
                    </div>

                    {/* Image URL with Preset Options */}
                    <div>
                      <label className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-2">
                        Portrait Image URL / Upload
                      </label>
                      <div className="space-y-3">
                        <input
                          type="url"
                          value={advisoryForm.imageUrl}
                          onChange={(e) => setAdvisoryForm({ ...advisoryForm, imageUrl: e.target.value })}
                          placeholder="https://images.unsplash.com/..."
                          className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-600 transition-all focus:outline-none"
                        />
                        
                        <div>
                          <label className="block text-[9px] font-mono text-neutral-500 uppercase tracking-wider mb-1.5">
                            Or Upload Portrait from Device
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const files = e.target.files;
                              if (files && files.length > 0) {
                                const file = files[0];
                                setUploadProgress("Uploading advisory portrait to Supabase storage...");
                                supabaseService.uploadFile(file, 'advisory').then((url) => {
                                  setUploadProgress(null);
                                  if (url) {
                                    setAdvisoryForm(prev => ({ ...prev, imageUrl: url }));
                                    setSuccessMessage("successfully updated");
                                    setTimeout(() => setSuccessMessage(''), 4000);
                                  } else {
                                    setSuccessMessage("Failed to upload portrait to Supabase.");
                                    setTimeout(() => setSuccessMessage(''), 4000);
                                  }
                                }).catch((err) => {
                                  setUploadProgress(null);
                                  console.error(err);
                                });
                              }
                            }}
                            className="block w-full text-xs text-neutral-400 bg-neutral-950 border border-neutral-800 hover:border-[#D4AF37] rounded-lg px-3 py-2 cursor-pointer focus:outline-none file:mr-3 file:py-1 file:px-2.5 file:rounded file:border-0 file:text-[10px] file:font-sans file:font-black file:uppercase file:bg-neutral-800 file:text-neutral-300 hover:file:bg-neutral-700"
                          />
                        </div>

                        <div className="flex flex-wrap gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => setAdvisoryForm({ ...advisoryForm, imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400' })}
                            className="px-2 py-1 bg-neutral-900 border border-neutral-800 rounded text-[9px] text-neutral-400 hover:text-white"
                          >
                            Preset Male 1
                          </button>
                          <button
                            type="button"
                            onClick={() => setAdvisoryForm({ ...advisoryForm, imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400' })}
                            className="px-2 py-1 bg-neutral-900 border border-neutral-800 rounded text-[9px] text-neutral-400 hover:text-white"
                          >
                            Preset Male 2
                          </button>
                          <button
                            type="button"
                            onClick={() => setAdvisoryForm({ ...advisoryForm, imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400' })}
                            className="px-2 py-1 bg-neutral-900 border border-neutral-800 rounded text-[9px] text-neutral-400 hover:text-white"
                          >
                            Preset Female 1
                          </button>
                          <button
                            type="button"
                            onClick={() => setAdvisoryForm({ ...advisoryForm, imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400' })}
                            className="px-2 py-1 bg-neutral-900 border border-neutral-800 rounded text-[9px] text-neutral-400 hover:text-white"
                          >
                            Preset Female 2
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Bio Statement */}
                    <div>
                      <label className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-2">
                        Biography & Contribution Bio
                      </label>
                      <textarea
                        rows={4}
                        value={advisoryForm.bio}
                        onChange={(e) => setAdvisoryForm({ ...advisoryForm, bio: e.target.value })}
                        placeholder="Brief summary of their background, credentials, and advisory duties in the division..."
                        className="w-full bg-neutral-950 border border-neutral-800 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-600 transition-all focus:outline-none resize-none"
                      />
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-3 pt-2">
                      <button
                        type="submit"
                        className="flex-grow py-3 bg-[#990000] hover:bg-red-800 text-white text-xs font-sans font-black tracking-widest uppercase rounded-xl transition-all cursor-pointer animate-pulse-slow"
                      >
                        {editingAdvisoryId ? 'Save Advisor Changes' : 'Insert Royal Advisor'}
                      </button>
                      
                      {editingAdvisoryId && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingAdvisoryId(null);
                            setAdvisoryForm({
                              name: '',
                              role: '',
                              organization: '',
                              bio: '',
                              imageUrl: ''
                            });
                          }}
                          className="px-4 py-3 bg-neutral-950 hover:bg-neutral-900 text-neutral-400 border border-neutral-800 hover:border-neutral-700 rounded-xl text-xs font-sans font-black tracking-widest uppercase transition-all cursor-pointer"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                {/* Right Column: Board Members List (7 Cols) */}
                <div className="lg:col-span-7 bg-[#111111]/40 border border-neutral-900 rounded-2xl p-6 sm:p-8 space-y-6">
                  <div>
                    <h3 className="text-sm font-sans font-black text-white uppercase tracking-wider">
                      Current Council Members ({advisoryMembers.length})
                    </h3>
                    <p className="text-[11px] text-neutral-400 mt-1">
                      Review, modify, or remove existing advisory board profiles from the live public list.
                    </p>
                  </div>

                  {advisoryMembers.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-neutral-800 rounded-2xl">
                      <Users className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
                      <p className="text-xs text-neutral-500">No advisory board members added yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                      {advisoryMembers.map((member) => (
                        <div
                          key={member.id}
                          className="p-4 bg-neutral-950/60 border border-neutral-800 hover:border-neutral-700 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all"
                        >
                          <div className="flex items-center space-x-4 min-w-0">
                            <div className="w-14 h-14 rounded-full overflow-hidden bg-neutral-900 border border-neutral-800 flex-shrink-0">
                              <img
                                src={member.imageUrl}
                                alt={member.name}
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400';
                                }}
                              />
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-xs font-black text-white uppercase tracking-wide truncate">
                                {member.name}
                              </h4>
                              <p className="text-[10px] text-[#D4AF37] font-medium mt-0.5 truncate">
                                {member.role}
                              </p>
                              {member.organization && (
                                <p className="text-[9px] text-neutral-500 font-mono mt-0.5 truncate uppercase">
                                  {member.organization}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 w-full sm:w-auto justify-end border-t sm:border-t-0 border-neutral-900 pt-2 sm:pt-0">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingAdvisoryId(member.id);
                                setAdvisoryForm({
                                  name: member.name || '',
                                  role: member.role || '',
                                  organization: member.organization || '',
                                  bio: member.bio || '',
                                  imageUrl: member.imageUrl || ''
                                });
                              }}
                              className="p-2 text-neutral-400 hover:text-[#D4AF37] bg-neutral-900 border border-neutral-800 hover:border-[#D4AF37]/30 rounded-lg transition-all cursor-pointer"
                              title="Edit Profile"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm(`Are you sure you want to remove ${member.name} from the Advisory Board?`)) {
                                  const updated = advisoryMembers.filter(m => m.id !== member.id);
                                  setAdvisoryMembers(updated);
                                  setSuccessMessage('Advisor removed from board successfully.');
                                  setTimeout(() => setSuccessMessage(''), 3000);
                                  if (editingAdvisoryId === member.id) {
                                    setEditingAdvisoryId(null);
                                    setAdvisoryForm({
                                      name: '',
                                      role: '',
                                      organization: '',
                                      bio: '',
                                      imageUrl: ''
                                    });
                                  }
                                }
                              }}
                              className="p-2 text-neutral-500 hover:text-red-500 bg-neutral-900 border border-neutral-800 hover:border-red-900/30 rounded-lg transition-all cursor-pointer"
                              title="Remove Advisor"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* TAB 9: SECURITY & PASSWORD CONFIG */}
          {activeTab === 'security' && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tight">
                  Security & Access Control
                </h2>
                <p className="text-xs text-neutral-400 mt-1 font-sans">
                  Manage the private passcode required to unlock the Administrative Control Panel. Secure your administrative authority.
                </p>
              </div>

              <div className="max-w-xl bg-neutral-900 border border-neutral-800 rounded-xl p-6 sm:p-8 space-y-6">
                <div className="flex items-center space-x-3 pb-4 border-b border-neutral-800">
                  <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-sans font-black text-white uppercase tracking-tight">Change Administrative Passcode</h3>
                    <p className="text-[10px] text-neutral-500 font-sans mt-0.5">Protect publishing privileges from unauthorized external modifications.</p>
                  </div>
                </div>

                <form onSubmit={handleChangePasswordSubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-widest">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        required
                        value={currentPasswordInput}
                        onChange={(e) => setCurrentPasswordInput(e.target.value)}
                        placeholder="Enter current administration passcode"
                        className="w-full bg-[#0d0d0d] border border-neutral-800 rounded-lg pl-3.5 pr-10 py-3 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-3 text-neutral-500 hover:text-white transition-colors cursor-pointer"
                        aria-label={showCurrentPassword ? "Hide password" : "Show password"}
                      >
                        {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-widest">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        required
                        value={newPasswordInput}
                        onChange={(e) => setNewPasswordInput(e.target.value)}
                        placeholder="Enter new passcode (min. 6 characters)"
                        className="w-full bg-[#0d0d0d] border border-neutral-800 rounded-lg pl-3.5 pr-10 py-3 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-3 text-neutral-500 hover:text-white transition-colors cursor-pointer"
                        aria-label={showNewPassword ? "Hide password" : "Show password"}
                      >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-widest">
                      Confirm New Password
                    </label>
                    <input
                      type={showNewPassword ? "text" : "password"}
                      required
                      value={confirmPasswordInput}
                      onChange={(e) => setConfirmPasswordInput(e.target.value)}
                      placeholder="Retype your new passcode to confirm"
                      className="w-full bg-[#0d0d0d] border border-neutral-800 rounded-lg px-3.5 py-3 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  {passwordChangeError && (
                    <div className="p-3 bg-[#990000]/10 border border-[#990000]/30 rounded-lg text-xs text-red-400 flex items-start space-x-2">
                      <AlertCircle className="w-4.5 h-4.5 flex-shrink-0 mt-0.5 text-red-500" />
                      <span>{passwordChangeError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#990000] hover:bg-red-800 text-white text-xs font-sans font-black tracking-widest uppercase rounded shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    Confirm & Update Security Passcode
                  </button>
                </form>
              </div>

              {/* Informative Help Box */}
              <div className="max-w-xl bg-gradient-to-r from-neutral-900 to-black border border-neutral-800 rounded-xl p-5 flex items-start space-x-4">
                <Shield className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs font-sans font-black text-white uppercase tracking-wider">Access Security Advisory</h4>
                  <p className="text-[11px] text-neutral-400 leading-relaxed">
                    By default, the Administrative Desk is secured with <code className="text-[#D4AF37] font-mono">nkosuo2026</code>. Changing the password updates local storage, preventing anyone from unlocking these publishing and content uploading tools unless they possess your custom passcode. Write down or secure your passcode carefully.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB: SECRETARIAT CONTACTS */}
          {activeTab === 'contacts' && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tight">
                  Secretariat Contact Settings
                </h2>
                <p className="text-xs text-neutral-400 mt-1 font-sans">
                  Dynamically update the physical address, GPS locator, phone, email, and office hours displayed in the footer and homepage contacts card.
                </p>
              </div>

              <div className="max-w-2xl bg-neutral-900 border border-neutral-800 rounded-xl p-6 sm:p-8">
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (setContacts) {
                      setContacts(contactsForm);
                      localStorage.setItem('new_juaben_contacts', JSON.stringify(contactsForm));
                      showSuccessFeedback('Secretariat contact information updated successfully.');
                    }
                  }} 
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-widest">
                        Secretariat Phone Number
                      </label>
                      <input
                        type="text"
                        required
                        value={contactsForm.phone}
                        onChange={(e) => setContactsForm({ ...contactsForm, phone: e.target.value })}
                        placeholder="+233 (0) 50 123 4567"
                        className="w-full bg-[#0d0d0d] border border-neutral-800 rounded-lg px-3.5 py-3 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-widest">
                        Official Secretariat Email
                      </label>
                      <input
                        type="email"
                        required
                        value={contactsForm.email}
                        onChange={(e) => setContactsForm({ ...contactsForm, email: e.target.value })}
                        placeholder="secretariat@newjuaben.org"
                        className="w-full bg-[#0d0d0d] border border-neutral-800 rounded-lg px-3.5 py-3 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-widest">
                      Physical Postal/Office Address
                    </label>
                    <input
                      type="text"
                      required
                      value={contactsForm.address}
                      onChange={(e) => setContactsForm({ ...contactsForm, address: e.target.value })}
                      placeholder="Yiadom Hwedie Palace, Koforidua, Eastern Region, Ghana"
                      className="w-full bg-[#0d0d0d] border border-neutral-800 rounded-lg px-3.5 py-3 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-widest">
                        Ghana Post GPS Address
                      </label>
                      <input
                        type="text"
                        required
                        value={contactsForm.gpsAddress}
                        onChange={(e) => setContactsForm({ ...contactsForm, gpsAddress: e.target.value })}
                        placeholder="EN-002-1234"
                        className="w-full bg-[#0d0d0d] border border-neutral-800 rounded-lg px-3.5 py-3 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-widest">
                        Secretariat Office Hours
                      </label>
                      <input
                        type="text"
                        required
                        value={contactsForm.officeHours}
                        onChange={(e) => setContactsForm({ ...contactsForm, officeHours: e.target.value })}
                        placeholder="Mon - Fri, 8:00 AM - 5:00 PM"
                        className="w-full bg-[#0d0d0d] border border-neutral-800 rounded-lg px-3.5 py-3 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#990000] hover:bg-red-800 text-white text-xs font-sans font-black tracking-widest uppercase rounded shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    Save & Apply Contact Changes
                  </button>
                </form>
              </div>

              {/* Informative Help Box */}
              <div className="max-w-2xl bg-gradient-to-r from-neutral-900 to-black border border-neutral-800 rounded-xl p-5 flex items-start space-x-4">
                <Phone className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs font-sans font-black text-white uppercase tracking-wider">Dynamic Publishing Advisory</h4>
                  <p className="text-[11px] text-neutral-400 leading-relaxed">
                    Updating these settings will instantly synchronize across the entire application interface. Changes will be reflected in both the custom homepage "Secretariat Contacts" section and the global website footer.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Toast success message */}
          <AnimatePresence>
                {successMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="fixed bottom-6 right-6 z-50 bg-neutral-900 border border-[#D4AF37]/35 text-white p-4.5 rounded-xl shadow-2xl flex items-center space-x-3.5"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-sans font-black text-[#D4AF37] uppercase tracking-widest">Royal System Update</p>
                      <p className="text-xs text-neutral-300 mt-0.5">{successMessage}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

        </main>
      </div>

    </div>
  );
}
