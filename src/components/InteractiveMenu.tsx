import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Sparkles, Activity, Eye, Zap } from 'lucide-react';

interface Ingredient {
  name: string;
  iconKey: string;
}

interface Bowl {
  id: string;
  name: string;
  jpName: string;
  description: string;
  broth: string;
  noodle: string;
  egg: string;
  price: string;
  accentClass: string;
  glowClass: string;
  ingredients: Ingredient[];
  accentColor: string;
  svgColor: string;
}

const BOWLS_DATA: Bowl[] = [
  {
    id: 'tonkotsu',
    name: 'Tonkotsu Black',
    jpName: '黒豚骨',
    description: 'Our signature 20-hour pork bone broth infused with charred black garlic oil (Mayu), creating an intense, smoky depth. Served with melt-in-your-mouth tender pork chashu.',
    broth: 'Rich & Creamy Pork Bone',
    noodle: 'Thin, Straight & Firm (Hosomen)',
    egg: 'Ajitama (24h Soy Marinated)',
    price: '$18',
    accentClass: 'text-secondary text-neon-gold border-secondary/30 hover:border-secondary',
    glowClass: 'border-neon-gold',
    accentColor: '#FFB800',
    svgColor: '#5B2E15', // Gold-brown broth
    ingredients: [
      { name: 'Charred Mayu', iconKey: 'garlic' },
      { name: 'Pork Chashu', iconKey: 'meat' },
      { name: 'Wood Ear Mushrooms', iconKey: 'mushroom' },
      { name: 'Menma (Bamboo)', iconKey: 'bamboo' },
      { name: 'Green Onions', iconKey: 'green-onions' }
    ]
  },
  {
    id: 'spicy-miso',
    name: 'Miso Inferno',
    jpName: '地獄味噌',
    description: 'A scorching combination of fermented red miso paste, house-made chili oil, and five-spice paste. Rich, spicy, and layered. Topped with seasoned minced pork and fresh wood ear.',
    broth: 'Fiery Fermented Red Miso',
    noodle: 'Thick, Chewy & Wavy (Futomen)',
    egg: 'Ajitama (Slightly Custardy)',
    price: '$19',
    accentClass: 'text-primary text-neon-red border-primary/30 hover:border-primary',
    glowClass: 'border-neon-red',
    accentColor: '#FF3B30',
    svgColor: '#991B1B', // Fiery Red broth
    ingredients: [
      { name: 'Inferno Chili Paste', iconKey: 'chili' },
      { name: 'Spicy Minced Pork', iconKey: 'spicy-meat' },
      { name: 'Chili Threads', iconKey: 'chili' },
      { name: 'Bok Choy', iconKey: 'bok-choy' },
      { name: 'Sweet Corn', iconKey: 'corn' }
    ]
  },
  {
    id: 'matcha-shio',
    name: 'Shio Zen',
    jpName: '潮禅',
    description: 'A light, refreshing kelp and chicken broth infused with premium organic matcha green tea. Balanced with delicate sea salt and topped with flame-seared chicken breast.',
    broth: 'Matcha & Sea Salt Dashi',
    noodle: 'Thin, Wavy & Soft (Chijiremen)',
    egg: 'Ajitama (Warm Soft Center)',
    price: '$17',
    accentClass: 'text-accent text-neon-cyan border-accent/30 hover:border-accent',
    glowClass: 'border-neon-cyan',
    accentColor: '#00F5FF',
    svgColor: '#0F766E', // Green matcha-dashi broth
    ingredients: [
      { name: 'Organic Matcha', iconKey: 'matcha' },
      { name: 'Seared Chicken', iconKey: 'meat' },
      { name: 'Lotus Root', iconKey: 'lotus' },
      { name: 'Shredded Nori', iconKey: 'nori' },
      { name: 'Katsuobushi', iconKey: 'fish' }
    ]
  }
];

