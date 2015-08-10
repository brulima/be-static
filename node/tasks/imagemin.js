module.exports = function (grunt) {
    return {
        dynamic: {
            files: [{
                expand: true,
                cwd: '../fullimage/',
                src: ['**/*.{png,jpg,gif}'],
                dest: '../img/'
            }]
        }
    };
};