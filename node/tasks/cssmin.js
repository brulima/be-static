module.exports = function(grunt) {
    return {
        target: {
            files: {
                '../css/style.min.css': ['../css/style.css']
            }
        }
    };
};