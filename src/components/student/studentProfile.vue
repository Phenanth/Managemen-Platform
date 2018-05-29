<!DOCTYPE html>
<template>
	<div class="profile">
		<h1>Student Profile</h1>
		<!-- <router-link v-bind:to="indexPath">/student/:id</router-link> -->
	</div>
</template>
<script>
export default {
	name: 'studentProfile',
	data: function() {
		return {
			indexPath: '/student/' + this.$route.params.id
		}
	}
}
</script>
<style></style>