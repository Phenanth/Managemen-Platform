import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/login/login'
import User from '@/components/user'

import Student from '@/components/student/student'
import StudentProfile from '@/components/student/studentProfile'
import StudentViewOfTeacher from '@/components/student/studentViewOfTeacher'

import Admin from '@/components/admin/admin'
import AdminProfile from '@/components/admin/adminProfile'
import AdminStuList from '@/components/admin/adminStuList'
import AdminTchList from '@/components/admin/adminTchList'

import Teacher from '@/components/teacher/teacher'
import TeacherProfile from '@/components/teacher/teacherProfile'
import TeacherStuHandle from '@/components/teacher/teacherStuHandle'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    // Section for student.
    {
    	path: '/student/:id',
    	component: User,
    	redirect: '/student/:id/profile',
    	children: [
    		{
    			path: 'profile',
    			component: StudentProfile
    		},
        {
              path: 'view-of-tch',
              component: StudentViewOfTeacher
        }
    	]
    },
    // Section for Administrator.
    {
    	path: '/admin/:id',
    	component: User,
    	redirect: '/admin/:id/profile',
    	children: [
    		{
    			path: 'profile',
    			component: AdminProfile
    		},
    		{
    			path: 'stu-list',
    			component: AdminStuList
    		},
    		{
    			path: 'tch-list',
    			component: AdminTchList
    		}
    	]
    },
    // Section for teachers.
    {
    	path: '/teacher/:id',
    	component: User,
    	redirect: '/teacher/:id/profile',
    	children: [
    		{
    			path: 'profile',
    			component: TeacherProfile
    		},
    		{
    			path: 'stu-handle',
    			component: TeacherStuHandle
    		}
    	]
    }
  ]
})
