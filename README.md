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

se_project_express/
├── controllers/
│ ├── users.js
│ └── clothingItems.js
├── models/
│ ├── user.js
│ └── clothingItem.js
├── routes/
│ ├── users.js
│ └── clothingItems.js
├── utils/
│ └── errors.js
├── app.js
├── .eslintrc
├── .gitignore
├── package.json
└── sprint.txt

yaml
Copy
Edit

---

## 🧪 Running the Project Locally

> Requires Node.js, MongoDB, and npm installed.

1. **Clone the repo**

```bash
git clone https://github.com/Bianca2593/se_project_express.git
cd se_project_express
Install dependencies

bash
Copy
Edit
npm install
Start MongoDB

Make sure MongoDB is running locally on mongodb://127.0.0.1:27017.

Run the server

Start normally:

bash
Copy
Edit
npm run start
Or with hot reload (nodemon):

bash
Copy
Edit
npm run dev
🧪 Testing with Postman
Before running tests, set the correct validUserId and validCardId values in Postman from your real MongoDB data.

Import the official Postman Test Suite from the project instructions.

Fork it to your Postman workspace.

Click "Run collection" and review the results.

🟢 Make sure all tests pass before submission.

🧾 API Endpoints
👤 Users
Method	Endpoint	Description
GET	/users	Get all users
GET	/users/:id	Get user by ID
POST	/users	Create user

🧥 Items
Method	Endpoint	Description
GET	/items	Get all clothing items
POST	/items	Create a new item
DELETE	/items/:itemId	Delete item by ID
PUT	/items/:itemId/likes	Like an item
DELETE	/items/:itemId/likes	Unlike an item

📌 Developer Notes
This version uses a temporary test user hardcoded in the app.js file.

In production, this will be replaced by real user authentication (in Sprint 13+).

Make sure to edit the sprint.txt file and set it to the correct sprint number (e.g. 12 for submission).

✅ Project Status
✅ All Postman tests: passed

✅ GitHub Actions: green

✅ Linter (ESLint): clean

✅ Ready for review

🧑‍💻 Author
Bianca Nechita
GitHub: @Bianca2593