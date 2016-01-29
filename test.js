// Testing the gulp exported tasks

module.exports = {
	'gulpNumberOfTasks': testGulpNumberOfTasks,
	'gulpNameOfTasks': testGulpNameOfTasks
}

function testGulpNumberOfTasks(test) {
	var gulp = require('./index.js')();

	test.expect(1);

	test.equal(Object.keys(gulp.tasks).length, 3, "3 Tasks expected");

	test.done();
}

function testGulpNameOfTasks(test) {
	var gulp = require('./index.js')();

	test.expect(3);

	var taskNames = Object.keys(gulp.tasks);

	test.ok(taskNames.indexOf('compile') > -1);
	test.ok(taskNames.indexOf('test') > -1);
	test.ok(taskNames.indexOf('dev-server') > -1);

	test.done();
}