'use strict';

module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

  var gruntConfig = {

    paths: {
      app: 'app',
      temp: '.tmp',
      dist: 'www'
    },

    watch: {

      options: {
        livereload: 1338
      },

      bower: {
        files: ['bower.json'],
        tasks: ['inject:dev']
      },

      js: {
        files: [
          '<%= paths.app %>/modules/*.js',
          '<%= paths.app %>/modules/**/*.js'
        ],
        tasks: [
          'inject:dev',
          'newer:jshint:all',
          'newer:jsbeautifier:all'
        ]
      },

      config: {
        files: [
          '<%= paths.app %>/js/*.js'
        ]
      },

      html: {
        files: ['<%= paths.app %>/modules/**/views/*.html'],
      },

      css: {
        files: ['<%= paths.app %>/css/*.css'],
        options: {
          livereload: false
        }
      },

      gruntfile: {
        files: ['Gruntfile.js']
      },

      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= paths.app %>/*.html',
          '<%= paths.app %>/css/{,*/}*.css',
          '<%= paths.app %>/img/**/*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    connect: {
      options: {
        port: 9001,
        hostname: 'localhost',
        livereload: 1338
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '<%= paths.app %>'
          ]
        }
      },
      dist: {
        options: {
          open: true,
          base: ['<%= paths.dist %>']
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= paths.app %>/modules/*.js',
          '<%= paths.app %>/modules/**/*.js',
        ]
      }
    },

    jsbeautifier: {
      options: {
        config: '.jsbeautifyrc'
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= paths.app %>/js/*.js',
          '<%= paths.app %>/modules/*.js',
          '<%= paths.app %>/modules/**/*.js',
        ]
      }
    },

    clean: {
      dev: '<%= paths.temp %>',
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= paths.temp %>',
            '<%= paths.dist %>/*',
            '!<%= paths.dist %>/.git*'
          ]
        }]
      },
      postDist: {
        files: [{
          dot: true,
          src: ['<%= paths.app %>/css', '<%= paths.temp %>']
        }]
      }
    },

    autoprefixer: {
      dev: {
        expand: true,
        cwd: '<%= paths.app %>/css',
        src: '*.css',
        dest: '<%= paths.app %>/css'
      },
      dist: {
        expand: true,
        cwd: '<%= paths.app %>/css',
        src: '*.css',
        dest: '<%= paths.app %>/css'
      },
    },

    ngconstant: {
      options: {
        name: 'core',
        wrap: '"use strict";\n\n{%= __ngModule %}',
        space: '  ',
        dest: '<%= paths.app %>/config/constants.js',
        deps: false
      },
      development: {
        constants: {
          ENV: 'development',
          APP: {
            name: 'Administration',
            version: 'BETA-1'
          }
        }
      }
    },

    comments: {
      dist: {
        options: {
          singleline: true,
          multiline: true
        },
        src: ['www/scripts/custom.js']
      },
    },

    rev: {
      dist: {
        files: {
          src: [
            '<%= paths.dist %>/scripts/custom.js',
            '<%= paths.dist %>/scripts/vendor.js',
            '<%= paths.dist %>/styles/*.css',
            '<%= paths.dist %>/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
          ]
        }
      }
    },

    useminPrepare: {
      html: '<%= paths.app %>/index.html',
      options: {
        dest: '<%= paths.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    usemin: {
      html: ['<%= paths.dist %>/index.html'],
      js: ['<%= paths.dist %>/scripts/*.js'],
      css: ['<%= paths.dist %>/styles/*.css'],
      options: {
        assetsDirs: ['<%= paths.dist %>/**/'],
        patterns: {
          js: [
            [/(img\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JS to reference our revved images']
          ]
        }
      }
    },

    cssmin: {
      options: {} // correction d'un bug (https://github.com/paths/paths/issues/824)
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= paths.app %>/img',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= paths.dist %>/img'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= paths.app %>/img',
          src: '{,*/}*.svg',
          dest: '<%= paths.dist %>/img'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true
        },
        files: [{
          expand: true,
          cwd: '<%= paths.dist %>',
          src: ['*.html', '<%= paths.app %>/modules/*/views/*.html'],
          dest: '<%= paths.dist %>'
        }]
      }
    },

    ngAnnotate: {
      options: {
        singleQuotes: true
      },
      dist: {
        src: '<%= paths.dist %>/scripts/custom.js',
        dest: '<%= paths.dist %>/scripts/custom.js'
      }
    },

    concat: {
      options: {
        separator: ';\n',
      },
      templates: {
        src: ['<%= paths.dist %>/scripts/custom.js', '<%= paths.temp %>/templates.js'],
        dest: '<%= paths.dist %>/scripts/custom.js',
      },
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= paths.app %>',
          dest: '<%= paths.dist %>',
          src: [
            '*.ico',
            '.htaccess',
            'index.html'
          ]
        }]
      }
    },

    ngtemplates: {
      options: {
        module: 'angularjsapp',
        htmlmin: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeComments: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        }
      },
      app: {
        cwd: '<%= paths.app %>',
        src: 'modules/**/views/{,*/}*.html',
        dest: '<%= paths.temp %>/templates.js'
      }
    },

    uglify: {
      build: {
        options: {
          mangle: true,
          compress: {},
          preserveComments: false
        },
        files: {
          '<%= paths.dist %>/scripts/custom.js': '<%= paths.dist %>/scripts/custom.js',
        }
      }
    },

    concurrent: {
      dev: [
        'newer:jsbeautifier:all'
      ],
      dist: [
        'sass:dist',
        'imagemin',
        'svgmin',
        'ngtemplates'
      ],
      dist2: [
        'copy:dist',
        'concat:templates',
      ]
    }
  };

  grunt.initConfig(gruntConfig);

  function getDevInjector() {
    return {
      options: {
        ignorePath: ['app/', '.tmp/'],
      },
      localDependencies: {
        files: {
          'app/index.html': [
            'app/config/config.js',
            'app/config/application.js',
            'app/modules/*/*.js',
            'app/config/constants.js',
            'app/modules/*/config/*.js',
            'app/modules/*/services/*.js',
            'app/modules/*/directives/*.js',
            'app/modules/*/filters/*.js',
            'app/modules/*/controllers/*.js',
            '<%= paths.app %>/css/*.css'
          ]
        }
      },
      bowerDependencies: {
        files: {
          'app/index.html': ['bower.json'],
        }
      }
    };
  }

  function getProdInjector() {
    return {
      options: {
        ignorePath: ['app/'],
        min: true
      },
      localDependencies: {
        files: {
          'app/index.html': [
            'app/js/config.js',
            'app/js/application.js',
            'app/modules/*/*.js',
            'app/modules/*/config/*.js',
            'app/modules/*/services/*.js',
            'app/modules/*/directives/*.js',
            'app/modules/*/filters/*.js',
            'app/modules/*/controllers/*.js',
            'app/css/*.css'
          ]
        }
      },
      bowerDependencies: {
        files: {
          'app/index.html': ['bower.json'],
        }
      }
    };
  }

  grunt.registerTask('inject', function (mode) {
    var injector;
    if (mode === 'dev') {
      injector = getDevInjector();
    } else if (mode === 'prod') {
      injector = getProdInjector();
    }
    injector.options.addRootSlash = false;
    injector.options.bowerPrefix = 'bower';
    gruntConfig.injector = injector;
    grunt.task.run('injector');
  });

  grunt.registerTask('dev', [
    'clean:dev',
    'newer:jshint:all',
    'ngconstant:development',
    'concurrent:dev',
    'autoprefixer:dev',
    'inject:dev',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('prod', [
    'build',
    'connect:dist:keepalive'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'concurrent:dist',
    'autoprefixer:dist',
    'inject:prod',
    'useminPrepare',
    'concat',
    'ngAnnotate:dist',
    'concurrent:dist2',
    'copy:dist',
    'cssmin',
    'uglify',
    'rev',
    'usemin',
    'htmlmin',
    'comments:dist',
    'clean:postDist'
  ]);
};
