'use strict'

const Express = require('express');
const router = Express.Router();
const db = require('./connect.js');
const createToken = require('../middleware/createToken.js');
const checkToken = require('../middleware/checkToken.js');

const Login = (req, res) => {

	let table;
	let validTime;
	let queryString = {
		sql: 'SELECT password AS solution FROM ? WHERE id=? AND deleted=false',
		values: [req.body.username],
		timeout: 40000
	};

	if (req.body.willStore) {
		validTime = '168h';
	} else {
		validTime = '10s';
	}

	if (req.body.role == 'student') {
		queryString.sql = 'SELECT password AS solution FROM students WHERE id=?  AND deleted=false'
	} else if (req.body.role == 'admin') {
		queryString.sql = 'SELECT password AS solution FROM manager WHERE id=?'
	} else if (req.body.role == 'teacher') {
		queryString.sql = 'SELECT password AS solution FROM teacher WHERE id=?  AND deleted=false'
	}

	db.query(queryString, function(error, results, fields) {
		if (error) {
			console.log(error);
		}
		if (results) {
			let path = '/' + req.body.role + '/' + req.body.username;
			if (req.body.password == results[0].solution) {
				console.log('Operation: Login, State: 200');
				res.json({
					info: 200,
					success: true,
					path: path,
					token: createToken(req.body.username, validTime)
				});		
			} else {
				console.log('Operation: Login, State: 304, Message: Wrong password.');
				res.json({
					info: 304,
					success: false,
					message: 'Wrong password.'
				});
			}
		} else {
			console.log('Operation: Login, State: 404, Message: User not existed.');
			res.json({
				info: 404,
				success: false,
				message: 'User not exists.'
			});
		}
	});
};

const UserData = (req, res) => {

	let queryString = {
		sql: 'SELECT id, name, sex, major, classId, phone, state, tutorId from ? where id=?',
		values: [req.body.username],
		timeout: 40000
	};

	if (req.body.role == 'student') {
		queryString.sql = 'SELECT id, name, sex, major, classId, phone, state, tutorId FROM students WHERE id=?'
	} else if (req.body.role == 'admin') {
		queryString.sql = 'SELECT id, name, maxNum FROM manager WHERE id=?'
	} else if (req.body.role == 'teacher') {
		queryString.sql = 'SELECT id, name, sex, position, direction, phone FROM teacher WHERE id=?'
	}

	db.query(queryString, function(error, results, fields) {
		let result = results[0];
		console.log("Operation: Data, State: 200");
		if (req.body.role == 'student') {
			res.json({
				info: 200,
				success: true,
				queried: {
					id: result.id,
					name: result.name,
					sex: result.sex,
					major: result.major,
					classId: result.classId,
					phone: result.phone,
					state: result.state,
					tutorId: result.tutorId
				}
			});
		} else if (req.body.role == 'admin') {
			res.json({
				info: 200,
				success: true,
				queried: {
					id: result.id,
					name: result.name,
					maxNum: result.maxNum
				}
			});
		} else if (req.body.role == 'teacher') {
			res.json({
				info: 200,
				success: true,
				queried: {
					id: result.id,
					name: result.name,
					sex: result.sex,
					position: result.position,
					direction: result.direction,
					phone: result.phone
				}
			});
		}
	});

};

const ChangePassword = (req, res) => {

	let queryString = {
		sql: 'SELECT password AS solution FROM ? WHERE id = ?',
		values: [req.body.username],
		timeout: 40000
	};
	let queryString2 ={
		sql: 'UPDATE ? SET password=? WHERE id=?',
		values: [req.body.newPassword, req.body.username],
		timeout: 40000
	};

	if (req.body.role == 'student') {
		queryString.sql = 'SELECT password AS solution FROM students WHERE id=?'
		queryString2.sql = 'UPDATE students SET password=? WHERE id=?'
	} else if (req.body.role == 'admin') {
		queryString.sql = 'SELECT password AS solution FROM manager WHERE id=?'
		queryString2.sql = 'UPDATE manager SET password=? WHERE id=?'
	} else if (req.body.role == 'teacher') {
		queryString.sql = 'SELECT password AS solution FROM teacher WHERE id=?'
		queryString2.sql = 'UPDATE teacher SET password=? WHERE id=?'
	}

	db.query(queryString, function (error, results, fields) {
		if (results[0].solution != req.body.oldPassword) {
			console.log('Operation: Change Password, State: 404, Message: Wrong former password.');
			res.json({
				info: 404,
				success: false,
				message: 'Wrong former password.'
			});
		} else {
			db.query(queryString2, function (error, results, fields) {
				console.log ('Operation: Change Password, state: 200');
				res.json({
					info: 200,
					success: true,
					message: 'Password changed, please re-login.'
				});
			});
			
		}
	});
	
};

const TeacherData = (req, res) => {

	let queryString = {
		sql: 'SELECT * from teacher WHERE deleted=false LIMIT ?, ?',
		values: [(req.body.page - 1) * 10, (req.body.page - 1) * 10 + 10],
		timeout: 40000
	};

	db.query(queryString, function (error, results, fields) {
		if (error) {
			console.log(error);
		} else {
			console.log('Operation: Teacher Data, State: 200');
			let queryString2 = {
				sql: 'SELECT count(DISTINCT id) AS solution FROM teacher WHERE deleted=false',
				timeout: 40000
			}; 
			db.query(queryString2, function(error2, results2, fields2) {
				if (error2) {
					console.log(error2);
				} else {
					res.json({
						info: 200,
						success: true,
						result: results,
						maxPage: Math.floor(results2[0].solution / 10) + 1
					});
				}
			})
			
		}
	});

};

