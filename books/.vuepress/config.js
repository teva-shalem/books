module.exports = {
    title: 'טבע שלם - ספרים',
    description: 'הספרים של דוד ישראל כהן - גוף הידע - 1א2',
    head: [
        ['link', {rel: 'icon', href: '/images/icons/icon-512x512.png'}],
        ['link', {rel: 'manifest', href: '/manifest.json'}],
        ['meta', {name: 'theme-color', content: '#3eaf7c'}],
        ['meta', {name: 'apple-mobile-web-app-capable', content: 'yes'}],
    ],
    theme: 'derech-hapeima',
    dest: './dist',
    port: 8082,
    evergreen: true,
    markdown: {
        extractHeaders: ['h1', 'h2', 'h3', 'h4'],
    },
    plugins: [
        '@vuepress/back-to-top',
        'vuepress-plugin-smooth-scroll',
        ['@vuepress/medium-zoom', {
            selector: 'img.img:not(.disable-zoom)',
            // See: https://github.com/francoischalifour/medium-zoom#options
            options: {
                margin: 16,
            },
        }],

        ['vuepress-plugin-typescript', {
            tsLoaderOptions: {},
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
}
