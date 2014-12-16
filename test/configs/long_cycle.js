module.exports = function(grunt) {
    grunt.config('file_dependencies.long_cycle', {
		files: {
			src: [
				'test/fixtures/long_cycle/*.js'
			]
		}
    });
}
