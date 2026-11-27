# Noman Aqil — Interactive 3D Portfolio

An interactive dark-minimalist portfolio rebuilt with **React**, **TypeScript**, **Vite**, **Three.js**, **React Three Fiber**, **Drei**, **GSAP**, **Framer Motion**, **Lenis**, and **Tailwind CSS**, evolving the original HTML/Three.js prototypes (`Slide1.html` & `Slide2.html`, preserved in Git commit `57a54c6` on `main`).

## Architecture

```text
src/
  assets/          # Authentic portrait media
  components/
    animations/    # Lenis smooth scroll + GSAP ScrollTrigger marquee ribbons
    navigation/    # Top navigation bar + slim frosted vertical progress dots
    sections/      # Home, Digital Systems, Disciplines & Works, Contact
    three/         # KineticMonolith, StudioEnvironment, OrbitalParticles, SceneRig, Fallbacks
    ui/            # GlassPanel, ProfilePortrait, SectionEyebrow
  data/            # Authentic profile data, navigation config, future-ready project schema
  hooks/           # Device capabilities, reduced motion, scroll controller
  scenes/          # Lazy-loaded React Three Fiber Canvas
  styles/          # Tailwind CSS v4 theme tokens & motion safeguards
  types/           # Strict TypeScript portfolio models
```

## Scripts

```bash
npm install
npm run dev      # Start Vite development server
npm run lint     # TypeScript type-check (tsc --noEmit)
npm run build    # Production build to dist/
npm run preview  # Preview production bundle locally
```
