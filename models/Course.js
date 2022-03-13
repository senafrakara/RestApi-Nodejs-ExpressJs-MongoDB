const mongoose = require("mongoose");

const CourseSchema = mongoose.Schema({
    course: {
        type: String,
        required: true
      },
      tag: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
});

// Whatever that put a name right on "Courses", it will show it on the MongoDB Atlas.
module.exports = mongoose.model("Courses", CourseSchema);
