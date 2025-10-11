const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");

const listingSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  image: {
    filename: { type: String, default: "listingimage" },
    url: { type: String, required: true },
  },
  price: { type: Number, required: true },
  location: String,
  country: String,
  category: {
    type: String,
    enum: [
      "Trending", "Rooms", "Iconic Cities", "Mountains",
      "Castles", "Amazing Pools", "Camping", "Farms", "Arctic"
    ],
    default: "Trending",
  },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  showTotalAfterTax: { type: Boolean, default: false },
});

// Delete related reviews when listing deleted
listingSchema.post("findOneAndDelete", async function(listing){
  if(listing){
    await Review.deleteMany({_id: {$in: listing.reviews}});
  }
});

module.exports = mongoose.model("Listing", listingSchema);
