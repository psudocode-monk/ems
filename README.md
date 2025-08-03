# 🚀 Employee Management System (Frontend Only)

A sleek, dark-themed Employee Management System built using **React + Vite + Tailwind CSS**. It supports two roles:

- **Admin**: Create users, assign tasks, and monitor task progress.
- **User**: View and complete assigned tasks, which reflect back in the admin dashboard.

---

## 📦 Tech Stack

- ⚛️ React + Vite  
- 🎨 Tailwind CSS  
- 🧠 LocalStorage for state persistence (no backend used)

---

## 📁 Folder Structure

components/
├── AdminDashboard.jsx
├── UserDashboard.jsx
├── CreateUser.jsx
├── AssignTask.jsx
├── AdminTaskOverview.jsx
├── Sidebar.jsx
├── Login.jsx
├── LogoutButton.jsx
App.jsx
main.jsx

---


---

## 💡 Features

- 🔐 Login system for Admin and Users
- 🧑‍💼 Admin Dashboard with:
  - Create New User
  - Assign Tasks
  - View Task Completion Overview
  - Clear All Tasks
- ✅ User Dashboard with:
  - View Assigned Tasks
  - Mark Tasks as Completed
- 📦 State saved in `localStorage` for persistence
- 🌓 Dark UI with emerald green accents

---

## 🛠️ Setup & Run Locally

```bash
# Clone the repo
git clone https://github.com/your-username/employee-management-frontend.git

# Navigate to the folder
cd employee-management-frontend

# Install dependencies
npm install

# Start the development server
npm run dev

# Admin:
  Email: admin@gmail.com
  Password: admin123

# User:
  Email: created via Admin panel
  Password: 123456


---

