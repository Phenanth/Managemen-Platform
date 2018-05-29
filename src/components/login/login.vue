<!DOCTYPE html>
<template>
	<div class="login container-fluid">
		<div class="hd navbar-header row">
			<i class="col-md-offset-3 col-md-4 fa fa-angle-right fa-3x"></i>
			<!-- <span class="col-md-offset-3 col-md-4">Icon</span> -->
			<span class="col-md-5">Login</span>
		</div>
		<hr>
		<div class="cnt">
			<form>
				<div class="input form-group">
					<label for="input-id">ID</label>
					<input type="text" class="form-control" placeholder="ID" v-model="username">
				</div>
				<div class="input form-group">
					<label for="input-pw">Password</label>
					<input type="password" class="form-control" placeholder="Password" v-model="password">
				</div>
				<div class="radio">
					<label for="student">
						<input type="radio" value="student" id="student" v-model="role">
						Student
					</label>
					<label for="Teacher">
						<input type="radio" value="teacher" id="teacher" v-model="role">
						Teacher
					</label>
					<label for="Admin">
						<input type="radio" value="admin" id="admin" v-model="role">
						Admin
					</label>
				</div>
				<div class="checkbox">
					<label>
						<input type="checkbox" value="true" v-model="willStore">Remember me in 7 days.
					</label>
				</div>
				<button type="button" class="btn-login btn btn-primary" v-on:click="login()">Login</button>
			</form>
		</div>
		<hr>
		<div class="ft">C.F.: Charllote</div>
	</div>
</template>
<script>
import api from '../../api.js'
export default {
	name: 'Login',
	data: function () {
		return {
			username: '',
			password: '',
			role: '',
			willStore: false
		}
	},
	methods: {
		login: function () {
			if (this.username != '' && this.password != '' && this.role != '') {
				let opt = {
					username: this.username,
					password: this.password,
					role: this.role,
					willStore: this.willStore
				}
				api.doLogin(opt).then(({
					data
				}) => {
					if (data.info == 200) {
						// Authentificated role will be transfered from the server, this is just the test version.
						this.$router.push(data.path);
					}
				})
			} else {
				alert('Fill the blanks please.')
			}
		}
	}
}
</script>
<style>
.login {
	width: 70%;
	height: 100%;
}
.hd {
}
.cnt {
	padding: 40px;
	display: flex;
	justify-content: center;
	height: 500px;
}
.input {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	width: 300px;
	margin: 30px;
}
.btn-login {
	width: 300px;
}
.ft {
	display: flex;
	color: #2c3e50;
	justify-content: flex-end;
	bottom: 0px;
}
</style>