// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import api from './api.js'

Vue.config.productionTip = false

Vue.component('teacher-item', {
	props: ['index', 'item'],
	template: '<div class="item"><div class="item-index">{{ index + 1 }}</div><div class="item-id">{{ item.id }}</div><div class="item-name">{{ item.name}}</div><div class="item-sex">{{ item.sex }}</div><div class="item-position">{{ item.position }}</div><div class="item-direction">{{ item.direction }}</div><div class="item-phone">{{ item.phone }}</div><button v-on:click="subTutor(item.id)">Sub</button></div>',
	methods: {
		subTutor: function (tutorId) {
			let state = JSON.parse(store.getters.showTutorState).state
			if (state == '待定' || state == '未选') {
				let opt = {
					id: JSON.parse(store.getters.showTokenState).username,
					tutorId: tutorId
				}
				api.changeTutor(opt).then(({
					data
				}) => {
					if (data.success) {
						alert('You have choosed ' + tutorId + ' as your tutor.')
					} else {
						alert(data.message)
					}
				})
			} else if (state == '选定') {
				alert('You already choosed tutor.')
			} 
		}
	}
})

Vue.component('student-item', {
	props: ['index', 'item'],
	template: '<div class="item"><div class="item-index">{{ index + 1 }}</div><div class="item-id">{{ item.id }}</div><div class="item-name">{{ item.name }}</div><div class="item-sex">{{ item.sex }}</div><div class="item-major">{{ item.major }}</div><div class="item-classId">{{ item.classId }}</div><div class="item-phone">{{ item.phone }}</div><div class="item-state">{{ item.state }}</div><div class="item-tutorId">{{ item.tutorId }}</div><button v-on:click="checkStudent(item.id)">Check</button></div>',
	methods: {
		checkStudent: function (id) {
			api.checkStudent(opt).then(({
				data
			}) => {
				if (data.success) {
					alert('You have checked ' + id + ' successfully.')
					this.$route.go(0)
				} else {
					alert(data.message)
				}
			})
		}
	}
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
