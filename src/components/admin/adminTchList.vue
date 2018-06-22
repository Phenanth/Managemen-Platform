<!DOCTYPE html>
<template>
	<div class="admin">
		<!-- <h1>Admin Teacher List</h1> -->
		<ul class="nav nav-tabs head-tabs">
			 <li role="presentation" v-bind:class="{ activeTab: isActive == 'list' }" v-on:click="alterTab('list')"><a>List</a></li>
			 <li role="presentation" v-bind:class="{ activeTab: isActive == 'delete' }" v-on:click="alterTab('delete')""><a>Delete</a></li>
		</ul>

		<div v-if=" presentTab == 'list' " class="tch-content">
			<ul class="example">
				<teacher-item class="titleItem" v-bind:index="'Index'" v-bind:item="titleItem" :display="false"></teacher-item>
				<teacher-item v-for="(item, index) in dataItems" v-bind:index="index + (page.presentPage - 1) * 10 + 1" v-bind:item="item" v-bind:key="item.id" :display="false"></teacher-item>
			</ul>
			<ul class="pager">
				<li><a href="#" v-on:click="formerPage()">Previous</a></li>
				<li><a href="#" v-on:click="nextPage()">Next</a></li>
			</ul>
		</div>
		<div v-else-if=" presentTab == 'delete' " class="stu-content">
			<form class="form-horizontal">
				<div class="form-group">
					<label class="col-md-5 control-label" name="oldPassword">Teacher Id:</label>
					<div class="col-md-7">
						<input type="text" class="form-control" placeholder="Teacher Id" v-model="alter.tutorId">
					</div>
				</div>
				
				<button class="btn btn-primary btn-doChange" v-on:click="doChange()">Delete</button>
			</form>
		</div>
		<!-- <router-link to="/admin">/admin</router-link> -->
	</div>
</template>
<script>
import api from '../../api.js'
import router from '../../router'
export default {
	name: 'adminTchList',
	data: function () {
		return {
			presentTab: 'list',
			dataItems: [],
			titleItem: {
				id: 'ID',
				name: 'Name',
				sex: 'Sex',
				position: 'Position',
				direction: 'Direction',
				phone: 'Phone'
			},
			alter: {
				tutorId: ''
			},
			page: {
				presentPage: 1,
				maxPage: 0
			}
		}
	},
	methods: {
		getData: function () {
			let opt = {
				page: this.page.presentPage
			}
			api.teacherData(opt).then(({
				data
			}) => {
				if (data.success) {
					this.dataItems = data.result
					this.page.maxPage = data.maxPage
				}
			})
		},
		alterTab: function (routes) {
			this.presentTab = routes
		},
		formerPage: function () {
			if (this.page.presentPage > 1) {
				this.page.presentPage = this.page.presentPage - 1
				this.getData()
			} else {
				alert('This is the first page.')
			}

		},
		nextPage: function () {
			if (this.page.maxPage > this.page.presentPage) {
				this.page.presentPage = this.page.presentPage + 1
				this.getData()
			} else {
				alert('You have reached the last page.')
			}
		},
		doChange: function () {
			let opt = {
				id: this.alter.tutorId,
				role: 'teacher'
			}
			api.deleteUser(opt).then(({
				data
			}) => {
				if (data.success) {
					alert('You have deleted user ' + this.alter.tutorId + ' successfully.')
					router.go(0)
				} else {
					alert(data.message)
				}
			})
		}
	},
	computed: {
		isActive: function () {
			return this.presentTab
		}
	},
	created: function () {
		this.getData()
	}
}
</script>
<style>

li {
	list-style: none;
}

.admin {
	min-width: 992px;
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

.example {
	height: 410px;
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

.item-id, .item-index, .item-name, .item-sex, .item-position, .item-direction, .item-phone {
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

</style>