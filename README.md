# ReadQuest 📚

> ⚠️ **Note:** This project uses the Open Library API. Sometimes, the first request may take a few seconds depending on API response time. Subsequent requests are faster. 🚀

<div align="center">

![ReadQuest Banner](https://img.shields.io/badge/ReadQuest-Book-Finder-orange?style=for-the-badge)

**ReadQuest** is a full-stack book discovery application that allows users to search, explore, and view detailed information about books, including authors, subjects, and descriptions, with a responsive and modern interface.




🌐 **[Live Demo](https://read-quest.vercel.app/)**

</div>

---

## ✨ Features

### ✅ Book Search

* Search for books by **title, author, or subject**
* View **real-time search results** with caching
* Maintain **search history** for quick access

### ✅ Book Details

* Detailed book information including:
  * Title, author(s), publish date
  * Number of pages
  * Description
  * Subjects & topics
* Direct link to **Open Library** page

### ✅ User Experience

* Dark/light theme toggle
* Responsive UI for desktop and mobile
* Smooth animations and modern design with **shadcn/ui** and **Tailwind CSS**

---

## 🛠️ Tech Stack

<div align="center">

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Shadcn/UI](https://img.shields.io/badge/Shadcn-UI-blue?style=for-the-badge)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

</div>

### **Frontend**

* React with **Vite** for fast, optimized development
* **Redux Toolkit** for state management
* **Tailwind CSS** and **shadcn/ui** for components and styling
* Responsive and accessible design
* Theme toggle (dark/light mode)

### **Backend**

* **Open Library API** for fetching book data
* Axios for HTTP requests

### **Deployment**

* Frontend deployed on **Vercel**
* No backend required (API-based)

---

## 📸 Screenshots

### Home Page

![Home](https://res.cloudinary.com/dqz5xgr5v/image/upload/v1757772688/Screenshot_2025-09-13_at_19.38.14_vlubik.png)

### Book Results

![Book Results](https://res.cloudinary.com/dqz5xgr5v/image/upload/v1757772698/Screenshot_2025-09-13_at_19.38.31_pxvymt.png)

![Book Results 2](https://res.cloudinary.com/dqz5xgr5v/image/upload/v1757772690/Screenshot_2025-09-13_at_19.38.44_c7vfht.png)

### Book Details

![Book Detail](https://res.cloudinary.com/dqz5xgr5v/image/upload/v1757772690/Screenshot_2025-09-13_at_19.39.16_gmo0z2.png)

---

## 🚀 Getting Started

### **Prerequisites**

* Node.js (v14+)
* npm or yarn

### **Setup**

```bash
# Clone repo
git clone https://github.com/rakesh-mahapatro-456/ReadQuest.git
cd ReadQuest

# Install dependencies
npm install

# Create .env file
# VITE_BASE_URL should point to Open Library API base (optional)
VITE_BASE_URL=https://openlibrary.org

# Start frontend
npm run dev
````

Open `http://localhost:5173` in your browser.

---

## 🔒 Security Highlights

* No sensitive data stored
* Requests go directly to Open Library API

---

## ✅ Key Learnings

* Integrating external APIs (Open Library)
* Managing state with **Redux Toolkit**
* Building responsive UI with **Tailwind CSS** and **shadcn/ui**
* Deploying on **Vercel** with environment variables
* Theme toggling and local storage caching

---

<div align="center">

**Built with ❤️ using React, Redux, TailwindCSS, and Vite**

</div>

---

