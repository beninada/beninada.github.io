module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: ['js/**/*.js'],
        dest: 'dist/js/compiled.js'
      }
    },
    uglify: {
      options: {
        mangle: true
      },
      dist: {
        files: {
          'js/compiled.min.js': ['dist/js/compiled.js']
        }
      }
    },
    cssmin: {
      minify: {
        expand: true,
        cwd: 'css/',
        src: ['*.css', '!*.min.css'],
        dest: 'dist/css/',
        ext: '.min.css'
      },
      combine: {
        files: {
          'css/compiled.min.css': ['dist/css/*.min.css']
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
    clean: ['dist', 'css/*.min.css', 'js/*.min.js'],
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
        files: ['index.html', 'css/**/*', 'js/**/*', '!bower_components/**'],
        tasks: ['latch']
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
  grunt.registerTask('latch', ['build', 'watch']);

};