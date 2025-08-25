const mongoose = require("mongoose");

const connectMongoDb = async (url) => {
  mongoose
    .connect(url)
    .then(() => console.log("Connected"))
    .catch((err) => console.log("Error: " + err));
};

module.exports = connectMongoDb;
