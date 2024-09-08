<template>
    <div class="heading">
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HeadingBar',
    props: {
      title: {
        type: String,
        default: '온라인 강의관리 시스템 Online Course Management'

      },
      description: {
        type: String,
        default: '학생용 온라인 강의관리 시스템입니다.'
      }
    }
  };
  </script>
  
  <style scoped>
  .heading {
    padding: 10px;
    background-color: #ffffff;
    border-bottom: 1px solid #ddd;
  }
  
  .heading h1 {
    margin: 0;
    font-size: 30px;
  }
  
  .heading p {
    margin: 0;
    color: #6c7566;
  }
  </style>