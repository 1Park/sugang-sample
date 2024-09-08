# sugang-sample
온라인 강의 수강신청 및 콘텐츠 관리 시스템 (KWeb 정회원 과제)

# 프로젝트 사용 방법


## 1. 사전 준비

### MongoDB 및 Node.js 설치
- **MongoDB**: [MongoDB 설치 페이지](https://www.mongodb.com/try/download/community)에서 MongoDB 7.0 버전을 다운로드
- **Node.js**: [Node.js LTS 다운로드 페이지](https://nodejs.org/en/download/)에서 v20.9.0 LTS 버전을 다운로드

### 시스템 변수 설정
설치된 경로를 시스템 변수에 등록해야 합니다. 일반적으로 다음 경로에 설치됩니다:
- MongoDB: `C:\Program Files\MongoDB\Server\7.0\bin`
- Node.js: `C:\Program Files\nodejs\`

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
npm install
node server.js  또는 npm run dev
```

로컬에서 실행 시 localhost:8080 포트로 접속 가능합니다.

로그인 화면에서 우측 하단 DB초기화 및 예시DB 추가 버튼으로 예시 데이터를 추가할 수 있습니다.
예시 데이터를 추가하면 교수 아이디 prof, prof2와 학생 아이디 stud, stud2가 등록됩니다. 비밀번호는 모두 1234로 초기화되어 있습니다.

