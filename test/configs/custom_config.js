module.exports = function(grunt) {
    grunt.config('file_dependencies.custom_config', {
      files: {
      	src: ['test/fixtures/custom_config/*.js']
      },
      options: {
	      outputProperty: 'customtask.files.src',
	      outputFile: 'tmp/files.json'
      }
    });
}
