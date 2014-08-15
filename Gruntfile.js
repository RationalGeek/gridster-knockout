module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    //uglify: {
    //  options: {
    //    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
    //  },
    //  build: {
    //    src: 'src/<%= pkg.name %>.js',
    //    dest: 'build/<%= pkg.name %>.min.js'
    //  }
    //}
	copy: {
	  main: {
	    files: [
		  { expand: true, flatten: true, src: 'src/gridster-knockout.js', dest: 'demo/public/scripts/' },
		],
	  },
	},
	watch: {
	  scripts: {
		files: ['src/**/*.js'],
		tasks: ['copy'],
		options: {
		  spawn: false,
		},
	  },
	},
  });

  //grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['copy', /*'uglify'*/]);
};