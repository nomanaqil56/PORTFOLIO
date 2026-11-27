import type { ProjectCaseStudy } from '@/types/portfolio';

export const FEATURED_PROJECTS: ProjectCaseStudy[] = [
  {
    id: 'nova-ui',
    slug: 'nova-ui',
    index: '01',
    title: 'NOVA-UI',
    category: 'Interactive Web Development / Automotive UI / 3D Visualisation',
    shortIntro: 'Interactive Automotive Interface & 3D Map Experience',
    overview: [
      'NOVA-UI is an experimental automotive interface project focused on creating a visually immersive digital experience inspired by next-generation vehicle cockpits.',
      'The project explores how interactive mapping, 3D vehicle visualisation, and dark spatial UI design can operate together inside one cohesive browser environment.',
      'Note: NOVA-UI is an interface and 3D visualisation exploration—real-time vehicle navigation, autonomous driving, and live physical vehicle telemetry have not been implemented.',
    ],
    motivation:
      'Conventional dashboard prototypes often treat navigation maps and 3D vehicle models as disconnected widgets. NOVA-UI investigates integrating a 3D vehicle mesh directly into a dark MapLibre GL coordinate space alongside role-oriented interface layouts.',
    technicalExploration: [
      'Integrated MapLibre GL with custom dark vector styling and debugged vector tile rendering issues.',
      'Investigated alternative tile sources and experimented with OpenFreeMap Liberty styling (`liberty.json`) and custom dark style layers (`novaStyle.ts`).',
      'Loaded a Koenigsegg GLB asset (`Koenigsegg.glb`) via Three.js `CustomLayerInterface` (`NovaVehicle3DLayer`), calibrating scale, Euler orientation (`XYZ`), and ground alignment inside MapLibre world coordinates.',
      'Included a procedural Three.js vehicle silhouette fallback so the 3D layer degrades gracefully when GLB loading is unavailable.',
    ],
    challenges: [
      'Diagnosing broken initial vector tile configurations and aligning OpenFreeMap style sources cleanly.',
      'Translating GLB native coordinates (+X Left, +Y Up, +Z Forward) into MapLibre’s world space (+X East, +Y North, +Z Up) without upside-down or floating meshes.',
    ],
    status: 'Experimental',
    statusNote:
      'Active UI & 3D map visualisation experiment; vehicle state uses mock provider scaffolding rather than physical hardware telemetry.',
    nextDirection:
      'Refine camera transitions between cockpit views and optimize GLB shader integration under dark map lighting.',
    technologies: ['MapLibre GL', 'Three.js', '3D GLB Assets', 'React', 'TypeScript', 'Tailwind CSS'],
    workflowNodes: [
      {
        id: 'maplibre',
        label: 'MapLibre Engine',
        detail: 'Dark vector canvas with OpenFreeMap / customized Liberty styling.',
        implemented: true,
      },
      {
        id: 'tile-debug',
        label: 'Tile & Style Layer',
        detail: 'Resolved initial tile rendering failures with custom dark vector layer paint.',
        implemented: true,
      },
      {
        id: 'glb-align',
        label: '3D GLB Alignment',
        detail: 'Calibrated Koenigsegg.glb scale, grounding, and XYZ rotation inside MapLibre.',
        implemented: true,
      },
      {
        id: 'cockpit-ui',
        label: 'Cockpit Shell',
        detail: 'Multi-view experimental automotive interface layout (non-telemetry simulation).',
        implemented: true,
      },
    ],
    visualTheme: 'nova-grid',
    accentHex: '#79c8e8',
    repoUrl: 'https://github.com/nomanaqil56/NOVA-UI',
  },
  {
    id: 'minehost',
    slug: 'minehost',
    index: '02',
    title: 'MineHost',
    category: 'Android Development / Networking / Mobile Infrastructure',
    shortIntro: 'Minecraft Server Hosting Directly From Android',
    overview: [
      'MineHost is an Android application exploring the possibility of hosting a Minecraft Bedrock-compatible server locally on an ARM64 Android device.',
      'The goal is to give players portable control over multiplayer server lifecycle, connection details, and world backups without relying entirely on external hosting providers.',
    ],
    motivation:
      'Dedicated server hosting typically depends on external VPS instances or desktop hardware. MineHost explores whether modern mobile hardware can act as a self-contained host—and confronts the real networking hurdles of reaching players outside local Wi-Fi.',
    technicalExploration: [
      'Managed local server process execution and lifecycle states inside an Android foreground service.',
      'Built Gradle CI validation, Android lint checks, and 64 passing JVM unit tests covering runtime contracts, configuration, and LAN interface filtering.',
      'Conducted physical Android device testing (`v1.0.1`) verifying local startup, LAN IPv4 discovery, and world backup/restore workflows.',
      'Investigated relay and tunnelling strategies to understand cross-network connectivity across Wi-Fi and mobile data.',
    ],
    challenges: [
      'Handling Android background lifecycle limits, wake-locks, and binary execution constraints.',
      'Distinguishing local LAN reachability (`192.168.x.x`) from cross-network CGNAT/NAT traversal.',
      'Resolving permanent cross-network tunnelling and completing secondary physical-client gameplay verification (currently unfinished).',
    ],
    status: 'In Development',
    statusNote:
      'Local Android hosting and 64 JVM unit tests validated; permanent cross-network tunnelling and multi-device gameplay remain ongoing challenges.',
    nextDirection:
      'Complete real secondary-client Bedrock verification and design a reliable Android-compliant relay / tunnel layer.',
    technologies: ['Kotlin', 'Android SDK', 'Networking', 'Server Management', 'Tunnelling Research', 'Gradle'],
    workflowNodes: [
      {
        id: 'host',
        label: 'Android Host',
        detail: 'Kotlin foreground service managing lifecycle, permissions, and storage.',
        implemented: true,
      },
      {
        id: 'server',
        label: 'Minecraft Server',
        detail: 'Local Bedrock-compatible server runtime, world persistence, and port config.',
        implemented: true,
      },
      {
        id: 'tunnel',
        label: 'Networking / Tunnel Layer',
        detail: 'LAN discovery working; permanent cross-network relay/tunnelling remains in progress.',
        implemented: false,
      },
      {
        id: 'remote',
        label: 'Remote Connection',
        detail: 'NAT / CGNAT traversal target for reaching beyond host Wi-Fi.',
        implemented: false,
      },
      {
        id: 'player',
        label: 'Minecraft Player',
        detail: 'Target multiplayer client endpoint (local LAN tested; remote client pending).',
        implemented: false,
      },
    ],
    visualTheme: 'minehost-network',
    accentHex: '#5eead4',
    repoUrl: 'https://github.com/nomanaqil56/MineHost',
  },
  {
    id: 'blender-ai-studio',
    slug: 'blender-ai-studio',
    index: '03',
    title: 'Blender AI Studio',
    category: 'Artificial Intelligence / 3D Development / Automation',
    shortIntro: 'Autonomous AI-Assisted 3D Creation Workflow',
    overview: [
      'Blender AI Studio investigates connecting an autonomous AI agent directly to a live desktop Blender instance so the model can inspect the scene, issue structured operations, and iteratively refine 3D assets.',
      'Rather than generating disconnected one-off scripts, the architecture establishes persistent inter-process communication with Blender while respecting Blender’s strict main-thread execution model.',
    ],
    motivation:
      'Static prompt-to-script tools break down on multi-step refinement tasks like adjusting bevel depth, lighting balance, or material roughness. Connecting an agent directly to live Blender enables conversational iteration inside an active 3D scene.',
    technicalExploration: [
      'Implemented a local socket IPC bridge operating on `127.0.0.1:9855` between external AI tooling and the running Blender addon.',
      'Scheduled Python `bpy` mesh, material, and camera commands safely on Blender’s main loop via `bpy.app.timers` to avoid socket-thread crashes.',
      'Demonstrated procedural football creation using a truncated icosahedron topology: 12 pentagonal faces, 20 hexagonal faces, recessed bevel seams, spherical cast inflation, and leather-inspired Principled BSDF materials.',
      'Tested Cycles rendering with OptiX GPU acceleration and local LLM workflows on Windows 11 with an NVIDIA RTX 5060 Laptop GPU.',
    ],
    challenges: [
      'Preventing crashes caused by mutating `bpy` scene structures from background IPC threads.',
      'Managing 8GB GPU VRAM contention between local language/vision models and Cycles OptiX rendering.',
      'Maintaining spatial object context across iterative follow-up refinements without duplicating geometry.',
    ],
    status: 'Demonstrated Prototype',
    statusNote:
      'Live IPC bridge (`127.0.0.1:9855`), `bpy.app.timers` execution, and procedural football Cycles workflow demonstrated on RTX 5060 hardware; multimodal autonomy continues evolving.',
    nextDirection:
      'Expand autonomous scene understanding and multi-object layout reasoning across complex architectural assemblies.',
    technologies: ['Python', 'Blender API (bpy)', 'IPC (127.0.0.1:9855)', 'AI Agents', 'Procedural 3D', 'Local Models'],
    workflowNodes: [
      {
        id: 'agent',
        label: 'AI Agent',
        detail: 'Parses natural-language 3D tasks into structured schema-validated tool calls.',
        implemented: true,
      },
      {
        id: 'ipc',
        label: 'IPC Bridge',
        detail: 'Localhost socket bridge (`127.0.0.1:9855`) coupled with `bpy.app.timers` main-thread dispatch.',
        implemented: true,
      },
      {
        id: 'bpy',
        label: 'Blender API',
        detail: 'Direct scene inspection, object transforms, and modifier orchestration.',
        implemented: true,
      },
      {
        id: 'scene',
        label: 'Scene Construction',
        detail: 'Procedural truncated icosahedron (12 pentagons, 20 hexagons) & recessed seam bevels.',
        implemented: true,
      },
      {
        id: 'materials',
        label: 'Materials & Lighting',
        detail: 'Principled BSDF leather shaders and 3-point studio lighting setups.',
        implemented: true,
      },
      {
        id: 'render',
        label: 'Rendering',
        detail: 'Cycles rendering accelerated via OptiX GPU on Windows 11 (RTX 5060 Laptop GPU).',
        implemented: true,
      },
    ],
    visualTheme: 'blender-icosahedron',
    accentHex: '#d6b384',
    repoUrl: 'https://github.com/nomanaqil56/Blender-Workflow',
  },
  {
    id: 'assistant-x',
    slug: 'assistant-x',
    index: '04',
    title: 'Assistant X',
    category: 'Artificial Intelligence / Android Development / Personal Computing',
    shortIntro: 'Offline-First Personal AI Assistant for Android',
    overview: [
      'Assistant X is an ongoing exploration into a local-first personal Android assistant designed around privacy, calm minimalism, and direct interaction with the Android device environment.',
      'Instead of acting solely as a cloud chat wrapper, the architecture aims to bridge local intent understanding with permission-aware device actions while optionally using online inference when needed.',
    ],
    motivation:
      'Voice assistants are often tethered to cloud latency and fail when offline or asked to coordinate straightforward device routines transparently.',
    technicalExploration: [
      'Built an early Jetpack Compose interface featuring multi-session chats, current-chat command history, and a minimal borderless visual theme.',
      'Implemented a structured Kotlin command pipeline (`CommandParser -> ActionValidator -> ActionExecutor`) supporting initial local app launching, Home navigation, and Android `TextToSpeech` feedback.',
      'Designed the conceptual architecture for local LLM reasoning, optional cloud escalation, and overlay/lock-screen accessibility.',
    ],
    challenges: [
      'Designing safe, permission-aware Android action execution (`AccessibilityService` boundaries for global navigation and cross-app control remain unimplemented).',
      'Balancing compact mobile memory budgets for future local language model integration.',
    ],
    status: 'In Development',
    statusNote:
      'Ongoing exploration: Compose UI and basic local intent routing exist; full local LLM inference, voice capture pipelines, and Accessibility-level OS automation remain part of the concept vision.',
    nextDirection:
      'Integrate lightweight on-device model inference and explicit permission workflows for multi-step Android actions.',
    technologies: ['Android', 'Kotlin', 'Jetpack Compose', 'Local AI Vision', 'Intent Architecture'],
    workflowNodes: [
      {
        id: 'input',
        label: 'User Command',
        detail: 'Text input implemented in Compose; full voice capture remains in design exploration.',
        implemented: true,
      },
      {
        id: 'local-ai',
        label: 'Local Processing',
        detail: 'Deterministic intent parsing implemented; local LLM reasoning planned.',
        implemented: false,
      },
      {
        id: 'hybrid',
        label: 'Optional Cloud Bridge',
        detail: 'Planned hybrid fallback when internet connectivity and user consent are available.',
        implemented: false,
      },
      {
        id: 'actions',
        label: 'Android Actions',
        detail: 'App launch & Home intents active; global Accessibility automation planned.',
        implemented: true,
      },
    ],
    visualTheme: 'assistant-nodes',
    accentHex: '#60a5fa',
    repoUrl: 'https://github.com/nomanaqil56/Assistant-X',
  },
  {
    id: 'cuedrop',
    slug: 'cuedrop',
    index: '05',
    title: 'CueDrop',
    category: 'Mobile Application Concept / UI Design / Music Experience',
    shortIntro: 'A Personal Music Experience for the Home Screen',
    overview: [
      'CueDrop is a concept for a music-focused Android widget designed around saving and revisiting the exact emotional moment of a song rather than displaying a generic album-art player.',
      'Users pick a favorite track, isolate a specific duration or lyric cue, and surface that personalized moment directly on their home screen through minimalistic waveform visuals.',
    ],
    motivation:
      'Most music widgets reduce songs to play/pause buttons and cover thumbnails. CueDrop asks how a home screen can preserve personal musical memories cleanly while adapting naturally to any wallpaper.',
    technicalExploration: [
      'Mapped the 6-step user journey: select song -> choose duration -> identify lyric/moment -> save cue -> render ambient widget -> revisit & replay.',
      'Explored minimalistic audio-waveform patterns and adaptive surface contrast so widgets feel native across diverse home-screen wallpapers.',
    ],
    challenges: [
      'Designing expressive musical identity inside compact Android widget dimensions without visual clutter or heavy album-art boxes.',
      'Coordinating Android media-session timestamp seeking and clean widget refresh budgets once implementation begins.',
    ],
    status: 'Concept',
    statusNote:
      'Pure product & interaction design concept; no Android application codebase or working widget implementation has been built yet.',
    nextDirection:
      'Prototype Glance/Compose Android widget layouts and explore lightweight playback-cue deep linking.',
    technologies: ['Music Experience', 'Android Widget UX', 'UI Design', 'Interaction Design'],
    workflowNodes: [
      {
        id: 'select',
        label: 'Select Track',
        detail: 'Choose a meaningful song from playback history or active listening.',
        implemented: false,
      },
      {
        id: 'cue',
        label: 'Mark Moment',
        detail: 'Trim a specific timestamp window or lyric section as a personal cue.',
        implemented: false,
      },
      {
        id: 'waveform',
        label: 'Waveform Identity',
        detail: 'Render minimalistic frequency geometry that adapts calmly to wallpapers.',
        implemented: false,
      },
      {
        id: 'widget',
        label: 'Home-Screen Replay',
        detail: 'One-tap revisit from the personalized home-screen widget.',
        implemented: false,
      },
    ],
    visualTheme: 'cuedrop-wave',
    accentHex: '#f472b6',
  },
  {
    id: 'duaen-foundation',
    slug: 'duaen-foundation',
    index: '06',
    title: 'Duaen Foundation Website',
    category: 'Web Development / UI Implementation / Content Presentation',
    shortIntro: 'Website Development for a Non-Profit Organisation',
    overview: [
      'Contributed website architecture, responsive UI implementation, and structured content presentation for Duaen Foundation NGO (`duaenfoundationngo.in`).',
      'The focus centered on clear storytelling around grassroots education, women’s empowerment, and healthcare initiatives while keeping visual refinements faithful to the organization’s calm editorial identity.',
    ],
    motivation:
      'Non-profit websites need clear information hierarchy, trustworthy presentation of verified organizational records, and dependable accessibility across everyday mobile devices.',
    technicalExploration: [
      'Organized homepage sections, program overviews, Team and Career pages, and an accessible Lightbox photo gallery.',
      'Improved Volunteer and Contact workflows with client-side validation and secure volunteer attachment checks (extension, MIME, and executable signature filtering).',
      'Integrated official registration reference (`GHA/00572/2020-21`), direct phone/email contact cards, and transparent verification notices (`CONTENT_VERIFICATION.md`).',
    ],
    challenges: [
      'Presenting sensitive organizational, volunteer, and donation guidance truthfully without fabricated claims or misleading backend-less form success states.',
      'Maintaining cohesive typography and responsive spacing across 11 routes while integrating diverse community program content.',
    ],
    status: 'Demonstrated Prototype',
    statusNote:
      'Frontend routes, Team/Career pages, gallery lightbox, and attachment validation implemented; backend enquiry delivery and pending statutory records remain documented in CONTENT_VERIFICATION.md.',
    nextDirection:
      'Connect verified backend form endpoints and publish approved statutory documents as organizational confirmation completes.',
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS v4', 'React Router v7', 'Responsive UI'],
    workflowNodes: [
      {
        id: 'ia',
        label: 'Information Architecture',
        detail: '11 structured routes covering Home, About, Programs, Impact, Team, and Career.',
        implemented: true,
      },
      {
        id: 'gallery',
        label: 'Gallery & Editorial UI',
        detail: 'Accessible Lightbox photo presentation and calm navy/terracotta/cream editorial grids.',
        implemented: true,
      },
      {
        id: 'forms',
        label: 'Volunteer & Contact UX',
        detail: 'Validated forms with document attachment sanitization and honest submission notices.',
        implemented: true,
      },
      {
        id: 'governance',
        label: 'Content Governance',
        detail: 'Official registration presentation paired with strict CONTENT_VERIFICATION.md auditing.',
        implemented: true,
      },
    ],
    visualTheme: 'duaen-editorial',
    accentHex: '#e07a5f',
    liveUrl: 'https://duaenfoundationngo.in',
  },
];
