# KWEB 정회원 프로젝트: 온라인 강의 수강신청 및 콘텐츠 관리 시스템

이 프로젝트는 온라인 강의 수강신청과 콘텐츠 관리를 위한 웹 애플리케이션입니다. Vue.js 기반 SPA(Single Page Application)로 구현되었으며, MongoDB와 Node.js를 백엔드 기술로 사용합니다.

## 목차

- 사전 준비
- 설치 및 실행
- 웹 개발 상세
  - 도메인 모델링 및 DB 스키마
  - 모델링 기타 사항
  - 사이트맵
  - API 명세
  - 인증 및 보안

## 사전 준비

### 필수 소프트웨어 설치

- **MongoDB**: MongoDB 7.0 다운로드
- **Node.js**: Node.js v20.9.0 LTS 다운로드

### 시스템 환경 변수 설정

설치 경로를 시스템 환경 변수에 추가합니다. 기본 설치 경로는 다음과 같습니다:

- MongoDB: `C:\Program Files\MongoDB\Server\7.0\bin`
- Node.js: `C:\Program Files\nodejs\`

### 리포지토리 클론

```bash
git clone <repository-url>
```

또는 zip 파일을 다운로드해 압축을 풀어 사용 가능합니다.

## 설치 및 실행

### 1. 클라이언트 페이지 빌드

```bash
cd sugang-cli
npm install
npm run build
```

### 2. DB 서버 및 백엔드 서버 실행

1. MongoDB 서버 실행:

   ```bash
   cd sugang-server
   mongod --dbpath ./mongodb
   ```

   - 실행 중인 터미널을 유지합니다.

2. 새로운 터미널에서 백엔드 서버 실행:

   ```bash
   cd sugang-server
   npm install
   node server.js
   ```

   - 또는 `npm run dev`로 실행 가능합니다.

- 프론트엔드 서버는 기본적으로 `localhost:8080` 포트를 사용합니다.
- 로그인 페이지 우측 하단의 "DB 초기화 및 예시 DB 추가" 버튼으로 예시 데이터를 추가할 수 있습니다.
  - **예시 데이터**:
    - 교수 ID: `prof`, `prof2`
    - 학생 ID: `stud`, `stud2`
    - 비밀번호: 모두 `1234`

## 웹 개발 상세



### 사이트맵

Vue.js 기반 SPA로, Axios를 사용해 비동기 통신을 처리합니다.

- **메인 페이지 (**`/`**)**:
  - 로그인 상태에 따라 `/login`, `/student`, `/teacher`로 리다이렉트.
- **로그인 페이지 (**`/login`**)**:
  - 학생 및 교수 로그인/회원가입 기능.
  - 사이드바 메뉴: 전체 강의 조회, 수강 신청, 내 강의 조회, 게시글 열람, 활동 스트림.
- **강사 페이지 (**`/teacher`**)**:
  - 강좌 관리 및 콘텐츠 작성.
  - JWT로 권한 확인, 미인증 시 리다이렉트.
  - 사이드바 메뉴: 강의 등록, 강의 목록 조회, 게시글 작성, 학생 목록 조회.
- **학생 페이지 (**`/student`**)**:
  - 수강 신청 강좌 조회 및 콘텐츠 확인.
  - JWT로 권한 확인, 미인증 시 리다이렉트.

### API 명세

API는 `sugang-server/routes/apiRoutes.js`에서 프록시로 처리됩니다.

| 요청 | 엔드포인트 | 설명 |
| --- | --- | --- |
| POST | `/api/student/register` | 학생 회원가입 |
| POST | `/api/student/login` | 학생 로그인 |
| POST | `/api/teacher/register` | 교수 회원가입 |
| POST | `/api/teacher/login` | 교수 로그인 |
| GET | `/api/teacher/course` | 교수의 강좌 목록 조회 |
| POST | `/api/teacher/course` | 새로운 강좌 등록 |
| POST | `/api/content` | 게시물 저장 |
| GET | `/api/student/my-course` | 학생의 수강 신청 강좌 조회 |
| GET | `/api/student/course` | 모든 강좌 목록 조회 |
| POST | `/api/student/course` | 수강 신청 |
| GET | `/api/content` | 게시물 조회 |
| POST | `/api/reset` | DB 초기화 및 기본 데이터 추가 |

### 인증 및 보안

- **비밀번호**: Hash & Salt 방식으로 암호화 후 DB에 저장.
- **인증**: JSON Web Token (JWT)으로 로그인 정보 인증.


### 도메인 모델링 및 DB 스키마

#### 도메인 모델링

- **Student (학생)**: 학생 ID, 이름, 비밀번호 등 저장
- **Teacher (강사)**: 강사 ID, 이름, 담당 과목 등 저장
- **Course (강좌)**: 강좌명, 강좌 ID, 담당 강사 ID 등 저장
- **Application (수강 신청)**: 학생 ID와 강좌 ID를 연결
- **Content (강의 콘텐츠)**: 강좌별 콘텐츠 저장 (Rich Text 형식 지원)

#### DB 스키마 상세

- **Student 스키마**:

  ```javascript
  const studentSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true }, // 암호화 저장
    studentId: { type: Number, required: true }
  });
  ```
- **Teacher 스키마**:

  ```javascript
  const teacherSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true }, // 암호화 저장
    studentId: { type: Number, required: true }
  });
  ```
- **Course 스키마**:

  ```javascript
  const courseSchema = new mongoose.Schema({
    teacherId: { type: String, required: true },
    courseName: { type: String, required: true }
  });
  ```
- **Application 스키마**:

  ```javascript
  const applicationSchema = new mongoose.Schema({
    id: { type: String, required: true },
    courseName: { type: String, required: true },
    teacherName: { type: String, required: true }
  });
  ```
- **Content 스키마**:

  ```javascript
  const contentSchema = new mongoose.Schema({
    teacherName: { type: String, required: true },
    teacherId: { type: String, required: true },
    courseName: { type: String, required: true },
    text: { type: String, required: true } // Rich Text
  });
  ```

### 모델링 기타 사항

- **학생과 강좌 관계**: 학생은 다수 강좌에 수강 신청 가능 (`Application` 스키마로 구현).
- **강좌와 강사 관계**: `Course` 스키마에서 `teacherId`로 참조.
- **콘텐츠 저장**: Rich Text 형식으로 저장. 프론트엔드에서 VueQuill로 입력 후 서버에 저장.
- **기타**:
  - 학생과 교수는 `id`를 기본키로 사용.
  - `Content`와 `Application`은 외래키나 Cascade를 사용하지 않음.
  - `Student` 또는 `Teacher` 삭제 시 `Content`와 `Application`은 유지.
