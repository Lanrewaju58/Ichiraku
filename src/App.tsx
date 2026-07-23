import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InteractiveMenu from './components/InteractiveMenu';
import CraftSection from './components/CraftSection';
import Location from './components/Location';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="bg-bg-base text-text-base min-h-screen font-sans antialiased selection:bg-primary selection:text-white transition-colors duration-300">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Interactive Menu Selector */}
      <InteractiveMenu />

      {/* Behind The Scenes: The Craft */}
      <CraftSection />

      {/* Reservation & Location Map */}
      <Location />

      {/* Footer */}
      <Footer />
    </div>
  );
}
