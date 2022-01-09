const express = require("express");

const app = express();

const dbConfig = require("./db");
const roomsRoute = require("./routes/roomsRoute");

//access to rooms route
app.use("/api/rooms", roomsRoute);

const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
