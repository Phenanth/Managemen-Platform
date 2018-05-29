<!DOCTYPE html>
<template>
	<div class="use">
		<h1>User {{ $route.params.id }}</h1>
		<!-- <button class="btn btn-default" v-on:click="console()">Console</button> -->
		<div v-if="isStudent">
			<router-link v-bind:to="studentProfilePath">/student/:id/profile</router-link>
			<router-link v-bind:to="studentViewOfTeacher">/student/:id/view-of-teacher</router-link>
		</div>
		<div v-else-if="isAdmin">
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
<style></style>
