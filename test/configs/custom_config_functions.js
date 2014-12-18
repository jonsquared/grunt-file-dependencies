module.exports = function(grunt) {
    grunt.config('file_dependencies.custom_config_functions', {
      files: {
      	src: [
      		'test/fixtures/custom_config_functions/ClassB.js',
      		'test/fixtures/custom_config_functions/ClassA.js'
  		]
      },
      options: {
      	extractDefines: function(fileContent) {
		    var regex = /framework\.defineClass\s*\(\s*['"]([^'"]+)['"]/g,
		    	matches = [],
		        match;
		    while(match = regex.exec(fileContent))
		      matches.push(match[1]);
		    return matches;    
      	},
      	extractRequires: function(fileContent, defineMap) {
		    var regex = /framework\.requireClass\s*\(\s*['"]([^'"]+)['"]/g,
		    	matches = [],
		        match;
		    while(match = regex.exec(fileContent)) {
	    		if (match[1] in defineMap)
			    	matches.push(match[1]);
		    }
		    return matches;
      	}
      }
    });
}
