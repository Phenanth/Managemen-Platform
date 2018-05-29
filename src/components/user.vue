<!DOCTYPE html>
<template>
	<div class="user">

		<!-- Navbar -->
		<nav class="navbar navbar-fixed-top">
			<div class="brand-box">
				<span><b>User</b>:{{ $route.params.id }}</span>
			</div>
			<div class="btn-logout">Log Out</div>
		</nav>

		<div class="sidebar">
			<div class="sidebar-tabs" v-if="isStudent">
				<router-link class="sidebar-tab" v-bind:class="{ active : true }" v-bind:to="studentProfilePath">Student1</router-link>
				<router-link class="sidebar-tab" v-bind:class="{ active : false }"  v-bind:to="studentViewOfTeacher">Student2</router-link>
			</div>
			<div class="sidebar-tabs" v-else-if="isAdmin">
				<li>Admin1</li>
				<li>Admin2</li>
			</div>
			<div class="sidebar-tabs" v-else-if="isTeacher">
				<li>Teacher1</li>
				<li>Teacher2</li>
			</div>
			<div v-else></div>
		</div>

		<!-- The function below will be moved to student.vue and so -->
		<div v-if="isAdmin">
			<router-link to="/admin/profile">/admin/profile</router-link>
			<router-link to="/admin/view-of-student">/admin/view-of-student</router-link>
		</div>
		<div v-else-if="isTeacher">
			<router-link to="/teacher/profile">/teacher/profile</router-link>
		</div> 
		<router-view></router-view>
	</div>
</template>
<script>
import router from '../router/index.js'
export default {
	name: 'user',
	data: function () {
		return {
			studentProfilePath: '/student/' + this.$route.params.id + '/profile',
			studentViewOfTeacher: '/student/' + this.$route.params.id + '/view-of-teacher'
		}
	},
	// Will be optimized to use localStorage in the future.
	computed: {
		isStudent: function () {
			let roleCheckStudent = new RegExp('/student*', 'g')
			let arrStudent = roleCheckStudent.exec(this.$route.path)
			return arrStudent
		},
		isAdmin: function () {
			let roleCheckAdmin = new RegExp('/admin*', 'g')
			let arrAdmin = roleCheckAdmin.exec(this.$route.path)
			return arrAdmin
		},
		isTeacher: function() {
			let roleCheckTeacher = new RegExp('/teacher*', 'g')
			let arrTeacher = roleCheckTeacher.exec(this.$route.path)
			return arrTeacher
		},
		path: function() {
			return '/student/2015210405001/profile'
		}
	},
	methods: {
		console: function () {
			console.log(this.$router.path)
			let roleCheck = new RegExp('/student*', 'g')
			let arr = roleCheck.exec(this.$route.path)
			console.log(arr)
			roleCheck = new RegExp('/admin*', 'g')
			arr = roleCheck.exec(this.$route.path)
			console.log(arr)
			roleCheck = new RegExp('/teacher*', 'g')
			arr = roleCheck.exec(this.$route.path)
			console.log(arr)
		}
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
	margin: 0px;
	border: 3px solid #0EA8A3; /* Manjaro green */
	background-color: #F5FFFF;
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
	background-color: #50B4AC;
}

.active {
	background-color: #0EA8A3;
}

</style>
