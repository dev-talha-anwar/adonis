let mix = require('laravel-mix');

mix.setPublicPath('public').js('resources/js/app.js', 'public/js')

mix.webpackConfig({
    resolve: {
        alias: {
            "@": path.resolve(
                __dirname,
                "resources/js"
            ),
            "@sass": path.resolve(
                __dirname,
                "resources/sass"
            ),
        }
    }
 });