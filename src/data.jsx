/* ----------------------------- content ----------------------------- */

export const GITHUB_USER = "Sdb002";
export const GITHUB_URL = `https://github.com/${GITHUB_USER}`;
export const repoUrl = (name) => `${GITHUB_URL}/${name}`;

export const NAV_LINKS = ["about", "stack", "work", "research"];

export const STATUS = [
  { k: "location", v: "Bangladesh" },
  { k: "role", v: "Fullstack AI · freelance" },
  { k: "studying", v: "CSE @ DIU · final year" },
  { k: "focus", v: "LLM backends + systems", cls: "live" },
  { k: "env", v: "Fedora / KDE Plasma" },
  { k: "editor", v: "PyCharm · Darcula" },
  { k: "status", v: "open to work", cls: "warn", pulse: true },
];

export const STACK = [
  { title: "languages", items: ["Python", "C / C++", "Java", "JavaScript", "SQL"] },
  { title: "ai / llm", items: ["LLM endpoints", "LangChain", "SSE streaming", "service architecture"] },
  { title: "backend", items: ["FastAPI", "pydantic-settings", "REST", "SQLite", "MySQL"] },
  { title: "systems", items: ["Linux", "Docker", "psutil", "process mgmt", "parsers / AST"] },
  { title: "frontend / ui", items: ["React", "HTML / CSS", "PySide6", "DearPyGUI", "Java Swing"] },
  { title: "tooling", items: ["Git", "Fedora / KDE", "ReportLab", "data engineering"] },
];

/*
 * A screenshot in public/projects/. `w`/`h` are the file's real pixel size
 * (they reserve layout space before it loads). `fit: "contain"` letterboxes
 * shots whose shape doesn't suit the card frame instead of cropping them.
 */
const shot = (path, w, h, caption, fit) => ({
  src: `${import.meta.env.BASE_URL}projects/${path}.webp`,
  w,
  h,
  caption,
  fit,
});

/*
 * Hand-written project cards. `repo` is the GitHub repo name; it builds the
 * link and pulls live star counts. `path` deep-links into the repo instead.
 * `featured` and `wide` cards span the full row of the work grid. `shots` are
 * captured from the running apps; `ratio` sets the screenshot frame's shape.
 */
