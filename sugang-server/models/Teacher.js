const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeacherSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    studentID: {
        type: Number,
        required: true,
    }
})

const Teacher = mongoose.model('Teacher', TeacherSchema);

module.exports = Teacher;