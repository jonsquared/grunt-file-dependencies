'use strict';

var grunt = require('grunt');

exports.chain_require_test = {
  default_options: function(test) {
    test.expect(1);

    var actual = grunt.config.get('file_dependencies.chain_require.ordered_files');
    var expected = [
      'test/fixtures/chain_require/ClassA.js',
      'test/fixtures/chain_require/ClassB.js',
      'test/fixtures/chain_require/ClassC.js'
    ];
    test.deepEqual(actual, expected, 'generates an array with files in correct order');
    test.done();
  }/*,

  custom_options: function(test) {
    test.expect(1);

    test.done();
  }*/
};