export const PROJECTS = [
  {
    title: "ProcessGuard Pro",
    repo: "ProcessGuard_Pro",
    featured: true,
    meta: "team lead · 5 people",
    ratio: "9 / 8",
    shots: [
      shot("processguard/monitor", 900, 800, "Monitor: live CPU/RAM graphs over the process table"),
      shot("processguard/autokill", 900, 800, "Auto-kill rules: regex + CPU/memory thresholds held for a duration"),
      shot("processguard/alertlog", 900, 800, "Alert log"),
    ],
    tags: ["Python", "DearPyGUI", "psutil", "SQLite", "Docker", "FastAPI"],
    body: (
      <>
        A Linux process manager that goes past monitoring. It watches every process, flags the rogue
        ones, and <b>suspends, resumes, or kills them against rules I define</b>. Desktop UI in
        DearPyGUI on top of psutil, SQLite for history, Docker for packaging. I led a five-person team
        and extended it with a <b>FastAPI + LLM endpoint</b> that explains what a suspicious process is
        actually doing.
      </>
    ),
  },
  {
    title: "C-Analyzer",
    repo: "C-Analyzer",
    meta: "compiler engineering",
    tags: ["Python", "PySide6", "Pratt parser", "AST", "ReportLab"],
    shots: [
      shot("c-analyzer/ast", 1280, 786, "Live AST of sample.c, with token count and Big-O estimate"),
      shot("c-analyzer/tokens", 1280, 786, "Token stream inspector"),
    ],
    body: (
      <>
        A C source analyzer with a <b>parser I wrote by hand</b> — no parser generator. It tokenizes,
        builds a live AST you can inspect, walks the symbol table, estimates Big-O complexity, and
        exports the full analysis to PDF. PySide6 desktop app.
      </>
    ),
  },
  {
    title: "daq-iot",
    repo: "daq-iot",
    meta: "instrumentation & control",
    tags: ["Python", "MQTT", "FastAPI", "DSP", "PID", "ESP32"],
    shots: [
      shot("daq-iot/panel", 1280, 800, "Acquisition chain: raw, conditioned and quantized traces with live controls"),
      shot("daq-iot/spectrum", 1140, 516, "1024-point FFT with shaft-harmonic and bearing-defect markers", "contain"),
      shot("daq-iot/converter", 1140, 403, "Converter sweep: measured SNR and ENOB against 6.02N + 1.76", "contain"),
    ],
    body: (
      <>
        An IoT data acquisition system built in software <b>all the way down to the ADC</b>: real
        Butterworth filters, a real quantizer, MQTT over a real broker into a FastAPI ingest server,
        and a PID loop closed back over the network. The same protocol runs in C on an emulated ESP32,
        and a browser panel lets you drive sample rate and bit depth to watch aliasing happen live.
      </>
    ),
  },
  {
    title: "exam-gate",
    repo: "exam-gate-Claude-Skill-",
    meta: "claude skill",
    tags: ["Claude Skills", "Python", ".docx", "verification"],
    shots: [
      shot("exam-gate/checker", 1182, 499, "The checker failing a draft pack, then passing the fixed one", "contain"),
    ],
    body: (
      <>
        Turns past papers, syllabi and notes into a ranked exam study pack, then <b>refuses to ship it
        until it passes a verification gate</b>. Every top-priority topic must cite real evidence, a
        stdlib-only checker fails the document on missing coverage or placeholder text, and a rendered
        PDF review catches what a text check can't.
      </>
    ),
  },
  {
    title: "Chatbot",
    repo: "Chatbot",
    demo: "https://chatbot-aykhziasddpumss5ksjaof.streamlit.app/",
    tags: ["Python", "Streamlit", "OpenRouter"],
    shots: [shot("chatbot/models", 1280, 800, "Model picker: DeepSeek, GPT-4o mini, Claude, Llama, Gemini")],
    body: (
      <>
        A multi-model chat app on Streamlit and OpenRouter. Switch between <b>DeepSeek, GPT-4o mini,
        Claude, Llama and Gemini</b>, keep full conversation memory, and set your own system prompt.
        Bring your own API key.
      </>
    ),
  },
  {
    title: "WeatherApp",
    repo: "WeatherApp",
    tags: ["Java", "Swing", "OpenWeatherMap"],
    ratio: "984 / 706",
    shots: [shot("weatherapp/themes", 984, 706, "Light and dark themes")],
    body: (
      <>
        Desktop weather client in Java Swing. Current conditions plus a five-day forecast, location
        search with autocomplete, dark/light themes, and <b>API failover</b> when the primary source
        drops.
      </>
    ),
  },
  {
    title: "Job-portal",
    repo: "Job-portal",
    tags: ["Java", "Swing", "MySQL"],
    ratio: "4 / 3",
    shots: [
      shot("job-portal/employer", 800, 600, "Employer dashboard: post, edit and review jobs"),
      shot("job-portal/seeker", 800, 600, "Job seeker dashboard: browse and apply"),
    ],
    body: (
      <>
        A two-sided job portal — seekers and employers — with posting, browsing, and application
        management. Java Swing front end on a <b>MySQL backend with full CRUD</b>.
      </>
    ),
  },
  {
    title: "Bangladeshi Nutritional Dataset",
    repo: "physician-supervised-health-system",
    path: "tree/HEAD/data/food",
    linkLabel: "data/food",
    wide: true,
    meta: "data engineering",
    tags: ["Python", "data engineering", "Bengali script", "nutrition"],
    ratio: "1280 / 511",
    shots: [shot("dataset/bd-food", 1280, 511, "A sample of rows from bd_food.csv")],
    body: (
      <>
        A dataset I built because it didn't exist: <b>250 Bangladeshi foods across 24 columns</b> — a
        full micronutrient panel, glycemic index values, and food names in Bengali script. It's the
        groundwork for the diagnostic recommendation system in my thesis.
      </>
    ),
  },
];

