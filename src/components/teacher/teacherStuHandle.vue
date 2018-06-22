<!DOCTYPE html>
<template>
	<div class="teacher">

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
				<li><a v-on:click="formerPage()">Previous</a></li>
				<li><a v-on:click="nextPage()">Next</a></li>
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

.example {
	height: 410px;
}

</style>
