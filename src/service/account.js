import service from "../utils/request";
 
//登录接口
export function Login(data){
    return service.request({
        url:"/login/",
        method:"get",
        //params:data//请求类型为get时
        data:data//请求类型为post时
    })
}
//注册接口
export function Register(data){
    return service.request({
        url:"/register/",
        method:"get",
        //params:data//请求类型为get时
        data:data//请求类型为post时
    })
}
//获取验证码
export function GetCode(data){
    return service.request({
        url:"/getSms/",
        method:"post",
        //params:data//请求类型为get时
        data:data//请求类型为post时
    })
}