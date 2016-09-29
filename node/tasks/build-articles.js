module.exports = function (grunt) {
    var fs = require('fs');
    var path = {
            articles: '../articles/',
            partials: '../postPartials/'
        };

    var buildAllArticles = function () {
        fs.readdirSync(path.articles).forEach(function (file){
            buildOneArticle(file);
        });
    };

    var buildOneArticle = function (file) {
        path.file = path.articles + file;
        path.partial = path.partials + file;

        var partials = fs.readFileSync(path.file, 'utf-8').split('\n');

        var htmlPartials = categorizePartials(partials, ['<article>']);
            htmlPartials.push('<div id="disqus_thread"></div>');
            htmlPartials.push('<script src="js/disqus.js"></script>');
            htmlPartials.push('</article>');
        
        var htmlData = htmlPartials.join('\n');

        console.log('File ', path.partial);
        fs.writeFileSync(path.partial, htmlData, 'utf-8');
    };

    var categorizePartials = function (partials, htmlPartials) {
        var buildLinks = function (partial) {
            return partial.replace(/\[(.*)\]\((.*)\)/g, '<a href="$2" target="_blank">$1</a>');
        };

        var buildImages = function (partial) {
            return partial.replace(/!\[(.*)\]\((.*)\)/g, '<p class="image-display"><img src="$2" alt="$1" /></p>');
        };

        var startsWith = function (str, start) {
            return str.indexOf(start) === 0;
        };

        var isTag = function (str) {
            return /^<\/?\w+( .*)?>/.test(str);
        };

        var handleTitle = function (partial) {
            var titleLevel = 0;
            for (var i = 0; i < 6; i++) {
                if (partial[i] === '#') {
                    titleLevel++;
                }
            };

            tag = 'h' + titleLevel;
            tagPartial(tag, partial.substring(titleLevel));
        };

        var handleCode = function (partial) {
            code = true;
            htmlPartials.push('<pre class="prettyprint lang-"' + partial.substring(3) + '>');
        };

        var handleTopic = function (partial) {
            htmlPartials.push('<p class="topic-call">' + partial.substring(7) + '</p>');
        };

        var tagPartial = function (tag, partial) {
            htmlPartials.push('<' + tag + '>' + partial + '</' + tag + '>');
        };

        var code = false;

        for (var i = 0; i < partials.length; i++) {
            var partial = partials[i];

            if (code) {
                if (startsWith(partial, '´´´')) {
                    htmlPartials.push('</pre>');
                    code = false;
                    continue;
                }

                htmlpartials.push(partial.replace(/</g, '&lt;').replace(/>/g, '&gt;'));
                continue;
            }

            if (!partial) continue;

            if      (isTag(partial))                 htmlPartials.push(partial);
            else if (startsWith(partial, '#'))       handleTitle(partial);
            else if (startsWith(partial, '´´´'))     handleCode(partial);
            else if (startsWith(partial, '.topic#')) handleTopic(partial);
            else                                     tagPartial('p', partial);
        };

        for (var i = 0; i < htmlPartials.length; i++) {
            htmlPartials[i] = buildImages(htmlPartials[i]);
            htmlPartials[i] = buildLinks(htmlPartials[i]);
        };

        return htmlPartials;
    };

    var runTask = function () {
        if (typeof grunt.option('article') === "string") buildOneArticle(grunt.option('article'))
        else buildAllArticles();
    };

    return grunt.task.registerTask('build-articles', runTask);
};