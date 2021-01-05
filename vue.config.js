const express = require("express");
const app = express();
let path = require("path");

function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    devServer: {
        //记住，别写错了devServer
        open: process.platform === "darwin",
        host: "localhost", //设置本地服务器   选填
        port: 8081, //设置本地默认端口  选填
        proxy: {
            //设置代理，必须填
            "/api": {
                //设置拦截器  拦截器格式   斜杠+拦截器名字，名字可以自己定
                target: "http://localhost:3300", //代理的目标地址，这是豆瓣接口地址网址
                changeOrigin: true, //是否设置同源，输入是的
                pathRewrite: {
                    //路径重写
                    "/api": "/", //路径转发代理 /api 的意思就是 用/api 代替http:localhost：8080
                },
            },
            "/cloud": {
                target: "http://localhost:3000",
                changeOrigin: true,
                pathRewrite: {
                    "^/cloud": "",
                },
            },
        },
    },
    configureWebpack: {
        resolve: {
            alias: {
                src: "@",
            },
        },
    },
};