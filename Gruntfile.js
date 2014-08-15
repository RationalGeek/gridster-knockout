module.exports = function(grunt) {
  var taskList = ['buildDebug', 'uglify', 'copy', 'mocha_phantomjs'];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
     options: {
       banner: '/*!\n' +
        ' * <%= pkg.name %> v<%= pkg.version %>\n' +
        ' * (c) Justin Kohlhepp - <%= pkg.homepage %>\n' +
        ' * License: <%= pkg.licenses[0].type %> (<%= pkg.licenses[0].url %>)\n' +
        ' */\n\n',
     },
     build: {
       src: 'src/<%= pkg.name %>.js',
       dest: 'build/<%= pkg.name %>.min.js'
     }
    },
    copy: {
      main: {
        files: [
            { expand: true, flatten: true, src: 'build/gridster-knockout.debug.js', dest: 'demo/public/scripts/' },
        ],
      },
    },
    mocha_phantomjs: {
      all: ['tests/testrunner.html']
    },
    watch: {
      scripts: {
        files: ['src/**/*.js', 'tests/**/*.*'],
        tasks: taskList,
        options: {
          spawn: false,
        },
      },
    },
  });

  grunt.registerTask('buildDebug', 'Build debug version', function(target) {
    var source = [];
    source.push(grunt.config('uglify.options.banner'));
    source.push(grunt.file.read('./src/gridster-knockout.js'));
    grunt.file.write('build/gridster-knockout.debug.js', source.join('').replace(/\r\n/g, '\n'));
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-phantomjs');

  grunt.registerTask('default', taskList);
};