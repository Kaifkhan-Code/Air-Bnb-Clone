const Listing = require("../models/listing");
const Review = require("../models/review");
const ExpressError = require("../utils/ExpressError");

// CREATE Review
module.exports.createReview = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id);
  if (!listing) throw new ExpressError(404, "Listing not found");

  const review = new Review(req.body.review);
  review.author = req.user._id; 
  await review.save();

  listing.reviews.push(review._id); 
  await listing.save();

  req.flash("success", "✅ Review added successfully!");
  res.redirect(`/listings/${id}`);
};

// DELETE Review
module.exports.deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;

  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

  
  await Review.findByIdAndDelete(reviewId);

  req.flash("success", "🗑️ Review deleted successfully!");
  res.redirect(`/listings/${id}`);
};
