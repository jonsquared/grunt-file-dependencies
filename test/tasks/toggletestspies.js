module.exports = function(grunt) {
	grunt.registerTask(
		'toggletestspies',
		'toggle test spies', 
		function() {
			var spiesEnabled = grunt.config.get('_spiesEnabled');
			if (spiesEnabled) {
				grunt.fail.fatal = grunt.config.get('_fatalFailure');
				grunt.log.writeln = grunt.config.get('_writeln');
			} else {
				grunt.config.set('_fatalFailure',grunt.fail.fatal);
				grunt.fail.fatal = function(message) {
					message = 'Fatal error: '+message;
					grunt.log.writeln(message['red']);
					message = grunt.log.uncolor(message);
					var task = grunt.task.current,
						errorsConfig = task.name+'.'+task.target+'.'+'errors',
						errors = grunt.config.get(errorsConfig) || [];
					errors.push(message);
					grunt.config.set(errorsConfig,errors);
				}

				grunt.config.set('_writeln',grunt.log.writeln);
				grunt.log.writeln = function(message) {
					grunt.config.get('_writeln').call(grunt.log,message);
					message = grunt.log.uncolor(message);
					if (message.indexOf('WARNING') != -1) {
						var task = grunt.task.current,
							warningsConfig = task.name+'.'+task.target+'.'+'warnings',
							warnings = grunt.config.get(warningsConfig) || [];
						warnings.push(message);
						grunt.config.set(warningsConfig,warnings);
					}
				}
			}
			grunt.config.set('_spiesEnabled',!spiesEnabled);
		}
	);
}
