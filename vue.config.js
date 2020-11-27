const path = require('path')
const defaultSettings = require('./src/settings')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'Admin MT' // page title

const port = process.env.port || process.env.npm_config_port || 1122 // dev port

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: false,
  productionSourceMap: false, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  devServer: {
    port: port,
    overlay: {
      warning: false,
      errors: false
    },
    proxy: {
      '/api': {
        // target: 'http://192.168.1.30:8085',// 代理地址，这里设置的地址会代替axios中设置的baseURL
        target: 'http://localhost:8888', // 代理地址，这里设置的地址会代替axios中设置的baseURL
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        // ws: true, // proxy websockets
        // pathRewrite方法重写url
        // pathRewrite: {'^/api': '/'} 重写之后url为 http://192.168.1.16:8085/xxxx
        // pathRewrite: {'^/api': '/api'} 重写之后url为 http://192.168.1.16:8085/api/xxxx
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/variables.scss";`
      }
    }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  externals: {
    AMap: 'AMap' // 高德地图配置
  }
},
  chainWebpack: config => {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config.when(process.env.NODE_ENV === 'development', config => {
      // config
      //   .entry('app')
      //   .clear()
      //   .add('./src/main-dev.js')

      config.plugin('html').tap(args => {
        args[0].isProd = false
        return args
      })
    })

    config.when(process.env.NODE_ENV === 'production', config => {
      // config
      //   .entry('app')
      //   .clear()
      //   .add('./src/main-prod.js')

      // config.set('externals', {
      //   vue: 'Vue',
      //   'vue-router': 'VueRouter',
      //   axios: 'axios',
      //   echarts: 'echarts',
      //   moment: 'moment',
      //   'element-ui': 'ElementUI',
      //   'vue-quill-editor': 'VueQuillEditor'
      // })

      config.plugin('html').tap(args => {
        args[0].isProd = true
        return args
      })
    })
  }
}