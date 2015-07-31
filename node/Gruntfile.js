module.exports = function(grunt) {
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    function executeGrunt (path, configDir) {
        require('load-grunt-config')(grunt, {
            configPath: path.join(process.cwd(), configDir)
        });
    }

    executeGrunt(require('path'), 'tasks');
};