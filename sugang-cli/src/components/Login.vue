<template>
  <div>
    <h2> 온라인 강의관리 시스템 Online Course Management</h2>

    <div v-if="registerPageOpen == false">
      <div> 
        <label> 교수/학생 </label>
        <select name="auth" v-model="auth" >
          <option value="Teacher">교수</option>
          <option value="Student" selected>학생</option>
        </select>
      </div>
      <p> </p>
      <div> 
        <label for="id"> 아이디 </label>
        <input
          type="text"
          id="id"
          v-model="id"
          placeholder="아이디(ID)"
        />
      </div>
      <div> 
        <label for="password"> 비밀번호 </label>
        <input
          type="password"
          name = "password"
          id="password"
          v-model="password"
          placeholder="비밀번호(Password)"
        />
      </div>
      <p></p>
      <button @click="login()"> 로그인 </button>	
      <button @click="registerPage()"> 회원가입 </button>	
      <p>{{ message }}</p>

      <!-- 테스트용 버튼  -->
      <button @click="reset()" class = "test-button"> DB 초기화 및 예시 DB 추가 </button>

    </div>

<div class = "black-bg"  v-if="registerPageOpen == true">
  <div class = 'white-bg'>
    <h4>회원가입 페이지</h4>
    <div> 
        <label for="id"> 아이디 </label>
        <input
          type="text"
          id="id"
          v-model="id"
          placeholder="아이디(ID)"
        />
      </div>
      <p> </p>
      <div> 
        <label for="password"> 비밀번호 </label>
        <input
          type="password"
          name = "password"
          id="password"
          v-model="password"
          placeholder="비밀번호(Password)"
        />
      </div>
      <p> </p>
      <div> 
        <label for="name"> 이름 </label>
        <input
          type="text"
          id="name"
          v-model="name"
          placeholder="이름(Name)"
        />
      </div>
      <p> </p>
      <div> 
        <label for="studentID"> 학번 </label>
        <input
          type="number"
          id="studentID"
          v-model="studentID"
          placeholder="학번(Student ID)"
        />
      </div>
      <p> </p>
      <div> 
        <label> 교수/학생 </label>
        <select name="auth" v-model="auth" >
          <option value="Teacher">교수</option>
          <option value="Student" selected>학생</option>
        </select>
      </div>
      <p> </p>
    <button @click="register()"> 가입완료 </button>	
    <button @click="cancel()"> 취소 </button>	
  </div>
</div>

</div>
</template>


<script>
import axios from 'axios';

export default {
  name: 'LoginPage',
  
  props: {
    
  },
  methods:{
    async reset(){
      try {
        const res = await axios.post('/api/reset-data');
        alert(res.data.message);
        
      } catch (error) {
        console.error('데이터 초기화 오류:', error);
      }
    },
    login(){

        if (this.auth == "Teacher"){
          axios.post('/api/login/teacher',{ id: this.id, password: this.password })
          .then(res =>{
            if(res.data.success){
              const token = res.data.token;
              localStorage.setItem('token', token);
              this.$router.push('/teacher')
              
            }
            else{
              this.message = "아이디 또는 패스워드가 올바르지 않습니다."
            }
          })
        }
        else if (this.auth == "Student"){
          axios.post('/api/login/student',{ id: this.id, password: this.password })
          .then(res =>{
            if(res.data.success){
              const token = res.data.token;
              localStorage.setItem('token', token);
              this.$router.push('/student')
            }
            else{
              this.message = "아이디 또는 패스워드가 올바르지 않습니다."
            }
          })
        }
        else{
          this.message = "교수/학생 선택 후 로그인해주세요."
        }
        
        
    },
    registerPage(){
      this.registerPageOpen = true
    },
    register(){
      this.message = ''
      if (this.auth == "Teacher"){
        axios.post('/api/register/teacher',{id: this.id, 
                                            password: this.password,
                                            name: this.name,
                                            studentID: this.studentID})
          .then(res =>{
            if(res.data.success){
              alert("가입되었습니다.")
              this.registerPageOpen = false
              this.password = ''
            }
            else{
              alert("아이디가 중복되었거나 필수 항목이 누락되었습니다. \n입력 정보를 다시 확인하세요.")
              
            }
        });
      }
      else if (this.auth == "Student"){
          axios.post('/api/register/student',{id: this.id, 
                                            password: this.password,
                                            name: this.name,
                                            studentID: this.studentID})
          .then(res =>{
            if(res.data.success){
              alert("가입되었습니다.")
              this.registerPageOpen = false
              this.password = ''
            }
            else{
              alert("아이디가 중복되었거나 필수 항목이 누락되었습니다. \n입력 정보를 다시 확인하세요.")
            }
        });
      }
      else{
        alert("교수/학생 선택 후 가입이 가능합니다.")
      }
      
    },
    cancel(){
      this.registerPageOpen = false
      this.password = ''
      this.message = ''
    }
  },
  data(){
    return{
      registerPageOpen : false,
      id : '',
      password : '',
      message : ''
    }
  }
}
</script>

<style>
  body{
    margin : 0
  }

  label {display:inline-block; width:100px}
  input {width:200px}
  select {width:210px;}
  
  .test-button { position: fixed; /* 화면에 고정 위치 */
  bottom: 20px;    /* 화면 하단에서 20px 떨어진 위치 */
  right: 20px;     /* 화면 오른쪽에서 20px 떨어진 위치 */ }
</style>