<!-- [학생] 전체 개설강의조회 및 수강신청 -->
<template>
    <div class = "container">
        <h3> 전체 개설강의조회 및 수강신청 </h3>
      <ul class = "course-list">
        <li v-for="item in list" :key="item._id">
          {{ item.courseName }} - {{ item.teacherInfo.name }}
          <button @click="apply(item.courseName,item.teacherInfo.name)">
            수강신청
          </button>
        </li>
      </ul>
    </div>
  </template>

<script>
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
export default {
    name: "CourseRegister",
    setup() {
        
    },
    created(){
        axios.get('/api/student/course')
            .then(res =>{
                if(res.data.success){
                    console.log(res.data.result)
                    this.list = res.data.result
                }
                else{
                    alert("강좌 조회에 실패하였습니다.")
                }
          })
    },
    methods : {

        apply(courseName, teacherName){

            const token = localStorage.getItem('token');
            const decoded = jwtDecode(token);
            console.log(decoded.id)
            axios.post('/api/student/course',{id: decoded.id , courseName: courseName, teacherName : teacherName})
            .then(res=> {
                if(res.data.success){
                    alert("신청되었습니다.")
                }
                else{
                    alert("신청에 실패하였습니다.")
                }
            })
        },
        // button v-if = "notIn(item.courseName)"
        /*
        notIn(courseName){

            return true
        }
        */
    },
    data(){
        return {
            list :[]
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

.course-list li button {
  margin-left: 10px; 
}
</style>