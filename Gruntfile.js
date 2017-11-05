"use strict";

module.exports = function(grunt) {
	grunt.util.linefeed = "\n";

	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),

		banner: "/*! <%= pkg.name %> v<%= pkg.version %>" +
			"<%= pkg.homepage ? ' | ' + pkg.homepage : '' %>" +
			" | Copyright (c) 2013-<%= grunt.template.today('yyyy') %> <%= pkg.author %>" +
			" | Licensed <%= pkg.license %> */",

		copy: {
			options: {
				process: function(content, srcpath) {
					return grunt.template.process(content);
				}
			},
			main: {
				src: "src/jquery.iframetracker.js",
				dest: "dist/jquery.iframetracker.js"
			}
		},

		umd: {
			all: {
				src: "dist/jquery.iframetracker.js",
				template: "./src/umd.hbs",
				deps: {
					"default": ["jQuery"],
					amd: ["jquery"],
					cjs: ["jquery"]
				}
			}
		},

		uglify: {
			options: {
				banner: "<%= banner %>"
			},
			main: {
				src: ["dist/jquery.iframetracker.js"],
				dest: "dist/jquery.iframetracker.min.js"
			}
		},

		eslint: {
			target: ["src/**/*.js", "test/**/*.js", "Gruntfile.js"]
		},

		qunit: {
			files: ["test/**/*.html"]
		}
	});

	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-eslint");
	grunt.loadNpmTasks("grunt-contrib-qunit");
	grunt.loadNpmTasks("grunt-umd");

	grunt.registerTask("compile", ["copy", "umd", "uglify"]);
	grunt.registerTask("default", ["eslint", "qunit", "compile"]);
};
