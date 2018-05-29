<!DOCTYPE html>
<template>
	<div>
		<h1>Student View Of Teacher</h1>
		<!-- <router-link v-bind:to="indexPath">/student/:id</router-link> -->
	</div>
</template>
<script>
export default {
	name: 'studentViewOfTeacher',
	data: function () {
		return {
			indexPath: '/student/' + this.$route.params.id
		}
	}
}
</script>
<style></style>