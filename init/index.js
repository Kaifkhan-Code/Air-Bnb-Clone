const mongoose = require("mongoose");
const Listing = require("../models/listing");
const initData = require("./data"); 

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function initDB() {
  await mongoose.connect(MONGO_URL);
  console.log("✅ Connected to DB");

  await Listing.deleteMany({});
  const listingsWithOwner = initData.data.map(obj => ({
    ...obj,
    owner: "68e521b706027b0c60dac391"
  }));

  await Listing.insertMany(listingsWithOwner);
  console.log("✅ Data initialized");

  mongoose.connection.close();
}

initDB().catch(err => console.error("❌ Seed error:", err));
