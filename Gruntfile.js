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
    sass: {
      dist: {
        files: {
          'dist/css/main.css': 'css/main.scss'
        }
      }
    },
    cssmin: {
      minify: {
        expand: true,
        cwd: 'dist/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'dist/css/',
        ext: '.min.css'
      },
      combine: {
        files: {
          'css/compiled.min.css': ['dist/css/**/*.min.css']
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
        files: ['index.html', 'css/**/*', 'js/**/*', '!css/**/*.min.css', '!js/**/*.min.js'],
        tasks: ['latch']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('lint',    ['jshint']);
  grunt.registerTask('minify',  ['concat', 'cssmin', 'uglify']);
  grunt.registerTask('compile', ['sass']);
  grunt.registerTask('build', ['clean', 'lint', 'compile', 'minify']);
  
  grunt.registerTask('default', ['build', 'connect', 'watch']);
  grunt.registerTask('latch', ['build', 'watch']);

};