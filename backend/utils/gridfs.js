// gridfs.js
const mongoose = require("mongoose");
const grid = require("mongoose-gridfs");

// Ensure that your mongoose connection is established before calling this.
let gfs;
mongoose.connection.once("open", () => {
  gfs = grid({
    collection: 'uploads', // GridFS collection name
    model: 'File',         // Mongoose model name (you can choose any)
    mongoose: mongoose,
  });
  console.log("GridFS initialized using mongoose-gridfs");
});

module.exports = {
  getGFS: () => gfs,
};
