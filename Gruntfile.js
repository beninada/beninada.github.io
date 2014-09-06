module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: ['app/js/**/*.js'],
        dest: 'js/main.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
        mangle: true
      },
      dist: {
        files: {
          'js/main.min.js': ['js/main.js']
        }
      }
    },
    cssmin: {
      minify: {
        expand: true,
        cwd: 'app/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'css/',
        ext: '.min.css'
      },
      combine: {
        files: {
          'css/main.min.css': ['css/*.min.css']
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'app/js/**/*.js'],
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
    copy: {
      main: {
        files:[
          {
            expand: true,
            src: '**',
            cwd: 'app/',
            dest: '.'
          },
        ]
      }
    },
    clean: {
      dev: ["index.html", "css/", "js/"],
      deliver: ["node_modules/"]
    },
    watch: {
      dev: {
        files: ['app/index.html', 'app/css/**/*', 'app/js/**/*', '!bower_components/**'],
        tasks: ['default']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('lint',    ['jshint']);
  grunt.registerTask('minify',  ['concat', 'cssmin', 'uglify']);
  grunt.registerTask('build', ['clean:dev', 'lint', 'minify', 'copy']);
  
  grunt.registerTask('default', ['build', 'watch']);
  grunt.registerTask('deliver', ['build', 'clean:deliver']);

};