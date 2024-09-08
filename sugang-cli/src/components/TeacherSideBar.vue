<template>
  <div class = "sidebar">
    <ul>
      <h3>{{name}}</h3>
      <li @click = "this.$emit('updateOption', 1)"><a href="#">새 강좌 개설</a></li>
      <li @click = "this.$emit('updateOption', 2)"><a href="#">내 강의 목록</a></li>
      <li @click = "this.$emit('updateOption', 3)"><a href="#">수강학생 관리</a></li>
      <p> </p> 
      <li @click = "logout()" ><a href="#">로그아웃</a></li>
    </ul>
  </div>
</template>

<script>

import { jwtDecode } from 'jwt-decode';

export default {
  name: 'TeacherSideBar',
  props: {
    
  },
  methods: {
    logout(){
      //권한 해제
      localStorage.removeItem('token');
      this.$router.push('/login')
    }
  },
  created(){
    const token = localStorage.getItem('token'); // 저장된 JWT 토큰을 가져옴

    if(!token){
        this.$router.push('/login')
    }
    else{
        const decoded = jwtDecode(token)
        console.log(decoded)
        if (decoded.auth == 'Student'){ // 학생 비정상 접근 방지
            this.$router.push('/student')
        }
        else{
          this.name = decoded.name;
        }
      }
  }
}
</script>

<style scoped>
.sidebar {
width: 200px;
background-color: #f4f4f4;
padding: 20px;
height: 100vh; /* 전체 화면 높이 */
}

.sidebar ul {
list-style-type: none;
padding: 0;
}

.sidebar ul li {
margin-bottom: 10px;
}

.sidebar ul li a {
text-decoration: none;
color: #333;
font-weight: bold;
}
.sidebar ul li a:hover {
color: #0080ff;
}

</style>
