📋 Task Management App
A full-stack task management web application built with React, Express, and SQLite. Easily add, update, delete, and search tasks with a beautiful UI powered by React-Bootstrap.

🚀 Features
📝 Add/Edit/Delete Tasks

📆 Set Due Dates

🔍 Search Tasks by Title

🗂️ Task Status (Pending/Done)

🎨 Responsive UI with React-Bootstrap

⚙️ RESTful API using Express.js

🛠️ Tech Stack
Frontend - React, React-Bootstrap	
Backend - Node.js, Express.js
Database - SQLite3



📂 Folder Structure

project-root/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── components/
│   │   └── TaskList.jsx
│   └── App.js
├── README.md
└── package.json

🧪 API Endpoints
✅ Base URL: /api/tasks
Method	Endpoint	Description
GET	/	Get all tasks
POST	/	Create new task
GET	/:id	Get single task by ID
PUT	/:id	Update task by ID
DELETE	/:id	Delete task by ID
GET	/search?q=term	Search tasks by title

⚙️ Setup Instructions
Clone the Repository

bash
Copy
Edit
git clone https://github.com/your-username/task-manager.git
cd task-manager
Install Dependencies

For both backend and frontend:

bash
Copy
Edit
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
Run the App

bash
Copy
Edit
# Start backend server
cd backend
npm start

# Start frontend app
cd ../frontend
npm start
💡 Notes
Ensure ports do not conflict (e.g., React on 3000, backend on 5000)

SQLite DB is used locally; DB file auto-creates if missing

CORS is enabled in backend for frontend communication

🙌 Author
Made with ❤️ by Your Name

📃 License
MIT License © [Your Name]

