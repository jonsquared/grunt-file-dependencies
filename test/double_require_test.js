'use strict';

var grunt = require('grunt');

exports.double_require_test = {
  default_options: function(test) {
    test.expect(1);

    var actual = grunt.config.get('file_dependencies.double_require.ordered_files');
    var expected = [
      'test/fixtures/double_require/ClassA.js',
      'test/fixtures/double_require/ClassB.js',
      'test/fixtures/double_require/Test.js'
    ];
    test.deepEqual(actual, expected, 'generates an array with files in correct order');
    test.done();
  }/*,

  custom_options: function(test) {
    test.expect(1);

    test.done();
  }*/
};
