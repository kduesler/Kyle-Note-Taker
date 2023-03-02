const router = require("express").Router();
const { readFromFile, readAndAppend } = require("../helpers/fsUtils");
const notesData = require("../db/db.json");
const uuid = require("../helpers/uuid");

router.get("/notes", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

router.post("/notes", (req, res) => {
  const { title, text } = req.body;

  const newNote = {
    title,
    text,
    id: uuid(),
  };

  readAndAppend(newNote, "./db/db.json");
  res.json(`note added successfully 🚀`);
});

router.delete("/notes/:id", (req, res) => {
  const requestedID = req.params.id;

  if (requestedID) {
    for (let i = 0; i < notesData.length; i++) {
      if (requestedID === notesData[i].id) {
        return res.json(notesData[i]);
      }
    }
  }

  res.send("DELETE Request Called");
});

module.exports = router;