function renderIngredientIcon(key: string) {
  switch (key) {
    case 'garlic':
      return (
        <svg className="w-3.5 h-3.5 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 2C10 6 6 10 6 14a6 6 0 0 0 12 0c0-4-4-8-6-12z" />
        </svg>
      );
    case 'meat':
      return (
        <svg className="w-3.5 h-3.5 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <rect x="3" y="6" width="18" height="12" rx="3" />
          <path d="M6 12c4 0 6 2 12-2" />
        </svg>
      );
    case 'mushroom':
      return (
        <svg className="w-3.5 h-3.5 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 21v-8M5 12a7 7 0 0 1 14 0H5z" />
        </svg>
      );
    case 'bamboo':
      return (
        <svg className="w-3.5 h-3.5 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 3v18M8 7v10M16 7v10" />
        </svg>
      );
    case 'green-onions':
      return (
        <svg className="w-3.5 h-3.5 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 3c-4.5 3-4.5 7 0 10M8 5c-3 3-3 7 0 10M16 5c3 3 3 7 0 10" />
        </svg>
      );
    case 'chili':
      return (
        <svg className="w-3.5 h-3.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1 2-1 4 2 6 .5 2 2 4 4 5 1-2 2-3 2-5a5 5 0 1 1-10 0c0-1 .4-2 1-3a2 2 0 0 0 2 2z" />
        </svg>
      );
    case 'spicy-meat':
      return (
        <svg className="w-3.5 h-3.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="12" cy="12" r="9" />
          <circle cx="9" cy="9" r="1.5" fill="currentColor" />
          <circle cx="15" cy="11" r="1.5" fill="currentColor" />
          <circle cx="11" cy="14" r="1.5" fill="currentColor" />
        </svg>
      );
    case 'bok-choy':
      return (
        <svg className="w-3.5 h-3.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 22s-3-3-3-6c0-2 2-4 3-4s3 2 3 4c0 3-3 6-3 6z" />
          <path d="M6 12c0 3 3 5 3 5" />
          <path d="M18 12c0 3-3 5-3 5" />
        </svg>
      );
    case 'corn':
      return (
        <svg className="w-3.5 h-3.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <rect x="6" y="2" width="12" height="20" rx="5" />
          <path d="M10 6h4M10 11h4M10 16h4" />
        </svg>
      );
    case 'matcha':
      return (
        <svg className="w-3.5 h-3.5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M3 11c0 5 4 8 9 8s9-3 9-8H3z" />
          <path d="M21 9V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2h18z" />
        </svg>
      );
    case 'lotus':
      return (
        <svg className="w-3.5 h-3.5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="2.5" />
          <circle cx="8" cy="8" r="1.5" />
          <circle cx="16" cy="8" r="1.5" />
          <circle cx="8" cy="16" r="1.5" />
          <circle cx="16" cy="16" r="1.5" />
        </svg>
      );
    case 'nori':
      return (
        <svg className="w-3.5 h-3.5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M4 20L8 4M10 20l4-16M16 20l4-16" />
        </svg>
      );
    case 'fish':
      return (
        <svg className="w-3.5 h-3.5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M2 12c4-4 8-4 12 0s8 4 12 0c-4 4-8 4-12 0s-8-4-12 0z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function InteractiveMenu() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const bowlWrapperRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const ingredientsRef = useRef<HTMLDivElement>(null);

  const activeBowl = BOWLS_DATA[selectedIdx];

  // Animate elements when active bowl changes
  useGSAP(() => {
    // Bowl swap transition
    gsap.fromTo(
      bowlWrapperRef.current,
      { rotation: -45, scale: 0.75, opacity: 0 },
      { rotation: 0, scale: 1, opacity: 1, duration: 0.85, ease: 'back.out(1.1)' }
    );

    // Info details slide in
    gsap.fromTo(
      infoRef.current?.children || [],
      { x: 30, opacity: 0 },
      { x: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: 'power2.out' }
    );

    // Ingredients list stagger rise
    gsap.fromTo(
      ingredientsRef.current?.children || [],
      { y: 20, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, stagger: 0.05, duration: 0.5, ease: 'back.out(1.5)' }
    );
  }, [selectedIdx]);

  return (
    <section
      id="menu"
      ref={containerRef}
      className="py-16 md:py-24 bg-bg-base border-t border-border-base transition-colors duration-300 relative overflow-hidden"
    >
      {/* Background decoration elements */}
      <div className="absolute top-10 right-10 text-[10rem] font-bold text-text-base/[0.02] dark:text-white/[0.02] select-none font-serif tracking-tighter">
        MENU
      </div>
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-accent/3 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-primary font-bold inline-flex items-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Signature Bowls
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-text-base">
            CHOOSE YOUR <span className="text-secondary">FLAVOR</span>
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mt-4" />
        </div>

        {/* Tab Buttons Selector */}
        <div className="flex justify-start md:justify-center gap-3 md:gap-6 mb-12 overflow-x-auto scrollbar-none flex-nowrap pb-4 px-4 -mx-6 md:mx-0">
          {BOWLS_DATA.map((bowl, idx) => {
            const isActive = idx === selectedIdx;
            return (
              <button
                key={bowl.id}
                onClick={() => setSelectedIdx(idx)}
                className={`px-5 py-2.5 border text-xs uppercase tracking-widest font-semibold transition-all duration-300 rounded-none cursor-pointer ${
                  isActive
                    ? `bg-surface-base text-text-base border-${bowl.id === 'tonkotsu' ? 'secondary' : bowl.id === 'spicy-miso' ? 'primary' : 'accent'} menu-shadow-active scale-105 ${bowl.glowClass}`
                    : 'bg-transparent text-text-muted border-border-base hover:text-text-base hover:border-border-base/80'
                }`}
              >
                <span className="font-serif mr-1.5 text-sm">{bowl.jpName}</span>
                {bowl.name}
              </button>
            );
          })}
        </div>

        {/* Core Layout: Left Side Bowl, Right Side Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[480px]">
          
          {/* Bowl Column */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            {/* Pulsing Backlight */}
            <div
              className="absolute w-[280px] h-[280px] rounded-full filter blur-[80px] opacity-20 transition-all duration-700 pointer-events-none"
              style={{ backgroundColor: activeBowl.accentColor }}
            />

            <div ref={bowlWrapperRef} className="relative w-full max-w-[320px] md:max-w-[380px] select-none">
              {/* Steaming Lines */}
              <svg
                className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-20 overflow-visible pointer-events-none"
                viewBox="0 0 100 80"
                fill="none"
              >
                <path
                  className="steam-path-1"
                  d="M35 70 C 30 50, 45 40, 38 20 C 35 10, 42 0, 38 -10"
                  stroke={activeBowl.accentColor}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  opacity="0.3"
                />
                <path
                  className="steam-path-2"
                  d="M50 75 C 55 55, 38 45, 52 25 C 58 15, 48 5, 52 -8"
                  stroke={activeBowl.accentColor}
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0.4"
                />
                <path
                  className="steam-path-3"
                  d="M65 70 C 60 50, 70 40, 64 20 C 60 10, 66 0, 62 -10"
                  stroke={activeBowl.accentColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.3"
                />
              </svg>

              {/* Dynamic Bowl SVG */}
              <svg
                viewBox="0 0 400 360"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
              >
                <ellipse cx="200" cy="305" rx="130" ry="20" fill="black" fillOpacity="0.6" filter="blur(12px)" />

                {/* Yolk Glow */}
                <circle cx="160" cy="180" r="30" fill="#FFB800" fillOpacity="0.15" filter="blur(15px)" />

                {/* Broth Base Surface */}
                <ellipse cx="200" cy="170" rx="150" ry="60" fill="#1b120c" />
                
                {/* Dynamically Styled Broth */}
                <ellipse cx="200" cy="170" rx="142" ry="52" fill={`url(#broth-${activeBowl.id})`} />

                {/* Broth Oil Drops */}
                <ellipse cx="130" cy="160" rx="5" ry="2.5" fill="#E67E22" fillOpacity="0.7" />
                <ellipse cx="240" cy="180" rx="7" ry="3.5" fill="#E67E22" fillOpacity="0.7" />
                <ellipse cx="200" cy="150" rx="4" ry="2" fill="#E67E22" fillOpacity="0.7" />

                {/* Noodles */}
                <path d="M70 160 Q 120 185 200 185 T 330 160" stroke="#FFD875" strokeWidth="5.5" strokeLinecap="round" />
                <path d="M82 165 Q 150 195 210 180 T 318 165" stroke="#FFD875" strokeWidth="5" strokeLinecap="round" />
                <path d="M95 170 Q 140 198 200 188 T 305 170" stroke="#FFD875" strokeWidth="4" strokeLinecap="round" />

                {/* Specific Ingredients Based on Bowl */}
                {activeBowl.id === 'tonkotsu' && (
                  <>
                    {/* Pork Chashu Slices */}
                    <g transform="translate(220, 110) rotate(-10)">
                      <rect x="0" y="0" width="65" height="48" rx="12" fill="#5F382E" stroke="#844E3F" strokeWidth="2.5" />
                      <path d="M8 15 C 25 15, 35 25, 55 18" stroke="#E3B3A6" strokeWidth="3.5" strokeLinecap="round" />
                      <path d="M12 28 C 28 22, 38 35, 48 30" stroke="#E3B3A6" strokeWidth="2.5" strokeLinecap="round" />
                    </g>
                    {/* Black Garlic Oil swirls */}
                    <path d="M120 180 C 130 190, 140 180, 150 195" stroke="#111827" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.8" />
                    <circle cx="110" cy="170" r="6" fill="#111827" opacity="0.8" />
                    <circle cx="180" cy="190" r="4" fill="#111827" opacity="0.8" />
                    <circle cx="210" cy="175" r="7" fill="#111827" opacity="0.8" />
                  </>
                )}

                {activeBowl.id === 'spicy-miso' && (
                  <>
                    {/* Minced Pork Mound */}
                    <ellipse cx="210" cy="140" rx="35" ry="18" fill="#4B2C1B" stroke="#663C25" strokeWidth="2" />
                    <circle cx="190" cy="138" r="4" fill="#D97706" />
                    <circle cx="205" cy="145" r="3.5" fill="#EA580C" />
                    <circle cx="225" cy="135" r="4.5" fill="#D97706" />
                    
                    {/* Spicy chili threads */}
                    <path d="M190 120 Q 200 100 215 110" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M210 115 Q 225 95 220 125" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M195 130 Q 185 110 205 115" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" />
                  </>
                )}

                {activeBowl.id === 'matcha-shio' && (
                  <>
                    {/* Chicken Breast Slices */}
                    <g transform="translate(210, 120) rotate(-15)">
                      <rect x="0" y="0" width="65" height="42" rx="10" fill="#E5E7EB" stroke="#D1D5DB" strokeWidth="2" />
                      {/* Sear marks */}
                      <line x1="15" y1="10" x2="25" y2="30" stroke="#4B5563" strokeWidth="2" />
                      <line x1="30" y1="8" x2="40" y2="28" stroke="#4B5563" strokeWidth="2" />
                      <line x1="45" y1="12" x2="52" y2="26" stroke="#4B5563" strokeWidth="2" />
                    </g>
                    {/* Lotus Root slice */}
                    <g transform="translate(85, 120) rotate(15)">
                      <circle cx="22" cy="22" r="20" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" />
                      {/* Lotus holes */}
                      <circle cx="14" cy="14" r="3" fill="#0F766E" />
                      <circle cx="30" cy="14" r="3" fill="#0F766E" />
                      <circle cx="14" cy="30" r="3" fill="#0F766E" />
                      <circle cx="30" cy="30" r="3" fill="#0F766E" />
                      <circle cx="22" cy="22" r="4" fill="#0F766E" />
                    </g>
                  </>
                )}

                {/* Constant toppings in all bowls */}
                {/* Soft boiled egg half */}
                <g transform="translate(130, 140) rotate(20)">
                  <ellipse cx="25" cy="35" rx="25" ry="35" fill="#F9FAFB" />
                  <circle cx="25" cy="35" r="15" fill="#FF8A00" stroke="#FFB800" strokeWidth="1.5" />
                  <circle cx="23" cy="33" r="10" fill="#FFA800" />
                </g>

                {/* Fish Cake Narutomaki */}
                <g transform="translate(90, 140) rotate(-10)">
                  <circle cx="20" cy="20" r="18" fill="white" stroke="#E5E7EB" strokeWidth="1.5" />
                  <path
                    d="M20 20 C 16 16, 16 8, 22 8 C 30 8, 32 20, 24 25 C 18 30, 10 24, 13 16"
                    stroke="#FF4B8C"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                </g>

                {/* Scallions and nori seaweed */}
                <path d="M60 110 L 95 80 L 125 115 L 90 145 Z" fill="#18201C" stroke="#0F1411" strokeWidth="2" />
                <circle cx="160" cy="190" r="3.5" fill="#10B981" />
                <circle cx="175" cy="180" r="3" fill="#059669" />
                <circle cx="190" cy="200" r="4" fill="#10B981" />

                {/* Ceramic Bowl (Dynamic exterior color matching accent) */}
                <path
                  d="M45 160 C 45 250, 120 300, 200 300 C 280 300, 355 250, 355 160 Z"
                  fill={activeBowl.id === 'tonkotsu' ? '#27272A' : activeBowl.id === 'spicy-miso' ? '#991B1B' : '#047857'}
                />

                {/* Inner bowl shadow */}
                <path d="M45 160 C 45 175, 120 180, 200 180 C 280 180, 355 175, 355 160 C 355 170, 280 175, 200 175 C 120 175, 45 170, 45 160 Z" fill="#18181B" opacity="0.4" />

                {/* Pattern on rim */}
                <path
                  d="M48 162 C 80 173, 140 175, 200 175 C 260 175, 320 173, 352 162"
                  stroke={activeBowl.accentColor}
                  strokeWidth="3"
                  strokeDasharray="8,6"
                />

                {/* Foot Ring */}
                <path d="M140 300 C 140 312, 260 312, 260 300 Z" fill="#18181B" stroke={activeBowl.accentColor} strokeWidth="2" />

                {/* Definitions of custom gradients */}
                <defs>
                  <linearGradient id="broth-tonkotsu" x1="0" y1="120" x2="0" y2="220" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#452718" />
                    <stop offset="100%" stopColor="#25140B" />
                  </linearGradient>
                  <linearGradient id="broth-spicy-miso" x1="0" y1="120" x2="0" y2="220" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#7F1D1D" />
                    <stop offset="100%" stopColor="#450A0A" />
                  </linearGradient>
                  <linearGradient id="broth-matcha-shio" x1="0" y1="120" x2="0" y2="220" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#0F766E" />
                    <stop offset="100%" stopColor="#115E59" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Price Tag Floating */}
              <div
                className="absolute top-1/2 -right-4 bg-surface-base border px-4 py-2 flex flex-col items-center justify-center font-bold"
                style={{ borderColor: activeBowl.accentColor, boxShadow: `0 4px 15px ${activeBowl.accentColor}25` }}
              >
                <span className="text-[10px] text-text-muted uppercase tracking-widest">Price</span>
                <span className="text-xl text-text-base font-serif">{activeBowl.price}</span>
              </div>
            </div>
          </div>

          {/* Details Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Descriptive Content */}
            <div ref={infoRef} className="mb-8">
              <span className="text-xs uppercase tracking-widest text-text-muted font-semibold">
                Bowl Profile
              </span>
              <h3 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-text-base mt-1 mb-4">
                {activeBowl.name}
              </h3>
              <p className="text-text-muted font-light leading-relaxed mb-6">
                {activeBowl.description}
              </p>

              {/* Specs Table */}
              <div className="border border-border-base bg-surface-base p-5 grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-text-muted block mb-1">
                    Broth Base
                  </span>
                  <span className="text-sm font-semibold text-text-base flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" style={{ color: activeBowl.accentColor }} />
                    {activeBowl.broth}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-text-muted block mb-1">
                    Noodle Type
                  </span>
                  <span className="text-sm font-semibold text-text-base flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5" style={{ color: activeBowl.accentColor }} />
                    {activeBowl.noodle}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-text-muted block mb-1">
                    Ajitama Egg
                  </span>
                  <span className="text-sm font-semibold text-text-base flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" style={{ color: activeBowl.accentColor }} />
                    {activeBowl.egg}
                  </span>
                </div>
              </div>
            </div>

            {/* Ingredients Floating Stagger Badges */}
            <div>
              <span className="text-[10px] uppercase tracking-widest text-text-muted font-semibold block mb-3">
                Signature Toppings
              </span>
              <div ref={ingredientsRef} className="flex flex-wrap gap-2.5">
                {activeBowl.ingredients.map((ing, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-surface-base border border-border-base text-xs text-text-base uppercase tracking-wider hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
                  >
                    {renderIngredientIcon(ing.iconKey)}
                    <span>{ing.name}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
          
        </div>

      </div>
    </section>
  );
}
