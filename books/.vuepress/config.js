const {zoom} = require('./config/attrs.js')
const {addContainer, addPageClass} = require('./config/utils.js')

function getBaseUrl() {
    const isProd = process.env.NODE_ENV === 'production';
    const githubRepo = process.env.GITHUB_REPOSITORY; // "owner/repo-name"

    return (isProd && githubRepo && githubRepo.split('/')[1] === 'books-forever')
    ? '/books-forever/'
    : '/';
}

module.exports = {
    title: 'טבע שלם - ספרים',
    description: 'הספרים של דוד ישראל כהן - גוף הידע - 1א2',
    head: [
        ['link', {rel: 'icon', href: '/images/icons/icon-512x512.png'}],
        ['link', {rel: 'manifest', href: '/manifest.json'}],
        ['link', { 
            rel: 'stylesheet', 
            href: 'https://fonts.googleapis.com/css2?family=Assistant:wght@400;600;700&display=swap',
            media: 'print',
            onload: "this.media='all'"
        }],
        ['meta', {name: 'theme-color', content: '#3eaf7c'}],
        ['meta', {name: 'apple-mobile-web-app-capable', content: 'yes'}],
    ],
    theme: 'derech-hapeima',
    base: getBaseUrl(),
    dest: './dist',
    port: 8082,
    evergreen: true,
    markdown: {
        extractHeaders: ['h1', 'h2', 'h3', 'h4'],
        extendMarkdown: md => {
            addContainer(md, 'hebrew-list')
        }
    },
    plugins: [
        '@vuepress/back-to-top',
        ['@vuepress/medium-zoom', zoom],

        ['vuepress-plugin-typescript', {
            tsLoaderOptions: {
                transpileOnly: true
            },
        }],

        ['@vuepress/google-analytics', {
            'ga': 'UA-163403399-1', // UA-00000000-0
        }],

        ['@vuepress/pwa', {
            serviceWorker: true,
            updatePopup: {
                message: 'תוכן חדש מוכן',
                buttonText: 'לחצו כאן לעדכון',
            },
        }],
    ],
    chainWebpack: (config) => {
        ['scss', 'sass'].forEach(rule => {
            if (config.module.rules.has(rule)) {
                config.module
                    .rule(rule)
                    .oneOfs.values()
                    .forEach(oneOf => {
                        oneOf
                            .use('sass-loader')
                            .tap(options => {
                                options = options || {};
                                options.sassOptions = {
                                    ...options.sassOptions,
                                    quietDeps: true,
                                    silenceDeprecations: ['import', 'legacy-js-api']
                                };
                                return options;
                            });
                });
            }
        });
    },
    extendPageData ($page) {
        addPageClass($page)
    },
    configureWebpack: (config, isServer) => {
        if (!isServer) {
            if (process.env.NODE_ENV === 'production') {
                config.devtool = 'source-map'; 
            } else {
                config.devtool = 'eval-cheap-module-source-map'; 
            }

            const htmlPlugin = config.plugins.find(
                plugin => plugin.constructor.name === 'HtmlWebpackPlugin'
            );
            if (htmlPlugin) {
                htmlPlugin.options.scriptLoading = 'defer';
                
                if (process.env.NODE_ENV === 'production') {
                    htmlPlugin.options.minify = {
                        ...htmlPlugin.options.minify,
                        removeComments: true,
                        collapseWhitespace: true,
                    };
                }
            }
        }
    },
}
