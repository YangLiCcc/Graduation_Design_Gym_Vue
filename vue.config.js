const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  devServer: {
    port: 8080
  },
  chainWebpack: (config) => {
    config.resolve.alias
      // .set('路径别名', resolve('vue.config文件的相对路径'))
      .set('@components', resolve('./src/components'))
      .set('@style', resolve('./src/assets/style'))
      .set('@utils', resolve('./src/utils'))
      .set('@views', resolve('./src/views'))
      .set('@images', resolve('./src/assets/images'))

    // svg rule loader
    const svgRule = config.module.rule('svg') // 找到svg-loader
    svgRule.uses.clear() // 清除已有的loader, 如果不这样做会添加在此loader之后
    svgRule.exclude.add(/node_modules/) // 正则匹配排除node_modules目录
    svgRule // 添加svg新的loader处理
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
    // 修改images loader 添加svg处理
    const imagesRule = config.module.rule('images')
    imagesRule.exclude.add(resolve('src/assets/icon'))
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
  }
}