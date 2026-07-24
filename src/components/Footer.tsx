import { Flame, Instagram, Twitter, Facebook, Compass } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-bg-base border-t border-border-base transition-colors duration-300 py-16 relative overflow-hidden">
      {/* Background neon gold blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-secondary/2 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center gap-10">
        
        {/* Logo and Brand */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-primary" />
            <span className="font-serif text-2xl font-bold tracking-wider text-neon-red text-primary">
              一楽 <span className="text-secondary font-sans text-sm font-light tracking-widest ml-1">ICHIRAKU</span>
            </span>
          </div>
          <p className="text-xs text-text-muted uppercase tracking-widest font-semibold">
            Slurping is a sign of respect.
          </p>
        </div>

        {/* Social Icons Links */}
        <div className="flex items-center gap-6">
          <a
            href="#"
            aria-label="Instagram"
            className="w-10 h-10 flex items-center justify-center border border-border-base hover:border-primary hover:text-primary transition-all duration-300 rounded-none group cursor-pointer text-text-base"
          >
            <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
          </a>
          <a
            href="#"
            aria-label="Twitter"
            className="w-10 h-10 flex items-center justify-center border border-border-base hover:border-primary hover:text-primary transition-all duration-300 rounded-none group cursor-pointer text-text-base"
          >
            <Twitter className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
          </a>
          <a
            href="#"
            aria-label="Facebook"
            className="w-10 h-10 flex items-center justify-center border border-border-base hover:border-primary hover:text-primary transition-all duration-300 rounded-none group cursor-pointer text-text-base"
          >
            <Facebook className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
          </a>
          <a
            href="#"
            aria-label="TripAdvisor"
            className="w-10 h-10 flex items-center justify-center border border-border-base hover:border-primary hover:text-primary transition-all duration-300 rounded-none group cursor-pointer text-text-base"
          >
            <Compass className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center space-y-2">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} Ramen Bar Ichiraku. All rights reserved.
          </p>
          <p className="text-[10px] text-text-muted/70 tracking-wider">
            Crafted with honor for culinary purists. Shinjuku, Tokyo.
          </p>
        </div>

      </div>
    </footer>
  );
}
