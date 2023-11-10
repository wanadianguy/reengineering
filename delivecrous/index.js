const express = require("express");
const app = express();
const mongoose = require("mongoose");
const IndexRouter = require("./routers/index");

mongoose.connect("mongodb://localhost:27017/delivecrous");

app.use(express.json());
app.use("/api", IndexRouter);

app.listen(process.env.PORT || "3000", () => {
    console.log("Le serveur est à l’écoute sur le port 3000");
});