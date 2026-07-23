import { useState, useEffect } from 'react';
import { Flame, Sun, Moon, ChevronRight, Clock, Instagram, Twitter, Facebook } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true); // Default to dark mode for Tokyo vibe

  useEffect(() => {
    // Scroll listener
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    // Initial theme setup
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-surface-base/80 backdrop-blur-md py-4 border-b border-primary/20 shadow-[0_4px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'bg-transparent py-6 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <Flame className="w-8 h-8 text-primary group-hover:animate-pulse transition-all duration-300" />
            <span className="font-serif text-2xl md:text-3xl font-bold tracking-wider text-neon-red text-primary transition-all duration-300">
              一楽 <span className="text-secondary font-sans text-lg font-light tracking-widest ml-1">ICHIRAKU</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#hero"
              className="text-sm font-semibold tracking-wider uppercase text-text-base hover:text-primary transition-colors duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-primary hover:after:w-full after:transition-all after:duration-300"
            >
              Home
            </a>
            <a
              href="#menu"
              className="text-sm font-semibold tracking-wider uppercase text-text-base hover:text-primary transition-colors duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-primary hover:after:w-full after:transition-all after:duration-300"
            >
              Menu
            </a>
            <a
              href="#craft"
              className="text-sm font-semibold tracking-wider uppercase text-text-base hover:text-primary transition-colors duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-primary hover:after:w-full after:transition-all after:duration-300"
            >
              Our Craft
            </a>
            <a
              href="#location"
              className="text-sm font-semibold tracking-wider uppercase text-text-base hover:text-primary transition-colors duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-primary hover:after:w-full after:transition-all after:duration-300"
            >
              Location
            </a>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 border border-border-base hover:border-primary text-text-base hover:text-primary transition-all duration-300 hover:scale-105 cursor-pointer flex items-center justify-center"
            >
              {isDark ? (
                <Sun className="w-4 h-4 transition-transform duration-500 rotate-0 hover:rotate-90 text-secondary" />
              ) : (
                <Moon className="w-4 h-4 transition-transform duration-500 rotate-0 hover:-rotate-12 text-primary" />
              )}
            </button>

            <a
              href="#location"
              className="px-6 py-2 border border-secondary text-secondary hover:bg-secondary hover:text-dark-bg dark:hover:text-dark-bg font-semibold uppercase tracking-widest text-xs transition-all duration-300 border-neon-gold cursor-pointer"
            >
              Reserve Table
            </a>
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-5">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 border border-border-base text-text-base transition-colors duration-300 cursor-pointer"
            >
              {isDark ? <Sun className="w-4 h-4 text-secondary" /> : <Moon className="w-4 h-4 text-primary" />}
            </button>

            {/* Premium Morphing Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Menu"
              className="w-6 h-5 flex flex-col justify-between cursor-pointer focus:outline-none relative z-50 group"
            >
              <span
                className={`w-6 h-[2px] bg-text-base transition-all duration-300 origin-left ${
                  isOpen ? 'rotate-45 translate-x-[2px] translate-y-[-1px]' : ''
                }`}
              />
              <span
                className={`w-6 h-[2px] bg-text-base transition-all duration-300 ${
                  isOpen ? 'opacity-0 scale-0' : ''
                }`}
              />
              <span
                className={`w-6 h-[2px] bg-text-base transition-all duration-300 origin-left ${
                  isOpen ? '-rotate-45 translate-x-[2px] translate-y-[1px]' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar Backdrop Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Premium Sidebar (Right Side Drawer) */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-surface-base border-l border-border-base z-45 transition-transform duration-300 ease-out shadow-2xl flex flex-col justify-between ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Top Header Section */}
        <div className="pt-24 px-8 pb-6 border-b border-border-base/50">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-6 h-6 text-primary" />
            <span className="font-serif text-xl font-bold tracking-wider text-neon-red text-primary">
              一楽 <span className="text-secondary font-sans text-xs font-light tracking-widest ml-0.5">ICHIRAKU</span>
            </span>
          </div>
          <p className="text-[10px] text-text-muted uppercase tracking-widest font-semibold">
            Tokyo Premium Noodles
          </p>
        </div>

        {/* Navigation Link List */}
        <div className="flex-1 overflow-y-auto py-6">
          <div className="flex flex-col">
            <a
              href="#hero"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between py-4 px-8 text-sm uppercase tracking-wider font-semibold text-text-base hover:text-primary hover:bg-primary/5 transition-all duration-300 group border-b border-border-base/20"
            >
              <span>Home</span>
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-primary" />
            </a>
            <a
              href="#menu"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between py-4 px-8 text-sm uppercase tracking-wider font-semibold text-text-base hover:text-primary hover:bg-primary/5 transition-all duration-300 group border-b border-border-base/20"
            >
              <span>Menu</span>
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-primary" />
            </a>
            <a
              href="#craft"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between py-4 px-8 text-sm uppercase tracking-wider font-semibold text-text-base hover:text-primary hover:bg-primary/5 transition-all duration-300 group border-b border-border-base/20"
            >
              <span>Our Craft</span>
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-primary" />
            </a>
            <a
              href="#location"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between py-4 px-8 text-sm uppercase tracking-wider font-semibold text-text-base hover:text-primary hover:bg-primary/5 transition-all duration-300 group border-b border-border-base/20"
            >
              <span>Location</span>
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-primary" />
            </a>
          </div>

          {/* Quick Info block in sidebar */}
          <div className="mt-8 px-8 space-y-4">
            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-secondary mt-0.5" />
              <div>
                <span className="text-[10px] text-text-muted uppercase tracking-widest font-bold block">Hours</span>
                <span className="text-xs text-text-base font-semibold block">Mon-Sat: 5PM - 2AM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Footer Section */}
        <div className="p-8 border-t border-border-base/50 space-y-6 bg-bg-base/30">
          <a
            href="#location"
            onClick={() => setIsOpen(false)}
            className="w-full block text-center py-3 border border-secondary text-secondary hover:bg-secondary hover:text-dark-bg font-semibold uppercase tracking-widest text-xs transition-all duration-300 border-neon-gold"
          >
            Reserve Table
          </a>

          {/* Social icons */}
          <div className="flex justify-center gap-4 text-text-muted">
            <a href="#" className="hover:text-primary transition-colors duration-300"><Instagram className="w-4 h-4" /></a>
            <a href="#" className="hover:text-primary transition-colors duration-300"><Twitter className="w-4 h-4" /></a>
            <a href="#" className="hover:text-primary transition-colors duration-300"><Facebook className="w-4 h-4" /></a>
          </div>
        </div>
      </div>
    </>
  );
}
