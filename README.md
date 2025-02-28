# MindSnap 

MindSnap is a web-based application that allows users to save, organize, and share different types of content such as links, documents, videos, tweets, and more. It provides a seamless experience for users to keep track of their thoughts, ideas, and media in one place.

---

## Features

- **User Authentication:** Signup, Sign-in, and Logout functionality to create a personalized experience.
- **Content Management:** Add and store various types of content (Tweets, Videos, Documents, Links, Tags).
- **Filter and Search:** Easily filter content by type (Tweets, Videos, Links, etc.) and view your saved content.
- **Responsive UI:** A modern and user-friendly interface designed with React and Tailwind CSS.
- **Modal Integration:** Add content through a modal while keeping the background blurred for a seamless experience.
- **Logout Functionality:** Secure logout option to manage user sessions.

---

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express (with additional support for MongoDB)
- **Authentication:** JWT-based authentication (JSON Web Tokens)
- **Database:** MongoDB (NoSQL database)


---

## Installation & Setup

To run the project locally, follow the steps below:

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Git](https://git-scm.com/)

### Frontend Setup

1. Clone the repository:
   git clone https://github.com/sarafakash/MindSnap.git
   cd MindSnap/brainly-frontend
2. Install dependencies:
   npm install
3. Start the development server:
   npm run dev
   The frontend will be running at http://localhost:5173.

### Backend Setup

1. Navigate to the backend folder:
   cd ../mindsnap-backend
2. Install dependencies:
   npm install
3. Start the  server:
   npm run dev
   The backend server will be running at http://localhost:3000.

Contributing :

We welcome contributions to MindSnap! If you'd like to contribute, please follow these steps:
- Fork the repository.
- Create a new branch (git checkout -b feature-name).
- Make your changes and commit them (git commit -am 'Add new feature').
- Push to your branch (git push origin feature-name).
- Create a pull request.


Acknowledgements :

. React for building the UI
. Tailwind CSS for styling the application
. MongoDB for the database
. JWT for user authentication
