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
//得到所有的科室信息
export function GetdepartList(data){
    return service.request({
        url:"/getdepartlist/",
        method:"get",
        data:data
    }) 
}
//得到所选科室下所有的项目信息
export function GetprojectList(data){
    return service.request({
        url:"/getprojectlist/",
        method:"get",
        data:data
    }) 
}
//得到所有的项目信息
export function GetAllprojectList(data){
    return service.request({
        url:"/getallprojectlist/",
        method:"get",
        data:data
    }) 
}
//在排班时，添加医生，（所选科室，项目，已经确定）
export function GetScheduleDoctor(data){
    return service.request({
        url:"/getscheduledoctor/",
        method:"get",
        data:data
    }) 
}
//排班时，编辑挂号信息保存时，调用接口
export function SaveEditSchedule(data){
    return service.request({
        url:"/saveeditschedule/",
        method:"get",
        data:data
    }) 
}
//编辑保存科室时，更新数据
export function Savedepartlist(data){
    return service.request({
        url:"/savedepartlist/",
        method:"get",
        data:data
    }) 
}
//编辑保存项目时，更新数据
export function Saveprojectlist(data){
    return service.request({
        url:"/saveprojectlist/",
        method:"get",
        data:data
    }) 
}
//从接口获取所有的患者信息
export function Getpatientlist(data){
    return service.request({
        url:"/getpatientlist/",
        method:"get",
        data:data
    }) 
}

