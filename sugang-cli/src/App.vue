
<!--
<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>
-->
<template>
  <v-app>
    <v-content>
      <!-- 라우터 -->
      <v-container fluid fill-height aacontainer>
        <router-view></router-view>
      </v-container>
       <!-- 라우터 -->
    </v-content>
  </v-app>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'


export default {
  name: 'App',
  components: {
    //HelloWorld
  },
  data(){
    return {
      registerPageOpen : false
    }; 
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
