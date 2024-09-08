
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'secretkey';
const router = express.Router();
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Course = require('../models/Course');
const Application = require('../models/Application');
const Content = require('../models/Content');

router.get('/data', (req, res) => {
  res.json({ message: 'This is data from the server' });
});


// ======  로그인/회원가입 api  ====== //

// 학생으로 로그인
router.post('/login/student', async (req, res) => {

    const { id, password } = req.body;
    try {
      const user = await Student.findOne({ id });
  
      if (!user) {
        res.json({success : false})
      }
      else{
        const isMatched = await bcrypt.compare(password, user.password);
        if (isMatched) {
          const token = jwt.sign({ id: user.id, name: user.name, auth:'Student' }, JWT_SECRET, { expiresIn: '1h' });
          res.json({ success : true , token })
        }
        else{
          res.json({ success: false });
        }
      }
    }
    catch(error){
      console.error(error)
      res.json({success: false})
    }

});

// 교수로 로그인

router.post('/login/teacher', async (req, res) => {

    const { id, password } = req.body;
    try {
      const user = await Teacher.findOne({ id });
  
      if (!user) {
        res.json({success : false})
      }
      else{
        const isMatched = await bcrypt.compare(password, user.password);
        if (isMatched) {
          const token = jwt.sign({ id: user.id, name: user.name, auth:'Teacher' }, JWT_SECRET, { expiresIn: '1h' });
          res.json({ success : true , token })
        }
        else{
          res.json({ success: false });
        }
      }
    }
    catch(error){
      console.error(error)
      res.json({success: false})
    }
});

//학생으로 회원가입
router.post('/register/student', async (req, res) => {
  try {
    const { id, password, name, studentID } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password,salt)

    const newStudent = new Student({id: id, password: hashed, name: name, studentID: studentID})
    const savedStudent = await newStudent.save();
    console.log("Student registered")
    res.json({ success: true });
  }
  catch(error){
    console.error(error)
    res.json({ success: false });
  } 

});

//교수로 회원가입
router.post('/register/teacher', async (req, res) => {
    try {
      const { id, password, name, studentID } = req.body;
      
      if(id=='' || password == '' || name == '' || studentID == '')
        return res.json({success : false})
      
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password,salt)
      
      const newTeacher = new Teacher({id: id, password: hashed, name: name, studentID: studentID})
      const savedTeacher = await newTeacher.save();

      console.log("Teacher registered");
      res.json({ success: true });
    }
    catch(error){
      console.error(error)
      res.json({ success: false });
    } 
});




// ======  교수 api  ====== //

//교수 강의등록
router.post('/teacher/course', async (req, res) =>{
    const { id , courseName } = req.body;
    try {

      if(courseName ==  '')
        return res.json({success : false})
      
      const newCourse = new Course({teacherId: id, courseName: courseName})
      const savedTeacher = await newCourse.save();

      console.log("Course added");
      res.json({ success: true });
    }
    catch(error){
      console.error(error)
      res.json({success: false});
    }

})

//내강의목록 조회
router.get('/teacher/course', async (req, res) =>{
  const teacherId = req.query.teacherId;
  try{
    console.log(teacherId + " teacher requested Course List")
    const courses = await Course.find({ teacherId });
    res.json({ success: true, result: courses });
  }
  catch(error){
    console.log(error)
    res.json({ success: false});
  }
    
})

//강의 게시물 작성
router.get('/teacher/add-content', (req, res) =>{
    const { id , courseName } = req.body;
    //DB에 추가
    db_success = true;
    if ( db_success ) {  
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
})

//교수의 게시물 저장

router.post('/api/content', async (req, res) => {
  console.log("게시글 작성 requested")
  const { teacherName, teacherId, courseName, text } = req.body;

  if (!text) {
    return res.status(400).json({ success: false, message: '텍스트가 없습니다!' });
  }

  try {
    const newContent = new Content({
      teacherName,
      teacherId,
      courseName,
      text
    });

    await newContent.save();
    res.json({ success: true, message: '게시물이 업로드되었습니다.' });
  } catch (error) {
    console.error('Content 저장 오류:', error);
    res.status(500).json({ success: false, message: '서버 오류 발생' });
  }
});



// ======  학생 api  ====== //
router.get('/student/course', async (req, res) =>{

  try{
    const result = await Course.aggregate([
      {
        $lookup: {
          from: 'teachers',              // 참조할 컬렉션 이름 (Teacher)
          localField: 'teacherId',       // Course 컬렉션의 teacherId
          foreignField: 'id',            // Teacher 컬렉션의 id
          as: 'teacherInfo'              // 결과를 저장할 필드 이름
        }
      },
      { $unwind: '$teacherInfo' },       // teacherInfo 배열을 평탄화 (INNER JOIN처럼 작동)
      {
        $project: {
          courseName: 1,                 // Course의 courseName 필드 유지
          'teacherInfo.name': 1          // Teacher의 name 필드만 반환
        }
      }
    ]).exec();
    res.json({ success: true, result:result });
  }
  catch(error){
    console.error(error);
    res.json({ success:false })
  }
})

// [학생] 희망 강의 수강신청
router.post('/student/course', async (req, res) =>{
  
  const { id , courseName, teacherName } = req.body;
  try {

    const newApplication = new Application({id: id, courseName: courseName, teacherName: teacherName})
    const savedApplication = await newApplication.save();

    console.log(id + " Applied " + courseName + teacherName);
    res.json({ success: true });
  }
  catch(error){
    console.error(error)
    res.json({success: false});
  }

})


// [학생] 내 강의목록 조회
router.get('/student/my-course', async(req,res) => {
  const id = req.query.id;
  try{
    console.log(id + " student requested api/my-course")
    const applications = await Application.find({ id });
    console.log(applications)

    res.json({ success: true, result: applications });
  }
  catch(error){
    console.log(error)
    res.json({ success: false});
  }
})

// [학생] 게시물 조회
router.get('/api/content', async (req, res) => {
  const courseName = req.query.courseName;
  const teacherName = req.query.teacherName;

  try {
    const contents = await Content.find({ courseName:courseName, teacherName:teacherName });
    res.json({ success: true, contents: contents });
  } catch (error) {
    res.json({ success: true})
  }
});


// [테스트] 
router.post('/reset-data', async (req, res) => {
  try {
    // 기존 데이터 삭제
    await Course.deleteMany({});
    await Teacher.deleteMany({});
    await Student.deleteMany({});
    await Application.deleteMany({});
    await Content.deleteMany({});

    // 예시 데이터 추가
    await Course.insertMany([
      { courseName: '데이터베이스', teacherId: 'prof' },
      { courseName: '데이터베이스시스템', teacherId: 'prof' },
      { courseName: '계산이론', teacherId: 'prof2' }
    ]);
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash('1234',salt)

    await Teacher.insertMany([
      { id: 'prof', name: '정연돈', studentID: '201', password : hashed },
      { id: 'prof2', name: '오학주', studentID: '202', password : hashed }
    ]);

    await Student.insertMany([
      { id: 'stud', name: '박원', studentID: '2020', password : hashed },
      { id: 'stud2', name: '홍길동', studentID: '2021', password : hashed }
    ]);

    res.json({ success: true, message: '데이터가 성공적으로 초기화되었습니다.' });
  } catch (error) {
    console.error('데이터 초기화 오류:', error);
    res.json({ success: false, message: '데이터 초기화 실패' });
  }
});


module.exports = router;