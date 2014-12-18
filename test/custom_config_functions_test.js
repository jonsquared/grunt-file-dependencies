'use strict';

var grunt = require('grunt');

exports.single_define_test = {
  custom_options: function(test) {
    test.expect(3);

    var actualFilesProperty = grunt.config.get('file_dependencies.custom_config_functions.ordered_files'),
        warnings = grunt.config.get('file_dependencies.custom_config_functions.warnings') || [],
        errors = grunt.config.get('file_dependencies.custom_config_functions.errors') || [];
    var expectedFilesProperty = [
            'test/fixtures/custom_config_functions/ClassA.js',
            'test/fixtures/custom_config_functions/ClassB.js'
        ];
    test.deepEqual(actualFilesProperty, expectedFilesProperty, 'generates an array with files in correct order');
    test.equals(warnings.length, 0, 'no warnings occurred');
    test.equals(errors.length, 0, 'no errors occured');

    test.done();
  }
};
