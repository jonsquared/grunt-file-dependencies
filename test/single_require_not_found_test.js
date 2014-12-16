'use strict';

var grunt = require('grunt');

exports.single_require_not_found_test = {
  default_options: function(test) {
    test.expect(3);

    var actualFiles = grunt.config.get('file_dependencies.single_require_not_found.ordered_files'),
        warnings = grunt.config.get('file_dependencies.single_require_not_found.warnings') || [],
        actualWarning = warnings[0];
    var expectedFiles = ['test/fixtures/single_require_not_found/Test.js'],
        expectedWarning = 'WARNING: Definition for "Class" was not found, but is required by "test/fixtures/single_require_not_found/Test.js".';
    test.deepEqual(actualFiles, expectedFiles, 'generates an array with a single file name');
    test.equals(warnings.length,1,'one warning occurred');
    test.equals(actualWarning,expectedWarning,'Missing definition warning occurred');
    test.done();
  }/*,

  custom_options: function(test) {
    test.expect(1);

    test.done();
  }*/
};
