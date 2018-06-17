<!DOCTYPE html>
<template>
	<div class="user">

		<!-- Navbar -->
		<nav class="navbar navbar-fixed-top">
			<div class="brand-box">
				<span><b>USER</b>:{{ username }}</span>
			</div>
			<button class="btn-logout" v-on:click="logout()">Log Out</button>
		</nav>

		<div class="sidebar">
			<div class="sidebar-tabs" v-if="isStudent">
				<router-link class="sidebar-tab" v-bind:class="{ active : page1 }" v-bind:to="studentProfilePath">Profile</router-link>
				<router-link class="sidebar-tab" v-bind:class="{ active : page2 }"  v-bind:to="studentViewOfTeacherPath">Teacher View</router-link>
			</div>
			<div class="sidebar-tabs" v-else-if="isAdmin">
				<router-link class="sidebar-tab" v-bind:class="{ active: page1}" v-bind:to="adminProfilePath">Profile</router-link>
				<router-link class="sidebar-tab" v-bind:class="{ active: page4}" v-bind:to="adminStuListPath">Student List</router-link>
				<router-link class="sidebar-tab" v-bind:class="{ active: page5}" v-bind:to="adminTchListPath">Teacher List</router-link>
			</div>
			<div class="sidebar-tabs" v-else-if="isTeacher">
				<router-link class="sidebar-tab" v-bind:class="{ active: page1}" v-bind:to="teacherProfilePath">Profile</router-link>
				<router-link class="sidebar-tab" v-bind:class="{ active: page3}" v-bind:to="teacherStuHandlePath">My Students</router-link>
			</div>
			<div v-else></div>
		</div>
		<router-view></router-view>
	</div>
</template>
<script>
import router from '../router/index.js'
import store from '../store/index.js'
export default {
	name: 'user',
	data: function () {
		return {
			username: '',
			studentProfilePath: '/student/' + this.$route.params.id + '/profile',
			studentViewOfTeacherPath: '/student/' + this.$route.params.id + '/view-of-tch',
			adminProfilePath: '/admin/' + this.$route.params.id + '/profile',
			adminStuListPath: '/admin/' + this.$route.params.id + '/stu-list',
			adminTchListPath: '/admin/' + this.$route.params.id + '/tch-list',
			teacherProfilePath: '/teacher/' + this.$route.params.id + '/profile',
			teacherStuHandlePath: '/teacher/' + this.$route.params.id + '/stu-handle'
		}
	},
	// Will be optimized to use localStorage in the future.
	computed: {
		isStudent: function () {
			let token = JSON.parse(store.getters.showTokenState)
			return token.role == 'student'
		},
		isAdmin: function () {
			let token = JSON.parse(store.getters.showTokenState)
			return token.role == 'admin'
		},
		isTeacher: function() {
			let token = JSON.parse(store.getters.showTokenState)
			return token.role == 'teacher'
		},
		page1: function () {
			let pageCheck = new RegExp('/profile', 'g')
			let arr = pageCheck.exec(this.$route.path)
			if (arr) {
				return true
			} else {
				return false
			}
		},
		page2: function () {
			let pageCheck = new RegExp('/view-of-tch', 'g')
			let arr = pageCheck.exec(this.$route.path)
			if (arr) {
				return true
			} else {
				return false
			}
		},
		page3: function () {
			let pageCheck = new RegExp('/stu-handle', 'g')
			let arr = pageCheck.exec(this.$route.path)
			if (arr) {
				return true
			} else {
				return false
			}
		},
		page4: function () {
			let pageCheck = new RegExp('/stu-list')
			let arr = pageCheck.exec(this.$route.path)
			if (arr) {
				return true
			} else {
				return false
			}
		},
		page5: function () {
			let pageCheck = new RegExp('/tch-list')
			let arr = pageCheck.exec(this.$route.path)
			if (arr) {
				return true
			} else {
				return false
			}
		}
	},
	methods: {
		logout: function () {
			store.dispatch('logout')
			router.go(0)
			router.push('/')
		}
	},
	mounted: function () {
		this.username = JSON.parse(store.getters.showTokenState).username
	}
}
</script>
<style>

nav {
	background-color: #505050; /* Manjaro gray */
	color: #E5F5F5; /* Light Manjaro green */
	margin-bottom: 0px;
	/*padding-left: 20px;*/
	/*padding-right: 20px;*/
}

html, body {
	height: 100%;
	min-width: 992px;
	margin: 0px;
	border: 3px solid #0EA8A3; /* Manjaro green */
	background-color: #F5FFFF;
}

a:hover {
	color: white;
	text-decoration: none;
}

a:focus {
	color: white;
	text-decoration: none;
}

b {
	font-size: 34px;
}

.user {
	font-weight: bold;
}

.brand-box {
	float: left;
	padding-left: 20px;
	padding-right: 20px;
	height: 50px;
	line-height: 50px;
	font-size: 18px;
	background-color: #707070; /* Manjaro light gray */
}

.btn-logout {
	float: right;
	height: 50px;
	line-height: 50px;
	font-size: 18px;
	padding-left: 20px;
	padding-right: 20px;
	background-color: #0EA8A3;
}

.sidebar {
	list-style: none;
	float: left;
	margin-top: -15px;
	padding-top: 0px;
	height: calc(100vh - 56px);
	width: 140px;
	background-color: #97CACA;
}

.sidebar-tab {
	display: list-item;
	height: 50px;
	text-decoration: none;
	color: #E5F5F5;
	line-height: 50px;
	background-color: #78bfba;
}

.active {
	background-color: #0EA8A3;
}

</style>
