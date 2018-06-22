<!DOCTYPE html>
<template>
	<div class="student">

		<ul class="nav nav-tabs head-tabs">
			 <li role="presentation" v-bind:class="{ activeTab: isActive == 'list' }" v-on:click="alterTab('list')"><a>List</a></li>
			 <li role="presentation" v-bind:class="{ activeTab: isActive == 'submit' }" v-on:click="alterTab('submit')""><a>Submit</a></li>
		</ul>

		<div v-if=" presentTab == 'list' " class="tch-content">
			<ul class="example">
				<teacher-item class="titleItem" v-bind:index="'Index'" v-bind:item="titleItem" :display="false"></teacher-item>
				<teacher-item v-for="(item, index) in dataItems" v-bind:index="index + (page.presentPage - 1) * 10 + 1" v-bind:item="item" v-bind:key="item.id" :display="display"></teacher-item>
			</ul>
			<ul class="pager">
				<li><a v-on:click="formerPage()">Previous</a></li>
				<li><a v-on:click="nextPage()">Next</a></li>
			</ul>
		</div>
		<div v-else-if=" presentTab == 'submit' " class="tch-content">
			<form class="form-horizontal">
				<div class="form-group">
					<label class="col-md-5 control-label" name="oldPassword">Tutor Id:</label>
					<div class="col-md-7">
						<input type="text" class="form-control" placeholder="Tutor Id" v-model="alter.tutorId">
					</div>
				</div>
				
				<button class="btn btn-primary btn-doChange" v-on:click="doChange()">Submit</button>
			</form>
		</div>
		
	</div>
</template>
<script>
import api from '../../api.js'
import store from '../../store'
export default {
	name: 'studentViewOfTeacher',
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
			state: '',
			page: {
				presentPage: 1,
				maxPage: 0
			}
		}
	},
	computed: {
		isActive: function () {
			return this.presentTab
		},
		display: function () {
			let state = JSON.parse(store.getters.showTutorState).state
			if (state == '待定' || state == '未选') {
				return true
			} else {
				return false
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
		doChange: function () {
			let state = JSON.parse(store.getters.showTutorState).state
			if (state == '待定' || state == '未选') {
				let opt = {
					id: JSON.parse(store.getters.showTokenState).username,
					tutorId: this.alter.tutorId
				}
				api.changeTutor(opt).then(({
					data
				}) => {
					if (data.success) {
						alert('You have choosed ' + this.alter.tutorId + ' as your tutor.')
					} else {
						alert(data.message)
					}
				})
			} else {
				alert('You already choosed your tutor.')
			}
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
		}
	},
	created: function () {
		//this.getPages()
		this.getData()
	}
}
</script>
<style>

.example {
	height: 440px;
}

</style>