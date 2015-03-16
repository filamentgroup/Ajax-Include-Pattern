/*global module:false*/
module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: '<json:package.json>',
		meta: {
			banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
				'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
				'<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
				'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
				' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
		},
		concat: {
			dist: {
				src: ['<banner:meta.banner>', '<file_strip_banner:src/<%= pkg.name %>.js>'],
				dest: 'dist/<%= pkg.name %>.js'
			},
			plugins: {
				src: ['<banner:meta.banner>', '<file_strip_banner:src/ajaxIncludeForms.js>'],
				dest: 'dist/ajaxIncludePlugins.js'
			},
			jquery: {
				src: ['node_modules/jquery/dist/jquery.js'],
				dest: 'libs/jquery.js'
			},
			qunitcss: {
				src: ['node_modules/qunitjs/qunit/qunit.css'],
				dest: 'libs/qunit.css'
			},
			qunitjs: {
				src: ['node_modules/qunitjs/qunit/qunit.js'],
				dest: 'libs/qunit.js'
			}
		},
		min: {
			dist: {
				src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
				dest: 'dist/<%= pkg.name %>.min.js'
			},
			plugins: {
				src: ['<banner:meta.banner>', '<config:concat.plugins.dest>'],
				dest: 'dist/ajaxIncludePlugins.min.js'
			}
		},
		qunit: {
			files: ['test/ajaxInclude.html']
		},
		lint: {
			files: ['grunt.js', 'src/**/*.js', 'test/**/*.js']
		},
		watch: {
			files: '<config:lint.files>',
			tasks: 'lint min qunit'
		},
		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				boss: true,
				eqnull: true,
				browser: true
			},
			globals: {
				jQuery: true
			}
		},
		uglify: {}
	});

	// Default task.
	grunt.registerTask('default', 'concat lint qunit min');
	// Travis
	grunt.registerTask('travis', 'concat lint qunit');

};
