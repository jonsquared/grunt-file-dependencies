module.exports = function(grunt) {
    grunt.config('file_dependencies.complex_dependencies_no_cycles', {
      files: {
      	src: [
  	      'test/fixtures/complex_dependencies_no_cycles/app.js',
  	      'test/fixtures/complex_dependencies_no_cycles/namespace2/ClassD.js',
  	      'test/fixtures/complex_dependencies_no_cycles/namespace2/ClassC.js',
          'test/fixtures/complex_dependencies_no_cycles/namespace1/ClassA.js',
  	      'test/fixtures/complex_dependencies_no_cycles/namespace1/ClassB.js'
    		]
      }
    });
}
