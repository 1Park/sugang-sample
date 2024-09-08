const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
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

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;