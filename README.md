DevQuestions 🧠💬
DevQuestions is a modern forum platform built specifically for developers to ask questions, share knowledge, and engage in real-time discussions. Think of it as Stack Overflow meets modern web tech.

🚀 Tech Stack
Framework: Next.js (App Router)

Database: MongoDB

UI Components: Shadcn UI

Authentication: NextAuth.js

Real-time Communication (Upcoming): Socket.io

✅ Features (Completed)
🔐 User Authentication

Login & Register with custom validation using React Hook Form

🏠 Homepage

Clean and intuitive landing interface

🧭 Navigation Bar

Dynamic navigation based on user session

🔜 Upcoming Features
💬 Real-time Chat using Socket.io

🧵 Question & Answer Threads

❤️ Like / Dislike System

💭 Commenting on Questions

🧑‍💻 User Profiles and Activity

🔍 Search and Filter for Questions

🛡️ Account Lockout & Recovery

📁 Project Structure (Basic Overview)
bash
Copy
Edit
/app
  /api         - API Routes (Auth, Questions, Comments)
  /components  - Reusable UI Components (Navbar, Forms, etc.)
  /pages       - Page Views (Home, Login, Register)
  /lib         - Helpers (e.g. MongoDB client)
  /models      - Mongoose Schemas
  /utils       - Utility Functions
/public
/styles
🛠️ Getting Started (Local Setup)
Clone the repo

bash
Copy
Edit
git clone https://github.com/your-username/devquestions.git
cd devquestions
Install dependencies

bash
Copy
Edit
npm install
Configure Environment Variables

Create a .env.local file and add the following:

env
Copy
Edit
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
Run the app

bash
Copy
Edit
npm run dev
📸 Screenshots (Optional)
Add screenshots of your UI here.

🤝 Contributing
Pull requests are welcome! If you have suggestions for improvements or want to help implement features, feel free to fork the project and open a PR.