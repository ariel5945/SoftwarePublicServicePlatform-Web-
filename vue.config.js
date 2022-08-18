
module.exports = {
  pages: {
    index: {
      // page 的入口文件
      entry: 'src/main.js',
      // 模板文件
      template: 'public/index.html',
      // 在 dist/index.html 的输出文件
      filename: 'index.html',
      // 当使用页面 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '洛阳软件公共服务平台',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
  },
  // 配置跨域请求
  devServer: {
    port: 2314,
    host: "0.0.0.0",
  },
  lintOnSave: false,// eslint-loader 是否在保存的时候检查
  publicPath: "./",// 基本路径
  outputDir: "dist",// 输出文件目录
  assetsDir: "static",//设置放置打包生成的静态资源 (js、css、img、fonts) 的目录。
  indexPath: 'index.html'//用于设定打包生成的 index.html 文件的存储位置
}
