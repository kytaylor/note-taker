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

fs.readFile("./Develop/db/db.json", "utf8", (err, data) => {
    if (err) {
        // console.error("Error in Read FIle: ", err);
        throw err;
    }

    let noteList = JSON.parse(data)

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
        dbUpdate();
        return console.log("Added note: " + newNote);
    })

    // Function for updating json file whenever a change is made
    function dbUpdate() {
        fs.writeFile("./Develop/db/db.json", JSON.stringify(noteList), err => {
            if (err) {
                throw err;
            }
            console.log("Updated db!")
            console.log(noteList)
        });
    }
})

// Server listener
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));