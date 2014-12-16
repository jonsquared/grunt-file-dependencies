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
    var orderedFiles = getOrderedFiles(this.files);
    grunt.config(this.name+'.'+this.target+'.'+'ordered_files', orderedFiles);
  });

  function getOrderedFiles(files) {
    var fileInfos = expandFileInfo(getExistingFiles(files)),
        fileDependencyMap = createFileDependencyMap(fileInfos),
        orderedFiles = [];
    while(Object.keys(fileDependencyMap).length) {
      var nextFiles = [];
      for (var file in fileDependencyMap) {
        if (hasRequiresInMap(fileDependencyMap[file].requires, fileDependencyMap))
          continue;
        nextFiles.push(file);
        delete fileDependencyMap[file];
      }
      if (nextFiles.length == 0)
        break;
      orderedFiles.push.apply(orderedFiles, nextFiles);
    }
    return orderedFiles;
  }

  function getExistingFiles(files) {
    var existingFiles = [];
    files.forEach(function(file) {
      file.src.forEach(function(filepath) {
        if (!grunt.file.exists(filepath))
          grunt.log.warn('Source file "' + filepath + '" not found.');
        else
          existingFiles.push(filepath);
      });
    });
    return existingFiles;
  }

  function expandFileInfo(files) {
    return files.map(function(file) {
      var fileContent = grunt.file.read(file);
      return {
        path: file,
        content: fileContent,
        defines: extractDefines(fileContent),
        requires: extractRequires(fileContent)
      }
    });
  }

  function extractDefines(fileContent) {
    return extractMatches(fileContent, /define\s*\(\s*['"]([^'"]+)['"]/g);
  }

  function extractRequires(fileContent) {
    return extractMatches(fileContent, /require\s*\(\s*['"]([^'"]+)['"]/g);
  }

  function extractMatches(fileContent, regex) {
    var matches = [],
        match;
    while(match = regex.exec(fileContent))
      matches.push(match[1]);
    return matches;    
  }

  function createFileDependencyMap(fileInfos) {
    var map = {},
        defineToFileMap = createDefineToFileMap(fileInfos);
    fileInfos.forEach(function(fileInfo) {
      var requires = {};
      fileInfo.requires.forEach(function(require) {
        requires[defineToFileMap[require]] = true;
      });
      map[fileInfo.path] = {
        requires: requires
      };
    });
    return map;
  }

  function createDefineToFileMap(fileInfos) {
    var map = {}
    fileInfos.forEach(function(fileInfo) {
      fileInfo.defines.forEach(function(define) {
        map[define] = fileInfo.path;
      });
    });
    return map;
  }

  function hasRequiresInMap(requires, map) {
    for (var require in requires)
      if (require in map)
        return true;
    return false;
  }

};
