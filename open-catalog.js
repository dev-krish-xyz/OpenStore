// Curated from official project documentation. Research notes: research/catalog-audit.md
export const openCatalog = [
  {
    "id": "open-notebook",
    "name": "Open Notebook",
    "repo": "lfnovo/open-notebook",
    "category": "AI",
    "platforms": [
      "Web"
    ],
    "selfHosted": true,
    "replaces": [
      "Google NotebookLM"
    ],
    "description": "Your research, connected. Your models, your choice.",
    "about": "A self-hosted research workspace for collecting sources, asking questions, and generating audio discussions. Connect supported local or cloud model providers while keeping your research workspace under your control.",
    "features": [
      "Source-based research",
      "Multiple model providers",
      "Audio discussion generation"
    ],
    "website": "https://www.open-notebook.ai",
    "docs": "https://github.com/lfnovo/open-notebook#readme",
    "license": "MIT",
    "icon": "layers",
    "color": "#667b70",
    "screens": [
      [
        "open-notebook-screen.png",
        "Official Open Notebook sources workspace"
      ]
    ],
    "popular": false,
    "bestFor": "Private, source-based research",
    "consideration": "Requires a server and model setup; cloud inference can cost extra.",
    "addedAt": "2026-10-05",
    "researchSource": "https://github.com/lfnovo/open-notebook#readme"
  },
  {
    "id": "openpencil",
    "name": "OpenPencil",
    "repo": "open-pencil/open-pencil",
    "category": "Design",
    "platforms": [
      "macOS",
      "Windows",
      "Linux",
      "Web"
    ],
    "selfHosted": false,
    "replaces": [
      "Figma"
    ],
    "description": "A design canvas that keeps your files open.",
    "about": "An MIT-licensed design editor with native Figma file support, components, auto layout, programmable tools, and peer-to-peer collaboration. Use the browser or desktop app and connect your own AI provider.",
    "features": [
      "Read and write .fig files",
      "Components and auto layout",
      "Desktop and browser editor"
    ],
    "website": "https://openpencil.dev",
    "docs": "https://github.com/open-pencil/open-pencil#readme",
    "license": "MIT",
    "icon": "layers",
    "color": "#667b70",
    "screens": [
      [
        "openpencil-screen.png",
        "Official OpenPencil design editor"
      ]
    ],
    "popular": false,
    "bestFor": "Editable Figma files and local design",
    "consideration": "An actively evolving editor; verify the features you depend on before migrating.",
    "addedAt": "2026-10-05",
    "researchSource": "https://github.com/open-pencil/open-pencil#readme"
  },
  {
    "id": "opensign",
    "name": "OpenSign",
    "repo": "OpenSignLabs/OpenSign",
    "category": "Productivity",
    "platforms": [
      "Web"
    ],
    "selfHosted": true,
    "replaces": [
      "DocuSign",
      "Adobe Acrobat Sign",
      "PandaDoc"
    ],
    "description": "Send. Sign. Keep your documents in your hands.",
    "about": "A self-hostable document signing platform with signing workflows, document management, and audit trails. OpenSign offers an AGPL community codebase alongside commercial hosting and services.",
    "features": [
      "Document signing workflows",
      "Audit trails",
      "Self-hosted deployment"
    ],
    "website": "https://www.opensignlabs.com",
    "docs": "https://github.com/OpenSignLabs/OpenSign#readme",
    "license": "AGPL-3.0",
    "icon": "layers",
    "color": "#667b70",
    "screens": [],
    "popular": false,
    "bestFor": "Document signing without a SaaS dependency",
    "consideration": "Set up your own email and hosting; check signing requirements for your workflow.",
    "addedAt": "2026-10-05",
    "researchSource": "https://github.com/OpenSignLabs/OpenSign#readme"
  },
  {
    "id": "openshot",
    "name": "OpenShot",
    "repo": "OpenShot/openshot-qt",
    "category": "Video",
    "platforms": [
      "macOS",
      "Windows",
      "Linux"
    ],
    "selfHosted": false,
    "replaces": [
      "Adobe Premiere Elements",
      "CapCut"
    ],
    "description": "A friendly first step into video editing.",
    "about": "A cross-platform video editor with a multi-track timeline, transitions, keyframe animation, and titles. Its approachable workflow suits everyday videos and learning the fundamentals of editing.",
    "features": [
      "Multi-track editing",
      "Titles and transitions",
      "Keyframe animation"
    ],
    "website": "https://www.openshot.org",
    "docs": "https://github.com/OpenShot/openshot-qt#readme",
    "license": "GPL-3.0-or-later",
    "icon": "layers",
    "color": "#667b70",
    "screens": [],
    "popular": false,
    "bestFor": "Everyday videos and first-time editors",
    "consideration": "Reviews mention slow rendering and feature limitations; try a representative project first.",
    "addedAt": "2026-10-05",
    "researchSource": "https://github.com/OpenShot/openshot-qt#readme"
  },
  {
    "id": "openscreen",
    "name": "OpenScreen",
    "repo": "getopenscreen/openscreen",
    "category": "Video",
    "platforms": [
      "macOS",
      "Windows",
      "Linux"
    ],
    "selfHosted": false,
    "replaces": [
      "Screen Studio",
      "Loom"
    ],
    "description": "Record your screen and turn it into a polished demo.",
    "about": "A free, local-first screen recorder and video editor for polished product demos and walkthroughs. Capture a display or window, refine zooms and cursor movement, add webcam layouts and captions, then export without an account, watermark, or subscription.",
    "features": [
      "Native screen and system-audio capture",
      "Automatic zooms and cursor effects",
      "Local editing, captions, and GPU-accelerated export"
    ],
    "website": "https://getopenscreen.com",
    "docs": "https://getopenscreen.com/docs/intro/",
    "license": "MIT",
    "icon": "video",
    "color": "#00d65f",
    "screens": [],
    "popular": true,
    "bestFor": "Polished product demos and walkthroughs",
    "consideration": "The project is evolving quickly, and it does not provide hosted sharing, live streaming, or mobile capture.",
    "addedAt": "2026-10-06",
    "researchSource": "https://github.com/getopenscreen/openscreen#readme"
  },
  {
    "id": "opencloud",
    "name": "OpenCloud",
    "repo": "opencloud-eu/opencloud",
    "category": "Productivity",
    "platforms": [
      "Web"
    ],
    "selfHosted": true,
    "replaces": [
      "Dropbox",
      "Google Drive"
    ],
    "description": "A shared home for files. On your own cloud.",
    "about": "An open-source file management and collaboration platform. Deploy the OpenCloud server to manage, share, and collaborate on files through its web interface and supported clients.",
    "features": [
      "File management",
      "Sharing and collaboration",
      "Self-hosted server"
    ],
    "website": "https://opencloud.eu",
    "docs": "https://github.com/opencloud-eu/opencloud#readme",
    "license": "Apache-2.0",
    "icon": "layers",
    "color": "#667b70",
    "screens": [],
    "popular": false,
    "bestFor": "Team file sharing on infrastructure you own",
    "consideration": "Requires server administration; connected office editors have their own deployment requirements.",
    "addedAt": "2026-10-05",
    "researchSource": "https://github.com/opencloud-eu/opencloud#readme"
  },
  {
    "id": "openwhispr",
    "name": "OpenWhispr",
    "repo": "OpenWhispr/openwhispr",
    "category": "Productivity",
    "platforms": [
      "macOS",
      "Windows",
      "Linux"
    ],
    "selfHosted": false,
    "replaces": [
      "Wispr Flow",
      "Superwhisper",
      "Otter.ai"
    ],
    "description": "Turn a thought into text. In any app.",
    "about": "A desktop dictation and transcription app with global hotkeys, meeting transcription, notes, and a choice of local or cloud models. Core workflows can run with local models on compatible hardware.",
    "features": [
      "System-wide dictation",
      "Meeting transcription and notes",
      "Local or cloud models"
    ],
    "website": "https://openwhispr.com",
    "docs": "https://github.com/OpenWhispr/openwhispr#readme",
    "license": "MIT",
    "icon": "layers",
    "color": "#667b70",
    "screens": [],
    "popular": false,
    "bestFor": "Private dictation and meeting notes",
    "consideration": "Local models need disk space and suitable hardware; hosted services have separate pricing.",
    "addedAt": "2026-10-05",
    "researchSource": "https://github.com/OpenWhispr/openwhispr#readme"
  },
  {
    "id": "openwork",
    "name": "OpenWork",
    "repo": "different-ai/openwork",
    "category": "AI",
    "platforms": [
      "macOS",
      "Windows",
      "Linux"
    ],
    "selfHosted": true,
    "replaces": [
      "Claude Cowork",
      "Codex desktop interface"
    ],
    "description": "A desktop workspace for agents doing real work.",
    "about": "An OpenCode-powered desktop app where agents work with your files, skills, and MCP tools. The desktop and core code are MIT-licensed; the separate OpenWork Den organization control plane has its own source-available license.",
    "features": [
      "Agents on local files",
      "Multiple model providers",
      "Shared skills and MCP tools"
    ],
    "website": "https://openworklabs.com",
    "docs": "https://github.com/different-ai/openwork#readme",
    "license": "MIT core + OpenWork EE",
    "icon": "layers",
    "color": "#667b70",
    "screens": [],
    "popular": false,
    "bestFor": "Agent workflows on your own files",
    "consideration": "The ee/ directory requires its own license terms; provider access may cost extra.",
    "addedAt": "2026-10-05",
    "researchSource": "https://github.com/different-ai/openwork#readme"
  },
  {
    "id": "openclaw",
    "name": "OpenClaw",
    "repo": "openclaw/openclaw",
    "category": "AI",
    "platforms": [
      "macOS",
      "Windows",
      "Linux",
      "Web",
      "iOS",
      "Android"
    ],
    "selfHosted": true,
    "replaces": [
      "ChatGPT personal assistant workflows",
      "Microsoft Copilot assistant workflows"
    ],
    "description": "Your assistant, on your devices and in your chats.",
    "about": "An open-source assistant platform with a local gateway, tools, messaging integrations, and companion apps. Connect a supported model provider and configure the actions and channels you want it to use.",
    "features": [
      "Messaging channel integrations",
      "Local gateway and tools",
      "Desktop and mobile companions"
    ],
    "website": "https://openclaw.ai",
    "docs": "https://github.com/openclaw/openclaw#readme",
    "license": "MIT",
    "icon": "layers",
    "color": "#667b70",
    "screens": [],
    "popular": false,
    "bestFor": "A configurable personal assistant across channels",
    "consideration": "Requires model access and configuration; it is a platform rather than a turnkey chatbot.",
    "addedAt": "2026-10-05",
    "researchSource": "https://github.com/openclaw/openclaw#readme"
  },
  {
    "id": "openinterpreter",
    "name": "Open Interpreter",
    "repo": "OpenInterpreter/open-interpreter",
    "category": "AI",
    "platforms": [
      "macOS",
      "Windows",
      "Linux"
    ],
    "selfHosted": false,
    "replaces": [
      "Claude Code",
      "Codex coding agent"
    ],
    "description": "An open-model coding agent for your terminal.",
    "about": "A terminal coding agent supporting OpenAI-compatible providers, model switching, native command sandboxing, and editor integrations through Agent Client Protocol. Its current codebase focuses on open-model coding workflows.",
    "features": [
      "Configurable model providers",
      "Terminal coding workflows",
      "Agent Client Protocol support"
    ],
    "website": "https://www.openinterpreter.com",
    "docs": "https://github.com/OpenInterpreter/open-interpreter#readme",
    "license": "Apache-2.0",
    "icon": "layers",
    "color": "#667b70",
    "screens": [],
    "popular": false,
    "bestFor": "Coding with interchangeable model providers",
    "consideration": "Model capability and provider costs vary; current product differs from early Python-based versions.",
    "addedAt": "2026-10-05",
    "researchSource": "https://github.com/OpenInterpreter/open-interpreter#readme"
  },
  {
    "id": "opendesign",
    "name": "OpenDesign",
    "repo": "nexu-io/open-design",
    "category": "Design",
    "platforms": [
      "macOS",
      "Windows",
      "Web"
    ],
    "selfHosted": true,
    "replaces": [
      "Claude Design"
    ],
    "description": "From a design brief to files you can keep.",
    "about": "A local-first design workspace that uses supported coding agents to produce prototypes, presentations, and other artifacts. Its skills, plugins, and design systems are inspectable and extensible.",
    "features": [
      "Prototypes and presentations",
      "Bring your own coding agent",
      "Portable design systems and plugins"
    ],
    "website": "https://open-design.ai",
    "docs": "https://github.com/nexu-io/open-design#readme",
    "license": "Apache-2.0",
    "icon": "layers",
    "color": "#667b70",
    "screens": [
      [
        "opendesign-screen.png",
        "Official OpenDesign workspace"
      ]
    ],
    "popular": false,
    "bestFor": "Agent-assisted prototypes and presentations",
    "consideration": "Prebuilt desktop releases are for macOS and Windows; Linux currently requires a source build.",
    "addedAt": "2026-10-05",
    "researchSource": "https://github.com/nexu-io/open-design#readme"
  },
  {
    "id": "open-lovable",
    "name": "Open Lovable",
    "repo": "firecrawl/open-lovable",
    "category": "Developer Tools",
    "platforms": [
      "Web"
    ],
    "selfHosted": true,
    "replaces": [
      "Lovable",
      "Bolt.new"
    ],
    "description": "Turn a website idea into a React app.",
    "about": "An example app from the Firecrawl team for building React applications through an AI chat interface. Run the source yourself and connect Firecrawl, a model provider, and a supported sandbox service.",
    "features": [
      "AI-assisted React app creation",
      "Website recreation workflows",
      "Configurable model and sandbox providers"
    ],
    "website": "https://github.com/firecrawl/open-lovable",
    "docs": "https://github.com/firecrawl/open-lovable#readme",
    "license": "MIT",
    "icon": "layers",
    "color": "#667b70",
    "screens": [],
    "popular": false,
    "bestFor": "Exploring AI-assisted website building",
    "consideration": "Requires external API keys and a sandbox provider; this is an example app, not a complete hosted service.",
    "addedAt": "2026-10-05",
    "researchSource": "https://github.com/firecrawl/open-lovable#readme"
  },
  {
    "id": "openresume",
    "name": "OpenResume",
    "repo": "xitanggg/open-resume",
    "category": "Productivity",
    "platforms": [
      "Web"
    ],
    "selfHosted": true,
    "replaces": [
      "Resume.io",
      "Zety"
    ],
    "description": "A considered resume. A simpler starting point.",
    "about": "A browser-based resume builder and parser. Create consistently formatted PDF resumes, inspect resume parsing, and run the application yourself.",
    "features": [
      "PDF resume builder",
      "Resume parser",
      "Browser-based editing"
    ],
    "website": "https://www.open-resume.com",
    "docs": "https://github.com/xitanggg/open-resume#readme",
    "license": "AGPL-3.0",
    "icon": "layers",
    "color": "#667b70",
    "screens": [],
    "popular": false,
    "bestFor": "Creating a consistently formatted resume",
    "consideration": "Templates focus on U.S. resume conventions; adapt the content to your application.",
    "addedAt": "2026-10-05",
    "researchSource": "https://github.com/xitanggg/open-resume#readme"
  },
  {
    "id": "openscad",
    "name": "OpenSCAD",
    "repo": "openscad/openscad",
    "category": "Design",
    "platforms": [
      "macOS",
      "Windows",
      "Linux"
    ],
    "selfHosted": false,
    "replaces": [
      "Autodesk Fusion parametric modeling"
    ],
    "description": "Build precise shapes with a little code.",
    "about": "A solid 3D CAD modeler that describes objects using scripts rather than direct manipulation. Use constructive solid geometry and parameterized designs to make reproducible mechanical parts and printable models.",
    "features": [
      "Script-based solid modeling",
      "Parametric designs",
      "3D model export"
    ],
    "website": "https://www.openscad.org",
    "docs": "https://github.com/openscad/openscad#readme",
    "license": "GPL-2.0-or-later",
    "icon": "layers",
    "color": "#667b70",
    "screens": [],
    "popular": false,
    "bestFor": "Code-driven, parametric 3D parts",
    "consideration": "Designed for scripted solids, with a different workflow from visual CAD and sculpting.",
    "addedAt": "2026-10-05",
    "researchSource": "https://github.com/openscad/openscad#readme"
  },
  {
    "id": "openbb",
    "name": "OpenBB Data Platform",
    "repo": "OpenBB-finance/OpenBB",
    "category": "Finance",
    "platforms": [
      "macOS",
      "Windows",
      "Linux"
    ],
    "selfHosted": true,
    "replaces": [
      "Bloomberg data research workflows",
      "Refinitiv data integration"
    ],
    "description": "Financial data, ready for your research.",
    "about": "The Open Data Platform by OpenBB is an open-source toolset for integrating public, licensed, and proprietary financial data into research applications, dashboards, and AI workflows. It provides Python and API access.",
    "features": [
      "Financial data integrations",
      "Python and API access",
      "Research application workflows"
    ],
    "website": "https://openbb.co",
    "docs": "https://github.com/OpenBB-finance/OpenBB#readme",
    "license": "Apache-2.0",
    "icon": "layers",
    "color": "#667b70",
    "screens": [],
    "popular": false,
    "bestFor": "Programmable financial data research",
    "consideration": "This is a data platform, not a full Bloomberg terminal replacement. Data licenses and commercial products are separate.",
    "addedAt": "2026-10-05",
    "researchSource": "https://github.com/OpenBB-finance/OpenBB#readme"
  },
  {
    "id": "openstock",
    "name": "OpenStock",
    "repo": "Open-Dev-Society/OpenStock",
    "category": "Finance",
    "platforms": [
      "Web"
    ],
    "selfHosted": true,
    "replaces": [
      "TradingView watchlist workflows",
      "Yahoo Finance market tracking"
    ],
    "description": "Follow the market. Keep your watchlist close.",
    "about": "A self-hostable stock tracking application with watchlists, company insights, market data integrations, and alerts. Its data and charts depend on external providers, including Finnhub and TradingView widgets.",
    "features": [
      "Stock watchlists",
      "Company and market insights",
      "Alerts and data integrations"
    ],
    "website": "https://openstock-ods.vercel.app",
    "docs": "https://github.com/Open-Dev-Society/OpenStock#readme",
    "license": "AGPL-3.0",
    "icon": "layers",
    "color": "#667b70",
    "screens": [],
    "popular": false,
    "bestFor": "Personal watchlists and market tracking",
    "consideration": "External data may be delayed or require paid access; this is not a brokerage or a full charting replacement.",
    "addedAt": "2026-10-05",
    "researchSource": "https://github.com/Open-Dev-Society/OpenStock#readme"
  },
  {
    "id": "openpanel",
    "name": "OpenPanel",
    "repo": "Openpanel-dev/openpanel",
    "category": "Developer Tools",
    "platforms": [
      "Web"
    ],
    "selfHosted": true,
    "replaces": [
      "Mixpanel",
      "Amplitude"
    ],
    "description": "Understand your product. Keep control of your data.",
    "about": "An open-source web and product analytics platform with event tracking, dashboards, and optional self-hosting. The application supports understanding site activity and product behavior.",
    "features": [
      "Web and product analytics",
      "Event tracking",
      "Self-hosted dashboards"
    ],
    "website": "https://openpanel.dev",
    "docs": "https://github.com/Openpanel-dev/openpanel#readme",
    "license": "AGPL-3.0",
    "icon": "layers",
    "color": "#667b70",
    "screens": [],
    "popular": false,
    "bestFor": "Product analytics on your own infrastructure",
    "consideration": "Plan for storage, hosting, and instrumenting the events you want to measure.",
    "addedAt": "2026-10-05",
    "researchSource": "https://github.com/Openpanel-dev/openpanel#readme"
  },
  {
    "id": "openreplay",
    "name": "OpenReplay",
    "repo": "openreplay/openreplay",
    "category": "Developer Tools",
    "platforms": [
      "Web"
    ],
    "selfHosted": true,
    "replaces": [
      "FullStory",
      "LogRocket"
    ],
    "description": "See the issue through your user’s eyes.",
    "about": "A self-hostable session replay and analytics platform for reproducing frontend issues. It combines replay, debugging context, and co-browsing; its enterprise directory is separately commercially licensed.",
    "features": [
      "Session replay",
      "Frontend debugging context",
      "Co-browsing"
    ],
    "website": "https://openreplay.com",
    "docs": "https://github.com/openreplay/openreplay#readme",
    "license": "AGPL-3.0 + MIT + commercial EE",
    "icon": "layers",
    "color": "#667b70",
    "screens": [],
    "popular": false,
    "bestFor": "Reproducing frontend bugs with session context",
    "consideration": "The ee/ directory has a separate commercial license; deploy and configure data capture for your application.",
    "addedAt": "2026-10-05",
    "researchSource": "https://github.com/openreplay/openreplay#readme"
  },
  {
    "id": "openstatus",
    "name": "OpenStatus",
    "repo": "openstatusHQ/openstatus",
    "category": "Developer Tools",
    "platforms": [
      "Web"
    ],
    "selfHosted": true,
    "replaces": [
      "Better Stack uptime monitoring",
      "UptimeRobot",
      "Atlassian Statuspage"
    ],
    "description": "A little clarity when availability matters.",
    "about": "A status page and uptime monitoring platform with monitoring as code, incident communication, and customizable public pages. Deploy the platform yourself or use its hosted service.",
    "features": [
      "Uptime and API monitoring",
      "Custom status pages",
      "Incident communication"
    ],
    "website": "https://openstatus.dev",
    "docs": "https://github.com/openstatusHQ/openstatus#readme",
    "license": "AGPL-3.0",
    "icon": "layers",
    "color": "#667b70",
    "screens": [
      [
        "openstatus-screen.png",
        "Official OpenStatus public status page"
      ]
    ],
    "popular": false,
    "bestFor": "Uptime monitoring and public status pages",
    "consideration": "Self-hosting requires configuring the monitoring and delivery infrastructure.",
    "addedAt": "2026-10-05",
    "researchSource": "https://github.com/openstatusHQ/openstatus#readme"
  },
  {
    "id": "openlit",
    "name": "OpenLIT",
    "repo": "openlit/openlit",
    "category": "Developer Tools",
    "platforms": [
      "Web"
    ],
    "selfHosted": true,
    "replaces": [
      "LangSmith",
      "Datadog LLM observability"
    ],
    "description": "A clearer view of what your AI agents are doing.",
    "about": "An OpenTelemetry-based platform for tracing, evaluating, and improving AI agent workflows. Inspect model calls, tools, costs, evaluations, and prompts through a self-hosted interface.",
    "features": [
      "Agent and model tracing",
      "Evaluations and cost visibility",
      "Prompt management"
    ],
    "website": "https://openlit.io",
    "docs": "https://github.com/openlit/openlit#readme",
    "license": "Apache-2.0",
    "icon": "layers",
    "color": "#667b70",
    "screens": [
      [
        "openlit-screen.png",
        "Official OpenLIT agent trace view"
      ]
    ],
    "popular": false,
    "bestFor": "Tracing and evaluating AI agent workflows",
    "consideration": "Requires instrumenting your application and deploying the observability backend.",
    "addedAt": "2026-10-05",
    "researchSource": "https://github.com/openlit/openlit#readme"
  },
  {
    "id": "openbao",
    "name": "OpenBao",
    "repo": "openbao/openbao",
    "category": "Developer Tools",
    "platforms": [
      "Web",
      "Linux",
      "macOS",
      "Windows"
    ],
    "selfHosted": true,
    "replaces": [
      "HashiCorp Vault"
    ],
    "description": "A community home for your infrastructure’s secrets.",
    "about": "An open-source secrets management platform derived from Vault. Store and distribute sensitive data, manage credentials, and integrate secrets into infrastructure and applications.",
    "features": [
      "Secrets management",
      "Dynamic credentials",
      "Infrastructure integrations"
    ],
    "website": "https://openbao.org",
    "docs": "https://github.com/openbao/openbao#readme",
    "license": "MPL-2.0",
    "icon": "layers",
    "color": "#667b70",
    "screens": [],
    "popular": false,
    "bestFor": "Managing infrastructure secrets",
    "consideration": "A server platform that needs careful deployment and ongoing administration.",
    "addedAt": "2026-10-05",
    "researchSource": "https://github.com/openbao/openbao#readme"
  },
  {
    "id": "opensearch",
    "name": "OpenSearch",
    "repo": "opensearch-project/OpenSearch",
    "category": "Developer Tools",
    "platforms": [
      "Linux",
      "macOS",
      "Windows",
      "Web"
    ],
    "selfHosted": true,
    "replaces": [
      "Elasticsearch",
      "Elastic Cloud search workflows"
    ],
    "description": "Search, analytics, and a world of possibilities.",
    "about": "A distributed search and analytics engine. Pair the engine with the separately maintained OpenSearch Dashboards web interface to explore data, search indexes, and build visualizations.",
    "features": [
      "Distributed search",
      "Analytics and indexing",
      "OpenSearch Dashboards integration"
    ],
    "website": "https://opensearch.org",
    "docs": "https://github.com/opensearch-project/OpenSearch#readme",
    "license": "Apache-2.0",
    "icon": "layers",
    "color": "#667b70",
    "screens": [],
    "popular": false,
    "bestFor": "Self-hosted search and analytics",
    "consideration": "OpenSearch Dashboards is a separate repository; size and maintain your cluster for your workload.",
    "addedAt": "2026-10-05",
    "researchSource": "https://github.com/opensearch-project/OpenSearch#readme"
  },
  {
    "id": "openlist",
    "name": "OpenList",
    "repo": "OpenListTeam/OpenList",
    "category": "Utilities",
    "platforms": [
      "Web"
    ],
    "selfHosted": true,
    "replaces": [
      "MultCloud",
      "CloudHQ file browsing"
    ],
    "description": "One view across the storage you already use.",
    "about": "A file listing and sharing platform that connects multiple storage services. Browse, preview, upload, and share files through a unified web interface with WebDAV support.",
    "features": [
      "Multiple storage connections",
      "File previews and sharing",
      "WebDAV support"
    ],
    "website": "https://doc.oplist.org",
    "docs": "https://github.com/OpenListTeam/OpenList#readme",
    "license": "AGPL-3.0",
    "icon": "layers",
    "color": "#667b70",
    "screens": [],
    "popular": false,
    "bestFor": "Browsing and sharing across storage providers",
    "consideration": "Capabilities depend on provider APIs; this is not a replacement for all cloud backup or sync features.",
    "addedAt": "2026-10-05",
    "researchSource": "https://github.com/OpenListTeam/OpenList#readme"
  },
  {
    "id": "openmediavault",
    "name": "OpenMediaVault",
    "repo": "openmediavault/openmediavault",
    "category": "Utilities",
    "platforms": [
      "Linux",
      "Web"
    ],
    "selfHosted": true,
    "replaces": [
      "Synology DSM",
      "QNAP QTS"
    ],
    "description": "Give your home server a useful place to start.",
    "about": "A Debian-based network attached storage system with a web administration interface. Manage file sharing, storage, services, and extensions for a home or small-office NAS.",
    "features": [
      "Web NAS administration",
      "SMB and file services",
      "Plugin extensions"
    ],
    "website": "https://www.openmediavault.org",
    "docs": "https://github.com/openmediavault/openmediavault#readme",
    "license": "GPL-3.0",
    "icon": "layers",
    "color": "#667b70",
    "screens": [],
    "popular": false,
    "bestFor": "A DIY home or small-office NAS",
    "consideration": "Installs on a server; check storage and hardware compatibility before deployment.",
    "addedAt": "2026-10-05",
    "researchSource": "https://github.com/openmediavault/openmediavault#readme"
  },
  {
    "id": "openwrt",
    "name": "OpenWrt",
    "repo": "openwrt/openwrt",
    "category": "Utilities",
    "platforms": [
      "Linux",
      "Web"
    ],
    "selfHosted": true,
    "replaces": [
      "Stock router firmware"
    ],
    "description": "More control over the network you call home.",
    "about": "A Linux-based operating system for supported routers and embedded devices. Configure networking, install packages, and manage compatible hardware through the CLI or LuCI web interface.",
    "features": [
      "Configurable router firmware",
      "Package ecosystem",
      "LuCI web administration"
    ],
    "website": "https://openwrt.org",
    "docs": "https://github.com/openwrt/openwrt#readme",
    "license": "GPL-2.0",
    "icon": "layers",
    "color": "#667b70",
    "screens": [],
    "popular": false,
    "bestFor": "Customizing supported routers",
    "consideration": "Hardware compatibility is device-specific; verify the exact device and installation instructions.",
    "addedAt": "2026-10-05",
    "researchSource": "https://github.com/openwrt/openwrt#readme"
  },
  {
    "id": "openvpn",
    "name": "OpenVPN Community",
    "repo": "OpenVPN/openvpn",
    "category": "Privacy",
    "platforms": [
      "macOS",
      "Windows",
      "Linux"
    ],
    "selfHosted": true,
    "replaces": [
      "Cisco AnyConnect VPN workflows"
    ],
    "description": "Build the VPN connection your network needs.",
    "about": "The open-source OpenVPN daemon provides encrypted VPN connections on supported platforms. Deploy a server and compatible clients for your network, using certificates and configuration you administer.",
    "features": [
      "Encrypted VPN tunnels",
      "Cross-platform daemon",
      "Certificate-based configuration"
    ],
    "website": "https://community.openvpn.net",
    "docs": "https://github.com/OpenVPN/openvpn#readme",
    "license": "GPL-2.0",
    "icon": "layers",
    "color": "#667b70",
    "screens": [],
    "popular": false,
    "bestFor": "Operating your own VPN infrastructure",
    "consideration": "Community OpenVPN is distinct from the commercial Access Server and paid VPN services.",
    "addedAt": "2026-10-05",
    "researchSource": "https://github.com/OpenVPN/openvpn#readme"
  },
  {
    "id": "opensnitch",
    "name": "OpenSnitch",
    "repo": "evilsocket/opensnitch",
    "category": "Privacy",
    "platforms": [
      "Linux"
    ],
    "selfHosted": false,
    "replaces": [
      "Little Snitch"
    ],
    "description": "Know which Linux apps are making connections.",
    "about": "An interactive Linux application firewall inspired by Little Snitch. Review outgoing connections, define rules, and inspect network activity through a desktop interface.",
    "features": [
      "Application network rules",
      "Connection prompts",
      "Network activity interface"
    ],
    "website": "https://github.com/evilsocket/opensnitch",
    "docs": "https://github.com/evilsocket/opensnitch#readme",
    "license": "GPL-3.0",
    "icon": "layers",
    "color": "#667b70",
    "screens": [],
    "popular": false,
    "bestFor": "Controlling outbound Linux app connections",
    "consideration": "Linux-only; it is not a macOS version of Little Snitch.",
    "addedAt": "2026-10-05",
    "researchSource": "https://github.com/evilsocket/opensnitch#readme"
  },
  {
    "id": "openmtp",
    "name": "OpenMTP",
    "repo": "ganeshrvel/openmtp",
    "category": "Utilities",
    "platforms": [
      "macOS"
    ],
    "selfHosted": false,
    "replaces": [
      "Android File Transfer",
      "MacDroid"
    ],
    "description": "A better bridge between your Mac and Android.",
    "about": "An open-source Android file transfer application for macOS. Use its dual-pane interface to browse and transfer files between a connected Android device and your Mac.",
    "features": [
      "Dual-pane file browser",
      "Android USB transfers",
      "Native macOS workflow"
    ],
    "website": "https://openmtp.ganeshrvel.com",
    "docs": "https://github.com/ganeshrvel/openmtp#readme",
    "license": "MIT",
    "icon": "layers",
    "color": "#667b70",
    "screens": [],
    "popular": false,
    "bestFor": "Moving Android files from a Mac",
    "consideration": "Requires a compatible Android device, USB connection, and transfer mode.",
    "addedAt": "2026-10-05",
    "researchSource": "https://github.com/ganeshrvel/openmtp#readme"
  },
  {
    "id": "openlogi",
    "name": "OpenLogi",
    "repo": "AprilNEA/OpenLogi",
    "category": "Utilities",
    "platforms": [
      "macOS",
      "Windows",
      "Linux"
    ],
    "selfHosted": false,
    "replaces": [
      "Logitech Options+"
    ],
    "description": "Your mouse. Your shortcuts. Your way.",
    "about": "A local-first configuration app for supported Logitech devices using HID++. Customize buttons, DPI, scrolling, and per-application profiles without a Logitech account.",
    "features": [
      "Button and shortcut remapping",
      "DPI and scrolling settings",
      "Per-application profiles"
    ],
    "website": "https://github.com/AprilNEA/OpenLogi",
    "docs": "https://github.com/AprilNEA/OpenLogi#readme",
    "license": "Apache-2.0",
    "icon": "layers",
    "color": "#667b70",
    "screens": [],
    "popular": false,
    "bestFor": "Configuring supported Logitech peripherals",
    "consideration": "Device and feature support vary by operating system; check the compatibility list.",
    "addedAt": "2026-10-05",
    "researchSource": "https://github.com/AprilNEA/OpenLogi#readme"
  },
  {
    "id": "openrgb",
    "name": "OpenRGB",
    "repo": "CalcProgrammer1/OpenRGB",
    "category": "Utilities",
    "platforms": [
      "macOS",
      "Windows",
      "Linux"
    ],
    "selfHosted": false,
    "replaces": [
      "Corsair iCUE",
      "Razer Synapse lighting",
      "ASUS Aura Sync"
    ],
    "description": "One place for the lights on your desk.",
    "about": "An RGB lighting controller that supports devices from multiple manufacturers. Configure lighting through a desktop interface and connect compatible integrations without separate vendor lighting applications.",
    "features": [
      "Multi-vendor RGB control",
      "Lighting profiles",
      "Integration support"
    ],
    "website": "https://openrgb.org",
    "docs": "https://github.com/CalcProgrammer1/OpenRGB#readme",
    "license": "GPL-2.0",
    "icon": "layers",
    "color": "#667b70",
    "screens": [],
    "popular": false,
    "bestFor": "Controlling supported RGB devices",
    "consideration": "Hardware support varies. The GitHub repository mirrors the primary GitLab project.",
    "addedAt": "2026-10-05",
    "researchSource": "https://github.com/CalcProgrammer1/OpenRGB#readme"
  },
  {
    "id": "openhab",
    "name": "openHAB",
    "repo": "openhab/openhab-core",
    "category": "Utilities",
    "platforms": [
      "Web",
      "Linux",
      "macOS",
      "Windows",
      "iOS",
      "Android"
    ],
    "selfHosted": true,
    "replaces": [
      "Samsung SmartThings",
      "Apple Home automation workflows"
    ],
    "description": "Bring your smart home together.",
    "about": "A vendor- and technology-independent home automation platform. Connect supported devices through bindings, automate routines, and control the system with web and mobile interfaces.",
    "features": [
      "Device bindings",
      "Home automation rules",
      "Web and mobile control"
    ],
    "website": "https://www.openhab.org",
    "docs": "https://github.com/openhab/openhab-core#readme",
    "license": "EPL-2.0",
    "icon": "layers",
    "color": "#667b70",
    "screens": [],
    "popular": false,
    "bestFor": "Connecting different smart home ecosystems",
    "consideration": "Stars shown are for openhab-core; clients and distribution are separate repositories.",
    "addedAt": "2026-10-05",
    "researchSource": "https://github.com/openhab/openhab-core#readme"
  },
  {
    "id": "openslides",
    "name": "OpenSlides",
    "repo": "OpenSlides/OpenSlides",
    "category": "Productivity",
    "platforms": [
      "Web"
    ],
    "selfHosted": true,
    "replaces": [
      "Assembly Voting",
      "Meeting voting platforms"
    ],
    "description": "A calmer way to organize an assembly.",
    "about": "A web application for managing assemblies and meetings, with agendas, motions, speaker lists, voting, and projection. OpenSlides is designed around deliberative meeting workflows.",
    "features": [
      "Agendas and motions",
      "Speaker lists and voting",
      "Meeting projection"
    ],
    "website": "https://openslides.com",
    "docs": "https://github.com/OpenSlides/OpenSlides#readme",
    "license": "MIT",
    "icon": "layers",
    "color": "#667b70",
    "screens": [],
    "popular": false,
    "bestFor": "Assemblies, motions, and meeting votes",
    "consideration": "The product consists of multiple services; repository stars cover the main project only.",
    "addedAt": "2026-10-05",
    "researchSource": "https://github.com/OpenSlides/OpenSlides#readme"
  },
  {
    "id": "openfire",
    "name": "Openfire",
    "repo": "igniterealtime/Openfire",
    "category": "Communication",
    "platforms": [
      "Web",
      "Linux",
      "macOS",
      "Windows"
    ],
    "selfHosted": true,
    "replaces": [
      "Microsoft Teams chat infrastructure"
    ],
    "description": "A server for conversations on your own network.",
    "about": "An XMPP server for real-time communication, with a web administration interface and plugin ecosystem. Pair it with compatible XMPP clients to create a messaging service you control.",
    "features": [
      "XMPP messaging server",
      "Web administration",
      "Plugin ecosystem"
    ],
    "website": "https://igniterealtime.org/projects/openfire/",
    "docs": "https://github.com/igniterealtime/Openfire#readme",
    "license": "Apache-2.0",
    "icon": "layers",
    "color": "#667b70",
    "screens": [],
    "popular": false,
    "bestFor": "Running an XMPP messaging service",
    "consideration": "Server infrastructure, not a complete Teams replacement; compatible clients are needed.",
    "addedAt": "2026-10-05",
    "researchSource": "https://github.com/igniterealtime/Openfire#readme"
  },
  {
    "id": "openmeetings",
    "name": "OpenMeetings",
    "repo": "apache/openmeetings",
    "category": "Communication",
    "platforms": [
      "Web"
    ],
    "selfHosted": true,
    "replaces": [
      "Zoom",
      "Webex"
    ],
    "description": "Meet, share, and collaborate on your own server.",
    "about": "Apache OpenMeetings provides web conferencing with audio and video, screen sharing, recording, and collaborative whiteboards. Host your own conferencing service with its required media infrastructure.",
    "features": [
      "Video and audio meetings",
      "Screen sharing and recording",
      "Collaborative whiteboards"
    ],
    "website": "https://openmeetings.apache.org",
    "docs": "https://github.com/apache/openmeetings#readme",
    "license": "Apache-2.0",
    "icon": "layers",
    "color": "#667b70",
    "screens": [],
    "popular": false,
    "bestFor": "Self-hosted web meetings and whiteboards",
    "consideration": "Requires a server and media setup; test browser and conferencing requirements.",
    "addedAt": "2026-10-05",
    "researchSource": "https://github.com/apache/openmeetings#readme"
  },
  {
    "id": "opencart",
    "name": "OpenCart",
    "repo": "opencart/opencart",
    "category": "Commerce",
    "platforms": [
      "Web"
    ],
    "selfHosted": true,
    "replaces": [
      "Shopify",
      "BigCommerce"
    ],
    "description": "Your store, with room to make it your own.",
    "about": "An open-source PHP e-commerce application for operating online shops. Manage products, orders, customers, and integrations through an extensible storefront and administration interface.",
    "features": [
      "Products and order management",
      "Storefront and admin interface",
      "Extensions and integrations"
    ],
    "website": "https://www.opencart.com",
    "docs": "https://github.com/opencart/opencart#readme",
    "license": "GPL-3.0",
    "icon": "layers",
    "color": "#667b70",
    "screens": [],
    "popular": false,
    "bestFor": "A self-hosted online shop",
    "consideration": "Hosting, maintenance, payment providers, and some extensions have separate costs.",
    "addedAt": "2026-10-05",
    "researchSource": "https://github.com/opencart/opencart#readme"
  },
  {
    "id": "openmpt",
    "name": "OpenMPT",
    "repo": "OpenMPT/openmpt",
    "category": "Audio & Music",
    "platforms": [
      "Windows"
    ],
    "selfHosted": false,
    "replaces": [
      "Renoise tracker workflows"
    ],
    "description": "Compose a track, one pattern at a time.",
    "about": "A Windows music tracker for composing and editing module-based music. Arrange patterns, work with samples and instruments, and export your compositions.",
    "features": [
      "Pattern-based composition",
      "Samples and instruments",
      "Module editing and export"
    ],
    "website": "https://openmpt.org",
    "docs": "https://github.com/OpenMPT/openmpt#readme",
    "license": "BSD-3-Clause",
    "icon": "layers",
    "color": "#667b70",
    "screens": [],
    "popular": false,
    "bestFor": "Tracker-based music composition",
    "consideration": "Windows desktop application; Wine use is a compatibility option rather than a native Mac app.",
    "addedAt": "2026-10-05",
    "researchSource": "https://github.com/OpenMPT/openmpt#readme"
  },
  {
    "id": "openttd",
    "name": "OpenTTD",
    "repo": "OpenTTD/OpenTTD",
    "category": "Games",
    "platforms": [
      "macOS",
      "Windows",
      "Linux"
    ],
    "selfHosted": false,
    "replaces": [
      "Transport Tycoon Deluxe"
    ],
    "description": "Build a transport network. Keep it growing.",
    "about": "An open-source simulation game based on Transport Tycoon Deluxe, with modern platforms, large maps, multiplayer, and community content. Free replacement base graphics and sound are available.",
    "features": [
      "Transport simulation",
      "Multiplayer games",
      "Community content"
    ],
    "website": "https://www.openttd.org",
    "docs": "https://github.com/OpenTTD/OpenTTD#readme",
    "license": "GPL-2.0",
    "icon": "layers",
    "color": "#667b70",
    "screens": [],
    "popular": false,
    "bestFor": "Classic transport management games",
    "consideration": "Original proprietary game assets are separate; use the available free base sets.",
    "addedAt": "2026-10-05",
    "researchSource": "https://github.com/OpenTTD/OpenTTD#readme"
  },
  {
    "id": "openra",
    "name": "OpenRA",
    "repo": "OpenRA/OpenRA",
    "category": "Games",
    "platforms": [
      "macOS",
      "Windows",
      "Linux"
    ],
    "selfHosted": false,
    "replaces": [
      "Command & Conquer: Red Alert",
      "Dune 2000"
    ],
    "description": "Classic strategy, brought into the present.",
    "about": "An open-source engine and game project recreating classic Westwood real-time strategy games with modern platforms and multiplayer. Its source license is separate from the original game assets.",
    "features": [
      "Classic RTS gameplay",
      "Modern platform support",
      "Multiplayer and mods"
    ],
    "website": "https://www.openra.net",
    "docs": "https://github.com/OpenRA/OpenRA#readme",
    "license": "GPL-3.0",
    "icon": "layers",
    "color": "#667b70",
    "screens": [],
    "popular": false,
    "bestFor": "Modernized classic real-time strategy",
    "consideration": "Original game assets have separate rights and download requirements.",
    "addedAt": "2026-10-05",
    "researchSource": "https://github.com/OpenRA/OpenRA#readme"
  },
  {
    "id": "openrct2",
    "name": "OpenRCT2",
    "repo": "OpenRCT2/OpenRCT2",
    "category": "Games",
    "platforms": [
      "macOS",
      "Windows",
      "Linux"
    ],
    "selfHosted": false,
    "replaces": [
      "RollerCoaster Tycoon 2"
    ],
    "description": "A new chapter for the park you remember.",
    "about": "An open-source reimplementation of RollerCoaster Tycoon 2 with modern operating system support, multiplayer, and expanded features. It uses assets from a separately obtained original game installation.",
    "features": [
      "Classic park simulation",
      "Multiplayer",
      "Expanded game features"
    ],
    "website": "https://openrct2.io",
    "docs": "https://github.com/OpenRCT2/OpenRCT2#readme",
    "license": "GPL-3.0-or-later",
    "icon": "layers",
    "color": "#667b70",
    "screens": [],
    "popular": false,
    "bestFor": "Playing and extending RollerCoaster Tycoon 2",
    "consideration": "Requires the original RollerCoaster Tycoon 2 game assets; the engine does not include them.",
    "addedAt": "2026-10-05",
    "researchSource": "https://github.com/OpenRCT2/OpenRCT2#readme"
  },
  {
    "id": "openpost",
    "name": "OpenPost",
    "repo": "getopenpost/openpost",
    "category": "Communication",
    "platforms": [
      "Web",
      "Android"
    ],
    "selfHosted": true,
    "replaces": [
      "Buffer",
      "Canva",
      "CapCut"
    ],
    "description": "Create, adapt, review, schedule and track social posts in one workspace.",
    "about": "An AGPL content workspace for solo founders with posts, destination-specific variants, media editors, workflows and delivery inspection. Use Hosted or self-host the Go service. The free local image and video editors need no account or watermark; API, CLI and MCP access support automation.",
    "features": [
      "Posts and destination-specific variants",
      "Scheduling and reviewed workflows",
      "Free local image and video editors",
      "Scoped API, CLI and MCP access"
    ],
    "website": "https://openpo.st",
    "docs": "https://openpo.st/docs",
    "license": "AGPL-3.0-only",
    "icon": "layers",
    "color": "#667b70",
    "screens": [
      [
        "openpost-screen.png",
        "Official OpenPost calendar"
      ],
      [
        "openpost-image-screen.png",
        "Official OpenPost image editor"
      ]
    ],
    "popular": false,
    "bestFor": "Solo founders preparing and publishing social content",
    "consideration": "Hosted admission currently uses a waitlist. Provider capabilities and publishing readiness vary. Self-hosting needs infrastructure and provider setup. Video Editor is beta for desktop Chrome/Edge.",
    "addedAt": "2026-10-07",
    "researchSource": "https://github.com/getopenpost/openpost#readme"
  }
];
