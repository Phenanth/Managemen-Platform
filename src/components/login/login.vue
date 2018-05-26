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
					<input type="text" class="form-control" placeholder="ID">
				</div>
				<div class="input form-group">
					<label for="input-pw">Password</label>
					<input type="password" class="form-control" placeholder="Password">
				</div>
				<div class="radio">
					<label for="student">
						<input type="radio" name="role" id="student">
						Student
					</label>
					<label for="Teacher">
						<input type="radio" name="role" id="teacher">
						Teacher
					</label>
					<label for="Admin">
						<input type="radio" name="role" id="admin">
						Admin
					</label>
				</div>
				<div class="checkbox">
					<label>
						<input type="checkbox">Remember me in 7 days.
					</label>
				</div>
				<button type="button" class="btn-login btn btn-primary">Login</button>
			</form>
		</div>
		<hr>
		<div class="ft">C.F.: Charllote</div>
	</div>
</template>
<script>
export default {
	name: 'Login'
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