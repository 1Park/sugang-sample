<template>
  <div>
    <heading-bar description="교수용 온라인 강의관리 시스템입니다."/>
    <div class = "main-layout">
      <teacher-side-bar name = "정연돈" @updateOption = "updateOption"/>
      <course-create  v-if = "option==1"/>
      <course-list    v-if = "option==2"/>
      <student-list   v-if = "option==3"/>
    </div>
  </div>  
</template>

<script>
import TeacherSideBar from './TeacherSideBar.vue';
import HeadingBar from './Heading.vue';
import CourseCreate from './contents/teacher/CourseCreate.vue';
import CourseList from './contents/teacher/CourseList.vue';
import StudentList from './contents/teacher/StudentList.vue';

export default {
  name: 'TeacherMain',
  props: {

  },
  components: {
    TeacherSideBar,
    HeadingBar,
    CourseCreate,
    CourseList,
    StudentList,
  },
  methods: {
    updateOption(newOption){
      console.log(newOption)
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