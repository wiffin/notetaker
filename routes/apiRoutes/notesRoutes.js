const router = require('express').Router();
const fs = require('fs');
const path = require('path');

router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../db/db.json'));
});

router.post('/notes', (req, res) => {
    let newNote = req.body;
    let noteList = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
    
    newNote.id = Math.floor(Math.random() * (999-100+1)+100);

    noteList.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
    res.json(noteList);
    console.log(noteList);
});

router.delete('/notes/:id', (req, res) => {
    let noteList = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
    let noteId = (req.params.id).toString();

    noteList = noteList.filter(selected => {
        return selected.id != noteId;
    });

    fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
    res.json(noteList);
    console.log(noteList);
});

module.exports = router;