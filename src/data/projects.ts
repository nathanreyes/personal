export interface Project {
  name: string;
  /** One-line positioning, shown next to the name. */
  tagline: string;
  description: string;
  url?: string;
  repo?: string;
  host?: 'cloudflare' | 'netlify';
  tech: string[];
  /** Concept/pitch work rather than a shipped client site. */
  spec?: boolean;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    name: 'V-Calendar',
    tagline: 'Open source · 4.5k stars',
    description:
      'A calendar and date picker plugin for Vue.js, used in production by thousands of projects. Decorates the calendar with highlighted date regions, dots, bars, content styles, tooltips and popovers through a single attributes API.',
    url: 'https://vcalendar.io',
    repo: 'https://github.com/nathanreyes/v-calendar',
    host: 'netlify',
    tech: ['Vue', 'TypeScript', 'Sass'],
    featured: true,
  },
  {
    name: 'Nocta Labs',
    tagline: 'Founder',
    description:
      'My studio building websites and custom software for small businesses across the Texas Panhandle. I handle design, build, deployment and ongoing maintenance.',
    url: 'https://noctalabs.com',
    host: 'cloudflare',
    tech: ['Astro', 'Cloudflare Workers', 'TypeScript'],
    featured: true,
  },
  {
    name: 'SimpleGrader',
    tagline: 'Product',
    description:
      'Grading, attendance and classroom management for teachers, homeschoolers and small schools, giving staff and guardians one shared view of every student. Monorepo pairing an AdonisJS API with a Vue 3 client.',
    url: 'https://simplegrader.com',
    host: 'cloudflare',
    tech: ['AdonisJS', 'Vue 3', 'TypeScript'],
    featured: true,
  },
  {
    name: 'Leeway',
    tagline: 'Open source',
    description:
      'A local-first terminal budgeting app built around one question: what is left? A forecasting tool rather than an accounting ledger — you keep your checking balance as ground truth and let envelopes draw down over the month.',
    url: 'https://get-leeway.com',
    repo: 'https://github.com/nathanreyes/leeway',
    host: 'cloudflare',
    tech: ['Rust'],
    featured: true,
  },
  {
    name: 'Raine Reyes Counseling',
    tagline: 'Client site',
    description:
      'Practice site for a Licensed Professional Counselor in Pampa, TX, covering EMDR and general therapy for children, teens and adults. Includes a rate-limited contact form running on Workers.',
    url: 'https://rainereyescounseling.com',
    repo: 'https://github.com/nathanreyes/rainereyes',
    host: 'cloudflare',
    tech: ['Astro', 'Cloudflare Workers'],
  },
  {
    name: 'Redeemer Pampa',
    tagline: 'Client site',
    description:
      'A website for Redeemer Pampa, a church in Pampa, TX, aligned with the Redeemer Network.',
    url: 'https://redeemerpampa.com',
    repo: 'https://github.com/nathanreyes/redeemer-pampa',
    host: 'cloudflare',
    tech: ['Vue', 'Cloudflare Workers'],
  },
  {
    name: 'Gif My Coffee',
    tagline: 'Side project',
    description:
      'A free coffee timer that walks you through every pour with gifs, so you can follow a brew recipe without reading a stopwatch.',
    url: 'https://gifmycoffee.com',
    repo: 'https://github.com/nathanreyes/brewtime',
    host: 'cloudflare',
    tech: ['Vue', 'Cloudflare Workers'],
  },
  {
    name: 'Keyfall',
    tagline: 'Side project',
    description:
      'Turns a local piano recording into a synced falling-note view. High-resolution piano transcription runs entirely in the browser in a Web Worker via ONNX Runtime Web, with WebGPU and WASM backends — audio and session data never leave the device.',
    repo: 'https://github.com/nathanreyes/keyfall',
    tech: ['Vue', 'ONNX Runtime', 'WebGPU', 'Web Workers'],
  },
  {
    name: 'vue-screen-utils',
    tagline: 'Open source',
    description:
      'A dependency-free collection of utility plugins and functions for using media queries in Vue 3.',
    repo: 'https://github.com/nathanreyes/vue-screen-utils',
    tech: ['TypeScript', 'Vue 3'],
  },
  {
    name: 'Open Range Engineering',
    tagline: 'Concept',
    description:
      'A site built on spec for a process safety engineering firm in Pampa, TX, covering PHA facilitation, PSM auditing and relief system design.',
    url: 'https://openrange.noctalabs.com',
    host: 'cloudflare',
    tech: ['Astro'],
    spec: true,
  },
  {
    name: 'Cinema 4',
    tagline: 'Concept',
    description:
      'A rebuild of a local theater website, pitched on the idea that nobody should type showtimes again — they sync straight from Veezi, the ticketing system the theater already runs.',
    url: 'https://cinema4.noctalabs.com',
    host: 'cloudflare',
    tech: ['Astro', 'Veezi API'],
    spec: true,
  },
];
