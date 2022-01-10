const express = require("express");
const dbConfig = require("./db");
const roomsRoute = require("./routes/roomsRoute");
const usersRoute = require("./routes/usersRoute");
const bookingsRoute = require("./routes/bookingsRoute");
const app = express();

app.use(express.json());

//access to rooms route
app.use("/api/rooms", roomsRoute);
app.use("/api/users", usersRoute);
app.use("/api/bookings", bookingsRoute);

const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
