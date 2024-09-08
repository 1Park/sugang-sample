// 수강 정보

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
    id: { // 학생 id. 학번아님.
        type: String,
        required: true,
    },
    courseName: {
        type: String,
        required: true,
    },
    teacherName:{
        type: String
    }
    
})


const Application = mongoose.model('Application', ApplicationSchema);

module.exports = Application;