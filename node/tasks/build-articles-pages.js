module.exports = function (grunt) {
    var fs = require('fs');

    var path = {
        partials: '../postPartials/',
        posts: '../post/'
    };

    var file = {
        header: fs.readFileSync('../basePartials/_header.html', 'utf-8'),
        footer: fs.readFileSync('../basePartials/_footer.html', 'utf-8'),
        coments: fs.readFileSync('../basePartials/_coments.html', 'utf-8')
    };
    var buildOneArticlePage = function (fileName) {
        path.file = path.partials + fileName;
        path.post = path.posts + fileName.substring(7);

        file.partial = fs.readFileSync(path.file, 'utf-8');

        var data = [getHeader(), file.partial, file.footer].join('\n');

        console.log('File ', path.post);
        fs.writeFileSync(path.post, data, 'utf-8');
    };
    var buildAllArticlesPages = function () {
        fs.readdirSync(path.partials).forEach(function (fileName){
            buildOneArticlePage(fileName);
        });
    };

    var getHeader = function () {
        return file.header.replace(/<title>.*<\/title>/, '<title> Be Static! | ' + getTitle() + '</title>');
    };

    var getTitle = function () {
        return file.partial.split('<h1>')[1].split('</h1>')[0];
    };

    var runTask = function () {
        if (typeof grunt.option('article') === "string") buildOneArticlePage(grunt.option('article'))
        else buildAllArticlesPages();
    };

    return grunt.task.registerTask('build-articles-pages', runTask);
};