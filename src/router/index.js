import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/login/login'
import User from '@/components/user'

import Student from '@/components/student/student'
import StudentProfile from '@/components/student/studentProfile'
import StudentViewOfTeacher from '@/components/student/stu_viewOfTeacher'

import Admin from '@/components/admin/admin'
import AdminProfile from '@/components/admin/adminProfile'

import Teacher from '@/components/teacher/teacher'
import TeacherProfile from '@/components/teacher/teacherProfile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    // Section for student.
    {
    	path: '/student/:id',
    	component: User,
    	children: [
    		{
    			path: 'profile',
    			component: StudentProfile
    		},
        {
              path: 'view-of-teacher',
              component: StudentViewOfTeacher
        }
    	]
    },
    // Section for Administrator.
    {
    	path: '/admin/:id',
    	component: User,
    	children: [
    		{
    			path: 'profile',
    			component: AdminProfile
    		}
    	]
    },
    // Section for teachers.
    {
    	path: '/teacher/:id',
    	component: User,
    	children: [
    		{
    			path: 'profile',
    			component: TeacherProfile
    		}
    	]
    }
  ]
})
