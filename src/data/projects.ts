import blenderPbrCloseupImg from '@/assets/projects/blender-pbr-closeup.jpg';
import blenderViewportImg from '@/assets/projects/blender-viewport.jpg';
import minehostDashboardImg from '@/assets/projects/minehost-dashboard.png';
import minehostOnlineImg from '@/assets/projects/minehost-online.png';
import type { ProjectCaseStudy } from '@/types/portfolio';

export const FEATURED_PROJECTS: ProjectCaseStudy[] = [
  {
    id: 'nova-ui',
    slug: 'nova-ui',
    index: '01',
    title: 'NOVA-UI',
    subtitle: 'Autonomous Vehicle Interface, Dark Vector Navigation & 3D Chassis Layer',
    domain: 'Interactive Web & Spatial 3D HUD',
    timeframe: 'Oct 2026',
    statusLabel: 'Implemented Prototype',
    statusTone: 'implemented',
    accentHex: '#79c8e8',
    summary:
      'An experimental self-driving car cockpit interface combining custom dark-mode MapLibre GL vector mapping, live route telemetry layers, and a synchronized Three.js 3D vehicle model.',
    motivation:
      'Conventional automotive UI templates separate navigation maps from vehicle state. NOVA-UI explores how a unified dark spatial canvas can connect route guidance, telemetry providers, and role-specific operational views (Driver, Technician, Admin) in one cohesive interface.',
    approach:
      'Built a custom MapLibre `CustomLayerInterface` (`NovaVehicle3DLayer`) rendering a GLB chassis (`Koenigsegg.glb`) mapped cleanly onto MapLibre world axes (+X East, +Y North, +Z Up) with a procedural Three.js vehicle fallback so rendering never breaks if the asset fails to load.',
    implementedDetails: [
      'Custom `novaStyle` dark vector map (`#080A0D` ground, glowing `#00D2FF` route line + blur halo)',
      'Axis-corrected Three.js 3D vehicle renderer with glass, taillight emissive, wheel, and fallback geometry',
      'Clean `VehicleDataProvider` telemetry abstraction separating mock simulation data from UI',
      'Role-based modules for Driver (Navigation, Vehicle, Trips, Alerts), Technician (Diagnostics, Tests, Maintenance), and Admin',
    ],
    limitationsOrScope: [
      'Vehicle telemetry currently runs through `MockProvider` rather than live CAN-bus or physical vehicle hardware.',
    ],
    architecturePipeline: [
      'MapLibre GL Style & Worker',
      'Custom 3D GLB / Fallback Layer',
      'VehicleDataProvider Abstraction',
      'Driver / Tech / Admin Views',
    ],
    technologies: ['React', 'TypeScript', 'MapLibre GL', 'Three.js', 'Tailwind CSS', 'Vite'],
    repoUrl: 'https://github.com/nomanaqil56/NOVA-UI',
    interactivePreview: 'nova-hud',
  },
  {
    id: 'minehost',
    slug: 'minehost',
    index: '02',
    title: 'MineHost',
    subtitle: 'Local ARM64 Android Minecraft Bedrock Server Host & Lifecycle Manager',
    domain: 'Android Systems & Local Networking',
    timeframe: 'Nov 2026 · v1.0.1',
    statusLabel: 'Phase 1 Partial Acceptance',
    statusTone: 'partial',
    accentHex: '#5eead4',
    summary:
      'An Android application running a local Minecraft Bedrock-compatible server (Axolotl-PM 5.51.1 + pinned PHP 8.4.27 ZTS ARM64 binary) directly on device with LAN discovery, foreground hosting, and snapshot backups.',
    motivation:
      'Hosting multiplayer worlds usually requires external VPS hardware or desktop machines. MineHost investigates running a managed PHP ZTS server binary natively inside Android app storage with clean start/stop controls and safe world backups.',
    approach:
      'Packaged a SHA-256-verified PHP 8.4.27 ZTS binary (`libphp.so`) alongside Axolotl-PM 5.51.1, managed via an Android foreground service, transport-filtered LAN IPv4 discovery, and ZIP backup/restore with pre-restore rollback snapshots.',
    implementedDetails: [
      'Verified on physical ARM64 hardware (Android 16 / API 36): PHP 8.4.27 ZTS + 17 required extensions active',
      '64/64 JVM unit tests passing, Android lint clean, LAN discovery filtering `wlan0` while excluding cellular/VPN interfaces',
      'Configurable NetherNet UDP port (`19132`), foreground persistence, collision-safe UUID backups, and offline restore verified',
    ],
    limitationsOrScope: [
      'Real secondary-client Bedrock gameplay (Gate 7) remains blocked awaiting a second physical test device.',
      'Phase 2 public relay / NAT traversal (including legacy Playit binary execution under Android 10+ W^X restrictions) is not yet operational.',
      'Java Edition hosting and Geyser cross-play are deferred.',
    ],
    architecturePipeline: [
      'Kotlin Foreground Service',
      'Pinned PHP 8.4.27 ZTS (`libphp.so`)',
      'Axolotl-PM 5.51.1 Engine',
      'LAN Discovery & ZIP Snapshots',
    ],
    technologies: ['Kotlin', 'Android SDK', 'PHP 8.4 ZTS', 'Axolotl-PM', 'Foreground Service', 'Gradle'],
    repoUrl: 'https://github.com/nomanaqil56/MineHost',
    media: [
      {
        src: minehostDashboardImg,
        alt: 'MineHost 1.0.1 physical device dashboard showing online Bedrock server on port 19132',
        caption: 'Physical device dashboard capture (`v101_dashboard.png`) — server online on port 19132.',
      },
      {
        src: minehostOnlineImg,
        alt: 'MineHost 1.0.1 server detail view showing LAN IP 192.168.1.10:19132 and relay diagnostic state',
        caption: 'Honest network diagnostics (`v101_server_online.png`) — LAN IP verified alongside explicit RELAY ERROR state.',
      },
    ],
  },
  {
    id: 'blender-ai-studio',
    slug: 'blender-ai-studio',
    index: '03',
    title: 'Blender AI Studio',
    subtitle: 'Autonomous Desktop AI Agent Controlling Live Blender 5.3 via IPC & Vision',
    domain: 'Applied AI, 3D Automation & Local LLMs',
    timeframe: 'Nov 2026',
    statusLabel: '10/10 Benchmark Suite Passed',
    statusTone: 'implemented',
    accentHex: '#d6b384',
    summary:
      'An autonomous 3D workflow engine connecting local LLMs (Qwen2.5-Coder-7B & Qwen3.5-9B via LM Studio) to a live desktop Blender 5.3 session using main-thread `bpy.app.timers` IPC, PBR shader synthesis, and Cycles OptiX rendering.',
    motivation:
      'One-shot prompt-to-mesh tools lose scene context and cannot iteratively refine geometry, seams, lighting, or materials. Blender AI Studio treats Blender like an interactive studio workspace where an agent inspects objects, edits modifiers, and visually verifies renders.',
    approach:
      'Built a persistent localhost socket bridge (`127.0.0.1:9855`) and 7-tab Blender 5.3 addon dispatching schema-validated tool calls onto Blender’s main loop, paired with strict 8GB VRAM concurrency budgeting on RTX 5060 Laptop GPU.',
    implementedDetails: [
      'Constructed a watertight 32-panel truncated-icosahedron football (`12` pentagons, `20` hexagons, `4,700` verts, `0` non-manifold edges) with bevel seams, cast inflation, and Principled BSDF leather shaders',
      'Validated 6 multi-turn self-correction prompts (darkening leather, deepening seams, switching to 3-point lighting, scaling/rotating without duplication, and safe invalid-action recovery)',
      'Passed 10/10 automated workflow benchmarks including procedural PBR maps (`AerospaceAlloy`), GLB export QA, Cycles OptiX 720p rendering, and offline air-gapped operation',
    ],
    limitationsOrScope: [
      'Designed around strict sequential GPU scheduling within 8GB VRAM (never running heavy local diffusion concurrently with Cycles GPU rendering).',
    ],
    architecturePipeline: [
      'Qwen2.5-Coder-7B Tool Planner',
      'Socket Bridge (127.0.0.1:9855)',
      'bpy.app.timers Main-Thread Execution',
      'Cycles OptiX + Qwen3.5 Vision QA',
    ],
    technologies: ['Python', 'Blender 5.3 (bpy)', 'LM Studio', 'Qwen2.5-Coder', 'Cycles OptiX', 'PBR Shaders'],
    repoUrl: 'https://github.com/nomanaqil56/Blender-Workflow',
    media: [
      {
        src: blenderViewportImg,
        alt: 'Live Blender 5.3 viewport showing three-point studio lighting around truncated icosahedron football mesh',
        caption: 'Live Blender 5.3 viewport during Test 6.3 — three-point studio lighting rig around the 32-panel truncated icosahedron.',
      },
      {
        src: blenderPbrCloseupImg,
        alt: 'Close-up render of Blender AI Studio PBR leather surface roughness and panel seams',
        caption: 'Close-up Cycles surface study showing Principled BSDF leather sheen and physical recessed bevel seams.',
      },
    ],
  },
  {
    id: 'assistant-x',
    slug: 'assistant-x',
    index: '04',
    title: 'Assistant X',
    subtitle: 'Local-First Android AI Assistant with Fluid Particle Orb & Intent Engine',
    domain: 'Android Compose UI & On-Device Assistance',
    timeframe: 'Oct 2026',
    statusLabel: 'In Active Development',
    statusTone: 'in-progress',
    accentHex: '#60a5fa',
    summary:
      'A local-first Android assistant concept and Compose application combining a state-driven fluid particle orb (`AssistantOrb`), multi-session chat drawer, command history, and a deterministic `CommandParser -> ActionValidator -> ActionExecutor` pipeline.',
    motivation:
      'Cloud voice assistants create latency and privacy friction for everyday device actions. Assistant X explores a cinematic, calm, borderless Android assistant capable of parsing natural commands locally and reacting visually across processing stages.',
    approach:
      'Implemented a reactive `AssistantStateManager` driving `IDLE -> PROCESSING -> PLANNING -> EXECUTING -> SPEAKING -> COMPLETED` transitions, paired with Jetpack Compose Canvas particle physics, app package resolution, and Android `TextToSpeech` voice feedback.',
    implementedDetails: [
      'Deterministic `CommandParser` supporting `"open <app>"`, `"launch <app>"`, `"go home"`, and `"go back"` intents',
      '`ActionExecutor` launching resolved Android applications with explicit `ActivityNotFoundException` and `SecurityException` guards, plus Android Home navigation',
      'Multi-harmonic `AssistantOrb` rendered on Compose Canvas alongside multi-session side menu and current-chat command history',
    ],
    limitationsOrScope: [
      'Global `"go back"` and deep in-app UI automation remain intended vision items requiring an `AccessibilityService` integration (currently surfaces an honest diagnostic message).',
      'On-device NLU/LLM expansion beyond structured intent parsing is part of the forward roadmap.',
    ],
    architecturePipeline: [
      'CommandParser Intent Extraction',
      'ActionValidator & AppResolver',
      'ActionExecutor Android Intents',
      'TextToSpeech & Compose Orb',
    ],
    technologies: ['Kotlin', 'Jetpack Compose', 'Material 3', 'Coroutines / StateFlow', 'Android TTS'],
    repoUrl: 'https://github.com/nomanaqil56/Assistant-X',
    interactivePreview: 'assistant-orb',
  },
  {
    id: 'cuedrop',
    slug: 'cuedrop',
    index: '05',
    title: 'CueDrop',
    subtitle: 'Music Moment Sharing & Ambient Android Home-Screen Widget Concept',
    domain: 'Mobile Interaction & Product Concept',
    timeframe: 'Concept Study',
    statusLabel: 'Concept Exploration',
    statusTone: 'concept',
    accentHex: '#f472b6',
    summary:
      'An interaction-first Android widget concept built around capturing and sharing specific memorable timestamps from a song — turning passive playback widgets into expressive musical memory cards.',
    motivation:
      'Standard music widgets only show play/pause and track title. When people share music, they rarely want to share an entire four-minute song blindly — they want to highlight the exact 15-second drop, lyric, or bridge that stood out.',
    approach:
      'Explored an ambient, low-friction widget model where album art palette extraction drives dark subtle backdrop tinting, paired with a tactile timeline scrubber to mark a timestamp cue and generate a clean shareable moment card.',
    implementedDetails: [
      'Defined the core widget gesture loop: mark cue timestamp -> preview snippet card -> share to close circle',
      'Designed compact dark-glass Android widget typography and minimal playback affordances',
    ],
    limitationsOrScope: [
      'CueDrop is currently an interface and interaction concept exploration; no production Android APK or public repository has been shipped yet.',
    ],
    architecturePipeline: [
      'Active Playback Listener (Concept)',
      'Timestamp Cue Marker',
      'Dynamic Album Palette Card',
      'Zero-Friction Share Sheet',
    ],
    technologies: ['Android Widget UX', 'Interaction Design', 'Micro-Typography', 'Motion Concept'],
    interactivePreview: 'cuedrop-widget',
  },
  {
    id: 'duaen-foundation',
    slug: 'duaen-foundation',
    index: '06',
    title: 'Duaen Foundation Website',
    subtitle: 'Accessible Multi-Route Frontend Architecture for a Social Welfare NGO',
    domain: 'Production Web Engineering & Accessibility',
    timeframe: 'Nov 2026',
    statusLabel: 'Frontend Implemented',
    statusTone: 'implemented',
    accentHex: '#e07a5f',
    summary:
      'Designed and implemented a responsive, WCAG 2.2 AA–conscious React + TypeScript website for Duaen Foundation NGO (`duaenfoundationngo.in`), uniting program storytelling, official emblem extraction, and transparent content governance.',
    motivation:
      'Community welfare organizations need trustworthy digital communication that works cleanly on low-end mobile phones without fabricating unverified metrics, fake payment forms, or unapproved credentials.',
    approach:
      'Engineered an 11-page React Router v7 application with Tailwind CSS v4 design tokens (`#24324A` navy, `#C45D42` terracotta, `#F7F1E8` warm cream), extracted transparent brand marks from `Logo.pdf`, and maintained a strict `CONTENT_VERIFICATION.md` registry separating confirmed details from pending legal/payment items.',
    implementedDetails: [
      'Implemented accessible navigation, skip links, `:focus-visible` outlines, WAI-ARIA accordions, and keyboard-navigable lightbox photo gallery',
      'Enforced truthful prototype behavior — non-transactional Donate guidance and explicit demo-only form notices instead of misleading fake submissions',
      'Configured `vercel.json` SPA routing and automated static analysis via `tsc -b` + `oxlint` (`0` errors)',
    ],
    limitationsOrScope: [
      'Frontend-only implementation: volunteer/contact enquiries do not transmit to a backend server, and official payment/registration IDs await organizational confirmation per `CONTENT_VERIFICATION.md`.',
    ],
    architecturePipeline: [
      'Design Tokens (Tailwind v4)',
      'React Router v7 (11 Routes)',
      'WCAG 2.2 AA Components & Lightbox',
      'CONTENT_VERIFICATION Audit Gate',
    ],
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS v4', 'React Router v7', 'Vite 8', 'Oxlint'],
    liveUrl: 'https://duaenfoundationngo.in',
  },
];
