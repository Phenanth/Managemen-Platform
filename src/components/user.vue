<!DOCTYPE html>
<template>
	<div class="user">

		<!-- Navbar -->
		<nav class="navbar navbar-fixed-top">
			<div class="brand-box">  
				<embed height="25" width="35" src="../../static/svg/bussiness-card.svg"/> 
				<span><b>USER</b>:{{ username }}</span>
			</div>
			<div class="btn btn-logout" v-on:click="logout()">
				<div class="fade-enter-active">
					<embed height="25" width="35" src="../../static/svg/wrong.svg"/>
				</div>
			</div>
		</nav>

		<!-- Side navbar -->
		<div class="sidebar">
			<div class="sidebar-tabs" v-if="isStudent">
				<router-link class="sidebar-tab" v-bind:class="{ active : page1 }" v-bind:to="studentProfilePath">
					<span>
						Profile
					</span>
				</router-link>
				<router-link class="sidebar-tab" v-bind:class="{ active : page2 }"  v-bind:to="studentViewOfTeacherPath">
					<span>
						Teachers
					</span>
				</router-link>
			</div>
			<div class="sidebar-tabs" v-else-if="isAdmin">
				<router-link class="sidebar-tab" v-bind:class="{ active: page1}" v-bind:to="adminProfilePath">
				<div class="row side-item">
					<span>Profile</span>
				</div>
				</router-link>
				<router-link class="sidebar-tab" v-bind:class="{ active: page4}" v-bind:to="adminStuListPath">
					<span>Student List</span>
				</router-link>
				<router-link class="sidebar-tab" v-bind:class="{ active: page5}" v-bind:to="adminTchListPath">
					<span>Teacher List</span>
				</router-link>
			</div>
			<div class="sidebar-tabs" v-else-if="isTeacher">
				<router-link class="sidebar-tab" v-bind:class="{ active: page1}" v-bind:to="teacherProfilePath">
					<span>
						Profile
					</span>
				</router-link>
				<router-link class="sidebar-tab" v-bind:class="{ active: page3}" v-bind:to="teacherStuHandlePath">
					<span>
						My Students
					</span>
				</router-link>
			</div>
		</div>

		<!-- Sections -->
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
			teacherStuHandlePath: '/teacher/' + this.$route.params.id + '/stu-handle',
			hover: false
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
		},
		hovering: function () {
			return this.hover
		}
	},
	methods: {
		logout: function () {
			store.dispatch('logout')
			router.go(0)
		},
		isHover: function () {
			this.hover = !this.hover
			console.log(this.hover)
		}
	},
	mounted: function () {
		this.username = JSON.parse(store.getters.showTokenState).username
	}
}
</script>
<style>

/* General */

nav {
	background-color: #505050; /* Manjaro gray */
	color: #E5F5F5; /* Light Manjaro green */
	margin-bottom: 0px;
}

html, body {
	border-bottom: transparent;
	border-right: transparent;
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

/* Navbar */

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
	display: flex;
	width: 60px;
	align-items: center;
	justify-content: center;
	float: right;
	height: 46px;
	margin-top: 2px;
	margin-right: 2px;
	padding-left: 20px;
	padding-right: 20px;
	background-color: #0EA8A3;
}

.btn-logout:hover {
	color: white;
	cursor: pointer;
	background-color: #0c8a86;
}

.btn-logout:hover embed {
	display: none;
}

.btn-logout:hover div:after {
	content: "Log Out";
}

/* Sidebar */

li {
	list-style: none;
}
.nav-tabs {
	border-bottom: 1px solid #78bfba;
}
.nav > li > a {
	padding-left: 35px;
	padding-right: 32px;
}
.nav > li > a:hover {
	background-color: #3fb1b1;
}
.nav > li {
	margin-left: 10px;
	margin-right: 10px;
}
.nav > li:hover {
	border-bottom: 2px solid #0EA8A3;
}

.sidebar {
	list-style: none;
	float: left;
	margin-top: -15px;
	padding-top: 0px;
	height: calc(100vh - 51px);
	width: 140px;
	background-color: #97CACA;
}

.side-item {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
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

.no-pad-mgn {
	padding: 0px;
	margin: 0px;
}

/* Start of the sections. */

.admin, .student, .teacher {
	min-width: 992px;
}

.head-tabs {
	display: flex;
	justify-content: center;
}

.activeTab {
	border-bottom: 2px solid #0EA8A3;
}

.tch-content {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 60px;
	color: #088480;
}

.stu-content {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 60px;
	color: #088480;
}

.admin-content {
	display: flex;
	justify-content: center;
	margin-top: 60px;
	color: #088480;
}

.btn-doChange {
	margin-top: 30px;
	border: 1px solid #0EA8A3;
	color: #E5F5F5;
	background-color: #0EA8A3;
}
.btn-doChange:hover {
	color: white;
	border: 1px solid #0c8a86;
	background-color: #0c8a86;
}
.btn-doChange:focus {
	color: #E5F5F5;
	background-color: #0EA8A3;
}

/* Lists*/

.userinfo {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-left: 0px;
}

.info {
	list-style: none;
	margin-bottom: 20px;
	display: inline-block;
	width: 100px;
	text-align: right;
}

.userdata {
	text-align: left;
	font-size: 20px;
	color: #505050;
	line-height: 20px;
}

.item {
	display: flex;
	color: #505050;
	border: 2px solid #E5F5F5;
	margin: 2px;
}

.titleItem {
	color: white;
	background-color: #0EA8A3;
	border: 1px solid #0EA8A3;
}

.listItem {
	display: flex;
	justify-content: flex-start;
}

.item-id, .item-index, .item-name, .item-sex, .item-position, .item-direction, .item-phone, .item-major, .item-classId, .item-phone, .item-state, .item-tutorId {
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 3px;
	height: 25px;
}

.item-index {
	width: 50px;
}

.item-id {
	width: 100px;
}

.item-name {
	width: 70px;
}

.item-sex {
	width: 30px;
}

.item-position {
	width: 50px;
}

.item-direction {
	width: 70px;
}

.item-phone {
	width: 140px;
}

.item-major {
	width: 70px;
}

.item-classId {
	width: 140px;
}

.item-phone {
	width: 140px;
}

.item-state {
	width: 50px;
}

.item-tutorId {
	width: 100px;
}

</style>
