'use strict';

var grunt = require('grunt');

exports.single_define_test = {
  custom_options: function(test) {
    test.expect(3);

    var actualFilesProperty = grunt.config.get('customtask.files.src'),
        actualFileExists = grunt.file.exists('tmp/files.json'),
        actualOutputFileContent = actualFileExists && grunt.file.readJSON('tmp/files.json');
    var expectedFilesProperty = ['test/fixtures/custom_config/ClassA.js'];
    test.deepEqual(actualFilesProperty, expectedFilesProperty, 'generates file array in specified property');
    test.ok(actualFileExists, 'output file exists');
    test.deepEqual(actualOutputFileContent, expectedFilesProperty, 'generates file array in specified output file');
    test.done();
  }
};
