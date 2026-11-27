# Noman Aqil — Interactive 3D Digital Portfolio

An experimental dark-minimalist portfolio rebuilt with **React 19**, **TypeScript**, **Vite 8**, **Three.js**, **React Three Fiber**, **Drei**, **GSAP**, **Framer Motion**, **Lenis**, and **Tailwind CSS v4**, evolving the original HTML/Three.js slides (`Slide1.html` & `Slide2.html`, preserved at commit `57a54c6` on `main`).

## Key Capabilities & Experience

- **7-Stage Continuous Experience**: `Intro`, `About & Philosophy`, `Capabilities`, `Selected Projects`, `Experiments`, `Journey`, and `Contact` coordinated with Lenis smooth inertia and GSAP `ScrollTrigger`.
- **Interactive WebGL Stage**: Lazy-loaded React Three Fiber `<Canvas>` with a beveled kinetic monolith (`Monolith`, `Topology`, `Optics`), local procedural `<Lightformer>` studio reflections, far-plane GLSL atmospheric fog shader, orbital particles, adaptive DPR/quality tiers, and a graceful SVG fallback.
- **Dedicated Interaction System**: RAF-driven context-aware custom cursor (`VIEW`, `EXPLORE`, `OPEN`, `COPY`) for fine pointers, magnetic buttons, `Ctrl+K` / `⌘K` command navigation, masked typography reveals, and optional Web Audio feedback.
- **Authentic Case Studies & Previews**:
  - **NOVA-UI** (with interactive spatial HUD & telemetry mode preview)
  - **MineHost** (with physical ARM64 Android device evidence captures)
  - **Blender AI Studio** (with live Blender 5.3 viewport & Cycles PBR renders)
  - **Assistant X** (with interactive `AssistantState` particle orb pipeline)
  - **CueDrop** (interactive Android widget concept study)
  - **Duaen Foundation Website** (accessible NGO frontend highlights)

## Architecture

```text
src/
  assets/               # Portrait and verified project evidence media
  components/
    animations/         # IntroCurtain, KineticText, MarqueeBackdrop, SmoothScrollProvider
    interactions/       # CustomCursor, MagneticButton
    navigation/         # TopNav, SideNavDots, CommandPalette, ScrollProgressBar
    sections/           # Intro, About, Capabilities, Projects + Interactive Previews, Experiments, Journey, Contact
    three/              # KineticMonolith, AtmosphereShader, StudioEnvironment, OrbitalParticles, SceneRig, Fallbacks
    ui/                 # GlassPanel, ProfilePortrait, SectionEyebrow
  data/                 # Authentic bio, capabilities, case studies, experiments, and journey milestones
  hooks/                # Audio feedback, device capabilities, reduced motion, scroll controller
  scenes/               # Lazy-loaded React Three Fiber Canvas
  styles/               # Tailwind CSS v4 tokens, surfaces, and reduced-motion rules
  types/                # Strict TypeScript portfolio models
```

## Scripts

```bash
npm install
npm run dev      # Start Vite development server
npm run lint     # TypeScript type-check (tsc --noEmit)
npm run build    # Production build to dist/
npm run preview  # Preview production bundle locally
```
