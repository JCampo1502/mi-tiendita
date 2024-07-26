'use strict'
const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/app/main.js',
    output: {
        filename:'./script/main.js',
        path: path.resolve(__dirname,'dist')
    },
    devServer: {
        static: path.resolve(__dirname,'dist'),
        port:8080,
        hot:true
    },
    plugins: [
        new HtmlWebpackPlugin({template: './src/index.html'}),
        new MiniCssExtractPlugin({filename: './styles/[name].[contenthash].css'}),
        new FaviconsWebpackPlugin({
            logo: './src/assets/favicon.svg', // Ruta a tu archivo SVG
            prefix: 'assets/icons/', // Carpeta donde se guardarán los archivos generados
            emitStats: true,
            statsFilename: 'iconstats.json',
            persistentCache: true,
            inject: true,
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [   
            {
                test:/\.js$/,
                exclude:'/node_modules/',
                use:{
                    loader: 'babel-loader'
                }
            },             
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                use: [
                    {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/images/',
                        publicPath: 'assets/images/',
                    },
                    },
                ],
            },     
            {
                mimetype: 'image/svg+xml',
                scheme: 'data',
                type:'asset/resource',
                generator: {
                    filename: 'assets/icons/[hash].svg'
                }
            },
            {
                test:/\.(scss)$/,
                use: [                
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins:[
                                    autoprefixer
                                ]
                            }                
                        }
                    },
                    {
                        loader:'sass-loader'
                    }
                ]
            }
           
        ]
    }
}