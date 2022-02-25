let word = []
let guessOne = []
let found = []

let g1 = ['', '', '', '', '']
let g2 = ['', '', '', '', '']
let g3 = ['', '', '', '', '']
let g4 = ['', '', '', '', '']
let g5 = ['', '', '', '', '']
let g6 = ['', '', '', '', '']

const word_list = [
    "Adult",
    "Adult",
    "Adult",
    "Adult",
    "Adult",
    "Adult",
    "Agent",
    "Anger",
    "Apple",
    "Award",
    "Basis",
    "Beach",
    "Birth",
    "Block",
    "Blood",
    "Board",
    "Brain",
    "Bread",
    "Break",
    "Brown",
    "Buyer",
    "Cause",
    "Chain",
    "Chair",
    "Chest",
    "Chief",
    "Child",
    "China",
    "Claim",
    "Class",
    "Clock",
    "Coach",
    "Coast",
    "Court",
    "Cover",
    "Cream",
    "Crime",
    "Cross",
    "Crowd",
    "Crown",
    "Cycle",
    "Dance",
    "Death",
    "Depth",
    "Doubt",
    "Draft",
    "Drama",
    "Dream",
    "Dress",
    "Drink",
    "Drive",
    "Earth",
    "Enemy",
    "Entry",
    "Error",
    "Event",
    "Faith",
    "Fault",
    "Field",
    "Fight",
    "Final",
    "Floor",
    "Focus",
    "Force",
    "Frame",
    "Frank",
    "Front",
    "Fruit",
    "Glass",
    "Grant",
    "Grass",
    "Green",
    "Group",
    "Guide",
    "Heart",
    "Henry",
    "Horse",
    "Hotel",
    "House",
    "Image",
    "Index",
    "Input",
    "Issue",
    "Japan",
    "Jones",
    "Judge",
    "Knife",
    "Laura",
    "Layer",
    "Level",
    "Lewis",
    "Light",
    "Limit",
    "Lunch",
    "Major",
    "March",
    "Match",
    "Metal",
    "Model",
    "Money",
    "Month",
    "Motor",
    "Mouth",
    "Music",
    "Night",
    "Noise",
    "North",
    "Novel",
    "Nurse",
    "Offer",
    "Order",
    "Other",
    "Owner",
    "Panel",
    "Paper",
    "Party",
    "Peace",
    "Peter",
    "Phase",
    "Phone",
    "Piece",
    "Pilot",
    "Pitch",
    "Place",
    "Plane",
    "Plant",
    "Plate",
    "Point",
    "Pound",
    "Power",
    "Press",
    "Price",
    "Pride",
    "Prize",
    "Proof",
    "Queen",
    "Radio",
    "Range",
    "Ratio",
    "Reply",
    "Right",
    "River",
    "Round",
    "Route",
    "Rugby",
    "Scale",
    "Scene",
    "Scope",
    "Score",
    "Sense",
    "Shape",
    "Share",
    "Sheep",
    "Sheet",
    "Shift",
    "Shirt",
    "Shock",
    "Sight",
    "Simon",
    "Skill",
    "Sleep",
    "Smile",
    "Smith",
    "Smoke",
    "Sound",
    "South",
    "Space",
    "Speed",
    "Spite",
    "Sport",
    "Squad",
    "Staff",
    "Stage",
    "Start",
    "State",
    "Steam",
    "Steel",
    "Stock",
    "Stone",
    "Store",
    "Study",
    "Stuff",
    "Style",
    "Sugar",
    "Table",
    "Taste",
    "Terry",
    "Theme",
    "Thing",
    "Title",
    "Total",
    "Touch",
    "Tower",
    "Track",
    "Trade",
    "Train",
    "Trend",
    "Trial",
    "Trust",
    "Truth",
    "Uncle",
    "Union",
    "Unity",
    "Value",
    "Video",
    "Visit",
    "Voice",
    "Waste",
    "Watch",
    "Water",
    "While",
    "White",
    "Whole",
    "Woman",
    "World",
    "Youth"
]

