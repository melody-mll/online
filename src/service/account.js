import service from "../utils/request";
 
//登录接口
export function Login(data){
    return service.request({
        url:"/login/",
        method:"get",
        params:data//请求类型为get时
        // data:data//请求类型为post时
    })
}
//注册接口
export function Register(data){
    return service.request({
        url:"/register/",
        method:"post",
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
//编辑医生信息的接口
export function Updatedoctorlist(data){
    return service.request({
        url:"/updatedoctorlist/",
        method:"get",
        params:data
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
        params:data
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
        params:data
    }) 
}
//得到所有的项目信息
export function GetAllprojectList(data){
    return service.request({
        url:"/getallprojectlist/",
        method:"get",
        params:data
    }) 
}
//项目信息编辑后进行更新
export function Updateprojectlist(data){
    return service.request({
        url:"/updateprojectlist/",
        method:"get",
        params:data
    }) 
}
//删除项目信息
export function Deleteprojectlist(data){
    return service.request({
        url:"/deleteprojectlist/",
        method:"get",
        params:data
    }) 
}
//在排班时，添加医生，（所选科室，项目，已经确定）
export function GetScheduleDoctor(data){
    return service.request({
        url:"/getscheduledoctor/",
        method:"get",
        params:data
    }) 
}
//排班设置时，对于医生信息进行保存
export function SaveScheduleDoctor(data){
    return service.request({
        url:"/savescheduledoctor/",
        method:"get",
        params:data
    }) 
}
//排班时，编辑挂号信息保存时，调用接口
export function SaveEditSchedule(data){
    return service.request({
        url:"/saveeditschedule/",
        method:"get",
        params:data
    }) 
}
//新增科室时，更新数据
export function Savedepartlist(data){
    return service.request({
        url:"/savedepartlist/",
        method:"get",
        params:data
    }) 
}
//科室信息编辑后进行更新
export function Updatedepartlist(data){
    return service.request({
        url:"/updatedepartlist/",
        method:"get",
        params:data
    }) 
}

//删除科室信息
export function Deletedepartlist(data){
    return service.request({
        url:"/deletedepartlist/",
        method:"get",
        params:data
    }) 
}
//编辑保存项目时，更新数据
export function Saveprojectlist(data){
    return service.request({
        url:"/saveprojectlist/",
        method:"get",
        params:data
    }) 
}
//从接口获取预约信息中的所有的患者信息
export function Getregisterinformationlist(data){
    return service.request({
        url:"/getregisterinformationlist/",
        method:"get",
        params:data
    }) 
}
//预约信息更改后进行保存
export function Updateregisterinformation(data){
    return service.request({
        url:"/updateregisterinformation/",
        method:"get",
        params:data
    }) 
}
//从接口获取所有的患者信息
export function Getpatientlist(data){
    return service.request({
        url:"/getpatientlist/",
        method:"get",
        params:data
    }) 
}
//患者信息新增后进行保存
export function Savepatientlist(data){
    return service.request({
        url:"/savepatientlist/",
        method:"get",
        params:data
    }) 
}
//患者信息编辑后进行更新
export function Updatepatientlist(data){
    return service.request({
        url:"/updatepatientlist/",
        method:"get",
        params:data
    }) 
}
//获取用户和医生的聊天记录
export function Getchatrecord(data){
    return service.request({
        url:"/getchatrecord/",
        method:"get",
        params:data
    }) 
}
