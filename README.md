# Salma Mohamed Salem — Portfolio

Personal portfolio for **Salma Mohamed Salem**: Application Support Engineer, full-stack developer and applied AI engineer based in Qatar.

**Live site:** https://salmamohamed253.github.io/Portfolio/ (after GitHub Pages is enabled — see [Deployment](#deployment))

The site presents professional, academic and independent projects as structured case studies — problem, solution, contribution, architecture, engineering decisions and limitations — alongside experience, skills and education taken from the CV.

---

## Design decisions

| Decision | Why |
| --- | --- |
| **React + TypeScript + Vite**, no UI framework | Small, fast static build; typed content model; nothing to configure on the server. |
| **Hash-based routing** (`#/projects/<slug>`) via a 40-line hook in `src/lib/router.ts` | GitHub Pages has no server rewrites. Hash URLs make every deep link and refresh work without a `404.html` workaround, and avoid a router dependency. |
| **CSS Modules + one global token file** | Component styles stay local; colours, spacing and type scale live in `src/styles/global.css`. |
| **Self-hosted fonts** (`@fontsource/ibm-plex-*`) | No requests to third-party font CDNs, no trackers. |
| **Content as typed data** (`src/data/`) | Adding or editing a project is a data change, not a layout change. |
| **Confirmed vs. pending content** | Any unverified detail is wrapped in `pending()`. It shows as a marked placeholder in development and is removed from production builds, including its text (see `build/strip-pending.ts`). Unverified claims are never published. |
| **Diagrams as semantic HTML** (`src/components/Diagram.tsx`) | Architecture flows are ordered lists, so they are responsive, readable by screen readers and defined in data. |
| **Employer work shown as architecture case studies** | Confidential code, data, credentials and screenshots are not published. |

### Accessibility and performance

- Semantic landmarks, one `h1` per page, skip link, labelled navigation.
- Focus moves to the page or section heading after navigation; visible focus styles throughout.
- `prefers-reduced-motion` disables animations and transitions.
- Text colours meet WCAG AA contrast on the dark background.
- No analytics, trackers or third-party scripts. The JS bundle is ~90 kB gzipped (mostly React).

---

## Project structure

```
.github/workflows/deploy.yml  Build, lint, test and deploy to GitHub Pages
build/strip-pending.ts        Vite plugin: removes placeholder text from production bundles
public/
  favicon.svg
  Salma_Mohamed_Salem_CV.pdf  Downloadable CV
src/
  App.tsx                     Routing, page titles, focus management
  types/content.ts            Content model (Project, Role, SkillGroup, Diagram…)
  data/                       All site content — edit here
    profile.ts                Name, links, email, CV file name
    projects.ts               Project catalogue and case studies
    experience.ts             Employment history
    skills.ts                 Grouped skills (no proficiency percentages)
    education.ts              Degree, modules, achievements
    content.test.ts           Data integrity tests
  lib/
    content.ts                pending(), visibility filters, labels
    router.ts (+ test)        Hash router
  components/                 Reusable UI (cards, diagrams, tags, header…)
  sections/                   Homepage sections
  pages/                      Home, project catalogue, project detail, 404
  styles/global.css           Design tokens, base styles
CONTENT-TODO.md               Details still to confirm before they can be published
```

---

## Local development

Requires **Node.js 20.19+** (22 recommended).

```bash
npm install
npm run dev          # http://localhost:5173/Portfolio/
```

The dev server shows a banner and highlights every **To confirm** placeholder, and also lists draft projects. Production builds hide all of them.

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with placeholders visible |
| `npm run build` | Type-check and build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Lint with oxlint |
| `npm test` | Run unit tests (Vitest) |
| `npm run check` | Lint + test + build — the same steps CI runs |

---

## Editing content

### Add a project

Append an object to `src/data/projects.ts`. TypeScript will tell you which fields are required.

```ts
{
  slug: 'my-project',                 // URL: #/projects/my-project
  title: 'My Project',
  tagline: 'One line under the title.',
  summary: 'Two sentences for the project card.',
  category: 'independent',            // 'professional' | 'academic' | 'independent'
  status: 'in-progress',              // 'completed' | 'in-progress' | 'prototype' (optional)
  featured: 5,                        // optional — homepage position
  stack: ['Go', pending('Database — confirm')],
  problem: ['…'],
  solution: ['…'],
  contribution: ['…'],
  diagrams: [{ kind: 'flow', title: 'Pipeline', stages: [{ label: 'Input' }, { label: 'Output' }] }],
  decisions: [{ title: 'Why X', body: '…' }],
  planned: ['Shown under “Planned scope” until built'],
  links: [{ label: 'Source code', href: 'https://github.com/…', kind: 'repo' }],
}
```

- **Unconfirmed detail?** Wrap it: `pending('Your question or placeholder')`. Replace it with a plain string once confirmed.
- **Not ready to publish?** Set `draft: true`. The project then appears only in `npm run dev`.
- **Homepage order** comes from `featured`. Keep it to four projects; a test enforces this.

### Update the CV

Replace `public/Salma_Mohamed_Salem_CV.pdf` and keep the file name, or change `cvFile` in `src/data/profile.ts`.

---

## Deployment

The site deploys to GitHub Pages through GitHub Actions (`.github/workflows/deploy.yml`):

- **Every push to `main`:** lint, test, build, then deploy.
- **Pull requests:** lint, test and build only. Nothing is deployed.

### One-time setup

1. Open the repository on GitHub → **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Merge to `main`, or run the workflow manually from the **Actions** tab (**Deploy to GitHub Pages → Run workflow**).
4. When the workflow finishes, the site is at **https://salmamohamed253.github.io/Portfolio/**.

### Base path

GitHub Pages serves project sites from `/<repository-name>/`, and the path is case-sensitive. `vite.config.ts` therefore sets `base: '/Portfolio/'`.

- If you rename the repository, update `base` in `vite.config.ts` and the URLs in `index.html`.
- For a custom domain or a `<username>.github.io` repository, build with `BASE_PATH=/`.

---

## Privacy and confidentiality

- The site shows only email, LinkedIn and GitHub. The phone number and home address from the CV are not repeated on the page. **Note:** the downloadable CV PDF itself does contain them.
- Employer projects are described at the architecture level only, with no source code, credentials, internal data or screenshots.
- No secrets or API keys are used anywhere; the site is fully static.

## License

Content © Salma Mohamed Salem. All rights reserved. Code may be referenced for learning purposes.
