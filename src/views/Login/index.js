import React,{Component} from 'react';
import "./index.css";
import { Form, Icon, Input, Button,Row,Col } from 'antd';
import { UserOutlined,UnlockOutlined } from '@ant-design/icons';
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
 
class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            formType:"login"
        };
    }
    switchForm=(value)=>{
        console.log(value);
        this.setState({
            formType:value
        })
    }
    render(){
        return (
            <div className="form-wrap">
                <div>
                    {
                        this.state.formType==="login"?
                        <LoginForm switchForm={this.switchForm}></LoginForm>:
                        <RegisterForm switchForm={this.switchForm}></RegisterForm>
                    }
                </div>
            </div>
        )
    }
}
export default Login;