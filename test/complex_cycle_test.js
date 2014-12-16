'use strict';

var grunt = require('grunt');

exports.complex_cycle_test = {
  default_options: function(test) {
    test.expect(3);
    var actualFiles = grunt.config.get('file_dependencies.complex_cycle.ordered_files'),
        errors = grunt.config.get('file_dependencies.complex_cycle.errors'),
        actualError = errors && errors[0];
    var expectedFiles = [
          'test/fixtures/complex_cycle/ClassC.js',
          'test/fixtures/complex_cycle/ClassD.js'
        ],
        expectedError = 'Fatal error: A cyclic dependency was found among the following files:'+
          grunt.util.linefeed+
          '  test/fixtures/complex_cycle/ClassA.js'+
          grunt.util.linefeed+
          '  test/fixtures/complex_cycle/ClassB.js'+
          grunt.util.linefeed;
    test.deepEqual(actualFiles, expectedFiles, 'ordered file list contains files without a cyclic dependency');
    test.equals(errors.length,1,'one error occurred');
    test.equals(actualError,expectedError,'fatal cyclic dependency error occurred');
    test.done();
  }/*,

  custom_options: function(test) {
    test.expect(1);

    test.done();
  }*/
};
