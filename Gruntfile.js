"use strict";
/**
 * @file browser-language grunt
 * @module browser-language
 * @package browser-language
 * @subpackage main
 * @version 0.0.1
 * @author hex7c0 <hex7c0@gmail.com>
 * @copyright hex7c0 2014
 * @license GPLv3
 */

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*\n' + ' * <%= pkg.name %> v<%= pkg.version %>\n'
                + ' * (c) <%= pkg.author.name %> <%= pkg.homepage %>\n'
                + ' * Licensed under <%= pkg.license %>\n' + ' */\n',

        clean: ['index.min.js'],

        uglify: {
            options: {
                preserveComments: 'false',
                banner: '<%= banner %>',
            },
            files: {
                src: 'index.js',
                dest: 'index.min.js'
            },
        },

    });

    // These plugins provide necessary tasks.
    require('load-grunt-tasks')(grunt,{
        scope: 'devDependencies'
    });

    grunt.registerTask('min',['clean','uglify']);
    grunt.registerTask('default',['min']);

};