const StudentData = (req, res) => {

	let queryString = {
		sql: 'SELECT * from students WHERE deleted=false LIMIT ?, ?',
		values: [(req.body.page - 1) * 10, (req.body.page - 1) * 10 + 10],
		timeout: 40000
	};

	db.query(queryString, function (error, results, fields) {
		if (error) {
			console.log(error);
		} else {
			console.log('Operation: Student Data, State: 200');
			let queryString2 = {
				sql: 'SELECT count(DISTINCT id) AS solution from students  WHERE deleted=false',
				timeout: 40000
			};
			db.query(queryString2, function (error2, results2, fields2) {
				res.json({
					info: 200,
					success: true,
					result: results,
					maxPage: Math.floor(results2[0].solution / 10) + 1
				});
			});
			
		}
	});

} ;

const MyStudents = (req, res) => {

	let queryString = {
		sql: 'SELECT * FROM students WHERE tutorId=? AND deleted=false LIMIT ?, ?',
		values: [req.body.tutorId, (req.body.page - 1) * 10, (req.body.page - 1) * 10 + 10],
		timeout: 40000
	};

	db.query(queryString, function (error, results, fields) {
		if (error) {
			console.log(error);
		} else {
			let resultT = [];
			console.log('Operation: My Student, State: 200');
			for (var i = 0; i < results.length; i++) {
				let temp = {
					id: results[i].id,
					name: results[i].name,
					sex: results[i].sex,
					major: results[i].major,
					classId: results[i].classId,
					phone: results[i].phone,
					state: results[i].state,
					tutorId: results[i].tutorId,
					display: false
				};
				if (results[i].state != '选定') {
					temp.display = true;
				}
				resultT.push(temp);
			}
			res.json({
				info: 200,
				success: true,
				result: resultT
			});
		}
	});

};

const ChangeTutor = (req, res) => {

	let queryString = {
		sql: 'UPDATE students SET tutorId=?,state=\'待定\' WHERE id=?',
		values: [req.body.tutorId, req.body.id],
		timeout: 40000
	};

	db.query(queryString, function (error, results, fields) {
		if (error) {
			console.log(error);
			res.json({
				info: 304,
				success: false,
				message: 'Database Error.'
			});
		} else {
			console.log('Operation Change Tutor, State: 200');
			res.json({
				info: 200,
				success: true
			});
		}
	});

};

const CheckStudent = (req, res) => {

	let queryString = {
		sql: 'UPDATE students SET state=\'选定\' WHERE id=?',
		values: [req.body.id],
		timeout: 40000
	};

	db.query(queryString, function (error, results, fields) {
		if (error) {
			console.log(error);
			res.json({
				info: 304,
				success: false,
				message: 'Database Error.'
			});
		} else {
			console.log('Operation: Check Student, State: 200');
			res.json({
				info: 200,
				success: true
			});
		}
	});

};

const DeleteUser = (req, res) => {

	let queryString = {
		sql: 'UPDATE SET deleted=true WHERE id=? AND deleted=false',
		values: [req.body.id],
		timeout: 40000
	};

	let queryString2 = {
		sql: 'SELECT id from WHERE id=?',
		values: [req.body.id],
		timeout: 40000
	};

	if (req.body.role == 'student') {
		queryString.sql = 'UPDATE students SET deleted=true WHERE id=?';
		queryString2.sql = 'SELECT id AS solution from students WHERE id=?  AND deleted=false'
	} else if (req.body.role == 'teacher') {
		queryString.sql = 'UPDATE teacher SET deleted=true WHERE id=?';
		queryString2.sql = 'SELECT id AS solution from teacher WHERE id=?  AND deleted=false'
	}

	db.query(queryString2, function (error2, results2, fields2) {
		if (error2) {
			console.log(error2);
		} else {
			if (results2[0]) {
				db.query(queryString, function (error, results, fields) {
					if (error) {
						console.log(error);
					} else {
						console.log('Operation: Delete User, State: 200');
						res.json({
							info: 200,
							success: true
						});
					}
				});
			} else {
				console.log('Operation: Delete User, State: 404, Message: User not found');
				res.json({
					info: 404,
					success: false,
					message: 'User not found.'
				});
			}
		}
	});


};

const TutorDelete = (req, res) => {
	let queryString = {
		sql: 'SELECT id FROM students WHERE id=? AND deleted=false AND tutorId=?',
		values: [req.body.stuId, req.body.tutorId],
		timeout: 40000
	};
	let queryString2 = {
		sql: 'UPDATE students SET tutorId=NULL, state=\'未选\' WHERE id=?',
		values: [req.body.stuId],
		timeout: 40000
	};

	db.query(queryString, function (error, results, fields) {
		if (error) {
			console.log(error);
		} else if (results[0]) {
			db.query(queryString2, function (error2, results2, fields2) {
				console.log('Operation: Tutor Delete, State: 200');
				res.json({
					info: 200,
					success: true
				});
			});
		} else {
			console.log('Operation: Tutor Delete, State: 304, Message: Iuput Error.');
			res.json({
				info: 304,
				success: false,
				message: 'User not exists, or isn`t in your tutor list.'
			});
		}
	});

}

module.exports = (router) => {

	router.post('/login', Login);

	router.post('/userData', UserData);

	router.post('/changePassword', ChangePassword);

	router.post('/teacherData', TeacherData);

	router.post('/studentData', StudentData);

	router.post('/myStudents', MyStudents);

	router.post('/changeTutor', ChangeTutor);

	router.post('/checkStudent', CheckStudent);

	router.post('/deleteUser', DeleteUser);

	router.post('/tutorDelete', TutorDelete);

}
