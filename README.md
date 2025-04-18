DevQuestions
DevQuestions is a developer forum designed to foster collaboration, question-sharing, and real-time communication. Built with a modern tech stack and deployed on Vercel, it offers a seamless experience for developers to engage with the community.
Table of Contents

Features
Tech Stack
Installation
Project Structure
Git Structure
Upcoming Features
Deployment
Contributing
License

Features

Home Page: A welcoming interface showcasing the forum's purpose and recent activity.
Navbar: Intuitive navigation for accessing key sections like Home, Login, and Register.
Authentication: Secure login and registration using NextAuth with support for Credentials, Google, and GitHub providers.
Developer Forum: A platform for posting questions, sharing answers, and engaging with the community.
Responsive UI: Built with Shadcn components for a polished and accessible user experience.

Tech Stack

Frontend: Next.js (App Router for server-side rendering and static site generation)
Backend: Next.js API routes with NextAuth for authentication
Database: MongoDB (NoSQL database for scalable data storage)
UI Components: Shadcn (Customizable and accessible UI library)
Styling: Tailwind CSS (Utility-first CSS framework)
Real-Time Communication: Socket.IO (Upcoming, for real-time chat)
Deployment: Vercel (Hosting and automatic scaling)

Installation
To set up the project locally:

Clone the repository:
git clone https://github.com/your-username/devquestions.git
cd devquestions


Install dependencies:
npm install


Set up environment variables: Create a .env.local file in the root directory with the following:
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000


Run the development server:
npm run dev

The application will be available at http://localhost:3000.

Build for production:
npm run build
npm run start



Project Structure
This project uses the Next.js App Router (app directory) for routing and server-side rendering.
devquestions/
├── app/                     # App Router directory
│   ├── api/                 # API routes (e.g., auth, user data)
│   ├── layout.js            # Root layout for the application
│   ├── page.js              # Home page
│   ├── login/page.js        # Login page
│   ├── register/page.js     # Register page
├── components/              # Reusable UI components (Shadcn and custom)
├── lib/                     # Utility functions (e.g., MongoDB connection)
├── public/                  # Static assets (images, favicon, etc.)
├── styles/                  # Global styles and Tailwind CSS configuration
├── .env.local               # Environment variables
├── jsconfig.json            # Path alias configuration (e.g., @/)
├── next.config.js           # Next.js configuration
├── package.json             # Project dependencies and scripts

Git Structure
The project follows a Git branching strategy to ensure organized collaboration and maintainable code. Below is the Git workflow and branch structure:
Branch Structure

main: The production-ready branch containing stable code deployed to https://dev-ques2.vercel.app/. Only merged after thorough review and testing.
dev: The development branch for integrating features and bug fixes. Acts as a staging area before merging to main.
Feature Branches: Named feature/<feature-name> (e.g., feature/socketio-chat), created for specific features like real-time chat or search functionality.
Bugfix Branches: Named bugfix/<issue-description> (e.g., bugfix/auth-error), used for fixing specific bugs.
Hotfix Branches: Named hotfix/<issue-description> (e.g., hotfix/login-failure), created for urgent fixes to main.

Git Workflow

Clone the Repository:
git clone https://github.com/your-username/devquestions.git
cd devquestions


Create a Feature Branch:
git checkout dev
git pull origin dev
git checkout -b feature/your-feature

Example: git checkout -b feature/socketio-chat

Make Changes and Commit:
git add .
git commit -m "Add socket.io real-time chat implementation"


Push to Remote:
git push origin feature/your-feature


Create a Pull Request (PR):

Open a PR on GitHub from feature/your-feature to dev.
Describe the changes, link to relevant issues, and request reviews from team members.
Ensure tests pass and code adheres to standards.


Merge to dev:

After approval, merge the PR into dev via GitHub.
Delete the feature branch to keep the repository clean.


Merge to main:

Periodically create a PR from dev to main after testing.
Deploy the updated main branch to Vercel.


Hotfixes:

For urgent issues, create a hotfix/ branch from main:git checkout main
git checkout -b hotfix/login-failure


Push, create a PR, and merge to both main and dev.



Best Practices

Commit Messages: Use clear, descriptive messages (e.g., "Fix MongoDB connection error in dbConnect").
Pull Requests: Include a description of changes, testing steps, and screenshots if applicable.
Branch Naming: Follow the convention (feature/, bugfix/, hotfix/) for clarity.
Team Collaboration: Assign reviewers and resolve comments before merging.

Upcoming Features

Real-Time Chat: Integrate Socket.IO for instant messaging between users.
Question Voting: Enable upvoting/downvoting for questions and answers.
User Profiles: Display user activity, reputation, and badges.
Search Bar: Allow searching questions by keywords or tags.

Deployment
The project is live at https://dev-ques2.vercel.app/.
To deploy on Vercel:

Push your code to a GitHub repository.
Connect the repository to Vercel via the Vercel dashboard.
Configure environment variables in Vercel:
MONGODB_URI
NEXTAUTH_SECRET
NEXTAUTH_URL=https://dev-ques2.vercel.app


Deploy the project. Vercel will handle the build and deployment automatically.

Note: Ensure the app/page.js file exists for the root route to avoid 404 errors, and verify that NEXTAUTH_URL matches the production domain.
Contributing
Contributions are welcome! To contribute:

Fork the repository.
Follow the Git Workflow to create a feature or bugfix branch.
Make your changes and commit with descriptive messages.
Push to your branch and open a pull request to dev.
Ensure your code follows the project's coding standards and includes tests.

License
This project is licensed under the MIT License. See the LICENSE file for details.
