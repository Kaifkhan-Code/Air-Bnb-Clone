# Air-Bnb-Clone
🌍 WanderLust

WanderLust is a full-stack web application inspired by Airbnb, allowing users to create, edit, view, and delete travel listings.
Each listing includes a title, price, description, location, category, and optional images — all managed through a clean and responsive interface.

✨ Features

🏠 Add New Listings – Create new listings with title, description, price, and location.

✏️ Edit & Update – Modify listing details or upload a new image.

❌ Delete Listings – Remove listings instantly.

💾 Persistent Storage – All data stored securely in MongoDB Atlas.

🧾 User Authentication – Register and log in using Passport.js (LocalStrategy).

🖼️ Image Uploads – Integrated with Cloudinary for efficient image hosting.

🔐 Session Management – User sessions stored with MongoDB-backed session store.

💬 Flash Messages – Instant feedback for actions (success/error alerts).

🌗 Environment-based Configuration – Secure and flexible .env setup.

🧩 Clean Architecture – Organized structure with modular routes and utilities.

🗺️ Note: Google Maps integration is not included yet — can be added later to display listing locations dynamically.

🛠️ Tech Stack

Frontend

HTML5, CSS3, Bootstrap

EJS templating engine

Backend

Node.js, Express.js

Database

MongoDB Atlas (via Mongoose)

Authentication

Passport.js (Local Strategy)

Image Hosting

Cloudinary API

Session Handling

express-session

connect-mongo

📁 Project Structure
WanderLust/
│
├── app.js                 # Main server file
├── models/                # Database schemas (User, Listing, Review)
├── routes/                # Express route handlers
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── views/                 # EJS templates (frontend UI)
│   ├── listings/
│   └── layouts/
├── public/                # Static files (CSS, JS, images)
├── utils/                 # Custom utilities like ExpressError
├── .env                   # Environment variables
├── package.json
└── README.md

⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/your-username/WanderLust.git
cd WanderLust

2️⃣ Install dependencies
npm install

3️⃣ Set up environment variables

Create a .env file in the root directory:

ATLASDB_URL=your_mongodb_connection_url
SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret

4️⃣ Run the app
node app.js


or (for auto reload during development)

npx nodemon app.js

5️⃣ Open in browser
http://localhost:3000



🧠 Future Enhancements

🗺️ Integrate Google Maps API for location display

⭐ Add reviews and rating system

🧾 Booking feature for travelers

💬 Host–guest chat or inquiry section

🌐 Deploy on Render / Vercel / Railway
