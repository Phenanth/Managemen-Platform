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
					<div class="userdata">
						<span> {{ this.userdata.name }}
					</span></div>
				</div>
				<div class="form-group">
					<label for="" class="col-md-4 info">Sex:</label>
					<div class="userdata">
						<span class="userdata"> {{ this.userdata.sex }}</span></div>
					</div>
				<div class="form-group">
					<label for="" class="col-md-4 info">Major:</label>
					<div class="userdata">
						<span class="userdata"> {{ this.userdata.major }}</span></div>
					</div>
				<div class="form-group">
					<label for="" class="col-md-4 info">Class Id:</label>
					<div class="userdata">
						<span class="userdata"> {{ this.userdata.classId }}</span>
					</div>
				</div>
				<div class="form-group">
					<label for="" class="col-md-4 info">Phone</label>
					<div class="userdata">
						<span class="userdata"> {{ this.userdata.phone }}</span></div>
					</div>
				<div class="form-group">
					<label for="" class="col-md-4 info">State:</label>
					<div class="userdata">
						<span class="userdata"> {{ this.userdata.state }}</span>
					</div>
				</div>
				<div class="form-group">
					<label for="" class="col-md-4 info">Tutor Id:</label>
					<span class="userdata"> {{ this.userdata.tutorId }}</span>
				</div>
			</form>
		</div>
		<div v-else-if=" presentTab == 'safety' " class="stu-content">
			<form class="form-horizontal">
				<div class="form-group">
					<label class="col-md-5 control-label" name="oldPassword">Old Password:</label>
					<div class="col-md-7">
						<input type="password" class="form-control" placeholder="Old Password" v-model="alter.oldPassword">
					</div>
				</div>
				<div class="form-group">
					<label class="col-md-5 control-label" name="newPassword">New Password:</label>
					<div class="col-md-7">
						<input type="password" class="form-control" placeholder="New Password" v-model="alter.newPassword">
					</div>
				</div>
				<div class="form-group">
					<label class="col-md-5 control-label" name="checkPassword">Check Password:</label>
					<div class="col-md-7">
						<input type="password" class="form-control" placeholder="Check the New Password" v-model="alter.checkPassword">
					</div>
				</div>
				<button class="btn btn-primary btn-doChange" v-on:click="doChange()">Submit</button>
			</form>
		</div>
		<!-- <router-link v-bind:to="indexPath">/student/:id</router-link> -->
	</div>
</template>
<script>
import api from '../../api.js'
import store from '../../store/index.js'
import router from '../../router/index.js'
export default {
	name: 'studentProfile',
	data: function() {
		return {
			presentTab: 'profile',
			userdata: {
				name: '',
				sex: '',
				major: '',
				classId: '',
				phone: '',
				state: '',
				tutorId: ''
			},
			alter: {
				oldPassword: '',
				newPassword: '',
				checkPassword: ''
			}
		}
	},
	mounted: function () {
		let token = JSON.parse(store.getters.showTokenState)
		let opt = {
			username: token.username,
			role: token.role
		}
		api.getData(opt).then(({
			data
		}) => {
			if (data.success) {
				let queried = data.queried
				this.userdata.name = queried.name
				this.userdata.sex = queried.sex
				this.userdata.major = queried.major
				this.userdata.classId = queried.classId
				this.userdata.phone = queried.phone
				this.userdata.state = queried.state
				this.userdata.tutorId = queried.tutorId
			}
		})
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
			if (this.alter.checkPassword != '' && this.alter.checkPassword == this.alter.newPassword) {
				let token = JSON.parse(store.getters.showTokenState)
				let opt = {
					username: token.username,
					role: token.role,
					oldPassword: this.alter.oldPassword,
					newPassword: this.alter.newPassword,
				}
				api.changePassword(opt).then(({
					data
				}) => {
					alert(data.message)
					if (data.success) {
						store.dispatch('logout')
						router.go(0)
						router.push('/')
					}
				})
			} else {
				alert('Please check the inputs.')
			}
		}
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

.userdata {
	text-align: left;
	font-size: 20px;
	color: #505050;
	line-height: 20px;
}

.btn-doChange  {
	margin-top: 30px;
}

</style>