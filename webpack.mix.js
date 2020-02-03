let mix = require('laravel-mix');

mix.setPublicPath('public').js('resources/js/main.js', 'public/js')

mix.webpackConfig({
    resolve: {
        alias: {
            "@": path.resolve(
                __dirname,
                "resources/assets/js"
            ),
            "@sass": path.resolve(
                __dirname,
                "resources/assets/sass"
            ),
        }
    }
 });