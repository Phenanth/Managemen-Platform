<!DOCTYPE html>
<template>
	<div class="admin">

		<ul class="nav nav-tabs head-tabs">
			 <li role="presentation" v-bind:class="{ activeTab: isActive == 'profile' }" v-on:click="alterTab('profile')"><a>Profile</a></li>
			 <li role="presentation" v-bind:class="{ activeTab: isActive == 'safety' }" v-on:click="alterTab('safety')""><a>Safety</a></li>
		</ul>

		<div v-if=" presentTab == 'profile' " class="admin-content">
			<form class="form-horizontal">
				<div class="info-section form-group">
					<label for="" class="col-md-3 info">Name:</label>
					<div class="userdata">
						<span> {{ this.userdata.name }}</span>
					</div>
				</div>
				<div class="info-section form-group">
					<label for="" class="col-md-3 info">maxNum:</label>
					<div class="userdata">
						<span> {{ this.userdata.maxNum }}</span>
					</div>
				</div>
			</form>
		</div>
		<div v-else-if=" presentTab == 'safety' " class="admin-content">
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
		
	</div>
</template>
<script>
import api from '../../api.js'
import store from '../../store/index.js'
import router from '../../router/index.js'
export default {
	name: 'adminProfile',
	data: function() {
		return {
			presentTab: 'profile',
			userdata: {
				name: '',
				maxNum: ''
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
				this.userdata.maxNum = queried.maxNum
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

.info-section {
	width: 200px;
}

</style>