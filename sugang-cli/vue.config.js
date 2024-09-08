/*
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
*/
module.exports = { 
  devServer: {
    proxy: { 
      '/api': { 
        target: 'http://localhost:8080/api',
        changeOrigin: true, 
        pathRewrite: { 
          '^/api': ''
        } 
      } 
    } 
  },
  outputDir: '../sugang-server/public', 
}