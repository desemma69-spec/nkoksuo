import { createClient } from '@supabase/supabase-js';
import { Project, Event as RoyalEvent, GalleryItem, FeedbackSubmission, TraditionalLeader, AdinkraProverb, AdvisoryBoardMember, ContactInfo, Community } from '../types';

const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL || 'https://hmhbszjbyvopyxngjuzs.supabase.co';
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtaGJzempieXZvcHl4bmdqdXpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQxMjQwNjAsImV4cCI6MjA5OTcwMDA2MH0.UCNfvrmJATkRH-CQen3QHKC89P-Y6_0nUN4lXMfTp_w';

// Check if configured
export const isSupabaseConfigured = (): boolean => {
  return !!supabaseUrl && !!supabaseAnonKey && supabaseUrl !== '""' && supabaseAnonKey !== '""';
};

// Create client lazily or safely
export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Helper to handle API operations safely
export const supabaseService = {
  // --- SETTINGS (Key-Value) ---
  async getSetting<T>(key: string, defaultValue: T): Promise<T> {
    if (!supabase) return defaultValue;
    try {
      const { data, error } = await supabase
        .from('app_settings')
        .select('value')
        .eq('key', key)
        .single();
      
      if (error || !data) return defaultValue;
      return data.value as T;
    } catch (e) {
      console.error(`Error reading setting ${key}:`, e);
      return defaultValue;
    }
  },

  async setSetting<T>(key: string, value: T): Promise<boolean> {
    if (!supabase) return false;
    try {
      const { error } = await supabase
        .from('app_settings')
        .upsert({ key, value, updated_at: new Date().toISOString() });
      
      if (error) throw error;
      return true;
    } catch (e) {
      console.error(`Error saving setting ${key}:`, e);
      return false;
    }
  },

  // --- PROJECTS ---
  async getProjects(defaultProjects: Project[]): Promise<Project[]> {
    if (!supabase) return defaultProjects;
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('id', { ascending: true });
      if (error) throw error;
      if (!data || data.length === 0) return defaultProjects;
      return data.map((item: any) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        communityId: item.communityId || item.communityid,
        communityName: item.communityName || item.communityname,
        category: item.category,
        status: item.status,
        progress: item.progress,
        budget: item.budget,
        startDate: item.startDate || item.startdate,
        completionDate: item.completionDate || item.completiondate,
        fundingSource: item.fundingSource || item.fundingsource,
        beneficiaries: item.beneficiaries,
        impactSummary: item.impactSummary || item.impactsummary,
        image: item.image,
        videoUrl: item.videoUrl || item.videourl,
        videoType: item.videoType || item.videotype
      })) as Project[];
    } catch (e) {
      console.error('Error fetching projects:', e);
      return defaultProjects;
    }
  },

  async syncProjects(projects: Project[]): Promise<boolean> {
    if (!supabase) return false;
    try {
      const { error } = await supabase
        .from('projects')
        .upsert(projects);
      if (error) throw error;
      return true;
    } catch (e) {
      console.error('Error syncing projects:', e);
      return false;
    }
  },

  async deleteProject(id: string): Promise<boolean> {
    if (!supabase) return false;
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);
      if (error) throw error;
      return true;
    } catch (e) {
      console.error('Error deleting project:', e);
      return false;
    }
  },

  // --- EVENTS ---
  async getEvents(defaultEvents: RoyalEvent[]): Promise<RoyalEvent[]> {
    if (!supabase) return defaultEvents;
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: false });
      if (error) throw error;
      if (!data || data.length === 0) return defaultEvents;
      return data.map((item: any) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        date: item.date,
        time: item.time,
        location: item.location,
        communityId: item.communityId || item.communityid,
        communityName: item.communityName || item.communityname,
        category: item.category,
        imageUrl: item.imageUrl || item.imageurl,
        videoUrl: item.videoUrl || item.videourl,
        videoType: item.videoType || item.videotype
      })) as RoyalEvent[];
    } catch (e) {
      console.error('Error fetching events:', e);
      return defaultEvents;
    }
  },

  async syncEvents(events: RoyalEvent[]): Promise<boolean> {
    if (!supabase) return false;
    try {
      const { error } = await supabase
        .from('events')
        .upsert(events);
      if (error) throw error;
      return true;
    } catch (e) {
      console.error('Error syncing events:', e);
      return false;
    }
  },

  async deleteEvent(id: string): Promise<boolean> {
    if (!supabase) return false;
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);
      if (error) throw error;
      return true;
    } catch (e) {
      console.error('Error deleting event:', e);
      return false;
    }
  },

  // --- GALLERY ---
  async getGallery(defaultGallery: GalleryItem[]): Promise<GalleryItem[]> {
    if (!supabase) return defaultGallery;
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('id', { ascending: false });
      if (error) throw error;
      if (!data || data.length === 0) return defaultGallery;
      return data.map((item: any) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        category: item.category,
        imageUrl: item.imageUrl || item.imageurl
      })) as GalleryItem[];
    } catch (e) {
      console.error('Error fetching gallery:', e);
      return defaultGallery;
    }
  },

  async syncGallery(galleryItems: GalleryItem[]): Promise<boolean> {
    if (!supabase) return false;
    try {
      const { error } = await supabase
        .from('gallery')
        .upsert(galleryItems);
      if (error) throw error;
      return true;
    } catch (e) {
      console.error('Error syncing gallery:', e);
      return false;
    }
  },

  async deleteGalleryItem(id: string): Promise<boolean> {
    if (!supabase) return false;
    try {
      const { error } = await supabase
        .from('gallery')
        .delete()
        .eq('id', id);
      if (error) throw error;
      return true;
    } catch (e) {
      console.error('Error deleting gallery item:', e);
      return false;
    }
  },

  // --- FEEDBACK ---
  async getFeedback(defaultFeedback: FeedbackSubmission[]): Promise<FeedbackSubmission[]> {
    if (!supabase) return defaultFeedback;
    try {
      const { data, error } = await supabase
        .from('feedback')
        .select('*')
        .order('createdAt', { ascending: false });
      if (error) throw error;
      if (!data) return defaultFeedback;
      return data.map((item: any) => ({
        id: item.id,
        name: item.name,
        email: item.email,
        phone: item.phone,
        community: item.community,
        feedbackType: item.feedbackType || item.feedbacktype,
        message: item.message,
        createdAt: item.createdAt || item.createdat,
        isRead: item.isRead !== undefined ? item.isRead : item.isread
      })) as FeedbackSubmission[];
    } catch (e) {
      console.error('Error fetching feedback:', e);
      return defaultFeedback;
    }
  },

  async submitFeedback(submission: FeedbackSubmission): Promise<boolean> {
    if (!supabase) return false;
    try {
      const { error } = await supabase
        .from('feedback')
        .insert(submission);
      if (error) throw error;
      return true;
    } catch (e) {
      console.error('Error submitting feedback to Supabase:', e);
      return false;
    }
  },

  async syncFeedback(feedback: FeedbackSubmission[]): Promise<boolean> {
    if (!supabase) return false;
    try {
      const { error } = await supabase
        .from('feedback')
        .upsert(feedback);
      if (error) throw error;
      return true;
    } catch (e) {
      console.error('Error syncing feedback:', e);
      return false;
    }
  },

  // --- TRADITIONAL LEADERS ---
  async getLeaders(defaultLeaders: TraditionalLeader[]): Promise<TraditionalLeader[]> {
    if (!supabase) return defaultLeaders;
    try {
      const { data, error } = await supabase
        .from('traditional_leaders')
        .select('*')
        .order('id', { ascending: true });
      if (error) throw error;
      if (!data || data.length === 0) return defaultLeaders;
      return data.map((item: any) => ({
        id: item.id,
        role: item.role,
        name: item.name,
        title: item.title,
        avatarUrl: item.avatarUrl || item.avatarurl,
        bio: item.bio
      })) as TraditionalLeader[];
    } catch (e) {
      console.error('Error fetching leaders:', e);
      return defaultLeaders;
    }
  },

  async syncLeaders(leaders: TraditionalLeader[]): Promise<boolean> {
    if (!supabase) return false;
    try {
      const { error } = await supabase
        .from('traditional_leaders')
        .upsert(leaders);
      if (error) throw error;
      return true;
    } catch (e) {
      console.error('Error syncing leaders:', e);
      return false;
    }
  },

  // --- ADVISORY BOARD ---
  async getAdvisoryBoard(defaultBoard: AdvisoryBoardMember[]): Promise<AdvisoryBoardMember[]> {
    if (!supabase) return defaultBoard;
    try {
      const { data, error } = await supabase
        .from('advisory_board')
        .select('*')
        .order('id', { ascending: true });
      if (error) throw error;
      if (!data || data.length === 0) return defaultBoard;
      return data.map((item: any) => ({
        id: item.id,
        name: item.name,
        role: item.role,
        organization: item.organization,
        bio: item.bio,
        imageUrl: item.imageUrl || item.imageurl
      })) as AdvisoryBoardMember[];
    } catch (e) {
      console.error('Error fetching advisory board:', e);
      return defaultBoard;
    }
  },

  async syncAdvisoryBoard(board: AdvisoryBoardMember[]): Promise<boolean> {
    if (!supabase) return false;
    try {
      const { error } = await supabase
        .from('advisory_board')
        .upsert(board);
      if (error) throw error;
      return true;
    } catch (e) {
      console.error('Error syncing advisory board:', e);
      return false;
    }
  },

  // --- ADINKRA PROVERBS ---
  async getProverbs(defaultProverbs: AdinkraProverb[]): Promise<AdinkraProverb[]> {
    if (!supabase) return defaultProverbs;
    try {
      const { data, error } = await supabase
        .from('adinkra_proverbs')
        .select('*');
      if (error) throw error;
      if (!data || data.length === 0) return defaultProverbs;
      return data as AdinkraProverb[];
    } catch (e) {
      console.error('Error fetching proverbs:', e);
      return defaultProverbs;
    }
  },

  async syncProverbs(proverbs: AdinkraProverb[]): Promise<boolean> {
    if (!supabase) return false;
    try {
      const { error } = await supabase
        .from('adinkra_proverbs')
        .upsert(proverbs);
      if (error) throw error;
      return true;
    } catch (e) {
      console.error('Error syncing proverbs:', e);
      return false;
    }
  },

  // --- COMMUNITIES ---
  async getCommunities(defaultComms: Community[]): Promise<Community[]> {
    if (!supabase) return defaultComms;
    try {
      const { data, error } = await supabase
        .from('communities')
        .select('*')
        .order('id', { ascending: true });
      if (error) throw error;
      if (!data || data.length === 0) return defaultComms;
      return data.map((item: any) => ({
        id: item.id,
        name: item.name,
        desc: item.desc,
        population: item.population,
        keyProjectsCount: item.keyProjectsCount !== undefined ? item.keyProjectsCount : item.keyprojectscount,
        chiefProfile: item.chiefProfile || item.chiefprofile,
        queenProfile: item.queenProfile || item.queenprofile,
        coordinates: item.coordinates
      })) as Community[];
    } catch (e) {
      console.error('Error fetching communities:', e);
      return defaultComms;
    }
  },

  async syncCommunities(comms: Community[]): Promise<boolean> {
    if (!supabase) return false;
    try {
      const { error } = await supabase
        .from('communities')
        .upsert(comms);
      if (error) throw error;
      return true;
    } catch (e) {
      console.error('Error syncing communities:', e);
      return false;
    }
  },

  // --- STORAGE FILE UPLOADS ---
  async uploadFile(file: File, folder: string = 'media'): Promise<string | null> {
    if (!supabase) {
      console.error('Supabase is not configured. Cannot upload file.');
      return null;
    }
    try {
      // Create a unique file path within the bucket
      const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const uniquePath = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 8)}-${cleanFileName}`;

      const { data, error } = await supabase.storage
        .from('njnkosuo')
        .upload(uniquePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) {
        console.error('Supabase Storage upload error:', error);
        throw error;
      }

      // Retrieve the public URL for the uploaded item
      const { data: publicUrlData } = supabase.storage
        .from('njnkosuo')
        .getPublicUrl(uniquePath);

      if (!publicUrlData || !publicUrlData.publicUrl) {
        throw new Error('Could not get public URL from storage.');
      }

      return publicUrlData.publicUrl;
    } catch (e) {
      console.error('Exception in uploadFile service:', e);
      return null;
    }
  }
};
