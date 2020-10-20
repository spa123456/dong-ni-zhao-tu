// vue.config.js
module.exports = {
    devServer: {
      proxy: {
        '^/api': {
          target: 'http://157.122.54.189:9088',
          pathRewrite: {
            '^/api': ''
          }
        }
      },
    }
  }
  