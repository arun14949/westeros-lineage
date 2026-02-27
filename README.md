# ⚔️ Westeros Lineage

A beautifully crafted, interactive family tree and character explorer for the Great Houses of Westeros from Game of Thrones and House of the Dragon.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- **🏰 9 Great Houses** - Stark, Targaryen, Lannister, Baratheon, Greyjoy, Tyrell, Martell, Arryn, Tully
- **👥 45+ Characters** - Complete bios, titles, aliases, and relationships
- **🌳 Interactive Family Trees** - Visual lineage trees with clickable nodes and spoiler toggles
- **🔍 Search & Filter** - Real-time search across characters and houses
- **📱 Responsive Design** - Optimized for mobile and desktop
- **👁️ Spoiler Mode** - Toggle to show/hide character fates and death markers
- **📜 Manuscript Aesthetic** - Parchment textures, medieval fonts, and hand-drawn elements

## 🚀 Tech Stack

- **React 19** with TypeScript
- **Vite** for fast development and builds
- **Tailwind CSS 4** for styling
- **Custom Design System** - House-specific color palettes and thematic components

## 🏃 Getting Started

### Prerequisites

- Node.js 18+
- npm or bun

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/westeros-lineage)

**Step 1: Push to GitHub**

```bash
# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/westeros-lineage.git
git push -u origin main
```

**Step 2: Deploy on Vercel**

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"New Project"**
3. Import your GitHub repository
4. Vercel will auto-detect the Vite configuration
5. Click **"Deploy"**

Your site will be live at `https://your-project.vercel.app`

**✅ Auto-deployment enabled**: Vercel automatically deploys every push to the main branch.

### Alternative Deployment Options

- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use `gh-pages` package
- **Cloudflare Pages**: Connect your GitHub repo
- **Railway**: One-click deployment

## 📁 Project Structure

```
westeros-lineage/
├── src/
│   ├── components/
│   │   ├── BottomNav.tsx        # Bottom navigation bar
│   │   └── CharacterAvatar.tsx  # Character avatar component
│   ├── views/
│   │   ├── LandingView.tsx      # Home page with search
│   │   ├── HousesView.tsx       # Houses registry
│   │   ├── TreeView.tsx         # Family tree visualization
│   │   └── CharacterView.tsx    # Character biography
│   ├── data.ts                  # All character & house data
│   ├── App.tsx                  # Main app with routing
│   ├── main.tsx                 # Entry point
│   └── index.css                # Global styles
├── public/                      # Static assets
├── index.html                   # HTML template
├── vite.config.ts               # Vite configuration
├── tailwind.config.js           # Tailwind config
└── package.json                 # Dependencies
```

## 📊 Data Model

### Characters
- Full biographical information
- House affiliations
- Titles, aliases, and epithets
- Living/deceased status
- Spoiler-protected content
- Family relationships and lineage

### Houses
- Complete lineage trees with parent-child relationships
- House mottos and words
- Seat of power and region
- Member counts
- House-specific color schemes
- Sigils and icons

## 🎨 Design System

Each Great House has its own color palette:
- **Stark**: Northern grey (`#5c6b73`)
- **Targaryen**: Dragon red (`#8a1c1c`)
- **Lannister**: Lannister gold (`#bfa15f`)
- **Baratheon**: Storm yellow (`#c9a61a`)
- **Greyjoy**: Kraken grey (`#4a5568`)
- **Tyrell**: Highgarden green (`#5b8c3e`)
- **Martell**: Dornish orange (`#d4742c`)
- **Arryn**: Falcon blue (`#4e7a9e`)
- **Tully**: River blue (`#3b6d8f`)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is for educational and entertainment purposes. All Game of Thrones and House of the Dragon characters, houses, and lore are property of George R.R. Martin and HBO.

## 📌 Version

**Current Version**: 1.0.0

---

<div align="center">
Built with ⚔️ for fans of the realm
</div>
