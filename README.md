# grunt-file-dependencies

> Generates a list of files in dependency order.

You may want to use this plugin if the following applies to your project:
* You are not using the AMD patter and are not using a module script loader (like [RequireJS](http://requirejs.org/)) that provides dependency loading
  * modules create closure, closure requires extra time/memory overhead for every instance of a class, you need every bit of efficiency you can get
  * you have your reasons
* The source code is separated into several source files (e.g. classes) that depend on each other and need to be loaded in the correct order
* You want to use a script tag injection plugin during development for easy debugging (e.g. [grunt-sails-linker](https://www.npmjs.com/package/grunt-sails-linker) but it has no clue about the file dependencies
* You want to use a concatenation plugin for a release build (e.g. [grunt-contrib-concat](https://www.npmjs.com/package/grunt-contrib-concat)) but it has no clue about the file dependencies


## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-file-dependencies --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-file-dependencies');
```

## The "file_dependencies" task

### Overview
In your project's Gruntfile, add a section named `file_dependencies` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  file_dependencies: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.outputProperty,
Type: `String`  
Default value: `'ordered_files'` (on the current target)

The name of the grunt config property which will be assigned the array of ordered file paths. The default is to set the `ordered_files` property on the current target's configuration.

#### options.extractDefinesRegex
Type: `RegExp`  
Default value: `/define\s*\(\s*['"]([^'"]+)['"]/g`

A regular expression used to search each file for dependency definitions (e.g. class definitions).

#### options.extractRequiresRegex
Type: `RegExp`  
Default value: `/require\s*\(\s*['"]([^'"]+)['"]/g`

A regular expression used to search each file for dependency requirements (e.g. class requires).

#### options.extractDefines
Type: `Function`  
Default value: A function that returns the matches found by `extractDefinesRegex`  
Returns: `Array` of dependency names that are defined

A function that will process each file content to find the dependency definitions and return them as an array of their names. Use this if a regex will not work and you need something more custom.

#### options.extractRequires
Type: `Function`  
Default value: A function that returns the matches found by `extractRequiresRegex`  
Returns: `Array` of dependency names that are required

A function that will process each file content to find the dependency requirements and return them as an array of their names. Use this if a regex will not work and you need something more custom.

### Usage Examples

#### Default Options
Given a file `SuperClass.js` that defines a dependency:
```js
define('SuperClass', {});
```
and a file that depends on it `SubClass.js`:
```js
require('SuperClass');
define('SubClass', {/*...*/});
```
The default options in the example below will find the dependency and set `file_dependencies.your_target.ordered_files` to `['src/SuperClass.js','src/SubClass.js']`.

```js
grunt.initConfig({
  file_dependencies: {
    options: {},
    your_target: {
      src: ['src/*.js']
    }
  }
});
```

#### Custom Options

#####Configuring where the output is stored
The following example will store the ordered file path array in a custom configuration property and save it to a file as well:
```js
grunt.initConfig({
  file_dependencies: {
    your_target: {
      options: {
        outputProperty: 'customtask.files.src'
      },
      files: {
        'tmp/files.json': ['src/*.js']
      }
    }
  }
});
```

#####Configuring how dependencies are found with regular expressions
Given a file `SuperClass.js` that defines a dependency:
```js
framework.customDefine('SuperClass', {});
```
and a file that depends on it `SubClass.js`:
```js
framework.customRequire('SuperClass');
framework.customDefine('SubClass', {/*...*/});
```
Here is how you can use a regular expression to find the dependencies:
```js
grunt.initConfig({
  file_dependencies: {
    options: {
      extractDefinesRegex: /framework\.customDefine\s*\(\s*['"]([^'"]+)['"]/g,
      extractRequiresRegex: /framework\.customRequire\s*\(\s*['"]([^'"]+)['"]/g
    },
    your_target: {
      src: ['src/*.js']
    }
  }
});
```

#####Configuring how dependencies are found with custom functions
If your source files have complex define or require syntax that requires extra logic that a regular expression will not detect, or you need to filter the requires in a file based in definitions found within the file set, then specify custom extraction functions: 
```js
grunt.initConfig({
  file_dependencies: {
    options: {
      extractDefines: function(fileContent) {
        var regex = /framework\.defineClass\s*\(\s*['"]([^'"]+)['"]/g,
            matches = [],
            match;
        while(match = regex.exec(fileContent))
          if(customRequireFilter(match[1])
            matches.push(match[1]);
        return matches;
      },
      extractRequires: function(fileContent, defineMap) {
        var regex = /framework\.requireClass\s*\(\s*['"]([^'"]+)['"]/g,
            matches = [],
            match;
        while(match = regex.exec(fileContent)) {
          if (match[1] in defineMap) //ignore any requires referencing a class outside of the file set
            matches.push(match[1]);
        }
        return matches;
      }
    },
    your_target: {
      src: ['src/*.js']
    }
  }
});
```

####Using ordered files for development
To inject your source files into an html file in dependency order, send the output into an injection task (like  [grunt-sails-linker](https://www.npmjs.com/package/grunt-sails-linker)):
```js
grunt.initConfig({
  file_dependencies: {
    your_target: {
      src: ['app/scripts/**/*.js'],
      options: {
        outputProperty:'sails-linker.your_target.src' 
      }
    }
  },
  'sails-linker': {
    your_target: {
      options: {
        appRoot: 'app/'
      },
      src: [], //will be set by file_dependencies task
      dest: 'app/index.html'
    }
  }
});
```

####Using ordered files for release
To concatenate your source files into a single file in dependency order, send the output into a concatenation task (like  [grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat)):
```js
grunt.initConfig({
  file_dependencies: {
    your_target: {
      src: ['app/scripts/**/*.js'],
      options: {
        outputProperty:'concat.your_target.src' 
      }
    }
  },
  concat: {
    your_target: {
      src: [], //will be set by file_dependencies task
      dest: 'dist/built.js'
    },
  }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
