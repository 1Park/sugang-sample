
온라인 강의 수강신청 및 콘텐츠 관리 시스템 (KWeb 정회원 과제)

# 프로젝트 사용 방법


## 1. 사전 준비

### MongoDB 및 Node.js 설치
- **MongoDB**: [MongoDB 설치 페이지](https://www.mongodb.com/try/download/community)에서 MongoDB 7.0 버전을 다운로드
- **Node.js**: [Node.js LTS 다운로드 페이지](https://nodejs.org/en/download/)에서 v20.9.0 LTS 버전을 다운로드

### 시스템 변수 설정
설치된 경로를 시스템 변수에 등록해야 합니다. 일반적으로 다음 경로에 설치됩니다.
- MongoDB: `C:\Program Files\MongoDB\Server\7.0\bin`
- Node.js: `C:\Program Files\nodejs\`

### 리포지토리 클론
`git clone` 명령어를 통해 리포지토리를 로컬에 복사할 수 있습니다.  
혹은 zip파일로 다운받아 실행해도 무방합니다.  

## 2. 클라이언트 페이지 빌드

```bash
cd sugang-cli
npm install
npm run build
```

## 3. DB 서버 및 백엔드 서버 실행
```bash
cd sugang-server
mongod --dbpath ./mongodb
```

DB 서버 실행한 터미널 유지하고 새로운 터미널에서 백엔드서버를 실행합니다.  

```bash
cd sugang-server
npm install
node server.js  또는 npm run dev
```

로컬에서 실행 시 localhost:8080 포트로 접속 가능합니다.

로그인 화면에서 우측 하단 DB초기화 및 예시DB 추가 버튼으로 예시 데이터를 추가할 수 있습니다.
예시 데이터를 추가하면 교수 아이디 prof, prof2와 학생 아이디 stud, stud2가 등록됩니다. 비밀번호는 모두 1234로 초기화되어 있습니다.
#
#
#
---

# 웹 애플리케이션 리포트 (선택 과제)  


### 1-1. 도메인 모델링 및 DB 스키마 구조
   
도메인 모델링
Student (학생)

학생 ID, 이름, 비밀번호 등을 저장
Teacher (강사)

강사 ID, 이름, 담당 과목 등을 저장
Course (강좌)

강좌명, 강좌 ID, 담당 강사 ID 등을 저장
Application (수강 신청)

학생 ID와 강좌 ID를 연결하는 데이터 저장
Content (강의 콘텐츠)

강좌별 콘텐츠 내용 저장 (Rich Text 형식 지원)

### 1-2. DB 스키마 구조
Student 스키마
```
const studentSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true }, // 암호화되어 저장됨
  studentId: { type: Number, required: true }
});
```
Teacher 스키마

```
const teacherSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true }, // 암호화되어 저장됨
  studentId: { type: Number, required: true }
});
```

Course 스키마

```
const courseSchema = new mongoose.Schema({
  teacherId: { type: String, required: true },
  courseName: { type: String, required: true }
});
```
Application 스키마
```
const applicationSchema = new mongoose.Schema({
  id: { type: String, required: true },
  courseName: { type: String, required: true },
  teacherName: { type: String, required: true },
});
```

Content 스키마
```
const contentSchema = new mongoose.Schema({
  teacherName: { type: String, required: true },
  teacherId: { type: String, required: true },
  courseName: { type: String, required: true },
  text: { type: String, required: true }  // Rich Text
});
```

### 2. 모델링에 대한 기타 사항
   
학생과 강좌의 관계

학생은 여러 강좌에 수강 신청할 수 있으며, 이를 Application 스키마를 통해 구현  
강좌와 강사의 관계는 Course 스키마에서 teacherId로 참조  
  
강의 콘텐츠는 Rich Text 형식으로 저장되며, 강좌와 강사의 정보를 포함  
프론트엔드에서 VueQuill을 사용해 리치 텍스트를 입력받고, 서버로 전송해 저장  

### 3. 웹 애플리케이션 사이트맵

메인 페이지: /  
현재 권한 및 토큰에 따라 아래 세 페이지 중 하나로 이동함.  
로그인이 되지 않았다면 /login으로, 학생으로 로그인되어있으면 /student로, 교수로 로그인되어있다면 /teacher로 리다이렉트

로그인 페이지: /login  
학생 및 교수 로그인 및 회원가입 기능  
교수 로그인 시 /teacher로, 학생 로그인 시 /student로 이동함.
좌측 사이드바로 전체강의 조회 및 수강신청, 내 강의 조회, 게시글 열람, 활동 스트림 보기 등 메뉴를 선택할 수 있음.

강사 페이지: /teacher  
강사는 자신이 등록한 강좌 관리 및 콘텐츠 작성  
토큰을 통해 접속 권한을 확인하고, 접속 권한 없을시 리다이렉트
좌측 사이드바로 강의등록, 강의목록조회, 게시글 작성, 학생목록 등 메뉴를 선택할 수 있음.

학생 페이지: /student  
학생은 자신의 수강 신청 강좌 목록 조회 및 콘텐츠 확인  
토큰을 통해 접속 권한을 확인하고, 접속 권한 없을시 리다이렉트


### 4. API 명세  
api는 sugang-server/routes/apiRoutes.js에서 처리하고 있다.  
|요청 종류| api |설명|
|------|---|---|
|POST|	  /api/student/register  |   학생 회원가입  |
|POST|	  /api/student/login	    |  학생 로그인  |
|POST|	  /api/teacher/register	 |   교수 회원가입  |
|POST|	  /api/teacher/login	    |  교수 로그인  |
|GET|	    /api/teacher/course	    |  교수가 본인이 생성한 강좌 목록 조회  |
|POST|    /api/teacher/course	    |  교수가 새로운 강좌 등록  |
|POST|	  /api/content	          |  교수가 입력한 게시물 저장  |
|GET|	    /api/student/my-course	 | 학생이 수강 신청한 강좌 조회  |
|GET|	    /api/student/course	    |  모든 강좌 목록 조회  |
|POST|	  /api/student/course	 |     학생이 수강 신청  |
|GET|	    /api/content	          |  학생이 게시물 조회   |
|POST|  /api/reset	             | 데이터베이스의 모든 데이터 삭제 및 기본 데이터 추가 |
