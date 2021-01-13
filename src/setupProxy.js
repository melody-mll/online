const {createProxyMiddleware}=require("http-proxy-middleware");

module.exports = function(app){
    app.use(createProxyMiddleware("/devApi",{
        //target:"http://www.web-jshtml.cn/api/react",//http://www.web-jshtml.cn/#/
        target:"http://localhost:3000/",
        changeOrigin:true,
        pathRewrite:{
            "^/devApi":"",
        },
    }))
    ///devApi/login
    // 1.匹配到devApi,开始做代理http://www.web-jshtml.cn/api/react
    // 2./devApi/login=>/login/,将devApi替换为空


    // app.use(proxy("/manage/api",{
    //     target:"http://admintest.happymall.com:7000",
    //     changeOrigin:true,
    // }))
};