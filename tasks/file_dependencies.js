/*
 * grunt-file-dependencies
 * 
 *
 * Copyright (c) 2014 Jon E. John
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('file_dependencies', 'Generate a list of files in dependency order.', function() {
    var orderedFiles = [];
    grunt.log.writeln(JSON.stringify(this.files));
    this.files.forEach(function(f) {
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      });
      orderedFiles.push.apply(orderedFiles,src);
/*
      .map(function(filepath) {
        return grunt.file.read(filepath);
      });
*/
    });
    grunt.config(this.name+'.'+this.target+'.'+'ordered_files', orderedFiles);
  });

};
