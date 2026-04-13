const Listing = require("../models/listing");
const mongoose = require("mongoose");
const cloudinary = require("../cloudConfig");

// INDEX
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

  res.render("listings/index.ejs", {
    allListings,
    searchQuery: search || "",
    selectedCategory: category || "All",
  });
};

// NEW FORM
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

// CREATE
module.exports.create = async (req, res) => {
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;

  if (req.file) {
    const uploadToCloudinary = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "wanderlust_DEV" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        stream.end(req.file.buffer);
      });
    };

    const result = await uploadToCloudinary();

    newListing.image = {
      url: result.secure_url,
      filename: result.public_id,
    };
  }

  await newListing.save();
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

// SHOW
module.exports.show = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    req.flash("error", "Invalid listing ID");
    return res.redirect("/listings");
  }

  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  res.render("listings/show.ejs", { listing });
};

// EDIT FORM
module.exports.editForm = async (req, res) => {
  res.render("listings/edit.ejs", { listing: req.listing });
};

// UPDATE
module.exports.update = async (req, res) => {
  const { id } = req.params;

  let listing = await Listing.findByIdAndUpdate(id, {
    ...req.body.listing,
  });

  if (req.file) {
    const uploadToCloudinary = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "wanderlust_DEV" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        stream.end(req.file.buffer);
      });
    };

    const result = await uploadToCloudinary();

    listing.image = {
      url: result.secure_url,
      filename: result.public_id,
    };

    await listing.save();
  }

  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

// DELETE
module.exports.delete = async (req, res) => {
  await Listing.findByIdAndDelete(req.params.id);
  req.flash("success", "Listing Deleted Successfully!");
  res.redirect("/listings");
};