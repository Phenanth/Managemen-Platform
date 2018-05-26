<!DOCTYPE html>
<template>
	<div class="use">
		<h1>User</h1>
		<div v-if="isStudent">
			<router-link to="/student/profile">/student/profile</router-link>
			<router-link to="/student/view-of-teacher">/student/view-of-teacher</router-link>
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
		}
	},
	// Will be optimized to use localStorage in the future.
	computed: {
		isStudent: function () {
			return this.$route.path =='/student'
		},
		isAdmin: function () {
			return this.$route.path == '/admin'
		},
		isTeacher: function() {
			return this.$route.path == '/teacher'
		}
	}
}
</script>
<style></style>
