// Dependencies
// ===========================================================
var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

// set up the express app to handle data parsing
app.use(express.urlencoded({ extend: true }));
app.use(express.json());

// Data
// ===========================================================
const characters = [
  {
    routeName: "yoda",
    name: "Yoda",
    role: "Jedi Master",
    age: 900,
    c: 2000
  },
  {
    routeName: "darthmaul",
    name: "Darth Maul",
    role: "Sith Lord",
    age: 200,
    forcePoints: 1200
  }
];
// Routes
// ===========================================================
// general route
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, 'view.html'))
});

app.get("/add", function(req, res) {
  res.sendFile(path.join(__dirname, 'add.html'))
});

// get all the dataz
app.get('/api/characters', (req, res) => {
  return res.json(characters);
});
// get one object from dataz
app.get('/api/characters/:character', (req, res) => {
  const chosen = req.params.character;
  /* find object in db based on routeName */
  const chosenOne = characters.filter(obj => {
    return obj.routeName === chosen;
  });
  if (chosenOne.length) {
    return res.json(chosenOne[0]);
  }
  return res.send('character, i do not see.');
});
// add an object to the dataz
app.post('/api/characters', (req, res) => {
  const newCharacter = req.body;
  newCharacter.routeName = newCharacter.name.replace(/\s+/g,'').toLowerCase();

  characters.push(newCharacter)
  res.json(newCharacter)
});
// Listener
// ===========================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});