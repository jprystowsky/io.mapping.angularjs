module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		clean: {
			build: ['build']
		},

		mkdir: {
			build: {
				options: {
					mode: 0700,
					create: ['build']
				}
			}
		},

		copy: {
			src: {
				files: [
					{src: ['./src/*'], dest: 'build/'},
				]
			}
		},

		uglify: {
			options: {
				sequences: true,
				properties: false, // Because IE
				dead_code: true,
				drop_debugger: true,
				unsafe: false,
				conditionals: true,
				comparisons: true,
				evaluate: true,
				booleans: true,
				loops: true,
				unused: true,
				hoist_funs: true,
				hoist_vars: false,
				if_return: true,
				join_vars: true,
				cascade: true,
				side_effects: true,
				warnings: true
			},
			build: {
				files: {
					'build/io.mapping.angularjs.min.js': ['build/**/*.js']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-mkdir');

	// Create a production build -- things that aren't DRY... are WET
	grunt.registerTask('default', [
		'clean:build',
		'mkdir:build',
		'copy:src',
		'uglify:build'
	]);
};