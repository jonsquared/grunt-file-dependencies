module.exports = function(grunt) {
    grunt.config('file_dependencies.chain_require', {
      files: {
      	src: [
      		'test/fixtures/chain_require/ClassC.js',
      		'test/fixtures/chain_require/ClassB.js',
      		'test/fixtures/chain_require/ClassA.js'
  		]
      }
    });
}
