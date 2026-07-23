import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChefHat, Waves, Heart, FlameKindling } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Pillar {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  bgGlow: string;
  color: string;
  svgGlow: string;
}

export default function CraftSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const pillars: Pillar[] = [
    {
      id: 'broth',
      num: '01',
      title: 'THE BROTH',
      subtitle: '20-Hour Slow Simmer',
      description: 'The foundation of our ramen. We simmer pork bones, chicken backs, and dashi kelp for 20 hours at a rolling boil to completely emulsify collagen and marrow, yielding a velvety, full-bodied soup rich in umami.',
      icon: <FlameKindling className="w-6 h-6 text-primary" />,
      bgGlow: 'rgba(255, 59, 48, 0.1)',
      color: '#FF3B30',
      svgGlow: 'url(#glow-broth)'
    },
    {
      id: 'noodles',
      num: '02',
      title: 'THE NOODLE',
      subtitle: 'House-Pulled Fresh Daily',
      description: 'Elasticity, texture, and absorption are fine-tuned. We craft our noodles daily in-house using organic wheat flour and alkaline water (Kansui), achieving the perfect chewy bite that holds the rich soup.',
      icon: <Waves className="w-6 h-6 text-secondary" />,
      bgGlow: 'rgba(255, 184, 0, 0.1)',
      color: '#FFB800',
      svgGlow: 'url(#glow-noodles)'
    },
    {
      id: 'tare',
      num: '03',
      title: 'THE TARE',
      subtitle: 'Secret Seasoning Blend',
      description: 'The soul defining the style. Our tare (seasoning sauce) is formulated with double-fermented shoyu, sea salt, mirin, and dried kombu, cured for weeks in cedar wood vessels to develop a sharp, complex finish.',
      icon: <Heart className="w-6 h-6 text-accent" />,
      bgGlow: 'rgba(0, 245, 255, 0.1)',
      color: '#00F5FF',
      svgGlow: 'url(#glow-tare)'
    }
  ];

  useGSAP(() => {
    // Stagger animation for section header
    gsap.from('#craft-header > *', {
      opacity: 0,
      y: 30,
      stagger: 0.15,
      scrollTrigger: {
        trigger: '#craft-header',
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });

    // Create a pinning ScrollTrigger for the split-screen experience on large viewports
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      // Pin the left graphic column while scrolling the right text column
      ScrollTrigger.create({
        trigger: triggerRef.current,
        start: 'top 15%',
        end: 'bottom 85%',
        pin: leftColumnRef.current,
        scrub: true,
        invalidateOnRefresh: true,
      });

      // Animate text sections as they scroll in
      pillars.forEach((pillar) => {
        gsap.fromTo(
          `#card-${pillar.id}`,
          { opacity: 0.2, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            scrollTrigger: {
              trigger: `#card-${pillar.id}`,
              start: 'top 75%',
              end: 'top 25%',
              toggleActions: 'play reverse play reverse',
            }
          }
        );

        // Map active graphic changes
        gsap.to(`#graphic-${pillar.id}`, {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          scrollTrigger: {
            trigger: `#card-${pillar.id}`,
            start: 'top 60%',
            end: 'bottom 40%',
            toggleActions: 'play reverse play reverse',
          }
        });
      });
    });

    // Fallback for tablet/mobile: standard scroll fades
    mm.add('(max-width: 1023px)', () => {
      pillars.forEach((pillar) => {
        gsap.from(`#card-${pillar.id}`, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          scrollTrigger: {
            trigger: `#card-${pillar.id}`,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        });
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section
      id="craft"
      ref={containerRef}
      className="py-16 md:py-24 bg-surface-base border-t border-border-base transition-colors duration-300 relative overflow-hidden"
    >
      {/* Background glow grids */}
      <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-primary/2 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div id="craft-header" className="text-center mb-20">
          <span className="text-xs uppercase tracking-widest text-primary font-bold inline-flex items-center gap-1.5 mb-2">
            <ChefHat className="w-3.5 h-3.5" /> Culinary Science
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-text-base">
            THE THREE <span className="text-secondary">PILLARS</span> OF CRAFT
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mt-4" />
        </div>

        {/* Scroll Trigger Container */}
        <div ref={triggerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative">
          
          {/* Left Side: Sticky Visual Container */}
          <div
            ref={leftColumnRef}
            className="hidden lg:flex lg:col-span-6 h-[400px] justify-center items-center relative overflow-hidden bg-bg-base/40 dark:bg-black/40 border border-border-base shadow-2xl"
          >
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-radial from-white/1 to-transparent dark:from-white/1" />

            {/* Pillar 1 Graphic: Broth pot simmering */}
            <div
              id="graphic-broth"
              className="absolute inset-0 flex justify-center items-center opacity-0 scale-90 transition-all duration-500"
            >
              {/* Giant Steaming Pot SVG */}
              <svg viewBox="0 0 300 300" className="w-64 h-64 overflow-visible" fill="none">
                <circle cx="150" cy="170" r="80" fill="url(#pot-body)" />
                <path d="M70 170 C 70 230, 230 230, 230 170" stroke="#FF3B30" strokeWidth="4" />
                {/* Boiling bubbles */}
                <circle cx="110" cy="180" r="6" fill="#FFB800" opacity="0.3" />
                <circle cx="190" cy="190" r="10" fill="#FFB800" opacity="0.4" />
                <circle cx="140" cy="200" r="8" fill="#FFB800" opacity="0.2" />
                <circle cx="165" cy="165" r="5" fill="#FFB800" opacity="0.5" />
                {/* Handles */}
                <path d="M60 150 C 40 150, 40 180, 60 180" stroke="#71717A" strokeWidth="6" fill="none" />
                <path d="M240 150 C 260 150, 260 180, 240 180" stroke="#71717A" strokeWidth="6" fill="none" />
                {/* Rim */}
                <ellipse cx="150" cy="140" rx="90" ry="15" fill="#3F3F46" />
                <ellipse cx="150" cy="140" rx="85" ry="12" fill="#18181B" />
                {/* Steams */}
                <path d="M120 120 C 115 100, 130 90, 125 70 C 120 60, 130 50, 125 40" stroke="#FF3B30" strokeWidth="2.5" strokeLinecap="round" className="steam-path-1" opacity="0.5" />
                <path d="M150 120 C 155 100, 140 90, 155 70 C 160 60, 150 50, 155 40" stroke="#FFB800" strokeWidth="3" strokeLinecap="round" className="steam-path-2" opacity="0.6" />
                <path d="M180 120 C 175 100, 190 90, 185 70 C 180 60, 190 50, 185 40" stroke="#FF3B30" strokeWidth="2" strokeLinecap="round" className="steam-path-3" opacity="0.5" />
              </svg>
            </div>

            {/* Pillar 2 Graphic: Noodle pulling */}
            <div
              id="graphic-noodles"
              className="absolute inset-0 flex justify-center items-center opacity-0 scale-90 transition-all duration-500"
            >
              {/* Hand Noodle Pulling SVG */}
              <svg viewBox="0 0 300 300" className="w-64 h-64 overflow-visible" fill="none">
                {/* Wave style noodles representing elastic stretch */}
                <path d="M50 100 C 100 130, 200 70, 250 100" stroke="#FFD875" strokeWidth="5.5" strokeLinecap="round" />
                <path d="M40 120 C 95 155, 190 95, 260 125" stroke="#FFD875" strokeWidth="4.5" strokeLinecap="round" />
                <path d="M55 140 C 110 170, 210 110, 245 140" stroke="#FFD875" strokeWidth="6" strokeLinecap="round" />
                <path d="M35 160 C 90 195, 180 135, 265 165" stroke="#FFD875" strokeWidth="5" strokeLinecap="round" />
                <path d="M45 180 C 105 210, 200 150, 255 180" stroke="#FFD875" strokeWidth="4" strokeLinecap="round" />
                {/* Flour particles */}
                <circle cx="80" cy="110" r="2" fill="white" opacity="0.6" />
                <circle cx="160" cy="140" r="1.5" fill="white" opacity="0.5" />
                <circle cx="210" cy="160" r="2.5" fill="white" opacity="0.8" />
                <circle cx="120" cy="180" r="2" fill="white" opacity="0.4" />
              </svg>
            </div>

            {/* Pillar 3 Graphic: The Tare blends */}
            <div
              id="graphic-tare"
              className="absolute inset-0 flex justify-center items-center opacity-0 scale-90 transition-all duration-500"
            >
              {/* Secret Sauce Vessel SVG */}
              <svg viewBox="0 0 300 300" className="w-64 h-64 overflow-visible" fill="none">
                {/* Tilted Pitcher Group */}
                <g className="pitcher-pour-group">
                  {/* Ceramic Pitcher pouring secret liquid */}
                  <path d="M120 80 L 180 80 L 190 180 C 190 220, 110 220, 110 180 Z" fill="#2E201B" stroke="#00F5FF" strokeWidth="2.5" />
                  <ellipse cx="150" cy="80" rx="30" ry="8" fill="#18181B" stroke="#71717A" />
                  {/* Spout */}
                  <path d="M110 90 L 80 110 L 115 120 Z" fill="#2E201B" />
                </g>

                {/* Liquid Stream pouring down */}
                <path d="M85 108 C 75 140, 75 220, 150 250" stroke="#00F5FF" strokeWidth="5" strokeLinecap="round" className="tare-liquid-stream" />
                <path d="M85 108 C 75 140, 75 220, 150 250" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" className="tare-liquid-stream" opacity="0.7" />
                
                {/* Splashes & Ripples */}
                <circle cx="150" cy="250" r="10" stroke="#00F5FF" strokeWidth="1.5" className="splash-ripple-1" fill="none" />
                <circle cx="150" cy="250" r="10" stroke="#00F5FF" strokeWidth="1.5" className="splash-ripple-2" fill="none" />
                <circle cx="110" cy="245" r="4.5" fill="#00F5FF" />
                <circle cx="155" cy="240" r="3" fill="#00F5FF" />
              </svg>
            </div>
            
            {/* Gradients defs */}
            <defs>
              <linearGradient id="pot-body" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1E1C1B" />
                <stop offset="100%" stopColor="#2D120B" />
              </linearGradient>
            </defs>
          </div>

          {/* Right Side: Scrolling Text Columns */}
          <div className="lg:col-span-6 flex flex-col gap-12 lg:gap-24 py-10">
            {pillars.map((pillar) => (
              <div
                key={pillar.id}
                id={`card-${pillar.id}`}
                className="bg-bg-base/40 border border-border-base hover:border-border-base/80 transition-all duration-300 p-8 md:p-12 shadow-xl relative"
              >
                {/* Custom glowing indicator line */}
                <div
                  className="absolute top-0 left-0 w-1.5 h-full"
                  style={{ backgroundColor: pillar.color }}
                />

                {/* Corner Number */}
                <span
                  className="absolute top-6 right-8 font-serif text-3xl font-bold tracking-wider select-none"
                  style={{ color: `${pillar.color}20` }}
                >
                  {pillar.num}
                </span>

                {/* Icon wrapper */}
                <div
                  className="w-12 h-12 flex items-center justify-center rounded-none mb-6 border border-border-base"
                  style={{ backgroundColor: pillar.bgGlow }}
                >
                  {pillar.icon}
                </div>

                {/* Visual Graphic on Mobile */}
                <div className="lg:hidden h-[200px] flex justify-center items-center relative overflow-hidden bg-bg-base/20 dark:bg-black/20 border border-border-base/50 mb-6 shadow-inner">
                  <div className="absolute inset-0 bg-radial from-white/1 to-transparent dark:from-white/1" />
                  {pillar.id === 'broth' && (
                    <svg viewBox="0 0 300 300" className="w-48 h-48 overflow-visible" fill="none">
                      <circle cx="150" cy="170" r="80" fill="url(#pot-body)" />
                      <path d="M70 170 C 70 230, 230 230, 230 170" stroke="#FF3B30" strokeWidth="4" />
                      <circle cx="110" cy="180" r="6" fill="#FFB800" opacity="0.3" />
                      <circle cx="190" cy="190" r="10" fill="#FFB800" opacity="0.4" />
                      <circle cx="140" cy="200" r="8" fill="#FFB800" opacity="0.2" />
                      <circle cx="165" cy="165" r="5" fill="#FFB800" opacity="0.5" />
                      <path d="M60 150 C 40 150, 40 180, 60 180" stroke="#71717A" strokeWidth="6" fill="none" />
                      <path d="M240 150 C 260 150, 260 180, 240 180" stroke="#71717A" strokeWidth="6" fill="none" />
                      <ellipse cx="150" cy="140" rx="90" ry="15" fill="#3F3F46" />
                      <ellipse cx="150" cy="140" rx="85" ry="12" fill="#18181B" />
                      <path d="M120 120 C 115 100, 130 90, 125 70 C 120 60, 130 50, 125 40" stroke="#FF3B30" strokeWidth="2.5" strokeLinecap="round" className="steam-path-1" opacity="0.5" />
                      <path d="M150 120 C 155 100, 140 90, 155 70 C 160 60, 150 50, 155 40" stroke="#FFB800" strokeWidth="3" strokeLinecap="round" className="steam-path-2" opacity="0.6" />
                      <path d="M180 120 C 175 100, 190 90, 185 70 C 180 60, 190 50, 185 40" stroke="#FF3B30" strokeWidth="2" strokeLinecap="round" className="steam-path-3" opacity="0.5" />
                    </svg>
                  )}
                  {pillar.id === 'noodles' && (
                    <svg viewBox="0 0 300 300" className="w-48 h-48 overflow-visible" fill="none">
                      <path d="M50 100 C 100 130, 200 70, 250 100" stroke="#FFD875" strokeWidth="5.5" strokeLinecap="round" />
                      <path d="M40 120 C 95 155, 190 95, 260 125" stroke="#FFD875" strokeWidth="4.5" strokeLinecap="round" />
                      <path d="M55 140 C 110 170, 210 110, 245 140" stroke="#FFD875" strokeWidth="6" strokeLinecap="round" />
                      <path d="M35 160 C 90 195, 180 135, 265 165" stroke="#FFD875" strokeWidth="5" strokeLinecap="round" />
                      <path d="M45 180 C 105 210, 200 150, 255 180" stroke="#FFD875" strokeWidth="4" strokeLinecap="round" />
                      <circle cx="80" cy="110" r="2" fill="currentColor" className="text-text-base/[0.4] dark:text-white/[0.6]" />
                      <circle cx="160" cy="140" r="1.5" fill="currentColor" className="text-text-base/[0.4] dark:text-white/[0.6]" />
                      <circle cx="210" cy="160" r="2.5" fill="currentColor" className="text-text-base/[0.4] dark:text-white/[0.6]" />
                    </svg>
                  )}
                  {pillar.id === 'tare' && (
                    <svg viewBox="0 0 300 300" className="w-48 h-48 overflow-visible" fill="none">
                      {/* Tilted Pitcher Group */}
                      <g className="pitcher-pour-group">
                        <path d="M120 80 L 180 80 L 190 180 C 190 220, 110 220, 110 180 Z" fill="#2E201B" stroke="#00F5FF" strokeWidth="2.5" />
                        <ellipse cx="150" cy="80" rx="30" ry="8" fill="#18181B" stroke="#71717A" />
                        <path d="M110 90 L 80 110 L 115 120 Z" fill="#2E201B" />
                      </g>

                      {/* Liquid Stream pouring down */}
                      <path d="M85 108 C 75 140, 75 220, 150 250" stroke="#00F5FF" strokeWidth="5" strokeLinecap="round" className="tare-liquid-stream" />
                      <path d="M85 108 C 75 140, 75 220, 150 250" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" className="tare-liquid-stream" opacity="0.7" />
                      
                      {/* Splashes & Ripples */}
                      <circle cx="150" cy="250" r="10" stroke="#00F5FF" strokeWidth="1.5" className="splash-ripple-1" fill="none" />
                      <circle cx="150" cy="250" r="10" stroke="#00F5FF" strokeWidth="1.5" className="splash-ripple-2" fill="none" />
                      <circle cx="110" cy="245" r="4.5" fill="#00F5FF" />
                      <circle cx="155" cy="240" r="3" fill="#00F5FF" />
                    </svg>
                  )}
                </div>

                {/* Subtitle */}
                <span
                  className="text-xs font-semibold uppercase tracking-widest block mb-2"
                  style={{ color: pillar.color }}
                >
                  {pillar.subtitle}
                </span>

                {/* Title */}
                <h3 className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-text-base mb-4">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="text-text-muted font-light leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
