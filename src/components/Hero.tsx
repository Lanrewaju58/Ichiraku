import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bowlRef = useRef<HTMLDivElement>(null);
  const neonRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Reveal text elements sequentially
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from(neonRef.current, {
      opacity: 0,
      x: -30,
      duration: 1.2,
      delay: 0.2
    })
    .from(headlineRef.current, {
      y: 50,
      opacity: 0,
      duration: 1
    }, '-=0.8')
    .from(textRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8
    }, '-=0.6');

    if (ctaRef.current) {
      tl.from(ctaRef.current.children, {
        y: 20,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6
      }, '-=0.5');
    }

    tl.from(bowlRef.current, {
      scale: 0.8,
      rotation: 15,
      opacity: 0,
      duration: 1.5,
      ease: 'back.out(1.2)'
    }, '-=1.2');

    // Float animation for bowl
    gsap.to(bowlRef.current, {
      y: -15,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }, { scope: containerRef });

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden bg-radial from-secondary/5 via-bg-base to-bg-base dark:from-[#120a0f] dark:via-bg-base dark:to-bg-base"
    >
      {/* Background Neon Glow Overlay */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full filter blur-[100px] pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,10,15,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(18,10,15,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(18,10,15,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(18,10,15,0.07)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Side: Traditional Sign & Text */}
        <div className="lg:col-span-7 flex flex-col sm:flex-row gap-5 sm:gap-6 md:gap-8 items-start">
          {/* Vertical Shop Badge */}
          <div
            ref={neonRef}
            className="hidden sm:flex flex-col items-center bg-surface-base/80 dark:bg-black/50 border border-primary/30 px-3 py-5 rounded-sm select-none shadow-sm mt-1"
          >
            <span className="text-[10px] uppercase tracking-widest text-primary font-bold mb-2 [writing-mode:vertical-lr]">
              SHINJUKU
            </span>
            <div className="flex flex-col gap-2.5 font-serif text-2xl font-bold text-primary">
              <span>ら</span>
              <span>ー</span>
              <span>め</span>
              <span>ん</span>
            </div>
            <span className="text-[9px] text-secondary mt-2 font-bold tracking-widest select-none">
              TOKYO
            </span>
          </div>

          {/* Core Content */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 mb-4 text-xs font-semibold uppercase tracking-widest text-primary">
              <span>一楽</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>Shinjuku Stool Bar</span>
            </div>
            <h1
              ref={headlineRef}
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-base leading-[1.12] mb-5"
            >
              AUTHENTIC SHINJUKU <br />
              <span className="text-secondary">TONKOTSU</span>. <br />
              CRAFTED OVER 20 HOURS.
            </h1>
            <p
              ref={textRef}
              className="text-base sm:text-lg text-text-muted max-w-lg mb-8 leading-relaxed font-normal"
            >
              Hand-crafted daily in the backstreets of Tokyo. We simmer rich pork bone broth for 20 hours to extract deep umami, paired with house-made kansui noodles and slow-braised chashu pork. Take a seat at our 12-stool counter.
            </p>
            <div ref={ctaRef} className="flex flex-wrap gap-4">
              <a
                href="#menu"
                className="px-8 py-3.5 bg-primary text-white font-semibold uppercase tracking-widest text-xs transition-all duration-300 hover:bg-primary/90 hover:scale-[1.02] shadow-sm cursor-pointer"
              >
                Explore Menu
              </a>
              <a
                href="#location"
                className="px-8 py-3.5 border border-border-base hover:border-primary text-text-base hover:text-primary font-semibold uppercase tracking-widest text-xs transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              >
                Reserve Stool
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: Steaming Bowl Graphic */}
        <div className="lg:col-span-5 flex justify-center items-center relative">
          {/* Neon Ring behind bowl */}
          <div className="absolute w-[320px] h-[320px] md:w-[400px] md:h-[400px] rounded-full border border-secondary/15 shadow-[0_0_80px_rgba(255,184,0,0.05)] pointer-events-none" />
          
          <div ref={bowlRef} className="relative w-full max-w-[360px] md:max-w-[420px]">
            {/* SVG Steam Lines */}
            <svg
              className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-32 overflow-visible pointer-events-none"
              viewBox="0 0 100 80"
              fill="none"
            >
              <path
                className="steam-path-1"
                d="M30 70 C 25 50, 45 40, 35 20 C 30 10, 40 0, 35 -10"
                stroke="url(#steam-grad)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                className="steam-path-2"
                d="M50 75 C 55 55, 35 45, 52 25 C 60 15, 45 5, 50 -8"
                stroke="url(#steam-grad)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                className="steam-path-3"
                d="M70 70 C 65 50, 75 40, 68 20 C 62 10, 70 0, 66 -10"
                stroke="url(#steam-grad)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              
              <defs>
                <linearGradient id="steam-grad" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#00F5FF" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#FFB800" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>

            {/* Premium Ramen Bowl Vector SVG */}
            <svg
              viewBox="0 0 400 360"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            >
              {/* Bowl Outer Shadow */}
              <ellipse cx="200" cy="305" rx="140" ry="25" fill="black" fillOpacity="0.6" filter="blur(15px)" />

              {/* Egg Yolk Glow */}
              <circle cx="160" cy="180" r="35" fill="#FFB800" fillOpacity="0.2" filter="blur(20px)" />

              {/* Broth Base Surface */}
              <ellipse cx="200" cy="170" rx="150" ry="60" fill="#2d1c15" />
              <ellipse cx="200" cy="170" rx="142" ry="52" fill="url(#broth-gradient)" />

              {/* Broth Detail: Oil Droplets */}
              <ellipse cx="120" cy="180" rx="6" ry="3" fill="#D97706" fillOpacity="0.8" />
              <ellipse cx="250" cy="165" rx="8" ry="4" fill="#D97706" fillOpacity="0.8" />
              <ellipse cx="220" cy="190" rx="4" ry="2" fill="#D97706" fillOpacity="0.8" />

              {/* Noodles */}
              <path d="M75 160 Q 120 185 200 185 T 325 160" stroke="#FFD875" strokeWidth="6" strokeLinecap="round" />
              <path d="M85 165 Q 150 195 210 180 T 315 165" stroke="#FFD875" strokeWidth="5.5" strokeLinecap="round" />
              <path d="M100 170 Q 140 200 200 190 T 300 170" stroke="#FFD875" strokeWidth="5" strokeLinecap="round" />
              <path d="M110 175 Q 160 205 220 192 T 290 175" stroke="#FFD875" strokeWidth="4" strokeLinecap="round" />

              {/* Chashu Pork (2 slices) */}
              <g transform="translate(210, 110) rotate(-15)">
                <rect x="0" y="0" width="70" height="50" rx="15" fill="#5F382E" stroke="#844E3F" strokeWidth="3" />
                {/* Fat lines */}
                <path d="M10 15 C 30 15, 40 30, 60 20" stroke="#E3B3A6" strokeWidth="4" strokeLinecap="round" />
                <path d="M15 30 C 35 25, 45 40, 55 35" stroke="#E3B3A6" strokeWidth="3" strokeLinecap="round" />
              </g>
              <g transform="translate(230, 125) rotate(-5)">
                <rect x="0" y="0" width="70" height="50" rx="15" fill="#523028" stroke="#7A4537" strokeWidth="3" />
                <path d="M10 15 C 30 15, 40 30, 60 20" stroke="#DCA293" strokeWidth="4" strokeLinecap="round" />
                <path d="M15 30 C 35 25, 45 40, 55 35" stroke="#DCA293" strokeWidth="3" strokeLinecap="round" />
              </g>

              {/* Soft Boiled Egg (Split Half) */}
              <g transform="translate(130, 140) rotate(25)">
                {/* Egg White */}
                <ellipse cx="30" cy="40" rx="30" ry="40" fill="#F9FAFB" />
                {/* Egg Yolk (Steaming Jammy) */}
                <circle cx="30" cy="40" r="18" fill="#FF8A00" stroke="#FFB800" strokeWidth="2" />
                <circle cx="27" cy="37" r="12" fill="#FFA800" />
                {/* Yolk reflection */}
                <ellipse cx="22" cy="30" rx="3" ry="1.5" fill="white" fillOpacity="0.8" transform="rotate(-30 22 30)" />
              </g>

              {/* Narutomaki (Fish Cake) */}
              <g transform="translate(90, 125) rotate(-20)">
                <circle cx="25" cy="25" r="22" fill="white" stroke="#E5E7EB" strokeWidth="2" />
                {/* Pink Swirl */}
                <path
                  d="M25 25 C 20 20, 20 10, 28 10 C 38 10, 40 25, 30 32 C 22 38, 12 30, 16 20 C 18 15, 23 15, 24 18"
                  stroke="#FF4B8C"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                />
              </g>

              {/* Green Onions / Nori */}
              {/* Green Onions sprinkled */}
              <circle cx="160" cy="180" r="4" fill="#10B981" />
              <rect x="170" y="172" width="6" height="4" rx="1" fill="#059669" transform="rotate(30 170 172)" />
              <circle cx="190" cy="190" r="3" fill="#10B981" />
              <rect x="195" y="180" width="7" height="4" rx="1" fill="#059669" transform="rotate(-40 195 180)" />
              <circle cx="150" cy="200" r="4" fill="#059669" />

              {/* Nori Seaweed (Standing tall behind broth) */}
              <path d="M70 100 L 110 65 L 140 105 L 100 140 Z" fill="#1E2722" stroke="#111814" strokeWidth="2" />
              <path d="M50 110 L 85 75 L 115 115 L 80 150 Z" fill="#18201C" stroke="#0F1411" strokeWidth="2" />

              {/* Ceramic Bowl Body (Steep curve, gorgeous crimson exterior with gold lines) */}
              <path d="M45 160 C 45 250, 120 300, 200 300 C 280 300, 355 250, 355 160 Z" fill="#991B1B" />
              
              {/* Bowl Interior Rim Shadow */}
              <path d="M45 160 C 45 175, 120 180, 200 180 C 280 180, 355 175, 355 160 C 355 170, 280 175, 200 175 C 120 175, 45 170, 45 160 Z" fill="#7F1D1D" />

              {/* Classic Greek-Key/Traditional pattern on rim */}
              <path
                d="M48 162 C 80 173, 140 175, 200 175 C 260 175, 320 173, 352 162"
                stroke="#FFB800"
                strokeWidth="3.5"
                strokeDasharray="8,6"
              />

              {/* Bowl Bottom/Foot Ring */}
              <path d="M140 300 C 140 315, 260 315, 260 300 Z" fill="#1E1E24" />
              <path d="M140 300 C 140 315, 260 315, 260 300 Z" stroke="#FFB800" strokeWidth="2.5" />

              {/* Gradients */}
              <defs>
                <linearGradient id="broth-gradient" x1="0" y1="120" x2="0" y2="220" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#4A1D0F" />
                  <stop offset="50%" stopColor="#5B2E15" />
                  <stop offset="100%" stopColor="#30130A" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <a
        href="#menu"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors duration-300 group cursor-pointer"
      >
        <span className="text-[10px] tracking-widest uppercase font-semibold">Scroll down</span>
        <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
      </a>
    </section>
  );
}
