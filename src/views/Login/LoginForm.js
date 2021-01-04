import React,{Component} from 'react';
import {withRouter} from 'react-router-dom'
import "./index.css";
import { Form, Icon, Input, Button,Row,Col,message} from 'antd';
import { UserOutlined,UnlockOutlined,FontColorsOutlined } from '@ant-design/icons';
import {Login,GetCode} from '../../service/account'//导入接口
 
class LoginForm extends Component{
    constructor(props){
        super(props);
        this.state={
            username:"",
            password:"",
            code:"",
            module:"login"
        };
    }
    //登录事件
    onFinish=(value)=>{
        const requestData={
            username:this.state.username,
            password:this.state.password,
            code:this.state.code
        }
        Login(requestData).then(response=>{
            message.success(response.data.message)
            this.props.history.push('./index')
            //通过withRouter加工后的组件会多一个history props,可以通过history跳转路由
            console.log(response)
        }).catch(error=>{
        })
        console.log('hahh',value);
    }
    //获取验证码

    getCode=()=>{
        if(!this.state.username){
            message.warning('用户名不能为空',1);
            return false;
        }
        const requestData = {
            username:this.state.username,
            module:"login"
        }
        GetCode(requestData).then(response=>{
            message.success(response.data.message)
            console.log(response)
        }).catch(error=>{
            console.log(error)
        })
       
    }
    //输入处理
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
    changeformtype=()=>{
        this.props.switchForm("register");       
    }
    render(){
        return (
            <div className="form-wrap">
                <div>
                    <div className="form-header">
                        <h4 className="form-loginborder">登录</h4>
                        <h4 className="form-register" onClick={this.changeformtype}>注册</h4>
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
                        <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>                          
                            <Input  onChange={this.inputChangeUsername}
                            prefix={<UserOutlined className="site-form-item-icon" />}placeholder="Username"/>                      
                        </Form.Item>
                        </Col>
                        </Row>
                        <Row>
                        <Col span={6} className="username">密码：
                        </Col>
                        <Col span={16}>
                        <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>                          
                            <Input type="password" onChange={this.inputChangePassword}
                            prefix={<UnlockOutlined  className="site-form-item-icon" />}placeholder="Password"/>                      
                        </Form.Item>
                        </Col>
                        </Row>
                        <Row>
                        <Col span={12}>
                        <Form.Item name="code" rules={[{ required: true, message: '请输入长度为6的验证码!',len:6 }]}>                          
                            <Input onChange={this.inputChangeCode}
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
                            登录
                        </Button>
                        </Form.Item>
      </Form>

                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(LoginForm);