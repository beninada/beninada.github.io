module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: ['js/**/*.js'],
        dest: 'js/concatenated.js'
      }
    },
    uglify: {
      options: {
        mangle: true
      },
      dist: {
        files: {
          'js/minified.min.js': ['js/concatenated.js']
        }
      }
    },
    cssmin: {
      target: {
        files: {
          'css/minified.min.css': ['bower_components/gridism/gridism.css', 'css/main.css']
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'js/**/*.js'],
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true,
          window: true
        }
      }
    },
    clean: ['css/*.min.css', 'js/*.min.js'],
    connect: {
      server: {
        options: {
          port: 9000,
          base: '.'
        }
      }
    },
    watch: {
      dev: {
        files: ['index.html', 'css/**/*', 'js/**/*', '!css/**/*.min.css', '!js/**/*.min.js'],
        tasks: ['build', 'watch']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('lint',    ['jshint']);
  grunt.registerTask('minify',  ['concat', 'cssmin', 'uglify']);
  grunt.registerTask('build', ['clean', 'lint', 'minify']);
  grunt.registerTask('default', ['build', 'connect', 'watch']);

};
