module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-processhtml');

    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            dist: {
                dot: true,
                src: ['dist/**/*']
            }
        },

        mkdir: {
            all: {
                options: {
                    create: ['dist']
                }
            }
        },

        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        src: ['img/**/*'],
                        dest: 'dist/'
                    },
                    {
                        expand: true,
                        cwd: "node_modules/font-awesome",
                        src: ['fonts/*'],
                        dest: 'dist/'
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'page_admin',
                        src: ['**/*'],
                        dest: 'dist/'
                    },
                    {
                        expand: true,
                        cwd: 'favicons',
                        src: ['**/*'],
                        dest: 'dist/'
                    }
                ]
            }
        },

        cssmin: {
            target: {
                files: {
                    'dist/css/style.min.css': [
                        'node_modules/bootstrap/dist/css/bootstrap.css',
                        'node_modules/font-awesome/css/font-awesome.css',
                        'css/overrides.css'
                    ]
                }
            }
        },

        processhtml: {
            dist: {
                options: {
                    process: true
                },
                files: [
                    {
                    expand: true,
                    cwd: './html',
                    src: ['**/*.html', '!fragments/**/*.html'],
                    dest: 'dist/',
                    ext: '.html'
                    },
                    {
                        expand: true,
                        cwd: './html',
                        src: ['**/*.shtml'],
                        dest: 'dist/',
                        ext: '.shtml'
                    }
                ]
            }
        },

        watch: {
            files: ['html/**/*', 'css/**/*'],
            tasks: ['mkdir'],
            options: {
                livereload: true,
                spawn: false
            }
        }
    });

    grunt.registerTask('default', ['clean', 'mkdir', 'copy', 'cssmin', 'processhtml']);
};