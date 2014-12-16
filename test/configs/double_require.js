module.exports = function(grunt) {
    grunt.config('file_dependencies.double_require', {
      files: {
      	src: [
      		'test/fixtures/double_require/Test.js',
      		'test/fixtures/double_require/ClassA.js',
      		'test/fixtures/double_require/ClassB.js'
  		]
      }
    });
}