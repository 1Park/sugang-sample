const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({

    teacherId: { //교수님의 Id
        type: String,
        required: true,
    },
    courseName: {
        type: String,
        required: true,
    }

})


const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;