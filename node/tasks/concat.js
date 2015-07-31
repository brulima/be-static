module.exports = function (grunt) {
    return {
        app: {
            src: [
                '../js/files/ga.js',
                '../js/files/nav.js',
                '../js/files/formspree.js'
            ],
            dest: '../js/app.js'
        }
    };
};