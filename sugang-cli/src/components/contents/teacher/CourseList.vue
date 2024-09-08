<!--[교수] 강좌 목록 -->

<template>
    <div>

    <div class="myCourse" v-if = "!selected">
        <h3> 내가 개설한 강의목록 </h3>
        <p> 클릭 시 해당 강의 게시물 작성 페이지로 이동합니다.</p>
        <ul>
            <li v-for = "item in list" v-bind:key = "item._id" @click ="goCourse(item.courseName)"> {{ item.courseName }} </li>
        </ul>
    </div>
    <div v-if = "selected">
        <p> {{selected}} </p>
        <quill-editor
            v-model="editorContent"
            class="editor-container"
            :disabled="false"
            :value="content"
            :options="editorOption"/>
        <button @click="cancel()"> 취소 </button> <button @click="submitContent"> 작성완료 </button> 
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

import {quillEditor} from 'vue3-quill'

export default {
    name: "CourseList",
    components: {
        quillEditor,
    },
    setup() {
        
    },
    methods:{
        cancel(){
            this.selected = null
        },
        goCourse(courseName){
            this.selected = courseName
        },
        async submitContent(){
            const token = localStorage.getItem('token');
            const decoded = jwtDecode(token);
            console.log(decoded.name)

            const text = this.editorContent; // Quill 에디터의 HTML 콘텐츠 가져오기
            const content = {
                teacherName: decoded.name,
                teacherId: decoded.id,
                courseName: this.selected, ///// selected 처리 필요
                text: text
            };

            try {
                const response = await axios.post('/api/content', content );
                if (response.data.success) {
                alert('Content successfully saved.');
                } else {
                alert('Failed to save content.');
                }
                this.selected = null
            } catch (error) {
                console.error('Error saving content:', error);
                alert('An error occurred while saving content.');
                this.selected = null
            }
        }
    },
    created(){
        const token = localStorage.getItem('token');
            const decoded = jwtDecode(token);
            console.log(decoded.id)
            axios.get('/api/teacher/course',{ params: {teacherId: decoded.id } })
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
    data(){
        return{
            list: [],
            selected : null,
            editor : null,

            editorOption: {
                placeholder: "place holder",
                modules:{
                    modules: {
                        toolbar: [
                        [{ 'header': '1' }, { 'header': '2' }],
                        ['bold', 'italic', 'underline'],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        ['link'],
                        [{ 'align': [] }],
                        ['clean']
                        ]
                },
                }
            }
        }
    }

}
</script>
<style scoped>

.myCourse ul li { width:300px; height: 35px; }
.myCourse ul li:hover {
    color: #0080ff;
    text-decoration: underline;
    background-color: #fff7c1
}

#editor-container {
  height: 400px;
  width: 700px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  margin-left: 20px;
}

</style>
