'use strict';

var grunt = require('grunt');

exports.single_define_test = {
  custom_options: function(test) {
    test.expect(1);

    var actual = grunt.config.get('customtask.files.src');
    var expected = ['test/fixtures/custom_config/ClassA.js'];
    test.deepEqual(actual, expected, 'generates file array in specified property');
    test.done();
  }
};
