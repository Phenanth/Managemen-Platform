<!DOCTYPE html>
<template>
	<div class="teacher">
		<!-- <h1>Teacher Student Handle</h1> -->
		<ul class="nav nav-tabs head-tabs">
			 <li role="presentation" v-bind:class="{ activeTab: isActive == 'list' }" v-on:click="alterTab('list')"><a>List</a></li>
			 <li role="presentation" v-bind:class="{ activeTab: isActive == 'delete' }" v-on:click="alterTab('delete')""><a>Delete</a></li>
		</ul>

		<div v-if=" presentTab == 'list' " class="stu-content">
			<ul class="example">
				<student-item class="titleItem" v-bind:index="'Index'" v-bind:item="titleItem" :display="false"></student-item>
				<student-item class="listItem" v-for="(item, index) in dataItems" v-bind:index="index + 1" v-bind:item="item" v-bind:key="item.id" :display="item.display"></student-item>
			</ul>
			<ul class="pager">
				<li><a href="#" v-on:click="formerPage()">Previous</a></li>
				<li><a href="#" v-on:click="nextPage()">Next</a></li>
			</ul>
		</div>
		<div v-else-if=" presentTab == 'delete' " class="stu-content">
			<form class="form-horizontal">
				<div class="form-group">
					<label class="col-md-5 control-label" name="oldPassword">Student Id:</label>
					<div class="col-md-7">
						<input type="text" class="form-control" placeholder="Student Id" v-model="alter.stuId">
					</div>
				</div>
				
				<button class="btn btn-primary btn-doChange" v-on:click="doChange()">Delete</button>
			</form>
		</div>
		<!-- <router-link to="/teacher">/teacher</router-link> -->
	</div>
</template>
<script>
import api from  './../../api.js'
import store from './../../store'
import router from '../../router'
export default {
	name: 'teacherStuHandle',
	data: function () {
		return {
			presentTab: 'list',
			dataItems: [],
			titleItem: {
				id: 'ID',
				name: 'Name',
				sex: 'Sex',
				major: 'Major',
				classId: 'Class ID',
				phone: 'Phone',
				state: 'State',
				tutorId: 'Tutor ID'
			},
			alter: {
				stuId: ''
			},
			page: {
				presentPage: 1,
				maxPage: 0
			}
		}
	},
	computed: {
		isActive: function () {
			return this.presentTab
		}
	},
	methods: {
		getData: function () {
			let opt = {
				tutorId: JSON.parse(store.getters.showTokenState).username,
				page: this.page.presentPage
			};
			api.myStudents(opt).then(({
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
				stuId: this.alter.stuId,
				tutorId: JSON.parse(store.getters.showTokenState).username
			}
			api.tutorDelete(opt).then(({
				data
			}) => {
				if (data.success) {
					alert('You have deleted ' + this.alter.stuId + ' from your tutor list.')
					router.go(0)
				} else {
					alert(data.message)
				}
			})
		}
	},
	mounted: function () {
		this.getData()
	}
}
</script>
<style>

li {
	list-style: none;
}

.teacher {
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

.stu-content {
	display: flex;
	flex-direction: column;
	align-items: center;
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

.titleItem {
	background-color: #0EA8A3;
	display: flex;
	justify-content: flex-start;
}

.listItem {
	display: flex;
	justify-content: flex-start;
}

.item {
	color: #505050;
	border: 2px solid #E5F5F5;
	margin: 2px;
}

.item-id, .item-index, .item-name, .item-sex, .item-major, .item-classId, .item-phone, .item-state, .item-tutorId {
	display: inline-block;
	margin: 3px;
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

.item-major {
	width: 70px;
}

.item-classId {
	width: 140px;
}

.item-phone {
	width: 140px;
}

.item-state {
	width: 50px;
}

.item-tutorId {
	width: 100px;
}

</style>
