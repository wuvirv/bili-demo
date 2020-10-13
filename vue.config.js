module.exports = {
  chainWebpack: config => {
    config.when(process.env.NODE_ENV === 'production', config => {
      config.entry('app').clear().add('./src/main-prod.js')
      config.set('externals', {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        vuex: 'Vuex',
        vant: 'vant',
        'video.js': 'videojs',
        axios: 'axios',
        nprogress: 'NProgress'
      })
      config.plugin('html').tap(args => {
        args[0].isprod = true
        return args
      })
    })
    config.when(process.env.NODE_ENV === 'development', config => {
      config.entry('app').clear().add('./src/main-dev.js')
      config.plugin('html').tap(args => {
        args[0].isprod = false
        return args
      })
    })
  }
}
