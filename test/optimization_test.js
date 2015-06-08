'use strict';

var grunt = require('grunt');

exports.optimization_test = {
  default_options: function(test) {
    test.expect(2);

    var actual_extractDefinesCount = grunt.config.get('file_dependencies.optimization.extractDefinesCount'),
        actual_extractRequiresCount = grunt.config.get('file_dependencies.optimization.extractRequiresCount');

    test.equals(actual_extractDefinesCount, 1, 'calls extractDefines once');
    test.equals(actual_extractRequiresCount, 1, 'calls extractRequires once');
    test.done();
  }
};
