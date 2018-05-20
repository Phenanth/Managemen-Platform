# Management Platform

> A student and instructor management platform.

## Structure of The Project

index.html
	login.html
	(template.html)
		student.html
			stu-listOfIns.html
			stu-info.html
			subChange.html
		admin.html
			adm-listOfStu.html(The third process of accepting the submit of changing the instructor of a student.)
			adm-listOfIns.html
			adm-info.html
		teacher.html
			tch-listOfMyStu.html(The second process of accepting the submit of changing the instructor of a student.)
			tch-info.html

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

User including students, teachers, administrators can change their login password in their `info.html`.

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
