// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

// Express app set up
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("./Develop/public"));

// HTML routes
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "./Develop/public/index.html")));
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "./Develop/public/notes.html")));

// Putting the list of notes into a variable for easy access
let noteList = JSON.parse(fs.readFileSync('./Develop/db/db.json', 'utf8'));

// API routes

// Get route for reading json file and returning saved notes
app.get("/api/notes", (req, res) => {
    return res.json(noteList)
});

// Post route for receiving new notes, assigning each note an id, and pushes to the db
app.post("/api/notes", (req, res) => {
    let newNote = req.body;
    newNote.id =`${Date.now()}`;
    
    noteList.push(newNote);
    dbUpdate(noteList, res);
    return console.log("Added note: " + newNote);
});

// Delete route for removing notes
app.delete("/api/notes/:id", (req, res) => {
    let deleteSelection = req.params.id;
    let deleteIndex = noteList.indexOf(deleteSelection);
    noteList.splice(deleteIndex, 1);
    dbUpdate(deleteIndex, res);
});

// Function for updating json file whenever a change is made
function dbUpdate(arr, res) {
    fs.writeFile("./Develop/db/db.json", JSON.stringify(noteList), err => {
        if (err) {
            throw err;
        }
        console.log("Updated db!")
        console.log(noteList)
        res.send();
    });
}

// Server listener
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));