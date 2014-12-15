'use strict';

var grunt = require('grunt');

exports.single_define = {
  default_options: function(test) {
    test.expect(1);

    var actual = grunt.config.get('file_dependencies.single_require_not_found.ordered_files');
    var expected = ['test/fixtures/single_require_not_found/Test.js'];
    test.deepEqual(actual, expected, 'generates an array with a single file name');
    test.done();
  }/*,

  custom_options: function(test) {
    test.expect(1);

    test.done();
  }*/
};
