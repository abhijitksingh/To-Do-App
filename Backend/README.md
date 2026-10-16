# To-Do App (Backend)

REST API server built with Node.js and Express, featuring secure Authentication.

# Features
- User Registration & Login (JWT / Auth)
- Secure password hashing (bcrypt)
- Protected CRUD endpoints for tasks

# Tech Stack
- Node.js & Express.js
- MongoDB & Mongoose
- JSON Web Token (JWT) / bcrypt

# API Endpoints
- `POST /signup` - Register a new user
- `POST /login` - Login user
- `GET /tasks` - Get user tasks (Protected)
- `POST /create-tasks` - Create task (Protected)

# How to Run
1. Create a `.env` file with `MONGO_URI`, and `JWT_SECRET`.
2. Install & Start:
- npm install
- npm start