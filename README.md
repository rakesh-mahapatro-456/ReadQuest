<div align="center">

```
██████╗ ███████╗ █████╗ ██████╗  ██████╗ ██╗   ██╗███████╗███████╗████████╗
██╔══██╗██╔════╝██╔══██╗██╔══██╗██╔═══██╗██║   ██║██╔════╝██╔════╝╚══██╔══╝
██████╔╝█████╗  ███████║██║  ██║██║   ██║██║   ██║█████╗  ███████╗   ██║
██╔══██╗██╔══╝  ██╔══██║██║  ██║██║▄▄ ██║██║   ██║██╔══╝  ╚════██║   ██║
██║  ██║███████╗██║  ██║██████╔╝╚██████╔╝╚██████╔╝███████╗███████║   ██║
╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝  ╚══▀▀═╝  ╚═════╝ ╚══════╝╚══════╝   ╚═╝
```

**Book discovery app — Express proxy, Redux caching, Open Library API**

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Redux](https://img.shields.io/badge/Redux-764ABC?style=flat-square&logo=redux&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

🌐 **[Live Demo](https://read-quest.vercel.app)**

> ⚠️ Backend on Render free tier — first request after inactivity may take 30–60 seconds.

</div>

---

## `$ cat overview.txt`

ReadQuest is a book discovery app with an **Express proxy backend** that handles CORS and forwards requests to the Open Library API. Search results are cached in Redux to avoid redundant API calls. Search history and theme preference are persisted in localStorage.

```
  Frontend (React + Vite)
         │
         ▼  VITE_BASE_URL
  Express Backend (proxy) — Render
  ├── GET /api/search          →  proxy → Open Library /search.json
  └── GET /api/books/:workId   →  proxy → Open Library /works/:workId.json
         │
         ▼
  Open Library API
```

```
  User search → Redux store check (bookSlice)
                       │
               ┌───────┴────────┐
           cached             not cached
               │                    │
         return instantly      GET /api/search
                                     │
                              store in Redux
                              update localStorage (lastBooks, lastQuery)
                              render results
```

---

## `$ cat features.txt`

### 🔍 Book Search
- Search by title, author, or subject via `/api/search`
- Results cached in Redux — repeated searches return instantly
- Search history persisted in localStorage (`lastQuery`, `lastBooks`)

### 📖 Book Details
- Fetch via `/api/books/:workId`
- Title, author(s), publish date, page count, description, subjects
- Direct link to Open Library page

### 🎨 UI
- Dark/light theme toggle with localStorage persistence
- Responsive for desktop and mobile
- shadcn/ui components + Tailwind CSS

---

## `$ cat stack.txt`

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  BACKEND                                                        │
│  Node.js · Express    →  proxy server + CORS handling          │
│  Open Library API     →  book data source                      │
│  Axios                →  HTTP requests to Open Library         │
│                                                                 │
│  FRONTEND                                                       │
│  React + Vite         →  fast dev build                        │
│  Redux Toolkit        →  search cache + state (bookSlice)      │
│  Tailwind CSS         →  styling                               │
│  shadcn/ui            →  accessible component library          │
│  Axios (instance)     →  requests via VITE_BASE_URL            │
│                                                                 │
│  PERSISTENCE                                                    │
│  localStorage         →  lastBooks, lastQuery, theme pref      │
│                                                                 │
│  DEPLOYMENT                                                     │
│  Frontend  →  Vercel                                           │
│  Backend   →  Render                                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## `$ ls -la screenshots/`

### Home
![Home](https://res.cloudinary.com/dqz5xgr5v/image/upload/v1757772688/Screenshot_2025-09-13_at_19.38.14_vlubik.png)

### Search Results
![Results](https://res.cloudinary.com/dqz5xgr5v/image/upload/v1757772698/Screenshot_2025-09-13_at_19.38.31_pxvymt.png)

### Book Detail
![Detail](https://res.cloudinary.com/dqz5xgr5v/image/upload/v1757772690/Screenshot_2025-09-13_at_19.39.16_gmo0z2.png)

---

## `$ cat setup.txt`

### Prerequisites
```
Node.js v14+
npm or yarn
```

### Clone
```bash
git clone https://github.com/rakesh-mahapatro-456/ReadQuest.git
cd ReadQuest
```

### Backend
```bash
cd backend && npm install
```

Create `.env`:
```env
PORT=8000
FRONTEND_URL=http://localhost:5173
```

```bash
npm run dev
# Proxy running at http://localhost:8000
```

### Frontend
```bash
cd frontend && npm install
```

Create `.env`:
```env
VITE_BASE_URL=http://localhost:8000
```

```bash
npm run dev
# App at http://localhost:5173
```

---

<div align="center">

```
$ echo $BUILT_WITH
  React · Redux · Express · Tailwind CSS · Vite
  Built with ❤️
```

</div>
