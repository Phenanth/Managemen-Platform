<!DOCTYPE html>
<template>
	<div class="student">
		<!-- <h1>Student Profile</h1> -->
		<ul class="nav nav-tabs head-tabs">
			 <li role="presentation" v-bind:class="{ activeTab: isActive == 'profile' }" v-on:click="alterTab('profile')"><a>Profile</a></li>
			 <li role="presentation" v-bind:class="{ activeTab: isActive == 'safety' }" v-on:click="alterTab('safety')""><a>Safety</a></li>
		</ul>

		<div v-if=" presentTab == 'profile' " class="stu-content">
			<form class="form-horizontal">
				<div class="form-group">
					<label for="" class="col-md-4 info">Name:</label>
				</div>
				<div class="form-group">
					<label for="" class="col-md-4 info">Sex:</label>
				</div>
				<div class="form-group">
					<label for="" class="col-md-4 info">Major:</label>
				</div>
				<div class="form-group">
					<label for="" class="col-md-4 info">Class Id:</label>
				</div>
				<div class="form-group">
					<label for="" class="col-md-4 info">Phone</label>
				</div>
				<div class="form-group">
					<label for="" class="col-md-4 info">State:</label>
				</div>
				<div class="form-group">
					<label for="" class="col-md-4 info">Tutor Id:</label>
				</div>
			</form>
		</div>
		<div v-else-if=" presentTab == 'safety' " class="stu-content">
			<form class="form-horizontal">
				<div class="form-group">
					<label class="col-md-5 control-label" name="oldPassword">Old Password:</label>
					<div class="col-md-7">
						<input type="password" class="form-control" placeholder="Old Password">
					</div>
				</div>
				<div class="form-group">
					<label class="col-md-5 control-label" name="newPassword">New Password:</label>
					<div class="col-md-7">
						<input type="password" class="form-control" placeholder="New Password">
					</div>
				</div>
				<div class="form-group">
					<label class="col-md-5 control-label" name="checkPassword">Check Password:</label>
					<div class="col-md-7">
						<input type="password" class="form-control" placeholder="Check the New Password">
					</div>
				</div>
				<button class="btn btn-primary btn-doChange" v-on:click="doChange()">Submit</button>
			</form>
		</div>
		<!-- <router-link v-bind:to="indexPath">/student/:id</router-link> -->
	</div>
</template>
<script>
export default {
	name: 'studentProfile',
	data: function() {
		return {
			presentTab: 'profile'
		}
	},
	computed: {
		isActive: function () {
			let active = ''
			if (this.presentTab == 'profile') {
				active = 'profile'
			} else if (this.presentTab == 'safety') {
				active = 'safety'
			}
			return active
		}
	},
	methods: {
		alterTab: function (routes) {
			this.presentTab = routes
		},
		doChange: function() {

		}
	},
	mounted: function () {
	}
}
</script>
<style>
.nav-tabs {
	border-bottom: 1px solid #78bfba;
}
.nav > li > a {
	padding-left: 35px;
	padding-right: 32px;
}
.nav > li > a:hover {
	background-color: #E5F5F5;
}
.nav > li {
	margin-left: 10px;
	margin-right: 10px;
}
.nav > li:hover {
	border-bottom: 2px solid #0EA8A3;
}
.head-tabs {
	display: flex;
	justify-content: center;
}
.activeTab {
	border-bottom: 2px solid #0EA8A3;
}

.stu-content {
	display: flex;
	justify-content: center;
	margin-top: 60px;
	color: #088480;
}

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
.btn-doChange  {
	margin-top: 30px;
}

</style>