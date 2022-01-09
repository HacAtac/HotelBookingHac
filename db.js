//set up mongo db connection
const mongoose = require("mongoose");

const mongoURL =
  "mongodb+srv://HacAtac-admin:cLZVXaqDA7nuAuoa@cluster0.6ttdd.mongodb.net/mern-rooms";

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

connection.on("error", () => {
  console.log("DB connection error");
});

connection.on("connected", () => {
  console.log("DB connected");
});

module.exports = mongoose;
