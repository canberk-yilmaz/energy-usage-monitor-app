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
          target: 'http://localhost:3000',
          secure: false,
          changeOrigin: true,
        },
      },
    },
  },
}
