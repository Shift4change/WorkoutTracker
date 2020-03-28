const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path")
const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });





//Routes go here
app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/exercise", (req,res) => {
    res.sendFile(path.join(__dirname, "public/exercise.html"));
});

app.get("/stats",(req,res) =>{
    res.sendFile(path.join(__dirname, "public/stats.html"))
});
//function for workout
app.get("/api/workouts",( req,res) => {
    db.Workout.find({},(err,data) =>{
        if(err){
            throw err;
        }
        
        res.json(data)
    })
})
// app.get("/api/workouts", (req, res) => {
//     console.log("get api/workouts")
//     db.Workout.find({})
        
//         .then(dbWorkout => {
    
//             let totalDuration = 0;
            
//             let newDbWorkout = dbWorkout.map(workout => {
//                 let workoutCopy = {};
//                 workoutCopy.day = workout.day;
//                 workoutCopy.exercises = workout.exercises;
//                 workout.exercises.map(exercise => {
//                     totalDuration += exercise.duration;
//                 });
//                 workoutCopy.totalDuration = totalDuration;
//                 console.log(workoutCopy)
//                 totalDuration = 0;
//                 return workoutCopy;
//             });
//             console.log(totalDuration);
//             console.log(newDbWorkout)
//             res.json(newDbWorkout);
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(400).json(err);
//         });
// });

//async addExercise function
//add exercise
app.post("/api/workouts",(req,res) =>{
    db.Workout.create(req.body, (err, data)=>{
        if (err){
            throw err;
        } 
        
        res.send(data)
    }) 
})
app.get("/api/workouts/range",(req, res) => {
    db.Workout.find({})
    .limit(7)
    .then(dbWorkout =>{
         if (err)
         throw err;
        res.json(dbWorkout);
    })
    
})


app.put("/app/workouts/update/:id",(req, res) =>{
    db.Workout.findOneAndUpdate({_id: mongoose.Types.ObjectId(req.params.id)},{
        $set:{exercise:req.body}
    }, (err, data) =>{
        if (err){
            throw err;
        }
        
        res.send(data)
    }) 
        
    
})




//Start server
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });