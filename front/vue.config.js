const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,////关闭语法检查;Component name “School” should always be multi-word”的解决方法
  //解决跨域问题，axios的默认路径已经设置为'/api' ，见main.js
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      }
    }
  }

})
