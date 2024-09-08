<!-- [학생] 수강강의목록 -->
 
<template>
    <div class="container">
        <h3> 내 강의목록 </h3>
        <ul class = "course-list">
            <li v-for = "item in list" v-bind:key = "item._id"> {{ item.courseName }} - {{ item.teacherName }} </li>
        </ul>
    </div>
</template>
<script>
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export default {
    name: "CourseList",
    setup() {
        
    },
    created(){
        const token = localStorage.getItem('token');
            const decoded = jwtDecode(token);
            console.log(decoded.id)
            axios.get('/api/student/my-course',{ params: {id: decoded.id } })
            .then(res =>{
                if(res.data.success){
                    console.log(res.data.result)
                    this.list = res.data.result
                }
                else{
                    alert("내 강의 조회에 실패하였습니다.")
                }
          })
    },
    data(){
        return{
            list: []
        }
    }

}
</script>
<style scoped>
.container {
  margin-left: 20px; 
}

.course-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.course-list li {
  display: flex;
  justify-content: space-between; 
  align-items: center; 
  padding: 8px;
  border-bottom: 1px solid #ddd; 
}

.course-list li:hover {
        color: #0080ff;
        text-decoration: underline;
        background-color: #fff7c1
}
</style>