export const THESIS = {
  repo: "physician-supervised-health-system",
  tags: ["FastAPI", "SQLAlchemy", "Next.js", "TypeScript", "scikit-learn", "LLM OCR"],
  shots: [
    shot("thesis/assessment", 1280, 800, "Assessment: findings, safety exclusions and a Bangladeshi diet plan"),
    shot("thesis/queue", 1280, 800, "Review queue: nothing reaches a patient until a doctor approves it"),
    shot("thesis/report", 1280, 800, "The physician-approved patient report"),
  ],
  guarantees: [
    { k: "no LLM in clinical logic", v: "An AST-scan test fails the build if the rule engine ever imports the LLM module." },
    { k: "contraindications gated", v: "Unsafe foods are filtered out before anything gets ranked." },
    { k: "physician sign-off", v: "The report endpoint returns 403 until a doctor has approved it." },
  ],
};

export const CONTACT = [
  { k: "email", v: "shuvrodevbiswas02@gmail.com", url: "mailto:shuvrodevbiswas02@gmail.com" },
  { k: "github", v: "github.com/Sdb002", url: GITHUB_URL },
  { k: "linkedin", v: "shuvro-dev-biswas", url: "https://www.linkedin.com/in/shuvro-dev-biswas-0797b6322/" },
  { k: "facebook", v: "ShuvroDev02", url: "https://www.facebook.com/ShuvroDev02/" },
];

/*
 * Repos hidden from the live "more on GitHub" grid: everything that already
 * has a hand-written card or section, plus this site's own repo.
 */
export const HIDDEN_REPOS = new Set(
  [...PROJECTS.map((p) => p.repo), THESIS.repo, `${GITHUB_USER}.github.io`].map((n) => n.toLowerCase())
);

/*
 * Snapshot of the public repo list, shown until the live GitHub API call
 * returns (or if it fails, e.g. when rate-limited). Same shape as
 * useGitHubRepos' output.
 */
export const REPO_SNAPSHOT = [
  { name: "physician-supervised-health-system", description: null, language: "TypeScript", stars: 0, pushedAt: "2026-09-24T02:37:18Z" },
  { name: "exam-gate-Claude-Skill-", description: "Ranks and writes exam study packs from source material gated by an automated check + visual review before anything ships, not just generated and handed over.", language: null, stars: 0, pushedAt: "2026-08-29T03:55:03Z" },
  { name: "daq-iot", description: null, language: "HTML", stars: 0, pushedAt: "2026-07-27T04:06:06Z" },
  { name: "Sdb002.github.io", description: null, language: "HTML", stars: 0, pushedAt: "2026-06-24T12:55:36Z" },
  { name: "ProcessGuard_Pro", description: "A powerful Linux Task Manager on steroids — monitor, analyze, alert, suspend, resume, and automatically terminate rogue processes with customizable rules", language: "Python", stars: 1, pushedAt: "2026-06-14T13:35:05Z" },
  { name: "chatbot-1", description: null, language: "Python", stars: 0, pushedAt: "2026-05-24T07:00:12Z" },
  { name: "Chatbot", description: null, language: "Python", stars: 0, pushedAt: "2026-05-24T06:58:03Z" },
  { name: "Job-portal", description: "A desktop Job Portal application built with Java Swing and MySQL. Supports two user roles — Job Seeker and Employer — with full job posting, browsing, and application management functionality.", language: "Java", stars: 0, pushedAt: "2026-05-22T03:59:28Z" },
  { name: "C-Analyzer", description: "C source code analyzer with live AST visualization, token/symbol inspection, Big-O complexity estimation, and PDF report export — built in Python with PySide6.", language: "Python", stars: 2, pushedAt: "2026-05-22T03:51:51Z" },
  { name: "WeatherApp", description: "A desktop weather app showing current conditions and 5-day forecasts. Features location search with auto-suggest, dark/light mode, and API failover.", language: "Java", stars: 1, pushedAt: "2025-05-02T03:18:02Z" },
  { name: "Hotel-Management", description: "This is a simple tool for a managing hotel", language: "C++", stars: 0, pushedAt: "2024-01-05T14:51:12Z" },
].map((r) => ({ ...r, url: repoUrl(r.name), fork: false }));

export const LANG_COLORS = {
  Python: "#3572A5",
  Java: "#B07219",
  "C++": "#F34B7D",
  C: "#A8B9CC",
  TypeScript: "#3178C6",
  JavaScript: "#F1E05A",
  HTML: "#E34C26",
  CSS: "#663399",
  Jupyter: "#DA5B0B",
};
