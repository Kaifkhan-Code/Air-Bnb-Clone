const mongoose = require("mongoose");
const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressError = require("./utils/ExpressError");
const { reviewSchema } = require("./schema"); 

const { listingSchema } = require("./schema");

module.exports.validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(", ");
    throw new ExpressError(400, msg);
  } else {
    next();
  }
};


module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(",");
    throw new ExpressError(400, msg);
  } else {
    next();
  }
};

// Ensure user is logged in
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "⚠️ You must be logged in to continue!");
    return res.redirect("/login");
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    req.flash("error", "❌ Invalid listing ID");
    return res.redirect("/listings");
  }
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "❌ Listing not found!");
    return res.redirect("/listings");
  }
  if (!listing.owner.equals(req.user._id)) {
    req.flash("error", "⚠️ You do not have permission to do that!");
    return res.redirect(`/listings/${id}`);
  }
  req.listing = listing; 
  next();
};


// Ownership check for reviews
module.exports.isReviewAuthor = async (req, res, next) => {
  const { reviewId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    req.flash("error", "❌ Invalid review ID");
    return res.redirect("back");
  }
  const review = await Review.findById(reviewId);
  if (!review) {
    req.flash("error", "❌ Review not found!");
    return res.redirect("back");
  }
  if (!review.author.equals(req.user._id)) {
    req.flash("error", "⚠️ You do not have permission to delete this review!");
    return res.redirect("back");
  }
  next();
};

// middleware.js
module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.returnTo) {
    res.locals.redirectUrl = req.session.returnTo;
  }
  next();
};
