const webpack = require('webpack');
const evn = process.env.NODE_ENV;

let plugins = [];
// let commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
let uglifyPlugin =  new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false,
    },
    output: {
        comments: false,
    },
});

// commonsPlugin && plugins.push(commonsPlugin);
evn=='production' && plugins.push(uglifyPlugin);
 
module.exports = {
    //插件项
    plugins: plugins,
    //页面入口文件配置
    entry: {
        main : './main.js'
    },
    //入口文件输出配置
    output: {
        path: 'dist',
        filename: '[name].js'
    },
    module: {
        //加载器配置
        loaders: [
            { 
                test: /\.css$/, 
                loader: 'style-loader!css-loader' 
            },
            { 
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query:{
                    presets:['es2015']
                } 
            },
            { 
                test: /\.(png|jpg)$/, 
                loader: 'url-loader?limit=8192'
            }
        ]
    },
    //其它解决方案配置
    resolve: {
        root: './js', //绝对路径
        extensions: ['', '.js', '.json', '.css'],
        alias: {
            // AppStore : 'js/stores/AppStores.js',
        }
    },
    devtool: '#eval-source-map'
};