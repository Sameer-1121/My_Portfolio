# 🚀 Sameer's Portfolio

A cinematic, fully animated React portfolio built with Vite.

---

## ⚡ Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Run development server
```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

### 3. Build for production
```bash
npm run build
```

### 4. Preview production build
```bash
npm run preview
```

---

## 📁 Project Structure

```
sameer-portfolio/
├── index.html
├── vite.config.js
├── package.json
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx          ← React entry point
    ├── App.jsx           ← Root component
    ├── index.css         ← Global styles & animations
    ├── constants.js      ← All your data (skills, projects, etc.)
    ├── hooks.js          ← Custom React hooks
    └── components/
        ├── Cursor.jsx    ← Custom animated cursor
        ├── Particles.jsx ← Canvas particle field
        ├── Nav.jsx       ← Sticky navbar + mobile menu
        ├── Hero.jsx      ← Hero section + typewriter
        ├── About.jsx     ← About + timeline + currently card
        ├── Projects.jsx  ← Project cards with hover effects
        ├── Skills.jsx    ← Skill cards with animated bars
        ├── Contact.jsx   ← Contact section + footer
        └── Extras.jsx    ← ScrollProgress, BackToTop, EasterEgg
```

---

## ✏️ Customization

### Update your info
Edit `src/constants.js` to update:
- Projects (name, description, tags, links)
- Skills (name, icon, level, color)
- Timeline events
- Currently section
- Contact links

### Add a new project
In `src/constants.js`, add to the `PROJECTS` array:
```js
{
  id: "03",
  name: "My New Project",
  subtitle: "What it does",
  desc: "Longer description here.",
  tags: ["React", "Node.js"],
  color: "#00ffcc",
  emoji: "🚀",
  github: "https://github.com/yourusername/project",
  live: "https://project.vercel.app",
}
```

### Change colors
Edit `:root` in `src/index.css`:
```css
:root {
  --accent: #7c6aff;   /* purple */
  --accent2: #ff6a9e;  /* pink */
}
```

---

## 🎮 Easter Egg

Type the Konami Code on any page:
```
↑ ↑ ↓ ↓ ← → ← → B A
```

---

## 🛠 Tech Stack

- **React 18** — UI framework
- **Vite** — blazing fast bundler
- **Canvas API** — particle field
- **CSS Animations** — all transitions
- **Google Fonts** — Syne, JetBrains Mono, Instrument Sans

---

## 🚀 Deploy

### Vercel (recommended — free)
1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your repo → Deploy ✅

### Netlify
1. `npm run build`
2. Drag the `dist/` folder to [netlify.com/drop](https://app.netlify.com/drop)
