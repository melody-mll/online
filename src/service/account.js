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
//获取医生表单
export function Getdoctorlist(data){
    return service.request({
        url:"/getdoctorlist/",
        method:"post",
        data:data
    })
}
//添加医生保存时调用接口，把保存的数据传给后端
export function Savedoctorlist(data){
    return service.request({
        url:"/savedoctorlist/",
        method:"post",
        data:data
    })
}
//删除医生后调用接口，把所删除的数据传给后端
export function Deletedoctorlist(data){
    return service.request({
        url:"/deletedoctorlist/",
        method:"post",
        data:data
    })
}
//排班信息获取医生排班的日期信息
export function GetscheduleDateHeader(data){
    return service.request({
        url:"/getscheduledateheader/",
        method:"get",
        data:data
    })
}
//排班信息中医生信息列表
export function GetdocScheduleList(data){
    return service.request({
        url:"/getdocschedulelist/",
        method:"get",
        data:data
    }) 
}
