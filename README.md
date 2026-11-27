# Noman Aqil — Interactive 3D Digital Portfolio

An interactive dark-minimalist portfolio rebuilt with **React 19**, **TypeScript**, **Vite 8**, **Three.js**, **React Three Fiber**, **Drei**, **GSAP**, **Framer Motion**, **Lenis**, and **Tailwind CSS v4**, evolving the original HTML/Three.js slides (`Slide1.html` & `Slide2.html`, preserved at commit `57a54c6` on `main`).

## Core Architecture

- **Zero-Lag Frustum-Projected 3D Choreography**: Layout-measured section anchors (`ResizeObserver` + GSAP easing) drive camera and monolith world positions via perspective frustum projection (`stagePoses.ts`), arriving in exact synchronization with every section across desktop, tablet, and mobile viewports.
- **Dedicated Interaction & Motion Separation**:
  - **Custom Cursor**: RAF-driven contextual cursor (`VIEW`, `EXPLORE`, `OPEN`, `DRAG`, `COPY`) for fine pointers with automatic touch-device disablement.
  - **Interactive 3D Stage**: Drag-to-rotate hero zone, real-time material finishes (`Monolith`, `Topology`, `Optics`), spin tempo and accent lighting controls, far-plane depth-tested GLSL atmospheric fog, and graceful SVG fallback.
  - **Opt-In Audio & Command Index**: Muted-by-default Web Audio synthesis and `Ctrl+K` / `⌘K` command navigation.
- **Typography & Diagram-Driven Case Studies (No Project Photos)**:
  - **NOVA-UI**: Topographic coordinate grid, animated route spline, and 3D GLB coordinate breakdown.
  - **MineHost**: Interactive 5-stage Android host -> server -> tunnel -> remote player networking diagram.
  - **Blender AI Studio**: Live procedural 3D Truncated Icosahedron wireframe canvas (`12` pentagons + `20` hexagons) paired with interactive IPC (`127.0.0.1:9855`) workflow stages.
  - **Assistant X**: Connected local-first intelligent node architecture explorer.
  - **CueDrop**: Draggable harmonic waveform widget concept study.
  - **Duaen Foundation Website**: Structured editorial information-architecture layout.

## Scripts

```bash
npm install
npm run dev      # Start Vite development server
npm run lint     # TypeScript type-check (tsc --noEmit)
npm run build    # Production build to dist/
npm run preview  # Preview production bundle locally
```
