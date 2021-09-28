const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require('cors'); 

const router = express.Router();

const app = express();

const port = 4000;

const seedUser = {
  userName: "test",
  password: "test",
  token: "ABCDEFGHIJKLMNOPQRSTUVWXYZabc",
};

const filePath = __dirname + "/db/db.json";

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());
app.use(express.json());
app.use(cors()); 
const validateUser = (req, res, next) => {
  if (req.headers["authorization"] === `Bearer ${seedUser.token}`) {
    next();
  } else {
    return res.status(401).json({ err: "Unauthorized" });
  }
};

//controller
const getNotesForUser = (req, res) => {
  getAllNotes((err, notes) => {
    if (err) return res.status(500).json({ err: "Unexpected error occured" });
    else return res.status(200).json(notes);
  });
};

const saveUserNote = (req, res) => {
  const notes = req.body;
  writeNotes(notes, (err, notes) => {
    if (err) return res.status(500).json({ err: "Unexpected error occured" });
    else {
      return res.status(200).json(notes);
    }
  });
};

const updateUserNote = (req, res) => {
  const notes = req.body;
  updateNotes(notes, (err, notes) => {
    if (err) return res.status(500).json({ err: "Unexpected error occured" });
    else return res.status(200).json(notes);
  });
};

const deleteUserNote = (req, res) => {
  const notes = req.params.id;
  deleteNotes(notes, (err, notes) => {
    if (err) return res.status(500).json({ err: "Unexpected error occured" });
    else return res.status(200).json(notes);
  });
};

//services

const writeNotes = (note, cb) => {
  const data = fs.readFileSync(filePath, { encoding: "utf8", flag: "r" });
  try {
    let { notes } = JSON.parse(data);
    notes.unshift(note);
    fs.writeFileSync(filePath, JSON.stringify({ notes }));
    cb(null, note);
  } catch (e) {
    cb(e, null);
  }
};

const updateNotes = (note, cb) => {
  const data = fs.readFileSync(filePath, { encoding: "utf8", flag: "r" });
  try {
    let { notes } = JSON.parse(data);
    notes[notes.map((note) => note.id).indexOf(note.id)] = note;
    fs.writeFileSync(filePath, JSON.stringify({ notes }));
    cb(null, note); 
  } catch (e) {
    cb(e, null);
  }
};

const deleteNotes = (note, cb) => {
  const data = fs.readFileSync(filePath, { encoding: "utf8", flag: "r" });
  try {
    let { notes } = JSON.parse(data);
    let index = [notes.map((note) => note.id).indexOf(parseInt(note))];
    notes.splice(index, 1);
    fs.writeFileSync(filePath, JSON.stringify({ notes }));
    cb(null, note); 
  } catch (e) {
    cb(e, null);
  }
};

const getAllNotes = (cb) => {
  const data = fs.readFileSync(filePath, { encoding: "utf8", flag: "r" });
  try {
    let { notes } = JSON.parse(data);
    cb(null, notes);
  } catch (e) {
    cb(e, null);
  }
};

app.get("/", (req, res) => {
  return res.sendFile(path.join(__dirname, "public/index.html"));
});

app.post("/auth", (req, res) => {
  const { userName, password } = req.body;
  if (userName === seedUser.userName && password === seedUser.password) {
    return res
      .status(200)
      .json({ token: seedUser.token, userInfo: seedUser.userName });
  } else {
    return res.status(401).json({ err: "Wrong Username and Password" });
  }
});

app.get('/me', (req, res) => {
    if(req.headers["authorization"] === `Bearer ${seedUser.token}`){
        return res.status(200).json({token: seedUser.token, userInfo: seedUser.userName}); 
    } else {
        return res.status(401).json({message: 'Unauthorized'})
    }
}); 

//routes;
app.get("/api/notes", validateUser, getNotesForUser);
app.post("/api/notes", validateUser, saveUserNote);
app.put("/api/notes", validateUser, updateUserNote);
app.delete("/api/notes/:id", validateUser, deleteUserNote);

app.get("**", (req, res) => {
  return res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(port, () => console.log("Server starting on port " + port));
