module.exports = function(grunt) {
    grunt.config('file_dependencies.custom_config', {
      src: [
        'test/fixtures/custom_config/Test.js',  
        'test/fixtures/custom_config/ClassA.js'
      ],
      dest: 'tmp/files.json',
      options: {
	      outputProperty: 'customtask.files.src',
	      extractDefinesRegex: /create\s*\(\s*['"]([^'"]+)['"]/g,
	      extractRequiresRegex: /use\s*\(\s*['"]([^'"]+)['"]/g,
      }
    });
}
