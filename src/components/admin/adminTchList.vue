<!DOCTYPE html>
<template>
	<div class="admin">

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
				<li><a v-on:click="formerPage()">Previous</a></li>
				<li><a v-on:click="nextPage()">Next</a></li>
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

.example {
	height: 410px;
}

</style>