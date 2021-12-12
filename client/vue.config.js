module.exports = {
  transpileDependencies: ['vuetify'],

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
      enableBridge: false,
    },
  },
  configureWebpack: {
    devServer: {
      proxy: {
        '/api/': {
          target: 'http://localhost:3000/',
        },
      },
      entry: [
        'node_modules/regenerator-runtime/runtime.js',
        './scripts/index.js',
        './styles/main.scss',
      ],
    },
  },
}
