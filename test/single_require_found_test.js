'use strict';

var grunt = require('grunt');

exports.single_require_found_test = {
  default_options: function(test) {
    test.expect(1);

    var actual = grunt.config.get('file_dependencies.single_require_found.ordered_files');
    var expected = [
      'test/fixtures/single_require_found/Class.js',
      'test/fixtures/single_require_found/Test.js'
    ];
    test.deepEqual(actual, expected, 'generates an array with files in correct order');
    test.done();
  }/*,

  custom_options: function(test) {
    test.expect(1);

    test.done();
  }*/
};
