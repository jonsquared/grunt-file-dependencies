'use strict';

var grunt = require('grunt');

exports.single_define_test = {
  default_options: function(test) {
    test.expect(1);

    var actual = grunt.config.get('file_dependencies.single_define.ordered_files');
    var expected = ['test/fixtures/single_define/Class.js'];
    test.deepEqual(actual, expected, 'generates an array with a single file name');
    test.done();
  }
};
