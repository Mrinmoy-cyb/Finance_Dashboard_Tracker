# 💰 Finance Dashboard Backend

## 📌 Overview

This project is a backend system for a Finance Dashboard application that allows users to track income and expenses, 
manage financial records, and view aggregated insights.

The system is built with a focus on scalability, clean architecture, and secure authentication.

---

## 🚀 Features

* 🔐 User Authentication (JWT-based)
* 🛡️ Role-Based Authorization (ADMIN / USER)
* ➕ Add financial records (income/expense)
* 📄 Fetch user-specific records
* 📊 Dashboard analytics (total income, expense, balance)
* ⚙️ Middleware-based architecture (auth, authorization, error handling)

---

## 🏗️ Tech Stack

* **Backend:** Node.js + Express.js
* **Database:** SQLite
* **ORM:** Prisma
* **Authentication:** JWT (JSON Web Tokens)
* **Password Hashing:** bcrypt

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/finance-dashboard
cd finance-dashboard
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Setup environment variables

Create a `.env` file:

```env
DATABASE_URL="file:./finance.db"
JWT_SECRET="secret"
```

### 4️⃣ Setup database

```bash
npx prisma generate
npx prisma db push
```

### 5️⃣ Run the server

```bash
npm run dev
```

Server will run on:

```text
http://localhost:3000
```

---

**## 📡 API Endpoints**

### 🔐 Auth Routes

#### Register

```http
POST /auth/register
```

Body:

```json
{
  "email": "user@gmail.com",
  "password": "123456",
  "name": "User",
  "role": "USER"
}
```

---

#### Login

```http
POST /auth/login
```

Response:

```json
{
  "token": "JWT_TOKEN"
}
```

---

### 📊 Records Routes (Protected)

#### Add Record

```http
POST /records
```

#### Get Records

```http
GET /records
```

👉 Requires header:

```text
Authorization: Bearer <token>
```

---

### 📈 Dashboard

#### Summary

```http
GET /dashboard/summary
```

Response:

```json
{
  "income": 5000,
  "expense": 2000,
  "balance": 3000
}
```

---

## 🔒 Authentication Flow

1. User registers
2. User logs in → receives JWT token
3. Token is sent in request headers
4. Middleware verifies token before granting access

---

## ⚠️ Assumptions Made

* Each user can only access their own financial records
* Roles (ADMIN/USER) are predefined and controlled at the backend
* SQLite is used for simplicity in development
* API is tested locally using Postman

---

## ⚖️ Trade-offs

* SQLite is lightweight but not ideal for large-scale production systems
* JWT authentication is stateless but requires proper token handling
* Initial focus is on backend APIs; frontend is not included

---

## 🔮 Future Improvements

* React frontend dashboard (charts & UI)
* Advanced analytics (monthly trends, category breakdown)
* Pagination and filtering for records
* Deployment on cloud (Render / AWS / Vercel)
* Input validation using Zod

---

## 🧠 Key Learnings

* Building secure authentication systems using JWT
* Designing modular backend architecture with middleware
* Using Prisma ORM for efficient database management
* Handling real-world API testing and debugging

---
