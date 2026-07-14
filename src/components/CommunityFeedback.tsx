import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  Send, 
  CheckCircle, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  AlertTriangle,
  Lightbulb,
  FileQuestion,
  Heart,
  Sparkles
} from 'lucide-react';
import { Community, FeedbackSubmission } from '../types';

interface CommunityFeedbackProps {
  communities: Community[];
  onSubmitFeedback: (newFeedback: FeedbackSubmission) => void;
}

export default function CommunityFeedback({ communities, onSubmitFeedback }: CommunityFeedbackProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState('');
  const [feedbackType, setFeedbackType] = useState<'suggestion' | 'project_request' | 'complaint' | 'appreciation'>('suggestion');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validations
    if (!name.trim()) {
      setError('Please provide your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!selectedCommunity) {
      setError('Please select your divisional community.');
      return;
    }
    if (!message.trim()) {
      setError('Please type your message.');
      return;
    }

    setIsSubmitting(true);

    // Simulate standard submission transition
    setTimeout(() => {
      const submission: FeedbackSubmission = {
        id: 'fb_' + Math.random().toString(36).substr(2, 9),
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        community: selectedCommunity,
        feedbackType,
        message: message.trim(),
        createdAt: new Date().toISOString(),
        isRead: false
      };

      onSubmitFeedback(submission);
      setIsSubmitting(false);
      setSubmitted(true);

      // Reset form fields
      setName('');
      setEmail('');
      setPhone('');
      setSelectedCommunity('');
      setFeedbackType('suggestion');
      setMessage('');
    }, 1200);
  };

  const getFeedbackIcon = (type: string) => {
    switch (type) {
      case 'suggestion':
        return <Lightbulb className="w-4 h-4 text-amber-400" />;
      case 'project_request':
        return <FileQuestion className="w-4 h-4 text-blue-400" />;
      case 'complaint':
        return <AlertTriangle className="w-4 h-4 text-red-400" />;
      case 'appreciation':
        return <Heart className="w-4 h-4 text-emerald-400" />;
      default:
        return <MessageSquare className="w-4 h-4 text-[#D4AF37]" />;
    }
  };

  return (
    <section id="feedback" className="py-24 bg-neutral-900 relative overflow-hidden border-t border-neutral-950">
      {/* Decorative Traditional Patterns & Glow */}
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-10 w-80 h-80 bg-[#990000]/5 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Kente accent borders */}
      <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-[#990000] via-[#D4AF37] to-[#990000] opacity-60" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-sans font-black tracking-[0.25em] text-[#D4AF37] uppercase bg-[#990000]/20 border border-[#990000]/30 px-4 py-1.5 rounded-full">
            Citizen Suggestion Portal
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-sans font-bold tracking-tight text-white uppercase">
            Community Voice &amp; Feedback
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-[#990000] to-[#D4AF37] mx-auto mt-6 rounded-full" />
          <p className="mt-4 text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
            Under the direction of the Omanhene Daasebre Kwaku Boateng III, the Royal Council actively listens to the citizens of New Juaben. Lodge your proposals, project recommendations, grievances, or messages of appreciation directly into the official portfolio.
          </p>
        </div>

        {/* Content Splitting Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Traditional Guidelines / Contact */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-neutral-950/80 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <h3 className="text-sm font-sans font-black text-white uppercase tracking-wider flex items-center">
                <Sparkles className="w-5 h-5 text-[#D4AF37] mr-2" /> Council Feedback Ethos
              </h3>
              
              <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                Every entry is logged, reviewed by the Nkosuo divisional development board, and dispatched to the respective Divisional Chiefs and Queens for strategic consideration.
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-3.5">
                  <div className="p-2 rounded bg-neutral-900 border border-neutral-800 text-[#D4AF37] flex-shrink-0">
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-sans font-black text-white uppercase">Socio-Development Suggestions</h4>
                    <p className="text-[11px] text-neutral-400 mt-1">Submit novel ideas on expanding municipal hygiene, digital schools, market clinics, or cultural workshops.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="p-2 rounded bg-neutral-900 border border-neutral-800 text-[#D4AF37] flex-shrink-0">
                    <FileQuestion className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-sans font-black text-white uppercase">Development (Nkosuo) Requests</h4>
                    <p className="text-[11px] text-neutral-400 mt-1">Request technical projects or critical assets like boreholes, computerized labs, or road paving in your local seat.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="p-2 rounded bg-neutral-900 border border-neutral-800 text-[#D4AF37] flex-shrink-0">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-sans font-black text-white uppercase">Citizen Appreciation</h4>
                    <p className="text-[11px] text-neutral-400 mt-1">Acknowledge outstanding community service, traditional events, or the works of your Divisional Chiefs.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800/60 text-center">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block">
                  New Juaben Traditional Council
                </span>
                <span className="text-[9px] font-mono text-[#D4AF37]/60 block mt-1">
                  Koforidua • Eastern Region • Ghana
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Form */}
          <div className="lg:col-span-7">
            <div className="bg-neutral-950 border border-neutral-800/80 rounded-2xl p-6 sm:p-8 relative">
              
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form 
                    key="feedback-form"
                    onSubmit={handleSubmit} 
                    className="space-y-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {error && (
                      <div className="p-3 bg-red-900/25 border border-red-800/50 rounded-xl text-red-200 text-xs font-sans flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-2 text-red-400 flex-shrink-0" />
                        {error}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div>
                        <label className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-2 flex items-center">
                          <User className="w-3 h-3 text-[#D4AF37] mr-1.5" /> Full Name <span className="text-red-500 ml-0.5">*</span>
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Kofi Antwi"
                          className="w-full bg-neutral-900 border border-neutral-800 focus:border-[#D4AF37] hover:border-neutral-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none transition-all font-sans"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-2 flex items-center">
                          <Mail className="w-3 h-3 text-[#D4AF37] mr-1.5" /> Email Address <span className="text-red-500 ml-0.5">*</span>
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="kofi@example.com"
                          className="w-full bg-neutral-900 border border-neutral-800 focus:border-[#D4AF37] hover:border-neutral-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none transition-all font-sans"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Phone (Optional) */}
                      <div>
                        <label className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-2 flex items-center">
                          <Phone className="w-3 h-3 text-[#D4AF37] mr-1.5" /> Phone (Optional)
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+233 24 000 0000"
                          className="w-full bg-neutral-900 border border-neutral-800 focus:border-[#D4AF37] hover:border-neutral-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none transition-all font-sans"
                        />
                      </div>

                      {/* Divisional Community Dropdown */}
                      <div>
                        <label className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-2 flex items-center">
                          <MapPin className="w-3 h-3 text-[#D4AF37] mr-1.5" /> Divisional Area <span className="text-red-500 ml-0.5">*</span>
                        </label>
                        <select
                          value={selectedCommunity}
                          onChange={(e) => setSelectedCommunity(e.target.value)}
                          className="w-full bg-neutral-900 border border-neutral-800 focus:border-[#D4AF37] hover:border-neutral-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none transition-all font-sans appearance-none"
                        >
                          <option value="">-- Choose Community --</option>
                          {communities.map((c) => (
                            <option key={c.id} value={c.name}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Feedback Type Selection */}
                    <div>
                      <label className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-2.5">
                        Nature of Dispatch <span className="text-red-500 ml-0.5">*</span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {(['suggestion', 'project_request', 'complaint', 'appreciation'] as const).map((type) => {
                          const active = feedbackType === type;
                          return (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setFeedbackType(type)}
                              className={`flex items-center justify-center space-x-1.5 px-3 py-2 border rounded-xl text-[10px] font-sans font-black uppercase tracking-wider transition-all cursor-pointer ${
                                active 
                                  ? 'bg-[#990000]/15 border-[#D4AF37] text-white shadow-md' 
                                  : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-white'
                              }`}
                            >
                              {getFeedbackIcon(type)}
                              <span>{type.replace('_', ' ')}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-[10px] font-sans font-black text-neutral-400 uppercase tracking-wider mb-2">
                        Message / Lodge Details <span className="text-red-500 ml-0.5">*</span>
                      </label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Detail your request, recommendation or message here to the Council..."
                        rows={5}
                        className="w-full bg-neutral-900 border border-neutral-800 focus:border-[#D4AF37] hover:border-neutral-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none transition-all font-sans resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-red-800 to-[#990000] hover:from-[#990000] hover:to-red-700 text-white font-sans font-black text-xs uppercase tracking-[0.15em] py-3.5 rounded-xl transition-all flex items-center justify-center space-x-2 border border-red-700/50 hover:border-[#D4AF37]/50 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>LODGING TO ARCHIVES...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>SUBMIT DISPATCH TO COUNCIL</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="feedback-success"
                    className="py-12 px-4 text-center space-y-6"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', damping: 20 }}
                  >
                    <div className="w-16 h-16 bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] rounded-full flex items-center justify-center mx-auto shadow-inner animate-bounce">
                      <CheckCircle className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-sans font-black text-white uppercase tracking-wider">
                        Dispatch Successfully Lodged!
                      </h3>
                      <p className="text-xs text-neutral-400 font-sans max-w-md mx-auto leading-relaxed">
                        Akyire! Your voice has been securely filed into the New Juaben Council archive. The development committee is immediately notified.
                      </p>
                    </div>

                    <div className="p-4 bg-neutral-900 border border-neutral-800/80 rounded-xl max-w-sm mx-auto text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                      Reference ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
                    </div>

                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 bg-neutral-900 border border-neutral-800 hover:border-[#D4AF37] rounded-xl text-[10px] font-sans font-black uppercase tracking-wider text-[#D4AF37] transition-all cursor-pointer"
                    >
                      Lodge Another Dispatch
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
