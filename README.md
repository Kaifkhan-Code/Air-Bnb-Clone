# 🌍 **WanderLust**

**WanderLust** is a full-stack web application inspired by **Airbnb**, allowing users to **create, edit, view, and delete travel listings**.  
Each listing includes a **title, price, description, location, category**, and optional **images** — all managed through a clean and responsive interface.

---

## ✨ **Features**

- 🏠 **Add New Listings** – Create listings with title, description, price, and location.  
- ✏️ **Edit & Update** – Modify details or upload new images.  
- ❌ **Delete Listings** – Remove listings instantly.  
- 💾 **Persistent Storage** – Data stored securely in **MongoDB Atlas**.  
- 🧾 **User Authentication** – Register & login using **Passport.js (LocalStrategy)**.  
- 🖼️ **Image Uploads** – Integrated with **Cloudinary** for image hosting.  
- 🔐 **Session Management** – Uses **express-session** + **connect-mongo** for secure sessions.  
- 💬 **Flash Messages** – Real-time feedback for success or errors.  
- 🌗 **Environment Config** – Secure `.env` setup for credentials.  
- 🧩 **Clean Architecture** – Modular routes and utilities for scalability.  

> 🗺️ **Note:** Google Maps integration not yet added — can be included later for dynamic location display.

---

## 🛠️ **Tech Stack**

### 🎨 Frontend
- HTML5  
- CSS3  
- Bootstrap  
- EJS (Embedded JavaScript Templates)

### ⚙️ Backend
- Node.js  
- Express.js

### 🗄️ Database
- MongoDB Atlas (via Mongoose)

### 🔐 Authentication
- Passport.js (Local Strategy)

### ☁️ Image Hosting
- Cloudinary API

### 💾 Session Handling
- express-session  
- connect-mongo

---

## 📁 **Project Structure**

WanderLust/
├── models/             # Mongoose schemas for Listings and Users
│   └── listing.js
│   └── user.js
│
├── routes/             # Route handlers
│   └── listings.js
│   └── users.js
│   └── index.js
│
├── views/              # EJS templates
│   ├── listings/
│   ├── users/
│   ├── partials/
│   └── layout.ejs
│
├── public/             # Static files
│   ├── css/
│   ├── js/
│   └── images/
│
├── middleware/         # Custom middleware functions
│   └── index.js
│
├── utils/              # Utility functions (e.g., ExpressError, catchAsync)
│   └── ExpressError.js
│   └── catchAsync.js
│
├── config/             # Config files (Cloudinary, Mongoose, etc.)
│   └── cloudinary.js
│   └── mongoose.js
│
├── .env                # Environment variables
├── .gitignore
├── package.json
├── server.js           # Entry point
