module.exports = function (grunt) {
    return {
        dist: {
            configFile : 'karma.conf.js',
            browsers: ['PhantomJS']
        },
        tdd: {
            configFile : 'karma.conf.js',
            reporters: ['progress', 'html'],
            browsers: ['Chrome'],
            singleRun: false
        }
    };
};