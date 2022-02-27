let word = []
let guessOne = []
let found = []

let userPoints = 0;

let g1 = ['', '', '', '', '']
let g2 = ['', '', '', '', '']
let g3 = ['', '', '', '', '']
let g4 = ['', '', '', '', '']
let g5 = ['', '', '', '', '']
let g6 = ['', '', '', '', '']

let userDetails = {
    name: '',
    email: ''
}

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

const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const oneDay = 1000 * 60 * 60 * 24;

var session;

app.set('trust proxy', 1)
// app.use(sessions({
//     secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
//     saveUninitialized: false,
//     resave: false,
//     // cookie: { maxAge: oneDay },
//     resave: false
// }));

app.use(sessions({
    resave: false,
    saveUninitialized: true,
    secret: 'your secret text',
    cookie: {
      secure: (process.env.NODE_ENV && process.env.NODE_ENV == 'production') ? true:false
    }
  }))

// app.use(sessions);

app.use(cookieParser());

let init = false;
const port = process.env.PORT || 3000;
const { MongoClient } = require('mongodb');

async function main(user, process) {

    const uri = "mongodb+srv://jxhzxn:test1234@wordle.efu4i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    try {
        await client.connect();
        if (process === 'register') {
            return await registerUser(client, user);
        }else if(process === 'get'){
            return await getUserDetails(client, user);
        }else if(process === 'update'){
            await updateScore(client, 10)
        }
        return await loginUser(client, user);
    } catch (e) {
        console.log(e)
        console.error(e);
    } finally {
        await client.close();
    }
}

app.get("/", async (req, res) => {

    session = req.session;

    if (req.session.userEmail) {
        // console.log('already logged. LOGGED IN USER - ', session.userEmail)
        res.redirect('/play')
    } else {
        res.render('login.ejs', { g1: g1, g2: g2, g3: g3, g4: g4, g5: g5, g6: g6, color: color, attempts: 6, correct: correct, status: status, answer: gen_word })
    }
});

app.get("/play", async (req, res) => {

    console.log('LOGGED IN USER - ', session.userEmail)
    const email = session.userEmail;
    reset();
    const rand = Math.floor(Math.random() * 213)
    gen_word = word_list[rand].toUpperCase()
    for (var i = 0; i < 5; i++) {
        word.push(gen_word[i])
    }
    console.log("WORD - ", gen_word)
  
    const user = {
        name : session.name,
        email : session.email
    }
    res.render('index.ejs', { g1: g1, g2: g2, g3: g3, g4: g4, g5: g5, g6: g6, color: color, attempts: 6, correct: correct, status: status, answer: gen_word, user: user })
});

app.post("/login", async (req, res) => {

    session = req.session;
    session.userEmail = req.body.email

    const user = {
        email: session.userEmail
    }

    if (user.email.length > 0) {
        const test = await main(user, 'check').catch(console.error);

        console.log(test)

        // console.log(user.name," Started Playing")

        const code = req.body.code;

        if (test == 0) {
            res.render('register.ejs', { g1: g1, g2: g2, g3: g3, g4: g4, g5: g5, g6: g6, color: color, attempts: 6, correct: correct, status: status, answer: gen_word })
        } else {
            console.log('userrrrr - ', test)
            session.email = test.email;
            session.name = test.name;

            const user = {
                name : session.name,
                email : session.email
            }
            res.redirect('/play')
            // res.render('index.ejs', { g1: g1, g2: g2, g3: g3, g4: g4, g5: g5, g6: g6, color: color, attempts: 6, correct: correct, status: status, answer: gen_word, user: user })
        }

    } else {
        res.render('login.ejs', { g1: g1, g2: g2, g3: g3, g4: g4, g5: g5, g6: g6, color: color, attempts: 6, correct: correct, status: status, answer: gen_word })
    }



});

app.post("/register", async (req, res) => {
    const user = {
        name: req.body.name,
        email: req.body.email
    }

    if (user.name.length > 0 && user.email.length > 0) {
        const test = await main(user, 'register').catch(console.error);

        console.log(test)

        if (test == 1) {
            const user = {
                name : session.name,
                email : session.email
            }
            res.render('index.ejs', { g1: g1, g2: g2, g3: g3, g4: g4, g5: g5, g6: g6, color: color, attempts: 6, correct: correct, status: status, answer: gen_word, user: user })
        } else {
            res.render('register.ejs', { g1: g1, g2: g2, g3: g3, g4: g4, g5: g5, g6: g6, color: color, attempts: 6, correct: correct, status: status, answer: gen_word })
        }
    } else {
        res.render('register.ejs', { g1: g1, g2: g2, g3: g3, g4: g4, g5: g5, g6: g6, color: color, attempts: 6, correct: correct, status: status, answer: gen_word })
    }
});

app.get("/wordle", async (req, res) => {

    const guess = req.query.guess;

    if (attempts >= 6) {
        // console.log("NO MORE ATTEMPTS")
    } else if (guess != undefined) {
        if (guess.length == 5) {
            start(guess.toUpperCase());
            const attempts_left = 6 - attempts
            if (attempts_left == 0 && correct < 5) {
                status = 0;
            }

            calculatePoints();

            res.send({ g1: g1, g2: g2, g3: g3, g4: g4, g5: g5, g6: g6, color: color, correct: correct, answer: gen_word, status: status })
            correct = 0;
        }
    }
});

app.get("/update", async (req, res) => {
    console.log('update score')
    await main('user', 'update').catch(console.error);
});

function calculatePoints() {
    if (correct == 5) {
        userPoints += 5;
    }
    console.log("POINTS - ", userPoints)
}

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





async function loginUser(client, user) {

    let userFound = false;
    const cursor = await client.db("Wordle-DB").collection("users").findOne({ email: session.userEmail });

    if (cursor) {
        userFound = true;
    }

    // const results = await cursor.toArray();

    if (userFound) {
        console.log("USER FOUND")
        session.userName = cursor.name;
        userDetails.name = session.userName;
        userDetails.email = cursor.email;
        return cursor;
    } else {
        return 0;
    }
};

async function registerUser(client, user) {

    console.log("NEW USER - Added to the DB")
    session.name = user.name,
    session.email = user.email
    await client.db("Wordle-DB").collection("users").insertOne(user);
    return 1;

};

async function updateScore(client, score) {

    const cursor = await client.db("Wordle-DB").collection("users").findOne({ email: session.userEmail });
    var query = { email: session.userEmail };
    if(cursor.score){
        var values = { $set: {score: cursor.score + score} };
    }else{
        var values = { $set: {score: score} };
    }
    
    await client.db("Wordle-DB").collection("users").updateOne(query, values);

};

async function getUserDetails(client, userEmail){
    const cursor = await client.db("Wordle-DB").collection("users").findOne({email : userEmail});
    return cursor;
}

function reset() {
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