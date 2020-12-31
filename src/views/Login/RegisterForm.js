import React,{Component} from 'react';
import "./index.css";
import { Form, Icon, Input, Button,Row,Col } from 'antd';
import { UserOutlined,UnlockOutlined,MobileOutlined,FileMarkdownOutlined } from '@ant-design/icons';
 
class RegisterForm extends Component{
    constructor(props){
        super(props);
        this.state={};
    }
    onFinish=(value)=>{
        console.log('hahh',value);
    }
    changeformtype=()=>{
        this.props.switchForm("login");       
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
                        <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>                          
                            <Input 
                            prefix={<UserOutlined className="site-form-item-icon" />}placeholder="Username"/>                      
                        </Form.Item>
                        </Col>
                        </Row>
                        <Row>
                        <Col span={6} className="username">密码：
                        </Col>
                        <Col span={16}>
                        <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>                          
                            <Input
                            prefix={<UnlockOutlined  className="site-form-item-icon" />}placeholder="Password"/>                      
                        </Form.Item>
                        </Col>
                        </Row>
                        <Row>
                        <Col span={6} className="username">确认密码：
                        </Col>
                        <Col span={16}>
                        <Form.Item name="confirmpassword" rules={[{ visible:false,required: true, message: 'Please confirm your password!' },
                          ({getFieldValue})=>({
                              validator(rule,value){
                              if(!value||getFieldValue('password')===value) {
                              return Promise.resolve();
                          }
                          return Promise.reject("两次密码输入不一致");
                          },
                          }),
                          ]}>                          
                            <Input
                            prefix={<UnlockOutlined  className="site-form-item-icon" />}placeholder="Password"/>                      
                        </Form.Item>
                        </Col>
                        </Row>
                        <Row>
                        <Col span={6} className="username">电话号码：
                        </Col>
                        <Col span={16}>
                        <Form.Item name="telephone" rules={[{ required: true, message: 'Please write your telephone!' },{pattern:/^1[0-9]{10}$/g,message:"请输入11位手机号"}]
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
                        <Form.Item name="email" rules={[{ required: true, message: 'Please write your email!' }],
                        [{type: "email",message: "请输入正确的邮箱格式"}]}>                          
                            <Input
                            prefix={<FileMarkdownOutlined   className="site-form-item-icon" />}placeholder="email"/>                      
                        </Form.Item>
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