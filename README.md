# 一楽 (Ichiraku) — Premium Animated Ramen Bar

An interactive, high-fidelity landing page for **一楽 (Ichiraku)**, a cozy 12-stool ramen bar in the alleyways of Shinjuku, Tokyo. Built to represent the pinnacle of modern web design with fluid animations, custom brand SVGs, and a system-synchronized theme manager.

---

## Design Aesthetics

### Dual Branding Systems
- **Tokyo Midnight (Dark Theme)**: Inspired by the neon lights of Shinjuku. Features charcoal backdrops, glowing red neon characters (`らーめん`), amber tonkotsu highlights, and electric cyan steam lines.
- **Washi Paper (Light Theme)**: Inspired by traditional Japanese craft notebooks and clean bamboo frames. Features warm alabaster backdrops (`#FAF9F6`), charcoal ink text, sand-colored borders, and soft daylight glows.
- **Typography**: Complete styling utilizing Google Display Font **Shojumaru** (reminiscent of traditional woodblock prints and brush lettering) for all headings, logos, tab buttons, and prices.

---

## Features

- **Tokyo Midnight Theme Toggle**: System-synchronized manual theme switcher with local storage persistence and a rotating Sun/Moon icon in the floating header.
- **Interactive Flavor Selector**: Switch between signature bowls (*Tonkotsu Black*, *Miso Inferno*, and *Shio Zen*) with GSAP-powered bowl spin and fade-in transitions.
- **12 Custom Vector Toppings**: Completely customized SVG assets for ingredients (pork chashu, garlic bulbs, nori seaweed, matchsticks, and bok choy) replacing generic text emojis.
- **Culinary Science Storytelling**: A split scrolling grid mapping the three pillars of craft (20-hour broth, hand-pulled noodles, and tare blending) using animated inline SVGs:
  - *Broth*: Boiling bubbles and rising steam paths.
  - *Noodles*: Wavy stretch vectors with flour dust particles.
  - *Tare*: A tilted ceramic pitcher pouring a continuous downward-flowing stream with concentric splash ripples.
- **Tokyo Alleyways Vector Map**: Custom roadmap highlighting Shinjuku backstreets with a pulsing target pin and a floating layout coordinates bubble.
- **Stool Booking Validation**: A booking calendar form verifying date-time constraints and guest counts, with a staggered success check animation.
- **Premium Side-Drawer Sidebar**: Animated custom 3-bar hamburger menu morphing into an 'X' close state, paired with a right side-drawer (sidebar) and backdrop blur overlay.

---

## Technology Stack

- **Core**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [GSAP (GreenSock Animation Platform)](https://greensock.com/gsap/) + `@gsap/react`
- **Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: [Google Fonts](https://fonts.google.com/) (preconnect linked for fast load speeds)

---

## Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Dev Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

4. **Preview Production Build**:
   ```bash
   npm run preview
   ```
