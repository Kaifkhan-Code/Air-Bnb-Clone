const Listing = require("../models/listing");
const mongoose = require("mongoose");



module.exports.index = async (req, res) => {
  const { category, search } = req.query;
  let filter = {};

 
  if (category && category !== "All") {
    filter.category = { $regex: category, $options: "i" };
  }


  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { location: { $regex: search, $options: "i" } },
      { country: { $regex: search, $options: "i" } },
      { category: { $regex: search, $options: "i" } }
    ];
  }

  const allListings = await Listing.find(filter).populate("owner");
  res.render("listings/index.ejs", { allListings, searchQuery: search || "", selectedCategory: category || "All" });
};


module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.create = async (req, res) => {
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  if(req.file){
    newListing.image = { url: req.file.path, filename: req.file.filename };
  }
  await newListing.save();
  req.flash("success", "✅ New Listing Created Successfully!");
  res.redirect(`/listings/${newListing._id}`);
};

module.exports.show = async (req, res) => {
  const { id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    req.flash("error","❌ Invalid listing ID");
    return res.redirect("/listings");
  }
  const listing = await Listing.findById(id)
    .populate({ path:"reviews", populate:{path:"author"} })
    .populate("owner");
  if(!listing){
    req.flash("error","❌ Listing not found!");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

module.exports.editForm = async (req, res) => {
  res.render("listings/edit.ejs", { listing: req.listing });
};

module.exports.update = async (req,res) => {
  const { id } = req.params;
  const listing = await Listing.findByIdAndUpdate(id, req.body.listing, { new:true, runValidators:true });
  if(req.file){
    listing.image = { url:req.file.path, filename:req.file.filename };
    await listing.save();
  }
  req.flash("success","✅ Listing Updated Successfully!");
  res.redirect(`/listings/${id}`);
};

module.exports.delete = async (req,res) => {
  await Listing.findByIdAndDelete(req.params.id);
  req.flash("success","🗑️ Listing Deleted Successfully!");
  res.redirect("/listings");
};




