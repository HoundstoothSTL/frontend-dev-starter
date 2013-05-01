/* DO NOT USE YET - STILL IN BUILD MODE */

/*global module:false*/
module.exports = function(grunt) {
  'use strict';

  // readOptionalJSON
  // by Ben Alman
  // https://gist.github.com/2876125
  function readOptionalJSON( filepath ) {
      var data = {};
      try {
          data = grunt.file.readJSON( filepath );
          grunt.verbose.write( "Reading " + filepath + "..." ).ok();
      } catch(e) {}
      return data;
  }

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    paths: {
      src: 'assets',
      dest: 'dist'
    },
    concat: {
      options: {
        separator: ';'
      },
      distScripts: {
        src: [
          '<%= paths.src %>/js/menu.js',
          '<%= paths.src %>/js/app.js'
        ],
        dest: '<%= paths.src %>/js/scripts.js'
      }
    },
    compass: {
      dev: {
        options: {
          config: 'config.rb'
        }
      }
    },
    copy: {
      scaffold: {
        files: [
          {expand: true, cwd: 'components/jquery/', src: 'jquery.min.js', dest: '<%= paths.src %>/js/vendor/'},
          {expand: true, cwd: 'components/modernizr/', src: 'modernizr.js', dest: '<%= paths.src %>/js/vendor/'},
          {expand: true, cwd: 'components/font-awesome/font/', src: ['**'], dest: '<%= paths.src %>/fonts/'},
          {expand: true, cwd: 'components/font-awesome/sass/', src: ['*.scss'], dest: '<%= paths.src %>/sass/icons/'}
        ]
      },
      dist: {
        files: [
          {expand: true, cwd: '<%= paths.src %>/', src: ['**/*.php'], dest: '<%= paths.dest %>/'},
          {expand: true, cwd: '<%= paths.src %>/font/', src: ['**'], dest: '<%= paths.dest %>/font/'},
          {expand: true, cwd: '<%= paths.src %>/', src: ['*.png'], dest: '<%= paths.dest %>/'},
          {expand: true, cwd: '<%= paths.src %>/img/', src: ['**'], dest: '<%= paths.dest %>/img/'},
          {expand: true, cwd: '<%= paths.src %>/font/', src: ['**'], dest: '<%= paths.dest %>/font/'}
        ]
      }
    },
    jshint: {
      all: ['Gruntfile.js', '<%= paths.src %>/js/app.js']
    },
    imagemin: {
      dist: {
        options: {
          optimizationLevel: 3
        },
        files: [
          {
            expand: true,
            cwd: '<%= paths.src %>/img/',
            src: ['**/*.png'],
            dest: '<%= paths.dest %>/img/'
          }
        ]
      },
      dev: {
        options: {
          optimizationLevel: 0
        },
        files: [
          {
            expand: true,
            cwd: '<%= paths.src %>/img/',
            src: ['**/*.png'],
            dest: '<%= paths.dest %>/img/'
          }
        ]
      }
    },
    mincss: {
      dist: {
        files: {
          "<%= paths.dest %>/css/main.min.css": ["<%= paths.src %>/css/main.css"]
        }
      }
    },
    uglify: {
      dist: {
        files: {
          '<%= paths.dest %>/js/scripts.min.js': ['<%= paths.src %>/js/scripts.js']
        }
      }
    },
    watch: {
      src: {
        files: ['<%= paths.src %>/sass/**/*.scss'],
        tasks: ['dev']
      }
    }
  });

  // Load External Tasks
  grunt.loadTasks('tasks');

  // Load NPM tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-mincss');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  // Tasks to run
  grunt.registerTask('build', ['copy:dist', 'mincss:dist', 'concat', 'uglify:dist']);
  grunt.registerTask('dev', ['compass', 'jshint']);
  grunt.registerTask('scaffold', ['copy:scaffold']);

};