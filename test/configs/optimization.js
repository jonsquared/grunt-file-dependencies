module.exports = function(grunt) {
    grunt.config('file_dependencies.optimization', {
      files: {
      	src: ['test/fixtures/single_define/*.js']
      },
      options: {
        extractDefines: function(fileContent) {
            var count = grunt.config.get('file_dependencies.optimization.extractDefinesCount') || 0;
            grunt.config.set('file_dependencies.optimization.extractDefinesCount', count+1);
            return [];
        },
        extractRequires: function(fileContent, defineMap) {
            var count = grunt.config.get('file_dependencies.optimization.extractRequiresCount') || 0;
            grunt.config.set('file_dependencies.optimization.extractRequiresCount', count+1);
            return [];
        }
      }
    });
}
