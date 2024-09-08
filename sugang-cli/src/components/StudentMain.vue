

<template>
  <div> 
  <heading-bar/>
  <div class = "main-layout">
    
    <student-side-bar name = "박원" @updateOption = "updateOption"/>

    <course-register  v-if = "option == 1 "/>
    <course-list      v-if = "option == 2 "/>
    <current-update   v-if = "option == 3 "/> 
 
  </div>
</div>
  </template>


<script>
import StudentSideBar from './StudentSideBar.vue';
import HeadingBar from './Heading.vue';
import CourseList from './contents/student/CourseList.vue'
import CourseRegister from './contents/student/CourseRegister.vue'
import CurrentUpdate from './contents/student/CurrentUpdate.vue'
export default {
  name: 'StudentMain',
  props: {
    
  },
  components: {
    StudentSideBar,
    HeadingBar,
    CourseList,
    CourseRegister,
    CurrentUpdate
  },
  methods: {
    updateOption(newOption){
      this.option = newOption;
    }
  },
  data(){
    return{
      option : 0
    }
    
  }
}
</script>
<style scoped>
.main-layout {
  display: flex;
  height: 100vh; /* 전체 화면 높이 */
}

.main-content h4 {
  margin-top: 20px;
}
</style>