module.exports = function(grunt) {
    grunt.config('file_dependencies.complex_cycle', {
		files: {
			src: [
				'test/fixtures/complex_cycle/*.js'
			]
		}
    });
}
