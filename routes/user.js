const express = require("express");
const router = express.Router();
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");

// SIGNUP routes
router
  .route("/signup")
  .get(userController.renderSignupForm)
  .post(userController.signup);

// LOGIN routes
router
  .route("/login")
  .get(userController.renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login
  );

// LOGOUT route
router.get("/logout", userController.logout);

module.exports = router;
