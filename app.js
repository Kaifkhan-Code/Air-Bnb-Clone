if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const flash = require("connect-flash");

const User = require("./models/User.js");
const ExpressError = require("./utils/ExpressError");
const listings = require("./routes/listing");
const reviews = require("./routes/review");
const userRoutes = require("./routes/user");

// ✅ MongoDB URL
const dbUrl = process.env.ATLASDB_URL;

// ✅ Connect to MongoDB
mongoose.connect(dbUrl)
  .then(() => console.log("✅ Connected to DB"))
  .catch(err => console.error("❌ DB Error:", err));

// ✅ EJS setup
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ✅ Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// ✅ TRUST PROXY (IMPORTANT for deployment)
app.set("trust proxy", 1);

// ✅ MongoDB session store
const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", (err) => {
  console.log("❌ ERROR in Mongo Session Store:", err);
});

// ✅ Session config
const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false, // 🔥 fixed
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // 🔥 important
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
};

app.use(session(sessionOptions));
app.use(flash());

// ✅ Passport config
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ✅ Global variables for templates
app.use((req, res, next) => {
  res.locals.currUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// ✅ Routes
app.use("/", userRoutes);
app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);

// ✅ Catch-all route
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});

app.use((err, req, res, next) => {
  console.log("🔥 ERROR:", err);   // 👈 IMPORTANT
  res.status(500).send(err.message); // 👈 SHOW ERROR IN BROWSER
});

// ✅ Server start (FIXED)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});