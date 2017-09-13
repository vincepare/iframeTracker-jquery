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

		uglify: {
			options: {
				banner: "<%= banner %>"
			},
			main: {
				src: ["src/jquery.iframetracker.js"],
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

	grunt.registerTask("default", ["eslint", "qunit", "copy", "uglify"]);
};
