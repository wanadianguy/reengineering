const express = require("express");
const app = express();
const mongoose = require("mongoose");
const IndexRouter = require("./routers/index");

mongoose.connect("mongodb://localhost:27017/delivecrous")
    .then(() => console.log('Database connected'))
    .catch(() => console.log('Database not found'));

app.use(express.json());
app.use("/api", IndexRouter);

app.listen(process.env.PORT || "3000", () => {
    console.log("Server started on port 3000");
});