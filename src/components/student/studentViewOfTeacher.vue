<!DOCTYPE html>
<template>
	<div class="student">
		<!-- <h1>Student View Of Teacher</h1> -->
		<ul class="nav nav-tabs head-tabs">
			 <li role="presentation" v-bind:class="{ activeTab: isActive == 'list' }" v-on:click="alterTab('list')"><a>List</a></li>
			 <li role="presentation" v-bind:class="{ activeTab: isActive == 'submit' }" v-on:click="alterTab('submit')""><a>Submit</a></li>
		</ul>

		<div v-if=" presentTab == 'list' " class="stu-content">
			<ul class="example">
				<list-item v-for="(item, index) in dataItems" v-bind:index="index" v-bind:item="item"></list-item>
			</ul>
		</div>
		<div v-else-if=" presentTab == 'submit' " class="stu-content">
			<form class="form-horizontal">
				<div class="form-group">
					<label class="col-md-5 control-label" name="oldPassword">Tutor Id:</label>
					<div class="col-md-7">
						<input type="password" class="form-control" placeholder="Tutor Id" v-model="alter.tutorId">
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
import store from '../../store'
export default {
	name: 'studentViewOfTeacher',
	data: function () {
		return {
			presentTab: 'list',
			dataItems: [],
			state: ''
		}
	},
	computed: {
		isActive: function () {
			return this.presentTab
		}
	},
	methods: {
		alterTab: function (routes) {
			this.presentTab = routes
		}
	},
	mounted: function () {
		api.teacherData().then(({
			data
		}) => {
			if (data.success) {
				this.dataItems = data.result
			}
		})
	}
}
</script>
<style>
li {
	list-style: none;
}

.student {
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

.item {
	color: #505050;
	border: 2px solid #E5F5F5;
	margin: 2px;
}

.item-id, .item-index, .item-name, .item-sex, .item-position, .item-direction, .item-phone {
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