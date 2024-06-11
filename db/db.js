const Mongoose = require("mongoose");
const url = process.env.DBURL;
console.log(url,"url");
const db = Mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB...");
  })
  .catch((err) => {
    console.log("Could not connect to MongoDB...");
    process.exit();
  });

module.exports = db;