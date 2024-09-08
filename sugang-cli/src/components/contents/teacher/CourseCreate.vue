<!--[교수] 새 강좌 개설 -->
<template>
    <div class = "addcourse">
        <h3> 새 강좌 개설하기 </h3>
        <div> 
        <label for="courseName"> 강의명 </label>
        <input
          type="text"
          id="courseName"
          v-model="courseName"
          placeholder="개설할 강의명을 입력하세요"
        />
      </div>
      <p> </p>
    <button @click="addCourse()"> 강의 개설 </button>	
    </div>
</template>

<script>
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export default {
    name: "CourseCreate",
    setup() {
        
    },
    methods: {
        addCourse(){
            const token = localStorage.getItem('token');
            const decoded = jwtDecode(token);
            axios.post('/api/teacher/course',{ id: decoded.id, courseName: this.courseName })
            .then(res =>{
                if(res.data.success){
                    alert(this.courseName+" 강좌가 개설되었습니다.")
                }
                else{
                    alert("강좌 개설에 실패하였습니다.")
                }
          })
            
        }
    }
}
</script>

<!-- 
body{
    margin : 0
  }
    -->

<style scoped>

    .addcourse div label {display:inline-block; width:100px; height: 30px}
    .addcourse div input {width:400px; height: 30px}
    .addcourse button {height: 30px}
</style>