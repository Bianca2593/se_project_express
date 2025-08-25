# 👗 WTWR (What to Wear?) – Back End

This is the **back-end project** for the "What to Wear" web application, developed as part of the **TripleTen Software Engineering Program**.

This repo covers both **Sprint 12** and **Sprint 13**, with full support for **user authentication**, **token-based authorization**, and CRUD operations for users and clothing items.

---

## 🚀 Project Overview

- 👤 Create, update & retrieve users  
- 🧥 Create, get, delete clothing items  
- ❤️ Like & unlike items  
- 🔐 JWT authentication (login + signup)  
- 🔒 Protected routes (`/users/me`, `/items`)  
- ❌ Return proper status codes for errors (400, 401, 403, 404, 409, 500)  
- 🧪 Tested with Postman collection & GitHub Actions  

---

## 🛠 Technologies Used

- Node.js  
- Express.js  
- MongoDB & Mongoose  
- bcryptjs (password hashing)  
- jsonwebtoken (JWT auth)  
- dotenv  
- Postman  
- GitHub Actions (CI tests)  
- ESLint  

---

## 📁 Project Structure

```
se_project_express/
├── controllers/
│   ├── users.js
│   └── clothingItems.js
├── models/
│   ├── user.js
│   └── clothingItem.js
├── routes/
│   ├── users.js
│   └── clothingItems.js
├── middlewares/
│   └── auth.js
├── utils/
│   ├── errors.js
│   └── config.js
├── app.js
├── .env
├── .eslintrc
├── .gitignore
├── package.json
└── sprint.txt
```

---

## 🔐 Authentication

- `POST /signup` – Create new user (with email + hashed password)  
- `POST /signin` – Login and receive JWT  
- All other routes are protected and require a valid token  

Use the following header for protected requests:

```
Authorization: Bearer <your_token_here>
```

---

## 📪 API Endpoints

### Users

| Method | Endpoint         | Description                     |
|--------|------------------|---------------------------------|
| POST   | `/signup`        | Create new user                 |
| POST   | `/signin`        | Login and receive JWT           |
| GET    | `/users/me`      | Get current user                |
| PATCH  | `/users/me`      | Update current user (name/avatar) |

### Clothing Items

| Method | Endpoint               | Description                    |
|--------|------------------------|--------------------------------|
| GET    | `/items`               | Get all items                  |
| POST   | `/items`               | Create new item                |
| DELETE | `/items/:itemId`       | Delete item (if owner)         |
| PUT    | `/items/:itemId/likes` | Like item                      |
| DELETE | `/items/:itemId/likes` | Remove like from item          |

---

## 🧪 Running the Project Locally

> Requires Node.js, MongoDB, and npm installed.

### 1. Clone the repo

```bash
git clone https://github.com/Bianca2593/se_project_express.git
cd se_project_express
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file:

```env
JWT_SECRET=dev-secret
PORT=3001
```

### 4. Start MongoDB

Make sure MongoDB is running locally on `mongodb://127.0.0.1:27017/wtwr_db`.

### 5. Run the server

Start normally:

```bash
npm run start
```

Or with hot reload (nodemon):

```bash
npm run dev
```

---

## 🧪 Testing with Postman

- Use the official Postman collection provided by TripleTen.  
- Make sure to run `POST /signup` and `POST /signin` before accessing protected routes.  
- Set `user_name = testItem` and `user_avatar = https://example.com/av.bmp` in your environment.  
- All **88 tests** must pass before submitting.  

---

## ✅ Project Status

- ✅ All Postman tests: 88/88 passed  
- ✅ GitHub Actions: green  
- ✅ Linter: clean  
- ✅ JWT + auth logic implemented  
- ✅ Ready for final review ✅  

---

## 🧑‍💻 Author

**Bianca Nechita**  
GitHub: [@Bianca2593](https://github.com/Bianca2593)

