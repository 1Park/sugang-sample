import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from './components/Login.vue';
import StudentMain from './components/StudentMain.vue';
import TeacherMain from './components/TeacherMain.vue';
import EveryMain from './components/EveryMain.vue';

const router =  createRouter({
  history: createWebHistory('/'),
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'EveryMain',
      component: EveryMain,
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage,
    },
    {
      path: '/student',
      name: 'StudentMain',
      component: StudentMain,
    },
    {
        path: '/teacher',
        name: 'TeacherMain',
        component: TeacherMain,
      },
      
  ],
});


export default router;