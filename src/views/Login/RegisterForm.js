import React,{Component} from 'react';
import "./index.css";
import { Form, Icon, Input, Button,Row,Col,message } from 'antd';
import {GetCode,Register} from '../../service/account'//导入接口
import { UserOutlined,UnlockOutlined,MobileOutlined,FileMarkdownOutlined,FontColorsOutlined } from '@ant-design/icons';
 
class RegisterForm extends Component{
    constructor(props){
        super(props);
        this.state={
            username:"",
            password:"",
            code:"",
            module:"register"
        };
    }
    onFinish=(value)=>{
        const requestData ={
            username:this.state.username,
            password:this.state.password,
            code:this.state.code
        }
        console.log(requestData);
        Register(requestData).then(response=>{
            message.success(response.data.message)
            console.log(response)
        }).catch(error=>{
            
        })
    }
    getCode=()=>{
        if(!this.state.username){
            message.warning('用户名不能为空',1);
            return false;
        }
        const requestData = {
            username:this.state.username,
            module:"register"
        }
        GetCode(requestData).then(response=>{
            message.success(response.data.message)
            console.log(response)
        }).catch(error=>{
            console.log(error)
        })
       
    }
    changeformtype=()=>{
        this.props.switchForm("login");       
    }
    //输入处理
    inputChangeUsername=(e)=>{
        let value=e.target.value;
        this.setState({
            username:value
        })
    }
    inputChangePassword=(e)=>{
        let value=e.target.value;
        this.setState({
            password:value
        })
    }
    inputChangeCode=(e)=>{
        let value=e.target.value;
        this.setState({
            code:value
        })
    }
    render(){
        return (
            <div className="form-wrap-register">
                <div>
                    <div className="form-header">
                        <h4 className="form-loginborder">注册</h4>
                        <h4 className="form-register" onClick={this.changeformtype}>登录</h4>                       
                    </div>
                    <div className="form-content">
                    <Form name="normal_login" 
                    className="login-form"
                    initialValues={{remember:true}}
                    onFinish={this.onFinish}>
                        <Row>
                        <Col span={6} className="username">用户名：
                        </Col>
                        <Col span={16}>
                        <Form.Item name="username" rules={[{ required: true, message: '请输入用户名!' }]}>                          
                            <Input onChange={this.inputChangeUsername}
                            prefix={<UserOutlined className="site-form-item-icon" />}placeholder="Username"/>                      
                        </Form.Item>
                        </Col>
                        </Row>
                        <Row>
                        <Col span={6} className="username">密码：
                        </Col>
                        <Col span={16}>
                        <Form.Item name="password" rules={[{ required: true, message: '请输入密码!' },
                    ({getFieldValue})=>({
                        validator(rule,value){
                        let confirmpassword_value=getFieldValue('confirmpassword');
                        if(confirmpassword_value&&value!==confirmpassword_value) {
                        return Promise.reject('两次密码输入不一致');
                    }
                    return Promise.resolve();
                    },
                    }),
                    ]}>                          
                            <Input type="password" onChange={this.inputChangePassword} 
                            prefix={<UnlockOutlined  className="site-form-item-icon" />}placeholder="Password"/>                      
                        </Form.Item>
                        </Col>
                        </Row>
                        <Row>
                        <Col span={6} className="username">确认密码：
                        </Col>
                        <Col span={16}>
                        <Form.Item name="confirmpassword" rules={[{ required: true, message: '请再次输入密码!' },
                          ({getFieldValue})=>({
                              validator(rule,value){
                              if(!value||getFieldValue('password')===value) {
                              return Promise.resolve();
                          }
                          return Promise.reject("两次密码输入不一致");
                          },
                          }),
                          ]}>                          
                            <Input type="password"
                            prefix={<UnlockOutlined  className="site-form-item-icon" />}placeholder="Password"/>                      
                        </Form.Item>
                        </Col>
                        </Row>
                        <Row>
                        <Col span={6} className="username">电话号码：
                        </Col>
                        <Col span={16}>
                        <Form.Item name="telephone" rules={[{ required: true, message: '请输入您的电话号码!' },{pattern:/^1[0-9]{10}$/g,message:"请输入11位手机号"}]
                             }>                          
                            <Input
                            prefix={<MobileOutlined   className="site-form-item-icon" />}placeholder="Telephone"/>                      
                        </Form.Item>
                        </Col>
                        </Row>
                        <Row>
                        <Col span={6} className="username">邮箱：
                        </Col>
                        <Col span={16}>
                        <Form.Item name="email" rules={[{ required: true, message: '请输入您的邮箱!' },
                        {type: "email",message: "请输入正确的邮箱格式"}]}>                          
                            <Input
                            prefix={<FileMarkdownOutlined   className="site-form-item-icon" />}placeholder="email"/>                      
                        </Form.Item>
                        </Col>
                        </Row>
                        <Row>
                        <Col span={12}>
                        <Form.Item name="code" rules={[{ required: true, message: '请输入长度为6的验证码!',len:6 }]}>                          
                            <Input  onChange={this.inputChangeCode}
                            prefix={<FontColorsOutlined  className="site-form-item-icon" />} placeholder="code"/>                      
                        </Form.Item>
                        </Col> 
                        <Col span={6}>
                        <Button type="primary" htmlType="submit" className="code-form-button" onClick={this.getCode}>
                            获取验证码
                        </Button>
                        </Col>
                        </Row>
                        <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" >
                            注册
                        </Button>
                        </Form.Item>
      </Form>

                    </div>
                </div>
            </div>
        )
    }
}
export default RegisterForm;