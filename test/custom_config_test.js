'use strict';

var grunt = require('grunt');

exports.custom_config_test = {
  custom_options: function(test) {
    test.expect(1);

    var actual = grunt.config.get('customtask.files.src');
    var options = grunt.config.get('file_dependencies').custom_config.options;
    var expected = [
    	'test/fixtures/custom_config/ClassA.js',
    	'test/fixtures/custom_config/Test.js'    	
    	];
    test.deepEqual(actual, expected, 'generates file array in specified property');
    test.done();
  }
};
