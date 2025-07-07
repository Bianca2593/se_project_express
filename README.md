# 👗 WTWR (What to Wear?) – Back End

This is the **back-end project** for the "What to Wear" web application, developed as part of Sprint 12 in the TripleTen Software Engineering Program.

The goal is to build a RESTful server using **Node.js**, **Express**, and **MongoDB**, with structured routing, data validation, and robust error handling. This project handles users and clothing items, and simulates basic authentication via middleware.

---

## 🚀 Project Overview

- 👤 Create & retrieve users  
- 🧥 Create, get, delete clothing items  
- ❤️ Like & unlike items  
- ❌ Return proper status codes for errors (400, 404, 500)  
- 🧪 Tested with Postman collection & GitHub Actions  

---

## 🛠 Technologies Used

- Node.js  
- Express.js  
- MongoDB & Mongoose  
- Postman (manual test suite)  
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
├── utils/
│   └── errors.js
├── app.js
├── .eslintrc
├── .gitignore
├── package.json
└── sprint.txt
```

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

### 3. Start MongoDB

Make sure MongoDB is running locally on `mongodb://127.0.0.1:27017`.

### 4. Run the server

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

- Use the official 88-test Postman collection provided by TripleTen.
- Set `user_name = testItem` and `user_avatar = https://example.com/av.bmp` in your environment.
- Ensure that all 88 tests pass before submitting.

---

## ✅ Project Status

- ✅ All Postman tests: 88/88 passed  
- ✅ GitHub Actions: green  
- ✅ Linter: clean  
- ✅ Ready for final review  

---

## 🧑‍💻 Author

**Bianca Nechita**  
GitHub: [@Bianca2593](https://github.com/Bianca2593)
