const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path")
const PORT = process.env.PORT || 3000;
const db = require("./models/");

const app = express()

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

//Routes go here

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "public/exercise.html"));
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "public/stats.html"));
});




 //get
 app.get("/api/workouts", function (req, res) {
    db.Workout.find({})
    .then(dbWorkout => {
        console.log(dbWorkout)
        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    });
});


//put
app.put("/api/workouts/:id", function (req, res) {
    db.Workout.findByIdAndUpdate(req.params.id, {$push: {exercises: req.body}}) 
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

//post //addbutton //
app.post("/api/workouts", function (req, res) {
    db.Workout.create(req.body)
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    });
});



//get
app.get("/api/workouts/range", function (req, res) {
    db.Workout.find({})
    .populate("workouts")
    .then(dbWorkout => {
        res.send(dbWorkout);
    })
    .catch(err => {
        res.send(err);
    });
    
});




//Start server
app.listen(PORT, () => {
    console.log(`App running on port localhost:${PORT}`);
});