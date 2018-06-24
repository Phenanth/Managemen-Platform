import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index.js'

import Home from '@/components/home'
import Login from '@/components/login/login'
import User from '@/components/user'

//import Student from '@/components/student/student'
import StudentProfile from '@/components/student/studentProfile'
import StudentViewOfTeacher from '@/components/student/studentViewOfTeacher'

//import Admin from '@/components/admin/admin'
import AdminProfile from '@/components/admin/adminProfile'
import AdminStuList from '@/components/admin/adminStuList'
import AdminTchList from '@/components/admin/adminTchList'

//import Teacher from '@/components/teacher/teacher'
import TeacherProfile from '@/components/teacher/teacherProfile'
import TeacherStuHandle from '@/components/teacher/teacherStuHandle'

Vue.use(Router)

const router =  new Router({
  	routes: [
		{
		  path: '/',
		  name: 'home',
		  component: Home
		  //redirect: '/login' // Will be removed if home page was designed.
		},
		{
			path: '/login',
			name: 'login',
			component: Login,
			beforeEnter: (to, from, next) => {
				let token = JSON.parse(store.getters.showTokenState)
				if (token && token.username) {
					next('/' + token.role + '/')
				} else {
					next()
				}
			}
		},
		// Section for student.
		{
			path: '/student',
			component: User,
			beforeEnter: (to, from, next) => {
				let token = JSON.parse(store.getters.showTokenState)
				if (token && token.role == 'student') {
					let username = token.username
					next('/student/' + username)
				} else {
					next('/login')
				}
			}
		},
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
			],
			beforeEnter: (to, from ,next) => {
				let token = JSON.parse(store.getters.showTokenState)
				if (token && token.role == 'student' && to.params.id == token.username) {
					next()
				} else {
					next('/login')
				}
			}
		},
		// Need to be optimized like student section.
		// Section for Administrator.
		{
			path: '/admin',
			component: User,
			beforeEnter: (to, from, next) => {
				let token = JSON.parse(store.getters.showTokenState)
				if (token && token.role == 'admin') {
					let username = token.username
					next('/admin/' + username)
				} else {
					next('/login')
				}
			}
		},
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
			],
			beforeEnter: (to, from ,next) => {
				let token = JSON.parse(store.getters.showTokenState)
				if (token && token.role == 'admin' && to.params.id == token.username) {
					next()
				} else {
					next('/login')
				}
			}
		},
		// Section for teachers.
		{
			path: '/teacher',
			component: User,
			beforeEnter: (to, from, next) => {
				let token = JSON.parse(store.getters.showTokenState)
				if (token && token.role == 'teacher') {
					let username = token.username
					next('/teacher/' + username)
				} else {
					next('/login')
				}
			}
		},
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
			],
			beforeEnter: (to, from ,next) => {
				let token = JSON.parse(store.getters.showTokenState)
				if (token && token.role == 'teacher' && to.params.id == token.username) {
					next()
				} else {
					next('/login')
				}
			}
		}
	]
})

export default router
