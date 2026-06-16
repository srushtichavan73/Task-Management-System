# 📋 Task Management App - Frontend

A modern Task Management web application built with React, Vite, and Tailwind CSS featuring a Kanban board, charts, and real-time updates.

![React](https://img.shields.io/badge/React-18-blue)
![Vite](https://img.shields.io/badge/Vite-5.0-purple)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-teal)
![Recharts](https://img.shields.io/badge/Recharts-Charts-orange)

## 🚀 Features

- JWT Authentication (Login & Register)
- Dashboard with Analytics Charts
- Kanban Board (TODO → IN PROGRESS → REVIEW → DONE)
- Create, Move & Delete Tasks
- Comment System on Tasks
- Task Priority Badges (LOW, MEDIUM, HIGH, CRITICAL)
- Responsive Design with Tailwind CSS
- Protected Routes

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| React 18 | Frontend Framework |
| Vite | Build Tool |
| Tailwind CSS | Styling |
| Axios | HTTP Client |
| React Router DOM | Navigation |
| Recharts | Charts & Analytics |

## 📁 Project Structure

src/
├── api/            # Axios instance & interceptors
├── components/
│   ├── common/     # Navbar, ProtectedRoute
│   └── comments/   # Comment Section
├── context/        # Auth Context (JWT)
├── pages/          # Login, Register, Dashboard, Project
└── routes/         # App Routes

## 🖥️ Screenshots

### Login Page
![Login](screenshots/login.png)

### Dashboard
- Stats cards showing total projects, tasks, completed & pending
- Pie chart — Tasks by Status
- Bar chart — Tasks by Priority
- Project cards grid
![Dashboard](screenshots/dashboard.png)

### Kanban Board
- 4 columns: To Do, In Progress, Review, Done
- Task cards with priority badges
- Move tasks between columns
- Delete tasks
![Dashboard](screenshots/kanban.png)

### Project Page
![Login](screenshots/project_page.png)

### Comments
- Click any task to open detail modal
- Add & delete comments
![Dashboard](screenshots/comments.png)

## ⚙️ Setup & Run

### Prerequisites
- Node.js 18+
- npm

### Steps

1. Clone the repository
git clone https://github.com/srushtichavan73/task-management-frontend.git

2. Install dependencies
npm install

3. Make sure backend is running on http://localhost:8080

4. Run the app
npm run dev

5. Open http://localhost:5173

## 🔗 Related Repositories

Backend: https://github.com/srushtichavan73/task-management-backend

## 👩‍💻 Developer

Srushti Chavan
- GitHub: https://github.com/srushtichavan73
- LinkedIn: https://linkedin.com/in/srushti-chavan-7a3283380
