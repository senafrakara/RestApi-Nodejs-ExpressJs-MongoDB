const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const cors = require("cors");
require("dotenv/config");

//as express supports function that body_parser performs, we dont need to use this anymore.
//const body_parser = require("body-parser");
//app.use(body_parser.json());

app.use(express.urlencoded({extended: true}));
app.use(express.json());


const route_courses = require("./routes/courses");

app.use(cors());
app.use("/api/courses", route_courses); //middleware
//to create a route and to access that, this is the first step to do. 


app.get("/", (req, res) => {
    res.send("Welcome to express- node js- mongodb api tutorial!");
});

/* app.get("/api/courses", (req,res) => {
    res.send([1,2,3]);
}); */

mongoose.connect(
    process.env.DB_CONNECTION_VERSION2,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("connected to database!")
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));