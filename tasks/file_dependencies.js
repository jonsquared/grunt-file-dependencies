/*
 * grunt-file-dependencies
 * 
 *
 * Copyright (c) 2014 Jon E. John
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var options;

  grunt.registerMultiTask('file_dependencies', 'Generate a list of files in dependency order.', function() {
    function extractMatches(fileContent, regex) {
      var matches = [],
          match;
      while(match = regex.exec(fileContent)) {
        matches.push(match[1]);
      }
      return matches;    
    }

    options = this.options({
      outputProperty: this.name+'.'+this.target+'.'+'ordered_files',
      outputFile: '',
      extractDefines: function (fileContent) {
        return extractMatches(fileContent, options.extractDefinesRegex);
      },
      extractRequires: function(fileContent, defineMap) {
        return extractMatches(fileContent, options.extractRequiresRegex);
      },
      extractDefinesRegex: /define\s*\(\s*['"]([^'"]+)['"]/g,
      extractRequiresRegex: /require\s*\(\s*['"]([^'"]+)['"]/g
    });

    var orderedFiles = getOrderedFiles(this.files);
    grunt.config(options.outputProperty, orderedFiles);
    if (options.outputFile) {
      grunt.file.write(options.outputFile,JSON.stringify(orderedFiles));
    }
  });

  function getOrderedFiles(files) {
    var orderedFiles = [],
        fileDependencyMap = getFileDependencyMapFromFiles(files);
    while(Object.keys(fileDependencyMap).length) {
      var nextFiles = [];
      for (var file in fileDependencyMap) {
        if (hasRequiresInMap(fileDependencyMap[file].requires, fileDependencyMap))
          continue;
        nextFiles.push(file);
        delete fileDependencyMap[file];
      }
      if (nextFiles.length === 0) {
        logCyclicDependencyError(fileDependencyMap);
        break;
      }
      orderedFiles.push.apply(orderedFiles, nextFiles);
    }
    return orderedFiles;
  }

  function getFileDependencyMapFromFiles(files) {
    var fileInfos = expandFileInfo(getExistingFiles(files)),
        defineMap;
    expandFileInfoDefines(fileInfos);
    defineMap = createDefineToFileMap(fileInfos);
    expandFileInfoRequires(fileInfos, defineMap);
    return createFileDependencyMap(fileInfos, defineMap);
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
        defines: options.extractDefines(fileContent)
      };
    });
  }

  function expandFileInfoDefines(fileInfos) {
    fileInfos.forEach(function (fileInfo) {
      fileInfo.defines = options.extractDefines(fileInfo.content);
    });
  }

  function createDefineToFileMap(fileInfos) {
    var map = {};
    fileInfos.forEach(function(fileInfo) {
      fileInfo.defines.forEach(function(define) {
        map[define] = fileInfo.path;
      });
    });
    return map;
  }

  function expandFileInfoRequires(fileInfos, defineMap) {
    fileInfos.forEach(function (fileInfo) {
      fileInfo.requires = options.extractRequires(fileInfo.content, defineMap);
    });
  }

  function createFileDependencyMap(fileInfos, defineMap) {
    var map = {};
    fileInfos.forEach(function(fileInfo) {
      var requires = {};
      fileInfo.requires.forEach(function(require) {
        var file = defineMap[require];
        if (file)
          requires[defineMap[require]] = true;
        else {
          warn('Definition for "'+require+'" was not found, but is required by "'+fileInfo.path+'".');
        }
      });
      map[fileInfo.path] = {
        requires: requires
      };
    });
    return map;
  }

  function hasRequiresInMap(requires, map) {
    for (var require in requires)
      if (require in map)
        return true;
    return false;
  }

  function warn(message) {
    grunt.log.writeln('WARNING'['yellow'].bold+': '+message['yellow']);
  }

  function logCyclicDependencyError(fileDependencyMap) {
    var message = 'A cyclic dependency was found among the following files:'+grunt.util.linefeed;
    for (var file in fileDependencyMap)
      message += '  '+file+grunt.util.linefeed;
    grunt.fail.fatal(message);
  }
};
