// Testing the gulp exported tasks

module.exports = {
	'gulpNumberOfTasks': testGulpNumberOfTasks,
	'gulpNameOfTasks': testGulpNameOfTasks
}

function testGulpNumberOfTasks(test) {
	var gulp = require('./index.js')();

	test.expect(1);

	test.equal(Object.keys(gulp.tasks).length, 4, "4 Tasks expected");

	test.done();
}

function testGulpNameOfTasks(test) {
	var gulp = require('./index.js')();

	test.expect(4);

	var taskNames = Object.keys(gulp.tasks);

	// I have the clean task configured
	test.ok(taskNames.indexOf('clean') > -1);
	// and so on...
	test.ok(taskNames.indexOf('compile') > -1);
	test.ok(taskNames.indexOf('test') > -1);
	test.ok(taskNames.indexOf('dev-server') > -1);

	test.done();
}