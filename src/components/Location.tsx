import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { MapPin, Phone, Calendar, Clock, Users, Mail, User, CheckCircle2 } from 'lucide-react';

export default function Location() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    guests: '2',
    date: '',
    time: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const mapRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Reveal map & form on scroll
    gsap.from(mapRef.current, {
      opacity: 0,
      x: -40,
      duration: 1,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    gsap.from(formRef.current, {
      opacity: 0,
      x: 40,
      duration: 1,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });
  }, { scope: containerRef });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate API request
    gsap.to(formRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      onComplete: () => {
        setIsSubmitted(true);
        // Animate success checkmark pop
        setTimeout(() => {
          gsap.fromTo(
            '#success-message',
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.5)' }
          );
        }, 50);
      }
    });
  };

  return (
    <section
      id="location"
      ref={containerRef}
      className="py-16 md:py-24 bg-bg-base border-t border-border-base transition-colors duration-300 relative overflow-hidden"
    >
      {/* Background visual helpers */}
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/2 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Styled Vector Map & Shop Info */}
          <div ref={mapRef} className="lg:col-span-6 flex flex-col gap-8">
            <div>
              <span className="text-xs uppercase tracking-widest text-primary font-bold inline-flex items-center gap-1.5 mb-2">
                <MapPin className="w-3.5 h-3.5" /> Find Us
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-text-base mb-4">
                TOKYO <span className="text-secondary">ALLEYWAYS</span>
              </h2>
              <p className="text-text-muted font-light leading-relaxed max-w-md">
                Find our cozy shop in the backstreets of Shinjuku. Only 12 counter stools available. Slurping sounds are our compass.
              </p>
            </div>

            {/* Stylized Vector Map representation */}
            <div className="relative w-full h-[280px] bg-surface-base border border-border-base overflow-hidden flex justify-center items-center shadow-xl">
              {/* Map grid lines */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.01)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />
              
              {/* Tokyo neon roads representation */}
              <svg viewBox="0 0 400 240" className="w-full h-full opacity-70" fill="none">
                {/* Roads */}
                <path d="M-20 60 L 420 60" className="stroke-border-base/40 dark:stroke-[#1F2937]" strokeWidth="12" />
                <path d="M120 -20 L 120 260" className="stroke-border-base/40 dark:stroke-[#1F2937]" strokeWidth="16" />
                <path d="M280 -20 L 280 260" className="stroke-border-base/40 dark:stroke-[#1F2937]" strokeWidth="12" />
                <path d="M-20 180 L 420 180" className="stroke-border-base/40 dark:stroke-[#1F2937]" strokeWidth="14" />
                
                {/* Glowing neon paths (Shinjuku alleys) */}
                <path d="M120 60 L 280 60" stroke="#FF3B30" strokeWidth="2" opacity="0.8" className="steam-path-1" />
                <path d="M120 60 L 120 180" stroke="#00F5FF" strokeWidth="2.5" opacity="0.8" className="steam-path-2" />
                <path d="M120 180 L 280 180" stroke="#FFB800" strokeWidth="2" opacity="0.8" className="steam-path-3" />
                
                {/* Blocks */}
                <rect x="20" y="80" width="80" height="80" rx="4" className="fill-surface-base dark:fill-[#0f0f13] stroke-border-base dark:stroke-[#2D3748]" strokeWidth="1" />
                <rect x="140" y="80" width="120" height="80" rx="4" className="fill-surface-base dark:fill-[#0f0f13] stroke-border-base dark:stroke-[#2D3748]" strokeWidth="1" />
                <rect x="300" y="80" width="80" height="80" rx="4" className="fill-surface-base dark:fill-[#0f0f13] stroke-border-base dark:stroke-[#2D3748]" strokeWidth="1" />
                
                {/* The Shop Pin point */}
                <circle cx="200" cy="120" r="8" fill="#FF3B30" />
                <circle cx="200" cy="120" r="16" stroke="#FF3B30" strokeWidth="2" opacity="0.6" className="animate-ping" />
                <path d="M200 120 L 200 100" stroke="#FF3B30" strokeWidth="2" />
              </svg>

              {/* Float Map Overlay Label */}
              <div className="absolute bottom-4 left-4 bg-surface-base/95 dark:bg-black/85 border border-primary/30 dark:border-primary/20 px-3 py-1.5 text-[10px] tracking-wider uppercase font-semibold text-text-base flex items-center gap-1.5 shadow-[0_4px_15px_rgba(255,59,48,0.08)] dark:shadow-[0_0_15px_rgba(255,59,48,0.15)]">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                1-Chome, Kabukicho, Shinjuku, Tokyo
              </div>
            </div>

            {/* Quick Details Table */}
            <div className="grid grid-cols-2 gap-6 bg-surface-base/50 border border-border-base p-6 shadow-md">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-text-muted block mb-1">
                  Opening Hours
                </span>
                <span className="text-sm font-semibold text-text-base block">
                  Mon - Sat: 5:00 PM - 2:00 AM
                </span>
                <span className="text-xs text-primary/70 font-semibold block mt-0.5">
                  Sunday: Closed
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-text-muted block mb-1">
                  Contact
                </span>
                <span className="text-sm font-semibold text-text-base block flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-secondary" />
                  +81 3-1234-5678
                </span>
                <span className="text-xs text-text-muted block mt-0.5">
                  reservations@ichiraku.jp
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Reservation Form */}
          <div className="lg:col-span-6">
            <div className="bg-surface-base border border-border-base p-8 md:p-12 shadow-2xl relative min-h-[480px] flex items-center justify-center">
              
              {!isSubmitted ? (
                <form ref={formRef} onSubmit={handleSubmit} className="w-full space-y-6">
                  <div className="mb-6">
                    <h3 className="font-serif text-2xl font-bold tracking-tight text-text-base mb-2">
                      RESERVE A STOOL
                    </h3>
                    <p className="text-xs text-text-muted tracking-wide leading-relaxed">
                      Due to extremely limited seating (12 seats), we release counter stools up to 14 days in advance.
                    </p>
                  </div>

                  {/* Name Input */}
                  <div className="space-y-1.5 relative">
                    <label className="text-[10px] uppercase tracking-widest text-text-muted font-bold flex items-center gap-1">
                      <User className="w-3 h-3 text-primary" /> Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Kenji Sato"
                      className="w-full bg-bg-base/60 border border-border-base px-4 py-3 text-sm text-text-base focus:outline-none focus:border-primary transition-all duration-300 rounded-none"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5 relative">
                    <label className="text-[10px] uppercase tracking-widest text-text-muted font-bold flex items-center gap-1">
                      <Mail className="w-3 h-3 text-primary" /> Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="kenji@tokyo.jp"
                      className="w-full bg-bg-base/60 border border-border-base px-4 py-3 text-sm text-text-base focus:outline-none focus:border-primary transition-all duration-300 rounded-none"
                    />
                  </div>

                  {/* Guests & Date & Time Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Guests Select */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-widest text-text-muted font-bold flex items-center gap-1">
                        <Users className="w-3 h-3 text-secondary" /> Guests
                      </label>
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        className="w-full bg-bg-base/60 border border-border-base px-3 py-3 text-sm text-text-base focus:outline-none focus:border-secondary transition-all duration-300 rounded-none cursor-pointer"
                      >
                        <option value="1">1 Stool</option>
                        <option value="2">2 Stools</option>
                        <option value="4">4 Stools (Max)</option>
                      </select>
                    </div>

                    {/* Date Picker */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-widest text-text-muted font-bold flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-secondary" /> Date
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-bg-base/60 border border-border-base px-3 py-3 text-sm text-text-base focus:outline-none focus:border-secondary transition-all duration-300 rounded-none cursor-pointer"
                      />
                    </div>

                    {/* Time Picker */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-widest text-text-muted font-bold flex items-center gap-1">
                        <Clock className="w-3 h-3 text-secondary" /> Time
                      </label>
                      <select
                        required
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full bg-bg-base/60 border border-border-base px-3 py-3 text-sm text-text-base focus:outline-none focus:border-secondary transition-all duration-300 rounded-none cursor-pointer"
                      >
                        <option value="">Select Time</option>
                        <option value="17:00">5:00 PM</option>
                        <option value="18:30">6:30 PM</option>
                        <option value="20:00">8:00 PM</option>
                        <option value="21:30">9:30 PM</option>
                        <option value="23:00">11:00 PM</option>
                      </select>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 bg-secondary text-dark-bg dark:text-dark-bg font-semibold uppercase tracking-widest text-xs transition-all duration-300 hover:bg-secondary/90 hover:scale-[1.01] border-neon-gold cursor-pointer"
                  >
                    Confirm Stool Request
                  </button>
                </form>
              ) : (
                <div id="success-message" className="text-center space-y-6 max-w-sm">
                  <div className="flex justify-center">
                    <CheckCircle2 className="w-16 h-16 text-secondary animate-bounce" />
                  </div>
                  <h3 className="font-serif text-3xl font-bold tracking-tight text-text-base">
                    STOOL REQUESTED!
                  </h3>
                  <p className="text-sm text-text-muted font-light leading-relaxed">
                    Thank you, <span className="text-text-base font-semibold">{formData.name}</span>. We've received your request for <span className="text-secondary font-semibold">{formData.guests} stool(s)</span> on <span className="text-text-base font-semibold">{formData.date}</span> at <span className="text-secondary font-semibold">{formData.time}</span>. A verification email has been dispatched.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', email: '', guests: '2', date: '', time: '' });
                    }}
                    className="px-6 py-2 border border-border-base hover:border-primary text-text-base hover:text-primary text-xs uppercase tracking-widest font-semibold transition-colors duration-300 cursor-pointer"
                  >
                    Make Another Booking
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
