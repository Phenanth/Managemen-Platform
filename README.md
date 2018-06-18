# Management Platform

> A student and instructor management platform.

## Structure of The Project

index.html
	login.html
	(user.html)
		student.html
			stu-Profile.html
			logic:pswdChange
			stu-viewOfTeachers.html
			logic:subChange
		admin.html
			adm-Profile.html
			adm-listOfStu.html
			(The third process of accepting the submit of changing the instructor of a student. (May be deleted.))
			adm-listOfIns.html
		teacher.html
			tch-Profile.html
			tch-listOfMyStu.html
			(The second process of accepting the submit of changing the instructor of a student. (May be the last process since the admin role in this logic would not be necessary.))

## Router Example

index.html
	student?id=xxxxx/stu-list.html
	admin?id=xxxxx/adm-info.html
	teacher?id=xxxxx/tch-info.html

## Logic

### States

- Not Checked

Student don't have any instructor at the moment and their instructor can be altered,

- Not Formed

The submition of changing an instructor was accepted by the instructor but still need the admin to judge.

- Checked

Student choosed their instructor and can change it.

### Changing instructor

In the `stu-info.html`, student can go ot `subChange.html` to submit their new instructor.

1. Student submit change through `subChange.html` (State: not checked)
2. Instructor accept / reject the submition through `tch-listOfMyStu.html` (State: not formed)
3. Administrator accept / reject the submition through `adm-listOfStu.html` (State: checked)
4. Change submition successed.

### Others

User including students, teachers, administrators can change their login password in their `profile.html`.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Updates

### 18-05-20

Created the structure of the project and the style of login page in `Login.vue` file.

### 18-05-26

#### Worked on:

- Router design. (Some of the)
- Login page.

#### Some issues:

- The `TeacherProfile.vue` isn't working.

Even if I change the content of the component, or change the path of the component, it simply isn't working.
And when I was about to give up trying, I restarted the program then it was automatically fixed...*sign*.

#### Next Step

When I'm done with the database interaction, I will add the dynamic router.

### 18-05-29

#### Worked on:

- Router design.(Mostly the dynamic routing for student components)
- Login logic in the `dbHelper.js`

#### Next Step(s)

1. The creation of the localStorage (two options: 2 hours or 7 days)
2. The alert system of the `login.vue`
3. Page design of the `user.vue`
4. Dynamic routing for other pages like `admin.vue` and `teacher.vue`
5. User authentification using localStorage.
6. Other database logic like changing user's password.
7. (If any)

Too much work to do, I will choose some of them to complete next time.

#### Later this day

- Designed the layout of the `user.vue`

Need to add log out logic and the style of the active tab.

### 180531

#### Things I Worked On This Morning

- Dynamic routing for other pages like `admin.vue` and `teacher.vue`
- The alert of the `login.vue`
- The creation of the localStorage (two options: 2 hours or 7 days) BUT haven't checked yet.

I may work on User authentification using localStorage and other database logics later this day.

#### Later On The Course

- Check Token, but still part of it.

Problem: Can't add `api.isLogin()` in vue-store (token.js) or the router will not work, will always stay in the present page. Maybe I can add it into the part of interacting with database, but still want to add token check logic into the router itself.

Also need to add the role check and user check into token check.
`localStorage.setItem('user', username)`, `localStorage.setItem('role', role)`.

### 18-06-07

#### Worked On
- Added some part of router.

Not solved: Still can't push the page back immediately when route changes.
- Designed CSS of profile page.

### 18-06-09

#### Worked On:

- Added logic of getData and changePassword.

Later I may add these logic to admin page and teacher page, too. Afterwards maybe it's the alternative functions left to be solved.

### 18-06-10

#### Added

- Same logic to the admin and teacher section.

Also optimized the server part.

### 18-06-11

#### Altered

- CSS layout of `adminProfile.vue`

### 18-06-12

#### Worked On

- Some optimization of the CSS of the teacherProfile.vue and adminProfile.vue

- Added logic of teacherView.vue in student section

Next time I might be working on the component version of v-for in `view-of-tch.vue`. See the example In here: [Component version of v-for](https://cn.vuejs.org/v2/guide/list.html), check the todo-item part. (Maybe also the paging of the list, how many rows in one single page depends on the height of the component.)

### 18-06-14

#### Worked On

- Created component to display each member of a list.

Component `list-item` is in `/src/main.js`, I will add a prop so the button won't be rendered when the user already have a tutor.

- Logic of tutor choosing.

May need to add title for each column and optimize the CSS design, and the disable style isn't finished.

#### Next Steps

- Paging of the list of tutors.

- Disable the choosed student from choosing new tutors.

- Find some icons to decorate the webpage.


### 18-06-17

#### Worked On

- Added pages of each section

- Devide component to two sub-components

#### Next 

- Paging

Add paging for all the list pages. ( Also sorting, if possible.)

- Optimize the component

So the sub button would be visible if only present user is a student and his/her state is not checked or haven't choose one and isn't a title.

And the Check button would be visible if only the state of the student is 'not checked' and the role is teacher, also not a title.

- Add 'Delete' logic of each section.

Alter the database, add 'delete' column and the logic of set delete column with true to present delete a student or teacher.

- Optimize the CSS style of whole website.

Such as adding icons for the web, adding icons for the page, re-design the list items... and so on.

#### Later This Day

- Optimized the components

The buttons of the two components can be optional visible, after the optimization. 

I exactlly want the page to refresh after the checkStudent operation, but I haven't found the method to do it yet, and I think the judgement of where the button is visible shouldn't be done in the server, but There isn't any other way to call the /api/myStudent function so I think it will be like now until I find something is wrong.

### 18-06-18

#### Worked On

- Added paging of the lists.

- Added delete logic (admin and teacher)
