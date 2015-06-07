'use strict';

var grunt = require('grunt');

exports.long_cycle_test = {
  default_options: function(test) {
    test.expect(3);
    var actualFiles = grunt.config.get('file_dependencies.long_cycle.ordered_files'),
        errors = grunt.config.get('file_dependencies.long_cycle.errors'),
        actualError = errors && errors[0];
    var expectedFiles = [],
        expectedError = 'Fatal error: A cyclic dependency was found among the following files:'+
          grunt.util.linefeed+
          '  test/fixtures/long_cycle/ClassA.js'+
          grunt.util.linefeed+
          '  test/fixtures/long_cycle/ClassB.js'+
          grunt.util.linefeed+
          '  test/fixtures/long_cycle/ClassC.js'+
          grunt.util.linefeed+
          '  test/fixtures/long_cycle/ClassD.js'+
          grunt.util.linefeed;
    test.deepEqual(actualFiles, expectedFiles, 'ordered file list is not generated');
    test.equals(errors.length,1,'one error occurred');
    test.equals(actualError,expectedError,'fatal cyclic dependency error occurred');
    test.done();
  }
};
