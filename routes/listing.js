const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync");
const { validateListing, isLoggedIn, isOwner } = require("../middleware");
const listingController = require("../controllers/listing");

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() }); // ✅ FIX

router.route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"), // ✅ stays same
    validateListing,
    wrapAsync(listingController.create)
  );

router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
  .get(wrapAsync(listingController.show))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"), // ✅ stays same
    validateListing,
    wrapAsync(listingController.update)
  )
  .delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.delete)
  );

router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.editForm));

module.exports = router;