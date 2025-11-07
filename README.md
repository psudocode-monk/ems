# 🧠 Task Management System

A **modern, minimalist, and animated task management dashboard** built entirely with **React**, **Tailwind CSS**, and **Framer Motion**.  
It’s a **frontend-only project** designed for **admins** to manage users and assign tasks — and for **users** to view and update their progress — with all data stored locally in `localStorage`.

---

## ✨ Features

### 👨‍💼 Admin Panel
- Create and manage users (Admin/User roles)
- Assign tasks to any registered user
- View all assigned tasks in an elegant, animated table
- Clear all tasks in one click
- Stunning **glassmorphism UI** with blur and depth effects

### 👩‍💻 User Dashboard
- View all assigned tasks in a responsive, dynamic table
- Mark tasks as **completed** instantly
- Progress automatically synced with local storage
- Minimal, dark, and fluid user interface

### 💡 General Highlights
- Built with **React (Hooks + Functional Components)**
- Styled with **Tailwind CSS**
- Smooth animations powered by **Framer Motion**
- Fully **responsive** and **single-page** UI
- Persistent data storage via **localStorage**
- Elegant **bichromatic dark theme** (pitch black + soft white/grey)

---

## 🖼️ UI Preview (Theme)
- Background: `#0a0a0a` (pitch dark)
- Text: `zinc-100` and `zinc-400`
- Accent surfaces: `bg-white/5`, `border-white/10`, `backdrop-blur-md`
- Hover depth: subtle lift, glow, and blur animations
- Components: rounded corners (`2xl`), smooth transitions, and spring physics motion

---

## 🧩 Components Overview

| Component | Purpose |
|------------|----------|
| **Login.jsx** | Handles user login with role-based redirection |
| **Sidebar.jsx** | Navigation for Admin/User sections |
| **CreateUser.jsx** | Admin: Add new users with role and email |
| **AssignTask.jsx** | Admin: Assign new tasks to users |
| **AdminTaskOverview.jsx** | Admin: View all tasks assigned across users |
| **UserList.jsx** | Admin: View all registered users and their task counts |
| **UserDashboard.jsx** | User: Personalized dashboard with assigned tasks |
| **UserTasks.jsx** | User: Interactive list to toggle task completion |
| **LogoutButton.jsx** | Handles logout and redirects to login page |

---

## 🏗️ Tech Stack

| Technology | Purpose |
|-------------|----------|
| **React** | Component-based UI |
| **Vite** | Lightning-fast bundler |
| **Tailwind CSS** | Utility-first styling |
| **Framer Motion** | Modern motion animations |
| **LocalStorage API** | Data persistence |
| **JavaScript (ES6+)** | Core logic and state management |

---

