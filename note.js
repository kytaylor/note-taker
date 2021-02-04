// Dependencies
const express = require("express");
const path = require("path");

// Express app set up
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("./Develop/public"));

// HTML routes
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "./Develop/public/index.html")))
app.get("/home", (req, res) => res.sendFile(path.join(__dirname, "./Develop/public/index.html")))
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "./Develop/public/notes.html")))

// Server listener
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));