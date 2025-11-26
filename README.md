# 🚀 Alpian — Full‑Stack Portfolio

<div align="center">
  
  ![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
  ![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)
  ![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
  ![Framer Motion](https://img.shields.io/badge/Framer%20Motion-Active-0055FF?style=for-the-badge&logo=framer)

  <br/>
  <b>A modern, interactive portfolio showcasing full‑stack work, skills, and experience.</b>
  
  <!-- Optional: add live demo link when available -->
  <!-- [Live Demo](https://your-domain.com) -->
</div>

---

## Overview

This portfolio is built with React + TypeScript + Vite and styled with Tailwind CSS. It focuses on clarity, performance, and interactivity, featuring an advanced project filter, lazy‑loaded images, and a dedicated Resume/CV page with print/export options.

---

## Features

- Landing Page
  - Animated Hero with CTA buttons (WhatsApp + View Resume)
  - About, Services, Portfolio, Pricing, FAQ, Testimonials, Contact
  - Back‑to‑Top button with smooth scroll
  - Dark/Light mode toggle (persisted)
  - Scroll‑spy highlighting in the navbar

- Portfolio Section
  - Advanced filtering by category and technology stack (multi‑select)
  - Search by title/description/tags
  - Lazy loading for images with skeleton shimmer
  - Project modal with details and external links

- Resume/CV Page (/resume)
  - Interactive timeline (Experience & Education tabs)
  - Animated skill progress bars by category
  - Certifications & Achievements sections
  - Download CV (PDF) button and Print‑friendly layout

- Quality & DX
  - TypeScript types across data and components
  - Framer Motion animations
  - ESLint setup

---

## Tech Stack

- React 18, TypeScript, Vite
- Tailwind CSS, PostCSS
- React Router DOM
- Framer Motion, Lucide Icons

---

## Getting Started

Prerequisites
- Node.js >= 18
- npm, yarn, or pnpm

Install and run (npm shown):

```cmd
npm install
npm run dev
```

Build and preview:

```cmd
npm run build
npm run preview
```

Lint:

```cmd
npm run lint
```

The app runs at http://localhost:5173

---

## Project Structure

```
ts-porto/
├─ public/
│  ├─ img/                 # Images
│  └─ CvAndResume/         # Resume/CV PDFs
├─ src/
│  ├─ components/
│  │  ├─ ui/               # Reusable UI (BackToTop, LazyImage, etc.)
│  │  ├─ Hero.tsx
│  │  ├─ Navbar.tsx
│  │  ├─ Portofolio.tsx
│  │  └─ ...
│  ├─ pages/
│  │  ├─ HomePage.tsx
│  │  └─ ResumePage.tsx
│  ├─ layouts/
│  │  └─ ResumeLayout.tsx
│  ├─ data/                # Projects & resume data
│  │  ├─ projects.ts
│  │  └─ resume.ts
│  ├─ hooks/               # useTheme, useScrollSpy
│  ├─ types/
│  ├─ utils/
│  ├─ App.tsx
│  └─ main.tsx
└─ package.json
```

---

## Customization

- Update portfolio items: `src/data/projects.ts`
- Edit resume content: `src/data/resume.ts`
- Replace images: `public/img/`
- Update CV/PDF: `public/CvAndResume/`

Theme/Design tweaks: `tailwind.config.js` and component files in `src/components/`.

---

## Notes & Shortcuts

- Resume button lives in the Hero section (next to “Let’s talk”) and routes to `/resume`.
- Navbar adapts on the Resume page so it remains visible at the top in light mode.
- Tech‑stack filtering in the Portfolio supports multi‑select (AND logic).

---

## Roadmap Ideas

- Blog/Articles section (dev notes, case studies)
- Project case studies with metrics (before/after, perf, SEO)
- Playground/demos for interactive components
- CMS integration for dynamic content (e.g., Notion, Contentful)
- Unit tests for components/hooks

---

## License

This project is open‑sourced under the MIT License.

---

## Contact

- Website: https://alpian-porto.vercel.app/
- GitHub: https://github.com/AlpianPPLG
- LinkedIn: https://www.linkedin.com/in/alpian-alpian-7a16522bb/
- Email: Nova07pplg@gmail.com
