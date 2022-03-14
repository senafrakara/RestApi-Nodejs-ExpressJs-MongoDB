const express = require("express");
const Course = require("../models/Course");

const router = express.Router();

router.get("/", (req,res) => {
    res.send("This is courses route!")
});

/* router.get("/all-courses", (req, res) => {
    Course.find()
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(500).json({message : err});
    })
}); */

//the bottom "get" function, the top function made using async
router.get("/all-courses", async (req,res) => {
  try{
    const courses = await Course.find();
    res.status(200).jsonp(courses);

  }catch (err){
    res.status(500).json({message : err});
  }
});

/* router.get("/1", (req,res) => {
    res.send("This is the course #1.")
}); */

/* router.get("/get-course/:courseId", (req, res) => {
  const id = req.params.courseId;
  Course.findById(id)
  .exec()
  .then(result => {
    if(result){
      res.status(200).json(result);
    } else {
      res.status(400).json({message: "No valid entry found"});
    }
   
  })
  .catch(err => {
    res.status(500).json({message: err});
  });
}); */

router.get("/get-course/:courseId", async (req,res) => {
  try{
    const id = req.params.courseId;
    const course = await Course.findById(id);
    if(course){
      res.status(200).json(course);
    } else {
      res.status(400).json({message: "No valid entry found"});
    }
  }catch(err ) {
    res.status(500).json({message: err});
  }
});
 
/* router.post("/create-course", (req, res) => {
    const newcourse = new Course({
      course: req.body.course,
      tag: req.body.tag
    });
  
    newcourse
      .save()
      .then(result => {
        res.status(201).json({
            message: "Handling POST request to /api/courses/create-course - SUCCESS! ",
            result: course
        });
        
      })
      .catch(err => {
        res.status(500).json({
            message: err
        });
        console.log(err);
      });
  }); */

  router.post("/create-course", async (req, res) => {
    const newcourse = new Course({
      course: req.body.course,
      tag: req.body.tag
    });

    try{
      const course = await newcourse.save();
      res.status(201).json({
        message: "Handling POST request to /api/courses/create-course - SUCCESS! ",
        result: course
      });
    }catch(err){
      res.status(500).json({message: err});
      console.log(err);
    }

  });

  router.patch("/update-course/:courseId", async (req,res) => {
    try{
      const id = req.params.courseId; // we update the course with their id
      const course = await Course.updateOne(
        {_id : id},  
        {
          $set: {
            course: req.body.course,
            tag: req.body.tag
          }
        }
      );
      res.status(200).json(course);
    }catch(err){
      res.status(500).json({message: err});
    }
  });

  router.delete("/delete-course/:courseId", async (req, res) => {
    try{
      const id = req.params.courseId;
      const course = await Course.remove({_id: id});
      res.status(200).json(course);
    }catch(err){
      res.status(500).json({message: err});
    }
  });

module.exports = router;