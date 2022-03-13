const express = require("express");
const Course = require("../models/Course");

const router = express.Router();

router.get("/", (req,res) => {
    res.send("This is courses route!")
});

router.get("/all-courses", (req, res) => {
    Course.find()
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(500).json({message : err});
    })
});

/* router.get("/1", (req,res) => {
    res.send("This is the course #1.")
}); */


router.post("/create-course", (req, res) => {
    const newcourse = new Course({
      course: req.body.course,
      tag: req.body.tag
    });
  
    newcourse
      .save()
      .then(result => {
        res.status(201).json({
            message: "Handling POST request to /api/courses/create-course - SUCCESS! ",
            result
        });
        
      })
      .catch(err => {
        res.status(500).json({
            message: err
        });
        console.log(err);
      });
  })

module.exports = router;