module.exports = function (grunt) {
    var buildIndex = function () {
        var fs = require('fs');

        var pathOf = {
            articles: '../articles/',
            partials: '../partials/',
            index: '../index.html'
        };

        var file = {
            header: fs.readFileSync('../basePartials/_header.html', 'utf-8'),
            footer: fs.readFileSync('../basePartials/_footer.html', 'utf-8')
        };

        var tag = {
            openArticle: '            <article class="home-call">\n                <header>',
            closeArticle: '                </header>\n            </article>'
        };

        var indexFile = [file.header];

        fs.readdirSync(pathOf.articles).forEach(function (file){
            var partials = fs.readFileSync(pathOf.articles + file, 'utf-8').split('\n');
            var title = getTitle(partials[1], file);
            var subtitle = getSubtitle(partials[2]);
            var htmlPartials = [tag.openArticle, title, subtitle, tag.closeArticle].join('\n');

            indexFile.push(htmlPartials);

        });

        indexFile.push(file.footer);

        console.log('File ', pathOf.index);
        fs.writeFileSync(pathOf.index, indexFile.join('\n'), 'utf-8');
    };

    var getTitle = function (partial, file) {
        return '                    <h1><a href="post/' + file.substring(7) + '">' + partial.substring(1) + '</a></h1>';
    };

    var getSubtitle = function (partial) {
        return '                    <h2>' + partial.replace(/\[(.*)\]\((.*)\)/g, '<a href="$2">$1</a>').substring(2) + '</h2>';
    };

    return grunt.task.registerTask('build-index', buildIndex);
};