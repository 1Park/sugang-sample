const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContentSchema = new Schema({
    teacherId: { //게시글 번호
        type: String,
        required: true,
    },
    teacherName:{
        type: String,

    },
    courseName: {
        type: String,
        required: true,
    },

    text: { // RichText로 변경 필요
        type: String
        
    }

})


const Content = mongoose.model('Content', ContentSchema);

module.exports = Content;