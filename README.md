# CodeMUJ - Problem Solving Platform

A full-stack MERN (MongoDB, Express.js, React, Node.js) application for solving coding problems.

## Features

- User authentication (register/login)
- Problem listing with category filtering
- Modern UI with responsive design
- Real-time data fetching
- Admin functionality for managing problems

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd project
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ..
npm install
```

4. Create a `.env` file in the backend directory with the following content:
```
MONGODB_URI=mongodb://localhost:27017/codemuj
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

## Running the Application

1. Start MongoDB on your system

2. Start the backend server:
```bash
cd backend
npm run dev
```

3. In a new terminal, start the frontend development server:
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Project Structure

```
project/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Problem.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── problems.js
│   ├── middleware/
│   │   └── auth.js
│   ├── .env
│   └── server.js
├── src/
│   ├── components/
│   │   └── AuthModal.tsx
│   ├── services/
│   │   └── api.ts
│   ├── App.tsx
│   └── main.tsx
└── package.json
```

## Technologies Used

- Frontend:
  - React
  - TypeScript
  - Tailwind CSS
  - Axios
  - Lucide Icons

- Backend:
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - JWT
  - bcryptjs 