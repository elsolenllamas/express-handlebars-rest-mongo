'use strict';
var path = require('path');

module.exports = function(grunt) {

grunt.loadNpmTasks('grunt-express');

grunt.initConfig({
    express: {
      options: {
        port: 3000,
        hostname: '*'
      },
      dev: {
        options: {
          server: path.resolve('./start/server.js'),
          livereload: true,
          serverreload: true,
          bases: [path.resolve('./public')]
        }
      }
    }
});

  grunt.registerTask('server', [
    'express'
  ]);
};