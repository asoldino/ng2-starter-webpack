module.exports = buildSystem;

function buildSystem(projectAbsDir, config) {
	var _ = require('lodash');

    var config = _.defaults(config || {}, {
    	distFolder: 'dist',
    	coverageFolder: 'coverage',
    	devPort: 3000,

        webpack: {
        	configuration: require('./webpack.config.js')
        }
    });

	var gulp = require('gulp'),
	gutil = require('gulp-util'),
	webpack = require('webpack'),
	webpackDevServer = require('webpack-dev-server'),
	rimraf = require('gulp-rimraf');

	gulp.task('clean', function() {
		gulp.src([
				config.distFolder,
				config.coverageFolder
			], {read: false})
		.pipe(rimraf());
	});

	gulp.task('compile', function(done) {
		var webpackProject = webpack(config.webpack.configuration);

		webpackProject.run(function(err, stats) {
			if(err) throw new gutil.PluginError("webpack:build-dev", err);
			gutil.log("[webpack:build-dev]", stats.toString({
				colors: true
			}));
			done();
		});
	});

	gulp.task('dev-server', function(done) {
		var devServerConfiguration = Object.create(config.webpack.configuration);

		devServerConfiguration.devTool = 'eval';
		devServerConfiguration.debug = true;
		devServerConfiguration.output.path = projectAbsDir + '/' + config.webpack.configuration.output.path;

		console.log(devServerConfiguration);

		new webpackDevServer(webpack(devServerConfiguration), {
			stats: {
				colors: true
			}
		}).listen(config.devPort, "localhost", function(err) {
			if(err) throw new gutil.PluginError("webpack-dev-server", err);
			gutil.log("[webpack-dev-server]", 
				"http://localhost:' + config.devPort + '/webpack-dev-server/index.html");
		});
	});

	gulp.task('test', function(done) {
		var karma = require('karma');
		new karma.Server({
			configFile: __dirname + '/karma.conf.js',
			singleRun: true
		}, function(err) {
			if (err) process.exit(err);
			done();
		}).start();
	});

	return gulp;
}