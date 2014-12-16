'use strict';

var grunt = require('grunt');

exports.complex_dependencies_no_cycles_test = {
  default_options: function(test) {
    test.expect(1);

    var actual = grunt.config.get('file_dependencies.complex_dependencies_no_cycles.ordered_files');
    var expected = [
      'test/fixtures/complex_dependencies_no_cycles/namespace1/ClassA.js',
      'test/fixtures/complex_dependencies_no_cycles/namespace1/ClassB.js',
      'test/fixtures/complex_dependencies_no_cycles/namespace2/ClassC.js',
      'test/fixtures/complex_dependencies_no_cycles/namespace2/ClassD.js',
      'test/fixtures/complex_dependencies_no_cycles/app.js'
    ];
    test.deepEqual(actual, expected, 'generates an array with files in correct order');
    test.done();
  }/*,

  custom_options: function(test) {
    test.expect(1);

    test.done();
  }*/
};