let color = []
let attempts = 0;
let correct = 0;
let status = 1;
let gen_word;

// const chalk = require('chalk');
// var randomWords = require('random-words');
const express = require("express");
const router = express.Router();
const app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
let init = false;
const port = process.env.PORT || 3000;

app.get("/", async (req, res) => {
    reset();
    const rand = Math.floor(Math.random() * 217)
    gen_word = word_list[rand].toUpperCase()
    for(var i=0; i<5; i++){
        word.push(gen_word[i])
    }
    console.log("WORD - ", gen_word)
    res.render('login.ejs', { g1: g1, g2: g2, g3: g3, g4: g4, g5: g5, g6: g6, color: color, attempts: 6, correct : correct , status : status, answer : gen_word})
});

app.post("/login", async (req, res) => {

    const code = req.body.code;

    if(code == 99){
        res.render('index.ejs', { g1: g1, g2: g2, g3: g3, g4: g4, g5: g5, g6: g6, color: color, attempts: 6, correct : correct , status : status, answer : gen_word})
    }else{
        res.render('login.ejs', { g1: g1, g2: g2, g3: g3, g4: g4, g5: g5, g6: g6, color: color, attempts: 6, correct : correct , status : status, answer : gen_word})
    }
    
});

app.post("/wordle", async (req, res) => {
    if(attempts>=6){
        console.log("NO MORE ATTEMPTS")
    }else{
        if(req.body.guess.length == 5){
            start(req.body.guess.toUpperCase());
        const attempts_left = 6-attempts
        if(attempts_left == 0 && correct<5){
            status = 0;
        }
        res.render('index.ejs', { g1: g1, g2: g2, g3: g3, g4: g4, g5: g5, g6: g6, color: color, attempts: attempts_left, correct : correct , status : status, answer : gen_word  })
        correct = 0;
        }
    }
});

function start(guessedWord) {
    attempts += 1;
    if (g1[0] === '') {
        g1 = [];
        for (var i = 0; i < guessedWord.length; i++) {
            g1.push(guessedWord[i])
        }
    } else if (g2[0] === '') {
        g2 = [];
        for (var i = 0; i < guessedWord.length; i++) {
            g2.push(guessedWord[i])
        }
    } else if (g3[0] === '') {
        g3 = [];
        for (var i = 0; i < guessedWord.length; i++) {
            g3.push(guessedWord[i])
        }
    } else if (g4[0] === '') {
        g4 = [];
        for (var i = 0; i < guessedWord.length; i++) {
            g4.push(guessedWord[i])
        }
    } else if (g5[0] === '') {
        g5 = [];
        for (var i = 0; i < guessedWord.length; i++) {
            g5.push(guessedWord[i])
        }
    } else if (g6[0] === '') {
        g6 = [];
        for (var i = 0; i < guessedWord.length; i++) {
            g6.push(guessedWord[i])
        }
    }

    for (var i = 0; i < guessedWord.length; i++) {
        guessOne.push(guessedWord[i])
    }

    for (var i = 0; i < guessOne.length; i++) {
        if (word[i] === guessOne[i]) {
            found.push(word[i])
        } else {
            found.push('-')
        }
    }

    for (var i = 0; i < found.length; i++) {
        if (found[i] === word[i]) {
            // process.stdout.write(chalk.green.inverse(guessOne[i]))
            correct += 1;
            color.push('#2FDD92')
        } else {
            for (var x = 0; x < found.length; x++) {
                if (guessOne[i] === word[x]) {
                    init = true;
                }
            }
            if (init) {
                color.push('#FBD148')
            } else {
                color.push('')
            }
        }
        init = false;
    }
    guessOne = [];
    found = [];

    console.log('')
}

function reset(){
    guessOne = [];
    found = [];
    attempts = 0;
    correct = 0;
    g1 = ['', '', '', '', '']
    g2 = ['', '', '', '', '']
    g3 = ['', '', '', '', '']
    g4 = ['', '', '', '', '']
    g5 = ['', '', '', '', '']
    g6 = ['', '', '', '', '']
    color = []
    word = []
    status = 1;
}

app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`);
});