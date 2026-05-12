# FundFlow AI

FundFlow AI is a full-stack project budget automation platform designed to help organizations track project finances, manage expenses, monitor budgets, and generate AI-powered financial insights.

This project was built to simulate how nonprofits or organizations can automate project accounting workflows.

---

## Core Features

### Project Management
- Create projects
- Store donor information
- Set project budgets
- Track multiple funding projects

### Expense Management
- Add project expenses
- Categorize expenses
- Track spending records

### Financial Dashboard
- Total projects
- Total budget
- Total expenses
- Remaining budget calculations

### AI Financial Assistant
Uses OpenAI API to analyze project data and answer financial questions such as:

- "How much budget is remaining?"
- "Which project spent the most?"
- "Summarize project expenses"
- "Generate donor report summaries"

---

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### AI Integration
- OpenAI API

### Deployment
- Render

---

## API Routes

### Project Routes
- POST `/api/projects`
- GET `/api/projects`

### Expense Routes
- POST `/api/expenses`
- GET `/api/expenses`

### Dashboard Route
- GET `/api/dashboard`

### AI Route
- POST `/api/ai/ask`
<img width="1440" height="900" alt="Screenshot 2026-05-11 at 11 55 01 PM" src="https://github.com/user-attachments/assets/f2cca599-2372-415b-956d-f5333240aafb" />

## Live Demo

Website:
https://fundflow-ymvf.onrender.com/




---

## Installation

### Backend


```bash
cd backend
npm install
npm run dev

