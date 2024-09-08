<template>
    <div class = "sidebar">
      <ul>
        <h3>{{name}}</h3>
        <li @click = "this.$emit('updateOption', 1)"><a href="#">강의목록 및 수강신청</a></li>
        <li @click = "this.$emit('updateOption', 2)"><a href="#">내 강의</a></li>
        <li @click = "this.$emit('updateOption', 3)"><a href="#">최근 업데이트 게시물</a></li>
        <p>  </p>
        <li @click = "logout()" ><a href="#">로그아웃</a></li>
      </ul>
      <p> {{ option }} </p>
    </div>
</template>

<script>

import { jwtDecode } from 'jwt-decode';

export default {
  name: 'StudentSideBar',
  props: {

  },
  methods: {
    logout(){
      localStorage.removeItem('token');
      this.$router.push('/login')
    },
  },
  created(){
    const token = localStorage.getItem('token'); // 저장된 JWT 토큰을 가져옴

    if(!token){
        this.$router.push('/login')
    }
    else{
        const decoded = jwtDecode(token)
        console.log(decoded)
        if (decoded.auth == 'Teacher'){ // 교수 비정상 접근 방지
            this.$router.push('/teacher')
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