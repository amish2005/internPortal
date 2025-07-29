# Intern Portal

A **MERN stack web platform** designed to simplify internship discovery, application tracking, and personalized profile building for students and professionals. The platform provides a **centralized portal for verified internships** and **scraped internships** from multiple sources with features like **one-click application, personalized profiles, skill-internship match percentage, and a real-time chat system** built using **WebSocket** for seamless communication between job seekers and recruiters.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## 🚀 Features

- **User Authentication**
  - Secure registration and login for job seekers (JWT-based).
  - Email verification using OTP implemented from scratch.

- **Responsive UI:** Mobile-friendly design using Tailwind CSS.

- **RESTful API:** Clean and scalable backend API.

- **Internship Listings**
  - **Scraping automation** from platforms like Internshala and Unstop.
  - **Company & Internship Details**
  - Detailed internship pages with descriptions, perks, and responsibilities.
  - Apply link and deadlines visible.

- **Interview Chat**
  - Real-time chat system using **WebSockets** for communication between job seekers and recruiters.
  - Typing indicators, read receipts, and instant updates for better user experience.


## Tech Stack

- **Frontend:** React, Tailwind CSS, Framer Motion (for animations) in TypeScript Environment
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Scraping:** Puppeteer (for platforms like Internshala & Unstop)
- **Authentication:** JWT (JSON Web Tokens)
- **Other:** Nodemailer (for emails), Mongoose (ODM), WebSockets(Socket.IO)

## Project Structure

```
job-portal/
├── server/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── scraper/
│   ├── uploads/
│   └── ...
├── client/
│   ├── client/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/
│   │   └── ...
│   └── ...
├── README.md
└── ...
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) & npm
- [MongoDB](https://www.mongodb.com/)

### Installation

Clone the repository:

```bash
git clone https://github.com/amish2005/intern-portal.git
cd intern-portal
```

Install backend dependencies:

```bash
cd server
npm install
```

Install frontend dependencies:

```bash
cd ../client
npm install
```

### Environment Variables

Create a `.env` file in the `server` directory with the following:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

## Usage

Start the backend server:

```bash
cd server
npm run dev
```

Start the frontend development server:

```bash
cd ../client
npm run dev
```

The frontend will run on [http://localhost:8080](http://localhost:8080) and the backend on [http://localhost:5000](http://localhost:5000) by default.

## 📖 Usage

- **Sign up / Log in** to create your profile.
- **Browse internships** (scraped).
- **Apply directly** through third-party links.

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

## 🧠 Lessons Learned
- Implementing a scalable MERN architecture.
- Web scraping dynamic content (e.g., Unstop with Puppeteer & persistent login).
- Creating a **user-friendly dashboard** with advanced filtering and animations.

---

## 📜 License
This project is licensed under the [MIT License](LICENSE).

---

## 👤 Author

**[Your Name]**  
- GitHub: [https://github.com/amish2005](https://github.com/amish2005)  
- LinkedIn: [https://linkedin.com/in/amish-342924321](https://linkedin.com/in/amish-342924321)  
