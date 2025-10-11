const User = require("../models/User.js");

// Render signup form
module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

// Render login form
module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

// Handle signup
module.exports.signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "🎉 Welcome to WanderLust!");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

// Handle login
module.exports.login = (req, res) => {
  req.flash("success", "👋 Welcome back to WanderLust!");
  const redirectUrl = res.locals.redirectUrl || "/listings";
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

// Handle logout
module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success", "👋 You are logged out!");
    res.redirect("/listings");
  });
};
